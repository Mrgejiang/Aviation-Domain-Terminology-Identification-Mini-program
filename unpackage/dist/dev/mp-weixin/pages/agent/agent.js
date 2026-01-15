"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      messages: [],
      inputText: "",
      lastMsgId: "",
      botInfo: {
        name: "",
        icon_url: "",
        description: "",
        suggestedQuestions: []
      },
      inputPlaceholder: "请输入您的问题",
      isLoading: false,
      showSuggested: true,
      conversationId: null
    };
  },
  created() {
    this.initBotInfo();
  },
  methods: {
    async initBotInfo() {
      try {
        const res = await common_vendor.index.request({
          url: "https://api.coze.cn/v1/bot/get_online_info?bot_id=7461239179847172122",
          method: "GET",
          header: {
            "Authorization": "Bearer pat_6yySAkMrimmjkwJMfE8lfuUtJzJnwSwjYj34ACUZMIK21fFuWad3a91NvYuDl77s",
            "Content-Type": "application/json"
          }
        });
        if (res.data.code === 0) {
          const data = res.data.data;
          this.botInfo = {
            name: data.name,
            icon_url: data.icon_url,
            description: data.description,
            suggestedQuestions: data.onboarding_info.suggested_questions
          };
          this.messages.push({
            type: "ai",
            content: data.onboarding_info.prologue,
            time: this.getCurrentTime()
          });
          const promptMatch = data.prompt_info.prompt.match(/请输入(.*?)\n/);
          this.inputPlaceholder = promptMatch ? promptMatch[1] : "请输入您的问题";
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/agent/agent.vue:131", "初始化失败:", e);
      }
    },
    async getAIResponse(question) {
      try {
        const res = await common_vendor.index.request({
          url: "https://api.coze.cn/open_api/v2/chat",
          method: "POST",
          header: {
            "Authorization": "Bearer pat_6yySAkMrimmjkwJMfE8lfuUtJzJnwSwjYj34ACUZMIK21fFuWad3a91NvYuDl77s",
            "Content-Type": "application/json"
          },
          data: {
            bot_id: "7461239179847172122",
            user: "uni-app-user",
            query: question,
            stream: false
          }
        });
        const response = res.data;
        common_vendor.index.__f__("log", "at pages/agent/agent.vue:153", "API返回数据:", response);
        if (response.code !== 0) {
          throw new Error(response.msg || "API返回错误");
        }
        const answerMessage = response.messages.find((msg) => msg.type === "answer");
        if (!answerMessage) {
          throw new Error("未找到回答内容");
        }
        const followUpQuestions = response.messages.filter((msg) => msg.type === "follow_up").map((msg) => msg.content);
        if (followUpQuestions.length > 0) {
          this.botInfo.suggestedQuestions = followUpQuestions;
          this.showSuggested = true;
        }
        return {
          content: answerMessage.content
        };
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/agent/agent.vue:181", "API请求失败:", error);
        throw new Error(`请求失败：${error.message}`);
      }
    },
    async sendMessage() {
      if (!this.inputText.trim() || this.isLoading)
        return;
      this.showSuggested = false;
      const userMsg = {
        type: "user",
        content: this.inputText,
        time: this.getCurrentTime()
      };
      this.messages.push(userMsg);
      const aiMsg = {
        type: "ai",
        content: "",
        time: this.getCurrentTime()
      };
      this.messages.push(aiMsg);
      const question = this.inputText;
      this.inputText = "";
      this.isLoading = true;
      try {
        const res = await this.getAIResponse(question);
        aiMsg.content = res.content;
      } catch (e) {
        aiMsg.content = `请求失败：${e.message || "网络异常，请稍后重试"}`;
      }
      this.isLoading = false;
      this.scrollToBottom();
    },
    sendSuggested(question) {
      this.inputText = question;
      this.sendMessage();
    },
    getCurrentTime() {
      const date = /* @__PURE__ */ new Date();
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.lastMsgId = "msg" + (this.messages.length - 1);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.botInfo.icon_url,
    b: common_vendor.t($data.botInfo.name),
    c: common_vendor.t($data.botInfo.description),
    d: common_vendor.f($data.messages, (msg, index, i0) => {
      return common_vendor.e({
        a: msg.type === "ai"
      }, msg.type === "ai" ? {
        b: $data.botInfo.icon_url
      } : {}, {
        c: msg.type === "ai"
      }, msg.type === "ai" ? {
        d: common_vendor.t($data.botInfo.name)
      } : {}, {
        e: common_vendor.t(msg.content),
        f: common_vendor.t(msg.time),
        g: msg.type === "user"
      }, msg.type === "user" ? {
        h: common_assets._imports_0
      } : {}, {
        i: index,
        j: "msg" + index,
        k: common_vendor.n(msg.type)
      });
    }),
    e: $data.showSuggested
  }, $data.showSuggested ? {
    f: common_vendor.f($data.botInfo.suggestedQuestions, (question, qIndex, i0) => {
      return {
        a: common_vendor.t(question),
        b: "q" + qIndex,
        c: common_vendor.o(($event) => $options.sendSuggested(question), "q" + qIndex)
      };
    })
  } : {}, {
    g: $data.lastMsgId,
    h: $data.inputPlaceholder,
    i: common_vendor.o((...args) => $options.sendMessage && $options.sendMessage(...args)),
    j: $data.inputText,
    k: common_vendor.o(($event) => $data.inputText = $event.detail.value),
    l: common_vendor.t($data.isLoading ? "思考中..." : "发送"),
    m: common_vendor.o((...args) => $options.sendMessage && $options.sendMessage(...args)),
    n: $data.isLoading
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/agent/agent.js.map
