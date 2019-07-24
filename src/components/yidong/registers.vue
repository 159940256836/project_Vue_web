<template>
  <div class="registers" id='reg'>
      <!-- <div>{{agent}}</div>
      <div>{{mobile}}</div>
     <div @click='reg'>注册</div> -->
     <div class="toppp">
     </div>
      <div class="agent">
          <span>你的好友</span>
          <span>{{mobile || ''}}</span>
      </div>
      <div @click="bdmMax" class="zhuceId">邀请您注册BDW</div>
      <div class="btn">
          <button @click='reg'>立即注册</button>
      </div>
  </div>

</template>


<script>
export default {
  data() {
    return {
      value: [20, 50],
      agent: '',
      mobile: ''
    }
  },
  methods: {
    bdmMax() {
      this.$router.push('/bdm')
    },
    reg() {
      var par = '?agent=' + this.agent
      this.$router.push('/registe' + par)
    }
  },
  mounted() {
    this.agent = this.$route.query.agent
    this.mobile = this.$route.query.mobile ? this.$route.query.mobile.substr(0, 3) + '****' + this.$route.query.mobile.substr(7, 4) : ''
    document.getElementById('reg').style.height = document.documentElement.clientHeight + 'px'
  },
  component() {

  },
  created() {
    if (!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
      var par = '?' + location.href.split('?')[1]
      this.$router.replace('/Register' + par)
    }
  }
}
</script>

<style scoped lang="scss">
@import"../../styles/index.css";
.registers{
    background:#fff;
    .toppp{
    width:100%;
    height:4.44rem;
    background:url("../../assets/img/yd1.png") 0 0 no-repeat;
    background-size: 100%;
}
    .page-view{
    height:100%;
}
.agent{
    margin-top:1.34rem;
    color:#666666FF;
    font-size:0.3rem;
    text-align:center;
}
.zhuceId{
    margin-top:0.48rem;
    color:#666666FF;
    font-size:0.58rem;
    text-align:center;
    padding-bottom: 1.02rem;

}
.btn{
    width:3.33rem;
    height:0.8rem;
   border-radius:5px;
   margin:0 auto;
   button{
       width:3.33rem;
       height:0.8rem;
       font-size: 0.3rem;
       color:#fff;
       line-height:0.8rem;
       text-align:center;
       outline: none;
       border:0;
       background:#3399FF !important;

   }

}

}
</style>
