<template>
  <el-row :gutter="20" class="detail">
    <el-col class="buttom-margin" :xs="6" :sm="4" :md="4" :lg="4" :xl="4" v-for="(o) in productArr" :key="o._id">
      <div @click="toDetail(o)">
        <el-card shadow="hover" :body-style="{ padding: '5px',borderRadius:'20px' }">
          <img :src="$imgpath(o.albumPics[0])" class="image" />
          <div style="padding: 14px;">
            <div class="batch" v-if="$store.state.getrole[0] == 'b'">
              <span>{{$t('message.批发价')}}</span>
              <span>₽{{ o.bradePrice}}</span>
            </div>
            <span>{{o.price}}₽</span>
            <div class="bottom clearfix">
              <!-- <time class="time">{{ o.name }}</time> -->
              <p class="time">{{ o.name }}</p>
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { fetchCommodityList } from "@/api/apis";
export default {
  name: "productList",
  props: {
    productArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    //跳转详情页面
    toDetail(item) {
      this.$router.push({
        path: "/product/" + item._id,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.detail{
  /deep/ .el-card{
    height: 270px;
    img{
      max-height: 200px;
      min-height: 180px;
    }
  }
}
.batch {
  color: green;
  border: 1px dashed #ff9000;
}

.batch span {
  margin: 3px;
  
}
.buttom-margin {
  margin-bottom: 20px;
}

.title {
  margin-bottom: 15px;
}
.time {
  font-size: 13px;
  color: #999;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
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
