<template>
    <v-container fluid >
    <v-card flat tile >
        <v-card-text class="d-flex justify-center" max-width="500" >
            <v-card flat align="center">
                <v-card-subtitle>
                    Get notified about vaccine availability in the centers near you directly on your email by registering with us.
                </v-card-subtitle>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                    
                        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required outlined dense></v-text-field>

                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required outlined dense></v-text-field>

                        <v-text-field v-model="pincode" :counter="6" :rules="pincodeRules" label="Pincode" required outlined dense></v-text-field>

                        <v-text-field v-model="age" :counter="3" :rules="ageRules" label="Age" required outlined dense></v-text-field>

                        <v-select v-model="select" :items="items" label="Vaccine Preference" outlined dense></v-select>

                        <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree to giving your data?" required dense small></v-checkbox>

                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="registerUser"> Subscribe </v-btn>
                    </v-form>
                </v-card-text>
                
            </v-card>
        </v-card-text>
      
    </v-card>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    computed:{
        ...mapGetters('search', {  
            // 
    })
    },
    data () {
      return {
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        pincode: '',
        pincodeRules: [
            v => !!v || 'Pincode is required',
            v => /^[1-9][0-9]{5}$/.test(v) || 'Pincode must be valid',
        ],
        age: '',
        ageRules: [
            v => !!v || 'Age is required',
            v => (v>17 && v<70 )|| 'Age must be between 18 and 70',
        ],
        select: null,
        items: [
            'Covishield',
            'Covaxin'
        ],
        checkbox: false,
        }
    },
    mounted(){
        // this.$store.dispatch('search/searchCenters',"this")
    },
    methods:{
    //     validate () {
    //     this.$refs.form.validate()
    //   },
    //   reset () {
    //     this.$refs.form.reset()
    //   },
    //   resetValidation () {
    //     this.$refs.form.resetValidation()
    //   },
        async registerUser(){
            let val = this.$refs.form.validate()

            if(val){
                let userData = {
                    name: this.name,
                    email: this.email,
                    pincode: this.pincode,
                    vaccinePref: this.select,
                    agreement: this.checkbox
                }

                await this.$store.dispatch('register/register', userData)
            }
            
        }
    }
  }
</script>