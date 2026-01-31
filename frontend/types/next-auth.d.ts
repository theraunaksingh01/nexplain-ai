import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: "admin" | "expert" | "reader";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "admin" | "expert" | "reader";
  }
}