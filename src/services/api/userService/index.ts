import { DbUser } from "@/model/User";
import { collection, doc, DocumentData, Firestore, getDoc, getDocs, query, setDoc } from "firebase/firestore";
const COLLECTION_NAME = "user";

function asMapped(data: DocumentData) {
    let list = []
    data.forEach(
        (item) => {
            list.push({ ...item.data(), id: item.id })
        });
    return list
}

export const create = async (fire: Firestore, { id, ...userData } : DbUser): Promise<DbUser> => {
    await setDoc(doc(fire, COLLECTION_NAME, id), userData)
    return { id, ...userData }
};

export const get = async (fire: Firestore, id: string): Promise<DbUser> => {
    const data = await (await getDoc(doc(fire, COLLECTION_NAME, id))).data()
    return data as DbUser
}

export const getAll = async (fire: Firestore): Promise<DbUser[]> => {
    const data = asMapped((await getDocs(query(collection(fire, COLLECTION_NAME)))).docs)
    return data
}
