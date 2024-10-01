import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import InstitucionesView from '@/views/InstitucionesView.vue'



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
    meta:
    {
      requiresAuth: true,
      title: 'Home'
    }
  },
  {
    path: '/instituciones',
    name: 'instituciones',
    component: InstitucionesView,
    meta:
    {
      requiresAuth: true,
      title: 'Instituciones'
    }
  }
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


export default router
