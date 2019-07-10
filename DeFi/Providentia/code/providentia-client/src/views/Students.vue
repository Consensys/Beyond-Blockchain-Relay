<template>
  <v-container grid-list-md >
    <v-layout row wrap >
      <v-flex xs12>
        <h1 class="text-xs-center py-2">Are you a student?</h1>
        <p class="headline text-xs-center">Select your school to apply for the student financing.</p>
        <v-select
          :items="schoolsList"
          label="Select the school you are joining"
          v-model="selectedSchool"
          :change="getSchoolInfo()"
        ></v-select>

        <v-card
          light
          class="elevation-0"
          v-if="selectedSchoolInfo"
          >
          <v-card-title secondary-title class="secondary white--text">
            <div class="subheading"><b>{{selectedSchoolInfo.name}}</b></div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-layout>
            <v-flex xs4>
              <v-img
                :src="selectedSchoolInfo.logo"
                height="60px"
                contain
                class="ma-4"
              ></v-img>
            </v-flex>
            <v-flex xs8>
              <div class="ml-4">
                <div v-for="(term, index) in selectedSchoolInfo.terms" :key="index">
                  <p v-html="term" class="subheading py-4"></p>
                </div>
              </div>
            </v-flex>
          </v-layout>
          <v-card-actions class="pa-3">
            <v-spacer></v-spacer>


            <v-dialog
              light
              v-model="studentIdDialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary elevation-0"
                  v-on="on"
                >
                  Apply for the financing
                </v-btn>
              </template>

              <v-card>
                <v-card-title
                  class="secondary white--text"
                  secondary-title
                >
                  Apply for {{selectedSchool}} financing
                </v-card-title>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                  <v-card-text>

                    <v-text-field
                      v-model="studentId"
                      :rules="studentIdRules"
                      :counter="10"
                      :label="`Enter your Student ID`"
                      required
                    ></v-text-field>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="!valid"
                      color="primary elevation-0"
                      @click="submitFinancing()"
                    >
                      Request the financing
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import Portis from '@portis/web3';
import Web3 from 'web3';
import { ABI } from './abi.js';

  export default {
    data() {
      return {
        selectedSchool: '',
        selectedSchoolInfo: [],
        studentIdDialog: false,
        studentId: '',
        valid: false,
        studentIdRules: [
          v => !!v || 'Student ID is required',
        ],
      }
    },
    computed: {
      ...mapState(['schools']),
      schoolsList() {
        return this.schools.map(school => school.name)
      },
    },
    mounted() {

    },
    methods: {
      getSchoolInfo(){
        this.selectedSchoolInfo = this.schools.filter(school => school.name === this.selectedSchool)[0]
      },
      submitFinancing(){
        if (this.$refs.form.validate()) {
          this.snackbar = true

          // In order to make the transaction, the student must be added by the School first otherwise the transaction
          // will fail, the sender must be one of the added students

        const portis = new Portis('5085594f-63c8-4e21-9b8c-94e30a82f111', 'ropsten');
        // Use portis as web3 provider
        const web3 = new Web3(portis.provider);
        const providentia = new web3.eth.Contract(ABI,'0xb31e7251465c4ff3428b669d701ca7702b6b4f81');
        portis.onLogin((walletAddress, email, reputation) => {
          //In this case he is verified by Portis
          //Reputation Should be 80 to have verified students, for now I will just override it as it's undefined
          if(reputation == undefined){
          //  Check walletAddress has the same studentId as the one in input
          providentia.methods.addressToData(walletAddress).call({from: walletAddress}, (error, result) => {
              if(this.studentId.toString() == result[1].toString() ){
                // Rquest the loan with 4% interest rate
                providentia.methods.requestLoan(4).send({from: walletAddress});
              }
    });

          } else{
            // Error for not having enough reputation
            alert("Not Enough reputation")
          }
        });
        // Start Portis
        portis.showPortis();

        }
      }
    }
  }
</script>
