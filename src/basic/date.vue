<template>
  <v-layout row wrap>
    <v-menu
      v-model="dateMenu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :label="label"
          readonly
          :value="dateDisp"
          v-on="on"
          v-bind="attrs"
           outlined dense
        ></v-text-field>
      </template>
      <v-date-picker locale="en-in" v-model="dateVal" no-title @input="dateMenu = false" :min="minDate" :max="maxDate"></v-date-picker>
    </v-menu>
  </v-layout>
</template>
<script>
import moment from 'moment'
export default {
    props:['value','label','year', 'mindate', 'maxdate'],
    data() {
        return {
        dateMenu: false,
        dateVal: null,
        minDate: null,
        maxDate: null,
        };
    },
    computed: {
        /* eslint-disable */
        dateDisp:{
            get: function(){
                // console.log(this.dateVal)
                return this.dateVal
            },
            set: function(val){
                // console.log(val)
            }
        }
    },
    watch:{
        dateDisp(val){
            // console.log(val)
            const [year, month, day] = val.split('-')
            if(this.year){
              this.$emit('input', `${year}`)
            }else{
              this.$emit('input', val)
            }
            

            
        }
    },
    mounted(){
        // if(!this.year){
        //     this.minDate = moment().format('YYYY-MM-DD')
        //     this.maxDate = moment().add(7,'days').format('YYYY-MM-DD')
        // }else{
        //   this.maxDate = moment().format('YYYY-MM-DD')
        // }

        // if(this.mindate){
          
        //   this.minDate = this.mindate
        //   console.log("Mindate: ", this.minDate, moment().format('YYYY-MM-DD'))
        // }
        if(this.year){
          this.maxDate = moment().format('YYYY-MM-DD')
        }else if(this.mindate){
            this.minDate = moment().format('YYYY-MM-DD')
        } else{
            this.minDate = moment().format('YYYY-MM-DD')
            this.maxDate = moment().add(7,'days').format('YYYY-MM-DD')
        }
    }
};
</script>