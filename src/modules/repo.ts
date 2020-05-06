const baseURL = "http://localhost:3000/v1";

/**
Information about a category. 
*/
export interface Category {
    name: string,
};

/**
Information about a thread or a reply. 
*/
export interface Post {
    uid: string,
    num: number,
    category: string,
    content: string,
    createdAt: Date
};

/**
Information about a category and its active threads.
*/
export interface CatView extends Category {
    threads: Post[]
};

/**
Generic fetch, returns JSON response of type T.
@param path Appended onto the base URL if specified: e.g. /animals/1
*/
async function fetchT<T>(path?: string): Promise<T> {
    const url = path ? `${baseURL}/${path}` : baseURL;

    let res;
    try {
        res = await fetch(url);
    } catch(err) {
        console.error(err);
        throw "Couldn't contact the server.";
    }

    switch(res.status) {
        case 200:
            return await res.json();
        case 500:
            throw "An unknown error occurred";
        default:
            throw res.statusText;
    }

}

/**
Fetches a list of all the active categories.
*/
export async function getCategories(): Promise<Category[]> {
    return fetchT<Category[]>();
};

/**
 
*/
export async function getCatView(category: string): Promise<CatView> {
    return fetchT<CatView>(category);
}