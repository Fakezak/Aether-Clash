let scene, camera, renderer;
let player1, player2;
let keys = {};
let gameStarted = false;

async function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a0033);
  scene.fog = new THREE.FogExp2(0x1a0033, 0.03);

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('game'), 
    antialias: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  // Lights
  scene.add(new THREE.AmbientLight(0xaaaaaa, 0.7));
  const dirLight = new THREE.DirectionalLight(0xff88cc, 1.3);
  dirLight.position.set(10, 20, 10);
  scene.add(dirLight);

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0x220044 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Load Characters
  player1 = new Player("Kael", new THREE.Vector3(-6, 0, 0), true);
  await player1.load("assets/models/kael.glb");
  scene.add(player1.model);

  player2 = new Player("Lira", new THREE.Vector3(6, 0, 0), false);
  await player2.load("assets/models/lira.glb");
  scene.add(player2.model);

  document.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
  document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

  gameStarted = true;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (!gameStarted) return;

  // Player 1 Movement
  const speed = 0.2;
  if (player1) {
    if (keys['a']) player1.model.position.x -= speed;
    if (keys['d']) player1.model.position.x += speed;
    if (keys['w']) player1.model.position.z -= speed;
    if (keys['s']) player1.model.position.z += speed;
  }

  updateCamera();
  renderer.render(scene, camera);
}

function startGame() {
  document.getElementById('main-menu').style.display = 'none';
  document.getElementById('hud').style.display = 'block';
  init();
}

function showTraining() { alert("Training Mode - Coming Soon!"); }
function showOptions() { alert("Options - Coming Soon!"); }

window.addEventListener('resize', () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
});
