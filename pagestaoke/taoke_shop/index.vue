<template>
	<view>
		<view class="flexlist">

			<view @click="goWeb(item.linkurl)" v-for="(item,index) in list" :key="index" class="flexlist-item">
				<img class="flexlist-img" :src="item.imgurl+'.100x100.jpg'" />
				<view class="flex-1">
					<view class="flexlist-title">{{item.title}}</view>
					<view class="flexlist-desc">{{item.description}}</view>
				</view>

			</view>

			<view class="clearfix"></view>
		</view>
		<mt-footer tab="shop"></mt-footer>
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
				list: {}
			}

		},
		onLoad: function() {
			this.getPage();
		},
		methods: {
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/module.php?m=taoke_shop",
					success: function(res) {
						that.list = res.data.data;

					}
				})
			},
			goWeb: function(url) {
				uni.navigateTo({
					url:"../../pages/web/index?url="+encodeURI(url)
				})
			}

		}
	}
</script>

<style>

</style>
