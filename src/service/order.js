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

export const isDelivered  = async(id, data) => {
    const test = await fetch(`http://localhost:4000/order/edit-order/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    }).then((res) => res.json())

    return test 
}
