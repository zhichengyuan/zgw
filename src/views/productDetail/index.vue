<template>
  <div class="min-content">
    <div class="product-content">
      <div class="detail">
        <div class="detail-container">
          <!-- 产品分类路径 面包屑 -->
          <div class="classPath">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 商品名字-->
          <div class="pro-name">
            <!-- 名字 -->
            <el-row>
              <el-col :span="12">
                <div class="grid-content">
                  <span class="brand">ASICS / GEL-CONTEND 6 TWIST运动鞋</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content"></div>
              </el-col>
            </el-row>
          </div>
          <!-- 产品浏览量 -->
          <div class="pro-views">
            <el-row>
              <el-col :span="2">
                <div class="grid-content article">
                  <span class="art">文章:</span>
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
                  <span>117则评论</span>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="grid-content">
                  <span>超过1700次购买</span>
                </div>
              </el-col>
              <el-col :span="15">
                <div class="grid-content"></div>
              </el-col>
            </el-row>
          </div>
          <!-- 产品细节放大 以及购买 -->
          <div class="pro-card">
            <el-row>
              <!-- 左边 -->
              <div class="card-left">
                <el-col :span="10">
                  <div class="grid-content">
                    <el-row>
                      <!-- 放大图 -->
                      <el-col :span="24">
                        <div class="grid-content container_3d">
                          <pic-zoom :url="active" :scale="2" />
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
                                      :class="{'current':index==currentIndex}"
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
                <el-col :span="14">
                  <div class="grid-content">
                    <div class="price">
                      <div class="cost">
                        <div class="inner-price">
                          <span class="final-price">2995₽</span>
                          <span class="old-price">5990₽</span>
                        </div>
                      </div>
                    </div>
                    <div class="sku-info">
                      <span class="colorSku">规格：</span>
                      <span class="colorInfo">请选择</span>
                    </div>
                    <div class="sku-select">
                      <ul>
                        <li class="pro-specifi">
                          <a href="#">标签一</a>
                        </li>
                        <li class="pro-specifi">
                          <a href="#">标签一</a>
                        </li>
                        <li class="pro-specifi">
                          <a href="#">标签一</a>
                        </li>
                        <li class="pro-specifi">
                          <a href="#">标签一</a>
                        </li>
                        <li class="pro-specifi">
                          <a href="#">标签一</a>
                        </li>
                        <li class="pro-specifi">
                          <a href="#">标签一</a>
                        </li>
                        <li class="pro-specifi">
                          <a href="#">标签一</a>
                        </li>
                        <li class="pro-specifi">
                          <a href="#">标签一</a>
                        </li>
                        <li class="pro-specifi">
                          <a href="#">标签一</a>
                        </li>
                        <li class="pro-specifi">
                          <a href="#">标签一</a>
                        </li>
                      </ul>
                    </div>
                    <div class="addCart">
                      <div class="cart-btn">
                        <el-button class="add-btn">加入购物车</el-button>
                      </div>
                    </div>
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>
          <!-- 产品详情 -->
          <div class="pro-detail">
            <h1 style="text-align:center;font-weight:700;margin-top:100px">详情内容</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PicZoom from "vue-piczoom";
export default {
  name: "login",
  components: { PicZoom },
  data() {
    return {
      value: 3.7,
      currentIndex: 0,
      active:'',
      img:['https://img1.wbstatic.net/big/new/12500000/12502409-1.jpg',"https://img2.wbstatic.net/big/new/12990000/12998540-1.jpg","https://img1.wbstatic.net/big/new/12500000/12502409-2.jpg","https://img1.wbstatic.net/big/new/12500000/12502409-3.jpg"],
      // img:['https://img1.wbstatic.net/big/new/12500000/12502409-1.jpg',]
    };
  },
  created(){
    this.active = this.img[0]
  },
  mounted() {},
  methods: {
    selectPic(index) {
      this.active = this.img[index];
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-carousel__item img {
  color: #475669;
  opacity: 0.75;
  margin: 0 75px;
  width: 75px;
  &.current {
    border: 2px solid #ff9000;
  }
}

// .current {
//   border: 2px solid #ff9000;
// }

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
