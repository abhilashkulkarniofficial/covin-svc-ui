// import shop from '../../api/shop'
// import axios from 'axios';

// state
const state = () => ({
    slots: [],
    pincode:null
})

// getters
const getters = {
  getPincode:(state) => {
    return state.pincode
  },
  getSlots:(state) => {
    return state.slots
  }
}

// actions
const actions = {
  async searchCenters({commit}, filter){
    // let result = await axios.get('http://localhost:3000/searchByPin',{params:filter})
    let data = [
      {
          "center_id":682515,
          "name":"MAX MULTISPECIALTY CENTER",
          "state_name":"Uttar Pradesh",
          "block_name":"Bisrakh",
          "pincode":"201301",
          "from":"09:00:00",
          "to":"18:00:00",
          "lat":28,
          "long":77,
          "fee_type":"paid",
          "session_id":"12345",
          "date":"06-05-2021",
          "available_capacity":1,
          "fee":"900",
          "min_age_limit":18,
          "vaccine":"COVISHIELD",
          "slots":[
              "09:00AM-11:00AM",
              "11:00AM-01:00PM",
              "01:00PM-03:00PM",
              "03:00PM-06:00PM"
          ],
          "reveal":false
      },
      {
          "center_id":682515,
          "name":"MAX MULTISPECIALTY CENTER",
          "state_name":"Uttar Pradesh",
          "block_name":"Bisrakh",
          "pincode":"201301",
          "from":"09:00:00",
          "to":"18:00:00",
          "lat":28,
          "long":77,
          "fee_type":"paid",
          "session_id":"12345",
          "date":"06-05-2021",
          "available_capacity":1,
          "fee":"900",
          "min_age_limit":18,
          "vaccine":"COVISHIELD",
          "slots":[
              "09:00AM-11:00AM",
              "11:00AM-01:00PM",
              "01:00PM-03:00PM",
              "03:00PM-06:00PM"
          ],
          "reveal":false
      },
      {
          "center_id":682515,
          "name":"Apollo",
          "state_name":"Uttar Pradesh",
          "block_name":"Bisrakh",
          "pincode":"201301",
          "from":"09:00:00",
          "to":"18:00:00",
          "lat":28,
          "long":77,
          "fee_type":"paid",
          "session_id":"12345",
          "date":"06-05-2021",
          "available_capacity":1,
          "fee":"900",
          "min_age_limit":18,
          "vaccine":"COVISHIELD",
          "slots":[
              "09:00AM-11:00AM",
              "11:00AM-01:00PM",
              "01:00PM-03:00PM",
              "03:00PM-06:00PM"
          ],
          "reveal":false
      },
      {
          "center_id":682515,
          "name":"Aster",
          "state_name":"Uttar Pradesh",
          "block_name":"Bisrakh",
          "pincode":"201301",
          "from":"09:00:00",
          "to":"18:00:00",
          "lat":28,
          "long":77,
          "fee_type":"paid",
          "session_id":"12345",
          "date":"06-05-2021",
          "available_capacity":1,
          "fee":"900",
          "min_age_limit":18,
          "vaccine":"COVISHIELD",
          "slots":[
              "09:00AM-11:00AM",
              "11:00AM-01:00PM",
              "01:00PM-03:00PM",
              "03:00PM-06:00PM"
          ],
          "reveal":false
      }
  ]
    // console.log(result.data)
    commit('setSlots', data)
    commit('setPincode', filter.pincode)
  }
}

// mutations
const mutations = {
  setPincode(state,data){
    state.pincode = data
  },
  setSlots(state, data){
    state.slots = data
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}