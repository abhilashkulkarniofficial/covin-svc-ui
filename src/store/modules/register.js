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
      let params = userData.params
      let body = userData.body
      let test = false
      let query = `https://vaccine-track.azurewebsites.net/api/registration?vaccine=${params.vaccine.toUpperCase()}&payment=${params.payment.toUpperCase()}&code=${params.code}`
      if(test){
        query = `${query}&test=true`
      }
      console.log(query, JSON.stringify(body))
      result = await axios.post(query, body)
      console.log(result)
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