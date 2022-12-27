import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Axes helper
// const axeshelper = new THREE.AxesHelper();
// scene.add(axeshelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTextTexture = textureLoader.load("/textures/matcaps/10.png");
const matcapBoxTexture = textureLoader.load("/textures/matcaps/9.png");
// const matcapBitcoinTexture = textureLoader.load("/textures/matcaps/11.png");
/**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  //cant do like const texture = textureLoader.load()
  const textGeometry = new TextGeometry("Dossdy Blockchain Dev", {
    font: font,
    size: 0.3,
    height: 0.2,
    curveSegments: 4, // no. of segment of wireframe
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  //   textGeometry.computeBoundingBox(); //how to find sphere bounding of an obj
  //   console.log(textGeometry.boundingBox); // now we can acces boundingBox propertr
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  //   );
  textGeometry.center();
  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTextTexture,
  });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);
  //Box
  const boxMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapBoxTexture,
  });
  const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  for (let i = 0; i < 150; i++) {
    const box = new THREE.Mesh(boxGeometry, boxMaterial);

    box.position.x = (Math.random() - 0.5) * 15;
    box.position.y = (Math.random() - 0.5) * 15;
    box.position.z = (Math.random() - 0.5) * 15;

    box.rotation.x = Math.random() * Math.PI;
    box.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    box.scale.set(scale, scale, scale);
    scene.add(box);
  }
  //Coin : Bitcoin
  //   const bitcoinMaterial = new THREE.MeshMatcapMaterial({
  //     matcap: matcapBitcoinTexture,
  //   });
  //   const bitcoinGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 41);
  //   for (let i = 0; i < 50; i++) {
  //     const coin = new THREE.Mesh(bitcoinGeometry, bitcoinMaterial);

  //     coin.position.x = (Math.random() - 0.5) * 15;
  //     coin.position.y = (Math.random() - 0.5) * 15;
  //     coin.position.z = (Math.random() - 0.5) * 15;

  //     coin.rotation.x = Math.random() * Math.PI;
  //     coin.rotation.y = Math.random() * Math.PI;
  //     const scale = Math.random();
  //     coin.scale.set(scale, scale, scale);
  //     scene.add(coin);
  //   }
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
