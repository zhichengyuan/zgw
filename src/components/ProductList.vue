<template>
  <div class="productList">
    <h2 class="title">{{title}}</h2>
    <product :productArr="list"></product>
    <div class="button">
        <el-button v-if="finished == false" type="primary" plain round @click="more" :loading="loading">{{$t('message.显示更多')}}<i class="el-icon-bottom el-icon--right"></i></el-button>
        <span v-else>{{$t('message.没有更多了')}}</span>
    </div>
  </div>
</template>

<script>
import { fetchCommodityList } from "@/api/apis";
import Product from './Product'
export default {
  name: 'productList',
  components: {
      Product
    },
  props: {
        commodity: {
        type: Object,
            default: () => {
                return {};
            }
        },
        title: {
        type: String,
            default: () => {
                return 'Pекомендовать товар '
            }
        }
    },
   
  data () {
    return {
        currentDate: new Date(),
        number:10,
        moreProduct:false,
        defaultTitle:"推荐商品",
        //imgUrlPath: ImgUrlPath.ImgUrlPath,
        offset: 100,
        pagesize: 12,
        pagenum: 1,
        total: 0,
        dataList: [],
        list:[],
        loading: false,
        finished: false,
        refreshing: false
        // curtime: new Date().getTime()
    }
  },

  mounted(){
      this.getList();
  },
  watch: {
    commodity(newV,oldV) {
        this.onRefresh();
      } ,
     
    },
    
  methods:{
      //跳转详情页面
      toDetail(item){
        this.$router.push({
              path: "/product/" + item._id,
          });
      },
      more(){
          this.pagenum ++
          this.getList();
      },
      onRefresh() {
        this.pagenum = 1;
        this.finished = false;
        
        this.getList();
        this.refreshing = false;
        
      },
      // 获取数据
      getList() {
          let that = this;
        this.loading = true;
        this.$request.fetchCommodityList(  
          this.commodity.listtype,
          this.commodity.code,
          this.pagesize,
          this.pagenum
        )
          .then(res => {
                that.loading = false;
            if (res.code == 0) {
              if(this.pagenum == 1) {
                this.list = res.data.items;
              }else {
                this.list = this.list.concat(res.data.items);
              }
              this.dataList = this.list;
              this.total = res.data.total;
              if (this.dataList.length >= this.total) {
                this.finished = true;
              }
            }

          }).catch(()=>{
            this.finished = true;
          });
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.productList{
    padding-bottom: 50px;
    .buttom-margin{
      margin-bottom: 20px;
    }
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
}
.title{
  
 font-weight: 700;
    font-size: 36px;
    line-height: 48px;
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
    clear: both
}
</style>
