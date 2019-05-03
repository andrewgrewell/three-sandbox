import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Application from './Application.jsx';
import BasicThree from './BasicThree';

const AppRoutes = (
    <Route path="/" component={Application}>
        <IndexRoute component={BasicThree} />
    </Route>
);


export default AppRoutes;