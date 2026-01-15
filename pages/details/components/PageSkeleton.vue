<!--
此文件为开发者工具生成，生成时间: 2024/3/21上午12:36:17
使用方法：
在 D:\program\uni-app\orchid-kite\dist\dev\mp-weixin\pages\details\details.wxml 引入模板

```
<import src="details.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 D:\program\uni-app\orchid-kite\dist\dev\mp-weixin\pages\details\details.wxss 中引入样式
```
@import "./details.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
  <view class="sk-container">
    <view class="details details data-v-8402940e data-v-8402940e">
      <view
        autoplay="true"
        controls="true"
        enable-play-gesture="true"
        muted="true"
        show-mute-btn="true"
        class="detailsVedio data-v-8402940e sk-transparent sk-text sk-image"
        src="/static/localData/video/tempVideo.mp4"
        title="飞机"
        unit-id="true"
        show-fullscreen-btn="true"
        >00:0000:00</view
      >
      <view class="tips tips data-v-8402940e data-v-8402940e">
        <text
          class="tipsText data-v-8402940e sk-transparent sk-text-14-2857-568 sk-text"
          style="background-position-x: 50%"
          >双击可以播放或暂停哦</text
        >
        <text class="selection icon-heart data-v-8402940e sk-pseudo sk-pseudo-circle"></text>
      </view>
      <scroll-view
        :enable-back-to-top="true"
        :scroll-y="true"
        class="data-v-8402940e data-v-8402940e"
      >
        <view class="viewItem viewItem data-v-8402940e data-v-8402940e">
          <view class="title1 data-v-8402940e sk-pseudo sk-pseudo-circle">
            <text
              class="data-v-8402940e sk-transparent sk-text-14-2857-485 sk-text"
              style="background-position-x: 50%"
              >中</text
            >
          </view>
          <view class="data-v-8402940e data-v-8402940e">
            <view class="title2 data-v-8402940e sk-transparent sk-text-14-2857-538 sk-text"
              >●名称</view
            >
            <text
              :user-select="true"
              class="content data-v-8402940e sk-transparent sk-text-18-7500-327 sk-text"
              >飞机</text
            >
          </view>
          <view class="data-v-8402940e data-v-8402940e">
            <view class="title2 data-v-8402940e sk-transparent sk-text-14-2857-566 sk-text"
              >●英文</view
            >
            <text
              :user-select="true"
              class="content data-v-8402940e sk-transparent sk-text-18-7500-427 sk-text"
              >airplane</text
            >
          </view>
          <view class="data-v-8402940e data-v-8402940e">
            <view class="title2 data-v-8402940e sk-transparent sk-text-14-2857-940 sk-text"
              >●缩写</view
            >
            <text
              :user-select="true"
              class="content data-v-8402940e sk-transparent sk-text-18-7500-597 sk-text"
              >暂无</text
            >
          </view>
          <view class="data-v-8402940e data-v-8402940e"></view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style>
/*
此文件为开发者工具生成，生成时间: 2024/3/21上午12:36:17

在 D:\program\uni-app\orchid-kite\dist\dev\mp-weixin\pages\details\details.wxss 中引入样式
```
@import "./details.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}

/* .sk-text--Infinity-644 {
    background-image: linear-gradient(transparent -Infinity%, #EEEEEE 0%, #EEEEEE NaN%, transparent 0%) !important;
    background-size: 100% 0.0000rpx;
    position: relative !important;
} */

.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}

.sk-text-14-2857-568 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.375rpx;
  position: relative !important;
}

.sk-text-14-2857-485 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 72.1875rpx;
  position: relative !important;
}

.sk-text-14-2857-538 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 52.5rpx;
  position: relative !important;
}

.sk-text-18-7500-327 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 52.5rpx;
  position: relative !important;
}

.sk-text-14-2857-566 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 52.5rpx;
  position: relative !important;
}

.sk-text-18-7500-427 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 52.5rpx;
  position: relative !important;
}

.sk-text-14-2857-940 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 52.5rpx;
  position: relative !important;
}

.sk-text-18-7500-597 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 52.5rpx;
  position: relative !important;
}

.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}

.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}

.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}

.sk-image {
  background: #efefef !important;
}

.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
