<template>
  <div class="min-content">
    <div class="product-content">
      <div class="detail">
        <div class="detail-container">
          <!-- 产品分类路径 面包屑 -->
          <!-- <div class="classPath">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>-->
          <!-- 商品名字-->
          <div class="pro-name">
            <!-- 名字 -->
            <el-row>
              <el-col :span="12">
                <div class="grid-content">
                  <span class="brand">{{product.name}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content"></div>
              </el-col>
            </el-row>
          </div>
          <!-- 产品浏览量 -->
          <!-- <div class="pro-views">
            <el-row>
              <el-col :span="2">
                <div class="grid-content article">
                  <span class="art">{{$t('message.文章:')}}</span>
                  <span>11329342</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content">
                  <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="grid-content">
                  <span>{{$t('message.117则评论')}}</span>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="grid-content">
                  <span>{{$t('message.超过1700次购买')}}</span>
                </div>
              </el-col>
              <el-col :span="15">
                <div class="grid-content"></div>
              </el-col>
            </el-row>
          </div>-->
          <!-- 产品细节放大 以及购买 -->
          <div class="pro-card">
            <el-row>
              <!-- 左边 -->
              <div class="card-left">
                <el-col  :xs="6" :sm="10" :md="10" :lg="10" :xl="10">
                  <div class="grid-content">
                    <el-row>
                      <!-- 放大图 -->
                      <el-col :span="24">
                        <div class="grid-content container_3d" v-if="img.length>0">
                          <pic-zoom :url="active" :scale="3" />
                        </div>
                      </el-col>
                      <!-- 小图 -->
                      <el-col :span="24">
                        <div class="grid-content bg-purple">
                          <div class="carousel-wrapper">
                            <div class="scrollImage">
                              <!-- <ul>
                                <li class="product-pic" v-for="(item,index) in 5" :key="index" @click="selectPic(index)" >
                                  <a  :class="{'current':index==currentIndex}">
                                    <img
                                      src="//img2.wbstatic.net/tm/new/11320000/11329342-1.jpg"
                                      alt
                                    />
                                  </a>
                                </li>
                              </ul>-->

                              <el-carousel
                                :interval="4000"
                                type="card"
                                height="105px"
                                arrow="always"
                                :loop="false"
                                :initial-index="1"
                                indicator-position="none"
                                :autoplay="false"
                              >
                                <el-carousel-item v-for="(item,index) in img" :key="index">
                                  <div @click="selectPic(index)">
                                    <img
                                      :class="{'currentIndex':index==currentIndex}"
                                      :src="item"
                                      alt
                                    />
                                  </div>
                                </el-carousel-item>
                              </el-carousel>
                            </div>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </div>
              <!-- 右边 -->
              <div class="card-right">
                <el-col  :offset="2" :xs="6" :sm="12" :md="12" :lg="12" :xl="12">
                  <div class="grid-content">
                    <div class="price">
                      <div class="cost">
                        <div class="inner-price">
                          <span class="final-price" v-if="skuPrice != ''">{{ skuPrice }}₽</span>

                          <!-- <div class="skuPrice" v-if="items.price">{{item.price}}</div> -->

                          <span
                            class="final-price"
                            v-if="skuPrice == '' && $store.state.getrole.length == '0'"
                          >{{ product.price }}₽</span>
                          <span
                            class="final-price"
                            v-if="skuPrice == '' && $store.state.getrole[0] == 'b'"
                          >{{ product.bradePrice }}₽</span>
                          <span
                            class="final-price"
                            v-if="skuPrice == '' && $store.state.getrole[0] == 'c'"
                          >{{ product.price }}₽</span>

                          <!-- <span class="final-price">2995₽</span> -->
                          <!-- <span class="old-price">5990₽</span> -->
                          <div class="skuNum" v-if="select==true">{{$t('message.库存')+'：'+skuStock}}</div>
                          <!-- {{stock}} -->
                          <div
                            class="skuNum"
                            v-else-if="stock"
                          >{{$t('message.库存') +stock + $t('message.件')}}</div>
                          <div
                            class="skuNum"
                            v-else
                          >{{$t('message.库存') +product.stock + $t('message.件')}}</div>
                          <div class="pitch" v-if="text">{{$t('message.已选')+'：' + text}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="sku-info">
                      <span class="colorSku">{{$t('message.规格：')}}</span>
                      <span class="colorInfo">{{$t('message.请选择')}}</span>
                    </div>
                    <div class="sku-select">
                      <ul>
                        <li
                          class="pro-specifi"
                          v-for="(item,index) in skuDataList"
                          @click="getSkus(index)"
                          :key="index"
                          :class="{'current':current===index}"
                        >
                          <!-- {{Object.values(item.attributeList)}} -->
                          <a
                            v-for="(item,index) in Object.values(item.attributeList)"
                            :key="index"
                          >{{item}}</a>
                        </li>
                        <div v-if="skuDataList.length<=0">
                          <h3>{{$t('message.此商品无具体的商品选择,可直接加入购物车')}}</h3>
                        </div>
                      </ul>
                    </div>
                    <div class="addCart">
                      <div class="cart-btn">
                        <el-button class="add-btn" @click="submitCartItem">{{$t('message.加入购物车')}}</el-button>
                      </div>
                    </div>
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>
          <!-- 产品详情 -->
          <div class="pro-detail">
            <h1
              style="text-align:center;font-weight:700;margin-top:100px;margin-bottom:50px"
            >{{$t('message.产品参数')}}</h1>
            <div>
              <table border style="width: 100%" v-if="attarList.length>0">
                <tr>
                  <th v-for="(item,index) in attarList" :key="index">{{item.name}}</th>
                </tr>
                <tr>
                  <th v-for="(item,index) in attarList" :key="index">{{item.value}}</th>
                </tr>
              </table>
              <h3 v-else style="text-align:center;">{{$t('message.此商品无产品参数，可从图中了解具体的信息')}}</h3>
            </div>
            <h1 style="text-align:center;font-weight:700;margin-top:100px">{{$t('message.详情内容')}}</h1>

            <div v-if="product.detailMobileHtml" class="container" v-html="getMobile()"></div>
            <div v-else style="text-align:center;">{{$t('message.暂无数据')}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PicZoom from "vue-piczoom";
import { getProduct, getProductBysn, imgpath, getSkulist } from "@/api/apis";
export default {
  name: "login",
  components: { PicZoom },
  data() {
    return {
      select: false,
      attarList: [],
      current: "",
      value: 3.7,
      currentIndex: 0,
      active: "",
      product: {}, //商品数据
      skuDataList: [], //sku的数据
      stock: 0, //全部的库存
      skuStock: 0, //sku库存
      skuPrice: "", //sku价格
      selectedSku: null, //传入购物车数据
      detailMobileHtml: "",
      text: "",
      img: [
        // "https://img1.wbstatic.net/big/new/12500000/12502409-1.jpg",
        // "https://img2.wbstatic.net/big/new/12990000/12998540-1.jpg",
        // "https://img1.wbstatic.net/big/new/12500000/12502409-2.jpg",
        // "https://img1.wbstatic.net/big/new/12500000/12502409-3.jpg",
      ],
      // img:['https://img1.wbstatic.net/big/new/12500000/12502409-1.jpg',]
    };
  },
  created() {
    // console.log(window.scrollY,"aaa")
    this.active = this.img[0];
    // console.log("路由参数", this.$route.params);
    this.getProducts();
    // this.getMobile();
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    // 设置产品规格弹层
    attributeList() {
      let attributeList = this.product.attributeList;
      // console.log(attributeList)
      this.attarList = [];
      for (let name in attributeList) {
        this.attarList.push({
          name,
          value: attributeList[name],
        });
      }
      // console.log(this.attarList, "arrt");
    },

    selectPic(index) {
      this.active = this.img[index];
      this.currentIndex = index;
    },
    getMobile() {
      let html = this.product.detailMobileHtml.replace(
        RegExp("<img ", "g"),
        "<img style='width:100%'"
      );
      html = html.replace(
        RegExp('src="', "g"),
        'src="' + this.$request.imgpath("")
      );
      // console.log(html);
      // this.detailMobileHtml = html;
      return html;
    },
    // 获取商品
    getProducts() {
      this.$request.getProduct(this.$route.params.id).then((res) => {
        // console.log(res,"277");
        let imgs = res.data.albumPics;
        this.img = this.editPic(imgs);
        this.active = this.img[0];
        this.product = res.data;
        this.attributeList();
        this.getSkulist();
      });
    },
    //编辑图片路径
    editPic(arr) {
      let imgs = [];
      for (let i = 0; i < arr.length; i++) {
        imgs.push(this.$imgpath(arr[i]));
      }
      return imgs;
    },
    // 获取sku
    getSkulist() {
      // console.log(this.product.productSn);
      this.$request
        .getSkulist(this.product.productSn, this.$store.state.sid)
        .then((res) => {
          if (res.code == 0) {
            // console.log("res", res);
            // this.defaultSkuImg = this.product.albumPics[0]; //?
            this.skuDataList = res.data.items;
            this.stock = 0;
            this.skuDataList.forEach((item) => {
              this.stock += parseInt(item.skunum);
            });
          }

          // if (res.data.items) {
          //   this.skuData = res.data.items;
          //   // skus.forEach((sku, index) => {
          //   //   if (Object.values(sku.attributeList).length == 0) {
          //   //     datas.splice(index, 1);
          //   //   }
          //   // });

          //   // this.skuData = datas;
          //   this.skuData.forEach(item => {
          //     this.stock += parseInt(item.skunum);
          //   });
          // } else {
          //   this.skuData = null;
          //   this.stock = this.items.stock;
          // }
        });
    },
    // 选择sku规格
    getSkus(index) {
      this.select = true;
      this.current = index;
      let sku = this.skuDataList[index];
      // console.log(sku);
      // console.log(this.$imgpath(sku.pic));
      this.active = this.$imgpath(sku.pic);
      this.$store.state.getrole;
      if (this.$store.state.getrole[0] == "b") {
        sku.skuprice = sku.skuBradePrice;
      }
      // console.log("sku", sku);

      this.colorIndex = index;
      this.selectedSku = sku;
      this.skuPrice = sku.skuprice;
      this.changeSkuImg = sku.pic;
      this.skuStock = sku.skunum;
      this.text = Object.values(sku.attributeList).join("-");
      this.selectedSku.productNumber = this.productNumber;
    },
    submitCartItem() {
      // console.log(this.skuDataList);
      if (this.skuDataList.length == 0) {
        const noneSku = {
          selectStock: this.product.stock,
          attributeList: { 商品规格: "该商品没有属性" },
          productId: this.product._id,
          categoryNameRu: this.product.categoryNameRu,
          categoryName: this.product.categoryName,
          skuprice: this.product.price,
          // productNumber: this.noSelectNum,
          productNumber: 1,
          pic: this.product.albumPics[0],
          name: this.product.name,
          runame: this.product.runame,
          isChecked: false,
          productSn: this.product.productSn,
          skucode: this.product.productSn,
          skuImg: this.product.albumPics[0],
        };
        // console.log(noneSku);
        if (noneSku.selectStock == 0) {
          this.$message({
            message: this.$t("message.库存不足，无法下单"),
            type: "warning",
          });
        } else {
          this.$store.dispatch("addCart", noneSku);
          this.$message({
            message: this.$t("message.商品已加入购物车"),
            type: "success",
          });
          this.show = false;
          this.select = false;
          this.current = "";
        }
      } else {
        if (!this.selectedSku) {
          //whm?
          this.$message({
            message: this.$t("message.请选择商品规格"),
            type: "warning",
          });
          // this.$toast({
          //   // this.$message('这是一条消息提示');
          //   message: this.$lang["请选择商品规格"],
          // });
        } else {
          let sku = this.selectedSku;
          // console.log(sku);

          const localInfo = {
            selectStock: sku.skunum,
            attributeList: sku.attributeList,
            productId: this.product._id,
            categoryNameRu: this.product.categoryNameRu,
            categoryName: this.product.categoryName,
            skuprice: this.skuPrice,
            // productNumber: sku.productNumber,
            productNumber: 1,
            skuImg: this.product.albumPics[0],
            pic: sku.pic,
            name: this.product.name,
            runame: this.product.runame,
            isChecked: false,
            productSn: sku.productSn,
            skuplace: sku.skuplace,
            skucode: sku.skucode,
          };
          if (localInfo.selectStock == 0) {
            this.$message({
              message: this.$t("message.库存不足，无法下单"),
              type: "warning",
            });
          } else {
            this.$store.dispatch("addCart", localInfo);
            this.$message({
              message: this.$t("message.商品已加入购物车"),
              type: "success",
            });
            this.show = false;
            this.select = false;
            this.current = "";
            // this.skuPrice = "";
            this.skuStock = 0;
            this.selectedSku = null;
            this.text = "";
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-right .grid-content {
  padding-left: 50px;
}
/deep/ .magnifier-box {
  border: 1px solid;
  img {
    height: 100%;
  }
}
.el-carousel__item img {
  color: #475669;
  opacity: 0.75;
  margin: 0 75px;
  width: 75px;
  &.currentIndex {
    border: 2px solid #ff9000;
  }
}

.min-content {
  position: relative;
  background-color: #fff;
  .product-content {
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 auto;
    min-height: calc(100vh - 578px - 208px + 5px);
    .detail {
      width: 100%;
      max-width: 1500px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 30px;
      margin: 0 auto;
      .detail-container {
        min-width: 960px;
        .classPath {
          margin: 0;
          padding: 32px 0 16px;
          position: relative;
        }
        .pro-name {
          .brand {
            color: #000;
            font-weight: 700;
            font-size: 36px;
            line-height: 48px;
          }
        }
        .pro-views {
          margin-top: 25px;
          .article {
            display: inline-block;
            .art {
              color: #8b8b8b;
            }
          }
        }
        .pro-card {
          padding-top: 30px;
          .card-left {
            .carousel-wrapper {
              .prev-btn {
                border: 0;
                cursor: pointer;
                left: 0;
                position: absolute;
                width: 25%;
                top: 0;
                background: #fff;
                > i {
                  line-height: 20px;
                }
              }
              .next-btn {
                border: 0;
                cursor: pointer;
                left: 0;
                position: absolute;
                width: 25%;
                background: #fff;
                bottom: 0;
                > i {
                  line-height: 20px;
                }
              }
              .scrollImage {
                overflow: hidden;
                visibility: visible;
                position: relative;
                z-index: 2;
                width: 80%;
                margin: 0 auto;
                padding-top: 30px;
                .product-pic {
                  display: block;
                  padding: 0 0 16px;
                  overflow: visible !important;
                  position: relative;
                  //   > a {
                  //     border-radius: 3px;
                  //     -webkit-box-sizing: border-box;
                  //     box-sizing: border-box;
                  //     display: block;
                  //     width: 80px;
                  //     height: 105px;
                  //     text-align: center;
                  //     cursor: pointer;
                  //     margin: 0 auto;
                  //     &.current {
                  //       border: 2px solid #ff9000;
                  //     }
                  //   }
                }
              }
            }
            .container_3d {
              width: 600px;
              height: 500px;
              position: relative;
              > img {
                max-width: 100%;
                height: 500px;
                border: 0;
                vertical-align: middle;
                margin: 0 90px;
              }
            }
          }
          .card-right {
            box-sizing: border-box;

            padding: 0 0 0 72px;
            .price {
              margin: 100px 0 50px;
              .cost {
                margin: 0 0 16px;
                color: #8b8b8b;
                .inner-price {
                  margin: 0 44px 0 0;
                  cursor: pointer;
                  .final-price {
                    color: #000;
                    font-weight: 700;
                    font-size: 36px;
                    line-height: 48px;
                    margin-bottom: 20px;
                  }
                  .old-price {
                    text-decoration: line-through;

                    font-weight: 700;
                    position: relative;
                    margin: 8px 0 0 16px;
                  }
                }
              }
            }
            .sku-info {
              color: #8b8b8b;
              margin: 0 0 16px 0;
              .colorSku {
                color: #8b8b8b;
              }
              .colorInfo {
                color: #000;
              }
            }
            .sku-select {
              max-height: 194px;
              overflow: hidden;
              padding: 5px 200px 0 0;
              .pro-specifi {
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                border: 1px solid #e8e8e8;
                border-radius: 4px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                -webkit-box-shadow: inset 0 0 0 1px #fff;
                box-shadow: inset 0 0 0 1px #fff;
                color: #000;
                cursor: pointer;
                display: inline-block;
                height: 40px;
                margin: 0 8px 10px 0;
                min-width: 40px;
                padding: 10px;
                position: relative;
                text-align: center;
                &.current {
                  border: 2px solid #ff9000;
                }
              }
            }
            .addCart {
              margin: 35px 0 0;
              position: relative;
              .cart-btn {
                .add-btn {
                  width: 304px;
                  line-height: 1.1;
                  font-weight: 700;
                  -webkit-box-sizing: border-box;
                  box-sizing: border-box;
                  border-radius: 4px;
                  text-align: center;
                  cursor: pointer;
                  display: inline-block;
                  position: relative;
                  letter-spacing: 0;
                  color: #fff;
                  background: #ff9000;
                  border: 2px solid #ff9000;
                  font-size: 16px;
                  padding: 14px 25px 15px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
