import { DbUser } from "@/model/User";
import { showError } from "./notificationService";
import * as ApiUserService from "@/services/api/userService";
import { fire } from "@/config/firebase";

export const get = async (id, setLoading, setResult) => {
    setLoading(true)

    let user = ApiUserService.get(fire, id)
    // const user = getUserRaw(id);
    setResult(user)

    setLoading(false)
};

export const getUserRaw = async (id): Promise<DbUser | void> => {
    try {
        const response = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({ id }),
        })

        if (response.status == 200) {
            const result = await response.json() as DbUser
            return result
        } else {
            throw new Error("Something went wrong 👀");
        }
    } catch (error) {
        console.log(error);
        showError("Something went wrong 👀", "Please try again later");
    }
};
