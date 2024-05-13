import service from "./config.services";

const obtenerPresupuesto = ()=>{
    return service.get("/Presupuesto/ObtenerSaldo")
}

const agregarPresupuesto = (nuevoPresupuesto)=> {
    return service.post("/Presupuesto/agregar-presupuesto", nuevoPresupuesto)
}

export {
    obtenerPresupuesto,
    agregarPresupuesto
}