import prisma from "../../libs/prisma";
import Cookies from "cookies";

async function Methodlog(req, res) {
  const { login, password } = req.body;

  // Sprawdź, czy wszystkie pola są wypełnione
  if (!login || !password) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane" });
  }

  // Znajdź użytkownika po loginie
  const user = await prisma.user.findUnique({ where: { login } });
  if (!user) {
    return res.status(401).json({ error: "Nieprawidłowy login lub hasło" });
  }

  //W produkcji hasło powinno być haszowane. Sorry że nie jest.
  if (user.password !== password) {
    return res.status(401).json({ error: "Nieprawidłowy login lub hasło" });
  }

  // Wygeneruj prosty token (w produkcji JWT!)
  const token = Buffer.from(`${user.id}:${user.login}`).toString("base64");

  // Ustaw ciasteczko
  const cookies = new Cookies(req, res);
  cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dni
    secure: process.env.NODE_ENV === "production",
  });

  return res
    .status(200)
    .json({ success: true, user: { id: user.id, login: user.login } });
}

export default async function handler(req, res) {
  if (req.method == "POST") {
    return await Methodlog(req, res);
  } else {
    return res.status(405).json({ error: "Metoda nie obsługiwana" });
  }
}
