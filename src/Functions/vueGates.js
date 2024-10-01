import VueGates from "vue-gates";

//Función que mapea los roles numéricos a nombres legibles
const mapRole = function(roleNumber) {
  const rolesMap = {
    1: "admin",
    2: "doctor",
    3: "enfermero",
  };
  return rolesMap[roleNumber] || "guest";
};

const dataUser = JSON.parse(localStorage.getItem("dataUser"));
const userRol = mapRole(dataUser.rolUsuario);
console.log(userRol);

//Configurar Vue Gates con roles mapeados
app.use(VueGates, {
    user: {
      role: userRol,
    },
    roles: {
      admin: {
        can: [
          "view-home",
          "view-pacientes",
          "view-instituciones",
          "view-personal",
          "view-usuarios",
        ],
      },
      doctor: {
        can: ["view-home", "view-pacientes"],
      },
      enfermero: {
        can: ["view-home", "view-pacientes"],
      },
    },
  });