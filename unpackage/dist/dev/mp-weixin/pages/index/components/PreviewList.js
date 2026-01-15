"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_load_more2 + _easycom_unicloud_db2)();
}
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_unicloud_db)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "PreviewList",
  setup(__props, { expose: __expose }) {
    const db = common_vendor.er.database();
    const category = db.collection("opendb-news-categories").field("_id,name").getTemp();
    const acticle = db.collection("opendb-news-articles").field("_id,poster,cnDetails.name,cnDetails.category_id,usDetails.name,usDetails.category_id,euDetails.name,euDetails.category_id").getTemp();
    const collectionList = [acticle, category];
    const handleLoad = (data, ended, pagination) => {
      common_vendor.index.__f__("log", "at pages/index/components/PreviewList.vue:54", "结果", data);
    };
    common_vendor.ref({
      contentdown: "",
      contentrefresh: "",
      contentnomore: ""
    });
    const udb = common_vendor.ref(null);
    const resetData = async () => {
      await udb.value.loadData({
        clear: true
      }, () => {
      });
      common_vendor.index.__f__("log", "at pages/index/components/PreviewList.vue:72", "重置数据");
    };
    const getMore = async () => {
      await udb.value.loadMore();
      common_vendor.index.__f__("log", "at pages/index/components/PreviewList.vue:78", "加载更多");
    };
    __expose({
      resetData,
      getMore
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          loading,
          hasMore,
          error
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(error.message)
          } : data ? {
            d: common_vendor.f(data, (item, k1, i1) => {
              var _a, _b, _c;
              return {
                a: item.poster,
                b: common_vendor.t(item.cnDetails.name || item.usDetails.name || item.euDetails.name),
                c: common_vendor.t(((_a = item.cnDetails.category_id[0]) == null ? void 0 : _a.name) || ((_b = item.usDetails.category_id[0]) == null ? void 0 : _b.name) || ((_c = item.euDetails.category_id[0]) == null ? void 0 : _c.name) || "未分类"),
                d: item._id,
                e: `/pages/details/details?id=${item._id}`
              };
            })
          } : {}, {
            c: data,
            e: "bae78070-1-" + i0 + ",bae78070-0",
            f: common_vendor.p({
              status: loading ? "loading" : hasMore ? "more" : "noMore"
            }),
            g: i0,
            h: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "bae78070-0"
        }),
        b: common_vendor.sr(udb, "bae78070-0", {
          "k": "udb"
        }),
        c: common_vendor.o(handleLoad),
        d: common_vendor.p({
          collection: collectionList,
          ["page-size"]: 10
        })
      };
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/PreviewList.js.map
