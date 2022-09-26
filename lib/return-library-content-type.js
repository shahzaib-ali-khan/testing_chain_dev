export function loadLibraryContentType(contentType) {

    const data = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/library/${contentType}`;

    return data
}