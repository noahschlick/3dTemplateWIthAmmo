import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Box {
    constructor(color, size){
        this.color = color
        this.size = size
        const boxGeo = new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z);
        const boxMat = new THREE.MeshBasicMaterial({
            color: this.color,
            wireframe: true
        });
        const boxMesh = new THREE.Mesh(boxGeo, boxMat);
        this.boxGeo = boxGeo
        this.boxMesh = boxMesh
    }

    getBoxMesh(){
        return this.boxMesh
    }

    mergePhysics(position, quaternion) {
        this.boxMesh.position.copy(position)
        this.boxMesh.quaternion.copy(quaternion)
    }

}