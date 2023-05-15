import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { User } from "@/model/User";
import { useRouter } from "next/router";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

const asActiveUserAcc = (AuthUser, dbUser: User) => {
  return {
    ...AuthUser,
    role: dbUser.role,
  };
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fireUser) => {
      if (fireUser) {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: fireUser.email, id: fireUser.uid }),
        });
        const data = (await res.json()) as User;

        setUser(asActiveUserAcc(fireUser, data));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
