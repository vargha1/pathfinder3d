import * as T from "three"
import gsap from "gsap";
import { OrbitControls, TextGeometry, FontLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';;
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { TextureLoader } from "three";
import RajdHani from "./RajdHani.json"

const font2 = new FontLoader().parse(RajdHani)
const scene = new T.Scene();
const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const loader = new GLTFLoader().setPath("/model/");
const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
const controls = new OrbitControls(camera, renderer.domElement)
// controls.enablePan = false
// controls.minPolarAngle = 1;
// controls.maxPolarAngle = 1.5;
controls.minDistance = 0;
controls.maxDistance = 1800;
controls.rotateSpeed = 0.5;
controls.update()

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// renderer.toneMapping = T.CineonToneMapping
// renderer.toneMappingExposure = 1.5
// renderer.outputColorSpace = T.SRGBColorSpace
renderer.domElement.classList.add("absolute")

var click = new Audio('Sounds/click.mp3');
var whoosh = new Audio("Sounds/whoosh.mp3")
var ding = new Audio("Sounds/ding.mp3")
const audio = document.querySelector("audio");
const darkMaterial = new T.MeshBasicMaterial({ color: 'black' });
const materials = {};

camera.position.set(230, 230, 500)

// let elem = document.createElement('div');
// elem.className = "flex absolute h-[100dvh] items-center justify-center md:left-[20%] md:right-[20%] left-0 right-0"
// elem.id = "wrapper"
// elem.innerHTML = `
//     <div
//       class="flex md:flex-row flex-col relative bg-[#1d1f39] z-[26] h-fit rounded-[20px] flex-wrap transition-all duration-300"
//       id="popframe">
//       <form onsubmit="start()" class="flex flex-col px-5 py-1 justify-center items-center md:text-[16px] text-[10px] w-full">
//         <label class="py-2 text-white" for="name">Name of CoffeeShop</label>
//         <input type="text" name="name" class="px-2 py-1 border-zinc-500 border-2 rounded-[5px] text-black" id="name" maxlength="11" required>
//         <button
//           class="text-[40px] text-white hover:text-violet-600" type="submit">
//           Start</button>
//       </form>
//     </div>
//     `
// document.getElementById("startSection").appendChild(elem)

// event.preventDefault();
// const textGeometry = new TextGeometry(event.target[0].value, {
//     font: font2,
//     size: 3,
//     depth: 0.6,
// });
// textGeometry.computeBoundingBox();
// const textMat2 = new T.MeshStandardMaterial({ color: 0xffff00 })
// const textMesh2 = new T.Mesh(textGeometry, textMat2)
// textMesh2.position.set(11, 14, 10)
// textMesh2.rotation.y = 1.55

// scene.add(textMesh2)
audio.setAttribute('src', "CityCrowd.mp3")
// audio.play()
const textGeometry2 = new TextGeometry("You're Here", {
  font: font2,
  size: 5,
  depth: 0.6,
});
textGeometry2.computeBoundingBox();
// const textGeometry5 = new TextGeometry("About US", {
//     font: font2,
//     size: 22.5,
//     depth: 0.6,
// });
// const textGeometry6 = new TextGeometry("Contact US", {
//     font: font2,
//     size: 22.5,
//     depth: 0.6,
// });
textGeometry2.computeBoundingBox();
const textMat = new T.MeshStandardMaterial({ color: 0xff0000 })
const textMesh = new T.Mesh(textGeometry2, textMat)
// const textMesh2 = new T.Mesh(textGeometry3, textMat)
textMesh.position.set(6, 2, 83)
textMesh.rotation.z = 3.15;
textMesh.rotation.y = 3.15;
textMesh.rotation.x = 1.55;
scene.add(textMesh)
// const textMesh2 = new T.Mesh(textGeometry3, textMat)
// textMesh2.rotation.y = 3.13;
// textMesh2.rotation.x = 1.55;
// textMesh2.position.z = -350;
// textMesh2.position.x = 0;
// textMesh2.name = "start"
// const textMesh3 = new T.Mesh(textGeometry4, textMat)
// textMesh3.rotation.y = 3.13;
// textMesh3.rotation.x = 1.55;
// textMesh3.position.z = -350;
// textMesh3.position.x = 40;
// textMesh3.name = "clickCount"
// const textMesh4 = new T.Mesh(textGeometry5, textMat)
// textMesh4.rotation.y = 3.13;
// textMesh4.rotation.x = 1.55;
// textMesh4.position.z = -350;
// textMesh4.position.x = -80;
// const textMesh5 = new T.Mesh(textGeometry6, textMat)
// textMesh5.rotation.y = 3.13;
// textMesh5.rotation.x = 1.55;
// textMesh5.position.z = -350;
// textMesh5.position.x = -180;

// scene.add(textMesh2)
// scene.add(textMesh3)
// scene.add(textMesh4)
// scene.add(textMesh5)
gsap.to(camera.position, {
  x: 0,
  y: 90,
  z: 250,
  duration: 6,
  ease: "expo.inOut",
  onStart: () => controls.enabled = false,
  onComplete: () => controls.enabled = true,
},)
gsap.to(controls.target, {
  x: 0,
  y: 13,
  z: 0,
  duration: 6,
  ease: "expo.inOut",
  onStart: () => controls.enabled = false,
  onComplete: () => controls.enabled = true,
  onUpdate: function () {
    controls.update()
  }
})
document.getElementById("canvasHolder").appendChild(renderer.domElement);
// click.play()
// whoosh.play()
// window.setTimeout(() => { ding.play() }, 1000)
// window.setInterval(() => {
//   scene.traverseVisible(obj => {
//     if (obj.name == "rain") {
//       gsap.to(obj.position, {
//         y: 0,
//         duration: 2,
//         ease: "none",
//       })
//     }
//   })
//   scene.traverseVisible(obj => {
//     if (obj.name == "rain") {
//       const [y] = Array(1).fill().map(() => T.MathUtils.randFloatSpread(45))
//       obj.position.y = 40 + y
//     }
//   })
// }, 2005);
// let count = 0;
// window.handleClicker = () => {
//   scene.children.forEach(obj => {
//     if (obj.name == "clickCount") {
//       scene.remove(obj);
//     }
//   })
//   // let count = localStorage.getItem("clickCount");
//   count++
//   // localStorage.setItem("clickCount", count)
//   const textGeometry4 = new TextGeometry(count.toString(), {
//     font: font2,
//     size: 22.5,
//     depth: 0.6,
//   });
//   const textMat = new T.MeshStandardMaterial({ color: 0xffffff })
//   const textMesh3 = new T.Mesh(textGeometry4, textMat)
//   textMesh3.rotation.y = 3.13;
//   textMesh3.rotation.x = 1.55;
//   textMesh3.position.z = -350;
//   textMesh3.position.x = 40;
//   textMesh3.name = "clickCount";
//   scene.add(textMesh3)
//   document.getElementById('player').stop()
//   document.getElementById('player').play()
// }

let mixer, clock;
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
  finalComposer.setSize(window.innerWidth, window.innerHeight);
});

loader.load("citycentremirdif_Gltf.gltf", function (gltf) {
  var mesh = gltf.scene;
  // mesh.scale.set(0.2, 0.2, 0.2);
  // const planeGeo = new T.PlaneGeometry(450, 450)
  // const reflector = new Reflector(planeGeo, {
  //     clipBias: 0.003,
  //     textureWidth: window.innerWidth * window.devicePixelRatio,
  //     textureHeight: window.innerHeight * window.devicePixelRatio,
  //     color: 0x777777
  // });

  // console.log(mesh);
  // // reflector.position.y = 1
  // reflector.rotation.x = - Math.PI / 2;
  // scene.add(reflector);
  mesh.position.set(0, 1, 0);
  mixer = new T.AnimationMixer(mesh);
  gltf.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });
  clock = new T.Clock()
  animate()
  scene.add(mesh)
  loading()
})

loader.setPath("/gps-model/")

loader.load("scene.gltf", function (gltf) {
  var mesh = gltf.scene;
  mesh.scale.set(10, 10, 10);
  // console.log(mesh);
  // // reflector.position.y = 1
  // reflector.rotation.x = - Math.PI / 2;
  // scene.add(reflector);
  mesh.position.set(0, 4000, 0);
  mixer = new T.AnimationMixer(mesh);
  gltf.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });
  clock = new T.Clock()
  animate()
  scene.add(mesh)
})

// let points2
// loader.setPath("./TextModels/")
// loader.load("Text.gltf", function (gltf) {
//     const mesh = gltf.scene
//     mesh.rotation.y = 1.6
//     mesh.position.x = 90
//     mesh.scale.set(0.55, 0.55, 0.55)
//     console.log(mesh);
//     for (let i = 0; i < mesh.children.length; i++) {
//         const geo5 = mesh.children[i].children[0].geometry;
//         const posAtr = geo5.attributes.position;
//         const positions = posAtr.array; // Directly access the array
//         const vertices = [];

//         for (let i = 0; i < posAtr.count; i++) {
//             vertices.push({
//                 x: posAtr.getX(i),
//                 y: posAtr.getY(i),
//                 z: posAtr.getZ(i)
//             });
//         }

//         const pointGeometry = new T.BufferGeometry();
//         pointGeometry.setAttribute('position', new T.Float32BufferAttribute(positions, 3));
//         const pointMaterial = new T.PointsMaterial({ color: 0xffffff, size: 0.05 });
//         points2 = new T.Points(pointGeometry, pointMaterial);
//         points2.scale.set(3, 3, 3)
//         points2.position.set(-80, 0, -250)
//         points2.rotation.y = 3.15
//         points2.layers.toggle(BLOOM_SCENE)
//         points2.name = "points" + (i + 1)
//         scene.add(points2);
//     }
// })

const BLOOM_SCENE = 1;
const bloomLayer = new T.Layers();
bloomLayer.set(BLOOM_SCENE);

const renderScene = new RenderPass(scene, camera);
const outputPass = new OutputPass();

const bloomPass = new UnrealBloomPass(new T.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0
bloomPass.strength = 0.5
bloomPass.radius = 0.2

const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const mixPass = new ShaderPass(
  new T.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture }
    },
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
  }), 'baseTexture'
);
mixPass.needsSwap = true;

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(mixPass);
finalComposer.addPass(outputPass);

renderer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
finalComposer.setSize(window.innerWidth, window.innerHeight);

camera.add(new T.DirectionalLight(0xffffff, 10))
scene.add(camera)
const pl = new T.PointLight(0xffffff, 50000000)
pl.position.set(0, 2000, 0)
// scene.add(pl)


const raycaster = new T.Raycaster()

window.addEventListener('pointerdown', onMouseDown)
let prevColor = "";
function onMouseDown(event) {
  camera.updateProjectionMatrix()
  controls.update()
  const coords = new T.Vector2(
    (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
  )
  raycaster.setFromCamera(coords, camera)

  let intersections = raycaster.intersectObjects(scene.children, true);
  if (intersections.length > 0) {
    console.log(intersections[0].object);
    // intersections[0].object.layers.toggle(BLOOM_SCENE)
    // if (intersections[0].object.name == "Menu") {
    //     gsap.to(camera.position, {
    //         x: -350,
    //         y: 110,
    //         z: 20,
    //         duration: 6,
    //         ease: "expo.inOut",
    //         onStart: () => controls.enabled = false,
    //         onComplete: () => controls.enabled = true,
    //     },)
    //     gsap.to(controls.target, {
    //         x: -400,
    //         y: 0,
    //         z: 0,
    //         duration: 6,
    //         ease: "expo.inOut",
    //         onStart: () => controls.enabled = false,
    //         onComplete: () => controls.enabled = true,
    //         onUpdate: function () {
    //             controls.update()
    //         }
    //     })
    // }
    if (intersections[0].object.name != "polySurface188PIV" && intersections[0].object.name != "CP8PIV" && intersections[0].object.name != "polySurface15PIV" && intersections[0].object.name != "polySurface12PIV" && intersections[0].object.name != "polySurface60PIV" && intersections[0].object.name != "polySurface98PIV" && intersections[0].object.name != "polySurface54PIV" && intersections[0].object.name != "polySurface158PIV" && intersections[0].object.name != "polySurface1PIV" && intersections[0].object.name != "polySurface3PIV" && intersections[0].object.name != "polySurface7PIV" && intersections[0].object.name != "polySurface200PIV" && intersections[0].object.name != "polySurface201PIV" && intersections[0].object.name != "polySurface187PIV" && intersections[0].object.name != "polySurface20PIV" && intersections[0].object.name != "polySurface23PIV" && intersections[0].object.name != "polySurface59PIV" && intersections[0].object.name != "polySurface181PIV" && intersections[0].object.name != "polySurface61PIV" && intersections[0].object.name != "polySurface194PIV" && intersections[0].object.name != "polySurface198PIV" && intersections[0].object.name != "polySurface48PIV" && intersections[0].object.name != "polySurface174PIV" && intersections[0].object.name != "polySurface91PIV" && intersections[0].object.name != "polySurface126PIV" && intersections[0].object.name != "polySurface120PIV" && intersections[0].object.name != "polySurface95PIV" && intersections[0].object.name != "polySurface148PIV" && intersections[0].object.name != "polySurface82PIV" && intersections[0].object.name != "polySurface38PIV" && intersections[0].object.name != "polySurface88PIV" && intersections[0].object.name != "polySurface89PIV" && intersections[0].object.name != "polySurface145PIV" && intersections[0].object.name != "polySurface184PIV" && intersections[0].object.name != "polySurface197PIV" && intersections[0].object.name != "polySurface128PIV" && intersections[0].object.name != "polySurface96PIV" && intersections[0].object.name != "polySurface201PIV" && intersections[0].object.name != "polySurface133PIV" && intersections[0].object.name != "polySurface51PIV" && intersections[0].object.name != "polySurface123PIV" && intersections[0].object.name != "polySurface42PIV" && intersections[0].object.name != "polySurface76PIV" && intersections[0].object.name != "polySurface94PIV" && intersections[0].object.name != "polySurface24PIV" && intersections[0].object.name != "polySurface35PIV" && intersections[0].object.name != "polySurface193PIV" && intersections[0].object.name != "polySurface169PIV" && intersections[0].object.name != "polySurface68PIV" && intersections[0].object.name != "polySurface131PIV" && intersections[0].object.name != "polySurface153PIV" && intersections[0].object.name != "polySurface78PIV" && intersections[0].object.name != "polySurface97PIV" && intersections[0].object.name != "polySurface130PIV" && intersections[0].object.name != "polySurface152PIV" && intersections[0].object.name != "polySurface109PIV" && intersections[0].object.name != "polySurface47PIV" && intersections[0].object.name != "polySurface154PIV" && intersections[0].object.name != "polySurface119PIV" && intersections[0].object.name != "polySurface106PIV" && intersections[0].object.name != "polySurface137PIV" && intersections[0].object.name != "polySurface65PIV" && intersections[0].object.name != "polySurface155PIV" && intersections[0].object.name != "polySurface40PIV" && intersections[0].object.name != "polySurface57PIV" && intersections[0].object.name != "polySurface2PIV" && intersections[0].object.name != "polySurface13PIV" && intersections[0].object.name != "polySurface17PIV" && intersections[0].object.name != "polySurface178PIV" && intersections[0].object.name != "polySurface16PIV" && intersections[0].object.name != "polySurface21PIV" && intersections[0].object.name != "polySurface111PIV" && intersections[0].object.name != "polySurface41PIV" && intersections[0].object.name != "polySurface116PIV" && intersections[0].object.name != "polySurface39PIV" && intersections[0].object.name != "polySurface134PIV" && intersections[0].object.name != "polySurface199PIV" && intersections[0].object.name != "polySurface164PIV" && intersections[0].object.name != "polySurface70PIV" && intersections[0].object.name != "polySurface31PIV" && intersections[0].object.name != "polySurface6PIV" && intersections[0].object.name != "polySurface11PIV" && intersections[0].object.name != "polySurface196PIV" && intersections[0].object.name != "polySurface36PIV" && intersections[0].object.name != "polySurface58PIV" && intersections[0].object.name != "polySurface93PIV" && intersections[0].object.name != "polySurface27PIV" && intersections[0].object.name != "polySurface53PIV" && intersections[0].object.name != "polySurface81PIV" && intersections[0].object.name != "polySurface165PIV" && intersections[0].object.name != "polySurface101PIV" && intersections[0].object.name != "polySurface105PIV" && intersections[0].object.name != "polySurface171PIV" && intersections[0].object.name != "polySurface99PIV" && intersections[0].object.name != "polySurface62PIV" && intersections[0].object.name != "polySurface118PIV" && intersections[0].object.name != "polySurface170PIV" && intersections[0].object.name != "polySurface125PIV" && intersections[0].object.name != "polySurface151PIV" && intersections[0].object.name != "polySurface52PIV" && intersections[0].object.name != "polySurface71PIV" && intersections[0].object.name != "polySurface156PIV" && intersections[0].object.name != "polySurface55PIV" && intersections[0].object.name != "polySurface67PIV" && intersections[0].object.name != "polySurface26PIV" && intersections[0].object.name != "polySurface147PIV" && intersections[0].object.name != "polySurface168PIV" && intersections[0].object.name != "polySurface44PIV" && intersections[0].object.name != "polySurface112PIV" && intersections[0].object.name != "polySurface142PIV" && intersections[0].object.name != "polySurface64PIV" && intersections[0].object.name != "polySurface90PIV" && intersections[0].object.name != "polySurface150PIV" && intersections[0].object.name != "polySurface32PIV" && intersections[0].object.name != "polySurface138PIV" && intersections[0].object.name != "polySurface80PIV" && intersections[0].object.name != "polySurface129PIV" && intersections[0].object.name != "polySurface177PIV" && intersections[0].object.name != "polySurface135PIV" && intersections[0].object.name != "polySurface140PIV" && intersections[0].object.name != "polySurface103PIV" && intersections[0].object.name != "polySurface113PIV" && intersections[0].object.name != "polySurface160PIV" && intersections[0].object.name != "polySurface43PIV" && intersections[0].object.name != "polySurface69PIV" && intersections[0].object.name != "polySurface110PIV" && intersections[0].object.name != "polySurface189PIV" && intersections[0].object.name != "polySurface33PIV" && intersections[0].object.name != "polySurface124PIV" && intersections[0].object.name != "polySurface166PIV" && intersections[0].object.name != "polySurface34PIV" && intersections[0].object.name != "polySurface127PIV" && intersections[0].object.name != "polySurface176PIV" && intersections[0].object.name != "polySurface4PIV" && intersections[0].object.name != "polySurface56PIV" && intersections[0].object.name != "polySurface183PIV" && intersections[0].object.name != "polySurface28PIV" && intersections[0].object.name != "polySurface18PIV" && intersections[0].object.name != "polySurface185PIV" && intersections[0].object.name != "polySurface8PIV" && intersections[0].object.name != "polySurface14PIV" && intersections[0].object.name != "polySurface19PIV" && intersections[0].object.name != "polySurface136PIV" && intersections[0].object.name != "polySurface108PIV" && intersections[0].object.name != "polySurface173PIV" && intersections[0].object.name != "polySurface37PIV" && intersections[0].object.name != "polySurface144PIV" && intersections[0].object.name != "CP4Shape" && intersections[0].object.name != "CP5PIV" && intersections[0].object.name != "CP4Shape_1" && intersections[0].object.name != "CP1PIV") {
      if (intersections[0].object.material.color.getHexString() != "ff0000") {
        prevColor = intersections[0].object.material.color.getHexString();
        intersections[0].object.material.color.setHex("0xff0000")
        // scene.traverse(obj => {
        //   if (obj.name == "Object_2") {
        //     obj.position.set(intersections[0].object.position.x, intersections[0].object.position.y, intersections[0].object.position.z)
        //   }
        // })
      } else if (intersections[0].object.material.color.getHexString() == "ff0000") {
        intersections[0].object.material.color.setHex("0x" + prevColor)
      }
    }
    if (intersections[0].object.name == "polySurface182PIV") {
      scene.traverse(obj => {
        if (obj.name == "Object_4") {
          obj.position.set(-4, 975, 20)
        }
      })
      gsap.to(camera.position, {
        x: 24,
        y: 10,
        z: 125,
        duration: 3,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
      },)
      gsap.to(controls.target, {
        x: 24,
        y: 5,
        z: 0,
        duration: 3,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
        onUpdate: function () {
          controls.update()
        }
      })
      let sphereMat = new T.MeshStandardMaterial({ color: 0x00ff00 })
      let sphereGeo = new T.SphereGeometry(1.2)
      let sphere = new T.Mesh(sphereGeo, sphereMat)
      sphere.position.set(22, 2, 75)
      sphere.name = "sphere"
      scene.add(sphere)
      gsap.to(sphere.position, {
        z: 36,
        duration: 5,
        delay: 3,
        ease: "expo.inOut"
      })
      gsap.to(camera.position, {
        x: 24,
        y: 10,
        z: 45,
        duration: 5,
        delay: 3,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
      },)
      gsap.to(controls.target, {
        x: 24,
        y: 5,
        z: 0,
        duration: 5,
        delay: 3,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
        onUpdate: function () {
          controls.update()
        }
      })
      gsap.to(camera.position, {
        x: -6,
        y: 24,
        z: 64,
        duration: 3,
        delay: 8,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
      },)
      gsap.to(controls.target, {
        x: -6,
        y: 5,
        z: 0,
        duration: 3,
        delay: 8,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
        onUpdate: function () {
          controls.update()
        }
      })
      let pathMat = new T.MeshStandardMaterial({ color: 0xff0000 })
      let pathGeo = new T.BoxGeometry(1, 1, 40)
      let path = new T.Mesh(pathGeo, pathMat)
      path.position.set(22, 2, 56)
      path.name = "path"
      scene.add(path)
    }
    if (intersections[0].object.name == "polySurface63PIV") {
      scene.traverse(obj => {
        if (obj.name == "Object_4") {
          obj.position.set(-4, 975, 53)
        }
      })
      gsap.to(camera.position, {
        x: -8,
        y: 24,
        z: 113,
        duration: 6,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
      },)
      gsap.to(controls.target, {
        x: -8,
        y: 13,
        z: 0,
        duration: 6,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
        onUpdate: function () {
          controls.update()
        }
      })
    }
    if (intersections[0].object.name == "polySurface139PIV") {
      scene.traverse(obj => {
        if (obj.name == "Object_4") {
          obj.position.set(-10, 975, 53)
        }
      })
      gsap.to(camera.position, {
        x: -8,
        y: 24,
        z: 113,
        duration: 6,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
      },)
      gsap.to(controls.target, {
        x: -8,
        y: 13,
        z: 0,
        duration: 6,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
        onUpdate: function () {
          controls.update()
        }
      })
    }
    if (intersections[0].object.name == "polySurface121PIV") {
      scene.traverse(obj => {
        if (obj.name == "Object_4") {
          obj.position.set(-16, 975, 53)
        }
      })
      gsap.to(camera.position, {
        x: -8,
        y: 24,
        z: 113,
        duration: 6,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
      },)
      gsap.to(controls.target, {
        x: -8,
        y: 13,
        z: 0,
        duration: 6,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
        onUpdate: function () {
          controls.update()
        }
      })
    }
    if (intersections[0].object.name == "polySurface175PIV") {
      scene.traverse(obj => {
        if (obj.name == "Object_4") {
          obj.position.set(-26.4, 975, 47)
        }
      })
      gsap.to(camera.position, {
        x: -10,
        y: 24,
        z: 64,
        duration: 6,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
      },)
      gsap.to(controls.target, {
        x: -100,
        y: 13,
        z: 68,
        duration: 6,
        ease: "expo.inOut",
        onStart: () => controls.enabled = false,
        onComplete: () => controls.enabled = true,
        onUpdate: function () {
          controls.update()
        }
      })
    }
  }
}

function darkenNonBloomed(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

document.getElementById("loadingScreen").classList.add("z-[20]");
document.getElementById("loadingScreen").innerHTML = `<img src="images/loading.gif" class="w-auto h-[200px]">`
function loading() {
  document.getElementById("loadingScreen").classList.add("hidden")
}

let particles, pos = [], vel = [], isSnowing = false, isRaining = false, hasFlowers = false, rain, rainGeo, rainCount = 1600;
const numSnowflakes = 1600;
const maxRange = 1000, minRange = maxRange / 2;
const minHeight = 100;

const geo6 = new T.BufferGeometry();
window.addSnow = () => {
  if (isSnowing || isRaining || hasFlowers) {
    scene.remove(particles)
    pos = [];
    vel = [];
    isSnowing = false;
    isRaining = false;
    hasFlowers = false;
  } else if (!isSnowing) {
    for (let i = 0; i < numSnowflakes; i++) {
      pos.push(
        Math.floor(Math.random() * maxRange - minRange),
        Math.floor(Math.random() * minRange + minHeight),
        Math.floor(Math.random() * maxRange - minRange))

      vel.push(
        Math.floor(Math.random() * 3 - 1.5) * 0.1,
        1,
        Math.floor(Math.random() * 3 - 1.5) * 0.1)
    }
    geo6.setAttribute("position", new T.Float32BufferAttribute(pos, 3))
    geo6.setAttribute("velocity", new T.Float32BufferAttribute(vel, 3))

    const flakeMat = new T.PointsMaterial({
      size: 2,
      map: new TextureLoader().load("images/12.png"),
      blending: T.AdditiveBlending,
      depthTest: true,
      transparent: true,
      opacity: 0.7
    })
    particles = new T.Points(geo6, flakeMat);
    scene.add(particles)
    isSnowing = true;
    isRaining = false;
    hasFlowers = false;
  }
}

function updateParticles() {
  if (particles) {
    for (let i = 0; i < numSnowflakes * 3; i += 3) {
      particles.geometry.attributes.position.array[i] -= particles.geometry.attributes.velocity.array[i];
      particles.geometry.attributes.position.array[i + 1] -= particles.geometry.attributes.velocity.array[i + 1];
      particles.geometry.attributes.position.array[i + 2] -= particles.geometry.attributes.velocity.array[i + 2];
      if (particles.geometry.attributes.position.array[i + 1] < 0) {
        particles.geometry.attributes.position.array[i] = Math.floor(Math.random() * maxRange - minRange);
        particles.geometry.attributes.position.array[i + 1] = Math.floor(Math.random() * minRange + minHeight);
        particles.geometry.attributes.position.array[i + 2] = Math.floor(Math.random() * maxRange - minRange);
      }
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }
}


window.addRain = () => {
  if (isRaining || isSnowing || hasFlowers) {
    scene.remove(particles)
    pos = [];
    vel = [];
    isRaining = false;
    isSnowing = false;
    hasFlowers = false;
  } else if (!isRaining) {
    for (let i = 0; i < rainCount; i++) {
      pos.push(
        Math.floor(Math.random() * maxRange - minRange),
        Math.floor(Math.random() * minRange + minHeight),
        Math.floor(Math.random() * maxRange - minRange))

      vel.push(
        Math.floor(Math.random() * 3 - 1.5) * 0.001,
        5,
        Math.floor(Math.random() * 3 - 1.5) * 0.001)
    }
    geo6.setAttribute("position", new T.Float32BufferAttribute(pos, 3))
    geo6.setAttribute("velocity", new T.Float32BufferAttribute(vel, 3))

    const flakeMat = new T.PointsMaterial({
      size: 1,
      map: new TextureLoader().load("images/rain.png"),
      blending: T.AdditiveBlending,
      depthTest: true,
      transparent: true,
      opacity: 0.7
    })
    particles = new T.Points(geo6, flakeMat);
    scene.add(particles)
    isRaining = true;
    isSnowing = false;
    hasFlowers = false;
  }
}

window.addFlowers = () => {
  if (isRaining || isSnowing || hasFlowers) {
    scene.remove(particles)
    pos = [];
    vel = [];
    isRaining = false;
    isSnowing = false;
    hasFlowers = false;
  } else if (!hasFlowers) {
    for (let i = 0; i < rainCount; i++) {
      pos.push(
        Math.floor(Math.random() * maxRange - minRange),
        Math.floor(Math.random() * minRange + minHeight),
        Math.floor(Math.random() * maxRange - minRange))

      vel.push(
        Math.floor(Math.random() * 3 - 1.5) * 0.001,
        1,
        Math.floor(Math.random() * 3 - 1.5) * 0.001)
    }
    geo6.setAttribute("position", new T.Float32BufferAttribute(pos, 3))
    geo6.setAttribute("velocity", new T.Float32BufferAttribute(vel, 3))

    const flakeMat = new T.PointsMaterial({
      size: 1,
      map: new TextureLoader().load("images/rain.png"),
      blending: T.AdditiveBlending,
      depthTest: true,
      transparent: true,
      opacity: 0.7
    })
    particles = new T.Points(geo6, flakeMat);
    scene.add(particles)
    isRaining = true;
    isSnowing = false;
    hasFlowers = false;
  }
}
window.backBtn = () => {
  scene.remove(scene.getObjectByName("path"))
  scene.remove(scene.getObjectByName("sphere"))
  gsap.globalTimeline.clear()
  gsap.to(camera.position, {
    x: 24,
    y: 24,
    z: 125,
    duration: 3,
    ease: "expo.inOut",
    onStart: () => controls.enabled = false,
    onComplete: () => controls.enabled = true,
  },)
  gsap.to(controls.target, {
    x: 24,
    y: 5,
    z: 0,
    duration: 3,
    ease: "expo.inOut",
    onStart: () => controls.enabled = false,
    onComplete: () => controls.enabled = true,
    onUpdate: function () {
      controls.update()
    }
  })
}
function animate() {
  requestAnimationFrame(animate);
  // mixer.update(clock.getDelta());
  // var elapsedTime = clock.getElapsedTime();

  // Define the rotation speed
  // var rotationSpeed = 0.5; // Radians per second

  // Calculate the rotation angles for each axis
  // var angle = rotationSpeed * elapsedTime;
  // console.log(camera.position);

  // Apply the rotation to the cube
  // points.rotation.x = angle; // Rotate around X axis
  // points.rotation.y = angle; // Rotate around Y axis
  // points.rotation.z = angle;
  // console.log(camera.position);

  updateParticles();

  controls.update();

  scene.traverse(darkenNonBloomed);
  bloomComposer.render();
  scene.traverse(restoreMaterial);
  finalComposer.render();
  // camera.updateProjectionMatrix()
}