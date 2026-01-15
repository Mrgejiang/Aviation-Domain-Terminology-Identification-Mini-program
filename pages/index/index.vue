<template>
	<!-- 自定义导航栏 -->
	<CustomNavbar />
	<!-- 滚动容器：触底加载 -->
	<scroll-view enable-back-to-top refresher-enabled class="scroll-view" scroll-y @scrolltolower="onScrolltolower"
		@refresherrefresh="onRefresherrefresh" :refresher-triggered="isLriggered">
		<PageSkeleton v-if="isLoading" />
		<template v-else>
			<!-- 轮播图 :传递数据 -->
			<TopSwiper :list="noticesList" />
			<!-- 分类 ：传递数据 -->
			<CategoryPanel :list="categoryList" />
			<!-- 推荐：预览列表 -->
			<PreviewList ref="PreviewRef" />
		</template>
	</scroll-view>
</template>

<script setup lang="ts">
	import { NoticeItem } from "../../types/notice";
	import { CategoryItem } from "../../types/category"
	import CustomNavbar from "./components/CustomNavbar.vue"
	import TopSwiper from "./components/TopSwiper.vue"
	import CategoryPanel from "./components/CategoryPanel.vue"
	import PreviewList from "./components/PreviewList.vue";
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from "vue";

	//
	const PreviewRef = ref(null)

	//数据库
	const db = uniCloud.database();

	//首页公告数据
	const noticesList : NoticeItem[] = [
		{ _id: '1', imgUrl: 'https://mp-003d93a9-efde-40df-a943-25e82e419019.cdn.bspapp.com/images/notice1.png' },
		{ _id: '2', imgUrl: 'https://mp-003d93a9-efde-40df-a943-25e82e419019.cdn.bspapp.com/images/notice2.png' },
	]

	//首页分类数据
	const categoryList = ref<CategoryItem[]>([])
	const getCategoryData = async () => {
		const categoryTable = db.collection('opendb-news-categories')
		const res = await categoryTable.field("_id,name,icon").get()
		categoryList.value = res.result.data
		// console.log("获取分类数据", categoryList.value)
		uni.setStorage({
			key: 'categoryList',
			data: categoryList
		}).then(() => {
			console.log("获取并存储分类数据", uni.getStorageSync('categoryList')._value);
		})
	}

	//页面加载中
	const isLoading = ref(true)

	//页面初始加载
	onLoad(async () => {
		isLoading.value = true
		//请求数据
		getCategoryData()
			.catch(() => {
				uni.showToast({
					title: "网络错误",
					icon: "error"
				})
			})
			.finally(() => {
				isLoading.value = false
			})
	})

	//触底加载
	const onScrolltolower = () => {
		PreviewRef.value?.getMore()
	}

	//自定义下拉刷新状态
	const isLriggered = ref(false)
	// 自定义下拉刷新被触发
	const onRefresherrefresh = async () => {
		//开始动画
		isLriggered.value = true
		//先重置预览列表数据

		// 重新请求-公告和分类数据-网络请求需要await
		await Promise.all([getCategoryData(), PreviewRef.value?.resetData()])
		//结束动画
		isLriggered.value = false
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
		height: 100%;
		overflow: hidden;
	}

	.scroll-view {
		flex: 1;
		overflow: hidden;
		padding-bottom: 100px;
	}
</style>