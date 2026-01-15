<template>
	<!-- 搜索框 -->
	<view class="search">
		<uni-easyinput :styles="styles" trim="both" prefixIcon="search" :clearable="true" v-model="searchParams.content"
			type="text" placeholder="搜索术语" confirmType="search" @iconClick="onSearch" @confirm="onSearch" />
	</view>
	<!-- 高级搜索 -->
	<view>
		<!-- v-model="isOpen" accordion="true" -->
		<uni-collapse v-model="isOpen" accordion="true">
			<uni-collapse-item ref="uci" name="key1" title="高级搜索">
				<view class="paramsItem">
					<view style="font-size: large; margin-bottom: 5px">搜索方式</view>
					<uni-data-checkbox v-model="searchParams.method" :localdata="[
              { text: '模糊搜索', value: 'fuzzy' },
              { text: '精确搜索', value: 'exact' },
            ]" mode="tag" />
				</view>
				<!-- <view class="paramsItem">
					<view style="font-size: large; margin-bottom: 5px">语言</view>
					<uni-data-checkbox v-model="searchParams.language" :localdata="[
              { text: '中文', value: 'zh' },
              { text: '英文', value: 'en' },
            ]" mode="tag" />
				</view> -->
				<view class="paramsItem">
					<view style="font-size: large; margin-bottom: 5px">国家地区</view>
					<uni-data-checkbox v-model="searchParams.country" :localdata="[
				{ text: '全部', value: 'all' },
              { text: '中国', value: 'cn' },
              { text: '美国', value: 'us' },
              { text: '欧盟', value: 'eu' },
            ]" mode="tag" />
				</view>
				<scroll-view style="max-height: 200px" enable-flex scroll-y class="paramsItem">
					<view style="font-size: large; margin-bottom: 5px">分类</view>
					<uni-data-checkbox v-model="searchParams.categoryId" :localdata="categoryList" mode="tag" />
				</scroll-view>
			</uni-collapse-item>

			<!-- <uni-collapse-item name="key2" style="height: 1px;" v-show="false"></uni-collapse-item> -->
		</uni-collapse>
	</view>
	<!-- 搜索结果 -->
	<!-- 滚动容器：触底加载 -->
	<PageSkeleton v-if="isLoading" />
	<scroll-view v-else enable-back-to-top refresher-enabled class="scroll-view" scroll-y
		@scrolltolower="onScrolltolower" @refresherrefresh="onRefresherrefresh" :refresher-triggered="isLriggered">
		<!-- <PageSkeleton v-if="isLoading" /> -->
		<PreviewList ref="PreviewRef" :searchParams="params" />
	</scroll-view>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { onLoad, onReady } from '@dcloudio/uni-app'
	import { CategoryItem } from "../../types/category"
	import { SearchParams } from "../../types/search"
	import PreviewList from './components/PreviewList.vue';

	const PreviewRef = ref(null)
	const uci = ref(null)
	// PreviewList udb传递params
	const params = ref({} as SearchParams)

	//触底加载
	const onScrolltolower = () => {
		PreviewRef.value.getMore()
	}

	onLoad((op) => {
		//上一页传参
		isLoading.value = true
		searchParams.value.content = op.content
		params.value = searchParams.value
		setTimeout(() => {
			isLoading.value = false
		}, 1000)
	})

	// onReady(() => {
	// 	// PreviewRef.value.resetData()
	// })
	// onMounted(() => {
	// 	PreviewRef.value.loadData()
	// })

	//搜索参数
	const searchParams = ref<SearchParams>({
		content: '',
		method: 'fuzzy',
		country: 'all',
		categoryId: 'all',
	})

	//分类
	type PerCategory = {
		text : string
		value : string
	}
	const categoryList = ref<PerCategory[]>(
		[{ text: '全部', value: 'all' }].concat(uni.getStorageSync('categoryList')._value.map((item : CategoryItem) => {
			return {
				text: item.name,
				value: item._id,
			}
		})))

	//自定义下拉刷新状态
	const isLriggered = ref(false)
	// 自定义下拉刷新被触发
	const onRefresherrefresh = async () => {
		//开始动画
		isLriggered.value = true
		//重置预览列表数据
		await PreviewRef.value?.resetData()
		//结束动画
		isLriggered.value = false
	}

	const isOpen = ref('key2')
	const isLoading = ref(false)

	//搜索
	const onSearch = async () => {
		if (searchParams.value.content === '') {
			return uni.showToast({
				title: '请输入搜索内容',
				icon: 'none',
			})
		}
		isLoading.value = true

		// //先重置预览列表数据
		// PreviewRef.value?.resetData()
		// //todo 重新请求-网络请求需要await
		// searchParam.value = searchParams.value.categoryId!
		// await PreviewRef.value?.getMore()

		params.value = searchParams.value
		// PreviewRef.value.loadData()

		setTimeout(() => { isLoading.value = false }, 1000)

		if (isOpen.value === 'key1') {
			// 搜索时关闭高级搜索选项卡
			// console.log(isOpen.value)
			// isOpen.value = 'key2'
			uci.value.onClick(false)
			// console.log(isOpen.value)
		}
	}

	const styles = {
		color: '#333',
		borderColor: '#111',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		disableColor: '#f7f6f6',
	}
</script>


<style lang="scss">
	page {
		background-color: #f7f7f7;
		height: 100%;
		overflow: hidden;
	}

	.search {
		padding: 0 30rpx 20rpx;
		background-color: #f9f6f6;
	}

	.params {
		padding: 0 30rpx;
		background-color: #f9f6f6;
	}

	.paramsItem {
		display: flex;
		flex-direction: column;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		background-color: #fff;
		margin-bottom: 10px;
	}

	.scroll-view {
		flex: 1;
		overflow: hidden;
		padding-bottom: 100px;
	}
</style>