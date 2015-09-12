var locations = [
    { x: 0, y: 53, size: 1 },
    { x: 1, y: 2, size: 2 },
    { x: 2, y: 100, size: 3 },
    { x: 3, y: 20, size: 4 },
    { x: 4, y: 13, size: 5 },
    { x: 5, y: 191, size: 60 },
];

var container;

var camera, scene, renderer, objects;
var particleLight;

var materials = [];

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 200, 800);

    scene = new THREE.Scene();

    // Grid
    var line_material = new THREE.LineBasicMaterial({ color: 0x303030 }),
        geometry = new THREE.Geometry(),
        floor = -75, step = 25;

    for (var i = 0; i <= 40; i ++) {
        geometry.vertices.push(new THREE.Vector3(-500, floor, i * step - 500));
        geometry.vertices.push(new THREE.Vector3(500, floor, i * step - 500));

        geometry.vertices.push(new THREE.Vector3(i * step - 500, floor, -500));
        geometry.vertices.push(new THREE.Vector3(i * step - 500, floor,  500));
    }

    var line = new THREE.Line(geometry, line_material, THREE.LinePieces);
    scene.add(line);

    particleLight = new THREE.Mesh(new THREE.SphereGeometry(4, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    scene.add(particleLight);

    // Lights
    scene.add(new THREE.AmbientLight(0x111111));

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.125);

    directionalLight.position.x = 0;
    directionalLight.position.y = 0;
    directionalLight.position.z = 0;

    directionalLight.position.normalize();

    scene.add(directionalLight);

    var pointLight = new THREE.PointLight(0xffffff, 1);
    particleLight.add(pointLight);

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    //

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    render();
}

function render() {
    var timer = 0.0001 * Date.now();

    camera.position.x = Math.cos(timer) * 1000;
    camera.position.z = Math.sin(timer) * 1000;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
