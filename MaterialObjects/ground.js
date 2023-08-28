import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Ground {
    constructor(color, size) {
        this.color = color;
        this.size = size;
        const groundGeo = new THREE.PlaneGeometry(this.size.x, this.size.y);
        const groundMat = new THREE.MeshBasicMaterial({
            color: this.color,
            side: THREE.DoubleSide,
            wireframe: true
        });
        const groundMesh = new THREE.Mesh(groundGeo, groundMat);
        this.groundMesh = groundMesh
    }

    getGroundMesh() {
        // Add Ground
        return this.groundMesh
    }

    mergePhysics(position, quaternion) {
        this.groundMesh.position.copy(position)
        this.groundMesh.quaternion.copy(quaternion)
    }
}