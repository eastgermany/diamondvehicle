<template>
  <div id="cmpTHREERenderer"> <!-- appendChild in mounted -->
  </div>
</template>

<script>
// linter disables for THREE.js
/* eslint-disable indent, semi, eol-last, space-in-parens, padded-blocks */

import * as THREE from 'three';

export default {

  name: 'ComponentTHREEBase',

  data () {
    return {
        renderer: Object,
        scene: Object,
        camera: Object
    }
  },

  mounted: function () {

    this.initBase();

  },

  methods: {

    // INIT MAIN

    initBase: function () {

        let domEl = document.getElementById('cmpTHREERenderer');

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize( window.innerWidth / 1.5, window.innerHeight / 1.5 );
        domEl.appendChild( this.renderer.domElement );

        var color = new THREE.Color( 0x000000 );
        this.scene.background = color;

        this.camera.position.z = 5;
        this.camera.zoom = 1.3;
  
    }
  }
}
</script>
