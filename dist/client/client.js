import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
import Stats from '/jsm/libs/stats.module';
//init scene class
const scene = new THREE.Scene();
//init camera class
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//init webgl renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//init control module
const controls = new OrbitControls(camera, renderer.domElement);
//create a simple wireframe box
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
// add box to scene
const box = new THREE.Mesh(geometry, material);
scene.add(box);
//init camera position
camera.position.z = 2;
//event listener updates the canvas when the window is resized
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}
//stats window in top left - FPS counter, RAM etc.
const stats = Stats();
document.body.appendChild(stats.dom);
//animation loop
var animate = function () {
    requestAnimationFrame(animate);
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
    stats.update();
};
function render() {
    renderer.render(scene, camera);
}
render();
animate();
