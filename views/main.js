import * as THREE from '../build/three.module.js';

let scene, camera, renderer;
let box, outlineBox; 

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
    let boxColor = new THREE.Color('red');
    let material = new THREE.MeshBasicMaterial({ color: boxColor, visible : true});
    box = new THREE.Mesh(geometry, material);
    box.position.set(0,0,-5);
    scene.add(box);

    let outline = new THREE.MeshBasicMaterial({color : 'white', side : THREE.BackSide});
    outlineBox = new THREE.Mesh(geometry, outline);
    outlineBox.scale.set(1.1, 1.1, 1.1);
    outlineBox.position.set(0,0,-5);
    scene.add(outlineBox)
}

function render() {
    renderer.render(scene, camera);
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    outlineBox.rotation.x += 0.01;
    outlineBox.rotation.y += 0.01;
    requestAnimationFrame(render); // Memanggil render dalam loop
}
window.changeColor = function(color){
    box.material.color.set(color);
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
