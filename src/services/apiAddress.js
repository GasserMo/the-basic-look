
export async function addAddress({ addressLine, country, postalCode,
    state, city, phone
}) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = "https://chicwardrobe-znz5.onrender.com/address/";
    const requestBody = {
        addressLine: addressLine,
        country: country,
        postalCode: postalCode,
        city: city,
        state: state,
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
        console.log('addrses is added' + data);
        return data;
    } catch (error) {
        console.error("Error adding address:", error);
    }
}
export async function updateAddress({ addressLine, country, postalCode,
    state, city, phone, id
}) {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const url = `https://chicwardrobe-znz5.onrender.com/address/${id}`;
    const requestBody = {
        addressLine: addressLine,
        country: country,
        postalCode: postalCode,
        city: city,
        state: state,
        phone: phone
    };
    try {
        const response = await fetch(url, {
            method: "PUT",
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
        console.log('addrses is updated' + data);
        return data;
    } catch (error) {
        console.error("Error adding address:", error);
    }
}
export async function getAddress() {
    const url = "https://chicwardrobe-znz5.onrender.com/address";
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        /*  if (!response.ok) {
             throw new Error("Network response was not ok " + response.body);
         } */

        const data = await response.json();
        console.log('address is here' + data)
        return data;
    } catch (error) {
        console.error("Error getting address :", error);
    }
}
export async function deleteAddress({ id }) {

    const url = `https://chicwardrobe-znz5.onrender.com/address/${id}`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.body);

        }

        console.log('address is deleted')
        return true;

    } catch (error) {
        console.error("Error deleting address :", error);
        return false;
    }
}