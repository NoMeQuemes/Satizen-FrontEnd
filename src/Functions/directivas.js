// import { useDecodeJwT } from "@/store/decodeJwt"

export const roleDirective = {
    mounted(el, binding) {
        // const decodeJwtStore = useDecodeJwT();
        const rolusuario = JSON.parse(localStorage.getItem("satizenInfo"))
        const requiredRol = binding.value;
        if ( rolusuario !== requiredRol){
            el.style.display = 'none' //Oculta el elemento si el usuario no tiene el rol adecuado
        }
    }
}

export default roleDirective;