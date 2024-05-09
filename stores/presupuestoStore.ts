import { defineStore } from "pinia";



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
        añadirSaldo(nuevoSaldo:number){
            this.saldo = nuevoSaldo
        },
       
    }
})