<template>
    <v-container fluid >
        <v-dialog v-model="dialog" persistent max-width="350" >
            <v-card class="mx-auto">
              <v-card-title v-if="resultCode===200" class="h2 justify-center">
                Subscription Successful
              </v-card-title>
              <v-card-title v-else class="h2 justify-center">
                Oops! Something went wrong
              </v-card-title>
                <v-card-text align="center">
                    <p v-if="resultCode===200"> You have successfully subscribed to email notifications. 
                        A confirmation email has been sent to your email address. 
                        You will receive email notifications when the slots are available in the district / pincode you've selected.
                    </p>
                    <p v-if="resultCode===409"> The user with this email address <strong> {{email}} </strong> already exists. Please enter a different email address.
                    </p>
                    <p v-else> There was some problem with our servers. You might have registered with this email id before. 
                        Please check the email id or try again later. Sorry for the inconvenience.
                    </p>
                    <p> If you're interested in contributing to this application, checkout our github repo 
                    <a href="https://github.com/abhilashkulkarniofficial/covin-svc-ui" target="_blank">covin-svc-ui</a> 
                    and contribute there in the form of code.</p>
                    <p>Thank you for being here ❤️</p>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn text color="primary"  @click="dialog=false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    <v-card flat tile >
        <v-card-text class="d-flex justify-center" max-width="500" >
            <v-card flat align="center">
                <v-card-subtitle>
                    Get notified about vaccine availability in the centers near you directly on your email by registering with us.
                </v-card-subtitle>
                <v-card-text>
                    <v-container grid-list-md text-xs-center>
            <v-layout row wrap mt-6>
                <v-flex offset-md2 offset-sm2 xs12 sm8 md8>
                    <v-form ref="form" v-model="valid" lazy-validation>
                    
                        <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Full Name" required outlined dense></v-text-field>

                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required outlined dense></v-text-field>

                        <v-text-field v-model="phoneNumber" :rules="phoneRules" label="Phone Number" required outlined dense></v-text-field>

                        <Date class="px-1" label="Date of Birth" v-model="year" @input="closeDate()" :year="true"/>


                        <!-- <v-text-field v-model="age" :counter="3" :rules="ageRules" label="Age" required outlined dense></v-text-field> -->

                        <v-select v-model="vaccinePref" :items="vaccinePrefItems" label="Vaccine Preference" item-text="item_name" item-value="item_id" outlined multiple>
                            <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0"> <span>{{ item.item_name.slice(0,12) }}</span> </v-chip>
                                    <span v-if="index === 1" class="grey--text text-caption">
                                    (+{{ vaccinePref.length - 1 }} other(s))
                                    </span>
                                </template>
                        </v-select>

                        <v-select v-model="fees" :items="feesItems" label="Fees" item-text="item_name" item-value="item_id" outlined dense></v-select>

                        <Date class="px-1" label="Search for slots from" v-model="startDate" @input="closeDate()" :mindate="true" required/>

                       <v-radio-group row v-model="radioGroup" dense class="ma-0 px-1 py-0">  <!-- required :rules="filterRules" -->
                            <template v-slot:label me-10>
                                <div>Filter By</div>
                            </template>
                            <v-radio label="Pincode" value="pincode"></v-radio>
                            <v-radio label="District" value="district"></v-radio>
                        </v-radio-group>

                        <v-text-field v-if="showPincodes" v-model="pincode" :rules="pincodeRules" label="Pincodes separated by comma" placeholder="110001,110002" required outlined dense></v-text-field>

                        <v-select v-if="showDistricts" v-model="state" :items="states" item-text="state_name" item-value="state_id" label="Select State" placeholder="Karnataka" outlined dense></v-select>

                        <v-select v-if="showDistricts" v-model="district" :items="districts" item-text="district_name" item-value="district_id" label="Select District" placeholder="Bengaluru Urban" outlined multiple>
                            <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0"> <span>{{ item.district_name.slice(0,12) }}</span> </v-chip>
                                    <span v-if="index === 1" class="grey--text text-caption">
                                    (+{{ district.length - 1 }} other(s))
                                    </span>
                                </template>
                        </v-select>

                        <!-- <v-radio-group row v-model="doseRadioGroup" dense class="ma-0 pa-0" required :rules="filterRules">
                            <template v-slot:label>
                                <div>I'm looking for</div>
                            </template>
                            <v-radio label="1st Dose" value="first"></v-radio>
                            <v-radio label="2nd Dose" value="second"></v-radio>
                        </v-radio-group>

                        <Date v-if="doseRadioGroup==='second'" label="1st Dose Date" v-model="firstDoseDate" @input="minDate=firstDoseDate" :year="false" required/> -->

                        

                        <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree to giving your data? We won't spam you with any emails." required dense small></v-checkbox>

                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="registerUser"> Subscribe </v-btn>
                    </v-form>
                </v-flex>
                    </v-layout>
        </v-container>
        <v-progress-linear v-if="loading" indeterminate color="yellow darken-2" ></v-progress-linear>
                </v-card-text>
                
            </v-card>
        </v-card-text>
      
    </v-card>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
// import Year from '../basic/year.vue'
import Date from '../basic/date.vue'
import moment from 'moment'

export default {
    components:{Date},
    
        computed:{
        ...mapGetters({  
            states:  'search/getStates',
            districts: 'search/getDistricts'
    })
    },
    data () {
      return {
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 20) || 'Name must be less than 20 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        pincode: '',
        pincodeRules: [
            v => !!v || 'Pincode is required',
            v => /^[1-9][0-9]{5}(,[1-9][0-9]{5})*$/.test(v) || 'Pincodes must be valid and comma separated',
        ],
        // age: '',
        // ageRules: [
        //     v => !!v || 'Age is required',
        //     v => (v>17 && v<70 )|| 'Age must be between 18 and 70',
        // ],
        vaccinePref: null,
        vaccinePrefItems: [
            {item_name:'Covishield',item_id:'covishield'},
            {item_name:'Covaxin',item_id:'covaxin'},
            // {item_name:'Sputnik V',item_id:'sputnik V'}
        ],
        fees: null,
        feesItems: [
            {item_name:"Paid", item_id:"paid"},
            {item_name:"Free", item_id:"free"}
        ],
        checkbox: false,
        year: null,
        radioGroup: null,
        doseRadioGroup:null,
        filterRules: [
            v => !!v || 'This field is required'
        ],
        state:null,
        district:null,
        startDate: null,
        firstDoseDate: null,
        minDate: null,
        showPincodes:false,
        showDistricts:false,
        phoneNumber: '',
        phoneRules: [
            v => !!v || 'Phone Number is required',
            v => /^[789]\d{9}$/.test(v) || 'Phone Number must be valid',
        ],
        loading:false,
        dialog:false,
        resultCode:null
        }
    },
    mounted(){
        // this.$store.dispatch('search/searchCenters',"this")
        this.$store.commit('search/setSlots',[])        
        this.$store.dispatch('search/getStates')
        console.log(process.env.VUE_APP_SECRET_CODE)
    },
    watch: {
      async state (val) {
          if(val){
              this.district = null
              await this.$store.dispatch('search/getDistricts',{state_id:val})
          }
      },
      radioGroup(val){
          if(val==='pincode'){
              this.showPincodes = true
              this.showDistricts = false
              this.district = null
              this.state = null
          }else if(val==='district'){
              this.showPincodes = false
              this.showDistricts = true
              this.pincode = null
          }
      }
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
        // eslint-disable-next-line no-unused-vars
        setIt(){
            this.name = 'Abhilash'
            this.email = '1bm15cs002@bmsce.ac.in'
            this.phoneNumber = '9958893440'
            this.radioGroup = 'pincode'
            this.pincode = '110010'
        },
        async registerUser(){
            let val = this.$refs.form.validate()

            if(val){
                this.loading = true
                let params = {
                    vaccine: this.vaccinePref?this.parseVaccine(this.vaccinePref):"any",
                    payment: this.fees?this.fees:"any",
                    code: process.env.VUE_APP_SECRET_CODE
                }

                let date = this.startDate?this.startDate:moment()


                let body = {
                    name: this.name,
                    emailID: this.email,
                    yearofBirth: this.year,
                    periodDate: {
                        startDate:moment(date).format(),
                        endDate:moment().add(2,'months').format()
                    },
                    pinCode: this.pincode?`[${this.pincode}]`:"",
                    districtCode: this.district?JSON.stringify(this.district):"",
                    phone: this.phoneNumber

                }

                this.resultCode = await this.$store.dispatch('register/register', {params:params, body:body})
                // console.log(this.resultCode)
                this.loading = false
                this.dialog = true
                if(this.resultCode===200){
                    this.$refs.form.reset()
                    this.showPincodes = false
                    this.showDistricts = false
                }
                
            }
            
        },
        closeDate(){
            if(this.firstDoseDate){
                this.minDate = this.firstDoseDate
            }
        },
        parseVaccine(data){
            let vax = ``
            for(const x of data){
                vax = `${vax}${x},`
            }
            return vax.slice(0,vax.length-1)
        },
    }
  }
</script>