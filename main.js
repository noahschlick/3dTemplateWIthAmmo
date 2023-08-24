import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

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

// Add Box
const boxGeo = new THREE.BoxGeometry(2, 2, 2);
const boxMat = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true
});
const boxMesh = new THREE.Mesh(boxGeo, boxMat);
scene.add(boxMesh);

// Add Sphere
const sphereGeo = new THREE.SphereGeometry(2);
const sphereMat = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true
});
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphereMesh)

// Add Ground
const groundGeo = new THREE.PlaneGeometry(30, 30);
const groundMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  wireframe: true
});

const groundMesh = new THREE.Mesh(groundGeo, groundMat);
scene.add(groundMesh);

// Create Gravity
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.81, 0)
});

// Make a phisics ground body
const groundPhysMat = new CANNON.Material(); // Material helps with setting how objects react when they hit the ground

const groundBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
  //mass: 0
  type: CANNON.Body.STATIC,
  material: groundPhysMat
})
world.addBody(groundBody)
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

// Add box phisics body
const boxPhysMat = new CANNON.Material();

const boxBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
  mass: 1,
  position: new CANNON.Vec3(3, 20, 0),
  material: boxPhysMat
});
world.addBody(boxBody);

// modify the velocity
boxBody.angularVelocity.set(0, 10, 0);
boxBody.angularDamping = 0.5

// Add contact centext between ground and box
const groundBoxContactMat = new CANNON.ContactMaterial(
  groundPhysMat,
  boxPhysMat,
  {friction: 0.04}
)
world.addContactMaterial(groundBoxContactMat);

// Add sphere phisics body
const spherePhysMat = new CANNON.Material();

const sphereBody = new CANNON.Body({
  mass: 10,
  shape: new CANNON.Sphere(2),
  position: new CANNON.Vec3(0, 15, 0),
  material: spherePhysMat
});
world.addBody(sphereBody)

sphereBody.linearDamping = 0.31 // Add air resistance to the sphere

const groundSphereContactMat = new CANNON.ContactMaterial(
  groundPhysMat,
  spherePhysMat,
  {restitution: 0.9}
);

world.addContactMaterial(groundSphereContactMat);

const timeStep = 1 / 60;

// Start the animation loop
function animate() {
  world.step(timeStep)

  groundMesh.position.copy(groundBody.position);
  groundMesh.quaternion.copy(groundBody.quaternion);

  boxMesh.position.copy(boxBody.position);
  boxMesh.quaternion.copy(boxBody.quaternion);

  sphereMesh.position.copy(sphereBody.position);
  sphereMesh.quaternion.copy(sphereBody.quaternion);

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});