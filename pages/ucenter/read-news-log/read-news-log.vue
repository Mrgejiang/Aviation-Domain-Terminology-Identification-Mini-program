<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :where="udbWhere"
			collection="opendb-news-articles" @load="isLoading == false" @error="isLoading == false"
			field="_id,poster,cnDetails.name,usDetails.name,euDetails.name" :page-size="10">
			<uni-list class="uni-list">
				<uni-list-item v-for="(item, index) in data" :key="index" :clickable="true"
					@click="handleItemClick(item)">
					<!-- 通过header插槽定义列表左侧图片 -->
					<template v-slot:header>
						<image class="avatar" :src="item.poster" mode="aspectFill"></image>
					</template>
					<!-- 通过body插槽定义布局 -->
					<template v-slot:body>
						<view class="main">
							<text class="title">{{item.cnDetails.name||'中 无名称'}}</text>
							<view class="info">
								<text class="author">{{item.usDetails.name||'美 无名称'}}</text><br />
								<text class="author">{{item.euDetails.name||'欧 无名称'}}</text><br />
								<uni-dateformat class="article-date" :date="readNewsLog[index].last_time"
									format="yyyy-MM-dd hh:mm" :threshold="[0, 0]" />
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

<script>
	export default {
		data() {
			return {
				isLoading: true,
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: '',
				},
				readNewsLog: [],
				udbWhere: ''
			}
		},
		onLoad() {
			this.readNewsLog = uni.getStorageSync('readNewsLog') || [];
			let readNewsLogIds = this.readNewsLog.map(({
				article_id
			}) => article_id)
			console.log(typeof readNewsLogIds, readNewsLogIds);
			this.udbWhere = `"_id" in ${JSON.stringify(readNewsLogIds)}`
			uni.setNavigationBarTitle({
				title: this.$t('newsLog.navigationBarTitle')
			})
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		methods: {
			refreshData() {
				this.$refs.udb.loadData({
					clear: true
				}, (res) => {
					uni.stopPullDownRefresh()
				})
			},
			handleItemClick(item) {
				uni.navigateTo({
					url: '/pages/details/details?id=' + item._id
				})
			}
		}
	}
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