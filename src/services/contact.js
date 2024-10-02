
export async function contactUs({ email, name, phone, message
}) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = "https://chicwardrobe-znz5.onrender.com/contact/";
    const requestBody = {
        message: message,
        email: email,
        name: name,

        phone: phone
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.body);
        }
        const data = await response.json();
        console.log('message is sent ' + data);
        return data;
    } catch (error) {
        console.error("Error adding address:", error);
    }
}