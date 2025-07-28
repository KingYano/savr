import { _ as __nuxt_component_0 } from "./nuxt-link-CJuUq_A4.js";
import { a as useSettingsStore, u as useHead, c as __nuxt_component_1 } from "../server.mjs";
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { ArrowLeft, Sun, Moon } from "lucide-vue-next";
import { b as useFinance, u as useCategoriesStore, _ as _sfc_main$1, a as _sfc_main$2 } from "./useFinance-BLxJwmk-.js";
import { storeToRefs } from "pinia";
import "ufo";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "defu";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "destr";
import "klona";
import "reka-ui";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "dexie";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "stats",
  __ssrInlineRender: true,
  setup(__props) {
    const financeData = useFinance();
    const settingsStore = useSettingsStore();
    const categoriesStore = useCategoriesStore();
    const { isDarkMode } = storeToRefs(settingsStore);
    const { categories } = storeToRefs(categoriesStore);
    const analysisperiods = [
      { value: "week", label: "Cette semaine" },
      { value: "month", label: "Ce mois" },
      { value: "quarter", label: "Ce trimestre" },
      { value: "year", label: "Cette année" },
      { value: "all", label: "Tout" },
      { value: "custom", label: "Personnalisé" }
    ];
    const selectedPeriod = ref("month");
    const customDateRange = ref({
      start: "",
      end: ""
    });
    const setAnalysisPeriod = (period) => {
      selectedPeriod.value = period;
      if (period !== "custom") {
        customDateRange.value = { start: "", end: "" };
      }
    };
    const getDateRange = () => {
      const now = /* @__PURE__ */ new Date();
      let start;
      let end = now;
      switch (selectedPeriod.value) {
        case "week":
          start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
          break;
        case "month":
          start = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case "quarter":
          const quarter = Math.floor(now.getMonth() / 3);
          start = new Date(now.getFullYear(), quarter * 3, 1);
          break;
        case "year":
          start = new Date(now.getFullYear(), 0, 1);
          break;
        case "custom":
          if (customDateRange.value.start && customDateRange.value.end) {
            start = new Date(customDateRange.value.start);
            end = new Date(customDateRange.value.end);
          } else {
            return null;
          }
          break;
        case "all":
        default:
          return null;
      }
      return { start, end };
    };
    computed(() => {
      const movements = financeData.movements.value || [];
      const dateRange = getDateRange();
      if (!dateRange) {
        return movements;
      }
      return movements.filter((movement) => {
        const movementDate = movement.date instanceof Date ? movement.date : new Date(movement.date);
        if (isNaN(movementDate.getTime())) return false;
        return movementDate >= dateRange.start && movementDate <= dateRange.end;
      });
    });
    useHead({
      title: "Statistiques - SAVR",
      meta: [
        {
          name: "description",
          content: "Visualisez vos données financières avec des graphiques détaillés et des analyses complètes."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "min-h-screen transition-colors duration-300",
          unref(isDarkMode) ? "dark bg-gray-950" : "bg-slate-50"
        ]
      }, _attrs))}><div class="p-6 space-y-6"><div class="flex justify-between items-center"><div class="space-y-1"><h1 class="${ssrRenderClass([
        "text-3xl font-bold",
        unref(isDarkMode) ? "text-white" : "text-slate-900"
      ])}"> Statistiques et Analyses </h1><p class="${ssrRenderClass(unref(isDarkMode) ? "text-gray-400" : "text-slate-600")}"> Visualisez vos données financières avec des graphiques détaillés </p></div><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: [
          "flex items-center gap-2 px-4 py-2 rounded-lg",
          unref(isDarkMode) ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-white hover:bg-gray-50 text-gray-900",
          "border transition-colors"
        ]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Retour `);
          } else {
            return [
              createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
              createTextVNode(" Retour ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="${ssrRenderClass([
        "rounded-full p-2",
        unref(isDarkMode) ? "hover:bg-gray-800" : "hover:bg-slate-200"
      ])}">`);
      if (unref(isDarkMode)) {
        _push(ssrRenderComponent(unref(Sun), { class: "h-6 w-6 text-yellow-500" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Moon), { class: "h-6 w-6 text-slate-700" }, null, _parent));
      }
      _push(`</button></div></div><div class="${ssrRenderClass([
        "rounded-xl p-4",
        unref(isDarkMode) ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200",
        "border"
      ])}"><div class="flex flex-wrap gap-4 items-center"><div class="flex items-center gap-2"><label class="${ssrRenderClass([
        "text-sm font-medium",
        unref(isDarkMode) ? "text-white" : "text-gray-900"
      ])}"> Période d&#39;analyse: </label><div class="flex gap-2"><!--[-->`);
      ssrRenderList(analysisperiods, (period) => {
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          key: period.value,
          variant: "outline",
          size: "sm",
          class: [
            selectedPeriod.value === period.value ? "bg-blue-100 border-blue-300 text-blue-700" : ""
          ],
          onClick: ($event) => setAnalysisPeriod(period.value)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(period.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(period.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
      if (selectedPeriod.value === "custom") {
        _push(`<div class="flex items-center gap-4"><div class="flex items-center gap-2"><label class="${ssrRenderClass([unref(isDarkMode) ? "text-gray-300" : "text-gray-700", "text-sm"])}"> Du: </label>`);
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          modelValue: customDateRange.value.start,
          "onUpdate:modelValue": ($event) => customDateRange.value.start = $event,
          type: "date",
          class: ["w-40", unref(isDarkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"]
        }, null, _parent));
        _push(`</div><div class="flex items-center gap-2"><label class="${ssrRenderClass([unref(isDarkMode) ? "text-gray-300" : "text-gray-700", "text-sm"])}"> Au: </label>`);
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          modelValue: customDateRange.value.end,
          "onUpdate:modelValue": ($event) => customDateRange.value.end = $event,
          type: "date",
          class: ["w-40", unref(isDarkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"]
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/stats.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=stats-Bp-5V6Jy.js.map
