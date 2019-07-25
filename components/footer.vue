<template>
	<view>
		<view class="footer-row"></view>
		<view class="footer">
			<view @click="goHome()"  v-bind:class="{'footer-active':tab=='home'}" class="footer-item icon-home">
				 首页
				 
			</view>
			<view @click="goNine()"  v-bind:class="{'footer-active':tab=='nine'}"  class="footer-item icon-goods">
				9块9
			</view> 
			<view @click="goCategory()" v-bind:class="{'footer-active':tab=='category'}"  class="footer-item icon-cascades">
				分类
			</view>
		<view @click="goShop()"  v-bind:class="{'footer-active':tab=='shop'}"  class="footer-item icon-shop">
			好店
		</view>
			<view @click="goUser()"  v-bind:class="{'footer-active':tab=='user'}" class="footer-item icon-my_light">
				 我的 
			</view>
		
		</view>
	</view>
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

 
