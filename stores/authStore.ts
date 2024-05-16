import { defineStore } from "pinia";
import { loginServices, registerServices } from "~/services/authServices";

interface UserPayloadInterface {
    email:string,
    password: string
}
interface Usuario{
    id: string,
    email:string,
    password: string
}


export const useAuthStore = defineStore('auth', {
    state: ()=>({
        usuario: [] as Usuario[],
        cambioPassword: [] as CambioPassword[],
        authenticated: false,
    }),
    actions: {
        async registerUser(this: {usuario: Usuario[]}, email:string, password:string){
            const response = await registerServices({email, password})
        },
        async authenticateUser({email, password}: UserPayloadInterface  ){
            const response = await loginServices()
           
            if(response){
                const token = useCookie('token')
                token.value = response.token

                this.authenticated = true
            }
        },
        logoutUser(){
            const token = useCookie('token')
            this.authenticated=false
            token.value = null
            
        },

    }
})