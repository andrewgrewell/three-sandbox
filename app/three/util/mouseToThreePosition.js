import { THREE } from '../index';

/* Taken from http://stackoverflow.com/a/13091694 */
export default function mouseToThreePosition(mouseX, mouseY, camera) {
    var vector = new THREE.Vector3();

    vector.set(
        ( mouseX / window.innerWidth ) * 2 - 1,
        - ( mouseY / window.innerHeight ) * 2 + 1,
        0.5 );

    vector.unproject(camera);

    var dir = vector.sub(camera.position).normalize();

    var distance = - camera.position.z / dir.z;

    return camera.position.clone().add( dir.multiplyScalar( distance ) );
}