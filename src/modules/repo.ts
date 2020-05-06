const baseURL = "http://localhost:3000/v1";

/**
Information about a category. 
*/
export interface Category {
    name: string,
};

/**
Generic fetch, returns JSON response of type T.
@param path Appended onto the base URL if specified: e.g. /animals/1
*/
async function fetchT<T>(path?: string): Promise<T> {
    const url = path ? `${baseURL}/${path}` : baseURL;
    try {
        const res = await fetch(url);
        return await res.json();
    } catch(err) {
        console.error(err);
        throw "Couldn't contact the server.";
    }
}

/**
Fetches a list of all the active categories.
*/
export async function getCategories(): Promise<Category[]> {
    return fetchT<Category[]>();
};