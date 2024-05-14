import { defineStore } from "pinia";
import { agregarGasto } from "~/services/gastosServices";


interface Gasto{
    id: string;
    nombre:string;
    cantidad: number;
    categoria: string;
    descripcion: string;
    fecha:string;
}

export const useGastoStore = defineStore('gasto',{
    state: ()=> ({
       gastos: [] as Gasto[],
    }),
    getters:{
        getGastoById: (state) => (gastoId:string) =>
            state.gastos.find(gasto => gasto.id === gastoId),
        getGastoByCategoria: (state) => (gastoCategoria:string)=>
           state.gastos.filter(gasto=> gasto.categoria === gastoCategoria)
    },
    actions:{
      async añadirGasto(
            this: {gastos: Gasto[]},
            nombre:string,
            cantidad:number,
            categoria:string,
            descripcion:string,
            fecha:string
        ){
             const nuevoGasto: Gasto = {
               nombre,
               cantidad,
               categoria,
               descripcion,
               fecha,}
            const response = await agregarGasto()
            console.log(response)
           
            if(response){
                 this.gastos.push(nuevoGasto)
            }

        },
        updateGasto(this: {gastos: Gasto[]}, gastoActualizado: Gasto){
            const i = this.gastos.findIndex(gasto => gasto.id === gastoActualizado.id)
            if(i !== -1){
                this.gastos[i] = gastoActualizado
            }
        },
        deleteGasto(this: {gastos: Gasto[]}, gastoId: string){
            this.gastos = this.gastos.filter(gasto => gasto.id !== gastoId )
        }
    }
})