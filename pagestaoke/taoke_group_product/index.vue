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
				gid:0,
				
			}
		},
		onLoad:function(ops){
			this.gid=ops.gid;
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
	 
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost+"/module.php?m=taoke_group_product" ,
					data:{
						gid:that.gid
					 
					},
					success: function (res) {
						uni.setNavigationBarTitle({
							title:res.data.group.title
						})
						that.pageLoad = true;
						that.list = res.data.list;
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
					url: that.app.apiHost+"/module.php?m=taoke_group_product" ,
					data:{
						gid:that.gid,
						per_page:per_page
						 
					},
					success: function (res) {
						if(isFirst){
							that.list=res.data.list;
							isFirst=false;
						}else{
							
							that.list=that.app.json_add(that.list,res.data.list);
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
 
</style>
