<template>
    <v-container>
        <div>
            <v-card flat>
                <v-card-text>
                    <v-row  class="px-4">
                        <div>
                            Search for the centers using Pincode or State.
                        </div>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="5" md="5">
                            <v-text-field v-model="pincode" label="Enter 6 digit Pincode" placeholder="110001" outlined clearable dense small></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="5" md="5">
                            <v-select v-model="state" :items="items" label="Select State" placeholder="Delhi" outlined clearable dense></v-select>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-btn class="mt-1" color="#FFAAAA" block :disabled="disable[0] && disable[1]" @click="searchCenters">Search</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
             
        </div>
       <div>
           <v-row justify="start">
               <v-col v-for="(slot, index) in slots" :key="index" cols="12"  sm="6" md="4">
                   <v-card class="mx-auto" max-width="344" >
                        <v-card-text>
                        <p class="h3 text--primary text-center"> <strong> {{slot.name}} </strong> </p>
                        <div class="text--primary">
                            <strong>Date:</strong> {{slot.date}}<br/>
                            <strong>Address:</strong><br/>
                            {{slot.block_name}}, {{slot.state_name}} - {{slot.pincode}}
                        </div>
                        </v-card-text>
                        <v-card-actions>
                        <v-btn text color="teal accent-4" small @click="slot.reveal = true">
                            Slots
                        </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                        <v-card v-if="slot.reveal" class="transition-fast-in-fast-out v-card--reveal py-0" style="height: 100%;">
                            <v-card-text class="py-1">
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
                    </v-card>
               </v-col>
           </v-row>
           
       </div>
    
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
      computed:{
        ...mapGetters('search', {
      centerSlots: 'getSlots'
    })
    },
    data () {
      return {
        pincode:null,
        state:null,
        items:[
            'Delhi',
            'Karnataka',
            'Maharashtra',
            'Uttar Pradesh'
        ],
        filter:{},
        disable:[true, true],
        slots:[]
      }
    },
    watch: {
      pincode (val) {
        if(val && val.length === 6){
            this.state = null
            this.disable[0] = false
            this.filter = {'pincode':val}
        }else{
            this.disable[0] = true
        }
      },
      state (val) {
          if(val){
              this.pincode = null
              this.disable[1] = false
              this.filter = {'state':val}
          }else{
              this.disable[1] = true
          }
      }
    },
    methods: {
      async searchCenters(){
          await this.$store.dispatch('search/searchCenters',this.filter)
          this.slots = JSON.parse(JSON.stringify(this.centerSlots))
      }
    },
    mounted(){
        // console.log(this.centerSlots)
        this.$store.commit('search/setSlots',[])        
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