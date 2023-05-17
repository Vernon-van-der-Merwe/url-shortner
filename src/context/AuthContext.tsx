import { createContext, useContext, useEffect, useState } from "react";
import { User, UserCredential, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/router";

import * as authService from "@/services/page/authService";
import { Center, Loader } from "@mantine/core";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [user, setUser] = useState<UserCredential | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fireUser: User) => {
      console.log(router.pathname)

      if (
        router.pathname == "/auth/login" ||
        router.pathname == "/error"
      ) {
        setLoading(false);
        return;
      }

      await authService.authStateChangedHandler(
        auth,
        fireUser,
        setUser,
        logout,
        setLoading,
        router
      );
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    setUser(null);
    await signOut(auth);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {loading ? (
        <>
          <Center h={"60vh"}>
            <Loader variant="dots" />
          </Center>
          <Center>
            <h3>Loading User Details</h3>
          </Center>
        </>
      ) : (
        <>
          {user ? (
            <center>
              <p></p>
            </center>
          ) : null}
          {children}
        </>
      )}
    </AuthContext.Provider>
  );
};
