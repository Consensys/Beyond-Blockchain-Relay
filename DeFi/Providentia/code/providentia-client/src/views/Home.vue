<template>
  <v-container id="home" grid-list-md text-xs-center >
    <v-layout row wrap justify-center >
      <v-flex xs12>
        <h1 class="display-2 my-4">Welcome to Providentia</h1>
        <h4 class="headline my-4">Decentralized marketplace for students financing</h4>
      </v-flex>
      <v-flex xs12 sm6 md6 xl4 pa-4>
        <router-link to="students">
          <v-card
              light
              class="mx-auto elevation-0"
            >
            <v-img
              src="/education.png"
              height="150px"
            ></v-img>
            <v-card-text >
              <h2 class="headline font-weight-bold py-2">Are you a student?</h2>
              <h4 class="subheading">Apply for you student financing</h4>
            </v-card-text>
          </v-card>
        </router-link>
      </v-flex>
      <v-flex xs12 sm6 md6 xl4 pa-4>
        <router-link to="investors">
          <v-card
              light
              class="mx-auto elevation-0"
            >
            <v-img
              src="/investor.png"
              height="150px"
            ></v-img>
            <v-card-text>
              <h2 class="headline font-weight-bold py-2">Are you an investor?</h2>
              <h4 class="subheading">Invest in student's talent</h4>
            </v-card-text>
          </v-card>
        </router-link>
      </v-flex>
      <v-flex xs12 sm12 md12 xl8 pa-4 id="school-interest">
        <a href="https://danieleugolini.typeform.com/to/JYrH2R" target="_blank">
          <v-card
            light
            class="mx-auto elevation-0"
            >
            <v-layout row wrap>
              <v-flex xs12 sm12 md6 py-0>
                <v-img
                  src="/school.png"
                  height="100%"
                ></v-img>
              </v-flex>
              <v-flex xs12 sm12 md6 pa-4>
                <h2 class="headline font-weight-bold py-2">Are you working for a coding School / Bootcamp?</h2>
                  <h4 class="subheading py-2">Providentia can help you with:</h4>
                  <h4 class="subheading py-2">Enroll more students due to a better financing</h4>
                  <h4 class="subheading py-2">Attract global investors to finance your students</h4>
                  <h4 class="subheading py-2">Focus on your job: making the students ready for the job market</h4>
                  <v-btn href="https://danieleugolini.typeform.com/to/JYrH2R" class="primary" target="_blank">
                    Get in contact
                  </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </a>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    
    data() {
      return {
        
      }
    },
    mounted() {
      
    },
    methods: {
      
    }
  }
</script>

<style lang="scss">
#home {
  .v-card:hover {
    transform: scale(1.02);
  }
}

</style>
