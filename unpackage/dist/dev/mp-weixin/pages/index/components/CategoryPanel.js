"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "CategoryPanel",
  props: {
    list: {}
  },
  setup(__props) {
    const props = __props;
    const isMore = common_vendor.ref(false);
    const showList = common_vendor.ref();
    const onClick = () => {
      if (isMore.value) {
        showList.value = props.list.slice(0, 10);
      } else {
        showList.value = props.list;
      }
      isMore.value = !isMore.value;
    };
    common_vendor.onMounted(() => {
      showList.value = props.list.slice(0, 10);
    });
    const onTapToCategory = (id) => {
      common_vendor.index.setStorageSync("curCategory", id);
      common_vendor.index.switchTab({ url: `/pages/category/category` });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(showList.value, (item, k0, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.name.length <= 4 ? item.name : item.name.substring(0, 3) + "..."),
            c: item._id,
            d: common_vendor.o(($event) => onTapToCategory(item._id), item._id)
          };
        }),
        b: props.list.length > 10
      }, props.list.length > 10 ? {
        c: common_vendor.t(isMore.value ? "收起∧" : "更多∨"),
        d: common_vendor.o(onClick)
      } : {});
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/CategoryPanel.js.map
