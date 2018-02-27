import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Containers
import Auth from './containers/Auth';
import Classes from './containers/Classes';
import Class from './containers/Class';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/Classes' component={Classes} />
        <Route path='/Class/:classId' component={Class} />
    </Switch>
)