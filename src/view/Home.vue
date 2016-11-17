<template>
	<div class="home">
		<HeaderBar></HeaderBar>
		<nav-bar></nav-bar>
        <div class="content">
            <router-view></router-view>
        </div>
	</div>
</template>
<script>

import HeaderBar from '../components/_header';
import NavBar from '../components/_nav';
export default {
    name: 'home',
    data () {
        return {
            username: '',
            password: '',
            isCheck: true
        }
    },
    components:{ HeaderBar,NavBar}
}
</script>
<style lang="less" scoped>
.content{
    float: left;
    width: 100%;
    padding-left: 252px;
    display: block;
    box-sizing: border-box;
}
</style>