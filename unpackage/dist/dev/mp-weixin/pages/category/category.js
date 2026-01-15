"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_PageSkeleton = common_vendor.resolveComponent("PageSkeleton");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_component_PageSkeleton + _easycom_uni_easyinput2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_easyinput + PreviewList)();
}
const PreviewList = () => "./components/PreviewList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "category",
  setup(__props) {
    const db = common_vendor.er.database();
    const PreviewRef = common_vendor.ref(null);
    const onScrolltolower = () => {
      var _a;
      (_a = PreviewRef.value) == null ? void 0 : _a.getMore();
    };
    const categoryList = common_vendor.ref([]);
    const getCategoryData = async () => {
      const categoryTable = db.collection("opendb-news-categories");
      const res = await categoryTable.field("_id,name").get();
      categoryList.value = res.result.data;
      common_vendor.index.__f__("log", "at pages/category/category.vue:52", "获取分类数据", categoryList.value);
    };
    const activityIndex = common_vendor.ref(0);
    const curName = common_vendor.computed(() => {
      var _a;
      return ((_a = categoryList.value[activityIndex.value]) == null ? void 0 : _a.name) || "名称";
    });
    const curId = common_vendor.computed(() => {
      var _a;
      return ((_a = categoryList.value[activityIndex.value]) == null ? void 0 : _a._id) || "0";
    });
    const onTapChangeCategory = (index, id) => {
      activityIndex.value = index;
      common_vendor.index.setStorage({ key: "curCategory", data: id });
    };
    const isLriggered = common_vendor.ref(false);
    const onRefresherrefresh = async () => {
      var _a;
      isLriggered.value = true;
      await ((_a = PreviewRef.value) == null ? void 0 : _a.resetData());
      isLriggered.value = false;
    };
    const searchContent = common_vendor.ref("");
    const onSearch = () => {
      if (searchContent.value === "") {
        return common_vendor.index.showToast({
          title: "请输入搜索内容",
          icon: "none"
        });
      }
      common_vendor.index.navigateTo({
        url: `/pages/search/search?content=${searchContent.value}`
      });
    };
    const isLoading = common_vendor.ref(true);
    const curCategory = common_vendor.ref("");
    common_vendor.onLoad(async () => {
      curCategory.value = common_vendor.index.getStorageSync("curCategory");
      await getCategoryData();
      categoryList.value = common_vendor.index.getStorageSync("categoryList")._value;
      common_vendor.index.__f__("log", "at pages/category/category.vue:105", "定位分类", curCategory.value);
      if (curCategory.value !== "") {
        const index = categoryList.value.findIndex((item) => item._id === curCategory.value);
        if (index !== -1) {
          activityIndex.value = index;
        }
      }
      isLoading.value = false;
    });
    common_vendor.onShow(() => {
      const id = common_vendor.index.getStorageSync("curCategory");
      if (id) {
        const index = categoryList.value.findIndex((item) => item._id === id);
        if (index !== -1) {
          activityIndex.value = index;
        }
      }
    });
    const styles = {
      color: "#333",
      borderColor: "#111",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      disableColor: "#f7f6f6"
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {} : {
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
        f: common_vendor.f(categoryList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name.length <= 4 ? item.name : item.name.substring(0, 3) + "..."),
            b: item._id,
            c: index === activityIndex.value ? 1 : "",
            d: common_vendor.o(($event) => onTapChangeCategory(index, item._id), item._id)
          };
        }),
        g: common_vendor.sr(PreviewRef, "b37b673e-2", {
          "k": "PreviewRef"
        }),
        h: curId.value,
        i: common_vendor.p({
          name: curName.value,
          id: curId.value
        }),
        j: common_vendor.o(onScrolltolower),
        k: common_vendor.o(onRefresherrefresh),
        l: isLriggered.value
      });
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/category/category.js.map
