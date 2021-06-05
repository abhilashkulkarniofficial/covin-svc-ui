// import shop from '../../api/shop'

import axios from "axios"

// state
const state = () => ({
    user:''
})

// getters
const getters = {
    getUser:(state) => {
        return state.user
      }
}

// actions
const actions = {
  async register({commit}, userData){
    let result
    try{
      let body = userData.body
      await axios.post(`https://covin-svc-api.herokuapp.com/newUser`,body)
        .then(response => {
          result = response
          if(response.data===409){
            result.status = 409
          }
        }).catch(err => {
          result = err
        })
        
      commit('setUser', userData)
      return result.status
    }catch(err){
      // if(err.includes('409')) console.log(409)
      return err
    }
    
    
  }
}

// mutations
const mutations = {
    setUser(state,data){
        state.user = data
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}