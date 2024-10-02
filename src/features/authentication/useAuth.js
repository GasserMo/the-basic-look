

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/apiAuth";

export function useRegister() {

    const navigate = useNavigate();
    const { mutate: register, isLoading } = useMutation({
        mutationFn: ({ name, email, password }) => registerUser({ name, email, password }),
        onSuccess: (user) => {
            console.log('query user ' + user)
            navigate('/home')
        },
        onError: (err) => {
            console.log('error is ' + err)
        }
    })
    return { register, isLoading };
}

export function useLogin() {

    const navigate = useNavigate();
    const { mutate: login, isLoading, isSuccess, } = useMutation({
        mutationFn: async ({ email, password }) => loginUser({ email, password }),
        onSuccess: (user) => {
            console.log('query user ' + user)
            navigate('/home')
        },
        onError: (err) => {
            console.log('error is ' + err)
        }
    })
    return { login, isLoading, isSuccess, };
}