<template> 
	<div>
	 
		<block v-for="(item,index) in fieldsList" :key="index">
	 
			<div v-if="item.fieldtype=='text'" class="input-flex">
				<div class="input-flex-label">{{item.title}}</div>
				<input class="input-flex-text" type="text" :name="'tablefield['+item.fieldname+']'" :value="item.value" />
			</div>
		 
			<div v-else-if="item.fieldtype=='textarea'" class="textarea-flex">
				<div class="textarea-flex-label">{{item.title}}</div>
				<textarea :name="'tablefield['+item.fieldname+']'" :value="item.value" class="textarea-flex-text h60"></textarea>
			</div>
		 
			<div v-else-if="item.fieldtype=='html'"  class="textarea-flex">
				<div class="textarea-flex-label">{{item.title}}</div>
				<div class="js-html-item">
					<editor :name="'tablefield['+item.fieldname+']'" :value="item.value" ></editor>
				</div>
			</div>
			
			<div v-else-if="item.fieldtype=='img'"  class="input-flex">
				<div class="input-flex-label">{{item.title}}</div>
				<div class="flex-1">
					<skyupimg :field="'tablefield['+item.fieldname+']'" :trueimgurl="item.value" :imgurl="item.value"></skyupimg>
				</div>
			</div>
		
		</block>
	</div>
</template>

<script>
	import skyupimg from "../skyupimg";
	export default{
		components:{
			skyupimg
		},
		props:{
			fieldsList:[Object,Array]
		}
	}
</script>

<style>
</style>
