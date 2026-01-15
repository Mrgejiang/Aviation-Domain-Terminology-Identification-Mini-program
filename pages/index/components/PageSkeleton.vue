<!--
此文件为开发者工具生成，生成时间: 2024/3/18下午5:15:53
使用方法：
在 D:\program\uni-app\orchid-kite\dist\dev\mp-weixin\pages\index\index.wxml 引入模板

```
<import src="index.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 D:\program\uni-app\orchid-kite\dist\dev\mp-weixin\pages\index\index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
  <view is="pages/index/components/TopSwiper">
    <view class="carousel TopSwiper--carousel">
      <swiper :autoplay="false" :circular="true" :interval="3000" :current="0"></swiper>
      <view class="indicator TopSwiper--indicator">
        <text class="dot TopSwiper--dot"></text>
        <text class="dot TopSwiper--dot active TopSwiper--active"></text>
      </view>
    </view>
  </view>
  <view is="pages/index/components/CategoryPanel">
    <view class="category CategoryPanel--category">
      <navigator
        class="category-item CategoryPanel--category-item"
        hover-class="none"
        open-type="switchTab"
      >
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-204 sk-text"
          >安全保...</text
        >
      </navigator>
      <navigator
        class="category-item CategoryPanel--category-item"
        hover-class="none"
        open-type="switchTab"
      >
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-604 sk-text"
          >场道工程</text
        >
      </navigator>
      <navigator
        class="category-item CategoryPanel--category-item"
        hover-class="none"
        open-type="switchTab"
      >
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-475 sk-text"
          >公用设施</text
        >
      </navigator>
      <navigator
        class="category-item CategoryPanel--category-item"
        hover-class="none"
        open-type="switchTab"
      >
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-409 sk-text"
          >供油工程</text
        >
      </navigator>
      <navigator
        class="category-item CategoryPanel--category-item"
        hover-class="none"
        open-type="switchTab"
      >
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-979 sk-text"
          >航空器...</text
        >
      </navigator>
      <navigator
        class="category-item CategoryPanel--category-item"
        hover-class="none"
        open-type="switchTab"
      >
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-408 sk-text"
          >航空器...</text
        >
      </navigator>
      <navigator
        class="category-item CategoryPanel--category-item"
        hover-class="none"
        open-type="switchTab"
      >
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-200 sk-text"
          >航空器...</text
        >
      </navigator>
      <navigator
        class="category-item CategoryPanel--category-item"
        hover-class="none"
        open-type="switchTab"
      >
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-792 sk-text"
          >航空摄...</text
        >
      </navigator>
      <navigator
        class="category-item CategoryPanel--category-item"
        hover-class="none"
        open-type="switchTab"
      >
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-970 sk-text"
          >航空食...</text
        >
      </navigator>
      <navigator
        class="category-item CategoryPanel--category-item"
        hover-class="none"
        open-type="switchTab"
      >
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-16 sk-text"
          >航摄仪...</text
        >
      </navigator>
      <view></view>
      <view class="moreView CategoryPanel--moreView">
        <button
          class="more CategoryPanel--more sk-transparent sk-button sk-pseudo sk-pseudo-circle"
        >
          更多∨
        </button>
      </view>
    </view>
  </view>
  <view is="components/OkPreviewList" class="r r">
    <view class="caption OkPreviewList--caption">
      <text
        class="text OkPreviewList--text sk-transparent sk-text-0-0000-895 sk-text sk-pseudo sk-pseudo-circle"
        >推荐</text
      >
    </view>
    <view class="guess OkPreviewList--guess">
      <navigator class="guess-item OkPreviewList--guess-item" open-type="navigate">
        <image class="image OkPreviewList--image sk-image" mode="aspectFill"></image>
      </navigator>
    </view>
  </view>
</template>

<style>
/*
此文件为开发者工具生成，生成时间: 2024/3/18下午5:15:53

在 D:\program\uni-app\orchid-kite\dist\dev\mp-weixin\pages\index\index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}

.sk-text-0-0000-371 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25.7813rpx;
  position: relative !important;
}

.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}

.sk-text-14-2857-101 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-14-2857-204 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-14-2857-604 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-14-2857-475 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-14-2857-409 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-14-2857-979 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-14-2857-408 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-14-2857-200 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-14-2857-792 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-14-2857-970 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-14-2857-16 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-0-0000-895 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 30.4688rpx;
  position: relative !important;
}

.sk-button {
  color: #efefef !important;
  background: #efefef !important;
  border: none !important;
  box-shadow: none !important;
}

.sk-image {
  background: #efefef !important;
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
