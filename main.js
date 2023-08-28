import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import { Box } from './MaterialObjects/box';
import { Sphere } from './MaterialObjects/sphere';
import { Ground } from './MaterialObjects/ground';
import { GroundPhysics } from './PhisicsObjects/GroundPhysics';
import { BoxPhysics } from './PhisicsObjects/BoxPhysics';
import { SpherePhysics } from './PhisicsObjects/SpherePhysics';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
//renderer.setClearColor(0xFEFEFE);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(0, 20, -30);
orbit.update()

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

// Add Sphere Material
const sphere = new Sphere(0xff0000, 2)
scene.add(sphere.getMesh())

// Add Box Material
const box = new Box(0x00ff00, {x: 2, y: 2, z: 2})
scene.add(box.getBoxMesh());

// Add Ground Material
const ground = new Ground(0xffffff, {x: 30, y: 30})
scene.add(ground.getGroundMesh())

// Create Gravity
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.81, 0)
});

// Ground Physics
const groundPhys = new GroundPhysics({x: 15, y: 15, z: 0.1})
world.addBody(groundPhys.getBody())
groundPhys.setQuaternionFromEuler(-Math.PI / 2, 0, 0)

// Add box physics body
const boxPhys = new BoxPhysics({x: 1, y: 1, z: 1}, {x: 3, y: 20, z: 0})
world.addBody(boxPhys.getBody())
boxPhys.setVelocity(0, 10, 0)
boxPhys.setAngularDamping(0.5)

// Add contact centext between ground and box
const groundBoxContactMat = new CANNON.ContactMaterial(
  groundPhys.getPhysMat(),
  boxPhys.getPhysMat(),
  {friction: 0.04}
)
world.addContactMaterial(groundBoxContactMat);

// Add sphere physics body
const spherePhys = new SpherePhysics(2, {x: 0, y: 15, z: 0});
world.addBody(spherePhys.getBody());
spherePhys.setLinearDamping(0.31);

const groundSphereContactMat = new CANNON.ContactMaterial(
  groundPhys.getPhysMat(),
  spherePhys.getPhysMat(),
  {restitution: 0.9}
);

world.addContactMaterial(groundSphereContactMat);

const timeStep = 1 / 60;

// Start the animation loop
function animate() {
  world.step(timeStep)

  ground.mergePhysics(groundPhys.getPosition(), groundPhys.getQuaternion());
  box.mergePhysics(boxPhys.getPosition(), boxPhys.getQuaternion());
  sphere.mergePhysics(spherePhys.getPosition(), spherePhys.getQuaternion());

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});