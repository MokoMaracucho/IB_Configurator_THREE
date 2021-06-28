import './style.css';

import  * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { gsap } from 'gsap';

// SCENE
let sceneReady = false;
const scene = new THREE.Scene();

// CANVAS
const canvas = document.querySelector('canvas.webgl');

// SIZES
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// CAMERA TARGET
const hauteurTargetCamera = 3;
const cameraTarget_GEOMETRY = new THREE.BoxGeometry( 1, 1, 1 );
const cameraTarget_MATERIAL = new THREE.MeshBasicMaterial( {color: 0xff0000} );
const cameraTarget_MESH = new THREE.Mesh(cameraTarget_GEOMETRY, cameraTarget_MATERIAL);
cameraTarget_MESH.position.y = hauteurTargetCamera;
cameraTarget_MESH.visible = false;
scene.add(cameraTarget_MESH);

// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 10;
camera.position.z = 20;
scene.add(camera);

// CONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.y = hauteurTargetCamera;
//controls.minDistance = ;
//controls.maxDistance = ;
controls.update();

// RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// RAYCASTER
const raycaster = new THREE.Raycaster();

const mousePosition_SCREEN = new THREE.Vector2();
const mousePosition_THREE = new THREE.Vector2();

canvas.addEventListener('mousemove', (event) => {
    mousePosition_SCREEN.x = event.clientX - Math.floor(window.innerWidth * 0.12);
    mousePosition_SCREEN.y = event.clientY;
    
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    mousePosition_THREE.x = ((2 / canvasWidth) * mousePosition_SCREEN.x) - 1;
    mousePosition_THREE.y = - ((2 / canvasHeight) * mousePosition_SCREEN.y) + 1;

    //console.log("------------------------------------> (X: " +  mousePosition_THREE.x + ", Y: " +  mousePosition_THREE.y);
});
let isIntersecting = false;

// LIGHT

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

const pointLight = new THREE.PointLight(0xffffff, 0.2);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

scene.add(pointLight, ambientLight);

// OVERLAY

const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms:
    {
        uAlpha: {value: 1}
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;
        void main()
        {
            gl_FragColor = vec4(0.82, 0.82, 0.82, uAlpha);
        }
    `
});
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
scene.add(overlay);

// LOADING MANAGER

const loadingBarElement = document.querySelector('.loading-bar');

const loadingManager = new THREE.LoadingManager(
    () => {
        gsap.delayedCall(0.5, () => {
            gsap.to(overlayMaterial.uniforms.uAlpha, {duration: 3, value: 0});
            loadingBarElement.classList.add('ended');
            loadingBarElement.style.transform = '';

            gsap.delayedCall(0.5, () => {
                loadPhoneMesh();

                gsap.delayedCall(0.5, () => {
                    loadHeadphoneTopMesh();

                    gsap.delayedCall(0.5, () => {
                        loadHeadphoneRightMesh();

                        gsap.delayedCall(0.5, () => {
                            loadHeadphoneLeftMesh();
                        });
                    });
                });
            });
        });

        window.setTimeout(() => {
            sceneReady = true;
        }, 2000);
    },
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal;
        loadingBarElement.style.transform = 'scaleX(' + progressRatio + ')';
    }
);

// ENV

const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);

const environnementMapTexture = cubeTextureLoader.load([
    '/img/environment/cubeMap/px.png',
    '/img/environment/cubeMap/nx.png',
    '/img/environment/cubeMap/py.png',
    '/img/environment/cubeMap/ny.png',
    '/img/environment/cubeMap/pz.png',
    '/img/environment/cubeMap/nz.png'
]);

// TEXTURE LOADER

const textureLoader = new THREE.TextureLoader(loadingManager);

// LOADER

const loader = new GLTFLoader();

// TELEVISION

const Television_GROUP = new THREE.Group();
scene.add(Television_GROUP);

let Television_MESH = new THREE.Object3D;

let Key_power_MESH = new THREE.Object3D;
let Panel_front_1_MESH = new THREE.Object3D;
let Panel_front_2_MESH = new THREE.Object3D;
let Remote_Steel_ward_MESH = new THREE.Object3D;
let Phone_opas_MESH = new THREE.Object3D;
let Plastik_glanek_MESH = new THREE.Object3D;
let Panel_back_MESH = new THREE.Object3D;
let Chrom_kant_MESH = new THREE.Object3D;
let Remote_screen_MESH = new THREE.Object3D;
let Chrom_rem_MESH = new THREE.Object3D;
let Back_label_MESH = new THREE.Object3D;
let Screen_off_MESH = new THREE.Object3D;
let Chrom_MESH = new THREE.Object3D;
let Metall_strip_MESH = new THREE.Object3D;
let Glass_black_MESH = new THREE.Object3D;
let Metall_dark_MESH = new THREE.Object3D;
let Gold_MESH = new THREE.Object3D;
let Plastic_black_MESH = new THREE.Object3D;
let Plastic_white_MESH = new THREE.Object3D;
let Plastic_yellow_MESH = new THREE.Object3D;
let Luminium_MESH = new THREE.Object3D;
let Plastic_black_gloss_MESH = new THREE.Object3D;

const Key_power_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/Key_power.jpg');
const Panel_front_1_ALPHA_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/Panel_Opasity_mask.jpg');
const Remote_Steel_ward_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/substance/Samsung_SMART_TV_Remote_Steel_ward_BaseColor.png');
const Remote_Steel_ward_METALNESS_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/substance/Samsung_SMART_TV_Remote_Steel_ward_Metallic.png');
const Remote_Steel_ward_NORMAL_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/substance/Samsung_SMART_TV_Remote_Steel_ward_Normal.png');
const Remote_Steel_ward_ROUGHNESS_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/substance/Samsung_SMART_TV_Remote_Steel_ward_Roughness.png');
const Phone_opas_COLOR_TEXTURE = textureLoader.load('/img/textures/Samsung_SMART_TV/Phone_opas_COLOR_TEXTURE.png');
const Panel_back_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/Panel_back_COLOR_TEXTURE.jpg');
const Remote_screen_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/Remote_screen_1.jpg');
const Back_label_COLOR_TEXTURE = textureLoader.load('/img/textures/Samsung_SMART_TV/Back_label_COLOR_TEXTURE.jpg');
const Metall_strip_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/substance/Samsung_SMART_TV_Metall_strip_BaseColor.png');
const Metall_strip_METALNESS_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/substance/Samsung_SMART_TV_Metall_strip_Metallic.png');
const Metall_strip_NORMAL_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/substance/Samsung_SMART_TV_Metall_strip_Normal.png');
const Metall_strip_ROUGHNESS_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/substance/Samsung_SMART_TV_Metall_strip_Roughness.png');

const television_ground_ALPHA_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/television_ground_ALPHA_MAP.jpg');

let televisionGroup_ROTATION_Y = 0.005;
canvas.addEventListener('pointerdown', () => {
    televisionGroup_ROTATION_Y = 0;
});
canvas.addEventListener('pointerup', () => {
    televisionGroup_ROTATION_Y = 0.005;
});

loader.load(
	'gltf/Samsung_SMART_TV.gltf',
	function (gltf) {
        Television_MESH = gltf.scene;
        gltf.scene.traverse(function(child) {
            //console.log(child);
        });

        Television_GROUP.add(Television_MESH);

        // 1 = Key_power
        Key_power_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_1");
        const Key_power_MATERIAL = new THREE.MeshStandardMaterial();
        Key_power_MATERIAL.map = Key_power_MAP;
        Key_power_MATERIAL.envMap = environnementMapTexture;
        Key_power_MESH.material = Key_power_MATERIAL;

        // 2 = Panel_front_1
        Panel_front_1_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_2");
        const Panel_front_1_MATERIAL = new THREE.MeshStandardMaterial();
        Panel_front_1_MATERIAL.color = new THREE.Color( 0x000000 );
        Panel_front_1_MATERIAL.metalness = 0;
        Panel_front_1_MATERIAL.roughness = 0;
        Panel_front_1_MATERIAL.clearcoat = 10;
        Panel_front_1_MATERIAL.transparent = true;
        Panel_front_1_MATERIAL.alphaMap = Panel_front_1_ALPHA_MAP;
        Panel_front_1_MATERIAL.envMap = environnementMapTexture;  
        Panel_front_1_MESH.material = Panel_front_1_MATERIAL;

        // 3 = Panel_front_2
        Panel_front_2_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_3");
        const Panel_front_2_MATERIAL = new THREE.MeshStandardMaterial();
        Panel_front_2_MATERIAL.color = new THREE.Color( 0x000000 );
        Panel_front_2_MATERIAL.metalness = 0.4;
        Panel_front_2_MATERIAL.roughness = 0;
        Panel_front_2_MATERIAL.envMap = environnementMapTexture;
        Panel_front_2_MESH.material = Panel_front_2_MATERIAL;

        // 4 = Remote_Steel_ward
        Remote_Steel_ward_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_4");
        const Remote_Steel_ward_MATERIAL = new THREE.MeshStandardMaterial();
        Remote_Steel_ward_MATERIAL.color = new THREE.Color( 0x808080 );
        Remote_Steel_ward_MATERIAL.metalness = 0.8;
        Remote_Steel_ward_MATERIAL.roughness = 0.2;
        Remote_Steel_ward_MATERIAL.map = Remote_Steel_ward_MAP;
        Remote_Steel_ward_MATERIAL.metalnessMap = Remote_Steel_ward_METALNESS_MAP;
        Remote_Steel_ward_MATERIAL.normalMap = Remote_Steel_ward_NORMAL_MAP;
        Remote_Steel_ward_MATERIAL.roughnessMap = Remote_Steel_ward_ROUGHNESS_MAP;
        Remote_Steel_ward_MATERIAL.envMap = environnementMapTexture;
        Remote_Steel_ward_MESH.material = Remote_Steel_ward_MATERIAL;

        // 5 = Phone_opas
        Phone_opas_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_5");
        const Phone_opas_MATERIAL = new THREE.MeshStandardMaterial();
        Phone_opas_MATERIAL.map = Phone_opas_COLOR_TEXTURE;
        Phone_opas_MATERIAL.envMap = environnementMapTexture;
        Phone_opas_MESH.material = Phone_opas_MATERIAL;

        // 6 = Plastik_glanek
        Plastik_glanek_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_6");
        const Plastik_glanek_MATERIAL = new THREE.MeshStandardMaterial();
        Plastik_glanek_MATERIAL.color = new THREE.Color( 0x303030 );
        Plastik_glanek_MATERIAL.metalness = 0.4;
        Plastik_glanek_MATERIAL.roughness = 0.4;
        Plastik_glanek_MATERIAL.envMap = environnementMapTexture;
        Plastik_glanek_MESH.material = Plastik_glanek_MATERIAL;

        // 7 = Panel_back
        Panel_back_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_7");
        const Panel_back_MATERIAL = new THREE.MeshStandardMaterial();
        Panel_back_MATERIAL.map = Panel_back_MAP;
        Panel_back_MATERIAL.envMap = environnementMapTexture;
        Panel_back_MESH.material = Plastik_glanek_MATERIAL;

        // 8 = Chrom_kant
        Chrom_kant_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_8");
        const Chrom_kant_MATERIAL = new THREE.MeshStandardMaterial();
        Chrom_kant_MATERIAL.color = new THREE.Color( 0xFFFFFF );
        Chrom_kant_MATERIAL.metalness = 0.7;
        Chrom_kant_MATERIAL.roughness = 0.2;
        Chrom_kant_MATERIAL.envMap = environnementMapTexture;
        Chrom_kant_MESH.material = Chrom_kant_MATERIAL;

        // 9 = Remote_screen
        Remote_screen_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_9");
        const Remote_screen_MATERIAL = new THREE.MeshStandardMaterial();
        Remote_screen_MATERIAL.color = new THREE.Color( 0xFFFFFF );
        Remote_screen_MATERIAL.map = Remote_screen_MAP;
        Remote_screen_MATERIAL.emissiveMap = Remote_screen_MAP;
        Remote_screen_MATERIAL.emissiveIntensity = 0.1;
        Remote_screen_MATERIAL.envMap = environnementMapTexture;
        Remote_screen_MESH.material = Remote_screen_MATERIAL;

        // 10 = Chrom_rem
        Chrom_rem_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_10");
        const Chrom_rem_MATERIAL = new THREE.MeshStandardMaterial();
        Chrom_rem_MATERIAL.color = new THREE.Color(0xFFFFFF);
        Chrom_rem_MATERIAL.metalness = 1;
        Chrom_rem_MATERIAL.roughness = 0.05;
        Chrom_rem_MATERIAL.envMap = environnementMapTexture;
        Chrom_rem_MESH.material = Chrom_rem_MATERIAL;

        // 11 = Back_label
        Back_label_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_11");
        const Back_label_MATERIAL = new THREE.MeshStandardMaterial();
        Back_label_MATERIAL.map = Back_label_COLOR_TEXTURE;
        Back_label_MATERIAL.envMap = environnementMapTexture;
        Back_label_MESH.material = Back_label_MATERIAL;

        // 12 = Screen_off
        const video = document.createElement('video');
        video.src = "videos/SmallWorld_Samsung.mp4";
        video.muted = true;
        video.load();
        video.play();
        video.loop = true;
        const texture = new THREE.VideoTexture(video);
        texture.wrapS = THREE.RepeatWrapping;
        texture.flipY = false;
        Screen_off_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_12");
        const Screen_off_MATERIAL = new THREE.MeshPhysicalMaterial();
        Screen_off_MATERIAL.map = texture;
        Screen_off_MATERIAL.metalness = 0.5;
        Screen_off_MATERIAL.roughness = 0.7;
        Screen_off_MATERIAL.emissive = new THREE.Color(0xAAAAAA);
        Screen_off_MATERIAL.emissiveMap = texture;
        Screen_off_MATERIAL.emissiveIntensity = 0.8;
        Screen_off_MATERIAL.clearcoat = 1;
        Screen_off_MATERIAL.clearcoatRoughness = 1;
        Screen_off_MATERIAL.envMap = environnementMapTexture;
        Screen_off_MESH.material = Screen_off_MATERIAL;

        // 13 = Chrom
        Chrom_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_13");
        Chrom_MESH.geometry.setAttribute('uv2', new THREE.BufferAttribute(Chrom_MESH.geometry.attributes.uv.array, 2))
        const Chrom_MATERIAL = new THREE.MeshStandardMaterial();
        Chrom_MATERIAL.color = new THREE.Color(0xFFFFFF);
        Chrom_MATERIAL.metalness = 0.6;
        Chrom_MATERIAL.roughness = 0;
        Chrom_MATERIAL.envMap = environnementMapTexture; 
        Chrom_MESH.material = Chrom_MATERIAL;

        // 14 = Metall_strip
        Metall_strip_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_14");
        const Metall_strip_MATERIAL = new THREE.MeshStandardMaterial();
        Metall_strip_MATERIAL.map = Metall_strip_MAP;
        Metall_strip_MATERIAL.metalnessMap = Metall_strip_METALNESS_MAP;
        Metall_strip_MATERIAL.normalMap = Metall_strip_NORMAL_MAP;
        Metall_strip_MATERIAL.roughnessMap = Metall_strip_ROUGHNESS_MAP;
        Metall_strip_MATERIAL.envMap = environnementMapTexture; 
        Metall_strip_MESH.material = Metall_strip_MATERIAL;

        // 15 = Glass_black
        Glass_black_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_15");
        const Glass_black_MATERIAL = new THREE.MeshStandardMaterial();
        Glass_black_MATERIAL.color = new THREE.Color(0xCFCFCF);
        Glass_black_MATERIAL.metalness = 0.6;
        Glass_black_MATERIAL.roughness = 0.2;
        Glass_black_MATERIAL.envMap = environnementMapTexture; 
        Glass_black_MESH.material = Glass_black_MATERIAL;

        // 16 = Metall_dark
        Metall_dark_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_16");
        const Metall_dark_MATERIAL = new THREE.MeshStandardMaterial();
        Metall_dark_MATERIAL.color = new THREE.Color(0x4D4D4D);
        Metall_dark_MATERIAL.metalness = 0.7;
        Metall_dark_MATERIAL.roughness = 0.5;
        Metall_dark_MATERIAL.envMap = environnementMapTexture; 
        Metall_dark_MESH.material = Metall_dark_MATERIAL;

        // 17 = Gold
        Gold_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_17");
        const Gold_MATERIAL = new THREE.MeshStandardMaterial();
        Gold_MATERIAL.color = new THREE.Color(0xFFDA00);
        Gold_MATERIAL.metalness = 1;
        Gold_MATERIAL.roughness = 0;
        Gold_MATERIAL.envMap = environnementMapTexture; 
        Gold_MESH.material = Gold_MATERIAL;

        // 19 = Plastic_black
        Plastic_black_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_19");
        const Plastic_black_MATERIAL = new THREE.MeshStandardMaterial();
        Plastic_black_MATERIAL.color = new THREE.Color(0x000000);
        Plastic_black_MATERIAL.metalness = 1;
        Plastic_black_MATERIAL.roughness = 0.3;
        Plastic_black_MATERIAL.envMap = environnementMapTexture; 
        Plastic_black_MESH.material = Plastic_black_MATERIAL;

        // 20 = Plastic_white
        Plastic_white_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_20");
        const Plastic_white_MATERIAL = new THREE.MeshStandardMaterial();
        Plastic_white_MATERIAL.color = new THREE.Color(0xFFFFFF);
        Plastic_white_MATERIAL.metalness = 1;
        Plastic_white_MATERIAL.roughness = 0.3;
        Plastic_white_MATERIAL.envMap = environnementMapTexture; 
        Plastic_white_MESH.material = Plastic_white_MATERIAL;

        // 21 = Plastic_yellow
        Plastic_yellow_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_21");
        const Plastic_yellow_MATERIAL = new THREE.MeshStandardMaterial();
        Plastic_yellow_MATERIAL.color = new THREE.Color(0xFFCE00);
        Plastic_yellow_MATERIAL.metalness = 0;
        Plastic_yellow_MATERIAL.roughness = 1;
        Plastic_yellow_MATERIAL.envMap = environnementMapTexture; 
        Plastic_yellow_MESH.material = Plastic_yellow_MATERIAL;
        
        // 22 = Luminium
        Luminium_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_22");
        const Luminium_MATERIAL = new THREE.MeshStandardMaterial();
        Luminium_MATERIAL.color = new THREE.Color(0xC8C8C8);
        Luminium_MATERIAL.metalness = 1;
        Luminium_MATERIAL.roughness = 0.5;
        Luminium_MATERIAL.envMap = environnementMapTexture; 
        Luminium_MESH.material = Luminium_MATERIAL;

        // 23 = Plastic_black_gloss
        Plastic_black_gloss_MESH = gltf.scene.getObjectByName("Samsung_SMART_TV_23");
        const Plastic_black_gloss_MATERIAL = new THREE.MeshStandardMaterial();
        Plastic_black_gloss_MATERIAL.color = new THREE.Color(0x000000);
        Plastic_black_gloss_MATERIAL.metalness = 1;
        Plastic_black_gloss_MATERIAL.roughness = 0.05;
        Plastic_black_gloss_MATERIAL.envMap = environnementMapTexture; 
        Plastic_black_gloss_MESH.material = Plastic_black_gloss_MATERIAL;
	},
    
	function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	},
    
	function ( error ) {
		console.log('An error happened');
	}
);

const television_ground_GEOMETRY = new THREE.PlaneGeometry(20, 20);
const television_ground_MATERIAL = new THREE.MeshBasicMaterial( {color: 0x000000, transparent: false, alphaMap: television_ground_ALPHA_MAP} );
const television_GROUND = new THREE.Mesh(television_ground_GEOMETRY, television_ground_MATERIAL);
television_GROUND.rotation.x = - Math.PI / 2;

Television_GROUP.add(television_GROUND);
Television_GROUP.activeItem = true;
Television_GROUP.positionItem = 1;

// PHONE
const Phone_GROUP = new THREE.Group();
scene.add(Phone_GROUP);

let Phone_MESH = new THREE.Object3D;

let Body_black_MESH = new THREE.Object3D;
let Antenna_black_MESH = new THREE.Object3D;
let Black_MESH = new THREE.Object3D;
let Glass_matte_MESH = new THREE.Object3D;
let Glass_MESH = new THREE.Object3D;
let Front_MESH = new THREE.Object3D;
let Black_back_MESH = new THREE.Object3D;
let Steel_black_MESH = new THREE.Object3D;
let Screen12Pro_black_MESH = new THREE.Object3D;
let Plastik_black_MESH = new THREE.Object3D;
let Plastik_cam_MESH = new THREE.Object3D;
let Glass_cam_MESH = new THREE.Object3D;
let Light_yellow_MESH = new THREE.Object3D;
let Light_orange_MESH = new THREE.Object3D;
let Rubber_black_MESH = new THREE.Object3D;
let Glass_flash_MESH = new THREE.Object3D;
let Gold_PHONE_MESH = new THREE.Object3D;

const phone_ground_ALPHA_MAP = textureLoader.load('/img/textures/Samsung_SMART_TV/phone_ground_ALPHA_MAP.jpg');

const loadPhoneMesh = function () {
    console.log("------------------------------------> START phone loader");

    loader.load(
        'gltf/iPhone_12_Pro.gltf',
        function (gltf) {
            Phone_MESH = gltf.scene;
            Phone_MESH.traverse(function(child) {
                //console.log(child);
            });

            Phone_GROUP.add(Phone_MESH);

            // 1 = Body_black
            Body_black_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_1", true);
            let Body_black_MATERIAL = new THREE.MeshStandardMaterial();
            Body_black_MATERIAL.color = new THREE.Color( 0xe1e2dc );
            Body_black_MATERIAL.metalness = 0.4;
            Body_black_MATERIAL.roughness = 0.4;
            Body_black_MATERIAL.envMap = environnementMapTexture;
            Body_black_MESH.material = Body_black_MATERIAL;
            
            // 2 = Antenna_black
            Antenna_black_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_2", true);
            let Antenna_black_MATERIAL = new THREE.MeshStandardMaterial();
            Antenna_black_MATERIAL.color = new THREE.Color( 0x333333 );
            Antenna_black_MATERIAL.metalness = 0;
            Antenna_black_MATERIAL.roughness = 1;
            Antenna_black_MATERIAL.envMap = environnementMapTexture;
            Antenna_black_MESH.material = Antenna_black_MATERIAL;

            // 3 = Black
            Black_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_3", true);
            let Black_MATERIAL = new THREE.MeshStandardMaterial();
            Black_MATERIAL.color = new THREE.Color( 0x000000 );
            Black_MATERIAL.metalness = 0;
            Black_MATERIAL.roughness = 1;
            Black_MATERIAL.envMap = environnementMapTexture;
            Black_MESH.material = Black_MATERIAL;

            // 4 = Glass_matte
            Glass_matte_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_4", true);
            let Glass_matte_MATERIAL = new THREE.MeshStandardMaterial();
            Glass_matte_MATERIAL.color = new THREE.Color( 0x000000 );
            Glass_matte_MATERIAL.metalness = 0.85;
            Glass_matte_MATERIAL.roughness = 0.35;
            Glass_matte_MATERIAL.envMap = environnementMapTexture;
            Glass_matte_MESH.material = Glass_matte_MATERIAL;

            // 5 = Glass
            Glass_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_5", true);
            let Glass_MATERIAL = new THREE.MeshStandardMaterial();
            Glass_MATERIAL.color = new THREE.Color( 0x000000 );
            Glass_MATERIAL.transparent = true;
            Glass_MATERIAL.opacity = 0.2;
            Glass_MATERIAL.envMap = environnementMapTexture;
            Glass_MESH.material = Glass_MATERIAL;

            // 6 = Front
            Front_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_6", true);
            let Front_MATERIAL = new THREE.MeshStandardMaterial();
            Front_MATERIAL.color = new THREE.Color( 0x000000 );
            Front_MATERIAL.metalness = 0;
            Front_MATERIAL.roughness = 0;
            Front_MATERIAL.envMap = environnementMapTexture;
            Front_MESH.material = Front_MATERIAL;

            // 7 = Black_back
            Black_back_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_7", true);
            let Black_back_MATERIAL = new THREE.MeshStandardMaterial();
            Black_back_MATERIAL.color = new THREE.Color( 0x444444 );
            Black_back_MATERIAL.metalness = 0.3;
            Black_back_MATERIAL.roughness = 0.1;
            Black_back_MATERIAL.envMap = environnementMapTexture;
            Black_back_MESH.material = Black_back_MATERIAL;

            // 8 = Steel_black
            Steel_black_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_8", true);
            let Steel_black_MATERIAL = new THREE.MeshStandardMaterial();
            Steel_black_MATERIAL.color = new THREE.Color( 0x000000 );
            Steel_black_MATERIAL.metalness = 0.5;
            Steel_black_MATERIAL.roughness = 0.5;
            Steel_black_MATERIAL.envMap = environnementMapTexture;
            Steel_black_MESH.material = Steel_black_MATERIAL;

            // 9 = Screen12Pro_black
            let video = document.createElement('video');
            video.src = "videos/test_iphone.mp4";
            video.muted = true;
            video.load();
            video.play();
            video.loop = true;
            let texture = new THREE.VideoTexture(video);
            texture.wrapS = THREE.RepeatWrapping;
            texture.repeat.x = - 1;
            texture.flipY = false;
            Screen12Pro_black_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_9", true);
            let Screen12Pro_black_MATERIAL = new THREE.MeshStandardMaterial();
            Screen12Pro_black_MATERIAL.map = texture;
            Screen12Pro_black_MATERIAL.emissiveMap = texture;
            Screen12Pro_black_MATERIAL.emissiveIntensity = 0.8;
            Screen12Pro_black_MATERIAL.envMap = environnementMapTexture;
            Screen12Pro_black_MESH.material = Screen12Pro_black_MATERIAL;

            // 10 = Plastik_black
            Plastik_black_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_10", true);
            let Plastik_black_MATERIAL = new THREE.MeshStandardMaterial();
            Plastik_black_MATERIAL.color = new THREE.Color( 0x333333 );
            Plastik_black_MATERIAL.metalness = 0;
            Plastik_black_MATERIAL.roughness = 0;
            Plastik_black_MATERIAL.envMap = environnementMapTexture;
            Plastik_black_MESH.material = Plastik_black_MATERIAL;

            // 11 = Plastik_cam
            Plastik_cam_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_11", true);
            let Plastik_cam_MATERIAL = new THREE.MeshStandardMaterial();
            Plastik_cam_MATERIAL.color = new THREE.Color( 0x000000 );
            Plastik_cam_MATERIAL.metalness = 0;
            Plastik_cam_MATERIAL.roughness = 0;
            Plastik_cam_MATERIAL.envMap = environnementMapTexture;
            Plastik_cam_MESH.material = Plastik_cam_MATERIAL;

            // 12 = Glass_cam
            Glass_cam_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_12", true);
            let Glass_cam_MATERIAL = new THREE.MeshStandardMaterial();
            Glass_cam_MATERIAL.color = new THREE.Color( 0x000000 );
            Glass_cam_MATERIAL.transparent = true;
            Glass_cam_MATERIAL.opacity = 0.2;
            Glass_cam_MATERIAL.envMap = environnementMapTexture;
            Glass_cam_MESH.material = Glass_cam_MATERIAL;

            // 13 = Light_yellow
            Light_yellow_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_13", true);
            let Light_yellow_MATERIAL = new THREE.MeshStandardMaterial();
            Light_yellow_MATERIAL.color = new THREE.Color( 0x686868 );
            Light_yellow_MATERIAL.metalness = 0.5;
            Light_yellow_MATERIAL.roughness = 0.5;
            Light_yellow_MATERIAL.envMap = environnementMapTexture;
            Light_yellow_MESH.material = Light_yellow_MATERIAL;

            // 14 = Light_orange
            Light_orange_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_14", true);
            let Light_orange_MATERIAL = new THREE.MeshStandardMaterial();
            Light_orange_MATERIAL.color = new THREE.Color( 0x6b6b6b );
            Light_orange_MATERIAL.metalness = 0.5;
            Light_orange_MATERIAL.roughness = 0.5;
            Light_orange_MATERIAL.envMap = environnementMapTexture;
            Light_orange_MESH.material = Light_orange_MATERIAL;

            // 15 = Rubber_black
            Rubber_black_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_15", true);
            let Rubber_black_MATERIAL = new THREE.MeshStandardMaterial();
            Rubber_black_MATERIAL.color = new THREE.Color( 0x000000 );
            Rubber_black_MATERIAL.metalness = 0;
            Rubber_black_MATERIAL.roughness = 0;
            Rubber_black_MATERIAL.envMap = environnementMapTexture;
            Rubber_black_MESH.material = Rubber_black_MATERIAL;

            // 16 = Glass_flash
            Glass_flash_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_16", true);
            let Glass_flash_MATERIAL = new THREE.MeshStandardMaterial();
            Glass_flash_MATERIAL.color = new THREE.Color( 0x000000 );
            Glass_flash_MATERIAL.transparent = true;
            Glass_flash_MATERIAL.opacity = 0.2;
            Glass_flash_MATERIAL.envMap = environnementMapTexture;
            Glass_flash_MESH.material = Glass_flash_MATERIAL;

            // 17 = Gold
            Gold_PHONE_MESH = gltf.scene.getObjectByName("iPhone_12_Pro_17", true);
            let Gold_PHONE_MATERIAL = new THREE.MeshStandardMaterial();
            Gold_PHONE_MATERIAL.color = new THREE.Color(0xFFDA00);
            Gold_PHONE_MATERIAL.metalness = 1;
            Gold_PHONE_MATERIAL.roughness = 0;
            Gold_PHONE_MATERIAL.envMap = environnementMapTexture;
            Gold_PHONE_MESH.material = Glass_PHONE_MATERIAL;
        },
        
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        
        function ( error ) {
            console.log('An error happened');
        }
    );
}

const phone_ground_GEOMETRY = new THREE.PlaneGeometry(20, 20);
const phone_ground_MATERIAL = new THREE.MeshBasicMaterial( {color: 0x000000, transparent: false, alphaMap: phone_ground_ALPHA_MAP} );
const phone_GROUND = new THREE.Mesh(phone_ground_GEOMETRY, phone_ground_MATERIAL);
phone_GROUND.rotation.x = - Math.PI / 2;

Phone_GROUP.add(phone_GROUND);
Phone_GROUP.activeItem = false;
Phone_GROUP.visible = false;
Phone_GROUP.positionItem = 2;

let phone_COLOR = 'white';
canvas.addEventListener('click', () => {
    let animation = gsap.timeline();
    if(isIntersecting == true) {
        switch(phone_COLOR) {
            case 'white':
                Body_black_MESH.material.color.set('#585753');
                phone_COLOR = 'black';

                animation.to(Phone_GROUP.position, {duration: 0.3, z: 0.5, ease: "power1"})
                    .to(Phone_GROUP.position, {duration: 2, z: 0, ease: "elastic"});
                break;
            case 'black':
                Body_black_MESH.material.color.set('#efe0cb');
                phone_COLOR = 'beige';
                
                animation.to(Phone_GROUP.position, {duration: 0.3, z: 0.5, ease: "power1"})
                    .to(Phone_GROUP.position, {duration: 2, z: 0, ease: "elastic"});
                break;
            case 'beige':
                Body_black_MESH.material.color.set('#384f5d');
                phone_COLOR = 'green';
                
                animation.to(Phone_GROUP.position, {duration: 0.3, z: 0.5, ease: "power1"})
                    .to(Phone_GROUP.position, {duration: 2, z: 0, ease: "elastic"});
                break;
            case 'green':
                Body_black_MESH.material.color.set('#e1e2dc');
                phone_COLOR = 'white';
                
                animation.to(Phone_GROUP.position, {duration: 0.3, z: 0.5, ease: "power1"})
                    .to(Phone_GROUP.position, {duration: 2, z: 0, ease: "elastic"});
                break;
        } 
        console.log("------------------------------------> isIntersecting : " + isIntersecting);
    }
});

// HEADPHONE

const Headphone_GROUP = new THREE.Group();
scene.add(Headphone_GROUP);

let Headphone_TOP_MESH = new THREE.Object3D;

let Matte_Gray_TOP_MESH = new THREE.Object3D;
let Gloss_Gold_TOP_MESH = new THREE.Object3D;
let Matte_Gold_TOP_MESH = new THREE.Object3D;

const headphone_ground_ALPHA_MAP = textureLoader.load('/img/textures/Beat_Studio_3/headphone_ground_ALPHA_MAP.jpg');

const loadHeadphoneTopMesh = function () {
    console.log("------------------------------------> START headphone loader");

    loader.load(
        'gltf/Beats_Studio_3_TOP.gltf',
        function (gltf) {
            scene.add(gltf.scene);
            Headphone_TOP_MESH = gltf.scene;
            Headphone_TOP_MESH.traverse(function(child) {
                console.log(child);
            });
            Headphone_GROUP.add(Headphone_TOP_MESH);

            // 1 = Matte_Gray
            Matte_Gray_TOP_MESH = gltf.scene.getObjectByName("Beats_Studio_3001", true);
            let Matte_Gray_TOP_MATERIAL = new THREE.MeshStandardMaterial();
            Matte_Gray_TOP_MATERIAL.color = new THREE.Color( 0x434343 );
            Matte_Gray_TOP_MATERIAL.metalness = 0.55;
            Matte_Gray_TOP_MATERIAL.roughness = 0.7;
            Matte_Gray_TOP_MATERIAL.envMap = environnementMapTexture;
            Matte_Gray_TOP_MESH.material = Matte_Gray_TOP_MATERIAL;

            // 2 = Gloss_Gold
            Gloss_Gold_TOP_MESH = gltf.scene.getObjectByName("Beats_Studio_3001_1", true);
            let Gloss_Gold_TOP_MATERIAL = new THREE.MeshStandardMaterial();
            Gloss_Gold_TOP_MATERIAL.color = new THREE.Color( 0xebd69a );
            Gloss_Gold_TOP_MATERIAL.metalness = 0.8;
            Gloss_Gold_TOP_MATERIAL.roughness = 0;
            Gloss_Gold_TOP_MATERIAL.envMap = environnementMapTexture;
            Gloss_Gold_TOP_MESH.material = Gloss_Gold_TOP_MATERIAL;

            // 3 = Matte_Gold
            Matte_Gold_TOP_MESH = gltf.scene.getObjectByName("Beats_Studio_3001_2", true);
            let Matte_Gold_TOP_MATERIAL = new THREE.MeshStandardMaterial();
            Matte_Gold_TOP_MATERIAL.color = new THREE.Color( 0xc08656 );
            Matte_Gold_TOP_MATERIAL.aoMapIntensity = 0.3;
            Matte_Gold_TOP_MATERIAL.roughness = 0.8;
            Matte_Gold_TOP_MATERIAL.envMap = environnementMapTexture;
            Matte_Gold_TOP_MESH.material = Matte_Gold_TOP_MATERIAL;
        },
        
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        
        function ( error ) {
            console.log('An error happened');
        }
    );
}

const Headphone_RIGHT_GROUP = new THREE.Group();
Headphone_RIGHT_GROUP.position.x = 2.75119;
Headphone_RIGHT_GROUP.position.z = -0.00743;
Headphone_RIGHT_GROUP.position.y = 5;
Headphone_GROUP.add(Headphone_RIGHT_GROUP);

let Headphone_RIGHT_MESH = new THREE.Object3D;

let Matte_Gray_RIGHT_MESH = new THREE.Object3D;
let Gloss_Gold_RIGHT_MESH = new THREE.Object3D;
let Light_RIGHT_MESH = new THREE.Object3D;
let Matte_Gold_RIGHT_MESH = new THREE.Object3D;
let Leather_RIGHT_MESH = new THREE.Object3D;
let Fabric_RIGHT_MESH = new THREE.Object3D;
let Chrome_RIGHT_MESH = new THREE.Object3D;
let Matte_Black_RIGHT_MESH = new THREE.Object3D;

const Leather_NORMAL_MAP = textureLoader.load('/img/textures/Beat_Studio_3/substance/Beats_Studio_3_Leather_Normal.png');
Leather_NORMAL_MAP.flipY = false;

const loadHeadphoneRightMesh = function () {
    console.log("------------------------------------> START headphone loader");

    loader.load(
        'gltf/Beats_Studio_3_RIGHT.gltf',
        function (gltf) {
            scene.add(gltf.scene);
            Headphone_RIGHT_MESH = gltf.scene;
            Headphone_RIGHT_MESH.traverse(function(child) {
                console.log(child);
            });
            Headphone_RIGHT_MESH.position.x = -2.75119;
            Headphone_RIGHT_MESH.position.z = 0.00743;
            Headphone_RIGHT_MESH.position.y = -5;
            Headphone_RIGHT_GROUP.add(Headphone_RIGHT_MESH);

            // 1 = Matte_Gray
            Matte_Gray_RIGHT_MESH = gltf.scene.getObjectByName("Beats_Studio_3003", true);
            let Matte_Gray_RIGHT_MATERIAL = new THREE.MeshStandardMaterial();
            Matte_Gray_RIGHT_MATERIAL.color = new THREE.Color( 0x434343 );
            Matte_Gray_RIGHT_MATERIAL.metalness = 0.55;
            Matte_Gray_RIGHT_MATERIAL.roughness = 0.7;
            Matte_Gray_RIGHT_MATERIAL.envMap = environnementMapTexture;
            Matte_Gray_RIGHT_MESH.material = Matte_Gray_RIGHT_MATERIAL;

            // 2 = Gloss_Gold
            Gloss_Gold_RIGHT_MESH = gltf.scene.getObjectByName("Beats_Studio_3003_1", true);
            let Gloss_Gold_RIGHT_MATERIAL = new THREE.MeshStandardMaterial();
            Gloss_Gold_RIGHT_MATERIAL.color = new THREE.Color( 0xebd69a );
            Gloss_Gold_RIGHT_MATERIAL.metalness = 0.8;
            Gloss_Gold_RIGHT_MATERIAL.roughness = 0;
            Gloss_Gold_RIGHT_MATERIAL.envMap = environnementMapTexture;
            Gloss_Gold_RIGHT_MESH.material = Gloss_Gold_RIGHT_MATERIAL;

            // 3 = Light
            Light_RIGHT_MESH = gltf.scene.getObjectByName("Beats_Studio_3003_2", true);
            let Light_RIGHT_MATERIAL = new THREE.MeshStandardMaterial();
            Light_RIGHT_MATERIAL.color = new THREE.Color( 0xFFFFFF );
            Light_RIGHT_MATERIAL.emissive = new THREE.Color( 0xFFFFFF );
            Light_RIGHT_MATERIAL.emissiveIntensity = 10;
            Light_RIGHT_MATERIAL.envMap = environnementMapTexture;
            Light_RIGHT_MESH.material = Light_RIGHT_MATERIAL;

            // 4 = Matte_Gold
            Matte_Gold_RIGHT_MESH = gltf.scene.getObjectByName("Beats_Studio_3003_3", true);
            let Matte_Gold_RIGHT_MATERIAL = new THREE.MeshStandardMaterial();
            Matte_Gold_RIGHT_MATERIAL.color = new THREE.Color( 0xc08656 );
            Matte_Gold_RIGHT_MATERIAL.roughness = 0.8;
            Matte_Gold_RIGHT_MATERIAL.envMap = environnementMapTexture;
            Matte_Gold_RIGHT_MESH.material = Matte_Gold_RIGHT_MATERIAL;

            // 5 = Leather
            Leather_RIGHT_MESH = gltf.scene.getObjectByName("Beats_Studio_3003_4", true);
            let Leather_RIGHT_MATERIAL = new THREE.MeshStandardMaterial();
            Leather_RIGHT_MATERIAL.color = new THREE.Color( 0x3c3c3c );
            Leather_RIGHT_MATERIAL.metalness = 0;
            Leather_RIGHT_MATERIAL.roughness = 0.6;
            Leather_RIGHT_MATERIAL.normalMap = Leather_NORMAL_MAP;
            Leather_RIGHT_MATERIAL.envMap = environnementMapTexture;
            Leather_RIGHT_MESH.material = Leather_RIGHT_MATERIAL;

            // 6 = Fabric
            Fabric_RIGHT_MESH = gltf.scene.getObjectByName("Beats_Studio_3003_5", true);
            let Fabric_RIGHT_MATERIAL = new THREE.MeshStandardMaterial();
            Fabric_RIGHT_MATERIAL.color = new THREE.Color( 0x282828 );
            Fabric_RIGHT_MATERIAL.metalness = 0;
            Fabric_RIGHT_MATERIAL.roughness = 0.75;
            Fabric_RIGHT_MATERIAL.envMap = environnementMapTexture;
            Fabric_RIGHT_MESH.material = Fabric_RIGHT_MATERIAL;

            // 7 = Chrome
            Chrome_RIGHT_MESH = gltf.scene.getObjectByName("Beats_Studio_3003_6", true);
            let Chrome_RIGHT_MATERIAL = new THREE.MeshStandardMaterial();
            Chrome_RIGHT_MATERIAL.color = new THREE.Color( 0x000000 );
            Chrome_RIGHT_MATERIAL.metalness = 0.85;
            Chrome_RIGHT_MATERIAL.roughness = 0;
            Chrome_RIGHT_MATERIAL.envMap = environnementMapTexture;
            Chrome_RIGHT_MESH.material = Chrome_RIGHT_MATERIAL;

            // 8 = Matte_Black
            Matte_Black_RIGHT_MESH = gltf.scene.getObjectByName("Beats_Studio_3003_7", true);
            let Matte_Black_RIGHT_MATERIAL = new THREE.MeshStandardMaterial();
            Matte_Black_RIGHT_MATERIAL.color = new THREE.Color( 0x000000 );
            Matte_Black_RIGHT_MATERIAL.metalness = 0;
            Matte_Black_RIGHT_MATERIAL.roughness = 1;
            Matte_Black_RIGHT_MATERIAL.envMap = environnementMapTexture;
            Matte_Black_RIGHT_MESH.material = Matte_Black_RIGHT_MATERIAL;
        },
        
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        
        function ( error ) {
            console.log('An error happened');
        }
    );
}

const Headphone_LEFT_GROUP = new THREE.Group();
Headphone_LEFT_GROUP.position.x = -2.75119;
Headphone_LEFT_GROUP.position.z = -0.00743;
Headphone_LEFT_GROUP.position.y = 5;
Headphone_GROUP.add(Headphone_LEFT_GROUP);

let Headphone_LEFT_MESH = new THREE.Object3D;

let Matte_Gray_LEFT_MESH = new THREE.Object3D;
let Gloss_Gold_LEFT_MESH = new THREE.Object3D;
let Light_LEFT_MESH = new THREE.Object3D;
let Matte_Gold_LEFT_MESH = new THREE.Object3D;
let Leather_LEFT_MESH = new THREE.Object3D;
let Fabric_LEFT_MESH = new THREE.Object3D;
let Chrome_LEFT_MESH = new THREE.Object3D;
let Matte_Black_LEFT_MESH = new THREE.Object3D;

const loadHeadphoneLeftMesh = function () {
    console.log("------------------------------------> START headphone loader");

    loader.load(
        'gltf/Beats_Studio_3_LEFT.gltf',
        function (gltf) {
            scene.add(gltf.scene);
            Headphone_LEFT_MESH = gltf.scene;
            Headphone_LEFT_MESH.traverse(function(child) {
                console.log(child);
            });
            Headphone_LEFT_MESH.position.x = 2.75119;
            Headphone_LEFT_MESH.position.z = 0.00743;
            Headphone_LEFT_MESH.position.y = -5;
            Headphone_LEFT_GROUP.add(Headphone_LEFT_MESH);

            // 1 = Matte_Gray
            Matte_Gray_LEFT_MESH = gltf.scene.getObjectByName("Beats_Studio_3002", true);
            let Matte_Gray_LEFT_MATERIAL = new THREE.MeshStandardMaterial();
            Matte_Gray_LEFT_MATERIAL.color = new THREE.Color( 0x434343 );
            Matte_Gray_LEFT_MATERIAL.metalness = 0.55;
            Matte_Gray_LEFT_MATERIAL.roughness = 0.7;
            Matte_Gray_LEFT_MATERIAL.envMap = environnementMapTexture;
            Matte_Gray_LEFT_MESH.material = Matte_Gray_LEFT_MATERIAL;

            // 2 = Gloss_Gold
            Gloss_Gold_LEFT_MESH = gltf.scene.getObjectByName("Beats_Studio_3002_1", true);
            let Gloss_Gold_LEFT_MATERIAL = new THREE.MeshStandardMaterial();
            Gloss_Gold_LEFT_MATERIAL.color = new THREE.Color( 0xebd69a );
            Gloss_Gold_LEFT_MATERIAL.metalness = 0.8;
            Gloss_Gold_LEFT_MATERIAL.roughness = 0;
            Gloss_Gold_LEFT_MATERIAL.envMap = environnementMapTexture;
            Gloss_Gold_LEFT_MESH.material = Gloss_Gold_LEFT_MATERIAL;

            // 3 = Light
            Light_LEFT_MESH = gltf.scene.getObjectByName("Beats_Studio_3002_2", true);
            let Light_LEFT_MATERIAL = new THREE.MeshStandardMaterial();
            Light_LEFT_MATERIAL.color = new THREE.Color( 0xFFFFFF );
            Light_LEFT_MATERIAL.emissive = new THREE.Color( 0xFFFFFF );
            Light_LEFT_MATERIAL.emissiveIntensity = 10;
            Light_LEFT_MATERIAL.envMap = environnementMapTexture;
            Light_LEFT_MESH.material = Light_LEFT_MATERIAL;

            // 4 = Matte_Gold
            Matte_Gold_LEFT_MESH = gltf.scene.getObjectByName("Beats_Studio_3002_3", true);
            let Matte_Gold_LEFT_MATERIAL = new THREE.MeshStandardMaterial();
            Matte_Gold_LEFT_MATERIAL.color = new THREE.Color( 0xc08656 );
            Matte_Gold_LEFT_MATERIAL.roughness = 0.8;
            Matte_Gold_LEFT_MATERIAL.envMap = environnementMapTexture;
            Matte_Gold_LEFT_MESH.material = Matte_Gold_LEFT_MATERIAL;

            // 5 = Leather
            Leather_LEFT_MESH = gltf.scene.getObjectByName("Beats_Studio_3002_4", true);
            let Leather_LEFT_MATERIAL = new THREE.MeshStandardMaterial();
            Leather_LEFT_MATERIAL.color = new THREE.Color( 0x3c3c3c );
            Leather_LEFT_MATERIAL.metalness = 0;
            Leather_LEFT_MATERIAL.roughness = 0.6;
            Leather_LEFT_MATERIAL.normalMap = Leather_NORMAL_MAP;
            Leather_LEFT_MATERIAL.envMap = environnementMapTexture;
            Leather_LEFT_MESH.material = Leather_LEFT_MATERIAL;

            // 6 = Fabric
            Fabric_LEFT_MESH = gltf.scene.getObjectByName("Beats_Studio_3002_5", true);
            let Fabric_LEFT_MATERIAL = new THREE.MeshStandardMaterial();
            Fabric_LEFT_MATERIAL.color = new THREE.Color( 0x282828 );
            Fabric_LEFT_MATERIAL.metalness = 0;
            Fabric_LEFT_MATERIAL.roughness = 0.75;
            Fabric_LEFT_MATERIAL.envMap = environnementMapTexture;
            Fabric_LEFT_MESH.material = Fabric_LEFT_MATERIAL;

            // 7 = Chrome
            Chrome_LEFT_MESH = gltf.scene.getObjectByName("Beats_Studio_3002_6", true);
            let Chrome_LEFT_MATERIAL = new THREE.MeshStandardMaterial();
            Chrome_LEFT_MATERIAL.color = new THREE.Color( 0x000000 );
            Chrome_LEFT_MATERIAL.metalness = 0.85;
            Chrome_LEFT_MATERIAL.roughness = 0;
            Chrome_LEFT_MATERIAL.envMap = environnementMapTexture;
            Chrome_LEFT_MESH.material = Chrome_LEFT_MATERIAL;

            // 8 = Matte_Black
            Matte_Black_LEFT_MESH = gltf.scene.getObjectByName("Beats_Studio_3002_7", true);
            let Matte_Black_LEFT_MATERIAL = new THREE.MeshStandardMaterial();
            Matte_Black_LEFT_MATERIAL.color = new THREE.Color( 0x000000 );
            Matte_Black_LEFT_MATERIAL.metalness = 0;
            Matte_Black_LEFT_MATERIAL.roughness = 1;
            Matte_Black_LEFT_MATERIAL.envMap = environnementMapTexture;
            Matte_Black_LEFT_MESH.material = Matte_Black_LEFT_MATERIAL;
        },
        
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        
        function ( error ) {
            console.log('An error happened');
        }
    );
}

const headphone_ground_GEOMETRY = new THREE.PlaneGeometry(20, 20);
const headphone_ground_MATERIAL = new THREE.MeshBasicMaterial( {color: 0x000000, transparent: false, alphaMap: headphone_ground_ALPHA_MAP} );
const headphone_GROUND = new THREE.Mesh(headphone_ground_GEOMETRY, headphone_ground_MATERIAL);
headphone_GROUND.rotation.x = - Math.PI / 2;

Headphone_GROUP.add(headphone_GROUND);
Headphone_GROUP.activeItem = false;
Headphone_GROUP.visible = false;
Headphone_GROUP.positionItem = 3;

// EVENTS MENU LEFT

const span_category_televisions_ELEMENT = document.querySelector('#span_category_televisions');
span_category_televisions_ELEMENT.addEventListener('click', () => {
    console.log("------------------------------------> Television_GROUP.activeItem : " + Television_GROUP.activeItem);
    console.log("------------------------------------> Phone_GROUP.activeItem : " + Phone_GROUP.activeItem);
    console.log("------------------------------------> Headphone_GROUP.activeItem : " + Headphone_GROUP.activeItem);
    let PreviewItemDatas = setActiveItemFalse();
    Television_GROUP.visible = true;
    Television_GROUP.activeItem = true;
    let positionNextItem = Television_GROUP.positionItem;
    let positionXNextItem = setPositionXNextItem(PreviewItemDatas, positionNextItem);
    Television_GROUP.position.x = positionXNextItem;
    gsap.to(controls.target, {duration: 2, x: positionXNextItem});
    gsap.to(cameraTarget_MESH.position, {duration: 2, x: positionXNextItem});
    gsap.to(camera.position, {duration: 2, x: positionXNextItem});
    gsap.to(camera.position, {duration: 2, y: 10});
    gsap.to(camera.position, {duration: 2, z: 20});
});

const span_category_phones_ELEMENT = document.querySelector('#span_category_phones');
span_category_phones_ELEMENT.addEventListener('click', () => {
    console.log("------------------------------------> Television_GROUP.activeItem : " + Television_GROUP.activeItem);
    console.log("------------------------------------> Phone_GROUP.activeItem : " + Phone_GROUP.activeItem);
    console.log("------------------------------------> Headphone_GROUP.activeItem : " + Headphone_GROUP.activeItem);
    let PreviewItemDatas = setActiveItemFalse();
    Phone_GROUP.visible = true;
    Phone_GROUP.activeItem = true;
    let positionNextItem = Phone_GROUP.positionItem;
    let positionXNextItem = setPositionXNextItem(PreviewItemDatas, positionNextItem);
    Phone_GROUP.position.x = positionXNextItem;
    gsap.to(controls.target, {duration: 2, x: positionXNextItem});
    gsap.to(cameraTarget_MESH.position, {duration: 2, x: positionXNextItem});
    gsap.to(camera.position, {duration: 2, x: positionXNextItem});
    gsap.to(camera.position, {duration: 2, y: 10});
    gsap.to(camera.position, {duration: 2, z: 20});
});

const span_category_headphones_ELEMENT = document.querySelector('#span_category_headphones');
span_category_headphones_ELEMENT.addEventListener('click', () => {
    console.log("------------------------------------> Television_GROUP.activeItem : " + Television_GROUP.activeItem);
    console.log("------------------------------------> Phone_GROUP.activeItem : " + Phone_GROUP.activeItem);
    console.log("------------------------------------> Headphone_GROUP.activeItem : " + Headphone_GROUP.activeItem);
    let PreviewItemDatas = setActiveItemFalse();
    Headphone_GROUP.visible = true;
    Headphone_GROUP.activeItem = true;
    let positionNextItem = Headphone_GROUP.positionItem;
    let positionXNextItem = setPositionXNextItem(PreviewItemDatas, positionNextItem);
    Headphone_GROUP.position.x = positionXNextItem;
    gsap.to(controls.target, {duration: 2, x: positionXNextItem});
    gsap.to(cameraTarget_MESH.position, {duration: 2, x: positionXNextItem});
    gsap.to(camera.position, {duration: 2, x: positionXNextItem});
    gsap.to(camera.position, {duration: 2, y: 10});
    gsap.to(camera.position, {duration: 2, z: 20});
});

const setActiveItemFalse = function() {
    let positionItem;
    let positionX;
    if (Television_GROUP.activeItem == true) {
        positionItem = Television_GROUP.positionItem;
        positionX = Television_GROUP.position.x;
        Television_GROUP.activeItem = false;
        gsap.delayedCall(2, () => {
            Television_GROUP.visible = false;
        });
    } else if (Phone_GROUP.activeItem == true) {
        positionItem = Phone_GROUP.positionItem;
        positionX = Phone_GROUP.position.x;
        Phone_GROUP.activeItem = false;
        gsap.delayedCall(2, () => {
            Phone_GROUP.visible = false;
        });
    } else {
        positionItem = Headphone_GROUP.positionItem;
        positionX = Headphone_GROUP.position.x;
        Headphone_GROUP.activeItem = false;
        gsap.delayedCall(2, () => {
            Headphone_GROUP.visible = false;
        });
    }
    const PreviewItemDatas = {
        positionItem: positionItem,
        positionX: positionX
    };
    return PreviewItemDatas;
}

const setPositionXNextItem = function(PreviewItemDatas, positionNextItem) {
    console.log("------------------------------------> positionPreviewItem : " + PreviewItemDatas.positionItem);
    console.log("------------------------------------> positionNextItem : " + positionNextItem);
    let positionXNextItem;
    if(PreviewItemDatas.positionItem < positionNextItem) {
        positionXNextItem = PreviewItemDatas.positionX += 20;
    } else {
        positionXNextItem = PreviewItemDatas.positionX -= 20;
    }
    return positionXNextItem;
};

// ANIMATE
const animate = function () {
    requestAnimationFrame( animate );

    Television_GROUP.rotation.y += televisionGroup_ROTATION_Y;

    camera.lookAt(cameraTarget_MESH.position.x, cameraTarget_MESH.position.y, cameraTarget_MESH.position.z);

    raycaster.setFromCamera(mousePosition_THREE, camera);

    if (Phone_GROUP.activeItem == true) {
        const objectsToTest = [
            Body_black_MESH,
            Antenna_black_MESH,
            Black_MESH,
            Glass_matte_MESH,
            Glass_MESH,
            Front_MESH,
            Black_back_MESH,
            Steel_black_MESH,
            Screen12Pro_black_MESH,
            Plastik_black_MESH,
            Plastik_cam_MESH,
            Glass_cam_MESH,
            Light_yellow_MESH,
            Light_orange_MESH,
            Rubber_black_MESH,
            Glass_flash_MESH,
            Gold_MESH
        ];
        const intersects = raycaster.intersectObjects(objectsToTest);

        if(intersects.length > 0) {
            isIntersecting = true;
            console.log(isIntersecting);
        } else {
            isIntersecting = false;
            console.log(isIntersecting);
        }
    }
    renderer.render( scene, camera );
};

// RESIZE
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

animate();