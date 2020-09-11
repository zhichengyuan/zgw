<template>
    <div class="page-index">
        <div class="m-menu">
            <dl class="nav" @mouseleave="menuLeave">
                <!-- <dt>全部分类</dt> -->
                <dd v-for="(item,index) in menuList" :key="index" @mouseenter="menuEnter(item)">
                    <!-- <i :class="item.type"></i> -->
                    {{item.name}}
                    <span class="arrow"></span>
                </dd>
            </dl>
            <div v-if="curDetail" class="detail" @mouseenter="detailEnter" @mouseleave="detailLeave">
                <template v-for="(item,index) in curDetail.items">
                    <h4 style="cursor:pointer;" @click="goClassly(item)" :key="index">{{item.name}}</h4>
                
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
            menuList1:[]
        }
    },
    mounted(){
        this.getMenu();
    },
    created(){
    },
    methods: {
     //跳转分类页面
     goClassly(cat){
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
     },
     // 获取分类数据
    getMenu() {
      this.$request.getClassify().then((res) => {
        if (res.code == 0) { 
          if(res.data.items.length !=0){
            this.menuList = res.data.items;
            this.menuList.reverse();
   
          }

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

