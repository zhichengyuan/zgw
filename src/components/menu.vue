<template>
    <div class="page-index">
        <div class="m-menu">
            <dl class="nav" @mouseleave="menuLeave">
                <!-- <dt>全部分类</dt> -->
                <dd @click="goClassly" v-for="(item,index) in menuList1" :key="index" @mouseenter="menuEnter(item)">
                    <!-- <i :class="item.type"></i> -->
                    {{item.name}}
                    <span class="arrow"></span>
                </dd>
            </dl>
            <div v-if="curDetail" class="detail" @mouseenter="detailEnter" @mouseleave="detailLeave">
                <template v-for="(item,index) in curDetail.items">
                    <h4 :key="index">{{item.title}}</h4>
                    <span @click="goClassly" v-for="(v,i) in item.items" :key="v + '_'+ i">{{v}}</span>
                
                </template>
            </div>
        </div>
    </div>
</template>
<script>
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
    created(){
        //获取左侧导航数据
        // api.getMenuList().then( res => {
        //     this.menuList = res.data.data;
        //     // console.log(JSON.stringify(this.menuList));
        // })
    },
    methods: {
     //跳转分类页面
     goClassly(){
         this.$emit('handCahnge',{'isShow':'true'});
         this.$router.push({name:"listPage", params:{id:1}})
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

