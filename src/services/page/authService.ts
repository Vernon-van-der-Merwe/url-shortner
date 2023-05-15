/* eslint-disable react-hooks/rules-of-hooks */
import {
  showError,
  showSuccess,
  showInfo,
} from "./notificationService";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRouter } from "next/router";

export const login = async (auth, email, password, router: NextRouter) => {
  try {
    let response = await signInWithEmailAndPassword(auth, email, password)
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000);
    return response
  } catch (error) {
    handleFirebaseError(error)
  }
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
