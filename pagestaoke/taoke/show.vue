<template>
	<div>
		<div style="position: absolute; right: 10px; top: 10px;">
			<div class="fav-btn js-fav-toggle" :class="{'btn-fav-active':isFav}" tablename="mod_taoke" :objectid="data.id"></div>
		</div>
		<img class="d-img" :src="data.imgurl" />
		<div class="row-box">


			<div class="d-title">
				{{data.title}}
			</div>
			<div class="d-desc">
				{{data.description}}

			</div>
			<div class="flex">
				<span class="cl-money">券后价：￥{{data.price}}</span>
				<span class="flex-1 text-center">销量 {{data.sold_num}}</span>
				<div class="juan-price flex">
					<span class="juan-price-q">券</span>
					<span class="juan-price-m">￥{{data.juan_money}}</span>
				</div>
			</div>



			<a href="javascript:;" id="js-detail" class="look-text">查看图文详情</a>
			<div class="p-detail">
				{{data.content}}
			</div>

			<div class="fine_out">
				<div class="fine">
					<span class="fine_in"><span>精品</span>推荐</span>
				</div>
			</div>
			<taoke-item :list="reclist"></taoke-item>


		</div>
		<div style="height: 60px;"></div>
		<div class="bfooter">
			<div class="flex-1 flex">券后价<span class="cl-money f12">{{data.price}}</span></div>
			<div class="bfooter-yq flex">优惠：<span class="cl-money f12">￥{{data.juan_money}}</span> </div>
			<div class="bfooter-pwd  f12" @click="fixboxClass='flex-col'">口令购买</div>
			<!-- #ifdef H5 -->
			<a target="_blank" :href="lqUrl"  class="bfooter-lq  f12">立即领券</a>
			<!-- #endif --> 
			
			 
		</div>

		<div id="fixbox" :class="fixboxClass" class="fixbox">

			<div class="hd">淘口令购买
				<div @click="fixboxClass=''" class="f_close fixbox-close iconfont icon-close"></div>
			</div>
			<div class="box">
				<div class="tit">{{data.title}}</div>
				<div class="flex">券后价：<span class="cl-money">￥{{data.price}}</span></div>
				<div>复制这条信息</div>
				<span style="-webkit-user-select:text" class="num " >{{data.juan_pwd}}</span>
				<div class="flex">打开<span class="num">[手机淘宝]</span>即可领取优惠券购买</div>
			</div>
			<p class="copytext" style="margin:0 auto!important" @click="copy(data.juan_pwd)">一键复制</p>
			<p class="desc">由于部分浏览器不支持一键复制，<br>若一键复制失败，请长按文字手动复制</p>
		</div>
	</div>
</template>

<script>
	
	import taokeItem from "../../components/taoke-item.vue";
	export default {
		components: {
			taokeItem
		},
		data: function() {
			return {
				data: {},
				reclist: {},
				id: 0,
				isFav: false,
				fixboxClass:"",
				lqUrl:""
			}
		},
		onLoad: function(ops) {
			 
			this.id = ops.id;
			this.getPage();
		},
		methods: {
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/module.php?m=taoke&a=show&id=" + that.id,
					success: function(res) {
						that.data = res.data.data;
						that.reclist = res.data.reclist;
						that.isFav = res.data.isFav;
						if(res.data.data.juan_url){
							that.lqUrl=res.data.data.juan_url;
						}else{
							that.lqUrl=res.data.data.tk_url;
						}
					}
				})
			},
			copy:function(msg){
				var that=this;
				if(msg==''){
					msg="内容为空";
				}
				//var msg="aaaa";
				// #ifdef H5
				this.$copyText(msg).then(function (e) {
				  uni.showToast({
				  	title:"复制成功"
				  })
				}, function (e) {
				  uni.showToast({
				  	title:"复制失败"
				  })
				})
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: msg,
					success: function () {
						console.log('success');
						// #ifdef APP-PLUS
						that.goTaobao();
						// #endif
					}
				});
				// #endif
			},
			goTaobao:function (){
				// #ifdef APP-PLUS
				if (plus.os.name == "Android" ) {
					plus.runtime.launchApplication( {pname:"com.taobao.taobao"
						,extra:{url:"https://m.taobao.com/#index"}}, 
						function ( e ) {
							skyToast( "打开淘宝失败，请先安装淘宝" );
						}
					);
				}else if ( plus.os.name == "iOS" ) {
					plus.runtime.launchApplication( {action:"taobao://"}, function ( e ) {
						skyToast( "打开淘宝失败，请先安装淘宝" );
					} );
				}
				// #endif
			}
		}
	}
</script>

<style>
	.fav-btn {
		width: 36px;
		height: 36px;
		text-align: center;
		line-height: 36px;
		border-radius: 50%;
		cursor: pointer;
		background-color: #333;
		opacity: 0.9;
		color: #fff;
	}

	.fav-btn:before {
		color: #666;
		font-family: iconfont;
		content: "\e64c";
	}

	.fav-btn-active {
		background-color: #e91e63
	}

	.fav-btn-active:before {
		color: #fff;
		font-size: 22px;
	}

	.juan-price {
		float: right;
		height: 20px;
	}

	.juan-price:after {
		clear: both;
		display: block;
		content: ".";
		visibility: hidden;
	}

	.juan-price-q {
		box-sizing: border-box;
		background: #ff4d36;
		width: 25px;
		height: 25px;
		line-height: 25px;
		display: block;
		text-align: center;
		color: #fff;
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
		font-size: 12px;
	}

	.juan-price-m {
		border: 1px #ff4d36 solid;
		height: 25px;
		line-height: 25px;
		text-align: center;
		padding: 0 2px;
		font-size: 12px;
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
		padding: 0px 5px;
		box-sizing: border-box;
	}
	.look-text {
    padding: 6px 8px;
    border: 1px #ff4e36 solid;
    border-radius: 20px;
    margin:20px auto;
    display: block;
    width: 50%;
    text-align: center;
    color: #ff4e36;
    font-size: 16px;
}
.fine_out {
    margin-bottom: 4px;
    border: 1px solid white;
    background-color: white;
}
.fine_out  .fine {
    position: relative;
    width: 98%;
    margin: 20px auto 0;
    border-top: 1px solid #f5f5f5;
    text-align: center;
    color: #292929;
    font-size: 16px;
}
.fine_out  .fine .fine_in {
    background-color: white;
    top: -10px;
    position: relative;
    display: inline-block;
    padding: 0 10px;
}
.fine .fine_in span {
    font-weight: bolder;
    color: #ff4d36;
}
.bfooter{
	height: 50px;
	line-height: 50px;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding-left: 5px;
	display: flex;
	flex-direction: row;
	font-size: 14px;
	color: #444;
}
.bfooter .flex-1{
	flex: 1;
	text-align: center;
}
.bfooter-yq{
	margin-right: 5px;
}
.bfooter-price{
	color: #ff4e36;
}
.bfooter-juan{
	color: #ff4e36;
	font-size: 12px;
}
.bfooter-pwd,.bfooter-lq{
	width: 21%;
	color: #fff;
    background: #ff9a50;
    cursor: pointer;
    text-align: center;
}
.bfooter-lq{
	background-color: #ff4e36;
	display: block;
}
/***fixbox**/
.fixbox{
	display: none;
	position: fixed;
	left: 50%;	 
	top: 50%;
	width: 290px;
	height: 300px;
	margin-left: -145px;
	margin-top: -150px;
	background-color: #fff;
	border-radius: 10px;
}
.fixbox .hd{
	width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    text-align: center;
    margin-top: 5px;
    color: #ff4d36;
    overflow: hidden;
    zoom: 1;
    position: relative;
}
.fixbox .f_close{
	position: absolute;
	right: 10px;
	top: 10px;
	width: 16px;
	cursor: pointer;
}
.fixbox .box{
	width: 95%;
    min-height: 100px;
    border-radius: 5px;
    border: 1px dashed #ff4e65;
    position: relative;
    text-align: left;
    padding: 10px;
    resize: none;
    display: block;
    margin: 10px auto;
    line-height: 24px;
    color: #666;
    
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 14px;
}

.fixbox .tit{
	font-size: 14px;
	overflow: hidden;
	white-space: normal;
	height: 26px;
    line-height: 26px;
}

.fixbox .num{
	color: #ff4d36;
}
.fixbox .copytext{
	font-size: 14px;
    width: 100px;
    height: 35px;
    color: #fff;
    background: #ff4d36;
    text-align: center;
    line-height: 35px;
    margin: 5px auto;
    border-radius: 5px;
    margin-bottom: 0;
    cursor: pointer;
}
.fixbox .desc{
	width: 100%;
    margin: 0 auto;
   
    color: #999;
    font-size: 12px;
    margin-top: 10px;
    text-align: center;
}

</style>
