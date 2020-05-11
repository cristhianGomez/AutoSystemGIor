import axios from 'axios';
import { message } from "../middleware/helpers";

export const locations = {
  namespaced:true,
  state: () => ({
    locations:[]
  }),

  getters: {
    options(state) {
      const options =state.locations.map(r => {
        return {
          text: r.name,
          value: r.id
        };
      });
      return options ||   []
    },
  },
  mutations: {
    SET_LOCATIONS(state,payload){
      state.locations = payload
    },
    REMOVE_LOCATION(state,payload){
      state.locations = state.locations.filter(r=> r.id != payload)
    },
    UPDATE_LOCATION(state,payload){
      state.locations.some((r,i)=>{
          if(r.id == payload.id){
              state.locations.splice(i, 1, payload)
              return true
          }
          return false
      })
    },
    ADD_LOCATION(state,payload){
      state.locations.push(payload)
    },
  },
  actions: { 
    async getLocations({state,commit}){
      if(!state.locations.length){
        try {
          const {data} = await axios.get(`/api/locations`)
          commit('SET_LOCATIONS', data.locations)
        } catch (error) {
          commit('SET_ERROR', error,{root:true})
        }
     }
    },
    getLocation({commit,state},id){
      return new Promise(async(resolve,reject)=>{
      try{
        const location =state.locations.find(r=>r.id == id)
        if(location){
          resolve(location)
        }else{
          const {data} = await axios.get(`/api/locations/${id}`)
          data.location ?resolve(data.location) :reject('Location no encontrada')
        }
      } catch (error) {
        commit('SET_ERROR', error,{root:true})
        reject()
      }
      })
    },
     async createLocation({commit},payload){
      try{
          const {data} = await axios.post(`/api/locations`,payload)
          commit('ADD_LOCATION',data.location)
          message("Localidad creada!",'info')

        } catch (error) {
          commit('SET_ERROR', error,{root:true})
      }
    },
   updateLocation({commit},{name,id}){
      return new Promise(async(resolve,reject)=>{
      try{
          const {data} = await axios.put(`/api/locations/${id}`,{name})
          commit('UPDATE_LOCATION',data.location)
          message("Localidad actualizada!",'info')
          resolve()
        } catch (error) {
        commit('SET_ERROR', error,{root:true})
        reject()
      }
      })
    },
    async removeLocation({commit},id){
      try {
        await axios.delete(`/api/locations/${id}`)
          message("Localidad removida!",'info')
        commit('REMOVE_LOCATION', id)
      } catch (error) {
        commit('SET_ERROR', error,{root:true})
      }  
    }   
}
}
