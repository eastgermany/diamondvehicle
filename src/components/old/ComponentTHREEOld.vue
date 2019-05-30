<template>
  <div id="cmpTHREERenderer"> <!-- appendChild in mounted -->
  </div>
</template>

<script>
// linter disables for THREE.js
/* eslint-disable indent, semi, eol-last, space-in-parens, padded-blocks */

import * as THREE from 'three';
import TPOscArray from '../js/threepointosc';

export default {

  name: 'ComponentTHREE',

  data () {
    return {
        renderer: Object,
        scene: Object,
        camera: Object,
        meshleft: Object,
        meshright: Object,
        lines: Object,
        tposcarray: Array
    }
  },

  props: {
      cmprotspeed: Number // mesh rotation speed prop
  },

  mounted: function () {

    this.init();

    this.initLines();
    this.animateLines();

    this.initMesh();
    this.animateMesh();

    this.initTPOscArray();
    this.animateTPOscArray(5);
  },

  methods: {

    // INIT MAIN

    init: function () {
        let domEl = document.getElementById('cmpTHREERenderer');

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth / 1.5, window.innerHeight / 1.5 );
        domEl.appendChild( this.renderer.domElement );

        var color = new THREE.Color( 0x000000 );
        this.scene.background = color;

        this.camera.position.z = 3;
        this.camera.zoom = 1.3;
  
    },

    // ******** MESH ********

    initMesh: function () {

        var geometry = new THREE.BoxGeometry( 0.4, 1, 0.2 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ccff } );

        this.meshleft = new THREE.Mesh( geometry, material );
        this.meshright = new THREE.Mesh( geometry, material );

        this.scene.add( this.meshleft );
        this.scene.add( this.meshright );

    },

    animateMesh: function () {

        requestAnimationFrame( this.animateMesh );

        this.renderer.render( this.scene, this.camera );
        this.meshleft.rotation.x += 0.01 * this.cmprotspeed;
        this.meshleft.rotation.y += 0.01 * this.cmprotspeed;

        this.meshright.rotation.x += 0.01 * this.cmprotspeed;
        this.meshright.rotation.y += 0.01 * this.cmprotspeed;

        this.animMoveMeshToVertex()

    },

    // reduce to reusable
    animMoveMeshToVertex: function () {

        this.meshleft.position.x = this.lines.geometry.vertices[0].getComponent(0);
        this.meshleft.position.y = this.lines.geometry.vertices[0].getComponent(1);
        this.meshleft.position.z = this.lines.geometry.vertices[0].getComponent(2);

        this.meshright.position.x = this.lines.geometry.vertices[2].getComponent(0);
        this.meshright.position.y = this.lines.geometry.vertices[2].getComponent(1);
        this.meshright.position.z = this.lines.geometry.vertices[2].getComponent(2);

        // console.log(comp);
    },

    // ******** LINES ********

    initLines: function () {

        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial( { color: 0x0bd3af } );

        geometry.vertices.push(new THREE.Vector3( -6, 0, 0) );
        geometry.vertices.push(new THREE.Vector3( 0, 2, 0) );
        geometry.vertices.push(new THREE.Vector3( 6, 0, 0) );

        this.lines = new THREE.Line( geometry, material );
        this.scene.add( this.lines )

    },

    animateLines: function () {

        requestAnimationFrame( this.animateLines );

        var currdate = new Date();
        var currtime = currdate.getTime();

        var midvertex = 2 * Math.sin( currtime * 0.0005 );

        this.animRandomiseLineEndpoints();

        this.lines.geometry.vertices[1].setComponent( 1, midvertex ); // index 1 is midpoint
        this.lines.geometry.verticesNeedUpdate = true;

    },

    animRandomiseLineEndpoints: function () {

        this.lines.geometry.vertices[0].setComponent(0, (Math.random(4) / 25));
        this.lines.geometry.vertices[0].setComponent(2, (Math.random(4) / 25));

    },

    // ******** THREE POINT OSCILLATOR ********

    initTPOscArray: function () {

      // just use these start and end vectors for now

      var start = new THREE.Vector3( -3, 0, 0 );
      var end = new THREE.Vector3( 3, 0, 0 );

      // just use this count for now
      // determine offset in anim

      this.tposcarray = TPOscArray(start, end, 9);

      this.debugLogVectorsInArray(this.tposcarray);

      // console.log(this.tposcarray);

    },

    animateTPOscArray: function (offset) {

      requestAnimationFrame( this.animateTPOscArray );
      this.renderer.render( this.scene, this.camera );

      var currdate = new Date();
      var currtime = currdate.getTime();

      var i;
      var newY;

      for (i = 0; i < this.tposcarray.length; i++) {

        newY = 2 * Math.sin( ( currtime * 0.0006 ) + this.processOffsetWithIndex( i, offset ) );

        this.tposcarray[i].geometry.vertices[1].setComponent( 1, newY );
        this.tposcarray[i].geometry.verticesNeedUpdate = true;

        this.scene.add( this.tposcarray[i] );
      }
    },

    processOffsetWithIndex: function (index, offset) {

      var newoffset;
      newoffset = ( ( index * 300 ) * offset ) / 20000000;

      // console.log(newoffset)

      return newoffset;

    },

    // ******** DEBUG FUNCTIONS ********

    debugLogVectorsInArray: function (array) {

      var i;

      for (i = 0; i < array.length; i++) {
        this.debugLogVector( array[i] );
      }

    },

    debugLogVector: function (vector) {

      var vecmid = vector.geometry.vertices[1];

      var string = '';
      string = vecmid.getComponent(0) + ' ' + vecmid.getComponent(1) + ' ' + vecmid.getComponent(2);
      // console.log(string);

    }
  }
}
</script>
