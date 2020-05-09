const baseURL = `${process.env.VUE_APP_API_URL}/v1`;

/**
A category of threads.
*/
export interface Category {
    name: string,
};

/**
A thread or a reply. 
*/
export interface Post {
    uid: string,
    num: number,
    category: string,
    content: string,
    createdAt: Date,
};

/**
An outgoing post to be sent to the API. 
*/
export interface UserPost {
    content: string,
};

/**
Information about a thread's posts, and its category.
*/
export interface ThreadView {
    category: Category,
    posts: Post[],
};

/**
Information about a category and its active threads.
*/
export interface CatView {
    category: Category,
    threads: Post[],
};

/**
Generic fetch, returns JSON response of type T.
@param path Appended onto the base URL if specified: e.g. /animals/1
*/
async function fetchT<T>(path?: string, info?: RequestInit): Promise<T> {
    const url = path ? `${baseURL}/${path}` : baseURL;
    let res;
    try {
        res = await fetch(url, info);
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
            throw await res.text();
    }
}

/**
Fetches a list of all the active categories.
*/
export async function getCategories(): Promise<Category[]> {
    return fetchT<Category[]>();
};

/**
Fetches a category and all its threads.
*/
export async function getCatView(category: string): Promise<CatView> {
    return fetchT<CatView>(category);
}

/**
Fetches a thread and all its replies. 
*/
export async function getThreadView(category: string, thread: number): Promise<ThreadView> {
    return fetchT<ThreadView>(`${category}/${thread}`);
}

/**
Writes a reply to thread, or a new thread if not provided.
*/
export async function postPost(post: UserPost, category: string, thread?: number): Promise<{}> {
    return fetchT<{}>(`${category}/${thread ? thread : 0}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
}