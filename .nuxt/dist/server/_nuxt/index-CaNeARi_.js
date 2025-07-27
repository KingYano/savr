var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { e as useUIStore, f as useSettingsStore, g as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, unref, mergeProps, withCtx, renderSlot, useSSRContext, computed, createVNode, ref, readonly, watch, createTextVNode, isRef, toDisplayString, createBlock, createCommentVNode, openBlock } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrGetDynamicModelProps, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { useForwardPropsEmits, DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogClose, useForwardProps, DialogTitle, Primitive } from "reka-ui";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { X, CircleX, Check, Upload, Sun, Moon, Plus } from "lucide-vue-next";
import { cva } from "class-variance-authority";
import { useVModel } from "@vueuse/core";
import { defineStore, storeToRefs } from "pinia";
import "hookable";
import Dexie from "dexie";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "defu";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "ufo";
import "destr";
import "klona";
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Dialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/Dialog.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DialogContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DialogOverlay), { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(DialogContent), mergeProps(unref(forwarded), {
              class: unref(cn)(
                "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(ssrRenderComponent(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                        _push4(`<span class="sr-only"${_scopeId3}>Close</span>`);
                      } else {
                        return [
                          createVNode(unref(X), { class: "w-4 h-4" }),
                          createVNode("span", { class: "sr-only" }, "Close")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default"),
                    createVNode(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" }, {
                      default: withCtx(() => [
                        createVNode(unref(X), { class: "w-4 h-4" }),
                        createVNode("span", { class: "sr-only" }, "Close")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DialogOverlay), { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
              createVNode(unref(DialogContent), mergeProps(unref(forwarded), {
                class: unref(cn)(
                  "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default"),
                  createVNode(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" }, {
                    default: withCtx(() => [
                      createVNode(unref(X), { class: "w-4 h-4" }),
                      createVNode("span", { class: "sr-only" }, "Close")
                    ]),
                    _: 1
                  })
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogContent.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DialogFooter",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogFooter.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DialogHeader",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("flex flex-col gap-y-1.5 text-center sm:text-left", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogHeader.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DialogTitle",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTitle), mergeProps(unref(forwardedProps), {
        class: unref(cn)(
          "text-lg font-semibold leading-none tracking-tight",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogTitle.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: {},
    size: {},
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: _ctx.as,
        "as-child": _ctx.asChild,
        class: unref(cn)(unref(buttonVariants)({ variant: _ctx.variant, size: _ctx.size }), props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/button/Button.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-7 rounded px-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    modelValue: {},
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, {
      passive: true,
      defaultValue: props.defaultValue
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        class: unref(cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", props.class)
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(modelValue)))))}>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input/Input.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Alert",
  __ssrInlineRender: true,
  props: {
    class: {},
    variant: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(unref(alertVariants)({ variant: _ctx.variant }), props.class),
        role: "alert"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/alert/Alert.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AlertDescription",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("text-sm [&_p]:leading-relaxed", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/alert/AlertDescription.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const DEFAULT_IMAGE_OPTIONS = {
  maxSizeBytes: 2 * 1024 * 1024,
  // 2MB
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  maxWidth: 1920,
  maxHeight: 1080
};
async function validateImageFile(file, options = {}) {
  const opts = { ...DEFAULT_IMAGE_OPTIONS, ...options };
  if (file.size > opts.maxSizeBytes) {
    return {
      isValid: false,
      error: `Fichier trop volumineux. Maximum ${Math.round(opts.maxSizeBytes / 1024 / 1024)}MB autorisé.`
    };
  }
  const actualMimeType = await getActualMimeType(file);
  if (!opts.allowedTypes.includes(actualMimeType)) {
    return {
      isValid: false,
      error: `Type de fichier non autorisé. Types acceptés: ${opts.allowedTypes.join(", ")}`
    };
  }
  if (opts.maxWidth || opts.maxHeight) {
    try {
      const dimensions = await getImageDimensions(file);
      if (opts.maxWidth && dimensions.width > opts.maxWidth) {
        return {
          isValid: false,
          error: `Largeur trop importante. Maximum ${opts.maxWidth}px autorisé.`
        };
      }
      if (opts.maxHeight && dimensions.height > opts.maxHeight) {
        return {
          isValid: false,
          error: `Hauteur trop importante. Maximum ${opts.maxHeight}px autorisé.`
        };
      }
    } catch (error) {
      return {
        isValid: false,
        error: "Impossible de lire les dimensions de l'image."
      };
    }
  }
  return {
    isValid: true,
    file
  };
}
async function getActualMimeType(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arr = new Uint8Array(reader.result);
      const signatures = {
        "image/jpeg": [255, 216, 255],
        "image/png": [137, 80, 78, 71],
        "image/webp": [82, 73, 70, 70]
      };
      for (const [mimeType, signature] of Object.entries(signatures)) {
        if (signature.every((byte, index) => arr[index] === byte)) {
          resolve(mimeType);
          return;
        }
      }
      resolve(file.type);
    };
    reader.onerror = () => reject(new Error("Erreur lecture fichier"));
    reader.readAsArrayBuffer(file.slice(0, 12));
  });
}
async function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = () => reject(new Error("Impossible de charger l'image"));
    img.src = URL.createObjectURL(file);
  });
}
const DEFAULT_COMPRESSION_OPTIONS = {
  maxWidth: 800,
  maxHeight: 600,
  quality: 0.8,
  format: "webp",
  maintainAspectRatio: true
};
async function compressImage(file, options = {}) {
  const opts = { ...DEFAULT_COMPRESSION_OPTIONS, ...options };
  if (opts.format === "webp" && !await supportsWebP()) {
    opts.format = "jpeg";
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = (void 0).createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Impossible de créer le contexte canvas"));
          return;
        }
        const { width, height } = calculateDimensions(
          img.naturalWidth,
          img.naturalHeight,
          opts.maxWidth,
          opts.maxHeight,
          opts.maintainAspectRatio
        );
        canvas.width = width;
        canvas.height = height;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Erreur lors de la compression"));
              return;
            }
            const reader = new FileReader();
            reader.onload = () => {
              const dataUrl = reader.result;
              const compressionRatio = (file.size - blob.size) / file.size * 100;
              resolve({
                compressedFile: blob,
                dataUrl,
                originalSize: file.size,
                compressedSize: blob.size,
                compressionRatio: Math.round(compressionRatio)
              });
            };
            reader.onerror = () => reject(new Error("Erreur génération dataURL"));
            reader.readAsDataURL(blob);
          },
          `image/${opts.format}`,
          opts.quality
        );
        URL.revokeObjectURL(img.src);
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = () => reject(new Error("Impossible de charger l'image"));
    img.src = URL.createObjectURL(file);
  });
}
function calculateDimensions(originalWidth, originalHeight, maxWidth, maxHeight, maintainAspectRatio) {
  if (!maintainAspectRatio) {
    return { width: maxWidth, height: maxHeight };
  }
  const aspectRatio = originalWidth / originalHeight;
  let width = originalWidth;
  let height = originalHeight;
  if (width > maxWidth || height > maxHeight) {
    if (width / maxWidth > height / maxHeight) {
      width = maxWidth;
      height = width / aspectRatio;
    } else {
      height = maxHeight;
      width = height * aspectRatio;
    }
  }
  return {
    width: Math.round(width),
    height: Math.round(height)
  };
}
async function supportsWebP() {
  return new Promise((resolve) => {
    const canvas = (void 0).createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    canvas.toBlob(
      (blob) => resolve(!!blob),
      "image/webp"
    );
  });
}
function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
function useImageUpload(options = {}) {
  const state = ref({
    file: null,
    previewUrl: "",
    fileName: "",
    isUploading: false,
    error: "",
    compressionInfo: ""
  });
  const resetState = () => {
    if (state.value.previewUrl && state.value.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(state.value.previewUrl);
    }
    state.value = {
      file: null,
      previewUrl: "",
      fileName: "",
      isUploading: false,
      error: "",
      compressionInfo: ""
    };
  };
  const handleFileUpload = async (file) => {
    state.value.isUploading = true;
    state.value.error = "";
    state.value.compressionInfo = "";
    try {
      const validationResult = await validateImageFile(file, {
        maxSizeBytes: options.maxSizeBytes,
        allowedTypes: options.allowedTypes,
        maxWidth: options.maxWidth,
        maxHeight: options.maxHeight
      });
      if (!validationResult.isValid) {
        state.value.error = validationResult.error || "Fichier invalide";
        state.value.isUploading = false;
        return false;
      }
      let finalFile = file;
      let previewUrl = "";
      if (options.compressionEnabled !== false) {
        try {
          const compressionResult = await compressImage(file, {
            maxWidth: 800,
            maxHeight: 600,
            quality: 0.8
          });
          finalFile = new File([compressionResult.compressedFile], file.name, {
            type: compressionResult.compressedFile.type,
            lastModified: Date.now()
          });
          previewUrl = compressionResult.dataUrl;
          if (compressionResult.compressionRatio > 0) {
            state.value.compressionInfo = `Compression: ${formatFileSize(compressionResult.originalSize)} → ${formatFileSize(compressionResult.compressedSize)} (-${compressionResult.compressionRatio}%)`;
          }
        } catch (compressionError) {
          console.warn("Compression échouée, utilisation du fichier original:", compressionError);
          previewUrl = URL.createObjectURL(file);
        }
      } else {
        previewUrl = URL.createObjectURL(file);
      }
      state.value.file = finalFile;
      state.value.previewUrl = previewUrl;
      state.value.fileName = file.name;
      state.value.isUploading = false;
      return true;
    } catch (error) {
      state.value.error = error instanceof Error ? error.message : "Erreur lors du traitement du fichier";
      state.value.isUploading = false;
      return false;
    }
  };
  const getDataUrl = async () => {
    if (!state.value.file) {
      throw new Error("Aucun fichier sélectionné");
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Erreur lecture fichier"));
      reader.readAsDataURL(state.value.file);
    });
  };
  return {
    state: readonly(state),
    handleFileUpload,
    resetState,
    getDataUrl
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AddMovementDialog",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    isDarkMode: { type: Boolean }
  },
  emits: ["update:isOpen", "addMovement"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const fileInput = ref(null);
    const dateString = ref("");
    const imageUpload = useImageUpload({
      maxSizeBytes: 2 * 1024 * 1024,
      // 2MB
      allowedTypes: ["image/jpeg", "image/png", "image/webp"],
      compressionEnabled: true
    });
    const newMovement = ref({
      name: "",
      amount: 0,
      date: "",
      type: "expense",
      isRecurrent: false,
      imageUrl: ""
    });
    watch(dateString, (newValue) => {
      newMovement.value.date = newValue;
    });
    const handleImageUpload = async (event) => {
      const input = event.target;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        await imageUpload.handleFileUpload(file);
      }
    };
    const removeImage = () => {
      imageUpload.resetState();
      newMovement.value.imageUrl = "";
      if (fileInput.value) {
        fileInput.value.value = "";
      }
    };
    const handleAddMovement = async () => {
      if (!newMovement.value.name || !newMovement.value.amount || !newMovement.value.date) {
        return;
      }
      try {
        if (imageUpload.state.value.file) {
          newMovement.value.imageUrl = await imageUpload.getDataUrl();
        }
        emit("addMovement", { ...newMovement.value });
        newMovement.value = {
          name: "",
          amount: 0,
          date: "",
          type: "expense",
          isRecurrent: false,
          imageUrl: ""
        };
        dateString.value = "";
        removeImage();
      } catch (error) {
        console.error("Erreur lors de l'ajout du mouvement:", error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$a), mergeProps({
        open: _ctx.isOpen,
        "onUpdate:open": ($event) => _ctx.$emit("update:isOpen", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$9), {
              class: [
                "p-0 w-full sm:max-w-[500px] max-h-[90vh] overflow-y-auto",
                _ctx.isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-slate-200"
              ]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    class: [
                      "sticky top-0 z-10 p-4 sm:p-6 border-b",
                      _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                    ]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          class: [
                            "text-xl sm:text-2xl font-semibold",
                            _ctx.isDarkMode ? "text-white" : "text-slate-900"
                          ]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Ajouter un mouvement `);
                            } else {
                              return [
                                createTextVNode(" Ajouter un mouvement ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), {
                            class: [
                              "text-xl sm:text-2xl font-semibold",
                              _ctx.isDarkMode ? "text-white" : "text-slate-900"
                            ]
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Ajouter un mouvement ")
                            ]),
                            _: 1
                          }, 8, ["class"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="p-4 sm:p-6 space-y-4 sm:space-y-6"${_scopeId2}><div class="space-y-2 sm:space-y-3"${_scopeId2}><label class="${ssrRenderClass([
                    "text-sm font-medium",
                    _ctx.isDarkMode ? "text-white" : "text-slate-900"
                  ])}"${_scopeId2}> Type de mouvement </label><div class="grid grid-cols-2 gap-2"${_scopeId2}><button type="button" class="${ssrRenderClass([
                    "w-full px-3 py-2 rounded-md text-sm sm:text-base",
                    unref(newMovement).type === "expense" ? "bg-red-500 hover:bg-red-600 text-white" : "border bg-slate-100"
                  ])}"${_scopeId2}> Dépense </button><button type="button" class="${ssrRenderClass([
                    "w-full px-3 py-2 rounded-md text-sm sm:text-base",
                    unref(newMovement).type === "income" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "border bg-slate-100"
                  ])}"${_scopeId2}> Revenu </button></div></div><div class="space-y-3 sm:space-y-4"${_scopeId2}><div class="space-y-1 sm:space-y-2"${_scopeId2}><label class="${ssrRenderClass(_ctx.isDarkMode ? "text-white" : "text-slate-900")}"${_scopeId2}>Nom</label>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    modelValue: unref(newMovement).name,
                    "onUpdate:modelValue": ($event) => unref(newMovement).name = $event,
                    type: "text",
                    placeholder: "Ex: Loyer, Salaire...",
                    class: [
                      _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                    ]
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1 sm:space-y-2"${_scopeId2}><label class="${ssrRenderClass(_ctx.isDarkMode ? "text-white" : "text-slate-900")}"${_scopeId2}>Montant</label><div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    modelValue: unref(newMovement).amount,
                    "onUpdate:modelValue": ($event) => unref(newMovement).amount = $event,
                    type: "number",
                    placeholder: "0.00",
                    class: ["pl-8", [
                      _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                    ]]
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"${_scopeId2}>€</span></div></div><div class="space-y-1 sm:space-y-2"${_scopeId2}><label class="${ssrRenderClass(_ctx.isDarkMode ? "text-white" : "text-slate-900")}"${_scopeId2}>Date</label>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    modelValue: unref(dateString),
                    "onUpdate:modelValue": ($event) => isRef(dateString) ? dateString.value = $event : null,
                    type: "date",
                    class: [
                      _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                    ]
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1 sm:space-y-2"${_scopeId2}><label class="${ssrRenderClass(_ctx.isDarkMode ? "text-white" : "text-slate-900")}"${_scopeId2}>Image (optionnel)</label><div class="flex flex-wrap items-center gap-2"${_scopeId2}><input type="file" id="image" accept="image/*" class="hidden"${_scopeId2}><button type="button" class="${ssrRenderClass([
                    "px-3 py-2 rounded-md flex items-center gap-1 text-sm sm:text-base",
                    _ctx.isDarkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  ])}"${_scopeId2}><span${_scopeId2}>Choisir une image</span></button><span class="${ssrRenderClass([_ctx.isDarkMode ? "text-gray-400" : "text-gray-500", "text-sm"])}"${_scopeId2}>${ssrInterpolate(unref(imageUpload).state.value.fileName || "Aucun fichier sélectionné")}</span></div>`);
                  if (unref(imageUpload).state.value.previewUrl) {
                    _push3(`<div class="mt-2 relative"${_scopeId2}><img${ssrRenderAttr("src", unref(imageUpload).state.value.previewUrl)} alt="Prévisualisation" class="h-24 w-auto object-cover rounded-md"${_scopeId2}><button type="button" class="absolute top-1 right-1 bg-red-500 text-white rounded-full"${_scopeId2}><span class="items-center justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(CircleX), null, null, _parent3, _scopeId2));
                    _push3(`</span></button></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(imageUpload).state.value.error) {
                    _push3(`<div class="mt-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$3), { variant: "destructive" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$2), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(imageUpload).state.value.error)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(imageUpload).state.value.error), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$2), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(imageUpload).state.value.error), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(imageUpload).state.value.compressionInfo) {
                    _push3(`<div class="mt-1"${_scopeId2}><div class="${ssrRenderClass([_ctx.isDarkMode ? "text-green-400" : "text-green-600", "text-xs flex items-center gap-1"])}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Check), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(imageUpload).state.value.compressionInfo)}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(imageUpload).state.value.isUploading) {
                    _push3(`<div class="mt-2"${_scopeId2}><div class="${ssrRenderClass([_ctx.isDarkMode ? "text-gray-400" : "text-gray-600", "flex items-center gap-2 text-sm"])}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Upload), { class: "h-4 w-4 animate-pulse" }, null, _parent3, _scopeId2));
                    _push3(` Traitement en cours... </div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="space-y-2 sm:space-y-3"${_scopeId2}><label class="${ssrRenderClass([
                    "text-sm font-medium",
                    _ctx.isDarkMode ? "text-white" : "text-slate-900"
                  ])}"${_scopeId2}> Type de récurrence </label><div class="grid grid-cols-1 gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    variant: "outline",
                    class: [
                      "justify-start py-1 sm:py-2 text-sm sm:text-base",
                      !unref(newMovement).isRecurrent ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                    ],
                    onClick: ($event) => unref(newMovement).isRecurrent = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="mr-2"${_scopeId3}>🔄</span> Pas de récurrence `);
                      } else {
                        return [
                          createVNode("span", { class: "mr-2" }, "🔄"),
                          createTextVNode(" Pas de récurrence ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    variant: "outline",
                    class: [
                      "justify-start py-1 sm:py-2 text-sm sm:text-base",
                      unref(newMovement).isRecurrent ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                    ],
                    onClick: ($event) => unref(newMovement).isRecurrent = true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="mr-2"${_scopeId3}>📅</span> Mensuel `);
                      } else {
                        return [
                          createVNode("span", { class: "mr-2" }, "📅"),
                          createTextVNode(" Mensuel ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    class: [
                      "sticky bottom-0 z-10 p-4 sm:p-6 border-t",
                      _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                    ]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          class: "w-full bg-emerald-500 hover:bg-emerald-600 text-white",
                          onClick: handleAddMovement,
                          disabled: unref(imageUpload).state.value.isUploading
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(imageUpload).state.value.isUploading ? "Traitement..." : "Ajouter")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(imageUpload).state.value.isUploading ? "Traitement..." : "Ajouter"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), {
                            class: "w-full bg-emerald-500 hover:bg-emerald-600 text-white",
                            onClick: handleAddMovement,
                            disabled: unref(imageUpload).state.value.isUploading
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(imageUpload).state.value.isUploading ? "Traitement..." : "Ajouter"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), {
                      class: [
                        "sticky top-0 z-10 p-4 sm:p-6 border-b",
                        _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                      ]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), {
                          class: [
                            "text-xl sm:text-2xl font-semibold",
                            _ctx.isDarkMode ? "text-white" : "text-slate-900"
                          ]
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Ajouter un mouvement ")
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ]),
                      _: 1
                    }, 8, ["class"]),
                    createVNode("div", { class: "p-4 sm:p-6 space-y-4 sm:space-y-6" }, [
                      createVNode("div", { class: "space-y-2 sm:space-y-3" }, [
                        createVNode("label", {
                          class: [
                            "text-sm font-medium",
                            _ctx.isDarkMode ? "text-white" : "text-slate-900"
                          ]
                        }, " Type de mouvement ", 2),
                        createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                          createVNode("button", {
                            type: "button",
                            class: [
                              "w-full px-3 py-2 rounded-md text-sm sm:text-base",
                              unref(newMovement).type === "expense" ? "bg-red-500 hover:bg-red-600 text-white" : "border bg-slate-100"
                            ],
                            onClick: ($event) => unref(newMovement).type = "expense"
                          }, " Dépense ", 10, ["onClick"]),
                          createVNode("button", {
                            type: "button",
                            class: [
                              "w-full px-3 py-2 rounded-md text-sm sm:text-base",
                              unref(newMovement).type === "income" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "border bg-slate-100"
                            ],
                            onClick: ($event) => unref(newMovement).type = "income"
                          }, " Revenu ", 10, ["onClick"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-3 sm:space-y-4" }, [
                        createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                          createVNode("label", {
                            class: _ctx.isDarkMode ? "text-white" : "text-slate-900"
                          }, "Nom", 2),
                          createVNode(unref(_sfc_main$4), {
                            modelValue: unref(newMovement).name,
                            "onUpdate:modelValue": ($event) => unref(newMovement).name = $event,
                            type: "text",
                            placeholder: "Ex: Loyer, Salaire...",
                            class: [
                              _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                            ]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                        ]),
                        createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                          createVNode("label", {
                            class: _ctx.isDarkMode ? "text-white" : "text-slate-900"
                          }, "Montant", 2),
                          createVNode("div", { class: "relative" }, [
                            createVNode(unref(_sfc_main$4), {
                              modelValue: unref(newMovement).amount,
                              "onUpdate:modelValue": ($event) => unref(newMovement).amount = $event,
                              type: "number",
                              placeholder: "0.00",
                              class: ["pl-8", [
                                _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                              ]]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("span", { class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" }, "€")
                          ])
                        ]),
                        createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                          createVNode("label", {
                            class: _ctx.isDarkMode ? "text-white" : "text-slate-900"
                          }, "Date", 2),
                          createVNode(unref(_sfc_main$4), {
                            modelValue: unref(dateString),
                            "onUpdate:modelValue": ($event) => isRef(dateString) ? dateString.value = $event : null,
                            type: "date",
                            class: [
                              _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                            ]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                        ]),
                        createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                          createVNode("label", {
                            class: _ctx.isDarkMode ? "text-white" : "text-slate-900"
                          }, "Image (optionnel)", 2),
                          createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                            createVNode("input", {
                              type: "file",
                              id: "image",
                              accept: "image/*",
                              onChange: handleImageUpload,
                              class: "hidden",
                              ref_key: "fileInput",
                              ref: fileInput
                            }, null, 544),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => _ctx.$refs.fileInput.click(),
                              class: [
                                "px-3 py-2 rounded-md flex items-center gap-1 text-sm sm:text-base",
                                _ctx.isDarkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              ]
                            }, [
                              createVNode("span", null, "Choisir une image")
                            ], 10, ["onClick"]),
                            createVNode("span", {
                              class: ["text-sm", _ctx.isDarkMode ? "text-gray-400" : "text-gray-500"]
                            }, toDisplayString(unref(imageUpload).state.value.fileName || "Aucun fichier sélectionné"), 3)
                          ]),
                          unref(imageUpload).state.value.previewUrl ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 relative"
                          }, [
                            createVNode("img", {
                              src: unref(imageUpload).state.value.previewUrl,
                              alt: "Prévisualisation",
                              class: "h-24 w-auto object-cover rounded-md"
                            }, null, 8, ["src"]),
                            createVNode("button", {
                              type: "button",
                              onClick: removeImage,
                              class: "absolute top-1 right-1 bg-red-500 text-white rounded-full"
                            }, [
                              createVNode("span", { class: "items-center justify-center" }, [
                                createVNode(unref(CircleX))
                              ])
                            ])
                          ])) : createCommentVNode("", true),
                          unref(imageUpload).state.value.error ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mt-2"
                          }, [
                            createVNode(unref(_sfc_main$3), { variant: "destructive" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$2), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(imageUpload).state.value.error), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true),
                          unref(imageUpload).state.value.compressionInfo ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "mt-1"
                          }, [
                            createVNode("div", {
                              class: ["text-xs flex items-center gap-1", _ctx.isDarkMode ? "text-green-400" : "text-green-600"]
                            }, [
                              createVNode(unref(Check), { class: "h-3 w-3" }),
                              createTextVNode(" " + toDisplayString(unref(imageUpload).state.value.compressionInfo), 1)
                            ], 2)
                          ])) : createCommentVNode("", true),
                          unref(imageUpload).state.value.isUploading ? (openBlock(), createBlock("div", {
                            key: 3,
                            class: "mt-2"
                          }, [
                            createVNode("div", {
                              class: ["flex items-center gap-2 text-sm", _ctx.isDarkMode ? "text-gray-400" : "text-gray-600"]
                            }, [
                              createVNode(unref(Upload), { class: "h-4 w-4 animate-pulse" }),
                              createTextVNode(" Traitement en cours... ")
                            ], 2)
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2 sm:space-y-3" }, [
                        createVNode("label", {
                          class: [
                            "text-sm font-medium",
                            _ctx.isDarkMode ? "text-white" : "text-slate-900"
                          ]
                        }, " Type de récurrence ", 2),
                        createVNode("div", { class: "grid grid-cols-1 gap-2" }, [
                          createVNode(unref(_sfc_main$5), {
                            variant: "outline",
                            class: [
                              "justify-start py-1 sm:py-2 text-sm sm:text-base",
                              !unref(newMovement).isRecurrent ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                            ],
                            onClick: ($event) => unref(newMovement).isRecurrent = false
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "mr-2" }, "🔄"),
                              createTextVNode(" Pas de récurrence ")
                            ]),
                            _: 1
                          }, 8, ["class", "onClick"]),
                          createVNode(unref(_sfc_main$5), {
                            variant: "outline",
                            class: [
                              "justify-start py-1 sm:py-2 text-sm sm:text-base",
                              unref(newMovement).isRecurrent ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                            ],
                            onClick: ($event) => unref(newMovement).isRecurrent = true
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "mr-2" }, "📅"),
                              createTextVNode(" Mensuel ")
                            ]),
                            _: 1
                          }, 8, ["class", "onClick"])
                        ])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$8), {
                      class: [
                        "sticky bottom-0 z-10 p-4 sm:p-6 border-t",
                        _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                      ]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), {
                          class: "w-full bg-emerald-500 hover:bg-emerald-600 text-white",
                          onClick: handleAddMovement,
                          disabled: unref(imageUpload).state.value.isUploading
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(imageUpload).state.value.isUploading ? "Traitement..." : "Ajouter"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$9), {
                class: [
                  "p-0 w-full sm:max-w-[500px] max-h-[90vh] overflow-y-auto",
                  _ctx.isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-slate-200"
                ]
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$7), {
                    class: [
                      "sticky top-0 z-10 p-4 sm:p-6 border-b",
                      _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                    ]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$6), {
                        class: [
                          "text-xl sm:text-2xl font-semibold",
                          _ctx.isDarkMode ? "text-white" : "text-slate-900"
                        ]
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Ajouter un mouvement ")
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ]),
                    _: 1
                  }, 8, ["class"]),
                  createVNode("div", { class: "p-4 sm:p-6 space-y-4 sm:space-y-6" }, [
                    createVNode("div", { class: "space-y-2 sm:space-y-3" }, [
                      createVNode("label", {
                        class: [
                          "text-sm font-medium",
                          _ctx.isDarkMode ? "text-white" : "text-slate-900"
                        ]
                      }, " Type de mouvement ", 2),
                      createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                        createVNode("button", {
                          type: "button",
                          class: [
                            "w-full px-3 py-2 rounded-md text-sm sm:text-base",
                            unref(newMovement).type === "expense" ? "bg-red-500 hover:bg-red-600 text-white" : "border bg-slate-100"
                          ],
                          onClick: ($event) => unref(newMovement).type = "expense"
                        }, " Dépense ", 10, ["onClick"]),
                        createVNode("button", {
                          type: "button",
                          class: [
                            "w-full px-3 py-2 rounded-md text-sm sm:text-base",
                            unref(newMovement).type === "income" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "border bg-slate-100"
                          ],
                          onClick: ($event) => unref(newMovement).type = "income"
                        }, " Revenu ", 10, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-3 sm:space-y-4" }, [
                      createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                        createVNode("label", {
                          class: _ctx.isDarkMode ? "text-white" : "text-slate-900"
                        }, "Nom", 2),
                        createVNode(unref(_sfc_main$4), {
                          modelValue: unref(newMovement).name,
                          "onUpdate:modelValue": ($event) => unref(newMovement).name = $event,
                          type: "text",
                          placeholder: "Ex: Loyer, Salaire...",
                          class: [
                            _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                          ]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                      ]),
                      createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                        createVNode("label", {
                          class: _ctx.isDarkMode ? "text-white" : "text-slate-900"
                        }, "Montant", 2),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(_sfc_main$4), {
                            modelValue: unref(newMovement).amount,
                            "onUpdate:modelValue": ($event) => unref(newMovement).amount = $event,
                            type: "number",
                            placeholder: "0.00",
                            class: ["pl-8", [
                              _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                            ]]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          createVNode("span", { class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" }, "€")
                        ])
                      ]),
                      createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                        createVNode("label", {
                          class: _ctx.isDarkMode ? "text-white" : "text-slate-900"
                        }, "Date", 2),
                        createVNode(unref(_sfc_main$4), {
                          modelValue: unref(dateString),
                          "onUpdate:modelValue": ($event) => isRef(dateString) ? dateString.value = $event : null,
                          type: "date",
                          class: [
                            _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                          ]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                      ]),
                      createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                        createVNode("label", {
                          class: _ctx.isDarkMode ? "text-white" : "text-slate-900"
                        }, "Image (optionnel)", 2),
                        createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                          createVNode("input", {
                            type: "file",
                            id: "image",
                            accept: "image/*",
                            onChange: handleImageUpload,
                            class: "hidden",
                            ref_key: "fileInput",
                            ref: fileInput
                          }, null, 544),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => _ctx.$refs.fileInput.click(),
                            class: [
                              "px-3 py-2 rounded-md flex items-center gap-1 text-sm sm:text-base",
                              _ctx.isDarkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            ]
                          }, [
                            createVNode("span", null, "Choisir une image")
                          ], 10, ["onClick"]),
                          createVNode("span", {
                            class: ["text-sm", _ctx.isDarkMode ? "text-gray-400" : "text-gray-500"]
                          }, toDisplayString(unref(imageUpload).state.value.fileName || "Aucun fichier sélectionné"), 3)
                        ]),
                        unref(imageUpload).state.value.previewUrl ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 relative"
                        }, [
                          createVNode("img", {
                            src: unref(imageUpload).state.value.previewUrl,
                            alt: "Prévisualisation",
                            class: "h-24 w-auto object-cover rounded-md"
                          }, null, 8, ["src"]),
                          createVNode("button", {
                            type: "button",
                            onClick: removeImage,
                            class: "absolute top-1 right-1 bg-red-500 text-white rounded-full"
                          }, [
                            createVNode("span", { class: "items-center justify-center" }, [
                              createVNode(unref(CircleX))
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        unref(imageUpload).state.value.error ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-2"
                        }, [
                          createVNode(unref(_sfc_main$3), { variant: "destructive" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(imageUpload).state.value.error), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true),
                        unref(imageUpload).state.value.compressionInfo ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "mt-1"
                        }, [
                          createVNode("div", {
                            class: ["text-xs flex items-center gap-1", _ctx.isDarkMode ? "text-green-400" : "text-green-600"]
                          }, [
                            createVNode(unref(Check), { class: "h-3 w-3" }),
                            createTextVNode(" " + toDisplayString(unref(imageUpload).state.value.compressionInfo), 1)
                          ], 2)
                        ])) : createCommentVNode("", true),
                        unref(imageUpload).state.value.isUploading ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "mt-2"
                        }, [
                          createVNode("div", {
                            class: ["flex items-center gap-2 text-sm", _ctx.isDarkMode ? "text-gray-400" : "text-gray-600"]
                          }, [
                            createVNode(unref(Upload), { class: "h-4 w-4 animate-pulse" }),
                            createTextVNode(" Traitement en cours... ")
                          ], 2)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2 sm:space-y-3" }, [
                      createVNode("label", {
                        class: [
                          "text-sm font-medium",
                          _ctx.isDarkMode ? "text-white" : "text-slate-900"
                        ]
                      }, " Type de récurrence ", 2),
                      createVNode("div", { class: "grid grid-cols-1 gap-2" }, [
                        createVNode(unref(_sfc_main$5), {
                          variant: "outline",
                          class: [
                            "justify-start py-1 sm:py-2 text-sm sm:text-base",
                            !unref(newMovement).isRecurrent ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                          ],
                          onClick: ($event) => unref(newMovement).isRecurrent = false
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "mr-2" }, "🔄"),
                            createTextVNode(" Pas de récurrence ")
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"]),
                        createVNode(unref(_sfc_main$5), {
                          variant: "outline",
                          class: [
                            "justify-start py-1 sm:py-2 text-sm sm:text-base",
                            unref(newMovement).isRecurrent ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                          ],
                          onClick: ($event) => unref(newMovement).isRecurrent = true
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "mr-2" }, "📅"),
                            createTextVNode(" Mensuel ")
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"])
                      ])
                    ])
                  ]),
                  createVNode(unref(_sfc_main$8), {
                    class: [
                      "sticky bottom-0 z-10 p-4 sm:p-6 border-t",
                      _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                    ]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), {
                        class: "w-full bg-emerald-500 hover:bg-emerald-600 text-white",
                        onClick: handleAddMovement,
                        disabled: unref(imageUpload).state.value.isUploading
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(imageUpload).state.value.isUploading ? "Traitement..." : "Ajouter"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  }, 8, ["class"])
                ]),
                _: 1
              }, 8, ["class"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/add-movement-dialog/AddMovementDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const formatFullDate = (date) => {
  if (!date) return "";
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};
const useMovementsStore = defineStore("movements", {
  state: () => ({
    movements: [],
    isLoading: false,
    error: null
  }),
  getters: {
    // Mouvements triés par date (plus récents en premier)
    sortedMovements: (state) => {
      return [...state.movements].sort((a, b) => {
        const dateA = a.date instanceof Date ? a.date : new Date(a.date);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    },
    // Mouvements par type
    expenseMovements: (state) => state.movements.filter((m) => m.type === "expense"),
    incomeMovements: (state) => state.movements.filter((m) => m.type === "income"),
    // Mouvements récurrents
    recurrentMovements: (state) => state.movements.filter((m) => m.isRecurrent),
    // Total des mouvements
    totalMovements: (state) => state.movements.length,
    // Mouvement par ID
    getMovementById: (state) => (id) => state.movements.find((m) => m.id === id)
  },
  actions: {
    // Ajouter un mouvement
    addMovement(newMovement) {
      this.error = null;
      try {
        const date = typeof newMovement.date === "string" ? new Date(newMovement.date) : newMovement.date;
        if (isNaN(date.getTime())) {
          throw new Error("Date invalide");
        }
        const movement = {
          id: Date.now() + Math.random(),
          // ID plus unique
          name: newMovement.name.trim(),
          amount: Number(newMovement.amount),
          date,
          type: newMovement.type,
          isRecurrent: newMovement.isRecurrent,
          imageUrl: newMovement.imageUrl || void 0
        };
        if (!movement.name) {
          throw new Error("Le nom est requis");
        }
        if (movement.amount <= 0) {
          throw new Error("Le montant doit être positif");
        }
        this.movements.push(movement);
        return movement;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Erreur lors de l'ajout";
        throw error;
      }
    },
    // Mettre à jour un mouvement
    updateMovement(updatedMovement) {
      this.error = null;
      try {
        const index = this.movements.findIndex((m) => m.id === updatedMovement.id);
        if (index === -1) {
          throw new Error("Mouvement introuvable");
        }
        if (!updatedMovement.name.trim()) {
          throw new Error("Le nom est requis");
        }
        if (updatedMovement.amount <= 0) {
          throw new Error("Le montant doit être positif");
        }
        if (isNaN(updatedMovement.date.getTime())) {
          throw new Error("Date invalide");
        }
        this.movements[index] = {
          ...updatedMovement,
          name: updatedMovement.name.trim(),
          amount: Number(updatedMovement.amount)
        };
        return true;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Erreur lors de la mise à jour";
        return false;
      }
    },
    // Supprimer un mouvement
    deleteMovement(id) {
      this.error = null;
      const index = this.movements.findIndex((m) => m.id === id);
      if (index === -1) {
        this.error = "Mouvement introuvable";
        return false;
      }
      this.movements.splice(index, 1);
      return true;
    },
    // Supprimer tous les mouvements
    clearAllMovements() {
      this.movements = [];
      this.error = null;
    },
    // Charger les mouvements (pour la persistance)
    loadMovements(movements) {
      this.isLoading = true;
      this.error = null;
      try {
        this.movements = movements.map((m) => ({
          ...m,
          date: m.date instanceof Date ? m.date : new Date(m.date),
          amount: Number(m.amount),
          name: m.name.trim(),
          // Nettoyer les URLs blob
          imageUrl: m.imageUrl && m.imageUrl.startsWith("blob:") ? void 0 : m.imageUrl
        })).filter(
          (m) => m.name && !isNaN(m.amount) && m.amount > 0 && !isNaN(m.date.getTime())
        );
      } catch (error) {
        this.error = "Erreur lors du chargement des données";
        this.movements = [];
      } finally {
        this.isLoading = false;
      }
    },
    // Réinitialiser l'état d'erreur
    clearError() {
      this.error = null;
    }
  }
});
const useFinanceStore = defineStore("finance", {
  getters: {
    // Générer les récurrences pour une période donnée
    getMovementsWithRecurrences: () => {
      return (startDate, endDate) => {
        const movementsStore = useMovementsStore();
        if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error("Dates invalides:", { startDate, endDate });
          return [...movementsStore.movements];
        }
        try {
          const result = [...movementsStore.movements];
          movementsStore.recurrentMovements.forEach((movement) => {
            const originalDate = new Date(movement.date);
            if (isNaN(originalDate.getTime())) {
              console.error("Date invalide pour le mouvement récurrent:", movement);
              return;
            }
            let currentDate = new Date(originalDate);
            currentDate.setMonth(currentDate.getMonth() + 1);
            while (currentDate <= endDate) {
              if (currentDate >= startDate) {
                const clonedMovement = {
                  ...movement,
                  id: movement.id + currentDate.getTime(),
                  // ID unique
                  date: new Date(currentDate),
                  isGeneratedRecurrence: true
                };
                result.push(clonedMovement);
              }
              currentDate = new Date(currentDate);
              currentDate.setMonth(currentDate.getMonth() + 1);
            }
          });
          return result;
        } catch (error) {
          console.error("Erreur lors de la génération des récurrences:", error);
          return [...movementsStore.movements];
        }
      };
    },
    // Mouvements d'un mois spécifique
    getMonthMovements: () => {
      return (date) => {
        if (!date || isNaN(date.getTime())) {
          console.error("Date invalide:", date);
          return [];
        }
        try {
          const year = date.getFullYear();
          const month = date.getMonth();
          const startDate = new Date(year, month, 1);
          const endDate = new Date(year, month + 1, 0);
          const financeStore = useFinanceStore();
          const allMovements = financeStore.getMovementsWithRecurrences(startDate, endDate);
          return allMovements.filter((movement) => {
            const movementDate = movement.date instanceof Date ? movement.date : new Date(movement.date);
            if (isNaN(movementDate.getTime())) {
              return false;
            }
            return movementDate.getMonth() === date.getMonth() && movementDate.getFullYear() === date.getFullYear();
          });
        } catch (error) {
          console.error("Erreur lors de la récupération des mouvements du mois:", error);
          return [];
        }
      };
    },
    // Mouvements d'un jour spécifique
    getDayMovements: () => {
      return (date) => {
        if (!date || isNaN(date.getTime())) {
          console.error("Date invalide:", date);
          return [];
        }
        try {
          const sixMonthsLater = new Date(date);
          sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
          const financeStore = useFinanceStore();
          const allMovements = financeStore.getMovementsWithRecurrences(date, sixMonthsLater);
          return allMovements.filter((movement) => {
            const movementDate = movement.date instanceof Date ? movement.date : new Date(movement.date);
            if (isNaN(movementDate.getTime())) {
              return false;
            }
            return movementDate.getDate() === date.getDate() && movementDate.getMonth() === date.getMonth() && movementDate.getFullYear() === date.getFullYear();
          });
        } catch (error) {
          console.error("Erreur lors de la récupération des mouvements du jour:", error);
          return [];
        }
      };
    },
    // Calculs financiers pour un mois
    getMonthCalculations: () => {
      return (date) => {
        const financeStore = useFinanceStore();
        const monthMovements = financeStore.getMonthMovements(date);
        const income = monthMovements.filter((m) => m.type === "income").reduce((total, m) => total + Math.abs(m.amount), 0);
        const expenses = monthMovements.filter((m) => m.type === "expense").reduce((total, m) => total + Math.abs(m.amount), 0);
        const recurrent = monthMovements.filter((m) => m.isRecurrent || m.isGeneratedRecurrence).reduce((total, m) => total + Math.abs(m.amount), 0);
        return {
          totalBalance: income - expenses,
          monthlyIncome: income,
          monthlyExpenses: expenses,
          monthlyBalance: income - expenses,
          recurrentAmount: recurrent
        };
      };
    },
    // Solde total général
    getTotalBalance: () => {
      const movementsStore = useMovementsStore();
      return movementsStore.movements.reduce((total, movement) => {
        const amount = movement.type === "expense" ? -Math.abs(movement.amount) : Math.abs(movement.amount);
        return total + amount;
      }, 0);
    }
  }
});
class SavrDatabase extends Dexie {
  constructor() {
    super("SavrDB");
    __publicField(this, "movements");
    __publicField(this, "settings");
    this.version(1).stores({
      movements: "id, name, amount, date, type, isRecurrent, imageUrl",
      settings: "++id, key, value, updatedAt"
    });
    this.version(2).stores({
      movements: "id, name, amount, date, type, isRecurrent, imageUrl, isGeneratedRecurrence",
      settings: "++id, key, value, updatedAt"
    }).upgrade((tx) => {
      return tx.table("movements").toCollection().modify((movement) => {
        movement.isGeneratedRecurrence = false;
      });
    });
  }
}
const db = new SavrDatabase();
class MovementsService {
  // Sauvegarder tous les mouvements
  static async saveMovements(movements) {
    try {
      const storedMovements = movements.map((m) => {
        const date = m.date instanceof Date ? m.date : new Date(m.date);
        return {
          ...m,
          date: date.toISOString()
        };
      });
      await db.transaction("rw", db.movements, async () => {
        await db.movements.clear();
        await db.movements.bulkAdd(storedMovements);
      });
    } catch (error) {
      console.error("Erreur sauvegarde mouvements:", error);
      throw new Error("Impossible de sauvegarder les mouvements");
    }
  }
  // Charger tous les mouvements
  static async loadMovements() {
    try {
      const storedMovements = await db.movements.toArray();
      return storedMovements.map((m) => ({
        ...m,
        date: new Date(m.date)
      }));
    } catch (error) {
      console.error("Erreur chargement mouvements:", error);
      throw new Error("Impossible de charger les mouvements");
    }
  }
  // Ajouter un mouvement
  static async addMovement(movement) {
    try {
      const date = movement.date instanceof Date ? movement.date : new Date(movement.date);
      const storedMovement = {
        ...movement,
        date: date.toISOString()
      };
      await db.movements.add(storedMovement);
    } catch (error) {
      console.error("Erreur ajout mouvement:", error);
      throw new Error("Impossible d'ajouter le mouvement");
    }
  }
  // Mettre à jour un mouvement
  static async updateMovement(movement) {
    try {
      const date = movement.date instanceof Date ? movement.date : new Date(movement.date);
      const storedMovement = {
        ...movement,
        date: date.toISOString()
      };
      await db.movements.update(movement.id, storedMovement);
    } catch (error) {
      console.error("Erreur mise à jour mouvement:", error);
      throw new Error("Impossible de mettre à jour le mouvement");
    }
  }
  // Supprimer un mouvement
  static async deleteMovement(id) {
    try {
      await db.movements.delete(id);
    } catch (error) {
      console.error("Erreur suppression mouvement:", error);
      throw new Error("Impossible de supprimer le mouvement");
    }
  }
  // Vider tous les mouvements
  static async clearAllMovements() {
    try {
      await db.movements.clear();
    } catch (error) {
      console.error("Erreur vidage mouvements:", error);
      throw new Error("Impossible de vider les mouvements");
    }
  }
}
class SettingsService {
  // Sauvegarder un paramètre
  static async saveSetting(key, value) {
    try {
      const existing = await db.settings.where("key").equals(key).first();
      const setting = {
        key,
        value,
        updatedAt: /* @__PURE__ */ new Date()
      };
      if (existing) {
        await db.settings.update(existing.id, setting);
      } else {
        await db.settings.add(setting);
      }
    } catch (error) {
      console.error("Erreur sauvegarde paramètre:", error);
      throw new Error(`Impossible de sauvegarder le paramètre ${key}`);
    }
  }
  // Charger un paramètre
  static async loadSetting(key, defaultValue) {
    try {
      const setting = await db.settings.where("key").equals(key).first();
      return setting ? setting.value : defaultValue;
    } catch (error) {
      console.error("Erreur chargement paramètre:", error);
      return defaultValue;
    }
  }
  // Charger tous les paramètres
  static async loadAllSettings() {
    try {
      const settings = await db.settings.toArray();
      return settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {});
    } catch (error) {
      console.error("Erreur chargement paramètres:", error);
      return {};
    }
  }
  // Supprimer un paramètre
  static async deleteSetting(key) {
    try {
      await db.settings.where("key").equals(key).delete();
    } catch (error) {
      console.error("Erreur suppression paramètre:", error);
      throw new Error(`Impossible de supprimer le paramètre ${key}`);
    }
  }
}
class MigrationService {
  // Migrer les données depuis localStorage
  static async migrateFromLocalStorage() {
    {
      return { movements: 0, settings: 0 };
    }
  }
  // Vérifier si une migration est nécessaire
  static needsMigration() {
    return false;
  }
  // Exporter toutes les données pour sauvegarde
  static async exportData() {
    try {
      const movements = await MovementsService.loadMovements();
      const settings = await SettingsService.loadAllSettings();
      return {
        movements,
        settings,
        exportDate: (/* @__PURE__ */ new Date()).toISOString(),
        version: "1.0"
      };
    } catch (error) {
      console.error("Erreur export données:", error);
      throw new Error("Impossible d'exporter les données");
    }
  }
  // Importer des données depuis une sauvegarde
  static async importData(data) {
    try {
      await db.transaction("rw", [db.movements, db.settings], async () => {
        var _a;
        if ((_a = data.movements) == null ? void 0 : _a.length) {
          await MovementsService.saveMovements(data.movements);
        }
        if (data.settings) {
          for (const [key, value] of Object.entries(data.settings)) {
            await SettingsService.saveSetting(key, value);
          }
        }
      });
    } catch (error) {
      console.error("Erreur import données:", error);
      throw new Error("Impossible d'importer les données");
    }
  }
}
function useFinance() {
  const movementsStore = useMovementsStore();
  const financeStore = useFinanceStore();
  const uiStore = useUIStore();
  const { movements, isLoading, error } = storeToRefs(movementsStore);
  const initializeData = async () => {
    try {
      uiStore.setLoading(true, "Rechargement des données...");
      const loadedMovements = await MovementsService.loadMovements();
      movementsStore.loadMovements(loadedMovements);
    } catch (error2) {
      console.error("Erreur initialisation:", error2);
      uiStore.showError(
        "Erreur de chargement",
        "Impossible de charger vos données."
      );
    } finally {
      uiStore.setLoading(false);
    }
  };
  const autoSave = async () => {
    try {
      await MovementsService.saveMovements(movements.value);
    } catch (error2) {
      console.error("Erreur sauvegarde automatique:", error2);
      uiStore.showError(
        "Erreur de sauvegarde",
        "Vos modifications n'ont pas pu être sauvegardées automatiquement."
      );
    }
  };
  const addMovement = async (newMovement) => {
    try {
      uiStore.clearNotifications();
      const movement = movementsStore.addMovement(newMovement);
      await autoSave();
      uiStore.showSuccess("Mouvement ajouté", `${movement.name} a été ajouté avec succès`);
      return true;
    } catch (error2) {
      const message = error2 instanceof Error ? error2.message : "Erreur inconnue";
      uiStore.showError("Erreur d'ajout", message);
      return false;
    }
  };
  const updateMovement = async (updatedMovement) => {
    try {
      uiStore.clearNotifications();
      const success = movementsStore.updateMovement(updatedMovement);
      if (success) {
        await autoSave();
        uiStore.showSuccess("Mouvement modifié", "Les modifications ont été sauvegardées");
        return true;
      }
      return false;
    } catch (error2) {
      const message = error2 instanceof Error ? error2.message : "Erreur inconnue";
      uiStore.showError("Erreur de modification", message);
      return false;
    }
  };
  const deleteMovement = async (id) => {
    try {
      uiStore.clearNotifications();
      const success = movementsStore.deleteMovement(id);
      if (success) {
        await autoSave();
        uiStore.showSuccess("Mouvement supprimé", "Le mouvement a été supprimé avec succès");
        return true;
      }
      return false;
    } catch (error2) {
      const message = error2 instanceof Error ? error2.message : "Erreur inconnue";
      uiStore.showError("Erreur de suppression", message);
      return false;
    }
  };
  const getMonthMovements = (date) => financeStore.getMonthMovements(date);
  const getDayMovements = (date) => financeStore.getDayMovements(date);
  const getMonthBalance = (date) => financeStore.getMonthCalculations(date).monthlyBalance;
  const getIncomeExpenseForMonth = (date) => {
    const calc = financeStore.getMonthCalculations(date);
    return {
      income: calc.monthlyIncome,
      expense: calc.monthlyExpenses
    };
  };
  const getTotalBalance = () => financeStore.getTotalBalance;
  const exportData = async () => {
    try {
      uiStore.setLoading(true, "Export en cours...");
      const data = await MigrationService.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const a = (void 0).createElement("a");
      a.href = url;
      a.download = `savr-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      uiStore.showSuccess("Export réussi", "Vos données ont été exportées avec succès");
    } catch (error2) {
      uiStore.showError("Erreur d'export", "Impossible d'exporter vos données");
    } finally {
      uiStore.setLoading(false);
    }
  };
  const importData = async (file) => {
    try {
      uiStore.setLoading(true, "Import en cours...");
      const text = await file.text();
      const data = JSON.parse(text);
      await MigrationService.importData(data);
      await initializeData();
      uiStore.showSuccess("Import réussi", "Vos données ont été importées avec succès");
    } catch (error2) {
      uiStore.showError("Erreur d'import", "Format de fichier invalide ou données corrompues");
    } finally {
      uiStore.setLoading(false);
    }
  };
  return {
    // État
    movements: readonly(movements),
    isLoading: readonly(isLoading),
    error: readonly(error),
    // Actions
    addMovement,
    updateMovement,
    deleteMovement,
    // Calculs
    getMonthMovements,
    getDayMovements,
    getMonthBalance,
    getIncomeExpenseForMonth,
    getTotalBalance,
    // Utilitaires
    initializeData,
    exportData,
    importData
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const financeData = useFinance();
    const settingsStore = useSettingsStore();
    const uiStore = useUIStore();
    const { isDarkMode } = storeToRefs(settingsStore);
    const { showAddDialog, selectedDate, currentMonth } = storeToRefs(uiStore);
    const defaultDate = /* @__PURE__ */ new Date();
    if (!selectedDate.value || isNaN(selectedDate.value.getTime())) {
      uiStore.setSelectedDate(defaultDate);
    }
    if (!currentMonth.value || isNaN(currentMonth.value.getTime())) {
      uiStore.setCurrentMonth(defaultDate);
    }
    const handleAddMovement = async (newMovement) => {
      const success = await financeData.addMovement(newMovement);
      if (success) {
        uiStore.closeAddDialog();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      const _component_AddMovementDialog = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "min-h-screen transition-colors duration-300",
          unref(isDarkMode) ? "dark bg-gray-950" : "bg-slate-50"
        ]
      }, _attrs))}><div class="p-6 space-y-6"><div class="flex justify-between items-center"><div class="space-y-1"><div class="${ssrRenderClass(unref(isDarkMode) ? "text-gray-400" : "text-slate-600")}">${ssrInterpolate(unref(formatFullDate)(unref(selectedDate)))}</div><h1 class="${ssrRenderClass([
        "text-4xl font-bold flex items-center gap-2",
        unref(isDarkMode) ? "text-white" : "text-slate-900"
      ])}"> Bonjour, <span>User</span></h1></div><button class="${ssrRenderClass([
        "rounded-full p-2",
        unref(isDarkMode) ? "hover:bg-gray-800" : "hover:bg-slate-200"
      ])}">`);
      if (unref(isDarkMode)) {
        _push(ssrRenderComponent(unref(Sun), { class: "h-6 w-6 text-yellow-500" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Moon), { class: "h-6 w-6 text-slate-700" }, null, _parent));
      }
      _push(`</button></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div><button class="fixed bottom-20 right-6 rounded-full w-12 h-12 shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Plus), { class: "h-6 w-6" }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_AddMovementDialog, {
        "is-open": unref(showAddDialog),
        "is-dark-mode": unref(isDarkMode),
        "onUpdate:isOpen": unref(uiStore).closeAddDialog,
        onAddMovement: handleAddMovement
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CaNeARi_.js.map
