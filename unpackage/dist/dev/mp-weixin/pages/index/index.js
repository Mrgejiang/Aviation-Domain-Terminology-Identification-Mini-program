"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_PageSkeleton = common_vendor.resolveComponent("PageSkeleton");
  _component_PageSkeleton();
}
if (!Math) {
  (CustomNavbar + TopSwiper + CategoryPanel + PreviewList)();
}
const CustomNavbar = () => "./components/CustomNavbar.js";
const TopSwiper = () => "./components/TopSwiper.js";
const CategoryPanel = () => "./components/CategoryPanel.js";
const PreviewList = () => "./components/PreviewList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const PreviewRef = common_vendor.ref(null);
    const db = common_vendor.er.database();
    const noticesList = [
      { _id: "1", imgUrl: "https://mp-003d93a9-efde-40df-a943-25e82e419019.cdn.bspapp.com/images/notice1.png" },
      { _id: "2", imgUrl: "https://mp-003d93a9-efde-40df-a943-25e82e419019.cdn.bspapp.com/images/notice2.png" }
    ];
    const categoryList = common_vendor.ref([]);
    const getCategoryData = async () => {
      const categoryTable = db.collection("opendb-news-categories");
      const res = await categoryTable.field("_id,name,icon").get();
      categoryList.value = res.result.data;
      common_vendor.index.setStorage({
        key: "categoryList",
        data: categoryList
      }).then(() => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:52", "获取并存储分类数据", common_vendor.index.getStorageSync("categoryList")._value);
      });
    };
    const isLoading = common_vendor.ref(true);
    common_vendor.onLoad(async () => {
      isLoading.value = true;
      getCategoryData().catch(() => {
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "error"
        });
      }).finally(() => {
        isLoading.value = false;
      });
    });
    const onScrolltolower = () => {
      var _a;
      (_a = PreviewRef.value) == null ? void 0 : _a.getMore();
    };
    const isLriggered = common_vendor.ref(false);
    const onRefresherrefresh = async () => {
      var _a;
      isLriggered.value = true;
      await Promise.all([getCategoryData(), (_a = PreviewRef.value) == null ? void 0 : _a.resetData()]);
      isLriggered.value = false;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {} : {
        b: common_vendor.p({
          list: noticesList
        }),
        c: common_vendor.p({
          list: categoryList.value
        }),
        d: common_vendor.sr(PreviewRef, "4df28747-4", {
          "k": "PreviewRef"
        })
      }, {
        e: common_vendor.o(onScrolltolower),
        f: common_vendor.o(onRefresherrefresh),
        g: isLriggered.value
      });
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
