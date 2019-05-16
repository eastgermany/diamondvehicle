<template>
  <div id="cmpThreeRenderer"> <!-- appendChild in mounted -->
  </div>
</template>

<script>
/* eslint-disable indent, semi, eol-last, space-in-parens */

import * as THREE from 'three';

export default {

  name: 'ComponentThree',

  data () {
    return {
        renderer: Object,
        scene: Object,
        camera: Object,
        mesh: Object,
        lines: Object
    }
  },

  props: {
      cmprotspeed: Number
  },

  mounted: function () {
    this.init()
    this.initLines()
    this.initMesh()
    this.animateMesh()
    this.animateLines()
  },

  methods: {

    // INIT FUNCTIONS

    init: function () {
        let domEl = document.getElementById('cmpThreeRenderer');

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );
        domEl.appendChild( this.renderer.domElement );

        this.camera.position.z = 5;
    },

    initMesh: function () {

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x78a6fc } );

        this.mesh = new THREE.Mesh( geometry, material );
        this.scene.add( this.mesh );

    },

    initLines: function () {

        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 5} );

        geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
        geometry.vertices.push(new THREE.Vector3( 0, 2, 0) );
        geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

        this.lines = new THREE.Line( geometry, material );
        this.scene.add( this.lines)

    },

    // ANIMATE FUNCTIONS

    animateMesh: function () {
        requestAnimationFrame( this.animateMesh );
        this.renderer.render( this.scene, this.camera );
        this.mesh.rotation.x += 0.01 * this.cmprotspeed;
        this.mesh.rotation.y += 0.01 * this.cmprotspeed;

        this.animMoveMeshToLines()

    },

    animMoveMeshToLines: function () {

        this.mesh.position.x = this.lines.geometry.vertices[1].getComponent(0);
        this.mesh.position.y = this.lines.geometry.vertices[1].getComponent(1);
        this.mesh.position.z = this.lines.geometry.vertices[1].getComponent(2);

        // console.log(comp);
    },

    animateLines: function () {

        requestAnimationFrame( this.animateLines );

        var currdate = new Date();
        var currtime = currdate.getTime();

        var newY = 2 * Math.sin( currtime * 0.0005 );

        this.lines.geometry.vertices[1].set( 0, newY, 0);
        this.lines.geometry.verticesNeedUpdate = true;

    }
  }
}
</script>
