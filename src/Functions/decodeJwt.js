//En esta función se decodifica el token enviado desde el backend, se extrae el payload y se
//guardan los datos del usuario para su posterior uso

import { jwtDecode } from "jwt-decode";

let dataUser = {
    idUsuario: 0,
    nombreUsuario: "",
    rolUsuario: 0,
    expToken: 0
};

const decodeJwt = function() {
    
    const token = localStorage.getItem('token');
    
    if (token) {
        const tokenDecoded = jwtDecode(token);
    
        dataUser.idUsuario = tokenDecoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        dataUser.nombreUsuario = tokenDecoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        dataUser.rolUsuario = tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        dataUser.expToken = tokenDecoded.exp;
    }
    
    localStorage.setItem('dataUser', JSON.stringify(dataUser));
}


export  {decodeJwt, dataUser};