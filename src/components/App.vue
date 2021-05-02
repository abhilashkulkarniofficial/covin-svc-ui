<template>
  <v-app class="#FFAAAA"> 
    <v-app-bar color="#D46A6A" dark app flat>
      <v-toolbar-title>Vaccine Availability Tracker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="showSearch=true">
        <v-icon>mdi-crosshairs</v-icon>
      </v-btn>
      <v-btn icon @click="showSearch=false">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-app-bar>

    

    <v-main>
      <Search v-if="showSearch"/>
      <Register v-if="!showSearch"/>
    </v-main>

  </v-app>
</template>

<script>
import Search from './Search';
import Register from './Register';

export default {
  name: 'App',

  components: {
    Search,
    Register
  },

  data(){
    return {
      showSearch:true
    }
  },
  methods:{
    // FFAAAA
  }
};
</script>
