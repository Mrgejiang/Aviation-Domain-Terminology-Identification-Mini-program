"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
if (!Array) {
  const _component_PageSkeleton = common_vendor.resolveComponent("PageSkeleton");
  _component_PageSkeleton();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "details",
  setup(__props) {
    const db = common_vendor.er.database();
    const favoriteTable = db.collection("opendb-news-favorite");
    db.collection("read-news-log");
    const onVideoError = (ev) => {
      common_vendor.index.showToast({
        title: "视频走丢了!",
        icon: "none"
      });
    };
    const termDetailsData = common_vendor.ref();
    const getTermDetailsData = async () => {
      const category = db.collection("opendb-news-categories").field("_id,name").getTemp();
      const res = await db.collection("opendb-news-articles", category).where('_id=="' + id.value + '"').get();
      termDetailsData.value = res.result.data[0];
      common_vendor.index.__f__("log", "at pages/details/details.vue:81", "获取词条详细数据", termDetailsData.value);
      setReadNewsLog();
    };
    const isLoading = common_vendor.ref(true);
    const id = common_vendor.ref("");
    common_vendor.onLoad(async (op) => {
      isLoading.value = true;
      common_vendor.index.__f__("log", "at pages/details/details.vue:90", "详情_id", op.id);
      id.value = op.id;
      await getTermDetailsData();
      common_vendor.index.setNavigationBarTitle({
        title: `词条: ${termDetailsData.value.cnDetails.name || termDetailsData.value.usDetails.name || termDetailsData.value.euDetails.name}`
      });
      if (uni_modules_uniIdPages_common_store.store.hasLogin) {
        const res = await favoriteTable.where(`"article_id" == "${id.value}" && "user_id"==$env.uid`).get();
        if (res.result.data.length > 0) {
          isSelected.value = true;
          selectId = res.result.data[0]._id;
        }
      }
      isLoading.value = false;
    });
    const isSelected = common_vendor.ref(false);
    let selectId = "";
    const onTapSelection = async () => {
      if (!uni_modules_uniIdPages_common_store.store.hasLogin) {
        return common_vendor.index.showModal({
          content: "是否现在登录？",
          confirmColor: "#6cb8f3",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.navigateTo({
                url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
              });
            }
          }
        });
      }
      if (isSelected.value) {
        favoriteTable.doc(selectId).remove().then((res) => {
          common_vendor.index.__f__("log", "at pages/details/details.vue:131", "取消收藏", res);
          selectId = "";
          isSelected.value = false;
        }).catch((err) => {
          common_vendor.index.__f__("log", "at pages/details/details.vue:136", err);
          common_vendor.index.showToast({
            title: "出错了!",
            icon: "none"
          });
        });
      } else {
        favoriteTable.add({
          "article_id": id.value
        }).then((res) => {
          common_vendor.index.__f__("log", "at pages/details/details.vue:149", "收藏", res);
          selectId = res.result.id;
          isSelected.value = true;
        }).catch((err) => {
          common_vendor.index.__f__("log", "at pages/details/details.vue:154", err);
          common_vendor.index.showToast({
            title: "出错了!",
            icon: "none"
          });
        });
      }
    };
    const setReadNewsLog = () => {
      let item = {
        "article_id": id.value,
        "last_time": Date.now()
      }, readNewsLog = common_vendor.index.getStorageSync("readNewsLog") || [], index = -1;
      readNewsLog.forEach(({ article_id }, i) => {
        if (article_id == item.article_id) {
          index = i;
        }
      });
      if (index === -1) {
        readNewsLog.push(item);
      } else {
        readNewsLog.splice(index, 1, item);
      }
      common_vendor.index.setStorageSync("readNewsLog", readNewsLog);
      common_vendor.index.__f__("log", "at pages/details/details.vue:182", "本地历史记录", readNewsLog);
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {} : common_vendor.e({
        b: (_a = termDetailsData.value) == null ? void 0 : _a.video,
        c: (_b = termDetailsData.value) == null ? void 0 : _b.poster,
        d: (_c = termDetailsData.value) == null ? void 0 : _c.cnDetails.name,
        e: common_vendor.o(onVideoError),
        f: isSelected.value
      }, isSelected.value ? {
        g: common_vendor.o(onTapSelection)
      } : {
        h: common_vendor.o(onTapSelection)
      }, {
        i: common_vendor.f([(_d = termDetailsData.value) == null ? void 0 : _d.cnDetails, (_e = termDetailsData.value) == null ? void 0 : _e.usDetails, (_f = termDetailsData.value) == null ? void 0 : _f.euDetails], (item, index, i0) => {
          var _a2, _b2;
          return common_vendor.e({
            a: common_vendor.t(index === 0 ? "中" : index === 1 ? "美" : "欧"),
            b: common_vendor.t(item == null ? void 0 : item.name),
            c: index === 0
          }, index === 0 ? {
            d: common_vendor.t((_a2 = termDetailsData.value) == null ? void 0 : _a2.cnDetails.en)
          } : {}, {
            e: common_vendor.t(item == null ? void 0 : item.abbr),
            f: common_vendor.t(((_b2 = item.category_id[0]) == null ? void 0 : _b2.name) || "未分类"),
            g: common_vendor.t(item == null ? void 0 : item.define),
            h: common_vendor.t(item == null ? void 0 : item.source),
            i: common_vendor.t(item == null ? void 0 : item.expand),
            j: index
          });
        }),
        j: common_vendor.t((_g = termDetailsData.value) == null ? void 0 : _g.compareResult)
      }));
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4b799d2f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/details/details.js.map
