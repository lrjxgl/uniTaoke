<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default{
		data:function(){
			return {
				url:""
			}
		},
		onLoad:function(ops){
			this.url=ops.url
		}
	}
</script>

<style>
</style>
