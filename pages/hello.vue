<template>
	<view >
		 
		<view class="row-box">
		<view class="d-title">{{title}}</view>
		<view class="d-content">{{content}}</view>
		</view>
		<view class="bg-white">
			<view v-if="num==1">1</view>
			<view v-else-if="num==2">2</view>
			<view v-else>其他数字</view>
			<view :class="cls">这是红色字体哦</view>
			<view :style="style">这是绑定style</view>
			<view class="flex mgb-10">
			<view class="btn mgr-10" @click="clickMe">点击事件</view>
			<view class="btn" @click="clickMe('带参数的事件')">点击事件</view>
			</view>
			<view>
				<input type="text" v-model="nickname" />
				<view>这是input输入的值{{nickname}}</view>
			</view>
		<view class="row-item-text" v-for="(item,index) in list" :key="index">{{item}}</view>
		</view>
	</view>
</template>

<script>
	var num=0;
	export default{
		data:function(){
			return {
				title:"我是标题",
				content:"我是内容",
				nickname:"这是昵称",
				list:[],
				cls:"cl-red",
				style:"font-size:36px;color:f30;",
				num:2
			}
		},
		onLoad:function(ops){
			this.getPage();
		},
		onReachBottom:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.getPage();
			uni.stopPullDownRefresh();
		},	
		methods:{
			clickMe:function(msg){
				 
				if(typeof(msg)=="string"){
					alert(msg)
				}else{
					
					alert("我被击中了");
				}
				
			},
			getPage:function(){
				console.log("加载了");
				var list=[];
				for(var i=0;i<50;i++){
					num++;
					list.push('这是第'+num+'条新闻');
				}
				this.list=list;
				uni.setNavigationBarTitle({
					title:"这是老雷uniApp的hello world"
				})
			},
			getList:function(){
				var list=this.list;
				for(var i=0;i<50;i++){
					num++;
					list.push('这是第'+num+'条新闻');
				}
				this.list=list;
			}
		}
	}
</script>

<style>
</style>
