import React from 'react';

import styles from './BasicThree_styles.scss';
import ThreeManager from 'app/three';
import { mouseToThreePosition } from 'app/three';
import { keyCodes } from 'app/constants';
import { KeyboardResponder } from 'app/util';

const BasicThree = React.createClass({

    componentWillMount() {
        this.keyboardResponder = new KeyboardResponder();
    },

    componentDidMount() {
        ThreeManager.init();
        this.keyboardResponder.onKeyDown(keyCodes.LEFT, this.handleLeft);
        this.keyboardResponder.onKeyDown(keyCodes.RIGHT, this.handleRight);
        this.keyboardResponder.onKeyDown(keyCodes.UP, this.handleUp);
        this.keyboardResponder.onKeyDown(keyCodes.DOWN, this.handleDown);
    },

    componentWillUpdate() {
        ThreeManager.init();
    },

    handleLeft() {
        let pos = ThreeManager.sphere.position;
        ThreeManager.updateSpherePosition(
            pos.x - 5,
            pos.y,
            pos.z
        );
    },

    handleRight() {
        let pos = ThreeManager.sphere.position;
        ThreeManager.updateSpherePosition(
            pos.x + 5,
            pos.y,
            pos.z
        );
    },

    handleUp() {
        let pos = ThreeManager.sphere.position;
        ThreeManager.updateSpherePosition(
            pos.x,
            pos.y,
            pos.z - 5
        );
    },

    handleDown() {
        let pos = ThreeManager.sphere.position;
        ThreeManager.updateSpherePosition(
            pos.x,
            pos.y,
            pos.z + 5
        );
    },

    handleMouseMove(e) {
        //let pos = mouseToThreePosition(e.clientX, e.clientY, ThreeManager.camera);
        //ThreeManager.updateSpherePosition(pos.x, 50, -pos.y);
    },

    render() {
        return (
            <div id="three-renderer"
                 onMouseMove={this.handleMouseMove}>
            </div>
        );
    }
});


export default BasicThree;