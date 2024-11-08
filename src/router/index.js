import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import InstitucionesView from '@/views/InstitucionesView.vue'
import UsuariosView from '@/views/UsuariosView.vue'
import PersonalView from '@/views/PersonalView.vue'
import PacientesView from '@/views/PacientesView.vue'
import LlamadosView from '@/views/LlamadosView.vue'
import RolesView from '@/views/RolesView.vue'
import PermisosView from '@/views/PermisosView.vue'
import RestaurarPasswordView from '@/views/RestaurarPasswordView.vue'
import CambiarPasswordView from '@/views/CambiarPasswordView.vue'
import DispositivosView from '@/views/DispositivosView.vue'

// import TablaPacientes from '@/views/TablaPacientes.vue'
import InicioView from '@/views/InicioView.vue' 

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
      title: 'Satizen - Home'
    }
  },
  {
    path: '/instituciones',
    name: 'instituciones',
    component: InstitucionesView,
    meta:
    {
      requiresAuth: true,
      title: 'Satizen - Instituciones'
    }
  },
  {
    path: '/pacientes',
    name: 'pacientes',
    component: PacientesView,
    meta:
    {
      requiresAuth: true,
      title: 'Satizen - Pacientes'
    }
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: InicioView, 
    meta: {
      requiresAuth: true,
      title: 'Inicio'
    }
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: UsuariosView,
    meta:
    {
      requiresAuth: true,
      title: 'Satizen - Usuarios'
    }
  },
  {
    path: '/personal',
    name: 'personal',
    component: PersonalView,
    meta:
    {
      requiresAuth: true,
      title: 'Satizen - Personal'
    }
  },
  {
    path: '/llamados',
    name: 'llamados',
    component: LlamadosView,
    meta:
    {
      requiresAuth: true,
      title: 'Satizen - Llamados'
    }
  },
  {
    path: '/roles',
    name: 'roles',
    component: RolesView,
    meta:
    {
      requiresAuth: true,
      title: 'Satizen - Roles'
    }
  },
  {
    path: '/permisos',
    name: 'permisos',
    component: PermisosView,
    meta:
    {
      requiresAuth: true,
      title: 'Satizen - Permisos'
    }
  },
  {
    path: '/restaurarPassword',
    name: 'restaurarPassword',
    component: RestaurarPasswordView,
    meta:
    {
      title: 'Satizen - Restaurar Contraseña'
    }
  },
  {
    path: '/cambiarPassword',
    name: 'cambiarPassword',
    component: CambiarPasswordView,
    meta:
    {
      title: 'Satizen - Cambiar Contraseña'
    }
  },
  {
    path: '/dispositivo',
    name: 'dispositivo',
    component: DispositivosView,
    meta:
    {
      requiresAuth: true,
      title: 'Satizen - Dispositivos'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//Validación para saber si el usuario está logueado, en el caso de que no lo esté,
// no lo deja a entrar a rutas no autorizadas desde la URL
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

router.afterEach((to) => {
  const defaultTitle = "Satizen"; // Título por defecto
  document.title = to.meta.title || defaultTitle;
});

export default router
