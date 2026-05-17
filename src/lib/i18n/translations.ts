export const translations = {
  EN: {
    // Sidebar
    overview: "Overview",
    services: "Services",
    incidents: "Incidents",
    analytics: "Analytics",
    logs: "Live Logs",
    audit: "Audit Logs",
    settings: "Settings",
    
    // Header
    searchPlaceholder: "Search resources, incidents, or logs... (Press '/')",
    notifications: "Notifications",
    viewAllNotifications: "View all notifications",
    
    // Overview Page
    allSystemsOperational: "All systems operational",
    globalApiLatency: "Global API Latency",
    requestRate: "Request Rate",
    errorRate: "Error Rate",
    avgCpuUsage: "Avg CPU Usage",
    fromLastHour: "from last hour",
    stableAcross: "Stable across 8 services",
    systemHealthMap: "System Health Map",
    systemHealthDesc: "Realtime topological view of infrastructure.",
    activeIncidents: "Active Incidents",
    activeIncidentsDesc: "2 open incidents requiring attention.",
    investigate: "Investigate",
    acknowledge: "Acknowledge",
    gateway: "API Gateway",
    authApi: "Auth API",
    coreServices: "Core Services",
    redisCache: "Redis Cache",
    postgres: "PostgreSQL"
  },
  ID: {
    // Sidebar
    overview: "Ringkasan",
    services: "Layanan",
    incidents: "Insiden",
    analytics: "Analitik",
    logs: "Log Langsung",
    audit: "Log Audit",
    settings: "Pengaturan",
    
    // Header
    searchPlaceholder: "Cari sumber daya, insiden, atau log... (Tekan '/')",
    notifications: "Notifikasi",
    viewAllNotifications: "Lihat semua notifikasi",
    
    // Overview Page
    allSystemsOperational: "Semua sistem beroperasi",
    globalApiLatency: "Latensi API Global",
    requestRate: "Tingkat Permintaan",
    errorRate: "Tingkat Kesalahan",
    avgCpuUsage: "Rata-rata CPU",
    fromLastHour: "dari jam terakhir",
    stableAcross: "Stabil di 8 layanan",
    systemHealthMap: "Peta Kesehatan Sistem",
    systemHealthDesc: "Tampilan topologi infrastruktur waktu-nyata.",
    activeIncidents: "Insiden Aktif",
    activeIncidentsDesc: "2 insiden terbuka butuh perhatian.",
    investigate: "Investigasi",
    acknowledge: "Konfirmasi",
    gateway: "Gerbang API",
    authApi: "API Autentikasi",
    coreServices: "Layanan Inti",
    redisCache: "Cache Redis",
    postgres: "PostgreSQL"
  }
}

export type Language = 'EN' | 'ID';
export type TranslationKey = keyof typeof translations.EN;
