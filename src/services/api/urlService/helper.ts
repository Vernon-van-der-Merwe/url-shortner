export function generateShortUrl() {
    const tempRandomUrlGenId = Math.floor(Math.random() * 999999)
    return `https://shortener.com/${tempRandomUrlGenId}`;
}
