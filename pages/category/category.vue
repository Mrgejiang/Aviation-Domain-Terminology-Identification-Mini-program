<template>
	<PageSkeleton v-if="isLoading" />
	<view class="viewport" v-else>
		<!-- 搜索框 -->
		<view class="search">
			<uni-easyinput :styles="styles" trim="both" prefixIcon="search" :clearable="true" v-model="searchContent"
				type="text" placeholder="搜索术语" confirmType="search" @iconClick="onSearch" @confirm="onSearch" />
		</view>
		<!-- 分类 -->
		<view class="categories">
			<!-- 左侧：一级分类 -->
			<scroll-view class="primary" scroll-y>
				<view v-for="(item, index) in categoryList" :key="item._id" class="item"
					:class="{ active: index === activityIndex }" @tap="onTapChangeCategory(index, item._id)">
					<text class="name">
						{{ item.name.length <= 4 ? item.name : item.name.substring(0, 3) + '...' }}
					</text>
				</view>
			</scroll-view>


			<!-- 内容区域 -->
			<scroll-view class="secondary" scroll-y enable-back-to-top refresher-enabled
				@scrolltolower="onScrolltolower" @refresherrefresh="onRefresherrefresh"
				:refresher-triggered="isLriggered">
				<PreviewList ref="PreviewRef" :name="curName" :id="curId" />
			</scroll-view>

		</view>
	</view>
</template>

<script setup lang="ts">
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import { computed, ref } from 'vue';
	import PreviewList from './components/PreviewList.vue';

	const db = uniCloud.database();
	const PreviewRef = ref(null)

	//触底加载
	const onScrolltolower = () => {
		PreviewRef.value?.getMore()
	}

	//获取分类
	const categoryList = ref<{ _id : string, name : string, icon ?: string }[]>([])
	const getCategoryData = async () => {
		const categoryTable = db.collection('opendb-news-categories')
		const res = await categoryTable.field("_id,name").get()
		categoryList.value = res.result.data
		console.log("获取分类数据", categoryList.value)
	}

	const activityIndex = ref(0)
	//当前分类名称和id
	const curName = computed(() => {
		return categoryList.value[activityIndex.value]?.name || '名称'
	})
	const curId = computed(() => {
		return categoryList.value[activityIndex.value]?._id || '0'
	})

	//tab点击事件
	const onTapChangeCategory = (index : number, id : string) => {
		activityIndex.value = index
		uni.setStorage({ key: 'curCategory', data: id })
	}

	//自定义下拉刷新状态
	const isLriggered = ref(false)
	// 自定义下拉刷新被触发
	const onRefresherrefresh = async () => {
		//开始动画
		isLriggered.value = true
		//先重置预览列表数据
		await PreviewRef.value?.resetData()
		//结束动画
		isLriggered.value = false
	}

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
		uni.navigateTo({
			url: `/pages/search/search?content=${searchContent.value}`,
		})
	}

	//页面加载中
	const isLoading = ref(true)
	const curCategory = ref('')
	onLoad(async () => {
		curCategory.value = uni.getStorageSync('curCategory')
		await getCategoryData()
		categoryList.value = uni.getStorageSync('categoryList')._value
		// console.log('categoryList',categoryList.value);
		console.log('定位分类', curCategory.value);
		if (curCategory.value !== '') {
			const index = categoryList.value.findIndex((item) => item._id === curCategory.value)
			if (index !== -1) {
				activityIndex.value = index
			}
		}
		isLoading.value = false
	})

	//页面显示时读取缓存，设置当前分类
	onShow(() => {
		const id = uni.getStorageSync('curCategory')
		if (id) {
			const index = categoryList.value.findIndex((item) => item._id === id)
			if (index !== -1) {
				activityIndex.value = index
			}
		}
	})

	const styles = {
		color: '#333',
		borderColor: '#111',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		disableColor: '#f7f6f6',
	}
</script>


<style lang="scss">
	page {
		height: 100%;
		overflow: hidden;
	}

	.viewport {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.search {
		padding: 0 30rpx 20rpx;
		background-color: #fff;

		.input {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 64rpx;
			padding-left: 26rpx;
			color: #8b8b8b;
			font-size: 28rpx;
			border-radius: 32rpx;
			background-color: #f3f4f4;
		}
	}

	.icon-search {
		&::before {
			margin-right: 10rpx;
		}
	}

	/* 分类 */
	.categories {
		flex: 1;
		min-height: 400rpx;
		display: flex;
	}

	/* 一级分类 */
	.primary {
		overflow: hidden;
		width: 180rpx;
		flex: none;
		background-color: #f6f6f6;

		.item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 96rpx;
			font-size: 26rpx;
			color: #595c63;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				left: 42rpx;
				bottom: 0;
				width: 96rpx;
				border-top: 1rpx solid #e3e4e7;
			}
		}

		.active {
			background-color: #fff;

			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 8rpx;
				height: 100%;
				background-color: #27ba9b;
			}
		}
	}

	.primary .item:last-child::after,
	.primary .active::after {
		display: none;
	}

	/* 二级分类 */
	.secondary {
		background-color: #fff;

		.carousel {
			height: 200rpx;
			margin: 0 30rpx 20rpx;
			border-radius: 4rpx;
			overflow: hidden;
		}

		.panel {
			margin: 0 30rpx 0rpx;
		}

		.title {
			height: 60rpx;
			line-height: 60rpx;
			color: #333;
			font-size: 28rpx;
			border-bottom: 1rpx solid #f7f7f8;

			.more {
				float: right;
				padding-left: 20rpx;
				font-size: 24rpx;
				color: #999;
			}
		}

		.more {
			&::after {
				font-family: 'iconfont' !important;
				content: '\e600';
			}
		}

		.section {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 0;
		}
	}
</style>