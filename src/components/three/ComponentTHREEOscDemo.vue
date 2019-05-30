<template>
  <div id="cmpTHREERenderer"> <!-- appendChild in mounted -->
  </div>
</template>

<script>
// linter disables for THREE.js
/* eslint-disable indent, semi, eol-last, space-in-parens, padded-blocks */

import * as THREE from 'three';
import TPOscArray from '../../js/threepointosc';

import ComponentTHREEBase from './ComponentTHREEBase.vue';

export default {

  name: 'ComponentTHREEOscDemo',
  extends: ComponentTHREEBase,
  
  data () {
    return {
        meshleft: Object, // demo
        meshright: Object, // demo
        lines: Object, // demo
        tposcarray: Array // demo
    }
  },

  props: {
      cmprotspeed: Number // mesh rotation speed prop - demo
  },

  mounted: function () {

    this.initBase();

    this.initLines();
    this.animateLines();

    this.initMesh();
    this.animateMesh();

    this.initTPOscArray();
    this.animateTPOscArray(5); // arg - offset

  },

  methods: {

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

        // this.animRandomiseLineEndpoints();

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

      console.log(this.tposcarray);

      this.tposcarray.forEach( (line) => {

        this.scene.add( line );

      })

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

        // this.scene.add( this.tposcarray[i] );

      }
    },

    processOffsetWithIndex: function (index, offset) {

      var newoffset;
      newoffset = ( ( index * 300 ) * offset ) / 2000000;

      // console.log(newoffset)

      return newoffset;

    },
  }
}
</script>
