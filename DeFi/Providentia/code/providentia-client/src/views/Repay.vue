<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="text-xs-center py-2">Repay your financing</h1>
      </v-flex>
      <v-flex xs12>
        <v-card
          light
          class="elevation-0"
          >
          <v-card-title secondary-title class="secondary white--text">
            Your repayment status
          </v-card-title>
          <v-card-text>
            <v-layout row wrap class="text-xs-center mt-2">
              <v-flex xs12 md3>
                <h4 class="headline">{{ stats.currentMonthlyRepayment | currency('$', 0) }}</h4>
                <p>current monthly repayment</p>
              </v-flex>
              <v-flex xs12 md3>
                <h4 class="headline">{{stats.remainingMonths}}</h4>
                <p>months to the end</p>
              </v-flex>
              <v-flex xs12 md3>
                <h4 class="headline">{{ stats.currentAnnualSalary | currency('$', 0) }}</h4>
                <p>current annual salary</p>
              </v-flex>
              <v-flex xs12 md3>
                <h4 class="text-xs-center headline">17%</h4>
                <p>% of your annual salary</p>
              </v-flex>
            </v-layout>

            <v-layout row wrap align-content-space-between mt-4>

              <v-flex xs12 md6>
                <h4 class="text-xs-center mb-2">Months to pay</h4>
                <v-list-tile
                  v-for="(repayment, index) in toBePaid"
                  :key="index"
                  >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ repayment.month }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn
                      class="primary"
                      @click="repay(stats.currentMonthlyRepayment)"
                    >
                      Pay
                    </v-btn>
                  </v-list-tile-action>


                </v-list-tile>
              </v-flex>

              <v-flex xs12 md6>
                <h4 class="text-xs-center mb-2">Paid Months</h4>
                <v-list-tile
                  v-for="(repayment, index) in paid"
                  :key="index"
                  >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ repayment.month }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon
                      color="primary"
                      >
                      check
                    </v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </v-flex>

            </v-layout>


          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Portis from '@portis/web3';
import Web3 from 'web3';
import { ABI } from './abi.js';
import Vue2Filters from 'vue2-filters'


  export default {

    mixins: [Vue2Filters.mixin],

    data() {
      return {
        stats:
        {
          remaingTotal: 10000,
          remainingMonths: 12,
          totalMonths: 15,
          currentAnnualSalary: 80000,
          currentMonthlyRepayment: 833,
        },
        payments: [
          {
            month: 'May 2019',
            paid: true
          },
          {
            month: 'June 2019',
            paid: true
            },
          {
            month: 'July 2019',
            paid: true
            },
          {
            month: 'August 2019',
            paid: false
            },
          {
            month: 'September 2019',
            paid: false
            },
          {
            month: 'October 2019',
            paid: false
            },
          {
            month: 'November 2019',
            paid: false
            },
          {
            month: 'December 2019',
            paid: false
            },
          {
            month: 'January 2020',
            paid: false
          },
          {
            month: 'February 2020',
            paid: false
          },
          {
            month: 'March 2020',
            paid: false
          },
          {
            month: 'April 2020',
            paid: false
          },
          {
            month: 'May 2020',
            paid: false
          },
          {
            month: 'June 2020',
            paid: false
          },
          {
            month: 'July 2020',
            paid: false
          }
        ]
      }
    },

    computed:{
      toBePaid(){
        return this.payments.filter(repayment => !repayment.paid)
      },
      paid(){
        return this.payments.filter(repayment => repayment.paid)
      }
    },

    mounted() {

    },
    methods: {
      repay(amount){

        // Instantiate Portis
        const portis = new Portis('5085594f-63c8-4e21-9b8c-94e30a82f111', 'ropsten');
        // Use portis as web3 provider
        const web3 = new Web3(portis.provider);
        // Add basic ABI to interact with the contract
        const abi = require('human-standard-token-abi')
        // Instantiate the providentia contract
        const providentia = new web3.eth.Contract(ABI,'0xb31e7251465c4ff3428b669d701ca7702b6b4f81');
        // Instantiate the daiToken
        const daiToken = new web3.eth.Contract(abi, '0x3DBb4152fa63bA3e21eE4dc8A9DC180Eb740450C');

        portis.onLogin((walletAddress, email, reputation) => {
          // Approve DAI tokens from student
          daiToken.methods.approve(providentia.address, amount).send({
            from: walletAddress
          })
          // Repay the loan with the amount of DAI approved
          providentia.methods.repayLoan.send({from:walletAddress})

        })
        // Start Portis
        portis.showPortis();
      }
    }
  }
</script>

<style lang="scss">
  thead {
    background-color: #898ed8;
    th,i {
      color: #fff !important;
    }
  }
</style>
