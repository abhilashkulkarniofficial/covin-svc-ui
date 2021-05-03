<template>
  <v-app class="#FFAAAA"> 
    <v-app-bar color="#D46A6A" dark app flat>
      <v-toolbar-title>Vaccine Availability Tracker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="showSearch=true" v-bind="attrs" v-on="on">
          <v-icon>mdi-crosshairs</v-icon>
      </v-btn>
      </template>
      <span>Search</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="showSearch=false" v-bind="attrs" v-on="on">
          <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      </template>
      <span>Subscribe</span>
    </v-tooltip>
    </v-app-bar>

    

    <v-main>
      <Search v-if="showSearch"/>
      <Register v-if="!showSearch"/>
    </v-main>

    <v-footer padless color="white">
    <v-col class="text-center text-caption" cols="12">
      Stay Home. Stay Safe.
    </v-col>
  </v-footer>

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
