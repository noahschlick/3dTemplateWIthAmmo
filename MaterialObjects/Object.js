import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Object {
    constructor(color, size) {
        this.color = color
        this.size = size
    
    }

    getColor(){
        return this.color
    }

    setSize(size){
        this.size = size
    }

}