import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.Camera();
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const uniforms = {
  iTime: { value: 0 },
  iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  iMouse: { value: new THREE.Vector2() },
  loopCount: { value: 19 },
  scale: { value: 0.2 },
  increment: { value: 0.03 },
  tanh_mul: { value: 40 },
  z_init_x: { value: 1 },
  z_init_y: { value: 2 },
  z_init_z: { value: 3 },
  colorR: { value: 0.3 },
  colorG: { value: 0.4 },
  colorB: { value: 0.8 },
  brightness: { value: 1.0 },
  speed: { value: 1.0 },
};

// Load shader files
const [vertexShader, fragmentShader] = await Promise.all([
  fetch('./vertex.glsl').then(r => r.text()),
  fetch('./fragment.glsl').then(r => r.text())
]);

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms
});

const geometry = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Wire up slider controls
const sliders = ['loopCount', 'scale', 'increment', 'tanh_mul', 'z_init_x', 'z_init_y', 'z_init_z', 'colorR', 'colorG', 'colorB', 'brightness', 'speed'];
sliders.forEach(name => {
  const slider = document.getElementById(name);
  const valueDisplay = document.getElementById(`${name}-val`);
  slider.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    uniforms[name].value = value;
    valueDisplay.textContent = value.toFixed(name === 'increment' ? 3 : 2);
  });
});

window.addEventListener('mousemove', (e) => {
  uniforms.iMouse.value.x = e.clientX;
  uniforms.iMouse.value.y = window.innerHeight - e.clientY; // flip y
});


const clock = new THREE.Clock();
function animate() {
  uniforms.iTime.value = clock.getElapsedTime();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
});