import axios from 'axios';
import { message } from "../middleware/helpers";
import {getLocalUser,setAuthorization} from '../middleware/init.config'
import {clients} from './clients'
import {locations} from './locations'

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
    },
    SET_ERROR(state,error){
      const msg = error.response.data
      state.lastError = msg
      if(msg.errors){
          Object.keys(msg.errors).map((r)=>{
            if(r == 'email'){
              message(`El ${r} ya esta siendo utilizado`,'error')
            }else{
              message(`El campo ${r} no cumple lo requisitos`,'error')
            }            
          })
      }else{
      message(error.response.data.message,'error')
      }
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
    clients,
    locations
  }
}

export default store