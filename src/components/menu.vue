<template>
    <div class="page-index">
        
        <div class="m-menu">
            <dl class="nav" @mouseleave="menuLeave">
                <!-- <dt>全部分类</dt> -->
                <dd @click="goClassly(item)" v-for="(item,index) in menuList" :key="index" @mouseenter="menuEnter(item)">
                    <!-- <i :class="item.type"></i> -->
                    {{item.name}}
                    <span class="arrow"></span>
                </dd>
            </dl>
            <div v-if="curDetail" class="detail" @mouseenter="detailEnter" @mouseleave="detailLeave">
                <template v-for="(item,index) in curDetail.items">
                    <h4 :key="index">{{item.name}}</h4>
                    <span @click="goClassly(v)" v-for="(v,i) in item.items" :key="v.id + '_'+ i">{{v.name}}</span>
                
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { getClassify } from "@/api/apis";
export default {
    data() {
        return {
            curDetail:null,
            menuList:[],
            menuList1:[{
                "type": "food",
                "name": "美食",
                "items": [{
                    "title": "美食",
                    "items": ["代金券", "甜点饮品", "火锅", "自助餐", "小吃快餐"]
                }]
            }, {
                "type": "takeout",
                "name": "外卖",
                "items": [{
                    "title": "外卖",
                    "items": ["美团外卖"]
                }]
            }, {
                "type": "hotel",
                "name": "酒店",
                "items": [{
                    "title": "酒店星级",
                    "items": ["经济型", "舒适/三星", "高档/四星", "豪华/五星"]
                }]
            }]
        }
    },
    mounted(){
        this.getMenu();
    },
    created(){
        //获取左侧导航数据
        // api.getMenuList().then( res => {
        //     this.menuList = res.data.data;
        //     // console.log(JSON.stringify(this.menuList));
        // })
    },
    methods: {
     //跳转分类页面
     goClassly(cat){
         console.log(cat);
         this.$emit('handCahnge',{'isShow':'true'});
         let codes = [];
        if (cat.items.length != 0) {
            for (var i = 0; i < cat.items.length; i++) {
                codes.push(cat.items[i].id);
            }
            this.$router.push({
                path: "/listPage",
                query: { listtype: "category", code: codes.join(",") ,title:cat.name},
            });
            }else {
            this.$router.push({
                path: "/listPage",
                query: { listtype: "category", code: cat.id,title:cat.name },
            });
        }
        //  this.$router.push({
        //     path: '/listPage',
        //     query: { type: "category", code: codes.join(",") },
            
        // })

        //  this.$router.push({name:"listPage", params:{id:1}})
     },
     // 获取分类数据
    getMenu() {
      this.$request.getClassify().then((res) => {
        console.log('恒大大大大',res);
        if (res.code == 0) {
          console.log('分类',res);
          if(res.data.items.length !=0){
            this.menuList = res.data.items;
            this.menuList.reverse();
            // let obj = {};
            // obj.code=res.data.items[this.activeKey].id;
            // obj.listtype="category";
            // this.comodity = obj;
          }
            //   this.goods = res.data.items[this.activeKey].items;
        }
      })
    },
      menuEnter(item) {
            this.curDetail = item;
      },
      menuLeave() {
          var self = this;
          this.timer = setTimeout(function () {
              self.curDetail = null
          },200)
      },
      detailEnter() {
          clearTimeout(this.timer);
      },
      detailLeave() {
          this.curDetail = null;
      }
    },
}
</script>
<style lang="scss" scoped>
    @import "@/assets/css/menu.scss";
</style>

