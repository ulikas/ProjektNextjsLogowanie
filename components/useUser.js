import { error } from "console";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => setUser(data.user))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error: null };
}
