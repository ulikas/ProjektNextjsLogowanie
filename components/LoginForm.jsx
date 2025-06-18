import "../styles/globals.css";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LoginForm() {
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
      const response = await axios.post("/api/logging", data);
      setSucces(response.data.success);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      }
      return setError(
        error.response.data.error || "Wystąpił błąd podczas logowania"
      );
    }
  }

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="max-w-md mt-[10%] mx-auto space-y-4  grid grid-cols-1"
      >
        <h1 className="text-center text-xl">Logowanie</h1>
        <input
          name="login"
          type="text"
          placeholder="Login"
          className="input border-solid border-2 border-gray-400 bg-gray-100 rounded p-2 mr-2"
          id=""
        />
        <input
          name="password"
          type="password"
          placeholder="Hasło"
          className="input border-solid border-2 border-gray-400 bg-gray-100 rounded p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition-colors duration-200"
        >
          Zaloguj
        </button>
        {succes && (
          <div className="text-green-500 text-center mt-4">{succes}</div>
        )}

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        <div className="text-center mt-4">
          <Link href="./register" className="text-blue-500 hover:underline">
            Nie masz konta? Zarejestruj się
          </Link>
        </div>
      </form>
    </div>
  );
}

/*


*/
