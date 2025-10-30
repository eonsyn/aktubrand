import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/utils/db";
import Admin from "@/models/Admin";
import AktuUser from "@/models/AktuUser";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const admin = await Admin.findOne({ username: credentials.username });
        if (!admin) throw new Error("Admin not found");

        const isValid = await bcrypt.compare(credentials.password, admin.password);
        if (!isValid) throw new Error("Invalid credentials");

        return { id: admin._id, username: admin.username, role: "admin" };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await connectDB();
          const existingUser = await AktuUser.findOne({ email: user.email });
          if (!existingUser) {
            await AktuUser.create({
              name: user.name,
              email: user.email,
              image: user.image,
              role: "user",
            });
          }
        } catch (err) {
          console.error("Error saving Google user:", err);
          return false;
        }
      }
      return true;
    },

    async session({ session, token }) {
      await connectDB();
      const dbUser = await AktuUser.findOne({ email: session.user.email });
      if (dbUser) {
        session.user._id = dbUser._id.toString();
      }
      session.user.id = token.sub;
      session.user.role = token.role || "user";
      return session;
    },

    async jwt({ token, user }) {
      if (user) token.role = user.role || "user";
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Correct exports for App Router
const handler = NextAuth(authOptions); 
export { handler as GET, handler as POST, authOptions };
