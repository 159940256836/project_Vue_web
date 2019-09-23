<template>
    <div class="help common help_common">
        <div class="bannerimg" style="width:1200px;">
            <span>{{$t("footer.helpCenter")}}</span>
        </div>
         <!-- <img class="bannerimg"> -->
        <div class="help_container">
            <!-- <h1>{{cateTitle}}</h1> -->
            <!-- <h1>{{$t("footer.helpCenter")}}</h1> -->
            <div style="display:flex; height:50px;line-height:50px; text-align:center; background:#f4f6f8 !important; cursor: pointer;">
                <div style="margin-left:10px;margin-left:30px; text-aling:center;" v-for="(item, index) in selectList" :key='index' class="select_list" :class="cate == item.status ? 'on' : ''" @click="changeStatus(item.status)">{{item.klassName}}</div>
            </div>
            <div></div>
            <div class="list">
                <!-- <router-link class="item" v-for="(item,index) in list" :key="index" :to="{path:'helpdetail',query:{cate:cate,id:item.id,cateTitle:cateTitle}}"> -->
                <router-link class="item" v-for="(item,index) in list" :key="index" :to="{path:'helpdetail',query:{id:item.id}}">
                    <span class="text">{{item.title}}</span>
                    <img v-show="item.isTop==0" class="iconimg" src="../../assets/images/icon-top.png" alt="">
                    <span class="time">
                        {{item.createTime}}
                    </span>
                </router-link>
                <!-- <router-link class="item" v-for="(item,index) in list" :key="index" :to="{path:'helpdetail',query:{id:item.id}}"></router-link> -->
            </div>
            <div v-show="list.length == 0" style="text-align:center">
                <div style="margin-top:175px;">{{ $t("common.nodata") }}</div>
                <!-- <img src="../../assets/images/noData.png" alt="" style="width:15%;margin-top: 55px;"> -->
            </div>

        </div>
        <div class="page Pagination_page" v-show="showPage" style="width:1200px; margin:39px auto;">
                <Page :total="total" :pageSize="pageSize" :current="pageNo" @on-change="pageChange" show-elevator></Page>

            </div>
        <!-- 6.24修改 -->


    </div>
</template>
<style lang="scss" scoped>
.select_list[data-v-9dbbb4ae]:hover{
    color:#D5382B;
}
.list .item[data-v-9dbbb4ae]{
    color:#333 !important;
}
// lhl
.select_list{
    // background:#2d8cf0;
    color:#333;
    cursor: pointer;
}
.select_list:hover{
    color:#D5382B;
}
.select_list.on{
    color: #D5382B !important;
    border-bottom: 2px solid #D5382B;
}
.helpList_page{
    margin-top:20px;
    text-align:right;
}
.help .bannerimg[data-v-9dbbb4ae]{
    width:1200px;
}
.help_common{
    background:#f4f6f8 !important;
}
.helplist {
    width: 60%;
    margin: 0 auto;
    padding: 80px 0;
    min-height:569px!important;
    .container {
        > h1 {
            text-align: center;
            margin: 30px 0 20px 0;
        }
    }
}
.help {
  background: white;
  padding-top: 60px;
  height: 100%;
  background-size: cover;
  position: relative;
  overflow: hidden;
  padding-bottom: 50px;
//   padding-top: 60px;
}
.help .bannerimg {
    display: block;
    // 6.22修改
    // width: 100%;
    // width:1200px;
    height:85px;
    margin:0 auto;
    font-size:20px;
    color:rgba(51,51,51,1);
    background:#f4f6f8;
    line-height:85px;
    span{
        margin-left:31px;
    }


}
.help_container {
   width:1200px;
   margin:0 auto;
    height: 100%;
    min-height: 389px;
    background:#f4f6f8;
    > h1 {
        font-size: 32px;
        line-height: 1;
        padding: 110px 0;
        text-align: center;
        color:#333333;
    }
}
.list {
    font-size: 14px;
    margin-top:22px;
    .item {
        color: #333333;
        display: block;
        line-height: 50px;
        // border-bottom: 1px solid #f0f0f0;
        cursor: pointer;
        padding:0 31px;
        .iconimg {
            width: 14px;
            vertical-align: sub;
            margin-left: 20px;
        }
        .time {
            float: right;
            color: #333333;
            font-size: 14px;
        }
    }
    .item:nth-child(2n-1){
        background:#fff;
    }
     .item:nth-child(2n){
        background:#f4f6f8;
    }
}
.route-wrap {
    font-size: 14px;
    a {
        color: #3399ff;
    }
}
.page {
    margin-top: 20px;
    text-align: right;
}
</style>
<style lang="scss">
.Pagination_page{
    .ivu-page-next, .ivu-page-prev{
        background: transparent !important;
    }
    .ivu-page-item-jump-next, .ivu-page-item-jump-prev, .ivu-page-next, .ivu-page-prev{
        border: 0;
    }
    .ivu-page .ivu-page-item:hover{
        border: 0;
    }
    .ivu-page-item{
        background: transparent;
        border: none;
    }
    .ivu-page-options-elevator input{
        background: transparent;
        border: 1px solid rgba(128,144,175,1);
        text-align:center;
        color:#fff;
        width:38px;
        height:20px;
    }

}
</style>
<script>
export default {
  data() {
    return {
      cate: 0,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      list: [],
      cate: 0,
      showPage: false
    }
  },
  created() {
        // this.$store.commit("navigate", "nav-uc");
        // const { cate, cateTitle } = this.$route.query;
        // this.cate = cate;
        // this.cateTitle = cateTitle;
    this.getData()
    this.settiele()
  },
  computed: {
    selectList() {
      var list = []
      list.push({ status: 0, klassName: this.$t('footer.RecommendedCommission') })
      list.push({ status: 1, klassName: this.$t('footer.question') })
      list.push({ status: 2, klassName: this.$t('footer.Recharguide') })
      list.push({ status: 3, klassName: this.$t('footer.Tradiguide') })
      return list
    }
  },
  watch: {
    $route(to, from) {
            // this.getAllData();
    }
  },
  methods: {
    pageChange(data) {
      this.pageNo = data
      this.getData()
    },
    changeStatus(n) {
      this.pageNo = 1
      this.cate = n
      this.getData()
    },
    getAllData() { // 查询所有帮助
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        cate: this.cate
      }
      this.$http
                // .post(this.host + "/uc/ancillary/system/help", params)
                .post(this.host + '/uc/ancillary/more/help/page', params)
                .then(res => {
                  if (res.status == 200 && res.body.code == 0) {
                    this.list = res.body.data.content
                  } else {
                    this.$Message.error(res.body.message)
                  }
                })
    },
    getData() { // 查询指定类型的帮助;
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        cate: this.cate
      }
      this.$http
                .post(this.host + '/uc/ancillary/more/help/page', params)
                .then(res => {
                  if (res.status == 200 && res.body.code == 0) {
                    if (res.body.data.totalElements > 10) {
                      this.showPage = true
                    } else {
                      this.showPage = false
                    }
                    this.list = res.body.data.content
                    this.total = res.body.data.totalElements
                  } else {
                    this.$Message.error(res.body.message)
                  }
                })
    }
  },
  mounted() {
        // const doc = document.body
        // const sreenHeight = doc.offsetHeight;
        // const headerHeight = doc.getElementsByTagName("header")[0].offsetHeight;
        // const footerHeight = doc.getElementsByTagName("footer")[0].offsetHeight;
        // const contentHeight = doc.getElementsByClassName("helplist")[0];
        // const bodyHeight = sreenHeight - headerHeight - footerHeight;
        // contentHeight.style.minHeight = bodyHeight + "px";
  }
}
</script>


