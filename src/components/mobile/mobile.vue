<template>
    <router-view></router-view>
</template>

<script>
export default {
    beforeRouteEnter (to, from, next) {   
        document.documentElement.style.fontSize = document.documentElement.clientWidth/7.5 + 'px';
        window.onresize = function() {
            document.documentElement.style.fontSize = document.documentElement.clientWidth/7.5 + 'px';
        }
        next()
    }
}
</script>

<style lang="scss" scoped>

</style>

