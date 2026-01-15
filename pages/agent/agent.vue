<template>
	<view class="container">
		<!-- 顶部机器人信息 -->
		<view class="header">
			<image class="header-avatar" :src="botInfo.icon_url" mode="aspectFill" />
			<view class="header-info">
				<text class="bot-name">{{ botInfo.name }}</text>
				<text class="bot-desc">{{ botInfo.description }}</text>
			</view>
		</view>

		<!-- 消息列表 -->
		<scroll-view 
			class="message-list" 
			scroll-y="true" 
			:scroll-into-view="lastMsgId"
			:style="{ paddingBottom: '180rpx' }"
		>
			<!-- 消息项 -->
			<view 
				v-for="(msg, index) in messages" 
				:key="index"
				:id="'msg' + index"
				:class="['message-item', msg.type]"
			>
				<image 
					v-if="msg.type === 'ai'"
					class="avatar"
					:src="botInfo.icon_url" 
					mode="aspectFill"
				/>
				<view class="message-content">
					<text v-if="msg.type === 'ai'" class="bot-name">{{ botInfo.name }}</text>
					<view class="message-bubble">
						<text>{{ msg.content }}</text>
						<view class="message-footer">
							<text class="time">{{ msg.time }}</text>
						</view>
					</view>
				</view>
				<image 
					v-if="msg.type === 'user'"
					class="avatar"
					src="/static/images/user-avatar.png"
					mode="aspectFill"
				/>
			</view>
			<!-- 预设问题 -->
			<view v-if="showSuggested" class="suggested-questions">
				<view 
					v-for="(question, qIndex) in botInfo.suggestedQuestions"
					:key="'q'+qIndex"
					class="question-tag"
					@click="sendSuggested(question)"
				>
					{{ question }}
				</view>
			</view>
		</scroll-view>

		<!-- 输入区域 - 修改为固定定位 -->
		<view class="input-wrapper">
			<view class="input-area">
				<input 
					class="input" 
					v-model="inputText" 
					:placeholder="inputPlaceholder"
					@confirm="sendMessage"
				/>
				<button class="send-btn" @tap="sendMessage" :disabled="isLoading">
					{{ isLoading ? '思考中...' : '发送' }}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messages: [],
				inputText: '',
				lastMsgId: '',
				botInfo: {
					name: '',
					icon_url: '',
					description: '',
					suggestedQuestions: []
				},
				inputPlaceholder: '请输入您的问题',
				isLoading: false,
				showSuggested: true,
				conversationId: null
			}
		},
		created() {
			this.initBotInfo()
		},
		methods: {
			async initBotInfo() {
				try {
					const res = await uni.request({
						url: 'https://api.coze.cn/v1/bot/get_online_info?bot_id=7461239179847172122',
						method: 'GET',
						header: {
							'Authorization': 'Bearer pat_6yySAkMrimmjkwJMfE8lfuUtJzJnwSwjYj34ACUZMIK21fFuWad3a91NvYuDl77s',
							'Content-Type': 'application/json'
						}
					});
					
					if(res.data.code === 0) {
						const data = res.data.data
						this.botInfo = {
							name: data.name,
							icon_url: data.icon_url,
							description: data.description,
							suggestedQuestions: data.onboarding_info.suggested_questions
						}
						
						this.messages.push({
							type: 'ai',
							content: data.onboarding_info.prologue,
							time: this.getCurrentTime()
						})
						
						const promptMatch = data.prompt_info.prompt.match(/请输入(.*?)\n/)
						this.inputPlaceholder = promptMatch ? promptMatch[1] : '请输入您的问题'
					}
				} catch (e) {
					console.error('初始化失败:', e)
				}
			},

			async getAIResponse(question) {
				try {
					const res = await uni.request({
						url: 'https://api.coze.cn/open_api/v2/chat',
						method: 'POST',
						header: {
							'Authorization': 'Bearer pat_6yySAkMrimmjkwJMfE8lfuUtJzJnwSwjYj34ACUZMIK21fFuWad3a91NvYuDl77s',
							'Content-Type': 'application/json'
						},
						data: {
							bot_id: '7461239179847172122',
							user: 'uni-app-user',
							query: question,
							stream: false
						}
					});

					const response = res.data;
					console.log('API返回数据:', response);

					if (response.code !== 0) {
						throw new Error(response.msg || 'API返回错误');
					}

					// 在messages数组中查找type为'answer'的消息
					const answerMessage = response.messages.find(msg => msg.type === 'answer');
					if (!answerMessage) {
						throw new Error('未找到回答内容');
					}

					// 获取推荐问题
					const followUpQuestions = response.messages
						.filter(msg => msg.type === 'follow_up')
						.map(msg => msg.content);
					
					// 如果有推荐问题，更新到botInfo中
					if (followUpQuestions.length > 0) {
						this.botInfo.suggestedQuestions = followUpQuestions;
						this.showSuggested = true;
					}

					return {
						content: answerMessage.content
					};

				} catch (error) {
					console.error('API请求失败:', error);
					throw new Error(`请求失败：${error.message}`);
				}
			},

			async sendMessage() {
				if (!this.inputText.trim() || this.isLoading) return
				
				this.showSuggested = false
				const userMsg = {
					type: 'user',
					content: this.inputText,
					time: this.getCurrentTime()
				}
				this.messages.push(userMsg)
				
				// 创建AI回复消息占位
				const aiMsg = {
					type: 'ai',
					content: '',
					time: this.getCurrentTime()
				}
				this.messages.push(aiMsg)
				
				const question = this.inputText
				this.inputText = ''
				this.isLoading = true
				
				try {
					const res = await this.getAIResponse(question)
					// 更新最后一条AI消息
					aiMsg.content = res.content
				} catch (e) {
					aiMsg.content = `请求失败：${e.message || '网络异常，请稍后重试'}`
				}
				
				this.isLoading = false
				this.scrollToBottom()
			},

			sendSuggested(question) {
				this.inputText = question
				this.sendMessage()
			},

			getCurrentTime() {
				const date = new Date()
				return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
			},

			scrollToBottom() {
				this.$nextTick(() => {
					this.lastMsgId = 'msg' + (this.messages.length - 1)
				})
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		overflow: hidden;
	}
.container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #f8f9fa;
}

.header {
	display: flex;
	align-items: center;
	padding: 1rpx 0rpx;
	background: white;
	border-bottom: 1rpx solid #eee;
}

.header-avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 16rpx;
	margin-right: 20rpx;
}

.header-info {
	flex: 1;
}

.bot-name {
	font-size: 34rpx;
	font-weight: 500;
}

.bot-desc {
	font-size: 24rpx;
	color: #666;
	display: block;
}

.message-list {
	flex: 1;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
}

.suggested-questions {
	margin: 20rpx 0;
}

.question-tag {
	display: block;
	padding: 20rpx 30rpx;
	background: #e8f4ff;
	border-radius: 16rpx;
	margin-bottom: 20rpx;
	font-size: 26rpx;
	color: #1890ff;
}

.message-item {
	display: flex;
	margin: 40rpx 0;
}

.message-item.user {
	flex-direction: row-reverse;
}

.message-content {
	flex: 1;
	max-width: 75%;
}

.message-item.user .message-content {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.message-bubble {
	padding: 20rpx 30rpx;
	border-radius: 12rpx;
	background: white;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.message-item.user .message-bubble {
	background: #1890ff;
	color: white;
}

.message-item.user .time {
	color: rgba(255,255,255,0.8);
}

.avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 8rpx;
	margin: 0 20rpx;
}

.message-footer {
	margin-top: 15rpx;
	padding-top: 10rpx;
	border-top: 1rpx solid rgba(255,255,255,0.2);
}

.time {
	font-size: 24rpx;
	color: rgba(255,255,255,0.8);
}

.input-wrapper {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 100rpx;
	z-index: 100;
}

.input-area {
	display: flex;
	align-items: center;
	padding: 20rpx 30rpx;
	background: white;
	box-shadow: 0 -4rpx 16rpx rgba(0,0,0,0.1);
	margin-bottom: -100rpx;
}

.input {
	flex: 1;
	height: 80rpx;
	padding: 0 30rpx;
	background: #f5f5f5;
	border-radius: 40rpx;
	font-size: 28rpx;
}

.send-btn {
	width: 160rpx;
	height: 80rpx;
	margin-left: 20rpx;
	background: #1890ff;
	color: white;
	border-radius: 40rpx;
	font-size: 28rpx;
}
</style>