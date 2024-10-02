// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const geometry = new THREE.CylinderGeometry( 2, 2);
// const material = new THREE.MeshBasicMaterial( { color: "red", wireframe: true } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

// const canvas = document.querySelector('canvas');
// const renderer = new THREE.WebGLRenderer({canvas});
// renderer.setSize( window.innerWidth, window.innerHeight );


// // Update projection matrix on window resize
// window.addEventListener('resize', () => {
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// });



// const controls = new OrbitControls( camera, renderer.domElement );
// controls.enableDamping = true;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5.0

// function animate() {
//   window.requestAnimationFrame(animate);
// 	renderer.render( scene, camera );
//   // cube.rotation.x += 0.01;
//   // cube.rotation.y += 0.01;
//   controls.update();
// }
// animate();



// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);


// // Add a high-intensity directional light
// const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2);
// highIntensityLight.position.set(10, 10, 10);
// scene.add(highIntensityLight);

// // Add studio lighting

// // Create an ambient light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// // Create a key light (main directional light)
// const keyLight = new THREE.DirectionalLight(0xffffff, 1);
// keyLight.position.set(5, 5, 5);
// scene.add(keyLight);

// // Create a fill light (softer light from the opposite side)
// const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
// fillLight.position.set(-5, 5, -5);
// scene.add(fillLight);

// // Create a back light (rim light)
// const backLight = new THREE.DirectionalLight(0xffffff, 0.7);
// backLight.position.set(0, 5, -5);
// scene.add(backLight);

// // Optional: Add a point light for extra highlights
// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.position.set(0, 5, 0);
// scene.add(pointLight);
// // Add helpers for all lights

// // Helper for high-intensity directional light
// const highIntensityLightHelper = new THREE.DirectionalLightHelper(highIntensityLight, 1);
// scene.add(highIntensityLightHelper);

// // Helper for key light
// const keyLightHelper = new THREE.DirectionalLightHelper(keyLight, 1);
// scene.add(keyLightHelper);

// // Helper for fill light
// const fillLightHelper = new THREE.DirectionalLightHelper(fillLight, 1);
// scene.add(fillLightHelper);

// // Helper for back light
// const backLightHelper = new THREE.DirectionalLightHelper(backLight, 1);
// scene.add(backLightHelper);

// // Helper for point light
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
// scene.add(pointLightHelper);

// // Note: Ambient light doesn't have a helper as it's not directional and doesn't have a specific position



// const geometry = new THREE.BoxGeometry(2,2,2);
// const material = new THREE.MeshStandardMaterial({color:"red",roughness:.3,metalness:1});
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube);

// camera.position.z = 5;

// const canvas = document.querySelector('canvas');
// const renderer = new THREE.WebGLRenderer({canvas});
// renderer.setSize(window.innerWidth, window.innerHeight);

// window.addEventListener('resize', () => {
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// });

// // Import OrbitControls if not already imported

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5.0;

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//     // cube.rotation.x += 0.01; // Rotate the cube
//     // cube.rotation.y += 0.01; // Rotate the cube
//     controls.update(); // Update controls in the animation loop
    
// }
// animate();

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas , antialias : true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create cube geometry
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial();
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Load HDRI environment map
new RGBELoader()
    .load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/brown_photostudio_02_4k.hdr', function(texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
    });

    const loader = new GLTFLoader();
    loader.load('./luffy_nika.glb', function(gltf) {
        const model = gltf.scene;
        scene.add(model);
    });

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
   requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();
