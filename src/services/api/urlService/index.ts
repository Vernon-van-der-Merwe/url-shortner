import { CreateShortenedUrl, ShortenedUrl } from "@/model/ShortenedUrlModel";
import { addDoc, collection, doc, DocumentData, Firestore, getDoc, getDocs, query, updateDoc,deleteDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { generateShortUrl } from "./helper";

const COLLECTION_NAME = "shortenedUrl";

function asMapped(data: DocumentData) {
    let list = []

    data.forEach(
        (item) => {
            list.push({ ...item.data(), id: item.id })
        });
    return list
}

export const create = async (fire: Firestore, data: CreateShortenedUrl): Promise<void> => {
    const input: ShortenedUrl = {
        id: uuid(),
        ...data,
        shortUrl: generateShortUrl(),
        clicks: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    await addDoc(collection(fire, COLLECTION_NAME), input);
};

export const get = async (fire: Firestore, id: string): Promise<ShortenedUrl> => {
    const data = await (await getDoc(doc(fire, COLLECTION_NAME, id))).data()
    return { id, ...data } as ShortenedUrl
}

export const getAll = async (fire: Firestore): Promise<ShortenedUrl[]> => {
    const q = query(collection(fire, COLLECTION_NAME))
    const data = asMapped((await getDocs(q)).docs)
    return data
}

export const update = async (fire: Firestore, id: string, input: ShortenedUrl): Promise<ShortenedUrl> => {
    const ref = doc(fire, COLLECTION_NAME, id);
    await updateDoc(ref, { input });
    const data = await get(fire, id)
    return data as ShortenedUrl;
};

export const removeItem = async (fire: Firestore, id: string): Promise<ShortenedUrl> => {
    const ref = doc(fire, COLLECTION_NAME, id)
    await deleteDoc(ref)
    return
};
