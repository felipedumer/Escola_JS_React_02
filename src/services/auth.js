import Api from './api';

const AuthService = {
    verifyToken: () => Api.get("/users/token", {
            headers: {'x-access-token': localStorage.getItem('token')}
        })
}

export default AuthService;