import { fire } from "@/config/firebase";
import * as UserService from "@/services/api/userService";

export default async function index(req, res) {
  const { id } = JSON.parse(req.body)

  try {
    let user = await UserService.get(fire, id)

    if (!user) {
      throw new Error("No User Found")
    } else {
      res.status(200).json(user)
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ err })
  }
}
