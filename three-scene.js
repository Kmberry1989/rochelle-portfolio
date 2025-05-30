// three-scene.js – Home Office 3D Environment

// Renderer & Scene
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('three-canvas'),
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50, window.innerWidth/window.innerHeight, 0.1, 1000
);
camera.position.set(0, 3, 5);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(3, 10, 5);
scene.add(dirLight);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10,10),
  new THREE.MeshLambertMaterial({ color: 0xe0e0e0 })
);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

// Desk (wood box)
const deskTexture = new THREE.TextureLoader().load('assets/desk-background.png');
const desk = new THREE.Mesh(
  new THREE.BoxGeometry(4,0.2,2),
  new THREE.MeshLambertMaterial({ map: deskTexture })
);
desk.position.set(0,0.1,0);
scene.add(desk);

// Monitor (paper screen)
const screenTexture = new THREE.TextureLoader().load('assets/monitor-screen.png');
const monitor = new THREE.Mesh(
  new THREE.BoxGeometry(1.6,1,0.05),
  new THREE.MeshLambertMaterial({ map: screenTexture })
);
monitor.position.set(0,0.75,-0.5);
scene.add(monitor);

// Animate loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
