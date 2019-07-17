<template>
	<div>
		<div class="list">

			<a @click="goList(item.catid)" v-for="(item,index) in typeList" :key="index" class="list-item">
				<img class="list-item-img" :src="item.imgurl+'.100x100.jpg'" width="60" />

				<div>{{item.title}}</div>
			</a>

			<div class="clearfix"></div>
		</div>
		<mt-footer tab="category"></mt-footer>
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
		margin-bottom: 3px;
	}
</style>
