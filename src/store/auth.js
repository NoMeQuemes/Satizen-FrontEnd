import { defineStore } from "pinia";
import {ref, computed} from 'vue';

export const useAuthStore = defineStore("auth", () => {
    let rol = ref("")

    const rolDecoded = computed(() => {
        rol.value 
    })
})