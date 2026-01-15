"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _component_PageSkeleton = common_vendor.resolveComponent("PageSkeleton");
  (_easycom_uni_easyinput2 + _easycom_uni_data_checkbox2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _component_PageSkeleton)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_data_checkbox + _easycom_uni_collapse_item + _easycom_uni_collapse + PreviewList)();
}
const PreviewList = () => "./components/PreviewList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search",
  setup(__props) {
    const PreviewRef = common_vendor.ref(null);
    const uci = common_vendor.ref(null);
    const params = common_vendor.ref({});
    const onScrolltolower = () => {
      PreviewRef.value.getMore();
    };
    common_vendor.onLoad((op) => {
      isLoading.value = true;
      searchParams.value.content = op.content;
      params.value = searchParams.value;
      setTimeout(() => {
        isLoading.value = false;
      }, 1e3);
    });
    const searchParams = common_vendor.ref({
      content: "",
      method: "fuzzy",
      country: "all",
      categoryId: "all"
    });
    const categoryList = common_vendor.ref(
      [{ text: "全部", value: "all" }].concat(common_vendor.index.getStorageSync("categoryList")._value.map((item) => {
        return {
          text: item.name,
          value: item._id
        };
      }))
    );
    const isLriggered = common_vendor.ref(false);
    const onRefresherrefresh = async () => {
      var _a;
      isLriggered.value = true;
      await ((_a = PreviewRef.value) == null ? void 0 : _a.resetData());
      isLriggered.value = false;
    };
    const isOpen = common_vendor.ref("key2");
    const isLoading = common_vendor.ref(false);
    const onSearch = async () => {
      if (searchParams.value.content === "") {
        return common_vendor.index.showToast({
          title: "请输入搜索内容",
          icon: "none"
        });
      }
      isLoading.value = true;
      params.value = searchParams.value;
      setTimeout(() => {
        isLoading.value = false;
      }, 1e3);
      if (isOpen.value === "key1") {
        uci.value.onClick(false);
      }
    };
    const styles = {
      color: "#333",
      borderColor: "#111",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      disableColor: "#f7f6f6"
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onSearch),
        b: common_vendor.o(onSearch),
        c: common_vendor.o(($event) => searchParams.value.content = $event),
        d: common_vendor.p({
          styles,
          trim: "both",
          prefixIcon: "search",
          clearable: true,
          type: "text",
          placeholder: "搜索术语",
          confirmType: "search",
          modelValue: searchParams.value.content
        }),
        e: common_vendor.o(($event) => searchParams.value.method = $event),
        f: common_vendor.p({
          localdata: [{
            text: "模糊搜索",
            value: "fuzzy"
          }, {
            text: "精确搜索",
            value: "exact"
          }],
          mode: "tag",
          modelValue: searchParams.value.method
        }),
        g: common_vendor.o(($event) => searchParams.value.country = $event),
        h: common_vendor.p({
          localdata: [{
            text: "全部",
            value: "all"
          }, {
            text: "中国",
            value: "cn"
          }, {
            text: "美国",
            value: "us"
          }, {
            text: "欧盟",
            value: "eu"
          }],
          mode: "tag",
          modelValue: searchParams.value.country
        }),
        i: common_vendor.o(($event) => searchParams.value.categoryId = $event),
        j: common_vendor.p({
          localdata: categoryList.value,
          mode: "tag",
          modelValue: searchParams.value.categoryId
        }),
        k: common_vendor.sr(uci, "7ef39e61-2,7ef39e61-1", {
          "k": "uci"
        }),
        l: common_vendor.p({
          name: "key1",
          title: "高级搜索"
        }),
        m: common_vendor.o(($event) => isOpen.value = $event),
        n: common_vendor.p({
          accordion: "true",
          modelValue: isOpen.value
        }),
        o: isLoading.value
      }, isLoading.value ? {} : {
        p: common_vendor.sr(PreviewRef, "7ef39e61-7", {
          "k": "PreviewRef"
        }),
        q: common_vendor.p({
          searchParams: params.value
        }),
        r: common_vendor.o(onScrolltolower),
        s: common_vendor.o(onRefresherrefresh),
        t: isLriggered.value
      });
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map
