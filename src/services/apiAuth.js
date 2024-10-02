export async function registerUser({ name, email, password }) {
    const url = "https://chicwardrobe-znz5.onrender.com/auth/register";

    const requestBody = {
        name: name,
        email: email,
        password: password,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const data = await response.json();
        console.log(data);
        localStorage.setItem("userData", JSON.stringify(data));

        return data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function loginUser({ email, password }) {
    const url = "https://chicwardrobe-znz5.onrender.com/auth/login";

    const requestBody = {
        email: email,
        password: password,
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const data = await response.json();
        console.log(data);
        localStorage.setItem("userData", JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}
