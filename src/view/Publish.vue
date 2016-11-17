<template>
	<div class="publish">
		<HeaderBar></HeaderBar>
		<nav-bar></nav-bar>
        <div class="right">
         <router-view></router-view>
        </div>
	</div>
</template>
<script>

import HeaderBar from '../components/_header';
import NavBar from '../components/_nav';
export default {
    name: 'publish',
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
<style scoped>
.right {
    position: fixed;
    top: 200px;
    right: 500px;
}
</style>