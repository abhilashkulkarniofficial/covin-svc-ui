<template>
    <v-container fluid>
        <div>
            <v-card flat  align="center">
                <v-card-subtitle>
                    Search for vaccine availability using Pincode or District.
                </v-card-subtitle>
                <v-card-text>
                    <v-container grid-list-md text-xs-center>
                        <v-row>
                            <v-layout row wrap>
                                <v-flex xs12 sm4 md4 my-n2>
                                    <v-text-field v-model="pincode" label="Enter 6 digit Pincode" placeholder="110001" outlined clearable dense small></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm4 md4 my-n2>
                                    <v-select v-model="state" :items="states" item-text="state_name" item-value="state_id" label="Select State" placeholder="Karnataka" outlined dense></v-select>
                                </v-flex>
                                <v-flex xs12 sm4 md4 my-n2>
                                    <v-select v-model="district" :items="districts" item-text="district_name" item-value="district_id" label="Select District" placeholder="Bengaluru Urban" outlined dense></v-select>
                                </v-flex>
                            </v-layout>
                        </v-row>
                        <v-row>
                            <v-layout row wrap>
                                <v-flex xs12 sm4 md4 my-n1 px-2>
                                    <Date v-model="selectedDate" label="Date" @input="closeDate()"/>
                                </v-flex>
                                <!-- <v-flex xs12 sm4 md4 my-n2>
                                    <v-select v-model="vaccine" :items="vaccines" item-text="vaccine_name" item-value="vaccine_id" label="Vaccine Preference" placeholder="Covishield" outlined dense></v-select>
                                </v-flex> -->
                                <v-flex offset-md6 offset-xs3 xs6 sm4 md2 my-n2>
                                    <v-btn class="white--text" color="#D46A6A" :disabled="disable[0] && (disable[1] || district==null) " @click="searchCenters" block>Search</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-row>
                            
                        
                    </v-container>
                </v-card-text>
            </v-card>
            <!-- <v-card>
                <v-tabs v-model="tab" align-with-title show-arrows>
                    <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in items" :key="item">
                        <v-card flat>
                            <v-card-text v-text="item"></v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card> -->

           <v-row justify="start">
               <v-col v-for="(slot, index) in slots" :key="index" cols="12"  sm="6" md="4">
                   <v-card class="mx-auto" max-width="344" >
                        <v-card-text>
                        <p class="h3 text--primary text-center"> <strong> {{slot.name}} </strong> </p>
                        <div class="text--primary">
                            <strong>Date:</strong> {{slot.date}}<br/>
                            <strong>Address:</strong><br/>
                            {{slot.address.substring(0,30)+'...'}}<br/>
                            <strong>Vaccine:</strong> {{slot.vaccine}}<br/>
                            <strong>Available Capacity:</strong> {{slot.available_capacity}}<br/>
                            <strong>Fee Type:</strong> {{slot.fee_type}}<br/>
                            <strong>Minimum Age:</strong> {{slot.min_age_limit}}<br/>
                        </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn text color="teal accent-4" small @click="slot.reveal = true">
                                Slots
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn text color="teal accent-4" small @click="slot.moreDetails = true">
                                More Details
                            </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                            <v-card v-if="slot.reveal" class="transition-fast-in-fast-out v-card--reveal py-0" style="height: 100%;">
                                <v-card-text>
                                <p class="h2 text--primary text-center mb-3"> <strong> Slots </strong>  </p>
                                <v-row justify="center" v-for="(time,index) in slot.slots" :key="index">
                                    <p class="text--primary my-1"> {{time}} </p>
                                </v-row>
                                </v-card-text>
                                <v-card-actions class="justify-center">
                                <v-btn text color="teal accent-4" @click="slot.reveal = false" small >
                                    Close
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-expand-transition>
                        <v-expand-transition>
                            <v-card v-if="slot.moreDetails" class="transition-fast-in-fast-out v-card--reveal py-0" style="height: 100%;">
                                <v-card-text>
                                <p class="h2 text--primary text-center mb-3"> <strong> More Details </strong>  </p>
                                <div class="text--primary">
                                    <strong>Address:</strong><br/>
                                    {{slot.address}}<br/>
                                    <strong>Available Capacity 1st Dose:</strong> {{slot.available_capacity_dose1}}<br/>
                                    <strong>Available Capacity 2nd Dose:</strong>{{slot.available_capacity_dose2}}<br/>
                                    <strong>Fees:</strong> ₹{{slot.fee}}<br/>
                                </div>
                                </v-card-text>
                                <v-card-actions class="justify-center">
                                <v-btn text color="teal accent-4" @click="slot.moreDetails = false" small >
                                    Close
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-expand-transition>
                    </v-card>
               </v-col>
           </v-row>
           
       </div>
    
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import Date from '../basic/date.vue'
  export default {
      components:{Date},
      computed:{
        ...mapGetters({
      centerSlots: 'search/getSlots',
      states:  'search/getStates',
      districts: 'search/getDistricts'
        })
    },
    data () {
      return {
        pincode:null,
        state:null,
        district:null,
        filter:{},
        disable:[true, true],
        slots:[],
        reveal:false,
        tab:null,
        items: [],
        vaccines: [
            {vaccine_name:'Covishield', vaccine_id:'covishield'},
            {vaccine_name:'Covaxin', vaccine_id:'covaxin'},
            {vaccine_name:'Sputnik', vaccine_id:'sputnik'},
        ],
        vaccine:null,
        selectedDate:null
      }
    },
    watch: {
      pincode (val) {
        if(val && val.length === 6){
            this.state = null
            this.district = null
            this.disable[0] = false
            this.filter = {'pincode':val}
        }else{
            this.disable[0] = true
        }
      },
      async state (val) {
          if(val){
              this.district = null
              this.pincode = null
              this.disable[1] = false
              this.filter = {'state':val}
              await this.$store.dispatch('search/getDistricts',{state_id:val})
          }else{
              this.disable[1] = true
          }
      }
    },
    methods: {
        async searchCenters(){
            if(this.district){
                this.filter['district_id'] = this.district
            }
            if(!this.selectedDate){
                this.filter['date'] = this.currentDateTime()
            }
            this.filter['searchBy'] = this.disable
            // console.log(this.filter)
            await this.$store.dispatch('search/searchCenters',this.filter)
            this.slots = JSON.parse(JSON.stringify(this.centerSlots)) // Do not change this. This does deep copy
        },
        currentDateTime() {
            return moment().format('DD-MM-YYYY')
        },
        getDates(){
            for(let i=0;i<7; i++){
                this.items.push(moment().add(i, 'days').format('DD-MM-YYYY'))
            }
        },
        closeDate(){
            this.filter['date'] = this.selectedDate
        }
    },
    mounted(){
        // console.log(this.centerSlots)
        this.$store.commit('search/setSlots',[])        
        this.$store.dispatch('search/getStates')
        this.getDates()
    }
  }
</script>
<style scoped>
.myGrid {
  display: grid;
  grid-template-columns: auto auto auto;         
  grid-template-rows: repeat(3, 1fr) auto auto; 
  grid-template-areas: 
    "orange indigo1 red"
    "orange indigo2 red"
    "orange indigo3 red"
    "purple green red"
    "purple green blue"
    ;
  grid-gap: 0.5rem;
  max-width: 600px;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>