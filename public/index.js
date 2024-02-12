import * as THREE from "three";
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';
import { RGBELoader } from 'RGBELoader';
let scene = new THREE.Scene();

let aspect = window.innerWidth / window.innerHeight;
let camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 8; // 放置相机

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0.2, 0.2, 0.2); // 修改背景颜色为深灰

let myLight = new THREE.AmbientLight(0xffffff);
scene.add(myLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.95);
scene.add(directionalLight);

// 初始化OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update(); // 控制器更新

// 加载GLB模型
const loader = new GLTFLoader();
loader.load('/models/ver1aniani.glb', function(gltf) {
    scene.add(gltf.scene);
    animate(); // 确保在模型加载后开始渲染循环
}, undefined, function(error) {
    console.error(error);
});

const hdrloader = new RGBELoader();
hdrloader.load('/models/kloofendal_28d_misty_puresky_8k.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture; // 设置HDR图像为背景
    scene.environment = texture; // 设置环境贴图，用于物体表面的反射等
});

// 动画循环确保场景更新
function animate() {
    requestAnimationFrame(animate);

    // 必要时更新控制器
    controls.update();

    renderer.render(scene, camera);
}

animate(); // 开始动画循环
