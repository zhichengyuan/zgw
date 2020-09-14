<template>
  <div class="activity">
    <h2 class="title" v-if="activitys.length != 0">{{$t("message.首页活动")}}</h2>
    <!-- <span>{{activitys}}</span> -->
    <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="(o) in activitys"
        :key="o"
        
        style="text-align:center;background: linear-gradient(to top right, #FF9500, #ff5000);line-height: 45px;border-radius: 22px;cursor:pointer"
      >
        <div style="" @click="goClassly(o)"><span class="text" >{{o}}</span></div>
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
        if (element != "Деятельность на первой странице") {
          a.push(element);
        }
      });
      return a
    },
    
  },
  methods:{
    //跳转分类页面
     goClassly(cat){
        let codes = [];
        this.$router.push({
            path: "/listPage",
            query: { listtype: "activity", code: cat,title:cat },
        });
     
     },
  }
}
</script>

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
  font-weight: 700;
    font-size: 36px;
    line-height: 48px;
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
