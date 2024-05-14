import service from "./config.services";

const listarGastos = ()=> {
    return service.get("/Gasto/listad-gastos")
}

const detalleGasto = (gastoId) =>{
    return service.get(`/Gasto/VerGasto/${gastoId}`)
}

const agregarGasto = (nuevoGasto) =>{
    return service.post("/Gasto/AgregarGasto", nuevoGasto)
}

const editarGasto = (gastoId, updateGasto)=>{
    return service.put(`/Gasto/ActualizarGasto/${gastoId}`, updateGasto)
}

const deleteGasto = (gastoId) =>{
    return service.delete(`/Gasto/ElininarGasto/${gastoId}`)
}

export {
    listarGastos,
    detalleGasto,
    agregarGasto,
    editarGasto,
    deleteGasto
}