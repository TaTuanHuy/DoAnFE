export const createOrder = async (orders, ship, payment, total, id) => {
    const param = await {
        orderItems: orders,
        shippingAddress: ship,
        paymentMethod: payment,
        totalPrice: total,
        user: id,
    };
    const data = fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/order/create-order`, {
        method: "POST",
        body: JSON.stringify(param),
        headers: {
            "Content-type": "application/json",
        },
    }).then((res) => res.json());
    return data;
};

export const getAllOrder = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/order/get-order`, {
        method: "GET",
    }).then((res) => res.json());
    return data;
};

export const isDelivered = async (id, data) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/order/deliver-order/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        });
        return await response.json();
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}


export const getAllUser = async (token) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/users/all-user`, {
        method: "GET",
        headers: {
            "token": token
        }
    }).then((res) => res.json())
    return response
}

export const changeAmdin = async (token, id, data) => {

    data.isAdmin = true
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/users/update/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
            "token": token
        }
    }).then((res) => res.json())
    return response
}

export const deleteUser = async (token, id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/users/move/trash/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "token": token
        }
    }).then((res) => res.json())
    return response
}

export const getOrderByUserID = async (id, token) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/order/user/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "token": token
        }
    }).then((res) => res.json())
    return response
}

export const getOrderByID = async (id, token) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/order/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "token": token
        }
    }).then((res) => res.json())
    return response
}

export const deleteOrder = async (id, token) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/order/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "token": token
        }
    }).then((res) => res.json())
    return response
}

export const reckonToday = async (startDate, endDate) => {
    const date = {
        startDate, endDate
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/order/find-by-date`, {
        method: "POST",
        body: JSON.stringify(date),
        headers: {
            "Content-type": "application/json",
        }
    }).then((res) => res.json())
    return response
}

export const reckonRange = async (startDate, endDate) => {
    const date = {
        startDate, endDate
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/order/find-by-range`, {
        method: "POST",
        body: JSON.stringify(date),
        headers: {
            "Content-type": "application/json",
        }
    }).then((res) => res.json())
    return response
}

export const reckonMonth = async (date) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/order/find-by-month`, {
        method: "POST",
        body: JSON.stringify({ date }),
        headers: {
            "Content-type": "application/json",
        }
    }).then((res) => res.json())
    return response
}


export const editOrder = async (id, data) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/order/edit-order/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ data }),
            headers: {
                "Content-type": "application/json",
            }
        })
        return await response.json();
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}



