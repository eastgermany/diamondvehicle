<template>
  <div id="app">
    <div id="header">
      <button v-on:click="activepage = 'home'">HOME</button>
      <button v-on:click="activepage = 'about'">ABOUT</button>
      <button v-on:click="activepage = 'fetch'">FETCH</button>
    </div>
    <div id="fetchfromInput">
      <input v-model="fetchfrom">
      <p id="fetchfromInputText">Fetch albums.json at URL above.</p>
    </div>
    <div id="body">
      <ComponentHome v-if="activepage == 'home'"></ComponentHome>
      <ComponentAbout v-if="activepage == 'about'"></ComponentAbout>

      <ComponentFetchTable v-bind:url="fetchfrom" v-if="activepage == 'fetch'"></ComponentFetchTable>
        <!-- v-bind tells parser fetchfrom is JS -->
    </div>
  </div>
</template>

<script>
/* eslint-disable indent, semi, eol-last */

import ComponentHome from './components/ComponentHome'
import ComponentAbout from './components/ComponentAbout'
import ComponentFetchTable from './components/ComponentFetchTable'

export default {
  name: 'App',
  components: {
    ComponentHome,
    ComponentAbout,
    ComponentFetchTable
  },
  created: function () {
    this.fetchfrom = 'http://localhost:3000/albums' // default fetch URL
  },
  data () {
      return {
        activepage: '',
        fetchfrom: ''
      }
  }
}
</script>
