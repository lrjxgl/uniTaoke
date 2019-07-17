<template>
	<div>
		<div class="flexlist">

			<div @click="goWeb(item.linkurl)" v-for="(item,index) in list" :key="index" class="flexlist-item">
				<img class="flexlist-img" :src="item.imgurl+'.100x100.jpg'" />
				<div class="flex-1">
					<div class="flexlist-title">{{item.title}}</div>
					<div class="flexlist-desc">{{item.description}}</div>
				</div>

			</div>

			<div class="clearfix"></div>
		</div>
		<mt-footer tab="shop"></mt-footer>
	</div>
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
