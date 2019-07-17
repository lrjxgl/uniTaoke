<template>
	<div>
	 	
		<taoke-item :list="list"></taoke-item>
	</div>
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
				
			}
		},
		onLoad:function(ops){
			this.tagname=ops.tagname; 
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
					url: that.app.apiHost+"/module.php?m=taoke&a=list" ,
					data:{
						tagname:that.tagname
					 
					},
					success: function (res) {
						uni.setNavigationBarTitle({
							title:that.tagname
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
					url: that.app.apiHost+"/module.php?m=taoke&a=list" ,
					data:{
						tagname:that.tagname,
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
		}
	}
</script>

<style>
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
