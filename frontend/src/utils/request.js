export async function request(url, method, data) {
    return fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        method: method || "GET",
        body: data ? JSON.stringify(data) : null,
    }).then((res) => res.json());
}
