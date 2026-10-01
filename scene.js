import * as THREE from 'three';
import { prefersReducedMotion, isMobile } from './helpers.js';

export function initThree(container) {
  if (prefersReducedMotion()) return { setColor() {}, dispose() {} };

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x08080a, 0.0015);

  const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 1000);
  camera.position.z = 60;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const count = isMobile() ? 800 : 2500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 300;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xdc2626, size: 0.6, transparent: true,
    opacity: 0.75, sizeAttenuation: true, depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  const light = new THREE.PointLight(0xdc2626, 1, 400);
  light.position.set(50, 50, 50);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.2));

  const mouse = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const onMove = (e) => {
    mouse.x = (e.clientX / innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / innerHeight - 0.5) * 2;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  let raf;
  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    target.x += (mouse.x * 4 - target.x) * 0.05;
    target.y += (-mouse.y * 4 - target.y) * 0.05;
    camera.position.x = target.x;
    camera.position.y = target.y;
    camera.lookAt(0, 0, 0);
    points.rotation.y = t * 0.03;
    points.rotation.x = t * 0.015;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  const onResize = () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  };
  window.addEventListener('resize', onResize);

  return {
    setColor(hex) {
      const c = new THREE.Color(hex);
      mat.color.copy(c);
      light.color.copy(c);
    },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      geo.dispose(); mat.dispose(); renderer.dispose();
      renderer.domElement.remove();
    }
  };
}