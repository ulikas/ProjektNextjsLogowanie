import Link from "next/link";
import { useRouter } from "next/router";
import useUser from "./useUser";

export default function NavigationPanel() {
  const { user, loading, error } = useUser();
  console.log("error", error);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { credentials: "include", method: "POST" });
    router.reload(); // odśwież stronę, by zaktualizować stan
  }

  if (user === undefined) {
    return <div className="text-center">Ładowanie...</div>; // lub spinner
  }
  // if (user === null) {
  //   return <div className="text-center">Nie jesteś zalogowany</div>;
  // }
  if (user === false) {
    return (
      <div className="text-center">Błąd podczas sprawdzania użytkownika</div>
    );
  }

  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <Link href="/">
            <h1 className="text-xl font-bold">SklepWikzon</h1>
          </Link>
          <nav className="space-x-4">
            <Link href="">Ogłoszenia</Link>
            <Link href="">Dodaj</Link>
            {loading ? null : user ? (
              <button
                onClick={handleLogout}
                type="button"
                className="text-white hover:underline"
              >
                Wyloguj
              </button>
            ) : (
              <Link href="/login">Zaloguj</Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
