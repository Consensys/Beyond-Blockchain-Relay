<template>
  <v-footer
    id="main-footer"
    height="auto"
    color="secondary darken-2"
  >
    <v-container>
        <v-layout
        align-end
        justify-space-around
        row
        wrap
      >
        <v-flex
          secondary
          darken-2
          py-3
          white--text
          xs12
          md10
        >
        Providentia is a project started during the ConsenSys Labs Virtual Hackathon. 
        We believe in the power of education and our goal is to make it accessible to anyone by aligning incentives among schools, students and investors.
        The project is constantly evolving and we love to hear your feedback. Feel free to <a href="https://www.linkedin.com/in/danugolini/" target="blank">contact us</a>
        </v-flex>
        <v-flex
          secondary
          darken-2
          py-3
          text-xs-right
          white--text
          xs12
          md2
        >
        Illustrations by <a href="https://icons8.com" target="_blank" class="secondary--text">Ouch.pics</a>
        </v-flex>

      </v-layout>
    </v-container>
    
  </v-footer>
</template>

<script>
export default { 
  links: [
    'Students',
    'Invenstors'
  ]
}
</script>

<style>
#main-footer {
  margin-top: 6em;
}
</style>