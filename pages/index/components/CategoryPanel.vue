<script setup lang="ts">
	import type { CategoryItem } from '../../../types/category'
	import { onMounted, ref } from 'vue'

	// 定义 props 接收数据
	const props = defineProps<{
		list : CategoryItem[]
	}>()

	//更多和收起
	const isMore = ref(false)
	const showList = ref<CategoryItem[]>()
	const onClick = () => {
		if (isMore.value) {
			showList.value = props.list.slice(0, 10)
		} else {
			showList.value = props.list
		}
		isMore.value = !isMore.value
	}

	// 初始化
	onMounted(() => {
		showList.value = props.list.slice(0, 10)
	})

	const onTapToCategory = (id : string) => {
		//跳转前存储当前分类id
		uni.setStorageSync('curCategory', id)

		uni.switchTab({ url: `/pages/category/category` })
	}
</script>

<template>
	<view class="category">
		<view class="category-item" hover-class="none" open-type="switchTab" v-for="item in showList" :key="item._id"
			@tap="onTapToCategory(item._id)">
			<image class="icon" :src="item.icon"></image>
			<text class="text">{{
        item.name.length <= 4 ? item.name : item.name.substring(0, 3) + '...'
      }}</text>
		</view>
		<br />
		<view v-if="props.list.length>10" class="moreView">
			<button class="more" @click="onClick">{{ isMore ? '收起∧' : '更多∨' }}</button>
		</view>
	</view>
</template>

<style lang="scss">
	/* 前台类目 */
	.category {
		margin: 20rpx;
		padding: 10rpx 0;
		background-color: azure;
		display: flex;
		flex-wrap: wrap;
		min-height: 328rpx;

		.category-item {
			width: 140rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			/* 设置外边距 */
			margin: 5rpx 0;

			.icon {
				width: 100rpx;
				height: 100rpx;
				border: 1px solid #599de4;
				/* 设置边框 */
				border-radius: 5px;
				/* 设置圆角边框 */
				background-image: url(@/static/images/bgi.png);
			}

			.text {
				font-size: 26rpx;
				color: #666;
			}
		}
	}

	.moreView {
		width: 100%;
		height: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
	}

	.more {
		font-size: 12px;
		background-color: azure;
		color: #333;
		cursor: pointer;
	}
</style>