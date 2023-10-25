import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import ExtraStuffView from '../views/ExtraStuff.view.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'

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
      path: '/event/:id',
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
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/stuff',
      name: 'stuff',
      component: ExtraStuffView,
      props: (route) => ({ showExtra: route.query.e }),
    },
  ],
})

export default router
