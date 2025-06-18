import Cookies from "cookies";

export default function handler(req, res) {
  const cookies = new Cookies(req, res);
  cookies.set("token", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ success: true });
}
