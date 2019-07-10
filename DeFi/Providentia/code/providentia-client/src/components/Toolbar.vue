<template>
  <v-toolbar dark color="transparent elevation-0">
    <Logo />
    <v-spacer></v-spacer>
    
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-toolbar-side-icon v-on="on"></v-toolbar-side-icon>
      </template>
      <v-list>
        <router-link to="/students" >
          <v-list-tile>
            <v-list-tile-title>Students</v-list-tile-title>
          </v-list-tile>
        </router-link>
        <router-link to="/investors">
          <v-list-tile>
            <v-list-tile-title>Investors</v-list-tile-title>
          </v-list-tile>
        </router-link>
        <v-divider></v-divider>
        <router-link to="/portfolio">
          <v-list-tile>
            <v-list-tile-title>Portfolio</v-list-tile-title>
          </v-list-tile>
        </router-link>
        <router-link to="/repay">
          <v-list-tile>
            <v-list-tile-title>Repay your financing</v-list-tile-title>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import Logo from '../components/Logo'
export default {
  components: {
    Logo
  },
  data () {
    return {
      //
    }
  }
}
</script>