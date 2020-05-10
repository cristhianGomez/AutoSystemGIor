import axios from 'axios';

export const clients = {
  state: () => ({
    clients:[]
  }),
  mutations: {
    SET_CLIENTS(state,payload){
      state.clients = payload
    },
    REMOVE_CLIENT(state,payload){
      state.clients = state.clients.filter(r=> r.id != payload)
    }
  },
  actions: { 
    async getClients({commit},id){
      try {
        const {data} = await axios.get(`/api/clients/location/${id}`)
        commit('SET_CLIENTS', data)
      } catch (error) {
        commit('SET_ERROR', error,{root:true})
      }
    },
    getClient({},id){
      return new Promise(async(resolve,reject)=>{
      try{
        const client =clients.find(r=>r.id == id)
        if(client){
          resolve(client)
        }else{
          const {data} = await axios.get(`/api/clients/${id}`)
          data ?resolve(client) :reject('Cliente no encontrado')
        }
      } catch (error) {
        reject(error)
      }
      })
    },
    updateClient({},{payload,id}){
      return new Promise(async(resolve,reject)=>{
      try{
          await axios.update(`/api/clients/${id}`,payload)
          resolve()
        } catch (error) {
        reject(error)
      }
      })
    },
    async removeClient({commit},id){
      try {
        await axios.delete(`/api/clients/${id}`)
        commit('REMOVE_CLIENT', id)
      } catch (error) {
        commit('SET_ERROR', error,{root:true})
      }  
    }   
},
getters: { }
}
