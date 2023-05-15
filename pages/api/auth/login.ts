import { fire } from "@/config/firebase";
import * as UserService from "@/services/api/userService";

export default async function login(req, res) {
  console.log(req.body);
  const { id } = JSON.parse(req.body)
  try {
    let user = await UserService.get(fire, id)
    if (!user) {
      console.log(user);
      res.status(404).json({ err: "User not found" })
    } else {
      console.log(user);
      res.status(200).json(user)
    }
  } catch (err) {
    res.status(500).json({ err })
  }
}
