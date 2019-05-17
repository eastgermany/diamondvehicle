// linter disables for THREE.js
/* eslint-disable indent, semi, eol-last, space-in-parens, padded-blocks, no-unused-vars */

import * as THREE from 'three';

function ThreePointOscGeometry (start, end) { // start & end are THREE.Vector3, offset is float

    var geometry = new THREE.Geometry();
    var midvec = new THREE.Vector3();

    var mid;
    var i;

    for (i = 0; i < 3; i++) { // get mid point
        // console.log( ( start.getComponent(i) + end.getComponent(i) / 2 ) );
        mid = ( start.getComponent(i) + end.getComponent(i) / 2 );
        midvec.setComponent(i, mid);
    }
    geometry.vertices.push(start);
    geometry.vertices.push(midvec);
    geometry.vertices.push(end);

    return geometry;

}

// generate an array of THREE.Lines with length: count
export default function TPOscArray (start, end, count) { // osc is THREE.Line

    var oscarray;
    var i;
    var array = [];

    var material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    var geometry;
    // var geometry = ThreePointOscGeometry( start, end )

    var line;
    // var line = new THREE.Line( geometry, material );

    var newX;
    var coeff = 4;

    for (i = 0; i < count; i++) {

        geometry = ThreePointOscGeometry( start, end );

        newX = coeff * Math.random() - ( coeff / 2 );

        line = new THREE.Line( geometry, material );

        array.push( line );
        array[i].geometry.vertices[1].setComponent(0, newX);

    }

    return array;

}