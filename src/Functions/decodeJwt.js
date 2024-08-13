import { jwtDecode } from "jwt-decode";

const decodeJwt = function() {
    const token = localStorage.getItem('token');
    if(token){
        console.log("Token actual: ", token);

        const tokenDecoded = jwtDecode<JwtPayload>(token);
        console.log("Token Decodificado", tokenDecoded);

        const idUsuario = tokenDecoded.idUsuario;
        console.log('Identificador de usuario: ', idUsuario);

        
    }
}



export default decodeJwt;