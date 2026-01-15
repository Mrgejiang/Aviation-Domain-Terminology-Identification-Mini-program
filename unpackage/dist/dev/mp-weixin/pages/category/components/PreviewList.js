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
const collectionList = "opendb-news-articles";
const sField = "_id,poster,cnDetails.name,cnDetails.category_id,usDetails.name,usDetails.category_id,euDetails.name,euDetails.category_id";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "PreviewList",
  props: {
    name: {},
    id: {}
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const db = common_vendor.er.database();
    const dbCmd = db.command;
    const sWhere = common_vendor.computed(() => {
      return dbCmd.or([
        {
          cnDetails: {
            category_id: props.id
          }
        },
        {
          usDetails: {
            category_id: props.id
          }
        },
        {
          euDetails: {
            category_id: props.id
          }
        }
      ]);
    });
    common_vendor.ref({
      contentdown: "",
      contentrefresh: "",
      contentnomore: ""
    });
    const handleLoad = (data, ended, pagination) => {
      common_vendor.index.__f__("log", "at pages/category/components/PreviewList.vue:67", "结果", data);
    };
    const udb = common_vendor.ref(null);
    const resetData = async () => {
      await udb.value.loadData({
        clear: true
      }, () => {
      });
      common_vendor.index.__f__("log", "at pages/category/components/PreviewList.vue:79", "重置数据");
    };
    const getMore = async () => {
      await udb.value.loadMore();
      common_vendor.index.__f__("log", "at pages/category/components/PreviewList.vue:85", "加载更多");
    };
    __expose({
      resetData,
      getMore
    });
    common_vendor.ref(true);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.name),
        b: common_vendor.w(({
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
              return {
                a: item.poster,
                b: common_vendor.t(item.cnDetails.name || item.usDetails.name || item.euDetails.name),
                c: item._id,
                d: `/pages/details/details?id=${item._id}`
              };
            }),
            e: common_vendor.t(props.name)
          } : {}, {
            c: data,
            f: "7d267b90-1-" + i0 + ",7d267b90-0",
            g: common_vendor.p({
              status: loading ? "loading" : hasMore ? "more" : "noMore"
            }),
            h: i0,
            i: s0
          });
        }, {
          name: "d",
          path: "b",
          vueId: "7d267b90-0"
        }),
        c: common_vendor.sr(udb, "7d267b90-0", {
          "k": "udb"
        }),
        d: common_vendor.o(handleLoad),
        e: common_vendor.p({
          collection: collectionList,
          where: sWhere.value,
          field: sField,
          ["page-size"]: 10
        })
      };
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/category/components/PreviewList.js.map
