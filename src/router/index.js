import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Layout from '@/layout'
const router = new VueRouter({

  routes: [{
      path: "/login",
      name: "login",
      component: () =>
        import("@/views/login")
    },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [{
          path: 'home',
          name: 'home',
          component: () =>
            import('@/views/index'),
        }, 

      ]
    },
    
    
    
  ],

})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
