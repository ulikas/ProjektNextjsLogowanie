import { IronSessionOptions } from "iron-session";

export const sessionOptions = {
  password: process.env.SESSION_SECRET || "b34789on238odfu2ncohn223",
  cookieName: "wikzon_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
