<template>
  <div class="rotation">
    <el-carousel height="350px">
      <el-carousel-item v-for="(item,index) in swiperList" :key="index">
        <a :href="item.url" class="adds">
          <img :src="$imgpath(item.img)" alt="">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'rotation',
  props: {
    swiperList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
}
</script>
<style lang="scss" scoped>
.rotation{
  .adds{
    display: block;
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

</style>
