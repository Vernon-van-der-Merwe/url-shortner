import { CreateShortenedUrl, ShortenedUrl } from "@/model/ShortenedUrlModel";
// import { showError, showSuccess } from "./notificationService";
import { NextRouter } from "next/router";
import { showError, showSuccess } from "./notificationService";

export const create = async (input: CreateShortenedUrl, router: NextRouter, setLoading) => {
    setLoading(true)

    const response = await fetch("/api/url/create", {
        method: "POST",
        body: JSON.stringify({ ...input }),
    })
    if (response.status == 200) {
        showSuccess("Store Added", "Lets add some products!");
        router.push("/dashboard/url");
    } else {
        showError("Oops!", "Something went wrong 👀");
    }

    setLoading(false)
};

export const get = async (id, setLoading, setRestaurant) => {
    setLoading(true)

    const response = await fetch("/api/store/get", {
        method: "POST",
        body: JSON.stringify({ id }),
    })

    if (response.status == 200) {
        const result = await response.json() as ShortenedUrl
        setRestaurant(result)
    } else {
        showError("Oops!", "Something went wrong 👀");
    }

    setLoading(false)
};

export const getAll = async (setLoading, setRestaurants) => {
    setLoading(true)

    const response = await fetch("/api/url", {
        method: "GET",
    })

    if (response.status == 200) {
        setLoading(false)
        setRestaurants(await response.json() as ShortenedUrl[])
    } else {
        showError("Oops!", "Something went wrong 👀");
        setLoading(false)
        return []
    }
};
