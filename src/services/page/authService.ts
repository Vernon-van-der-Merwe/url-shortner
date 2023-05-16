/* eslint-disable react-hooks/rules-of-hooks */
import {
  showError,
  showSuccess,
  showInfo,
} from "./notificationService";
import { DbUser } from "@/model/User";

import { User, UserCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { NextRouter } from "next/router";
import * as userService from "@/services/page/userService";

export const authStateChangedHandler = async (auth, fireUser: User, setUser, logout, setLoading, router): Promise<void> => {
  setLoading(true);

  try {
    const dbUser = await userService.getUserRaw(fireUser.uid) as DbUser;

    if (!dbUser || !fireUser) {
      logout(auth, setUser, router);
    }
    console.log({ ...fireUser, ...dbUser });
    setUser({ ...fireUser, ...dbUser })
  } catch (error) {
    logout(auth, setUser, router);
  }

  setLoading(false);
};

export const login = async (auth, email, password, setUser, setLoading, router: NextRouter) => {
  setLoading(true)

  try {
    await signInWithEmailAndPassword(auth, email, password) as UserCredential;
    router.push("/dashboard");
  } catch (error) {
    handleFirebaseError(error)
  }

  setLoading(false)
};

export const register = async (name, email, password, router, setLoading) => {
  setLoading(true)

  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  })

  if (res.status !== 200) {
    handleError(res)
    setLoading(false)
    return
  }

  showSuccess("Profile created!", "Whoopty do!");
  showInfo("Please log in!", "Lets get started");

  router.push("/dashboard");
};

// TODO: We need a global err handler https://reactjs.org/docs/error-boundaries.html
function handleError(error) {
  if (error.status == 500) {
    showError("Oops!", "Something went wrong 👀");
  } else {
    showError("Oops!", "Something went wrong 👀");
  }
}

function handleFirebaseError(res: Response) {
  showError("Oops!", "Something went wrong 👀");
}
