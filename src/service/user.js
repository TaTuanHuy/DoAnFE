import axios from "axios";

export const axiosJWT = axios.create();

export const GetDetailUser = async (id, access_token) => {
    try {
        const res = await axiosJWT.get(
            `${process.env.NEXT_PUBLIC_API_APP_URL}/users/profile/${id}`,
            {
                headers: {
                    token: `${access_token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        return error;
    }
};

export const rf = async (refresh_token) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/refresh`, {
        method: "POST",
        headers: {
            refresh: `${refresh_token}`,
        },
    });
    const data = await res.json();
    return data;
};


export const editUser = async (data, id, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/users/update/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                token
            }
        })
        return await response.json();
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}

export const updatePassWord = async (id, data, token) => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/users/update-password/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                token
            }
        })
        return await response.json()
    }catch(err){
        return res.status(400).json({ message: err });
    }
}