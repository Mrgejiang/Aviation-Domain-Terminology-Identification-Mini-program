<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" @load="isLoading == false"
			@error="isLoading == false" :collection="collectionList">
			<view v-if="error">{{error.message}}</view>
			<uni-list v-else-if="data" class="uni-list">
				<uni-list-item v-for="(item, index) in data" :key="index" :clickable="true"
					@click="handleItemClick(item)">
					<!-- 通过header插槽定义列表左侧图片 -->
					<template v-slot:header>
						<image class="avatar" :src="item.article_id[0].poster" mode="aspectFill"></image>
					</template>
					<!-- 通过body插槽定义布局 -->
					<template v-slot:body>
						<view class="main">
							<text class="title">{{item.article_id[0].cnDetails.name||'中 无名称'}}</text>
							<view class="info">
								<text class="author">{{item.article_id[0].usDetails.name||'美 无名称'}}</text><br />
								<text class="author">{{item.article_id[0].euDetails.name||'欧 无名称'}}</text><br />
								<uni-dateformat class="article-date" :date="item.update_date" format="yyyy-MM-dd hh:mm"
									:threshold="[0, 0]" />
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<uni-load-state @networkResume="refreshData"
				:state="{data,pagination,hasMore, loading, error}"></uni-load-state>
		</unicloud-db>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { onReachBottom, onPullDownRefresh, onLoad, onShow } from '@dcloudio/uni-app'

	const udb = ref(null)
	const db = uniCloud.database()
	const favorite = db.collection('opendb-news-favorite').where('"user_id"==$env.uid').field('article_id,update_date').getTemp()
	const article = db.collection('opendb-news-articles').field('_id,poster,cnDetails.name,usDetails.name,euDetails.name').getTemp()
	const collectionList = [favorite, article]

	const isLoading = ref(true)
	const loadMore = ref({
		contentdown: '',
		contentrefresh: '',
		contentnomore: '',
	})
	const udbWhere = ref('')

	onLoad(() => {
	})

	const refreshData = () => {
		udb.value.loadData({
			clear: true
		}, (res) => {
			uni.stopPullDownRefresh()
		})
	}

	const handleItemClick = (item) => {
		uni.navigateTo({
			url: '/pages/details/details?id=' + item.article_id[0]._id
		})
	}

	//触底
	onReachBottom(() => {
		udb.value.loadMore()
	})

	//下拉
	onPullDownRefresh(() => {
		refreshData()
	})

	//显示
	onShow(() => {
		refreshData()
	})
</script>

<style>
	.item {
		display: flex;
		flex-direction: column;
	}

	.article-date {
		color: #C8C7CC;
	}

	.pages {
		background-color: #FFFFFF;
	}

	.avatar {
		width: 300rpx;
		height: 200rpx;
		margin-right: 10rpx;
	}

	.main {
		justify-content: space-between;
		flex: 1;
	}

	.title {
		font-size: 16px;
	}

	.info {
		flex-direction: row;
		justify-content: space-between;
	}

	.author,
	.last_modify_date {
		font-size: 14px;
		color: #999999;
	}

	.uni-search-box {
		background-color: #FFFFFF;
		position: sticky;
		height: 50px;
		top: 0;
		left: 0;
		/* #ifndef APP-PLUS */
		z-index: 9;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		width: 580rpx;
		/* #endif */
	}

	.cover-search-bar {
		height: 50px;
		position: relative;
		top: -50px;
		margin-bottom: -50px;
		/* #ifndef APP-NVUE */
		z-index: 999;
		/* #endif */
	}
</style>