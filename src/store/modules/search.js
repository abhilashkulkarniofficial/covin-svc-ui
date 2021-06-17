// import shop from '../../api/shop'
import axios from 'axios';

// state
const state = () => ({
    slots: [],
    pincode:null,
    states: [],
    districts: []
})

// getters
const getters = {
  getPincode:(state) => {
    return state.pincode
  },
  getSlots:(state) => {
    return state.slots
  },
  getStates:(state) => {
    return state.states
  },
  getDistricts:(state) => {
    return state.districts
  }
}

// mutations
const mutations = {
  setPincode(state,data){
    state.pincode = data
  },
  setSlots(state, data){
    state.slots = data
  },
  setStates(state, data){
    state.states = data
  },
  setDistricts(state, data){
    state.districts = data
  },

}

// actions
const actions = {
  async getStates({commit}){
    let result = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
    commit('setStates', result.data.states)
  },
  async getDistricts({commit},payload){
    let result = await axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${payload.state_id}`)
    commit('setDistricts', result.data.districts)
  },
  async searchCenters({commit}, filter){
    if(!filter.vaccinePref || !filter.vaccinePref.length){
        filter.vaccinePref = [ 'COVAXIN', 'COVISHIELD', 'SPUTNIK' ]
    }

    if(filter.ageLimit){
      filter.ageLimit = [parseInt(filter.ageLimit)]
    }else{
        filter.ageLimit = [0, 18, 45]
    }
    let query = ``
    let params = {}
    if(filter.searchBy[1]){
      query = `${query}https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin`
      params['date'] = filter.date
      params['pincode'] = filter.pincode
      // result = await axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin',{params:filter})
    }else{
      query = `${query}https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict`
      params['date'] = filter.date
      params['district_id'] = filter.district_id
      // result = await axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict',{params:filter})
    }
    await axios.get(query, {params:params})
        .then(response => {
            // response.data.sessions = parseCenters(filter, response)
            let sessions = []
            for(let i=0; i<response.data.sessions.length; i++){
                if(response.data.sessions[i].available_capacity>0 
                    && filter.vaccinePref.includes(response.data.sessions[i].vaccine) 
                    && filter.ageLimit.includes(response.data.sessions[i].min_age_limit)){
                    response.data.sessions[i]['reveal'] = false
                    response.data.sessions[i]['moreDetails'] = false
                    sessions.push(response.data.sessions[i])
                }
            }
            response.data.sessions = sessions
            commit('setSlots', response.data.sessions)
            // res.status(200).send(response.data)
        })

    // let result = await axios.get(`${process.env.VUE_APP_SERVER}/getCenters`,{params:filter})
    // console.log(result.data)
    
  
    // commit('setPincode', filter.pincode)
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}