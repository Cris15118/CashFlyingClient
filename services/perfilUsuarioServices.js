import service from "./config.services";

const verPerfil = (perfilId) =>{
    return service.get(`/PerfilUsuario/VerPeril/${perfilId}`)
}

const crearPerfil = (nuevoPerfil) =>{
    return service.post("/PerfilUsuario/CrearPerfil", nuevoPerfil)
}

const editarPerfil = (perfilId, updatePerfil) =>{
    return service.put(`/PerfilUsuario/ActualizarPerfil/${perfilId}`, updatePerfil)
}

const deletePerfil = (perfilId)=>{
    return service.delete(`/PerfilUsuario/EliminarPerfil/${perfilId}`)
}

export {
    verPerfil,
    crearPerfil,
    editarPerfil,
    deletePerfil

}