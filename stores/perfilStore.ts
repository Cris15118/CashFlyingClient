import { defineStore } from "pinia";

interface Perfil{
    id:string,
    nombre:string,
    apellidos:string,
    email:string,
    edad:number,
    telefono:number,
    calle:string,
    numero:number,
    poblacion:string,
    provincia:string,
    pais:string
  }

  export const usePerfilStore = defineStore('perfil',{
    state: ()=> ({
        perfil: [] as Perfil[]
    }),
    getters:{
        getUsuarioById: (state) => (perfilId:string) => state.perfil.find(perfil => perfil.id === perfilId),
        
    },
    actions:{
        añadirPerfil(this:{perfil: Perfil[]},
            nombre:string,
            apellidos:string,
            email:string,
            edad:number,
            telefono:number,
            calle:string,
            numero:number,
            poblacion:string,
            provincia:string,
            pais:string ){
                const perfilNuevo: Perfil = {
                    nombre,
                    apellidos,
                    email,
                    edad,
                    telefono,
                    calle,
                    numero,
                    poblacion,
                    provincia,
                    pais
                }
                this.perfil.push(perfilNuevo)
            },
            UpdatePerfil(this:{perfil: Perfil[]}, perfilActualizado: Perfil){
                    const i = this.perfil.findIndex(perfil => perfil.id === perfilActualizado.id)
                    if(i !== -1){
                        this.perfil[i] = perfilActualizado
                    }
                }
    }
  })