import ThreeManager from './ThreeManager';
import THREELib from 'three-js';

const THREE = THREELib();

export { THREE };
export { default as mouseToThreePosition } from './util/mouseToThreePosition';
export default ThreeManager;