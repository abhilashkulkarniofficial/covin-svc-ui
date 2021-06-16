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
      body['test'] = true
      await axios.post(`${process.env.VUE_APP_SERVER}/newUser`,body)
        .then(response => {
          // console.log(response)
          result = response
          if(response.data.status==="409"){
            result.status = 409
          }
        }).catch(err => {
          // console.log(err)
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