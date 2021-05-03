// import shop from '../../api/shop'
// import axios from 'axios';

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
    console.log(userData)
    commit('setUser', userData)
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