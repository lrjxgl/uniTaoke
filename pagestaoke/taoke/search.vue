<template>
	<view>
	 	<view class="input-flex">
	 		<image class="wh-36" src="../../static/logo.png"></image>
	 		<input type="text" v-model="keyword" class="input-flex-text" />
	 		<view class="input-flex-btn" @click="search">搜一下</view>
	 	</view>
		<taoke-item :list="list"></taoke-item>
	</view>
</template>

<script>
	import taokeItem from "../../components/taoke-item.vue";
	var per_page=0,isFirst=true;
	export default{
		components: {
			taokeItem 
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				list:{},
				taoke_tags:"",
				tagname:"",
				catid:0,
				keyword:""
				
			}
		},
		onLoad:function(ops){
			this.keyword=ops.keyword
			this.getPage();
		},
		onPullDownRefresh:function(){
			this.getPage();
			uni.stopPullDownRefresh();
		},
		onReachBottom:function(){
			this.getList();
			
		},
		methods:{
			setTag:function(tagname){
				this.tagname=tagname;
				per_page=0,isFirst=true;
				this.getPage();
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost+"/module.php?m=taoke&a=search" ,
					data:{
						word:that.keyword
					 
					},
					success: function (res) {
						uni.setNavigationBarTitle({
							title:"搜一下"
						})
						that.pageLoad = true;
						that.list = res.data.data;
						that.taoke_tags=res.data.taoke_tags;
						isFirst=false;
						per_page=res.data.per_page;
						uni.hideNavigationBarLoading();
					}
				})
			},
			getList: function() {
				var that = this;
				if(per_page==0 && !isFirst){
					return false;
				}
				that.app.get({
					url: that.app.apiHost+"/module.php?m=taoke&a=search" ,
					data:{
						word:that.keyword,
						per_page:per_page
						 
					},
					success: function (res) {
						if(isFirst){
							that.list=res.data.data;
							isFirst=false;
						}else{
							
							that.list=that.app.json_add(that.list,res.data.data);
						}
						per_page=res.data.per_page; 
					 
					}
				})
			},
			refresh:function(){
				this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
			search: function() {
				if (this.keyword == '') {
					return;
				}
				uni.navigateTo({
					url: "../../pagestaoke/taoke/search?keyword=" + encodeURI(this.keyword)
				})
			}
		}
	}
</script>

<style>
	.wh-36{
		width: 36px;
		height: 36px;
		margin-right: 2px;
	}
	
</style>
