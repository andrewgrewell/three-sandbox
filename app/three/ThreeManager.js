import { THREE } from './index';


const ThreeManager = {

    init() {
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initContainer();
        this.addSphere(15);
        this.loop();

        window.addEventListener('resize', () => this.onWindowResize());
    },

    initScene() {
        this.scene = new THREE.Scene();
        this.focus = this.scene;
        this.addGroundPlane();
        this.addLight();
    },

    initContainer() {
        this.container = document.querySelector('#three-renderer');
        if (this.container.hasChildNodes()) {
            this.container.removeChild(this.container.childNodes[0]);
        }
        this.container.appendChild(this.renderer.domElement);
    },

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.soft = true;
    },

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000 );
        this.updateCamera();
        this.scene.add(this.camera);
    },

    updateCamera(x = 0, y = 300, z = 500) {
        this.camera.position.x = x;
        this.camera.position.y = y;
        this.camera.position.z = z;
        this.camera.updateProjectionMatrix();
        this.camera.lookAt(this.focus.position);
    },

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    addSphere(r = 60) {
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(r, 32, 16),
            new THREE.MeshLambertMaterial(
                {
                    color: 0xf25346,
                    wireframe: false,
                    shading: THREE.SmoothShading
                }
            )
        );
        this.sphere.castShadow = true;
        this.sphere.position.y = 50;
        this.focus = this.sphere;
        this.scene.add(this.sphere);
    },

    updateSpherePosition(x, y, z) {
        this.sphere.position.x = x;
        this.sphere.position.y = y;
        this.sphere.position.z = z;
    },

    addGroundPlane() {
        let mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(window.innerWidth, window.innerHeight),
            new THREE.MeshLambertMaterial({
                color: 0x4286f4,
                side: THREE.DoubleSide
            })
        );
        mesh.rotation.x =  -Math.PI/2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
    },

    addLight() {
        let shadowW = window.innerWidth / 2;
        let shadowH = window.innerHeight / 2;
        let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.75);
        let directionLight = new THREE.DirectionalLight(0xf4d942, .35);
        directionLight.position.set(50, 300, 0);
        directionLight.castShadow = true;
        directionLight.shadow.darkness = 0.2;
        directionLight.shadow.mapSize.width = 1024;
        directionLight.shadow.mapSize.height = 1024;
        directionLight.shadow.camera.left = -shadowH;
        directionLight.shadow.camera.right = shadowH;
        directionLight.shadow.camera.top = -shadowW;
        directionLight.shadow.camera.bottom = shadowW;
        directionLight.shadow.camera.near = 0.1;
        directionLight.shadow.camera.far = 1000;
        directionLight.shadow.camera.fov = 45;

        this.scene.add(ambientLight);
        this.scene.add(directionLight);
    },

    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.render();
    },

    render() {
        this.renderer.render(this.scene, this.camera);
    }
};

export default ThreeManager;