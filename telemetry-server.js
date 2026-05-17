const { Server } = require("socket.io");
const http = require("http");

const PORT = 3001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Telemetry Server is running");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const services = [
  { id: "auth-api", name: "auth-api", status: "HEALTHY" },
  { id: "payment-worker", name: "payment-worker", status: "HEALTHY" },
  { id: "analytics-engine", name: "analytics-engine", status: "HEALTHY" },
  { id: "notification-service", name: "notification-service", status: "HEALTHY" },
  { id: "postgres-primary", name: "postgres-primary", status: "HEALTHY" },
  { id: "redis-cache", name: "redis-cache", status: "HEALTHY" },
  { id: "websocket-gateway", name: "websocket-gateway", status: "HEALTHY" },
  { id: "edge-router", name: "edge-router", status: "HEALTHY" }
];

let incidents = [];

function generateMetrics() {
  const metrics = services.map(service => {
    // Base normal metrics
    let cpu = 10 + Math.random() * 30; // 10-40%
    let ram = 256 + Math.random() * 1024; // 256MB - 1.2GB
    let latency = 20 + Math.random() * 50; // 20-70ms
    let rps = 100 + Math.floor(Math.random() * 400); // 100-500
    let errorRate = Math.random() * 0.1; // 0-0.1%

    // Simulate spikes for postgres
    if (service.id === "postgres-primary" && Math.random() > 0.9) {
      cpu = 80 + Math.random() * 20; // 80-100%
      service.status = "CRITICAL";
    } else if (service.id === "postgres-primary") {
      service.status = cpu > 90 ? "CRITICAL" : "HEALTHY";
    }

    // Simulate latency spikes for auth-api
    if (service.id === "auth-api" && Math.random() > 0.85) {
      latency = 300 + Math.random() * 500; // 300-800ms
      service.status = "WARNING";
    } else if (service.id === "auth-api") {
      service.status = latency > 400 ? "WARNING" : "HEALTHY";
    }

    return {
      serviceId: service.id,
      cpu: cpu.toFixed(1),
      ram: ram.toFixed(0),
      latency: latency.toFixed(0),
      rps,
      errorRate: errorRate.toFixed(2),
      timestamp: new Date().toISOString()
    };
  });
  
  return { metrics, services };
}

function generateLogs() {
  const levels = ["INFO", "INFO", "INFO", "WARN", "ERROR", "DEBUG"];
  const numLogs = Math.floor(Math.random() * 5) + 1;
  const logs = [];

  for (let i = 0; i < numLogs; i++) {
    const service = services[Math.floor(Math.random() * services.length)];
    const level = levels[Math.floor(Math.random() * levels.length)];
    let message = `Standard operation completed`;
    
    if (level === "ERROR") message = `Connection timeout to downstream service`;
    if (level === "WARN") message = `High memory usage detected`;
    
    logs.push({
      id: Math.random().toString(36).substr(2, 9),
      serviceId: service.id,
      level,
      message,
      timestamp: new Date().toISOString()
    });
  }
  return logs;
}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  const metricInterval = setInterval(() => {
    const data = generateMetrics();
    socket.emit("metrics_update", data);
  }, 2000); // Every 2 seconds

  const logInterval = setInterval(() => {
    socket.emit("logs_update", generateLogs());
  }, 3000); // Every 3 seconds

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    clearInterval(metricInterval);
    clearInterval(logInterval);
  });
});

server.listen(PORT, () => {
  console.log(`Telemetry Socket.IO server running on port ${PORT}`);
});
