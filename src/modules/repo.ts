export interface category {
    name: string,
};

export async function getCategories(): Promise<category[]> {
    const res = await fetch("http://localhost:3000/v1");
    return await res.json();
};