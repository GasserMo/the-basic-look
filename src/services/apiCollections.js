
export async function getCollection({ name }) {
    const url = `https://chicwardrobe-znz5.onrender.com/products/collections/${name}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
    }
}
