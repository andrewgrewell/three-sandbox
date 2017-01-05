import React from 'react';
import applicationStyles from './Application_styles';

const Application = React.createClass({

    render() {
        return (
            <div id="main-application">
                {this.props.children}
            </div>
        )
    }
});


export default Application;