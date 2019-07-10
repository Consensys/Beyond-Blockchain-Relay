<template>
  <v-app dark>
    <Toolbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from '../src/components/Toolbar'
import Footer from '../src/components/Footer'
export default {
  components: {
    Toolbar,
    Footer
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style lang="scss">
#app {
  background-color: #4844a3;
  font-family: 'Tenor Sans', sans-serif;
  color: #fff;
}


a {
  color: #fff;
  text-decoration: none;
}

.v-overlay:before {
  opacity: 0.9;
}

</style>