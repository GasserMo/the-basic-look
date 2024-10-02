/* eslint-disable no-unused-vars */
import axios from "axios";

const publicKey = 'pk_test_51OHwL2AdAEP20rghX2I5FnprUmOzcdfn3feKAXtnqbxFbjh6xcxnTcvosRA5WpxOlAqOwzY3BksL8rkJB1Hjq22q00MgrdGBAz'

export const goToPayment = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("userData"))?.token;
        console.log("goToPayment...");
        const response = await axios.get(
            `https://chicwardrobe-znz5.onrender.com/orders/checkout`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,

                },
            }

        );
        console.log("goToPayment successfully")
        localStorage.setItem("sessionId", response.data.sessionId)
        console.log(response.data.sessionId);
        return response.data.sessionId;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const checkout = async (sessionId) => {
    try {
        console.log(sessionId);
        const token = JSON.parse(localStorage.getItem("userData"))?.token;
        console.log("Checking out...");

        const response = await axios.post(
            `https://chicwardrobe-znz5.onrender.com/orders`,
            { sessionId },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Payment placed successfully");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        // throw error;
    }
};

export async function getOrders() {
    const url = `https://chicwardrobe-znz5.onrender.com/orders`;
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        /* if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${errorMessage}`);
        } */
        const data = await response.json();
        console.log('orders is here')

        return data;
    } catch (error) {
        console.error("Error registering user:", error);
    }
}