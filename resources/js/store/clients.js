import axios from 'axios';
import { message } from "../middleware/helpers";

export const clients = {
  namespaced:true,
  state: () => ({
    clients:[]
  }),
  mutations: {
    SET_CLIENTS(state,payload){
      state.clients = payload
    },
    REMOVE_CLIENT(state,payload){
      state.clients = state.clients.filter(r=> r.id != payload)
    },
    UPDATE_CLIENT(state,payload){
      state.clients.some((r,i)=>{
          if(r.id == payload.id){
              state.clients[i] = payload
              return true
          }
          return false
      })
    },
    ADD_CLIENT(state,payload){
      state.clients.push(payload)
    },
  },
  actions: { 
    async getClients({commit},id){
      try {
        const {data} = await axios.get(`/api/clients/location/${id}`)
        commit('SET_CLIENTS', data.clients)
      } catch (error) {
        commit('SET_ERROR', error,{root:true})
      }
    },
    getClient({commit,state},id){
      return new Promise(async(resolve,reject)=>{
      try{
        const client =state.clients.find(r=>r.id == id)
        if(client){
          resolve(client)
        }else{
          const {data} = await axios.get(`/api/clients/${id}`)
          data.client ?resolve(data.client) :reject('Cliente no encontrado')
        }
      } catch (error) {
        commit('SET_ERROR', error,{root:true})
        reject()
      }
      })
    },
     createClient({commit},payload){
      return new Promise(async(resolve,reject)=>{
      try{
          const {data} = await axios.post(`/api/clients`,payload)
          commit('ADD_CLIENT',data.client)
          message("Cliente creado!",'info')
          resolve()
        } catch (error) {
        commit('SET_ERROR', error,{root:true})
        reject()
      }
      })
    },
   updateClient({commit},{payload,id}){
      return new Promise(async(resolve,reject)=>{
      try{
          const {data} = await axios.put(`/api/clients/${id}`,payload)
          commit('UPDATE_CLIENT',data.client)
          message("Cliente actualizado!",'info')
          resolve()
        } catch (error) {
        commit('SET_ERROR', error,{root:true})
        reject()
      }
      })
    },
    async removeClient({commit},id){
      try {
        await axios.delete(`/api/clients/${id}`)
        commit('REMOVE_CLIENT', id)
          message("Cliente removido!",'info')
      } catch (error) {
        commit('SET_ERROR', error,{root:true})
      }  
    }   
},
getters: { }
}
