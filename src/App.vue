<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="350" >
            <v-card class="mx-auto">
              <v-card-title class="h2 justify-center">
                About Us
              </v-card-title>
                <v-card-text class=text-center>
                    <p>We're a bunch of programmers who're trying to help those who need vaccine the most. 
                    This application is built to help people find vaccines asap nearby and get vaccinated.
                    If you're interested in contributing to this application, checkout our
                    <a href="https://github.com/abhilashkulkarniofficial/my-vaccination" target="_blank">Github Project</a> 
                    and contribute there in the form of code.</p>
                    <p>Thank you for being here ❤️</p>
                    <h3>Contributors</h3>
                    <br>
                    <v-row>
                      <v-col cols="3"></v-col>
                      <v-col cols="3">
                         <v-btn href="https://www.linkedin.com/in/abhilashkulkarniofficial/" target="_blank" icon>
                            <v-avatar size="50" >
                            <img src="https://media-exp3.licdn.com/dms/image/C5603AQF5dY4vKzyY4Q/profile-displayphoto-shrink_800_800/0/1615364565484?e=1629936000&v=beta&t=RFwMm9NZ6aZkqU7WJhMilDjHJEhgiJS-LkMyP7gapsA"
                              alt="Abhilash" size="(max-width: 990px) 20vw">
                          </v-avatar>
                          </v-btn>
                      </v-col>
                      <v-col cols="3">
                         <v-btn href="https://www.linkedin.com/in/rohitashwachaks/" target="_blank" icon>
                            <v-avatar size="50" >
                            <img src="https://media-exp3.licdn.com/dms/image/C4E03AQHP9F1ubecsng/profile-displayphoto-shrink_800_800/0/1624340457222?e=1629936000&v=beta&t=Kq-laR3GFg5mtkq88Lnucxkr6OHy8elQ2WHNttTRUi8"
                              alt="Rohitashwa" size="(max-width: 990px) 20vw">
                          </v-avatar>
                          </v-btn>
                      </v-col>
                    </v-row>
                         
                          
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn text color="primary"  @click="dialog=false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    <v-app> 
      <v-app-bar color="#A33643" dark app flat align="center" elevate-on-scroll>
        <v-toolbar-title>My Vaccination</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon to="/search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon to="/">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <v-btn text @click="dialog=true"> About </v-btn>
    </v-app-bar>

    

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer padless color="white">
    <v-col class="text-center text-caption" cols="12">
      <h4>😷 Stay Home. Stay Safe. ❤️</h4>
    </v-col>
  </v-footer>

  </v-app>
  </div>
  
</template>

<script>
// import Search from './components/Search';
// import Register from './components/Register';

export default {
  name: 'App',

  components: {
    // Search,
    // Register
  },

  data(){
    return {
      showSearch:true,
        dialog:false
    }
  },
  methods:{
    // FFAAAA
  }
};
</script>
