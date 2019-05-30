<template>

  <div id="app">

    <div id="header">
      <button v-on:click="activepage = 'home'">HOME</button>
      <button v-on:click="activepage = 'about'">ABOUT</button>
      <button v-on:click="activepage = 'fetch'">FETCH</button>
      <button v-on:click="activepage = 'three'">THREE</button>
    </div>

    <div id="appFetchFromInput">
      <input v-model="fetchfrom">
      <p id="appFetchFromInputText">Fetch albums.json at URL above.</p>
    </div>

    <div id="body">
      <ComponentHome                
                                    v-if="activepage == 'home'"/>
      <ComponentAbout               
                                    v-if="activepage == 'about'"/>

      <ComponentFetchTable          
                                    v-if="activepage == 'fetch'"
                                    v-bind:url="fetchfrom"/>
        <!-- v-bind tells parser fetchfrom is JS -->
      <ComponentTHREEOscDemo  
                                    v-bind:cmprotspeed="rotspeed"
                                    v-if="activepage == 'three'"/>
    </div>

    <div id="foot">
      <button class="footbutton" v-if="activepage == 'three'" v-on:click="rotspeed *= 2">FASTER</button>
      <button class="footbutton" v-if="activepage == 'three'" v-on:click="rotspeed /= 2">SLOWER</button>
    </div>

  </div>
</template>

<script>
/* eslint-disable indent, semi, eol-last */

import ComponentHome from './components/ComponentHome'
import ComponentAbout from './components/ComponentAbout'
import ComponentFetchTable from './components/ComponentFetchTable'

// THREE demos
import ComponentTHREEOscDemo from './components/three/ComponentTHREEOscDemo'

export default {
  name: 'App',
  components: {
    ComponentHome,
    ComponentAbout,
    ComponentFetchTable,
    ComponentTHREEOscDemo
  },
  created: function () {
    this.fetchfrom = 'http://localhost:3000/albums' // default fetch URL
    this.rotspeed = 5; // default cube rotation speed
  },
  data () {
      return {
        activepage: '',
        fetchfrom: '',
        rotspeed: ''
      }
  }
}
</script>
