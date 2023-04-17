import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterScreen from './screens/auth/register';
import LoginScreen from './screens/auth/login';
import NotesScreen from './screens/notes/index';
import UsersEditScreen from './screens/users/edit';
import HomeScreen from "./screens/home";

import PrivateRouter from './components/auth/private_route';

const Routes = () => {
    let title = 'LembraFácil';
    document.title = title;
    return (
         <BrowserRouter>
             <Switch>
                 <Route exact path="/" component={HomeScreen}/>
                 <Route exact path="/register" component={RegisterScreen}/>
                 <Route exact path="/login" component={LoginScreen}/>
                 <PrivateRouter exact path="/notes" component={NotesScreen}/>
                 <PrivateRouter exact path="/users/edit" component={UsersEditScreen}/>
             </Switch>
         </BrowserRouter>
    )
};

export default Routes;