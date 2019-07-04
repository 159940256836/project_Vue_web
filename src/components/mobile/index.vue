<template>
    <div id="mobile_home">
        <header>
            <div class="header-logo">
                <img src="./img/top_logo.png" alt="加载失败">
            </div>
        </header>
        <main>
            <div class="banner">
                <p>
                    <img src="./img/banner_text1.png" alt="加载失败" style="margin-top:1.63rem;height:.34rem;width:5.72rem;">
                </p>
                <p>
                    <img src="./img/banner_text2.png" alt="加载失败" style="margin-top:.28rem;height:.21rem;width:4.18rem;">
                </p>               
            </div>
            <div class="content">
                <p style="text-align:center">
                    <span class="register btn" @click="goRegister">立即注册</span>
                </p>
                <p style="text-align:center">
                    <span class="login btn" @click="goLogin">登录</span>
                </p>            
                <img src="./img/module.png" alt="加载失败" class="module">
                <p class="text">移动交易, 随时随地</p>
                <div class="terminal">
                    <div class="pc btn2" @click="goPc">
                        <span>电脑版</span>
                    </div>
                    <div class="mobile btn2" @click="goMobile">
                        <span>移动版</span>
                    </div>
                </div>
                <img src="./img/bottom_logo.png" alt="加载失败"  class="botton-logo">
            </div>
        </main>
        <footer v-if="footerIsShow">
            <img src="./img/logo.png" alt="加载事变" class="logo">
            <div class="logo-text">
                <p>BDW</p>
                <p>随时对地, 放心交易</p>
            </div>
            <span class="close" @click="footerIsShow = false">×</span>
            <span class="download-app" @click="goMobile">下载APP</span>
        </footer>
    </div>
</template>

<script>
export default {
  data() {
    return {
      footerIsShow: true
    }
  },
  methods: {
    goPc() {
      this.$router.push('/')
    },
    goMobile() {
      window.location.href = 'https://download.bdw.top'
    },
    goLogin() {
      this.$router.push('/login')
    },
    goRegister() {
      this.$router.push('/register')
    }
  },
  beforeRouteEnter(to, from, next) {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
    next()
  }
}
</script>

<style lang="scss" scoped>
@import './reset.css';
#mobile_home {
    height: 100%;
    font-size: 16px;
    color: #fff;
    background: #11132C;
    header {
        .header-logo {
            height: .88rem;
            line-height: .88rem;
            background: #11132C;
            text-align: center;
            img {
                height: .48rem;
                width: 2.39rem;
            }
        }
    }
    main {
        .banner {
            text-align: center;
            height: 4.29rem;
            background: url('./img/banner_bg.png') no-repeat center center;
            background-size: cover;
        }
        .content {
            background: #191D3A;
            padding-bottom: 1.96rem;
            .btn {
                display: inline-block;
                height: .9rem;
                line-height: .9rem;
                width: 6.7rem;
                text-align: center;
                border-radius:.05rem;
                cursor: pointer;
                font-size: .32rem;
            }
            .register {
                background: #3399FF;
                margin-top: .44rem;
            }
            .login {
                margin-top: .39rem;
                background: transparent;
                border:1px solid rgba(51,153,255,1);
            }
            .module {
                width: 100%;
            }
            .text {
                text-align: center;
                font-size: .4rem;
                height: .4rem;
                line-height: .4rem;
                margin-top: .82rem;
                margin-bottom: .67rem;
            }
            .terminal {
                text-align: center;
            }
            .btn2 {
                display: inline-block;
                height: .7rem;
                line-height: .7rem;
                width: 2.36rem;
                border-radius: .05rem;
                cursor: pointer;
                border: .01rem solid #3399FF; 
                color: #3399FF;
                text-indent: 1.02rem;
                font-size: .28rem;
            }
            .pc {
                background: url('./img/pc_icon.png') no-repeat .46rem .22rem;
                background-size: .3rem .27rem; 
            }
            .mobile {
                margin-left: .46rem;
                background: url('./img/mobile_icon.png') no-repeat .52rem .21rem;
                background-size: .2rem .28rem; 
            }
            .botton-logo {
                margin-top: .82rem;
                width: 5.93rem;
                height: .98rem;
            }
        }
    }
    footer {
        position: fixed;
        width:100%;
        height:1.4rem;
        padding-top: .28rem;
        background:rgba(14,14,40,0.5);
        bottom: 0;
        .logo {
            margin-left: .35rem;
            float: left;
            width: .87rem;
            height: .83rem;
        }
        .logo-text {
            width: 3.76rem;
            padding-left: .24rem;
            float: left;
            p:nth-child(1) {
                font-size:.34rem;
                height: .34rem;
                line-height: .34rem;
                margin-top: .06rem;
            }
            p:nth-child(2) {
                font-size:.26rem;
                height: .26rem;
                line-height: .26rem;
                margin-top: .17rem;
            }
        }
        .close {
            height: .38rem;
            width: .38rem;
            font-size: .36rem;
            position: absolute;
            padding: .02rem;
            top: .01rem;
            right: .26rem;
            cursor: pointer;
            text-align: center;
            line-height: .38rem;
            color: #FFFFFF;
        }
        .download-app {
            position: absolute;
            top: .42rem;
            right: .37rem;
            height: .7rem;
            width: 2.15rem;
            text-align: center;
            font-size: .3rem;
            color: #3399FF;
            border: .01rem solid #3399FF;
            border-radius:.05rem;
            line-height: .7rem;
            cursor: pointer;
        }
    }
}
</style>

