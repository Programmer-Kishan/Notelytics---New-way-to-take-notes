import { User } from "../models/user";
import { fetchData } from "../utils/fetchApiData";

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/user", {method: "GET"});
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string
}

export async function SignUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData(
        "/api/user/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }
    )
    return response.json()
}

export interface LoginCredentials {
    username: string, 
    password: string,
}

export async function Login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData(
        "/api/user/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        }
    );
    return response.json();
}