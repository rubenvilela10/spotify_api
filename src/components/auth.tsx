import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../lib/auth";

export default function Auth() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')

        if(token) {
            setToken(token)
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [])

    return <p>Authenticating ...</p>
}