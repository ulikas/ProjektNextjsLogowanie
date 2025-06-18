import "../styles/globals.css";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignupForm() {
  const router = useRouter();
  const [succes, setSucces] = useState(null);
  const [error, setError] = useState(null);
  // const [form, setForm] = useState({
  //   email: "",
  //   login: "",
  //   password: "",
  // });

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post("/api/registering", data);
      setSucces(response.data.success);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      }
      return setError(
        error.response.data.error || "Wystąpił błąd podczas rejestracji"
      );
    }
  }

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mt-[10%] mx-auto space-y-4  grid grid-cols-1"
      >
        <h1 className="text-center text-xl">Rejestracja</h1>
        <input
          name="email"
          type="text"
          // onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="input border-solid border-2 border-gray-400 bg-gray-100 rounded p-2 mr-2 hover:bg-blue-50 hover:border-blue-500"
          id=""
        />
        <input
          name="login"
          type="text"
          // onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="login"
          className="input border-solid border-2 border-gray-400 bg-gray-100 rounded p-2 mr-2 hover:bg-blue-50 hover:border-blue-500"
        />
        <input
          name="password"
          type="password"
          // onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Hasło"
          className="input border-solid border-2 border-gray-400 bg-gray-100 rounded p-2 mr-2 hover:bg-blue-50 hover:border-blue-500"
        />
        <div>
          <input
            name="color"
            type="color"
            // onChange={(e) => setForm({ ...form, password: e.target.value })}

            className="input mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-solid border-2 border-gray-400 bg-gray-100 rounded hover:bg-blue-50 hover:border-blue-500"
          />
          <label className="text-gray-600">Wybierz ulubiony kolor</label>
        </div>
        <button
          type="submit"
          className="btn  border-solid border-2 border-blue-700 bg-blue-500 text-white rounded p-2 mr-2"
        >
          Zarejestruj się
        </button>
      </form>
      {succes && (
        <div className="text-green-500 text-center mt-4">{succes}</div>
      )}

      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      <div className="text-center mt-4">
        <Link href="./login" className="text-blue-500 hover:underline">
          Masz już konto? Zaloguj się
        </Link>
      </div>
    </div>
  );
}
