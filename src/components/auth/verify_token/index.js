import AuthService from "../../../services/auth";

const AuthUser = async () => {
    const response = await AuthService.verifyToken();
    if (response.status === 200) {
        return true;
    } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return false;
    }
}

/*(async () => {
    console.log(await AuthUser())
})()*/

export default AuthUser;