// import shop from '../../api/shop'

// state
const state = () => ({
    centers: [],
    location:null
})

// getters
const getters = {
  getLocation:(state) => {
    return state.location
  }
}

// actions
const actions = {
  searchCenters({commit}, location){
    commit('setLocation', location)
  }
}

// mutations
const mutations = {
  setLocation(state,data){
    state.location = data
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}