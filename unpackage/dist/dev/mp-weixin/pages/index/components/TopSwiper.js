"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "TopSwiper",
  props: {
    list: {}
  },
  setup(__props) {
    const activeIndex = common_vendor.ref(0);
    const onChange = (ev) => {
      activeIndex.value = ev.detail.current;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(_ctx.list, (item, k0, i0) => {
          return {
            a: item.imgUrl,
            b: `/pages/notice/notice?id=${item._id}`,
            c: item._id
          };
        }),
        b: common_vendor.o(onChange),
        c: common_vendor.f(_ctx.list, (item, index, i0) => {
          return {
            a: item._id,
            b: index === activeIndex.value ? 1 : ""
          };
        })
      };
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/TopSwiper.js.map
