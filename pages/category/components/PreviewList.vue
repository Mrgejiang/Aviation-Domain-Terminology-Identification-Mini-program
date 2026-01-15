<template>
	<view class="caption">
		<text class="text">{{props.name}}</text>
	</view>
	<view class="guess">
		<unicloud-db @load="handleLoad" style="width: 100%;" ref="udb" v-slot:default="{data, loading, hasMore, error}"
			:collection="collectionList" :where="sWhere" :field="sField" :page-size="10">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data">
				<navigator class="guess-item" v-for="item in data" :key="item._id"
					:url="`/pages/details/details?id=${item._id}`" open-type="navigate">
					<image class="image" mode="aspectFill" :src="item.poster"></image>
					<view class="name"> {{ item.cnDetails.name||item.usDetails.name||item.euDetails.name }} </view>
					<view class="price">
						<text>{{ props.name }}</text>
					</view>
				</navigator>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
	</view>
</template>

<script lang="ts" setup>
	import { computed, ref, watch } from 'vue'

	// 定义 props 接收数据
	const props = defineProps<{
		name : string
		id : string
	}>()

	const db = uniCloud.database()
	const collectionList = 'opendb-news-articles'
	const sField = '_id,poster,cnDetails.name,cnDetails.category_id,usDetails.name,usDetails.category_id,euDetails.name,euDetails.category_id'

	const dbCmd = db.command
	const sWhere = computed(() => {
		return dbCmd.or([{
			cnDetails: {
				category_id: props.id
			}
		},
		{
			usDetails: {
				category_id: props.id
			}
		},
		{
			euDetails: {
				category_id: props.id
			}
		},
		])
	})

	const loadMore = ref({
		contentdown: '',
		contentrefresh: '',
		contentnomore: ''
	})

	const handleLoad = (data, ended, pagination) => {
		// `data` 当前查询结果
		// `ended` 是否有更多数据
		// `pagination` 分页信息 HBuilderX 3.1.5+ 支持
		console.log('结果', data);
	}

	//通过组合式 API 获得该模板引用
	const udb = ref(null)

	//重置数据
	const resetData = async () => {
		await udb.value.loadData({
			clear: true
		}, () => {
		})
		console.log("重置数据");
	}

	//获取更多
	const getMore = async () => {
		await udb.value.loadMore()
		console.log("加载更多");
	}

	//暴露给父组件方法
	defineExpose({
		resetData,
		getMore
	})

	//跳转详情
	const handleItemClick = (id : string) => {
		uni.navigateTo({
			url: `/pages/details/details?id=${id}`
		})
	}

	const isShow = ref(true)

	//监听id变化,重新获取数据
	// watch(
	// 	() => props.id,
	// 	() => {
	// 		isShow.value = false
	// 		sWhere.value = dbCmd.or([{
	// 			cnDetails: {
	// 				category_id: props.id
	// 			}
	// 		},
	// 		{
	// 			usDetails: {
	// 				category_id: props.id
	// 			}
	// 		},
	// 		{
	// 			euDetails: {
	// 				category_id: props.id
	// 			}
	// 		},
	// 		])
	// 		console.log('id变化', sWhere)
	// 		isShow.value = true
	// 	},
	// )
</script>

<style lang="scss">
	:host {
		display: block;
	}

	.caption {
		display: flex;
		justify-content: center;
		line-height: 1;
		padding: 36rpx 0 40rpx;
		font-size: 32rpx;
		color: #262626;

		.text {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 28rpx 0 30rpx;

			&::before,
			&::after {
				content: '';
				width: 20rpx;
				height: 20rpx;
				background-image: url(@/static/images/bubble.png);
				background-size: contain;
				margin: 0 10rpx;
			}
		}
	}

	/* 推荐 */
	.guess {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 20rpx;

		.guess-item {
			width: 100%;
			padding: 24rpx 20rpx 20rpx;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			overflow: hidden;
			background-color: #fff;
		}

		.image {
			width: 100%;
			height: 304rpx;
		}

		.name {
			height: 50rpx;
			margin: 10rpx 0;
			font-size: 40rpx;
			font-weight: 700;
			color: #262626;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.price {
			line-height: 1;
			color: #7b7979;
			font-size: 26rpx;
		}

		.small {
			font-size: 80%;
		}
	}

	// 加载提示文字
	.loading-text {
		text-align: center;
		font-size: 28rpx;
		color: #666;
		padding: 20rpx 0;
	}
</style>