// three-scene.js – Home Office 3D Environment

// Scene Setup
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 5);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(3, 10, 5);
scene.add(dirLight);

// Floor
const floorGeom = new THREE.PlaneGeometry(10, 10);
const floorMat = new THREE.MeshLambertMaterial({ color: 0xe0e0e0 });
const floor = new THREE.Mesh(floorGeom, floorMat);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Desk (wood box)
const deskTexture = new THREE.TextureLoader().load('assets/desk-background.png');
const deskGeom = new THREE.BoxGeometry(4, 0.2, 2);
const deskMat = new THREE.MeshLambertMaterial({ map: deskTexture });
const desk = new THREE.Mesh(deskGeom, deskMat);
desk.position.set(0, 0.1, 0);
scene.add(desk);

// Monitor (screen mapped with a placeholder)
const screenTexture = new THREE.TextureLoader().load('assets/monitor-screen.png');
const monitorGeom = new THREE.BoxGeometry(1.6, 1, 0.05);
const monitorMat = new THREE.MeshLambertMaterial({ map: screenTexture });
const monitor = new THREE.Mesh(monitorGeom, monitorMat);
monitor.position.set(0, 0.75, -0.5);
scene.add(monitor);

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle resize
document.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
