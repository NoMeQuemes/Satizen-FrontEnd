import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { dataUser } from "@/Functions/decodeJwt";
import { useExpirationSession } from "./expirationSession";

export const useLogoutStore = defineStore("logout", () => {
    const expirationSession = useExpirationSession();
    const router = useRouter();


    function logout () {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        delete dataUser.idUsuario, dataUser.nombreUsuario, dataUser.rolUsuario, dataUser.expToken;
        localStorage.removeItem("dataUser");
        expirationSession.stopCountDownExpirationSession();
        router.push({ name: 'login' })
    }

    return {
        logout
    }
})