import * as THREE from '../build/three.module.js';

let scene, camera, renderer;
let box, outlineBox; 
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let currentColorIndex = 0;
let colors = ['red', 'green', 'blue'];

function init() {
    scene = new THREE.Scene();

    let fov = 75;
    let aspect = window.innerWidth / window.innerHeight; 
    let near = 0.1;
    let far = 200;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 5); // Atur posisi kamera

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: colors[currentColorIndex], visible: true });
    box = new THREE.Mesh(geometry, material);
    box.position.set(0, 0, -5);
    scene.add(box);

    let outline = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.BackSide });
    outlineBox = new THREE.Mesh(geometry, outline);
    outlineBox.scale.set(1.1, 1.1, 1.1);
    outlineBox.position.set(0, 0, -5);
    scene.add(outlineBox);

    window.addEventListener('mousedown', onMouseDown, false);
}

function render() {
    renderer.render(scene, camera);
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    outlineBox.rotation.x += 0.01;
    outlineBox.rotation.y += 0.01;
    requestAnimationFrame(render); // Memanggil render dalam loop
}

function changeColor() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    box.material.color.set(colors[currentColorIndex]);
}

function onMouseDown(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // Perbaiki mouse.y di sini
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObject(box);
    if (intersects.length > 0) {
        changeColor();
    }
}

window.onload = function() {
    init();
    render();
}

window.onresize = function() {
    console.log("Sedang di resize");
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
    camera.updateProjectionMatrix(); // Update projection matrix
}
