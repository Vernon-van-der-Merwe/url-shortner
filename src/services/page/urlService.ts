import { CreateShortenedUrl, ShortenedUrl } from "@/model/ShortenedUrlModel";
// import { showError, showSuccess } from "./notificationService";
import { NextRouter } from "next/router";
import { showError, showSuccess } from "./notificationService";

import * as ApiUrlService from "@/services/api/urlService";
import { fire } from "@/config/firebase";

export const create = async (input: CreateShortenedUrl, router: NextRouter ,setLoading) => {
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

export const get = async (id, setLoading, setResults) => {
    setLoading(true)
    
    // TEMPORARILY REPLACE FETCH WITH DIRECT SERVICE CALL
    let result = await ApiUrlService.get(fire, id)
    setResults(result)

    // const response = await fetch("/api/url/get", {
    //     method: "POST",
    //     body: JSON.stringify({ id }),
    // })

    // if (response.status == 200) {
    //     const result = await response.json() as ShortenedUrl
    //     setResults(result)
    // } else {
    //     showError("Oops!", "Something went wrong 👀");
    // }

    setLoading(false)
};

export const getAll = async (setLoading, setResults) => {
    setLoading(true)

    const response = await fetch("/api/url", {
        method: "GET",
    })

    if (response.status == 200) {
        setLoading(false)
        setResults(await response.json() as ShortenedUrl[])
    } else {
        showError("Oops!", "Something went wrong 👀");
        setLoading(false)
        return []
    }
};

export const deleteItem = async (id, setLoading) => {
    setLoading(true)

    const response = await fetch("/api/url/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
    })

    if (response.status == 200) {
        return
    } else {
        showError("Oops!", "Something went wrong 👀");
    }

    setLoading(false)
};
