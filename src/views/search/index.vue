<template>
  <div class="hello">
    <Product :productArr="dataList"></Product>
    <div class="button">
        <el-button v-if="finished == false" type="primary" plain round @click="more" :loading="loading">{{$t('message.显示更多')}}<i class="el-icon-bottom el-icon--right"></i></el-button>
        <span v-else>{{$t('message.没有更多了')}}</span>
    </div>
  </div>
</template>

<script>
import Product from '../../components/Product'
export default {
  name: 'HelloWorld',
  components: {
      Product
    },
  data () {
    return {
        msg: 'Welcome to Your Vue.js App',
        searchStr: "",
        offset: 100,
        pagesize: 10,
        pagenum: 1,
        total: 0,
        dataList: [],
        loading: false,
        finished: false,
        refreshing: false

    }
  },
  beforeRouteUpdate(to, from, next) {
    //在当前路由改变，但是该组件被复用时调用
    //对于一个带有动态参数的路径 /good/:id，在 /good/1 和 /good/2 之间跳转的时候，
    // 由于会渲染同样的good组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // console.log(this, 'beforeRouteUpdate'); //当前组件实例
    // console.log(to, '组件独享守卫beforeRouteUpdate第一个参数');
    // console.log(from, '组件独享守beforeRouteUpdate卫第二个参数');
    // console.log(next, '组件独享守beforeRouteUpdate卫第三个参数');
    this.searchStr = to.params.search
    this.getList();
    console.log(this.$route.params);
    next();
  },
  created(){
      console.log(this.$route.params);
      this.searchStr = this.$route.params.search
      this.getList();
  },
  methods:{
      more(){
            this.pagenum ++
            this.getList();
      },
      // 获取数据
      getList() {
        // if (this.searchStr == "") {

        //   return
        // }

        this.loading = true;
        this.$request.fetchCommodityList(
          "search",
          this.searchStr,
          this.pagesize,
          this.pagenum
        )
          .then(res => {
            // console.log('条件查询',res);
            // this.dataList = res.data.items;
            // this.total = res.data.total;
            // this.loading = false;
            if (res.code == 0) {
              this.total = res.data.total;
              this.dataList.push(...res.data.items);
              this.loading = false;
            }
            if (this.dataList.length >= this.total) {
              this.finished = true;
            }
          });
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.button{
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 20px;
    /deep/ .el-button--primary.is-plain{
        color: #ff9000;
        background: #fff;
        border-color: #ff9000;
    }
    /deep/ .el-button--primary.is-plain:hover{
        background: #ff9000;
        color: #fff;
    }
    /deep/ .el-button.is-round{
        padding: 13px 60px;
    }
}
</style>
