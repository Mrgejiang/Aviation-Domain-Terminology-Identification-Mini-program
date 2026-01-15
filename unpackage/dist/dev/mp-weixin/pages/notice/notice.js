"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "notice",
  setup(__props) {
    const id = common_vendor.ref("");
    common_vendor.onLoad((op) => {
      id.value = op.id;
      common_vendor.index.__f__("log", "at pages/notice/notice.vue:28", "页面传参", op.id);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(id.value)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c2e4c1e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notice/notice.js.map
