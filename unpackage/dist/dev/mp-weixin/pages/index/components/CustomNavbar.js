"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "CustomNavbar",
  setup(__props) {
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const searchContent = common_vendor.ref("");
    const onSearch = () => {
      if (searchContent.value === "") {
        return common_vendor.index.showToast({
          title: "请输入搜索内容",
          icon: "none"
        });
      }
      common_vendor.index.__f__("log", "at pages/index/components/CustomNavbar.vue:33", "searchContent:", searchContent.value);
      common_vendor.index.navigateTo({
        url: `/pages/search/search?content=${searchContent.value}`
      });
    };
    const styles = {
      color: "#333",
      borderColor: "#2979FF",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      disableColor: "#f7f6f6"
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.o(onSearch),
        c: common_vendor.o(onSearch),
        d: common_vendor.o(($event) => searchContent.value = $event),
        e: common_vendor.p({
          styles,
          trim: "both",
          prefixIcon: "search",
          clearable: true,
          type: "text",
          placeholder: "搜索术语",
          confirmType: "search",
          modelValue: searchContent.value
        }),
        f: common_vendor.unref(safeAreaInsets).top + 10 + "px"
      };
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/CustomNavbar.js.map
