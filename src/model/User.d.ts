import { UserCredential } from "firebase/auth";

export interface DbUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
}

interface GlobalUser extends DbUser, UserCredential {}
