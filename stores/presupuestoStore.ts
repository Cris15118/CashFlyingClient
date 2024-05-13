import { defineStore } from "pinia";
import { agregarPresupuesto } from "~/services/presupuestoServices";



interface Presupuesto{
    saldo:number;
}

export const usePresupuestoStore = defineStore('presupuesto', {
    state: (): Presupuesto => ({
        saldo:0,  
       
    }),
    getters:{
 
    },
    actions:{
       async añadirSaldo(nuevoPresupuesto:number){
        try {
            const response = await agregarPresupuesto({saldo:nuevoPresupuesto})
        } catch (error) {
            console.log(error)
        }
          
        },
       
    }
})