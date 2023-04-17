import React, {useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthUser from "../verify_token";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);

    useEffect( () => {
        async function fetchData() {
            if (await AuthUser().then(res => res).catch(res => res) === true) {
                setAuth(true);
                setIsTokenValidated(true)
            } else {
                setAuth(false);
                setIsTokenValidated(true);
            }
        }
        fetchData();

    }, [auth])

    if (!isTokenValidated) {
        return <div/>; // or some kind of loading animation
    } else {
    return (<Route {...rest} render={(props) => (
            auth === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login'}}/>
        )}/>
    )
};
}

export default PrivateRoute;