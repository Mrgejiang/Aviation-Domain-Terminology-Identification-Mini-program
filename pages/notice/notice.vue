<template>
	<view class="notification">
		<h1 class="notification-title">津门兰鸢</h1>
		<h2 style="text-align: center">通知{{ id }}</h2>
		<h3 style="text-align: center">助力航空领域跨文化交流新利器</h3>
		<view class="notification-content">
			<p class="notification-content">
				在全球化日益深入的今天，航空业作为连接世界的桥梁，其跨国交流与合作愈发频繁。然而，由于中美欧三地航空领域术语表述、定义及使用的差异，往往给业内人员和学者带来沟通障碍，影响航空交流的效率与安全性。为了解决这一问题，我们特别推出了这款专为民航业内人员或学者设计的中美欧航空术语查询小程序。
			</p>
			<p class="notification-content">
				这款小程序旨在为广大航空从业者和学者提供一个便捷、高效的术语查询平台。用户只需输入需要查询的术语，小程序即可迅速呈现出中美欧三地对应的术语表述、定义及使用情况。通过对比分析，用户可以清晰地了解到不同地区术语的异同，以及背后的成因，从而避免在跨文化交流中因术语差异而产生误解或沟通障碍。
			</p>
			<p class="notification-content">
				此外，小程序还提供了丰富的对比分析、异同性解释研究分析报告，帮助用户深入理解不同地区航空术语的演变历程和文化背景。这些报告不仅有助于提升用户的跨文化交际能力，还能为航空领域的国际合作与交流提供有力支持。
			</p>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app"
	import { ref } from "vue";

	const id = ref('')

	onLoad((op) => {
		id.value = op.id
		console.log("页面传参", op.id);
	})
</script>

<style scoped>
	.notification {
		background-color: #f8f8f8;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 16px;
		margin-bottom: 16px;
	}

	.notification-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	}

	.notification-title {
		font-size: 18px;
		margin: 0;
		text-align: center;
	}

	.notification-close {
		background-color: transparent;
		border: none;
		cursor: pointer;
		font-size: 18px;
		padding: 0;
	}

	.notification-content {
		font-size: 14px;
		color: #333;
		text-indent: 2em;
		line-height: 1.5;
	}
</style>