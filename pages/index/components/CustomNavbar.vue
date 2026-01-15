<template>
	<!-- 顶部占位 -->
	<view class="navbar" :style="{ paddingTop: safeAreaInsets!.top + 10 + 'px' }">
		<!-- logo文字 -->
		<view class="logo">
			<image class="logo-image" src="@/static/images/logo.png"></image>
			<text class="logo-text">津 门 兰 鸢</text>
		</view>

		<view class="search">
			<uni-easyinput :styles="styles" trim="both" prefixIcon="search" :clearable="true" v-model="searchContent"
				type="text" placeholder="搜索术语" confirmType="search" @iconClick="onSearch" @confirm="onSearch" />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';

	// 获取屏幕边界到安全区域距离
	const { safeAreaInsets } = uni.getSystemInfoSync()

	//搜索
	//搜索内容
	const searchContent = ref('')
	const onSearch = () => {
		if (searchContent.value === '') {
			return uni.showToast({
				title: '请输入搜索内容',
				icon: 'none',
			})
		}
		console.log('searchContent:', searchContent.value)
		uni.navigateTo({
			url: `/pages/search/search?content=${searchContent.value}`,
		})
	}

	const styles = {
		color: '#333',
		borderColor: '#2979FF',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		disableColor: '#f7f6f6',
	}
</script>

<style lang="scss">
	/* 自定义导航条 */
	.navbar {
		background-image: url(@/static/images/navigator_bg.png);
		background-size: cover;
		position: relative;
		display: flex;
		flex-direction: column;
		padding-top: 20px;

		.logo {
			display: flex;
			align-items: center;
			height: 64rpx;
			padding-left: 30rpx;

			.logo-image {
				width: 166rpx;
				height: 39rpx;
			}

			.logo-text {
				font-family: fangsong;
				flex: 1;
				line-height: 28rpx;
				color: #fff;
				margin: 2rpx 0 0 20rpx;
				padding-left: 20rpx;
				border-left: 1rpx solid #fff;
				font-size: 28rpx;
				font-weight: 700;
			}
		}

		.search {
			width: 98%;
			align-items: center;
			padding: 0 12rpx 0 0;
			height: 100rpx;
			margin: 16rpx;
			color: #fff;
			font-size: 24rpx;
			border-radius: 32rpx;
			background-color: rgba(255, 255, 255, 0.1);
		}

		.icon-search {
			font-size: 18px;
			margin-right: 9px;
		}

		.searchInput {
			width: 85%;
		}

		.icon-cancel {
			font-size: 20px;
			padding: 15rpx;
		}
	}
</style>