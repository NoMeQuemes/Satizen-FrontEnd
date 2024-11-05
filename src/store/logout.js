import { defineStore } from "pinia";
import { useRouter } from "vue-router";
// import { dataUser } from "@/Functions/decodeJwt";
import { useExpirationSession } from "./expirationSession";
import { useDecodeJwT } from "./decodeJwt";

export const useLogoutStore = defineStore("logout", () => {
    const decodeJwt = useDecodeJwT();
    const expirationSession = useExpirationSession();
    const router = useRouter();


    function logout () {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("satizenInfo");
        localStorage.removeItem("image");
        delete decodeJwt.dataUser.idUsuario, decodeJwt.dataUser.nombreUsuario, decodeJwt.dataUser.rolUsuario, decodeJwt.dataUser.expToken;
        expirationSession.stopCountDownExpirationSession();
        router.push({ name: 'login' })
    }

    return {
        logout
    }
})