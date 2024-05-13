import service from "./config.services";

const registerServices = (user) => {
    return service.post("/Identity/Register", user) 
}

const loginServices = (credentials) => {
    
    return service.post("/Identity/Login", credentials)
}

const cambiarContraseñaServices = () =>{
    return service.post("/Identity/CambiarPassword")
}

export {
    registerServices,
    loginServices,
    cambiarContraseñaServices
}