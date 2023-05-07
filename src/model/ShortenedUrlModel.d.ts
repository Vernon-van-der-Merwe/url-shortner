export interface ShortenedUrl {
    id: string;
    url: string;
    name: string;
    shortUrl: string;
    clicks: number;
    createdAt: string;
    updatedAt: string;
}

export type CreateShortenedUrl = Omit<ShortenedUrl, "id" | "createdAt" | "updatedAt" | "clicks"| "shortUrl">;
