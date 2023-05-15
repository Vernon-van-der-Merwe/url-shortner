import { nanoid } from "nanoid";

export function generateShortUrl(id: string) {
    const base = 'https://vswroyzrlj.execute-api.us-east-1.amazonaws.com/Prod/redirect'
    return `${base}?id=${id}`;
}
