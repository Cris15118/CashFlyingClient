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
            const response = await agregarPresupuesto()
            if(response){
                this.saldo = nuevoPresupuesto
            }     
           
        },
       
    }
})