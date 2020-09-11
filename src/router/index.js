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
        }, {
          // 分类内部
          path: "listPage",
          name: "listPage",
          params: {
            type: '',
            code: ''
          },
          component: () =>
            import("@/views/listPage"),
        },
        {
          path: "cart",
          name: "cart",
          component: () =>
            import("@/views/cart")
        },
        {
          path: "my",
          name: "my",
          component: () =>
            import("@/views/login")
        },
        // 详情页
        {
          path: "product/:id",
          name: 'Product',
          component: () =>
            import("@/views/productDetail/index.vue"),
        },
        // 订单页
        {
          path: "/order",
          name:"order",
          component: () =>
         
            import("@/views/order/index.vue")
        },
        // //个人订单列表页
        {
          path: "/orderList",
          name:"orderList",
          component: () =>
            import("@/views/orderList/index.vue")
        },
        {
          path: "/myInfo",
          name:"myInfo",
          component: () =>
            import("@/views/my/index.vue")
        },
        {
          path: "/search/:search",
          name:"search",
          component: () =>
            import("@/views/search/index.vue")
        },
        {
          path: "/tempOrder",
          name:"tempOrder",
          component: () =>
            import("@/views/tempOrder/index.vue")
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
