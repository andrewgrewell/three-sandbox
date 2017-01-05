import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Application from 'app/routes/Application.jsx';
import BasicThree from 'app/routes/BasicThree';

const AppRoutes = (
    <Route path="/" component={Application}>
        <IndexRoute component={BasicThree} />
    </Route>
);


export default AppRoutes;