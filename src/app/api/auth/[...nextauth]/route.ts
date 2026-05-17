import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authorization for UI demo
        if (credentials?.email === "admin@pulseops.com" && credentials?.password === "admin") {
          return { id: "1", name: "Admin User", email: "admin@pulseops.com", role: "ADMIN" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore - NextAuth user type doesn't have role by default
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role
      }
      return session
    }
  },
  session: {
    strategy: "jwt"
  }
})

export { handler as GET, handler as POST }
