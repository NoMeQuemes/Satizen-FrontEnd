import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import { reactive } from "vue";

export const useDecodeJwT = defineStore("decodeJwt", () => {
    let dataUser = reactive({
        idUsuario: 0,
        nombreUsuario: "",
        rolUsuario: 0,
        expToken: 0
    });

    function decodeJwt() {
        const token = localStorage.getItem('token');
    
        if (token) {
            const tokenDecoded = jwtDecode(token);
        
            dataUser.idUsuario = tokenDecoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            dataUser.nombreUsuario = tokenDecoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            dataUser.rolUsuario = tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            dataUser.expToken = tokenDecoded.exp;
        }
        
        //Cualquier dato que se agregue al local storage se debe eliminar al momento de hacer logout
        localStorage.setItem('satizenInfo', JSON.stringify(dataUser.rolUsuario));
        localStorage.setItem('dataUser', JSON.stringify(dataUser));
    }

    return{
        dataUser,
        decodeJwt
    }
})