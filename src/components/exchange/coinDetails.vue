<template>
  <div class="coin-box">
    <div class="main-top">
      <div class="flex0">
        <img :src="coinInfo.url" alt="">
      </div>
      <div class="flex" style="width: 235px;">
        <!--币种名称-->
        <p style="font-weight: Bold;">{{coinInfo.coinName}}</p>
        <p>
          <span>{{ $t('exchange.coinDetails.coinName') }}</span>
          <span>{{coinInfo.coinFullName}}</span>
        </p>
        <p>
          <!--发行时间-->
          <span>{{ $t('exchange.coinDetails.publishTime') }}</span>
          <span>{{coinInfo.publishTime}}</span>
        </p>
        <p>
          <!--相关连接-->
          <span>{{ $t('exchange.coinDetails.officialWebsite') }}</span>
          <!--官网-->
          <a
            target="_blank"
            :href="coinInfo.officialWebsite"
            class="padding"
          >
            {{ $t('exchange.coinDetails.officialWebsite1') }}
          </a>
          <!--白皮书-->
          <a
            target="_blank"
            :href="coinInfo.whitePaper"
            class="padding"
          >
            {{ $t('exchange.coinDetails.whitePaper') }}
          </a>
        </p>
      </div>
      <div class="flex">
        <p>
          <!--发行价格-->
          <span>{{ $t('exchange.coinDetails.circulateVolume') }}</span>
          <span>{{coinInfo.publishPrice}}</span>
        </p>
        <p>
          <!--发行总量-->
          <span>{{ $t('exchange.coinDetails.publishVolume') }}</span>
          <span>{{coinInfo.publishVolume}}</span>
        </p>
      </div>
    </div>
    <div class="main-bottom">
      <!--币种介绍-->
      <p>{{ $t('exchange.coinDetails.summary') }}</p>
      <p>
        {{coinInfo.summary}}
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        detailsModal: false
      }
    },
    props: ['coinInfo'],
    methods: {},
    created() {},
    computed: {},
    watch:{}
  }
</script>
<style lang="scss">
  .coin-box {
    .main-top {
      display: flex;
      padding-bottom: 40px;
      .flex0 {
        width: 125px;
        height: 125px;
        text-align: center;
        margin-right: 40px;
        img {
          width: 100%;
        }
      }
      .flex {
        p {
          margin-bottom: 10px;
          .padding {
            display: inline-block;
            padding: 0 10px;
            background: #3399ff;
            color: #fff;
            font-size: 14px;
            text-align: center;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 15px;
            &:last-child {
              margin-right: 0;
            }
            &:hover {
              background: rgba(51, 153, 255, .85);
            }
          }
          &:first-child {
            font-size: 16px;
          }
          span {
            &:first-child {
              color: #8090af;
              font-size: 14px;
              margin-right: 35px;
            }
            &:last-child {
              font-size: 14px;
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
        &:last-child {
          width: 225px;
          margin: 35px 0 0 63px;
          p {
            span {
              &:last-child {
                display: inline-block;
                float: right
              }
            }
          }
        }
      }
    }
    .main-bottom {
      padding-top: 40px;
      border-top: 1px solid #2A3850;
      p {
        font-size: 14px;
        &:first-child {
          padding-bottom: 15px;
        }
        &:last-child {
          font-family: 'MicrosoftYaHei';
        }
      }
    }
  }
</style>
