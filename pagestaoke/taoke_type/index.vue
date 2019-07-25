<template>
	<view>
		<view class="list">

			<view @click="goList(item.catid)" v-for="(item,index) in typeList" :key="index" class="list-item">
				<image mode="widthFix" class="list-item-img" :src="item.imgurl+'.100x100.jpg'"  ></image>

				<view class="f14">{{item.title}}</view>
			</view>

			<view class="clearfix"></view>
		</view>
		<mt-footer tab="category"></mt-footer>
	</view>
</template>

<script>
	import mtFooter from "../../components/footer.vue";
	export default {
		components: {
			mtFooter
		},
		data: function() {
			return {
				typeList: {}
			}

		},
		onLoad: function() {
			this.getPage();
		},
		methods: {
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/module.php?m=taoke_type",
					success: function(res) {
						that.typeList = res.data.typelist;

					}
				})
			},
			goList:function(catid){
				uni.navigateTo({
					url:"../../pagestaoke/taoke/list?catid="+catid
				})
			}
		}
	}
</script>

<style>
	.list {
		margin-top: 10px;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.list-item {
		width: 33.3333%;
		display: block;
		text-align: center;
		padding-bottom: 10px;
		padding-top: 10px;
		font-size: 14px;
		color: #444;
		border: 1px solid #eee;
		box-sizing: border-box;
		
	}

	.list-item:hover {
		border-color: #F01A61;
	}

	.list-item-img {
		border-radius: 50%;
		
		width: 60px;
		margin: 0 auto;
		margin-bottom: 3px;
	}
</style>
