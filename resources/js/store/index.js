import axios from 'axios';
import {getLocalUser,setAuthorization} from '../middleware/init.config'
import {clients} from './clients'

const user = getLocalUser()

const store = {
  state: {
    currentUser: user,
    loading: false,
    lastError:'',
    drawerState:true,
  },
  getters: {
    isLoggedIn(state) {
      return !!state.currentUser
    },
    userName(state){
      return state.currentUser.name
    }
  },
  mutations: {
    SET_LOGIN(state, {data})  {
      state.currentUser = Object.assign({}, data.user, { token: data.access_token });
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    SET_LOGOUT(state) {
      state.currentUser = null;
      localStorage.removeItem("user");
    },
    SET_DRAWER(state){
      state.drawerState = !state.drawerState
    }
  },
  actions: {
    loginUser({commit},credentials){
      return new Promise((resolve,reject)=>{
        axios.post('/api/login', credentials).then((res)=>{
          setAuthorization(res.data.access_token);
          commit('SET_LOGIN',res)
          resolve(res)
        }).catch((e)=>{
          reject(e)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve,reject)=>{
        axios.post('/api/logout').then((res)=>{
          setAuthorization('');
          commit('SET_LOGOUT')
          resolve(res)
        }).catch((e)=>{
          setAuthorization('');
          commit('SET_LOGOUT')
          reject(e)
        })
      })
    }
  },
  modules:{
    clients
  }
}

export default store