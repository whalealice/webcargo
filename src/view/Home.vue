<template>
	<div class="home">
		<nav-bar v-show="navVisible"></nav-bar>
        <div class="content" :style="{ paddingLeft: paddingValue}">
            <HeaderBar @toggle="toggleNavBar"></HeaderBar>
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
            isCheck: true,
            navVisible:true,
            paddingValue:'252px'
        }
    },
    components:{ HeaderBar,NavBar},
    methods:{
        toggleNavBar(){
            this.navVisible=!this.navVisible;
            this.paddingValue = this.paddingValue=='252px'?'12px':'252px';
        }
    }
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