<template>
  <div class="activity">
    <h2 class="title" v-if="activitys.length != 0">{{$t("message.*首页活动")}}</h2>
    <!-- <span>{{activitys}}</span> -->
    <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="(o) in activitys"
        :key="o"
        
        style="text-align:center;background: linear-gradient(to top right, #FF9500, #ff5000);line-height: 45px;border-radius: 22px;cursor:pointer"
      >
        <div style="" @click="goClassly(o)"><span class="text" >{{o}}</span></div>
        <!-- <el-card shadow="hover" :body-style="{ padding: '5px',borderRadius:'20px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
        </el-card>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    activitys() {
      var a = [];

      this.$store.state.activitys.forEach((element) => {
        // console.log(element)
        if (element != "Деятельность на первой странице") {
          a.push(element);
        }
      });
      // console.log('默认',a)
      return a
    },
    
  },
  methods:{
    //跳转分类页面
     goClassly(cat){
        //  console.log(cat);
        //  this.$emit('handCahnge',{'isShow':'true'});
        let codes = [];
        this.$router.push({
            path: "/listPage",
            query: { listtype: "activity", code: cat,title:cat },
        });
        // if (cat.items.length != 0) {
        //     for (var i = 0; i < cat.items.length; i++) {
        //         codes.push(cat.items[i].id);
        //     }
        //     this.$router.push({
        //         path: "/listPage",
        //         query: { listtype: "category", code: codes.join(",") ,title:cat.name},
        //     });
        //   }else {
        //   this.$router.push({
        //       path: "/listPage",
        //       query: { listtype: "category", code: cat.id,title:cat.name },
        //   });
        // }
     
     },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.text{
  font-size: 18px;font-weight: 700;color:#fff;
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
}
.title {
  margin-bottom: 15px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
