export async function getProducts() {
    const url = "https://chicwardrobe-znz5.onrender.com/products";
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.body);
        }

        const data = await response.json();
        console.log('data is here')
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
    }
}
export async function getProductById({ id }) {
    const url = `https://chicwardrobe-znz5.onrender.com/products/${id}`;
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