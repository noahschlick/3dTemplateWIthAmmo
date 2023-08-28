import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Sphere {

    constructor(color, size){
        this.color = color;
        this.size = size;

        const sphereGeo = new THREE.SphereGeometry(this.size);
        const sphereMat = new THREE.MeshBasicMaterial({
            color: this.color,
            wireframe: true
        });
        const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
        this.sphereGeo = sphereGeo;
        this.sphereMesh = sphereMesh;
    }
   
    getMesh() {
        return this.sphereMesh;
    }

    mergePhysics(position, quaternion) {
        this.sphereMesh.position.copy(position);
        this.sphereMesh.quaternion.copy(quaternion);
    }



}