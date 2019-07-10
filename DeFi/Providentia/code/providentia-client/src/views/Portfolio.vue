<template>
  <v-container grid-list-md>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <h1 class="text-xs-center py-2">Portfolio</h1>
        <p class="headline text-xs-center">Check how your investment are performing</p>
      </v-flex>
      <v-flex xs12>
        <v-card
          light
          class="elevation-0 my-2"
          v-for="(investment, index) in investments" :key="index"
          >
          <v-container class="text-xs-center">
             <v-layout row justify-space-between align-center wrap xs12 class="py-3">
              <v-flex xs12 md4 class="text-xs-left">
                <b>{{investment.name}}</b>
              </v-flex>
              <v-flex xs4 md2>
                <h4 class="headline">{{ investment.size | currency('$', 0) }}</h4>
                <p class="mb-0">Amount Invested</p>
              </v-flex>
              <v-flex xs4 md2>
                <h4 class="headline">{{investment.return}}</h4>
                <p class="mb-0">Current Return</p>
              </v-flex>
              <v-flex xs4 md2>
                <v-btn flat small color="primary" @click="selectedInvestment === investment ? selectedInvestment = null : selectedInvestment = investment ">
                  {{ selectedInvestment === investment ? "close" : 'details' }}
                </v-btn>
              </v-flex>
              <template v-if="selectedInvestment === investment" >
                <v-layout v-for="(student, index) in investment.students" :key="index" row justify-space-between align-center wrap class="pl-1 pt-4">
                  <v-flex xs12 md4 class="text-xs-center text-md-left"><b>{{student.name}}</b></v-flex>
                  <v-flex xs6 md2>
                    <b>{{student.currentJob}}</b>
                    <p class="mb-0">Current Employment</p>
                  </v-flex>
                  <v-flex xs6 md2>
                    <b>{{student.currentSalary | currency('$', 0) }}</b>
                    <p class="mb-0">Current Salary</p>
                    </v-flex>
                  <v-flex xs6 md2>
                    <b>{{student.monthsToRepay}}</b>
                    <p class="mb-0">Months to repay</p>
                  </v-flex>
                  <v-flex xs6 md2>
                    <b>{{student.amountRepaid | currency('$', 0)}}</b>
                    <p class="mb-0">Amount repaid to date</p>
                    </v-flex>
                </v-layout>
              </template>
            </v-layout>
           
          </v-container>
           
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import Vue2Filters from 'vue2-filters'

  export default {

    mixins: [Vue2Filters.mixin],  
    
    data() {
      return {
        investmentsHeaders: [
          {text: 'School', value: 'name', class: "xs6 md4" },
          {text: 'Amount', value: 'size', class: "xs3 md2" },
          {text: 'Date', value: 'createdAt', class: "xs3 md2" },
          {text: 'Current Return', value: 'return', class: "xs3 md2" },
          {text: '', value: 'return', class: "xs3 md2" }
        ],
        investments: [
          {
            name: 'Lambda School',
            size: 40000,
            return: '18%',
            students: [
              {
                name: 'Leonard Hofstadter',
                currentJob: 'Google',
                currentSalary: 70000,
                monthsToRepay: 5,
                amountRepaid: 9916.67
              },
              {
                name: 'Bernadette Rostenkowski',
                currentJob: 'Ph.D',
                currentSalary: 90000,
                monthsToRepay: 5,
                amountRepaid: 12750
              },
              {
                name: 'Sheldon Cooper',
                currentJob: 'NASA',
                currentSalary: 120000,
                monthsToRepay: 8,
                amountRepaid: 9196.67
              },
              {
                name: 'Amy Farrah Fowler',
                currentJob: 'Airbnb',
                currentSalary: 80000,
                monthsToRepay: 2,
                amountRepaid: 14733.33
              },
            ]
          },
        ],
        selectedInvestment: null,
      }
    },

    computed:{
      ...mapState(['schools'])
    },

    mounted() {
      
    },
    methods: {
      
    }
  }
</script>