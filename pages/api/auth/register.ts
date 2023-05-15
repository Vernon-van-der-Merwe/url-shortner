import { createUserWithEmailAndPassword } from "firebase/auth"

import { auth, fire } from '@/config/firebase'
import * as UserService from "@/services/api/userService"

export default async function register(req, res) {
  const { name, email, password } = JSON.parse(req.body)
  try{
    const fireAcc = await createUserWithEmailAndPassword(auth, email, password)
    const user = UserService.create(fire, { id: fireAcc.user.uid, name, email: email, role: "user"})
    res.status(200).json(user)
  } catch (err){
    console.log(err);
    res.status(500).json(err)
  }
}
