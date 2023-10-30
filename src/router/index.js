import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import ExtraStuffView from '../views/ExtraStuff.view.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
      path: '/events/:id',
      name: 'EventLayout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'EventDetails',
          component: EventDetails,
        },
        {
          path: 'register',
          name: 'EventRegister',
          component: EventRegister,
        },
        {
          path: 'edit',
          name: 'EventEdit',
          component: EventEdit,
          meta: { requireAuth: true },
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      alias: '/about-us',
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: (to) => {
        return { path: '/events/' + to.params.afterEvent }
      },
    },
    {
      path: '/stuff',
      name: 'stuff',
      component: ExtraStuffView,
      props: (route) => ({ showExtra: route.query.e }),
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true,
    },
    {
      path: '/:catchAll(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // <----
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  // Suponha que você tenha uma função 'isUserAuthenticated' que verifica se o usuário está autenticado
  const isAuthenticated = isUserAuthenticated()

  if (to.meta.requireAuth && !isAuthenticated) {
    alert('Você não está autenticado')
    // Se a rota requer autenticação e o usuário não está autenticado:
    // Redirecionar para a página de login ou mostrar uma mensagem de erro
    next('/') // Redireciona para a página de login
  } else {
    // Se a rota não requer autenticação ou o usuário está autenticado:
    next() // Continue a navegação
  }
})

function isUserAuthenticated() {
  // Exemplo: Verificar se há um token JWT no armazenamento local
  return false
}

export default router
