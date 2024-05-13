import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware((to)=> {
   
    const {authenticated}= storeToRefs(useAuthStore())
    const token = useCookie('token')
    const authStore = useAuthStore()

    if(token.value){
        authenticated.value = true
    }
    
    if(token.value && to?.name === 'Login'){
        return navigateTo('/')
    }
    if(!token.value && to?.name !== 'Login'){
        abortNavigation()
       
    }

})