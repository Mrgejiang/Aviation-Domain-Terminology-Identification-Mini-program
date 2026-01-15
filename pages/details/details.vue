<template>
	<PageSkeleton v-if="isLoading" />
	<view class="details" v-else>
		<video class="detailsVedio" controls :src="termDetailsData?.video" :poster="termDetailsData?.poster"
			show-mute-btn :title="termDetailsData?.cnDetails.name" enable-play-gesture @error="onVideoError"></video>
		<view class="tips">
			<text class="tipsText">双击可以播放或暂停哦</text>
			<text class="selection icon-heart-ed" v-if="isSelected" @tap="onTapSelection"></text>
			<text class="selection icon-heart" v-else @tap="onTapSelection"></text>
		</view>
		<scroll-view enable-back-to-top scroll-y>
			<view class="viewItem" v-for="(item,index) in [
          termDetailsData?.cnDetails,
          termDetailsData?.usDetails,
          termDetailsData?.euDetails,
        ]" :key="index">
				<view class="title1">
					<text>{{ index===0?'中':(index===1?'美':'欧') }}</text>
				</view>
				<view>
					<view class="title2">●名称</view>
					<text class="content" user-select>{{ item?.name }}</text>
				</view>
				<view v-if="index === 0">
					<view class="title2">●英文</view>
					<text class="content" user-select>{{ termDetailsData?.cnDetails.en }}</text>
				</view>
				<view>
					<view class="title2">●缩写</view>
					<text class="content" user-select>{{ item?.abbr }}</text>
				</view>
				<view>
					<view class="title2">●分类</view>
					<text class="content" user-select>{{ item.category_id[0]?.name||'未分类' }}</text>
				</view>
				<view>
					<view class="title2">●定义</view>
					<text class="content" user-select>{{ item?.define }}</text>
				</view>
				<view>
					<view class="title2">●来源</view>
					<text class="content" user-select>{{ item?.source }}</text>
				</view>
				<view>
					<view class="title2">●扩展</view>
					<text class="content" user-select>{{ item?.expand }}</text>
				</view>
			</view>
			<view class="viewItem">
				<view class="title1">对比分析</view>
				<text class="content" style="text-indent: 0em;" user-select>{{ termDetailsData?.compareResult }}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import { store } from '@/uni_modules/uni-id-pages/common/store.js'
	import { termDetails } from '../../types/details'

	const db = uniCloud.database();
	const favoriteTable = db.collection('opendb-news-favorite')
	const logTable = db.collection('read-news-log')

	//播放视频出错
	const onVideoError = (ev) => {
		uni.showToast({
			title: '视频走丢了!',
			icon: 'none',
		})
	}

	//获取词条详细数据
	const termDetailsData = ref<termDetails>()
	const getTermDetailsData = async () => {
		const category = db.collection('opendb-news-categories').field('_id,name').getTemp()
		const res = await db.collection('opendb-news-articles', category).where('_id=="' + id.value + '"').get()
		termDetailsData.value = res.result.data[0]
		console.log("获取词条详细数据", termDetailsData.value);
		setReadNewsLog()
	}

	//正在加载
	const isLoading = ref(true)
	const id = ref('')
	onLoad(async (op) => {
		isLoading.value = true
		console.log('详情_id', op.id);
		id.value = op.id
		await getTermDetailsData()
		uni.setNavigationBarTitle({
			title: `词条: ${termDetailsData.value.cnDetails.name || termDetailsData.value.usDetails.name || termDetailsData.value.euDetails.name}`,
		})
		if (store.hasLogin) {
			//如果已登录，获取用户收藏状态
			const res = await favoriteTable.where(`"article_id" == "${id.value}" && "user_id"==$env.uid`).get()
			if (res.result.data.length > 0) {
				isSelected.value = true
				selectId = res.result.data[0]._id
			}
		}
		isLoading.value = false
	})

	//收藏
	const isSelected = ref(false)
	let selectId = ''
	const onTapSelection = async () => {
		if (!store.hasLogin) {
			//如果未登录，提示登录
			return uni.showModal({
				content: '是否现在登录？',
				confirmColor: '#6cb8f3',
				success: (res) => {
					if (res.confirm) {
						uni.navigateTo({
							url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
						})
					}
				},
			})
		}
		if (isSelected.value) {
			//取消收藏
			favoriteTable
				.doc(selectId)
				.remove()
				.then((res) => {
					console.log('取消收藏', res)
					selectId = ''
					isSelected.value = false
				})
				.catch((err) => {
					console.log(err);
					uni.showToast({
						title: '出错了!',
						icon: 'none',
					})
				})
		} else {
			//收藏
			favoriteTable
				.add({
					"article_id": id.value
				})
				.then((res) => {
					console.log('收藏', res)
					selectId = res.result.id
					isSelected.value = true
				})
				.catch((err) => {
					console.log(err);
					uni.showToast({
						title: '出错了!',
						icon: 'none',
					})
				})
		}
	}

	//本地历史
	const setReadNewsLog = () => {
		let item = {
			"article_id": id.value,
			"last_time": Date.now()
		},
			readNewsLog = uni.getStorageSync('readNewsLog') || [],
			index = -1;
		readNewsLog.forEach(({ article_id }, i) => {
			if (article_id == item.article_id) {
				index = i
			}
		})
		if (index === -1) {
			readNewsLog.push(item)
		} else {
			readNewsLog.splice(index, 1, item)
		}
		uni.setStorageSync('readNewsLog', readNewsLog)
		console.log('本地历史记录', readNewsLog);
	}
</script>


<style scoped>
	.details {
		max-width: 95%;
		margin: 0 auto;
		padding: 10px;
		font-family: Arial, sans-serif;
	}

	.detailsVedio {
		width: 100%;
		border-radius: 10px;
		overflow: hidden;
		height: 220px;
		background-color: #000;
		margin-bottom: 4px;
	}

	.tips {
		height: 12px;
		display: flex;
		margin: 0 0 12px 0;
	}

	.tipsText {
		font-size: 12px;
		text-align: center;
		width: 100%;
		color: #726f6f;
	}

	.selection {
		display: block;
		font-size: 21px;
		color: #ff9545;
		margin-right: 5px;
	}

	.viewItem {
		display: flex;
		flex-direction: column;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		background-color: #fff;
		margin-bottom: 10px;
	}

	.title2 {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		/* 使用Helvetica字体族，优雅且通用 */
		font-size: 16px;
		/* 字体大小适中，适合作为二级标题 */
		font-weight: 650;
		/* 字体稍粗，但不过于显眼 */
		color: #000000;
		/* 字体颜色为黑色，清晰易读 */
		text-align: left;
		/* 文本左对齐，符合阅读习惯 */
		margin-top: 20px;
		/* 适当的上边距，与上方内容分隔 */
		margin-bottom: 10px;
		/* 较小的下边距，紧凑布局 */
		letter-spacing: 0.5px;
		/* 轻微的字母间距调整，增加美观度 */
	}

	.title1 {
		font-family: Arial, sans-serif;
		/* 使用 Arial 字体，如果找不到则使用无衬线字体 */
		font-size: 22px;
		/* 字体大小为 24 像素 */
		font-weight: bold;
		/* 字体加粗 */
		color: #333333;
		/* 字体颜色为深灰色 */
		text-align: center;
		/* 文本居中对齐 */
		margin-top: 30px;
		/* 上边距为 40 像素 */
		margin-bottom: 10px;
		/* 下边距为 20 像素 */
		text-transform: uppercase;
		/* 文本转换为大写 */
		letter-spacing: 2px;
		/* 字母间距为 2 像素 */
		position: relative;
		/* 定位为相对定位 */
	}

	.title1::before {
		content: '';
		/* 伪元素内容为空 */
		position: absolute;
		/* 定位为绝对定位 */
		width: 90%;
		/* 宽度为 50 像素 */
		height: 2px;
		/* 高度为 2 像素 */
		background-color: #333333;
		/* 背景颜色为深灰色 */
		left: 50%;
		/* 左边距为父元素的 50% */
		top: -20px;
		/* 上边距为负 20 像素，即向上移动 20 像素 */
		transform: translateX(-50%);
		/* 水平位移，使元素居中 */
	}

	.title1::after {
		content: '';
		/* 伪元素内容为空 */
		position: absolute;
		/* 定位为绝对定位 */
		width: 30px;
		/* 宽度为 30 像素 */
		height: 2px;
		/* 高度为 2 像素 */
		background-color: #333333;
		/* 背景颜色为深灰色 */
		left: 50%;
		/* 左边距为父元素的 50% */
		bottom: -10px;
		/* 下边距为负 10 像素，即向下移动 10 像素 */
		transform: translateX(-50%);
		/* 水平位移，使元素居中 */
	}

	.content {
		font-family: 'Helvetica Neue', Helvetica, Arial, 'Microsoft YaHei', 'WenQuanYi Micro Hei',
			sans-serif;
		/* 中西文字体设置 */
		font-size: 14px;
		/* 正文字体大小 */
		line-height: 1.6;
		/* 行高，影响阅读舒适度 */
		color: #333;
		/* 字体颜色 */
		text-align: justify;
		/* 文本两端对齐，仅适用于西文排版，中文通常不开启 */
		margin-bottom: 20px;
		/* 正文与下一个元素之间的间距 */
		text-indent: 2em;
		/* 首行缩进两个字符宽度，适用于中文排版 */
	}
</style>