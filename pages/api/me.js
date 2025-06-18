import prisma from "../../libs/prisma";
import Cookies from "cookies";

export default async function handler(req, res) {
  const cookies = new Cookies(req, res);

  const token = cookies.get("token");
  if (!token) return res.status(401).json({ user: null });

  if (!user) return res.status(401).json({ user: null });
  return res.status(200).json({ user: { id: user.id, login: user.login } });
}
