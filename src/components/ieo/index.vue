<template>
    <div class="ieoWrapper" @click='getDetail'>
        <div class="topBox">
            <div class="topBox specail"><img :src="content.picView" alt=""><span>{{content.saleCoin}}</span></div>
             <div class="type" :class="status == '进行中'? 'red':(status == '已完成' ? 'yellow' : ( status == '预热中' ? 'pink' : ''))">{{status}}</div>
        </div>
        <div class="abstract">
            {{content.ieoName}}
        </div>
        <div class="mainImg">
            <img :src="content.pic" alt="">
        </div>
        <ul>
            <li>
                <span>发售总量</span>
                <span>{{content.saleAmount|threeComma}} {{content.saleCoin}}</span>
            </li>
            <li>
                <span>募集周期</span>
                <span>{{content.startTime|ymdFormat}} - {{content.endTime|ymdFormat}}</span>
            </li>
            <li>
                <span>募集币种</span>
                <span>{{content.raiseCoin}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "ieoAbstract",
    data() {
        return {
            status: ""
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
            compareStAndNow = resultFun(nowTime, startTime),//查看当前时间是否在开始时间之后;
            compareNowAndEnd = resultFun(endTime, nowTime);//查看当前时间是否在结束时间之前;
        let str = "";
        console.log(compareStAndNow)
        if (!compareStAndNow) {
            str = "预热中"
        } else if (compareStAndNow && compareNowAndEnd && surplusAmount) {
            str = "进行中"
        } else if (!compareNowAndEnd || !surplusAmount) {
            str = "已完成"
        }
        this.status = str;
    },
    methods: {
        formatTime(date) {
            return new Date(date).getTime();
        },
        getDetail() {
            console.log(this.content)
            this.$router.push({
                name: "IeoDetail",
                params: {
                    id: this.content.id
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.type.red:before{
    background:#00B274 !important;
}
.red{
    color:#00B274 !important;
   
}
.type.yellow:before{
    background:#AAAAAA !important;
}
.yellow{
    color:#AAAAAA !important
}
.type.pink:before{
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
    border:1px solid #DDDDDD;
    width: 31.8%;
    background: rgb(17, 20, 36);
    padding: 10px;
    border-radius: 5px;
    color: #fff;
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


