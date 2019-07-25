<template>
	<view >
		<view v-if="!pageLoad" class="">
			<page-loading></page-loading>
		</view>
		<view v-if="pageLoad">
		 
		<view class="input-flex">
			<image class="wh-36" :src="logo"></image>
			<input type="text" v-model="keyword" class="input-flex-text" />
			<view class="input-flex-btn" @click="search">搜一下</view>
		</view>
		 
		<view class="main-body">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,key) in pageData.flashList" :key="key">
					<view class="swiper-item">
						<image @click="gourl(item.link1)" :src="item.imgurl" style="width:100%" mode="widthFix"></image>
					</view>
				</swiper-item>

			</swiper>
			<view class="m-navPic mgt-5 mgb-5">
				<navigator v-for="(item,key) in pageData.navList" :key="key"  :url="item.link1" class="m-navPic-item">
					<image class="m-navPic-img"  mode="widthFix" :src="item.imgurl"></image>
					<view class="m-navPic-title">{{item.title}}</view>
				</navigator>

			</view>
			 
			<taoke-item :list="pageData.reclist"></taoke-item>
			 <view class="taoke-tags">
			 	 
			 	<a v-for="(item,index) in pageData.taoke_tags" :key="index" @click="goTag(item.name)"   class="taoke-tags-item" >{{item.name}}</a>
			 	
			 </view>
			 <taoke-item :list="pageData.data"></taoke-item> 
		</view>	 
		</view>
		<mt-footer tab="home"></mt-footer>
	</view> 
</template>
<script>
	var app = require("../../common/common.js");
	import mtFooter from "../../components/footer.vue";
	import taokeItem from "../../components/taoke-item.vue";
	// #ifdef H5	
	import wxH5 from "../../common/weixin-h5.js"; 
	// #endif
	
	export default {
		components: {
			mtFooter,
			taokeItem 
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
				logo:this.app.apiHost+"/static/logo.png",
				keyword:""
			}
			
		},

		onLoad: function (option) {
			uni.showNavigationBarLoading();
			
			this.getPage();
			// #ifdef H5
			wxH5.share();
			// #endif
			
			
		},
		onReady: function () {
			uni.setNavigationBarTitle({
				title: "得推淘宝客",
			});
		},
		onShow: function () {
			if (this.pageHide) {
				this.pageHide = false;
				this.getPage();
			}
		},
		onHide: function () {
			this.pageHide = true;
		},
		onPullDownRefresh:function(){
			this.refresh();
		} ,
		onShareAppMessage:function(){
			
		}, 
		methods: {
			 
			getPage: function () {
				var that = this;
				console.log("loadData"+new Date());
				that.app.get({
					url: app.apiHost+"/module.php?m=taoke" ,
					success: function (data) {
						console.log("end loadData"+new Date());
						that.pageLoad = true;
						that.pageData = data.data;
						uni.hideNavigationBarLoading();
					}
				})
			},
			refresh:function(){
				this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
			
			
			gourl:function(url){
				uni.navigateTo({
					url:url
				})
			},
			goTag:function(tag){
				uni.navigateTo({
					url:"../../pagestaoke/taoke/tag?tagname="+tag
				})
			},
			search: function() {
				if (this.keyword == '') {
					return;
				}
				uni.navigateTo({
					url: "../../pagestaoke/taoke/search?keyword=" + encodeURI(this.keyword)
				})
			}
		},
	}
</script>
<style>
	.wh-36{
		width: 36px;
		height: 36px;
		margin-right: 2px;
	}
	.m-navPic-item{
		width: 20%;
	}
	.m-navPic-img{
		width: 90%;
		height: auto;
	}
	swiper{
		height: 440upx;
	}
	.taoke-tags{
		padding: 10px 10px 0px 10px;
		background-color: #fff;
		margin-bottom: 10px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.taoke-tags-item{
		display: inline-block;
		line-height: 30px;
		padding: 0px 5px;
		margin: 0px 10px 10px 0px;
		border: 1px solid #ddd;
		font-size: 14px;
		border-radius: 10px;
		color: #666;
	}
	.taoke-tags-active{
		color: #007AFF;
	}
</style>

