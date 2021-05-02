<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6" md="2">
                <v-text-field v-model="name" label="Name" placeholder="John Doe" small dense outlined clearable></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="email" label="Email" type="email" placeholder="username@domain.com" dense outlined clearable></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
                <v-text-field v-model="pincode" label="PinCode" placeholder="110001" type="number" dense outlined clearable></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
                <v-text-field v-model="age" label="Age" placeholder="24" type="number" dense outlined clearable></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-select v-model="pref" label="Vaccine Preference" dense :items="items" outlined></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-btn>Subscribe</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    computed:{
        ...mapGetters('search', {
      location: 'getLocation'
    })
    },
    data () {
      return {
        items: ['Covishield','Covaxin'],
        name:"",
        email:"",
        pincode:"",
        age:"",
        pref:""
      }
    },
    mounted(){
        this.$store.dispatch('search/searchCenters',"this")
    },
    methods:{
        searchCenters(){
            
        }
    }
  }
</script>