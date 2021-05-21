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
    props:['value','label'],
    data() {
        return {
        dateMenu: false,
        dateVal: null,
        minDate: null,
        maxDate: null,
        };
    },
    computed: {
        dateDisp:{
            get: function(){
                // console.log(this.dateVal)
                return this.dateVal
            },
            set: function(val){
                console.log(val)
            }
        }
    },
    watch:{
        dateDisp(val){
            console.log(val)
            const [year, month, day] = val.split('-')
            this.$emit('input', `${day}-${month}-${year}`)
        }
    },
    mounted(){
        this.minDate = moment().format('YYYY-MM-DD')
        this.maxDate = moment().add(7,'days').format('YYYY-MM-DD')
    }
};
</script>