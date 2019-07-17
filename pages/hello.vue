<template>
	<div >
		 
		<div class="row-box">
		<div class="d-title">{{title}}</div>
		<div class="d-content">{{content}}</div>
		</div>
		<div class="bg-white">
			<div v-if="num==1">1</div>
			<div v-else-if="num==2">2</div>
			<div v-else>其他数字</div>
			<div :class="cls">这是红色字体哦</div>
			<div :style="style">这是绑定style</div>
			<div class="flex mgb-10">
			<div class="btn mgr-10" @click="clickMe">点击事件</div>
			<div class="btn" @click="clickMe('带参数的事件')">点击事件</div>
			</div>
			<div>
				<input type="text" v-model="nickname" />
				<div>这是input输入的值{{nickname}}</div>
			</div>
		<div class="row-item-text" v-for="(item,index) in list" :key="index">{{item}}</div>
		</div>
	</div>
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
