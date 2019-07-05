<template>
    <div class="my-modal" v-if="isShow">
        <p>{{ title }}</p>
        <div class="content">
            {{ content }}
        </div>
        <div class="footer-btn">
        <span @click="closeEvent">{{ okText }}</span>
        </div>
        <span class="my-modal-close" @click="closeEvent">×</span>
    </div>
</template>

<script>
export default {
    props:{
        openCallBack: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            isShow: false,
            title: '消息',
            content: null,
            okText: '好的'
        }
    },
    methods: {
        open(config) {
            this.isShow = true
            if(typeof config == 'string') {
                this.content = config
            }
            else if(typeof config == 'object') {
                if(config instanceof Array) {
                    return false
                }
                config.title ? this.title = config.title : null
                config.desc ? this.content = config.desc : null
                config.okText ? this.okText = config.okText : null
                this.isShow = true
            }
        },
        closeEvent() {
            this.isShow = false
        }
    },
}
</script>

<style lang="scss" scoped>
.my-modal {
  min-height: 1rem;
  max-height: 2rem;
  min-width: 2.4rem;
  max-width: 5rem;
  background: #0e0e28;
  border: 1px solid #2988e8;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 1000;
  padding: 0.2rem;
  color: #fff;
  .content {
    text-align: center;
    margin-top: .1rem;
  }
  .footer-btn {
    height: .5rem;
    line-height: .3rem;
    padding: .1rem .2rem;
    border: 1px solid #2988e8;
    position: absolute;
    bottom: .1rem;
    right: .2rem;
  }
  .my-modal-close {
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    width: .4rem;
    font-size: .3rem;
    position: absolute;
    right: .1rem;
    top: .1rem;
  }
}
</style>
