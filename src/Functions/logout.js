import { dataUser } from "./decodeJwt";
import router from "@/router";

const logout = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    delete dataUser.idUsuario, dataUser.nombreUsuario, dataUser.rolUsuario, dataUser.expToken;
    localStorage.removeItem('dataUser');

    router.push( {name: 'login'} );
}

export default logout;