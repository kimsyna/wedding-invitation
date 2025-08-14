export function initHero3D() {
  const container = document.getElementById("hero-3d");
  if (!container || typeof THREE === "undefined") {
    return {
      start() {},
      stop() {},
    };
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  for (let i = 0; i < 500; i++) {
    const x = (Math.random() - 0.5) * 8;
    const y = (Math.random() - 0.5) * 8;
    const z = (Math.random() - 0.5) * 8;
    vertices.push(x, y, z);
  }
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );
  const material = new THREE.PointsMaterial({ color: 0xff6699, size: 0.1 });
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  const resize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", resize);

  let frameId;
  const animate = () => {
    particles.rotation.y += 0.002;
    particles.rotation.x += 0.001;
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  };

  return {
    start() {
      if (!frameId) animate();
    },
    stop() {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    },
  };
}
