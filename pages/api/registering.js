import validator from "validator";
import prisma from "../../libs/prisma.js";

async function Method(req, res) {
  const email = req.body.email;
  const login = req.body.login;
  const password = req.body.password;

  // Sprawdź, czy wszystkie pola są wypełnione
  // Jeśli nie, zwróć błąd 400 Bad Request                            400
  if (!email || !login || !password) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane" });
  }

  // Sprawdź, czy login zawiera tylko litery i cyfry
  // Jeśli nie, zwróć błąd 400 Bad Request                            400
  if (!validator.isAlphanumeric(login)) {
    return res
      .status(400)
      .json({ error: "Login może zawierać tylko litery i cyfry" });
  }

  // Sprawdź, czy login ma od 3 do 20 znaków
  // Jeśli nie, zwróć błąd 400 Bad Request                            400
  if (!validator.isLength(login, { min: 3, max: 20 })) {
    return res.status(400).json({ error: "Login musi mieć od 3 do 20 znaków" });
  }

  // Sprawdź, czy hasło ma co najmniej 6 znaków
  // Jeśli nie, zwróć błąd 400 Bad Request                            400
  if (!validator.isLength(password, { min: 6 })) {
    return res
      .status(400)
      .json({ error: "Hasło musi mieć co najmniej 6 znaków" });
  }

  // Sprawdź, czy email jest poprawny
  // Jeśli nie, zwróć błąd 400 Bad Request                            400
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Nieprawidłowy adres email" });
  } else {
    // Sprawdź, czy email już istnieje w bazie danych
    // Jeśli tak, zwróć błąd 409 Conflict                            409

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });
      if (existingUser) {
        return res.status(409).json({ error: "Email już jest użyty" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Błąd serwera" });
    }

    // Sprawdź, czy użytkownik już istnieje w bazie danych
    // Jeśli tak, zwróć błąd 409 Conflict                            409
    try {
      const existingLogin = await prisma.user.findUnique({
        where: { login: login },
      });
      if (existingLogin) {
        return res.status(409).json({ error: "Login już istnieje" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Błąd serwera" });
    }

    const dbRes = await prisma.user.create({
      data: {
        email: email,
        login: login,
        password: password, // Pamiętaj, aby hasło było haszowane przed zapisaniem w bazie danych
      },
    });

    if (!dbRes) {
      return res.status(500).json({ error: "Błąd podczas rejestracji" });
    }

    return res.status(200).json({ success: "Zarejestrowałeś się pomyślnie" });
  }
  // Tutaj możesz dodać logikę do zapisu użytkownika w bazie danych
  // Na przykład używając biblioteki do obsługi bazy danych, takiej as Prisma lub Mongoose
  // const user = await User.create({ email, login, password });
  // return res.status(201).json({ user });
  // return res.status(500).json({ error: "Błąd serwera" });
  // return res.status(400).json({ error: "Błąd walidacji" });
  // return res.status(409).json({ error: "Użytkownik już istnieje" });
  // return res.status(403).json({ error: "Nie masz uprawnień do tej operacji" });
  // return res.status(401).json({ error: "Nieautoryzowany dostęp" });
  // return res.status(429).json({ error: "Zbyt wiele żądań" });
  // return res.status(503).json({ error: "Serwis niedostępny" });
  // return res.status(422).json({ error: "Nieprawidłowe dane wejściowe" });
}

export default async function handler(req, res) {
  if (req.method == "POST") {
    return await Method(req, res);
  } else {
    return res.status(405).json({ error: "Metoda nie obsługiwana" });
  }
}
