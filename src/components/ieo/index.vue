<template>
    <div class="ieoWrapper i_content" @click='getDetail'>
        <div class="i_con">
            <div class="i_left">
                <div class="i_left_img">
                    <img :src="content.picView" alt="">
                </div>
                <div class="i_center" style="color:#8090AF; font-size:14px;">
                    <div><span style="color:#3399FF; font-size:20px;">{{content.ieoName}}</span><span style="margin-left:33px; font-size:16px;">{{content.haveCoin}}</span></div>
                    <div style="margin-top:38px;">{{$t('Ieo.totalSales')}}</div>
                    <div style="margin-top:32px">{{$t('Ieo.cycle')}}</div>
                    <div style="margin-top:34px">{{$t('Ieo.currency')}}</div>
                </div>
            </div>
            <div style="color:#3399FF; font-size:14px; text-align:right;">
                <div style="font-size:16px;" class="type" :class="statusClass">{{str}}</div>
                <div style="margin-top:36px;">{{content.saleAmount|threeComma}} {{content.saleCoin}}</div>
                <div style="margin-top:33px;">{{content.startTime|ymdFormat}} - {{content.endTime|ymdFormat}}</div>
                <div style="margin-top:36px">{{content.raiseCoin}}</div>
            </div>
        </div>


<!-- 
        <div class="topBox"> 
            <div class="topBox specail"><img :src="content.picView" alt=""><span>{{content.saleCoin}}</span></div>
             <div class="type" :class="statusClass">{{str}}</div>
        </div>
        <div class="abstract">
            {{content.ieoName}}
        </div>
        <div class="mainImg">
            <img :src="content.pic" alt="">
        </div>
        <ul>
            <li>
                <span>{{$t('Ieo.totalSales')}}</span>
                <span>{{content.saleAmount|threeComma}} {{content.saleCoin}}</span>
            </li>
            <li>
                <span>{{$t('Ieo.cycle')}}</span>
                <span>{{content.startTime|ymdFormat}} - {{content.endTime|ymdFormat}}</span>
            </li>
            <li>
                <span>{{$t('Ieo.currency')}}</span>
                <span>{{content.raiseCoin}}</span>
            </li>
        </ul> -->
    </div>
</template>
<script>
export default {
  name: 'IeoAbstract',
  data() {
    return {
      status: ''
    }
  },
  props: {
    content: Object
  },
  created() {
    const content = this.content,
      startTime = this.formatTime(content.startTime),
      nowTime = new Date().getTime(),
      endTime = this.formatTime(content.endTime),
      surplusAmount = content.surplusAmount > 0,
      resultFun = (time1, time2) => time1 - time2 > 0,
      compareStAndNow = resultFun(nowTime, startTime), // 查看当前时间是否在开始时间之后;
      compareNowAndEnd = resultFun(endTime, nowTime)// 查看当前时间是否在结束时间之前;
    let str = ''
    if (!compareStAndNow) {
            /* 预热中*/
      this.status = '预热中'
      str = this.$t('Ieo.preheating')
    } else if (compareStAndNow && compareNowAndEnd && surplusAmount) {
            /* 进行中*/
      this.status = '进行中'
      str = this.$t('Ieo.underway')
    } else if (!compareNowAndEnd || !surplusAmount) {
            /* 已完成*/
      this.status = '已完成'
      str = this.$t('Ieo.finished')
    }
    this.str = str
  },
  methods: {
    formatTime(date) {
      return new Date(date).getTime()
    },
    getDetail() {
      this.$router.push({
        name: 'IeoDetail',
        params: {
          id: this.content.id
        }
      })
    }
  },
  computed: {
    statusStr() {
      if (this.status == '预热中') {
        return this.$t('Ieo.preheating')
      } else if (this.status == '进行中') {
        return this.$t('Ieo.underway')
      } else if (this.status == '已完成') {
        return this.$t('Ieo.finished')
      }
    },
    statusClass() {
      if (this.status == '预热中') {
        return 'pink'
      } else if (this.status == '进行中') {
        return 'red'
      } else if (this.status == '已完成') {
        return 'yellow'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// lhl
.i_content{
    // padding-top: 42px;
    .i_con{
        display: flex;
        border-bottom: 1px solid rgba(107,120,149,1);
        padding-bottom: 40px;
        justify-content: space-between;
        .i_left{
            display: flex;
            .i_left_img{
                width:305px;
                height:195px;
                img{
                    width:305px;
                    height:195px;
                }
            }
            .i_center{
                margin-left:45px;
                text-align:left;
            }
        }
    }
}
.ieoWrapper_content{
    .ieoWrapper{
        width:1120px !important;
        height:277px !important;
        margin-left:40px !important;
        border-bottom:1px solid #2A3850 !important;
    }
}
.type.red:before{
    content: '';
    position: absolute;
    display: block;
    width: 8px;
    height: 8px;
    left: 85px;
    top: 50%;
    margin-top: -4px;
    border-radius: 50%;
    background:#00B274 !important;
}
.red{
    color:#00B274 !important;

}
.type{
    position: relative;
}
.type.yellow:before{
    content: '';
    position: absolute;
    display: block;
    width: 8px;
    height: 8px;
    left: 85px;
    top: 50%;
    margin-top: -4px;
    border-radius: 50%;
    background:#AAAAAA !important;
}
.yellow{
    color:#AAAAAA !important
}
.type.pink:before{
    content: '';
    position: absolute;
    display: block;
    width: 8px;
    height: 8px;
    left: 85px;
    top: 50%;
    margin-top: -4px;
    border-radius: 50%;
    background:#F15057 !important
}
.pink{

    color:#F15057 !important
}
.yure{
    color:red !important
}
%flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ieoWrapper {
    // border:1px solid #DDDDDD;
    // width: 31.8%;
    // background: rgb(17, 20, 36);
    // padding: 10px;
    // border-radius: 5px;
    // color: #fff;
    .topBox {
        @extend %flex;
        margin-bottom: 10px;
        .specail {
            margin-bottom: 0;
        }
        img {
            margin-right: 10px;
            width: 30px;
        }
        .type {
            // background: rgb(125, 131, 152);
            padding: 5px 20px;
            border-radius: 15px;
            &:before {
                display: inline-block;
                content: "";
                width: 10px;
                height: 10px;
                margin-right: 10px;
                border-radius: 50%;
                background-color: #fff;
            }
        }
    }
    .abstract {
        line-height: 2;
        font-size: 14px;
    }
    .mainImg {
        img {
            width: 99%;
            height: 160px;
            background-size:contain;
        }
    }
    > ul {
        @extend %flex;
        flex-wrap: wrap;
        li {
            width: 100%;
            @extend %flex;
            line-height: 2;
        }
    }
}

</style>


