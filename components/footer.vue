<template>
	<div>
		<div class="footer-row"></div>
		<div class="footer">
			<div @click="goHome()"  v-bind:class="{'footer-active':tab=='home'}" class="footer-item icon-home">
				 首页
				 
			</div>
			<div @click="goNine()"  v-bind:class="{'footer-active':tab=='nine'}"  class="footer-item icon-goods">
				9块9
			</div> 
			<div @click="goCategory()" v-bind:class="{'footer-active':tab=='category'}"  class="footer-item icon-cascades">
				分类
			</div>
		<div @click="goShop()"  v-bind:class="{'footer-active':tab=='shop'}"  class="footer-item icon-shop">
			好店
		</div>
			<div @click="goUser()"  v-bind:class="{'footer-active':tab=='user'}" class="footer-item icon-my_light">
				 我的 
			</div>
		
		</div>
	</div>
</template>

<script>
	export default {
		name:"default-footer",
		props:{
			tab:""
		},
		methods:{
			goHome:function(){
				uni.reLaunch({
					url:"../../pages/index/index"
				}) 
			},
			goNine:function(){
				uni.reLaunch({
					url:"../../pagestaoke/taoke/99"
				})
			},
			goShop:function(){
				uni.reLaunch({
					url:"../../pagestaoke/taoke_shop/index"
				})
			},	
			goCategory:function(){
				uni.reLaunch({
					url:"../../pagestaoke/taoke_type/index"
				})
			},
			goUser:function(){
				uni.reLaunch({
					url:"../../pagestaoke/taoke_user/index",
				})
				
			},	
		}
	}
</script>

 
