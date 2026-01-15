"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_load_state2 = common_vendor.resolveComponent("uni-load-state");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_dateformat2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_load_state2 + _easycom_unicloud_db2)();
}
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_load_state = () => "../../../components/uni-load-state/uni-load-state.js";
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_load_state + _easycom_unicloud_db)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "favorite",
  setup(__props) {
    const udb = common_vendor.ref(null);
    const db = common_vendor.er.database();
    const favorite = db.collection("opendb-news-favorite").where('"user_id"==$env.uid').field("article_id,update_date").getTemp();
    const article = db.collection("opendb-news-articles").field("_id,poster,cnDetails.name,usDetails.name,euDetails.name").getTemp();
    const collectionList = [favorite, article];
    const isLoading = common_vendor.ref(true);
    common_vendor.ref({
      contentdown: "",
      contentrefresh: "",
      contentnomore: ""
    });
    common_vendor.ref("");
    common_vendor.onLoad(() => {
    });
    const refreshData = () => {
      udb.value.loadData({
        clear: true
      }, (res) => {
        common_vendor.index.stopPullDownRefresh();
      });
    };
    const handleItemClick = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/details/details?id=" + item.article_id[0]._id
      });
    };
    common_vendor.onReachBottom(() => {
      udb.value.loadMore();
    });
    common_vendor.onPullDownRefresh(() => {
      refreshData();
    });
    common_vendor.onShow(() => {
      refreshData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          pagination,
          loading,
          hasMore,
          error
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(error.message)
          } : data ? {
            d: common_vendor.f(data, (item, index, i1) => {
              return {
                a: item.article_id[0].poster,
                b: common_vendor.t(item.article_id[0].cnDetails.name || "中 无名称"),
                c: common_vendor.t(item.article_id[0].usDetails.name || "美 无名称"),
                d: common_vendor.t(item.article_id[0].euDetails.name || "欧 无名称"),
                e: "550424dc-3-" + i0 + "-" + i1 + "," + ("550424dc-2-" + i0 + "-" + i1),
                f: common_vendor.p({
                  date: item.update_date,
                  format: "yyyy-MM-dd hh:mm",
                  threshold: [0, 0]
                }),
                g: index,
                h: common_vendor.o(($event) => handleItemClick(item), index),
                i: "550424dc-2-" + i0 + "-" + i1 + "," + ("550424dc-1-" + i0)
              };
            }),
            e: common_vendor.p({
              clickable: true
            }),
            f: "550424dc-1-" + i0 + ",550424dc-0"
          } : {}, {
            c: data,
            g: "550424dc-4-" + i0 + ",550424dc-0",
            h: common_vendor.p({
              state: {
                data,
                pagination,
                hasMore,
                loading,
                error
              }
            }),
            i: i0,
            j: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "550424dc-0"
        }),
        b: common_vendor.o(refreshData),
        c: common_vendor.sr(udb, "550424dc-0", {
          "k": "udb"
        }),
        d: common_vendor.o(($event) => isLoading.value == false),
        e: common_vendor.o(($event) => isLoading.value == false),
        f: common_vendor.p({
          collection: collectionList
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/ucenter/favorite/favorite.js.map
