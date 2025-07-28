import { a as useSettingsStore, b as useUIStore, c as __nuxt_component_1 } from "../server.mjs";
import { _ as __nuxt_component_0 } from "./nuxt-link-CJuUq_A4.js";
import { defineComponent, unref, mergeProps, withCtx, renderSlot, useSSRContext, computed, createVNode, ref, readonly, createBlock, openBlock, toDisplayString, createCommentVNode, createTextVNode, Fragment, renderList, withKeys, withModifiers, watch, isRef } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useForwardPropsEmits, DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogClose, useForwardProps, DialogTitle, PopoverRoot, PopoverPortal, PopoverContent, PopoverTrigger } from "reka-ui";
import { c as cn, u as useCategoriesStore, _ as _sfc_main$f, a as _sfc_main$g, b as useFinance } from "./useFinance-BLxJwmk-.js";
import { X, ChevronDown, Search, Tag, Plus, Check, CircleX, Upload, Sun, Moon, BarChart3 } from "lucide-vue-next";
import { cva } from "class-variance-authority";
import { storeToRefs } from "pinia";
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
import "ufo";
import "destr";
import "klona";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "dexie";
const _sfc_main$e = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/Dialog.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogContent.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogFooter.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogHeader.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogTitle.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/alert/Alert.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/alert/AlertDescription.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
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
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Popover",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverRoot), mergeProps(unref(forwarded), _attrs), {
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/Popover.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PopoverContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    side: {},
    sideOffset: { default: 4 },
    align: { default: "center" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean },
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
      _push(ssrRenderComponent(unref(PopoverPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PopoverContent), mergeProps({ ...unref(forwarded), ..._ctx.$attrs }, {
              class: unref(cn)(
                "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(PopoverContent), mergeProps({ ...unref(forwarded), ..._ctx.$attrs }, {
                class: unref(cn)(
                  "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/PopoverContent.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "PopoverTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverTrigger), mergeProps(props, _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/PopoverTrigger.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CategorySelect",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: {},
    placeholder: { default: "Sélectionner une catégorie" },
    required: { type: Boolean },
    allowClear: { type: Boolean, default: true },
    filterType: { default: "all" },
    errorMessage: {}
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const categoriesStore = useCategoriesStore();
    const settingsStore = useSettingsStore();
    const { isDarkMode } = storeToRefs(settingsStore);
    const searchQuery = ref("");
    const labelClasses = computed(() => [
      "text-sm font-medium",
      isDarkMode.value ? "text-white" : "text-gray-900"
    ]);
    const selectedCategory = computed(() => {
      if (!props.modelValue) return null;
      return categoriesStore.getCategoryById(props.modelValue);
    });
    const filteredCategories = computed(() => {
      let categories = categoriesStore.sortedCategories;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        categories = categories.filter(
          (cat) => {
            var _a;
            return cat.name.toLowerCase().includes(query) || ((_a = cat.description) == null ? void 0 : _a.toLowerCase().includes(query));
          }
        );
      }
      return categories;
    });
    const expenseCategories = computed(() => {
      if (props.filterType === "income") return [];
      return filteredCategories.value.filter((cat) => cat.order < 10);
    });
    const incomeCategories = computed(() => {
      if (props.filterType === "expense") return [];
      return filteredCategories.value.filter((cat) => cat.order >= 10 && cat.order < 90);
    });
    const showExpenseCategories = computed(() => {
      return expenseCategories.value.length > 0;
    });
    const showIncomeCategories = computed(() => {
      return incomeCategories.value.length > 0;
    });
    const selectCategory = (category) => {
      emit("update:modelValue", category.id);
      emit("change", category);
      searchQuery.value = "";
    };
    const clearSelection = () => {
      emit("update:modelValue", void 0);
      emit("change", void 0);
      searchQuery.value = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}>`);
      if (_ctx.label) {
        _push(`<label class="${ssrRenderClass(labelClasses.value)}">${ssrInterpolate(_ctx.label)} `);
        if (_ctx.required) {
          _push(`<span class="text-red-500 ml-1">*</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(_sfc_main$7), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$5), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$f), {
                    variant: "outline",
                    role: "combobox",
                    class: [
                      "w-full justify-between",
                      !selectedCategory.value && "text-muted-foreground",
                      unref(isDarkMode) ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"
                    ]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (selectedCategory.value) {
                          _push4(`<div class="flex items-center gap-2"${_scopeId3}><span class="text-lg"${_scopeId3}>${ssrInterpolate(selectedCategory.value.icon)}</span><span${_scopeId3}>${ssrInterpolate(selectedCategory.value.name)}</span><span class="w-3 h-3 rounded-full flex-shrink-0" style="${ssrRenderStyle({ backgroundColor: selectedCategory.value.color })}"${_scopeId3}></span></div>`);
                        } else {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(_ctx.placeholder)}</span>`);
                        }
                        _push4(ssrRenderComponent(unref(ChevronDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          selectedCategory.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-2"
                          }, [
                            createVNode("span", { class: "text-lg" }, toDisplayString(selectedCategory.value.icon), 1),
                            createVNode("span", null, toDisplayString(selectedCategory.value.name), 1),
                            createVNode("span", {
                              class: "w-3 h-3 rounded-full flex-shrink-0",
                              style: { backgroundColor: selectedCategory.value.color }
                            }, null, 4)
                          ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.placeholder), 1)),
                          createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$f), {
                      variant: "outline",
                      role: "combobox",
                      class: [
                        "w-full justify-between",
                        !selectedCategory.value && "text-muted-foreground",
                        unref(isDarkMode) ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"
                      ]
                    }, {
                      default: withCtx(() => [
                        selectedCategory.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode("span", { class: "text-lg" }, toDisplayString(selectedCategory.value.icon), 1),
                          createVNode("span", null, toDisplayString(selectedCategory.value.name), 1),
                          createVNode("span", {
                            class: "w-3 h-3 rounded-full flex-shrink-0",
                            style: { backgroundColor: selectedCategory.value.color }
                          }, null, 4)
                        ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.placeholder), 1)),
                        createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), {
              class: "w-80 p-0",
              align: "start"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass(unref(isDarkMode) ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200")}"${_scopeId2}><div class="${ssrRenderClass([unref(isDarkMode) ? "border-gray-700" : "border-gray-200", "p-2 border-b"])}"${_scopeId2}><div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Search), { class: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$g), {
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: "Rechercher une catégorie...",
                    class: ["pl-8", unref(isDarkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"]
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="max-h-60 overflow-auto"${_scopeId2}>`);
                  if (filteredCategories.value.length === 0) {
                    _push3(`<div class="p-4 text-center text-muted-foreground"${_scopeId2}> Aucune catégorie trouvée </div>`);
                  } else {
                    _push3(`<div class="p-1"${_scopeId2}>`);
                    if (showExpenseCategories.value) {
                      _push3(`<div${_scopeId2}><div class="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider"${_scopeId2}> Dépenses </div><!--[-->`);
                      ssrRenderList(expenseCategories.value, (category) => {
                        _push3(ssrRenderComponent(unref(_sfc_main$f), {
                          key: category.id,
                          variant: "ghost",
                          class: "w-full justify-start h-auto p-2 mb-1",
                          onClick: ($event) => selectCategory(category)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="flex items-center gap-3 w-full"${_scopeId3}><span class="text-lg flex-shrink-0"${_scopeId3}>${ssrInterpolate(category.icon)}</span><div class="flex-1 text-left"${_scopeId3}><div class="font-medium"${_scopeId3}>${ssrInterpolate(category.name)}</div>`);
                              if (category.description) {
                                _push4(`<div class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(category.description)}</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div><span class="w-3 h-3 rounded-full flex-shrink-0" style="${ssrRenderStyle({ backgroundColor: category.color })}"${_scopeId3}></span></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex items-center gap-3 w-full" }, [
                                  createVNode("span", { class: "text-lg flex-shrink-0" }, toDisplayString(category.icon), 1),
                                  createVNode("div", { class: "flex-1 text-left" }, [
                                    createVNode("div", { class: "font-medium" }, toDisplayString(category.name), 1),
                                    category.description ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-muted-foreground"
                                    }, toDisplayString(category.description), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("span", {
                                    class: "w-3 h-3 rounded-full flex-shrink-0",
                                    style: { backgroundColor: category.color }
                                  }, null, 4)
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (showIncomeCategories.value) {
                      _push3(`<div class="mt-2"${_scopeId2}><div class="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider"${_scopeId2}> Revenus </div><!--[-->`);
                      ssrRenderList(incomeCategories.value, (category) => {
                        _push3(ssrRenderComponent(unref(_sfc_main$f), {
                          key: category.id,
                          variant: "ghost",
                          class: "w-full justify-start h-auto p-2 mb-1",
                          onClick: ($event) => selectCategory(category)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="flex items-center gap-3 w-full"${_scopeId3}><span class="text-lg flex-shrink-0"${_scopeId3}>${ssrInterpolate(category.icon)}</span><div class="flex-1 text-left"${_scopeId3}><div class="font-medium"${_scopeId3}>${ssrInterpolate(category.name)}</div>`);
                              if (category.description) {
                                _push4(`<div class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(category.description)}</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div><span class="w-3 h-3 rounded-full flex-shrink-0" style="${ssrRenderStyle({ backgroundColor: category.color })}"${_scopeId3}></span></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex items-center gap-3 w-full" }, [
                                  createVNode("span", { class: "text-lg flex-shrink-0" }, toDisplayString(category.icon), 1),
                                  createVNode("div", { class: "flex-1 text-left" }, [
                                    createVNode("div", { class: "font-medium" }, toDisplayString(category.name), 1),
                                    category.description ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-muted-foreground"
                                    }, toDisplayString(category.description), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("span", {
                                    class: "w-3 h-3 rounded-full flex-shrink-0",
                                    style: { backgroundColor: category.color }
                                  }, null, 4)
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  }
                  _push3(`</div><div class="${ssrRenderClass([unref(isDarkMode) ? "border-gray-700" : "border-gray-200", "border-t p-2"])}"${_scopeId2}>`);
                  if (_ctx.allowClear && selectedCategory.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$f), {
                      variant: "ghost",
                      size: "sm",
                      class: "w-full text-red-500 hover:text-red-600",
                      onClick: clearSelection
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(X), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                          _push4(` Aucune catégorie `);
                        } else {
                          return [
                            createVNode(unref(X), { class: "h-4 w-4 mr-2" }),
                            createTextVNode(" Aucune catégorie ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: unref(isDarkMode) ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                    }, [
                      createVNode("div", {
                        class: ["p-2 border-b", unref(isDarkMode) ? "border-gray-700" : "border-gray-200"]
                      }, [
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(Search), { class: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
                          createVNode(unref(_sfc_main$g), {
                            modelValue: searchQuery.value,
                            "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                            placeholder: "Rechercher une catégorie...",
                            class: ["pl-8", unref(isDarkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                        ])
                      ], 2),
                      createVNode("div", { class: "max-h-60 overflow-auto" }, [
                        filteredCategories.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "p-4 text-center text-muted-foreground"
                        }, " Aucune catégorie trouvée ")) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "p-1"
                        }, [
                          showExpenseCategories.value ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("div", { class: "px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider" }, " Dépenses "),
                            (openBlock(true), createBlock(Fragment, null, renderList(expenseCategories.value, (category) => {
                              return openBlock(), createBlock(unref(_sfc_main$f), {
                                key: category.id,
                                variant: "ghost",
                                class: "w-full justify-start h-auto p-2 mb-1",
                                onClick: ($event) => selectCategory(category)
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3 w-full" }, [
                                    createVNode("span", { class: "text-lg flex-shrink-0" }, toDisplayString(category.icon), 1),
                                    createVNode("div", { class: "flex-1 text-left" }, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(category.name), 1),
                                      category.description ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-muted-foreground"
                                      }, toDisplayString(category.description), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("span", {
                                      class: "w-3 h-3 rounded-full flex-shrink-0",
                                      style: { backgroundColor: category.color }
                                    }, null, 4)
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["onClick"]);
                            }), 128))
                          ])) : createCommentVNode("", true),
                          showIncomeCategories.value ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mt-2"
                          }, [
                            createVNode("div", { class: "px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider" }, " Revenus "),
                            (openBlock(true), createBlock(Fragment, null, renderList(incomeCategories.value, (category) => {
                              return openBlock(), createBlock(unref(_sfc_main$f), {
                                key: category.id,
                                variant: "ghost",
                                class: "w-full justify-start h-auto p-2 mb-1",
                                onClick: ($event) => selectCategory(category)
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-3 w-full" }, [
                                    createVNode("span", { class: "text-lg flex-shrink-0" }, toDisplayString(category.icon), 1),
                                    createVNode("div", { class: "flex-1 text-left" }, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(category.name), 1),
                                      category.description ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-muted-foreground"
                                      }, toDisplayString(category.description), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("span", {
                                      class: "w-3 h-3 rounded-full flex-shrink-0",
                                      style: { backgroundColor: category.color }
                                    }, null, 4)
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["onClick"]);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ]))
                      ]),
                      createVNode("div", {
                        class: ["border-t p-2", unref(isDarkMode) ? "border-gray-700" : "border-gray-200"]
                      }, [
                        _ctx.allowClear && selectedCategory.value ? (openBlock(), createBlock(unref(_sfc_main$f), {
                          key: 0,
                          variant: "ghost",
                          size: "sm",
                          class: "w-full text-red-500 hover:text-red-600",
                          onClick: clearSelection
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(X), { class: "h-4 w-4 mr-2" }),
                            createTextVNode(" Aucune catégorie ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ], 2)
                    ], 2)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$5), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$f), {
                    variant: "outline",
                    role: "combobox",
                    class: [
                      "w-full justify-between",
                      !selectedCategory.value && "text-muted-foreground",
                      unref(isDarkMode) ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"
                    ]
                  }, {
                    default: withCtx(() => [
                      selectedCategory.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-2"
                      }, [
                        createVNode("span", { class: "text-lg" }, toDisplayString(selectedCategory.value.icon), 1),
                        createVNode("span", null, toDisplayString(selectedCategory.value.name), 1),
                        createVNode("span", {
                          class: "w-3 h-3 rounded-full flex-shrink-0",
                          style: { backgroundColor: selectedCategory.value.color }
                        }, null, 4)
                      ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.placeholder), 1)),
                      createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                    ]),
                    _: 1
                  }, 8, ["class"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), {
                class: "w-80 p-0",
                align: "start"
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: unref(isDarkMode) ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                  }, [
                    createVNode("div", {
                      class: ["p-2 border-b", unref(isDarkMode) ? "border-gray-700" : "border-gray-200"]
                    }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(Search), { class: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
                        createVNode(unref(_sfc_main$g), {
                          modelValue: searchQuery.value,
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          placeholder: "Rechercher une catégorie...",
                          class: ["pl-8", unref(isDarkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                      ])
                    ], 2),
                    createVNode("div", { class: "max-h-60 overflow-auto" }, [
                      filteredCategories.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-4 text-center text-muted-foreground"
                      }, " Aucune catégorie trouvée ")) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "p-1"
                      }, [
                        showExpenseCategories.value ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("div", { class: "px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider" }, " Dépenses "),
                          (openBlock(true), createBlock(Fragment, null, renderList(expenseCategories.value, (category) => {
                            return openBlock(), createBlock(unref(_sfc_main$f), {
                              key: category.id,
                              variant: "ghost",
                              class: "w-full justify-start h-auto p-2 mb-1",
                              onClick: ($event) => selectCategory(category)
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-3 w-full" }, [
                                  createVNode("span", { class: "text-lg flex-shrink-0" }, toDisplayString(category.icon), 1),
                                  createVNode("div", { class: "flex-1 text-left" }, [
                                    createVNode("div", { class: "font-medium" }, toDisplayString(category.name), 1),
                                    category.description ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-muted-foreground"
                                    }, toDisplayString(category.description), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("span", {
                                    class: "w-3 h-3 rounded-full flex-shrink-0",
                                    style: { backgroundColor: category.color }
                                  }, null, 4)
                                ])
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        showIncomeCategories.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-2"
                        }, [
                          createVNode("div", { class: "px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider" }, " Revenus "),
                          (openBlock(true), createBlock(Fragment, null, renderList(incomeCategories.value, (category) => {
                            return openBlock(), createBlock(unref(_sfc_main$f), {
                              key: category.id,
                              variant: "ghost",
                              class: "w-full justify-start h-auto p-2 mb-1",
                              onClick: ($event) => selectCategory(category)
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-3 w-full" }, [
                                  createVNode("span", { class: "text-lg flex-shrink-0" }, toDisplayString(category.icon), 1),
                                  createVNode("div", { class: "flex-1 text-left" }, [
                                    createVNode("div", { class: "font-medium" }, toDisplayString(category.name), 1),
                                    category.description ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-muted-foreground"
                                    }, toDisplayString(category.description), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("span", {
                                    class: "w-3 h-3 rounded-full flex-shrink-0",
                                    style: { backgroundColor: category.color }
                                  }, null, 4)
                                ])
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128))
                        ])) : createCommentVNode("", true)
                      ]))
                    ]),
                    createVNode("div", {
                      class: ["border-t p-2", unref(isDarkMode) ? "border-gray-700" : "border-gray-200"]
                    }, [
                      _ctx.allowClear && selectedCategory.value ? (openBlock(), createBlock(unref(_sfc_main$f), {
                        key: 0,
                        variant: "ghost",
                        size: "sm",
                        class: "w-full text-red-500 hover:text-red-600",
                        onClick: clearSelection
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(X), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Aucune catégorie ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ], 2)
                  ], 2)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.errorMessage) {
        _push(`<div class="text-sm text-red-500 mt-1">${ssrInterpolate(_ctx.errorMessage)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/categories/CategorySelect.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TagSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: () => [] },
    label: {},
    placeholder: { default: "Sélectionner des tags" },
    allowCreate: { type: Boolean, default: true },
    maxTags: { default: 5 },
    errorMessage: {}
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const categoriesStore = useCategoriesStore();
    const settingsStore = useSettingsStore();
    const { isDarkMode } = storeToRefs(settingsStore);
    const searchQuery = ref("");
    const isOpen = ref(false);
    const tagColors = [
      "#3B82F6",
      "#EF4444",
      "#10B981",
      "#F59E0B",
      "#8B5CF6",
      "#EC4899",
      "#06B6D4",
      "#84CC16",
      "#F97316",
      "#6366F1"
    ];
    const labelClasses = computed(() => [
      "text-sm font-medium",
      isDarkMode.value ? "text-white" : "text-gray-900"
    ]);
    const selectedTags = computed(() => {
      return props.modelValue.map((id) => categoriesStore.getTagById(id)).filter(Boolean);
    });
    const filteredTags = computed(() => {
      let tags = categoriesStore.tags;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        tags = tags.filter(
          (tag) => tag.name.toLowerCase().includes(query)
        );
      }
      return tags;
    });
    const exactMatch = computed(() => {
      if (!searchQuery.value) return false;
      return categoriesStore.tags.some(
        (tag) => tag.name.toLowerCase() === searchQuery.value.toLowerCase()
      );
    });
    const isSelected = (tagId) => {
      return props.modelValue.includes(tagId);
    };
    const toggleTag = (tag) => {
      const newValues = isSelected(tag.id) ? props.modelValue.filter((id) => id !== tag.id) : [...props.modelValue, tag.id];
      if (newValues.length > props.maxTags) {
        return;
      }
      emit("update:modelValue", newValues);
      emit("change", newValues.map((id) => categoriesStore.getTagById(id)).filter(Boolean));
    };
    const createNewTag = async () => {
      if (!searchQuery.value.trim()) return;
      try {
        const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];
        const newTag = categoriesStore.addTag({
          name: searchQuery.value.trim(),
          color: randomColor
        });
        const newValues = [...props.modelValue, newTag.id];
        emit("update:modelValue", newValues);
        emit("change", newValues.map((id) => categoriesStore.getTagById(id)).filter(Boolean));
        searchQuery.value = "";
      } catch (error) {
        console.error("Erreur création tag:", error);
      }
    };
    const handleEnter = () => {
      if (searchQuery.value && !exactMatch.value && props.allowCreate) {
        createNewTag();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}>`);
      if (_ctx.label) {
        _push(`<label class="${ssrRenderClass(labelClasses.value)}">${ssrInterpolate(_ctx.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-2">`);
      if (selectedTags.value.length > 0) {
        _push(`<div class="flex flex-wrap gap-1"><!--[-->`);
        ssrRenderList(selectedTags.value, (tag) => {
          _push(`<span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium cursor-pointer" style="${ssrRenderStyle({
            backgroundColor: `${tag.color}20`,
            color: tag.color,
            border: `1px solid ${tag.color}40`
          })}">${ssrInterpolate(tag.name)} `);
          _push(ssrRenderComponent(unref(X), { class: "h-3 w-3 hover:bg-red-500 hover:text-white rounded-full" }, null, _parent));
          _push(`</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(_sfc_main$7), {
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$5), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$f), {
                    variant: "outline",
                    class: ["w-full justify-between h-auto min-h-[2.5rem] p-2", unref(isDarkMode) ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Tag), { class: "h-4 w-4 opacity-50" }, null, _parent4, _scopeId3));
                        _push4(`<span class="text-sm text-muted-foreground"${_scopeId3}>${ssrInterpolate(selectedTags.value.length > 0 ? `${selectedTags.value.length} tag(s) sélectionné(s)` : _ctx.placeholder)}</span></div>`);
                        _push4(ssrRenderComponent(unref(ChevronDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Tag), { class: "h-4 w-4 opacity-50" }),
                            createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(selectedTags.value.length > 0 ? `${selectedTags.value.length} tag(s) sélectionné(s)` : _ctx.placeholder), 1)
                          ]),
                          createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$f), {
                      variant: "outline",
                      class: ["w-full justify-between h-auto min-h-[2.5rem] p-2", unref(isDarkMode) ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"]
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Tag), { class: "h-4 w-4 opacity-50" }),
                          createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(selectedTags.value.length > 0 ? `${selectedTags.value.length} tag(s) sélectionné(s)` : _ctx.placeholder), 1)
                        ]),
                        createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), {
              class: "w-80 p-0",
              align: "start"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass(unref(isDarkMode) ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200")}"${_scopeId2}><div class="${ssrRenderClass([unref(isDarkMode) ? "border-gray-700" : "border-gray-200", "p-2 border-b"])}"${_scopeId2}><div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Search), { class: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$g), {
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: "Rechercher ou créer un tag...",
                    class: ["pl-8", unref(isDarkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"],
                    onKeydown: handleEnter
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (searchQuery.value && !exactMatch.value && _ctx.allowCreate) {
                    _push3(ssrRenderComponent(unref(_sfc_main$f), {
                      variant: "ghost",
                      size: "sm",
                      class: "w-full mt-2 justify-start text-green-600 hover:text-green-700",
                      onClick: createNewTag
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Plus), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                          _push4(` Créer &quot;${ssrInterpolate(searchQuery.value)}&quot; `);
                        } else {
                          return [
                            createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                            createTextVNode(' Créer "' + toDisplayString(searchQuery.value) + '" ', 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="max-h-48 overflow-auto"${_scopeId2}>`);
                  if (filteredTags.value.length === 0 && !searchQuery.value) {
                    _push3(`<div class="p-4 text-center text-muted-foreground text-sm"${_scopeId2}> Aucun tag disponible </div>`);
                  } else if (filteredTags.value.length === 0 && searchQuery.value && !_ctx.allowCreate) {
                    _push3(`<div class="p-4 text-center text-muted-foreground text-sm"${_scopeId2}> Aucun tag trouvé </div>`);
                  } else {
                    _push3(`<div class="p-1"${_scopeId2}><!--[-->`);
                    ssrRenderList(filteredTags.value, (tag) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$f), {
                        key: tag.id,
                        variant: "ghost",
                        size: "sm",
                        class: ["w-full justify-start mb-1", isSelected(tag.id) ? "bg-accent" : ""],
                        onClick: ($event) => toggleTag(tag)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="w-3 h-3 rounded-full mr-2 flex-shrink-0" style="${ssrRenderStyle({ backgroundColor: tag.color })}"${_scopeId3}></span> ${ssrInterpolate(tag.name)} `);
                            if (isSelected(tag.id)) {
                              _push4(ssrRenderComponent(unref(Check), { class: "ml-auto h-4 w-4" }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          } else {
                            return [
                              createVNode("span", {
                                class: "w-3 h-3 rounded-full mr-2 flex-shrink-0",
                                style: { backgroundColor: tag.color }
                              }, null, 4),
                              createTextVNode(" " + toDisplayString(tag.name) + " ", 1),
                              isSelected(tag.id) ? (openBlock(), createBlock(unref(Check), {
                                key: 0,
                                class: "ml-auto h-4 w-4"
                              })) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: unref(isDarkMode) ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                    }, [
                      createVNode("div", {
                        class: ["p-2 border-b", unref(isDarkMode) ? "border-gray-700" : "border-gray-200"]
                      }, [
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(Search), { class: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
                          createVNode(unref(_sfc_main$g), {
                            modelValue: searchQuery.value,
                            "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                            placeholder: "Rechercher ou créer un tag...",
                            class: ["pl-8", unref(isDarkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"],
                            onKeydown: withKeys(withModifiers(handleEnter, ["prevent"]), ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "onKeydown"])
                        ]),
                        searchQuery.value && !exactMatch.value && _ctx.allowCreate ? (openBlock(), createBlock(unref(_sfc_main$f), {
                          key: 0,
                          variant: "ghost",
                          size: "sm",
                          class: "w-full mt-2 justify-start text-green-600 hover:text-green-700",
                          onClick: createNewTag
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                            createTextVNode(' Créer "' + toDisplayString(searchQuery.value) + '" ', 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ], 2),
                      createVNode("div", { class: "max-h-48 overflow-auto" }, [
                        filteredTags.value.length === 0 && !searchQuery.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "p-4 text-center text-muted-foreground text-sm"
                        }, " Aucun tag disponible ")) : filteredTags.value.length === 0 && searchQuery.value && !_ctx.allowCreate ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "p-4 text-center text-muted-foreground text-sm"
                        }, " Aucun tag trouvé ")) : (openBlock(), createBlock("div", {
                          key: 2,
                          class: "p-1"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(filteredTags.value, (tag) => {
                            return openBlock(), createBlock(unref(_sfc_main$f), {
                              key: tag.id,
                              variant: "ghost",
                              size: "sm",
                              class: ["w-full justify-start mb-1", isSelected(tag.id) ? "bg-accent" : ""],
                              onClick: ($event) => toggleTag(tag)
                            }, {
                              default: withCtx(() => [
                                createVNode("span", {
                                  class: "w-3 h-3 rounded-full mr-2 flex-shrink-0",
                                  style: { backgroundColor: tag.color }
                                }, null, 4),
                                createTextVNode(" " + toDisplayString(tag.name) + " ", 1),
                                isSelected(tag.id) ? (openBlock(), createBlock(unref(Check), {
                                  key: 0,
                                  class: "ml-auto h-4 w-4"
                                })) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["class", "onClick"]);
                          }), 128))
                        ]))
                      ])
                    ], 2)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$5), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$f), {
                    variant: "outline",
                    class: ["w-full justify-between h-auto min-h-[2.5rem] p-2", unref(isDarkMode) ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"]
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(unref(Tag), { class: "h-4 w-4 opacity-50" }),
                        createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(selectedTags.value.length > 0 ? `${selectedTags.value.length} tag(s) sélectionné(s)` : _ctx.placeholder), 1)
                      ]),
                      createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                    ]),
                    _: 1
                  }, 8, ["class"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), {
                class: "w-80 p-0",
                align: "start"
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: unref(isDarkMode) ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                  }, [
                    createVNode("div", {
                      class: ["p-2 border-b", unref(isDarkMode) ? "border-gray-700" : "border-gray-200"]
                    }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(Search), { class: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
                        createVNode(unref(_sfc_main$g), {
                          modelValue: searchQuery.value,
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          placeholder: "Rechercher ou créer un tag...",
                          class: ["pl-8", unref(isDarkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"],
                          onKeydown: withKeys(withModifiers(handleEnter, ["prevent"]), ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "onKeydown"])
                      ]),
                      searchQuery.value && !exactMatch.value && _ctx.allowCreate ? (openBlock(), createBlock(unref(_sfc_main$f), {
                        key: 0,
                        variant: "ghost",
                        size: "sm",
                        class: "w-full mt-2 justify-start text-green-600 hover:text-green-700",
                        onClick: createNewTag
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(' Créer "' + toDisplayString(searchQuery.value) + '" ', 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ], 2),
                    createVNode("div", { class: "max-h-48 overflow-auto" }, [
                      filteredTags.value.length === 0 && !searchQuery.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-4 text-center text-muted-foreground text-sm"
                      }, " Aucun tag disponible ")) : filteredTags.value.length === 0 && searchQuery.value && !_ctx.allowCreate ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "p-4 text-center text-muted-foreground text-sm"
                      }, " Aucun tag trouvé ")) : (openBlock(), createBlock("div", {
                        key: 2,
                        class: "p-1"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredTags.value, (tag) => {
                          return openBlock(), createBlock(unref(_sfc_main$f), {
                            key: tag.id,
                            variant: "ghost",
                            size: "sm",
                            class: ["w-full justify-start mb-1", isSelected(tag.id) ? "bg-accent" : ""],
                            onClick: ($event) => toggleTag(tag)
                          }, {
                            default: withCtx(() => [
                              createVNode("span", {
                                class: "w-3 h-3 rounded-full mr-2 flex-shrink-0",
                                style: { backgroundColor: tag.color }
                              }, null, 4),
                              createTextVNode(" " + toDisplayString(tag.name) + " ", 1),
                              isSelected(tag.id) ? (openBlock(), createBlock(unref(Check), {
                                key: 0,
                                class: "ml-auto h-4 w-4"
                              })) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["class", "onClick"]);
                        }), 128))
                      ]))
                    ])
                  ], 2)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (_ctx.errorMessage) {
        _push(`<div class="text-sm text-red-500 mt-1">${ssrInterpolate(_ctx.errorMessage)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/categories/TagSelect.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
      imageUrl: "",
      categoryId: void 0,
      tags: [],
      description: ""
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
          imageUrl: "",
          categoryId: void 0,
          tags: [],
          description: ""
        };
        dateString.value = "";
        removeImage();
      } catch (error) {
        console.error("Erreur lors de l'ajout du mouvement:", error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$e), mergeProps({
        open: _ctx.isOpen,
        "onUpdate:open": ($event) => _ctx.$emit("update:isOpen", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$d), {
              class: [
                "p-0 w-full sm:max-w-[500px] max-h-[90vh] overflow-y-auto",
                _ctx.isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-slate-200"
              ]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    class: [
                      "sticky top-0 z-10 p-4 sm:p-6 border-b",
                      _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                    ]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
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
                          createVNode(unref(_sfc_main$a), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$g), {
                    modelValue: unref(newMovement).name,
                    "onUpdate:modelValue": ($event) => unref(newMovement).name = $event,
                    type: "text",
                    placeholder: "Ex: Loyer, Salaire...",
                    class: [
                      _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                    ]
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1 sm:space-y-2"${_scopeId2}><label class="${ssrRenderClass(_ctx.isDarkMode ? "text-white" : "text-slate-900")}"${_scopeId2}>Montant</label><div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$g), {
                    modelValue: unref(newMovement).amount,
                    "onUpdate:modelValue": ($event) => unref(newMovement).amount = $event,
                    type: "number",
                    placeholder: "0.00",
                    class: ["pl-8", [
                      _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                    ]]
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"${_scopeId2}>€</span></div></div><div class="space-y-1 sm:space-y-2"${_scopeId2}><label class="${ssrRenderClass(_ctx.isDarkMode ? "text-white" : "text-slate-900")}"${_scopeId2}>Date</label>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$g), {
                    modelValue: unref(dateString),
                    "onUpdate:modelValue": ($event) => isRef(dateString) ? dateString.value = $event : null,
                    type: "date",
                    class: [
                      _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                    ]
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1 sm:space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    modelValue: unref(newMovement).categoryId,
                    "onUpdate:modelValue": ($event) => unref(newMovement).categoryId = $event,
                    label: "Catégorie",
                    "filter-type": unref(newMovement).type
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1 sm:space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    modelValue: unref(newMovement).tags,
                    "onUpdate:modelValue": ($event) => unref(newMovement).tags = $event,
                    label: "Tags (optionnel)",
                    "max-tags": 3
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1 sm:space-y-2"${_scopeId2}><label class="${ssrRenderClass(_ctx.isDarkMode ? "text-white" : "text-slate-900")}"${_scopeId2}>Description (optionnel)</label>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$g), {
                    modelValue: unref(newMovement).description,
                    "onUpdate:modelValue": ($event) => unref(newMovement).description = $event,
                    type: "text",
                    placeholder: "Description du mouvement...",
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
                    _push3(ssrRenderComponent(unref(_sfc_main$9), { variant: "destructive" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
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
                            createVNode(unref(_sfc_main$8), null, {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$f), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$f), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    class: [
                      "sticky bottom-0 z-10 p-4 sm:p-6 border-t",
                      _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                    ]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$f), {
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
                          createVNode(unref(_sfc_main$f), {
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
                    createVNode(unref(_sfc_main$b), {
                      class: [
                        "sticky top-0 z-10 p-4 sm:p-6 border-b",
                        _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                      ]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$a), {
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
                          createVNode(unref(_sfc_main$g), {
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
                            createVNode(unref(_sfc_main$g), {
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
                          createVNode(unref(_sfc_main$g), {
                            modelValue: unref(dateString),
                            "onUpdate:modelValue": ($event) => isRef(dateString) ? dateString.value = $event : null,
                            type: "date",
                            class: [
                              _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                            ]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                        ]),
                        createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                          createVNode(_sfc_main$4, {
                            modelValue: unref(newMovement).categoryId,
                            "onUpdate:modelValue": ($event) => unref(newMovement).categoryId = $event,
                            label: "Catégorie",
                            "filter-type": unref(newMovement).type
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "filter-type"])
                        ]),
                        createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                          createVNode(_sfc_main$3, {
                            modelValue: unref(newMovement).tags,
                            "onUpdate:modelValue": ($event) => unref(newMovement).tags = $event,
                            label: "Tags (optionnel)",
                            "max-tags": 3
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                          createVNode("label", {
                            class: _ctx.isDarkMode ? "text-white" : "text-slate-900"
                          }, "Description (optionnel)", 2),
                          createVNode(unref(_sfc_main$g), {
                            modelValue: unref(newMovement).description,
                            "onUpdate:modelValue": ($event) => unref(newMovement).description = $event,
                            type: "text",
                            placeholder: "Description du mouvement...",
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
                            createVNode(unref(_sfc_main$9), { variant: "destructive" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$8), null, {
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
                          createVNode(unref(_sfc_main$f), {
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
                          createVNode(unref(_sfc_main$f), {
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
                    createVNode(unref(_sfc_main$c), {
                      class: [
                        "sticky bottom-0 z-10 p-4 sm:p-6 border-t",
                        _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                      ]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$f), {
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
              createVNode(unref(_sfc_main$d), {
                class: [
                  "p-0 w-full sm:max-w-[500px] max-h-[90vh] overflow-y-auto",
                  _ctx.isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-slate-200"
                ]
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$b), {
                    class: [
                      "sticky top-0 z-10 p-4 sm:p-6 border-b",
                      _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                    ]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$a), {
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
                        createVNode(unref(_sfc_main$g), {
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
                          createVNode(unref(_sfc_main$g), {
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
                        createVNode(unref(_sfc_main$g), {
                          modelValue: unref(dateString),
                          "onUpdate:modelValue": ($event) => isRef(dateString) ? dateString.value = $event : null,
                          type: "date",
                          class: [
                            _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                          ]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                      ]),
                      createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                        createVNode(_sfc_main$4, {
                          modelValue: unref(newMovement).categoryId,
                          "onUpdate:modelValue": ($event) => unref(newMovement).categoryId = $event,
                          label: "Catégorie",
                          "filter-type": unref(newMovement).type
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "filter-type"])
                      ]),
                      createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                        createVNode(_sfc_main$3, {
                          modelValue: unref(newMovement).tags,
                          "onUpdate:modelValue": ($event) => unref(newMovement).tags = $event,
                          label: "Tags (optionnel)",
                          "max-tags": 3
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                        createVNode("label", {
                          class: _ctx.isDarkMode ? "text-white" : "text-slate-900"
                        }, "Description (optionnel)", 2),
                        createVNode(unref(_sfc_main$g), {
                          modelValue: unref(newMovement).description,
                          "onUpdate:modelValue": ($event) => unref(newMovement).description = $event,
                          type: "text",
                          placeholder: "Description du mouvement...",
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
                          createVNode(unref(_sfc_main$9), { variant: "destructive" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), null, {
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
                        createVNode(unref(_sfc_main$f), {
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
                        createVNode(unref(_sfc_main$f), {
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
                  createVNode(unref(_sfc_main$c), {
                    class: [
                      "sticky bottom-0 z-10 p-4 sm:p-6 border-t",
                      _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                    ]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$f), {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/add-movement-dialog/AddMovementDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
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
function useMovementFilters(movements) {
  const filters = ref({
    searchQuery: "",
    type: "all",
    categoryIds: [],
    tagIds: [],
    dateRange: {
      start: null,
      end: null
    },
    amountRange: {
      min: null,
      max: null
    },
    isRecurrent: "all"
  });
  const filteredMovements = computed(() => {
    if (!movements.value || !Array.isArray(movements.value)) {
      return [];
    }
    let result = movements.value.filter((m) => m && (m.id !== void 0 && m.id !== null));
    if (filters.value.searchQuery) {
      const query = filters.value.searchQuery.toLowerCase();
      result = result.filter(
        (movement) => {
          var _a;
          return movement.name.toLowerCase().includes(query) || ((_a = movement.description) == null ? void 0 : _a.toLowerCase().includes(query));
        }
      );
    }
    if (filters.value.type !== "all") {
      result = result.filter((movement) => movement.type === filters.value.type);
    }
    if (filters.value.categoryIds.length > 0) {
      result = result.filter(
        (movement) => movement.categoryId && filters.value.categoryIds.includes(movement.categoryId)
      );
    }
    if (filters.value.tagIds.length > 0) {
      result = result.filter(
        (movement) => {
          var _a;
          return (_a = movement.tags) == null ? void 0 : _a.some((tagId) => filters.value.tagIds.includes(tagId));
        }
      );
    }
    if (filters.value.dateRange.start || filters.value.dateRange.end) {
      result = result.filter((movement) => {
        const movementDate = movement.date instanceof Date ? movement.date : new Date(movement.date);
        if (filters.value.dateRange.start && movementDate < filters.value.dateRange.start) {
          return false;
        }
        if (filters.value.dateRange.end && movementDate > filters.value.dateRange.end) {
          return false;
        }
        return true;
      });
    }
    if (filters.value.amountRange.min !== null || filters.value.amountRange.max !== null) {
      result = result.filter((movement) => {
        const amount = Math.abs(movement.amount);
        if (filters.value.amountRange.min !== null && amount < filters.value.amountRange.min) {
          return false;
        }
        if (filters.value.amountRange.max !== null && amount > filters.value.amountRange.max) {
          return false;
        }
        return true;
      });
    }
    if (filters.value.isRecurrent !== "all") {
      const isRecurrentFilter = filters.value.isRecurrent === "yes";
      result = result.filter(
        (movement) => (movement.isRecurrent || movement.isGeneratedRecurrence) === isRecurrentFilter
      );
    }
    result.sort((a, b) => {
      const dateA = a.date instanceof Date ? a.date : new Date(a.date);
      const dateB = b.date instanceof Date ? b.date : new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    return result;
  });
  const filterStats = computed(() => {
    const movs = movements.value || [];
    const filtered = filteredMovements.value || [];
    const totalCount = movs.length;
    const filteredCount = filtered.length;
    const totalAmount = movs.reduce((sum, m) => sum + Math.abs(m.amount), 0);
    const filteredAmount = filtered.reduce((sum, m) => sum + Math.abs(m.amount), 0);
    const categories = /* @__PURE__ */ new Map();
    filtered.forEach((movement) => {
      if (movement.categoryId) {
        const current = categories.get(movement.categoryId) || 0;
        categories.set(movement.categoryId, current + 1);
      }
    });
    const tags = /* @__PURE__ */ new Map();
    filtered.forEach((movement) => {
      var _a;
      (_a = movement.tags) == null ? void 0 : _a.forEach((tagId) => {
        const current = tags.get(tagId) || 0;
        tags.set(tagId, current + 1);
      });
    });
    return {
      totalCount,
      filteredCount,
      totalAmount,
      filteredAmount,
      categories,
      tags
    };
  });
  const searchSuggestions = computed(() => {
    if (!filters.value.searchQuery || filters.value.searchQuery.length < 2) {
      return [];
    }
    const movs = movements.value || [];
    const query = filters.value.searchQuery.toLowerCase();
    const suggestions = /* @__PURE__ */ new Set();
    movs.forEach((movement) => {
      var _a;
      if (movement.name.toLowerCase().includes(query)) {
        suggestions.add(movement.name);
      }
      if ((_a = movement.description) == null ? void 0 : _a.toLowerCase().includes(query)) {
        suggestions.add(movement.description);
      }
    });
    return Array.from(suggestions).slice(0, 5);
  });
  const quickFilters = {
    thisMonth: () => {
      const now = /* @__PURE__ */ new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      setDateRange(start, end);
    },
    lastMonth: () => {
      const now = /* @__PURE__ */ new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      setDateRange(start, end);
    },
    thisYear: () => {
      const now = /* @__PURE__ */ new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31);
      setDateRange(start, end);
    },
    lastWeek: () => {
      const now = /* @__PURE__ */ new Date();
      const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
      const end = now;
      setDateRange(start, end);
    },
    expensesOnly: () => {
      filters.value.type = "expense";
    },
    incomeOnly: () => {
      filters.value.type = "income";
    },
    recurrentOnly: () => {
      filters.value.isRecurrent = "yes";
    },
    highAmounts: () => {
      filters.value.amountRange.min = 100;
    }
  };
  const setSearchQuery = (query) => {
    filters.value.searchQuery = query;
  };
  const setType = (type) => {
    filters.value.type = type;
  };
  const setCategoryIds = (categoryIds) => {
    filters.value.categoryIds = categoryIds;
  };
  const setTagIds = (tagIds) => {
    filters.value.tagIds = tagIds;
  };
  const setDateRange = (start, end) => {
    filters.value.dateRange.start = start;
    filters.value.dateRange.end = end;
  };
  const setAmountRange = (min, max) => {
    filters.value.amountRange.min = min;
    filters.value.amountRange.max = max;
  };
  const setRecurrentFilter = (isRecurrent) => {
    filters.value.isRecurrent = isRecurrent;
  };
  const clearAllFilters = () => {
    filters.value = {
      searchQuery: "",
      type: "all",
      categoryIds: [],
      tagIds: [],
      dateRange: {
        start: null,
        end: null
      },
      amountRange: {
        min: null,
        max: null
      },
      isRecurrent: "all"
    };
  };
  const clearFilter = (filterType) => {
    switch (filterType) {
      case "searchQuery":
        filters.value.searchQuery = "";
        break;
      case "type":
        filters.value.type = "all";
        break;
      case "categoryIds":
        filters.value.categoryIds = [];
        break;
      case "tagIds":
        filters.value.tagIds = [];
        break;
      case "dateRange":
        filters.value.dateRange = { start: null, end: null };
        break;
      case "amountRange":
        filters.value.amountRange = { min: null, max: null };
        break;
      case "isRecurrent":
        filters.value.isRecurrent = "all";
        break;
    }
  };
  const hasActiveFilters = computed(() => {
    return filters.value.searchQuery !== "" || filters.value.type !== "all" || filters.value.categoryIds.length > 0 || filters.value.tagIds.length > 0 || filters.value.dateRange.start !== null || filters.value.dateRange.end !== null || filters.value.amountRange.min !== null || filters.value.amountRange.max !== null || filters.value.isRecurrent !== "all";
  });
  const saveFiltersToStorage = () => {
  };
  const loadFiltersFromStorage = () => {
  };
  watch(filters, () => {
  }, { deep: true });
  return {
    // État
    filters: readonly(filters),
    filteredMovements,
    filterStats,
    searchSuggestions,
    hasActiveFilters,
    // Actions
    setSearchQuery,
    setType,
    setCategoryIds,
    setTagIds,
    setDateRange,
    setAmountRange,
    setRecurrentFilter,
    clearAllFilters,
    clearFilter,
    // Filtres rapides
    quickFilters,
    // Persistance
    saveFiltersToStorage,
    loadFiltersFromStorage
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EditMovementDialog",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    isDarkMode: { type: Boolean },
    movement: {}
  },
  emits: ["update:isOpen", "saveMovement", "deleteMovement"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const fileInput = ref(null);
    const previewUrl = ref("");
    const imageFileName = ref("");
    const imageFile = ref(null);
    const dateString = ref("");
    const editedMovement = ref({
      id: 0,
      name: "",
      amount: 0,
      date: /* @__PURE__ */ new Date(),
      type: "expense",
      isRecurrent: false,
      imageUrl: ""
    });
    watch(() => props.movement, (newMovement) => {
      if (newMovement) {
        editedMovement.value = { ...newMovement };
        const date = new Date(newMovement.date);
        if (!isNaN(date.getTime())) {
          dateString.value = date.toISOString().split("T")[0];
        }
        previewUrl.value = "";
        imageFileName.value = "";
        imageFile.value = null;
      }
    }, { immediate: true });
    watch(dateString, (newValue) => {
      if (newValue) {
        editedMovement.value.date = new Date(newValue);
      }
    });
    const handleImageUpload = (event) => {
      const input = event.target;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        imageFile.value = file;
        imageFileName.value = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            previewUrl.value = e.target.result;
            editedMovement.value.imageUrl = "";
          }
        };
        reader.readAsDataURL(file);
      }
    };
    const removeImage = () => {
      previewUrl.value = "";
      imageFileName.value = "";
      imageFile.value = null;
      if (fileInput.value) {
        fileInput.value.value = "";
      }
    };
    const removeCurrentImage = () => {
      editedMovement.value.imageUrl = "";
    };
    const handleSaveMovement = () => {
      if (!editedMovement.value.name || !editedMovement.value.amount || !editedMovement.value.date) {
        return;
      }
      const updatedMovement = { ...editedMovement.value };
      if (previewUrl.value && previewUrl.value.length > 0) {
        updatedMovement.imageUrl = previewUrl.value;
        if (updatedMovement.imageUrl.startsWith("blob:")) {
          console.error("URL Blob détectée, conversion en base64 nécessaire");
        }
      }
      emit("saveMovement", updatedMovement);
      removeImage();
    };
    const handleDeleteMovement = () => {
      if (props.movement) {
        emit("deleteMovement", props.movement.id);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$e), mergeProps({
        open: _ctx.isOpen,
        "onUpdate:open": ($event) => _ctx.$emit("update:isOpen", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$d), {
              class: [
                "p-0 w-full sm:max-w-[500px] max-h-[90vh] overflow-y-auto",
                _ctx.isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-slate-200"
              ]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    class: [
                      "sticky top-0 z-10 p-4 sm:p-6 border-b",
                      _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                    ]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          class: [
                            "text-xl sm:text-2xl font-semibold",
                            _ctx.isDarkMode ? "text-white" : "text-slate-900"
                          ]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Modifier un mouvement `);
                            } else {
                              return [
                                createTextVNode(" Modifier un mouvement ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$a), {
                            class: [
                              "text-xl sm:text-2xl font-semibold",
                              _ctx.isDarkMode ? "text-white" : "text-slate-900"
                            ]
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Modifier un mouvement ")
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
                    unref(editedMovement).type === "expense" ? "bg-red-500 hover:bg-red-600 text-white" : "border bg-slate-100"
                  ])}"${_scopeId2}> Dépense </button><button type="button" class="${ssrRenderClass([
                    "w-full px-3 py-2 rounded-md text-sm sm:text-base",
                    unref(editedMovement).type === "income" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "border bg-slate-100"
                  ])}"${_scopeId2}> Revenu </button></div></div><div class="space-y-3 sm:space-y-4"${_scopeId2}><div class="space-y-1 sm:space-y-2"${_scopeId2}><label class="${ssrRenderClass(_ctx.isDarkMode ? "text-white" : "text-slate-900")}"${_scopeId2}>Nom</label>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$g), {
                    modelValue: unref(editedMovement).name,
                    "onUpdate:modelValue": ($event) => unref(editedMovement).name = $event,
                    type: "text",
                    placeholder: "Ex: Loyer, Salaire...",
                    class: [
                      _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                    ]
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1 sm:space-y-2"${_scopeId2}><label class="${ssrRenderClass(_ctx.isDarkMode ? "text-white" : "text-slate-900")}"${_scopeId2}>Montant</label><div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$g), {
                    modelValue: unref(editedMovement).amount,
                    "onUpdate:modelValue": ($event) => unref(editedMovement).amount = $event,
                    type: "number",
                    placeholder: "0.00",
                    class: ["pl-8", [
                      _ctx.isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-slate-200"
                    ]]
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"${_scopeId2}>€</span></div></div><div class="space-y-1 sm:space-y-2"${_scopeId2}><label class="${ssrRenderClass(_ctx.isDarkMode ? "text-white" : "text-slate-900")}"${_scopeId2}>Date</label>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$g), {
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
                  ])}"${_scopeId2}><span${_scopeId2}>Choisir une image</span></button><span class="${ssrRenderClass([_ctx.isDarkMode ? "text-gray-400" : "text-gray-500", "text-sm"])}"${_scopeId2}>${ssrInterpolate(unref(imageFileName) || "Aucun fichier sélectionné")}</span></div>`);
                  if (unref(previewUrl)) {
                    _push3(`<div class="mt-2 relative"${_scopeId2}><img${ssrRenderAttr("src", unref(previewUrl))} alt="Prévisualisation" class="h-24 w-auto object-cover rounded-md"${_scopeId2}><button type="button" class="absolute top-1 right-1 bg-red-500 text-white rounded-full"${_scopeId2}><span class="items-center justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(CircleX), null, null, _parent3, _scopeId2));
                    _push3(`</span></button></div>`);
                  } else if (unref(editedMovement).imageUrl && unref(editedMovement).imageUrl.length > 0) {
                    _push3(`<div class="mt-2 relative"${_scopeId2}><img${ssrRenderAttr("src", unref(editedMovement).imageUrl)} alt="Image actuelle" class="h-24 w-auto object-cover rounded-md"${_scopeId2}><button type="button" class="absolute top-1 right-1 bg-red-500 text-white rounded-full"${_scopeId2}><span class="items-center justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(CircleX), null, null, _parent3, _scopeId2));
                    _push3(`</span></button></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="space-y-2 sm:space-y-3"${_scopeId2}><label class="${ssrRenderClass([
                    "text-sm font-medium",
                    _ctx.isDarkMode ? "text-white" : "text-slate-900"
                  ])}"${_scopeId2}> Type de récurrence </label><div class="grid grid-cols-1 gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$f), {
                    variant: "outline",
                    class: [
                      "justify-start py-1 sm:py-2 text-sm sm:text-base",
                      !unref(editedMovement).isRecurrent ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                    ],
                    onClick: ($event) => unref(editedMovement).isRecurrent = false
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
                  _push3(ssrRenderComponent(unref(_sfc_main$f), {
                    variant: "outline",
                    class: [
                      "justify-start py-1 sm:py-2 text-sm sm:text-base",
                      unref(editedMovement).isRecurrent ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                    ],
                    onClick: ($event) => unref(editedMovement).isRecurrent = true
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
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    class: [
                      "sticky bottom-0 z-10 p-4 sm:p-6 border-t flex space-x-2",
                      _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                    ]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$f), {
                          class: "w-1/2 bg-red-500 hover:bg-red-600 text-white",
                          onClick: handleDeleteMovement
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Supprimer `);
                            } else {
                              return [
                                createTextVNode(" Supprimer ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$f), {
                          class: "w-1/2 bg-emerald-500 hover:bg-emerald-600 text-white",
                          onClick: handleSaveMovement
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Enregistrer `);
                            } else {
                              return [
                                createTextVNode(" Enregistrer ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$f), {
                            class: "w-1/2 bg-red-500 hover:bg-red-600 text-white",
                            onClick: handleDeleteMovement
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Supprimer ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$f), {
                            class: "w-1/2 bg-emerald-500 hover:bg-emerald-600 text-white",
                            onClick: handleSaveMovement
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Enregistrer ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$b), {
                      class: [
                        "sticky top-0 z-10 p-4 sm:p-6 border-b",
                        _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                      ]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$a), {
                          class: [
                            "text-xl sm:text-2xl font-semibold",
                            _ctx.isDarkMode ? "text-white" : "text-slate-900"
                          ]
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Modifier un mouvement ")
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
                              unref(editedMovement).type === "expense" ? "bg-red-500 hover:bg-red-600 text-white" : "border bg-slate-100"
                            ],
                            onClick: ($event) => unref(editedMovement).type = "expense"
                          }, " Dépense ", 10, ["onClick"]),
                          createVNode("button", {
                            type: "button",
                            class: [
                              "w-full px-3 py-2 rounded-md text-sm sm:text-base",
                              unref(editedMovement).type === "income" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "border bg-slate-100"
                            ],
                            onClick: ($event) => unref(editedMovement).type = "income"
                          }, " Revenu ", 10, ["onClick"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-3 sm:space-y-4" }, [
                        createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                          createVNode("label", {
                            class: _ctx.isDarkMode ? "text-white" : "text-slate-900"
                          }, "Nom", 2),
                          createVNode(unref(_sfc_main$g), {
                            modelValue: unref(editedMovement).name,
                            "onUpdate:modelValue": ($event) => unref(editedMovement).name = $event,
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
                            createVNode(unref(_sfc_main$g), {
                              modelValue: unref(editedMovement).amount,
                              "onUpdate:modelValue": ($event) => unref(editedMovement).amount = $event,
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
                          createVNode(unref(_sfc_main$g), {
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
                            }, toDisplayString(unref(imageFileName) || "Aucun fichier sélectionné"), 3)
                          ]),
                          unref(previewUrl) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 relative"
                          }, [
                            createVNode("img", {
                              src: unref(previewUrl),
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
                          ])) : unref(editedMovement).imageUrl && unref(editedMovement).imageUrl.length > 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mt-2 relative"
                          }, [
                            createVNode("img", {
                              src: unref(editedMovement).imageUrl,
                              alt: "Image actuelle",
                              class: "h-24 w-auto object-cover rounded-md"
                            }, null, 8, ["src"]),
                            createVNode("button", {
                              type: "button",
                              onClick: removeCurrentImage,
                              class: "absolute top-1 right-1 bg-red-500 text-white rounded-full"
                            }, [
                              createVNode("span", { class: "items-center justify-center" }, [
                                createVNode(unref(CircleX))
                              ])
                            ])
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
                          createVNode(unref(_sfc_main$f), {
                            variant: "outline",
                            class: [
                              "justify-start py-1 sm:py-2 text-sm sm:text-base",
                              !unref(editedMovement).isRecurrent ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                            ],
                            onClick: ($event) => unref(editedMovement).isRecurrent = false
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "mr-2" }, "🔄"),
                              createTextVNode(" Pas de récurrence ")
                            ]),
                            _: 1
                          }, 8, ["class", "onClick"]),
                          createVNode(unref(_sfc_main$f), {
                            variant: "outline",
                            class: [
                              "justify-start py-1 sm:py-2 text-sm sm:text-base",
                              unref(editedMovement).isRecurrent ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                            ],
                            onClick: ($event) => unref(editedMovement).isRecurrent = true
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
                    createVNode(unref(_sfc_main$c), {
                      class: [
                        "sticky bottom-0 z-10 p-4 sm:p-6 border-t flex space-x-2",
                        _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                      ]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$f), {
                          class: "w-1/2 bg-red-500 hover:bg-red-600 text-white",
                          onClick: handleDeleteMovement
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Supprimer ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$f), {
                          class: "w-1/2 bg-emerald-500 hover:bg-emerald-600 text-white",
                          onClick: handleSaveMovement
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Enregistrer ")
                          ]),
                          _: 1
                        })
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
              createVNode(unref(_sfc_main$d), {
                class: [
                  "p-0 w-full sm:max-w-[500px] max-h-[90vh] overflow-y-auto",
                  _ctx.isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-slate-200"
                ]
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$b), {
                    class: [
                      "sticky top-0 z-10 p-4 sm:p-6 border-b",
                      _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                    ]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$a), {
                        class: [
                          "text-xl sm:text-2xl font-semibold",
                          _ctx.isDarkMode ? "text-white" : "text-slate-900"
                        ]
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Modifier un mouvement ")
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
                            unref(editedMovement).type === "expense" ? "bg-red-500 hover:bg-red-600 text-white" : "border bg-slate-100"
                          ],
                          onClick: ($event) => unref(editedMovement).type = "expense"
                        }, " Dépense ", 10, ["onClick"]),
                        createVNode("button", {
                          type: "button",
                          class: [
                            "w-full px-3 py-2 rounded-md text-sm sm:text-base",
                            unref(editedMovement).type === "income" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "border bg-slate-100"
                          ],
                          onClick: ($event) => unref(editedMovement).type = "income"
                        }, " Revenu ", 10, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-3 sm:space-y-4" }, [
                      createVNode("div", { class: "space-y-1 sm:space-y-2" }, [
                        createVNode("label", {
                          class: _ctx.isDarkMode ? "text-white" : "text-slate-900"
                        }, "Nom", 2),
                        createVNode(unref(_sfc_main$g), {
                          modelValue: unref(editedMovement).name,
                          "onUpdate:modelValue": ($event) => unref(editedMovement).name = $event,
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
                          createVNode(unref(_sfc_main$g), {
                            modelValue: unref(editedMovement).amount,
                            "onUpdate:modelValue": ($event) => unref(editedMovement).amount = $event,
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
                        createVNode(unref(_sfc_main$g), {
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
                          }, toDisplayString(unref(imageFileName) || "Aucun fichier sélectionné"), 3)
                        ]),
                        unref(previewUrl) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 relative"
                        }, [
                          createVNode("img", {
                            src: unref(previewUrl),
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
                        ])) : unref(editedMovement).imageUrl && unref(editedMovement).imageUrl.length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-2 relative"
                        }, [
                          createVNode("img", {
                            src: unref(editedMovement).imageUrl,
                            alt: "Image actuelle",
                            class: "h-24 w-auto object-cover rounded-md"
                          }, null, 8, ["src"]),
                          createVNode("button", {
                            type: "button",
                            onClick: removeCurrentImage,
                            class: "absolute top-1 right-1 bg-red-500 text-white rounded-full"
                          }, [
                            createVNode("span", { class: "items-center justify-center" }, [
                              createVNode(unref(CircleX))
                            ])
                          ])
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
                        createVNode(unref(_sfc_main$f), {
                          variant: "outline",
                          class: [
                            "justify-start py-1 sm:py-2 text-sm sm:text-base",
                            !unref(editedMovement).isRecurrent ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                          ],
                          onClick: ($event) => unref(editedMovement).isRecurrent = false
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "mr-2" }, "🔄"),
                            createTextVNode(" Pas de récurrence ")
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"]),
                        createVNode(unref(_sfc_main$f), {
                          variant: "outline",
                          class: [
                            "justify-start py-1 sm:py-2 text-sm sm:text-base",
                            unref(editedMovement).isRecurrent ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                          ],
                          onClick: ($event) => unref(editedMovement).isRecurrent = true
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
                  createVNode(unref(_sfc_main$c), {
                    class: [
                      "sticky bottom-0 z-10 p-4 sm:p-6 border-t flex space-x-2",
                      _ctx.isDarkMode ? "border-gray-800 bg-gray-900" : "border-slate-200 bg-white"
                    ]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$f), {
                        class: "w-1/2 bg-red-500 hover:bg-red-600 text-white",
                        onClick: handleDeleteMovement
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Supprimer ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$f), {
                        class: "w-1/2 bg-emerald-500 hover:bg-emerald-600 text-white",
                        onClick: handleSaveMovement
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Enregistrer ")
                        ]),
                        _: 1
                      })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/edit-movement-dialog/EditMovementDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const financeData = useFinance();
    const settingsStore = useSettingsStore();
    const uiStore = useUIStore();
    useCategoriesStore();
    const { isDarkMode } = storeToRefs(settingsStore);
    const { showAddDialog, selectedDate, currentMonth } = storeToRefs(uiStore);
    const movementFilters = useMovementFilters(financeData.movements);
    const previewImageUrl = ref("");
    const showEditDialog = ref(false);
    const selectedMovement = ref(null);
    computed(() => {
      try {
        if (!movementFilters || !movementFilters.filteredMovements) {
          return [];
        }
        const filtered = movementFilters.filteredMovements;
        if (Array.isArray(filtered)) {
          return filtered.filter((m) => m && m.id !== void 0 && m.id !== null);
        }
        if (filtered.value && Array.isArray(filtered.value)) {
          return filtered.value.filter((m) => m && m.id !== void 0 && m.id !== null);
        }
        return [];
      } catch (error) {
        console.error("Erreur filtrage mouvements:", error);
        return [];
      }
    });
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
    const handleSaveMovement = (updatedMovement) => {
      if (financeData.updateMovement(updatedMovement)) {
        showEditDialog.value = false;
        selectedMovement.value = null;
      }
    };
    const handleDeleteMovement = (id) => {
      financeData.deleteMovement(id);
      showEditDialog.value = false;
      selectedMovement.value = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_AddMovementDialog = _sfc_main$2;
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
      _push(`</div><div class="fixed bottom-6 right-6 flex flex-col gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/stats",
        class: "rounded-full w-12 h-12 shadow-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(BarChart3), { class: "h-6 w-6" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(BarChart3), { class: "h-6 w-6" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="rounded-full w-12 h-12 shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105">`);
      _push(ssrRenderComponent(unref(Plus), { class: "h-6 w-6" }, null, _parent));
      _push(`</button></div>`);
      _push(ssrRenderComponent(_component_AddMovementDialog, {
        "is-open": unref(showAddDialog),
        "is-dark-mode": unref(isDarkMode),
        "onUpdate:isOpen": unref(uiStore).closeAddDialog,
        onAddMovement: handleAddMovement
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$e), {
        open: !!unref(previewImageUrl) && unref(previewImageUrl).length > 0,
        "onUpdate:open": ($event) => previewImageUrl.value = ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$d), {
              class: [unref(isDarkMode) ? "dark bg-gray-900" : "bg-white", "max-w-2xl"]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$b), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          class: unref(isDarkMode) ? "text-white" : "text-gray-900"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Aperçu de l&#39;image`);
                            } else {
                              return [
                                createTextVNode("Aperçu de l'image")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$a), {
                            class: unref(isDarkMode) ? "text-white" : "text-gray-900"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Aperçu de l'image")
                            ]),
                            _: 1
                          }, 8, ["class"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex justify-center"${_scopeId2}><img${ssrRenderAttr("src", unref(previewImageUrl))} alt="Aperçu" class="max-h-80 max-w-full object-contain"${_scopeId2}></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$f), {
                          onClick: ($event) => previewImageUrl.value = ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Fermer`);
                            } else {
                              return [
                                createTextVNode("Fermer")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$f), {
                            onClick: ($event) => previewImageUrl.value = ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Fermer")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$b), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$a), {
                          class: unref(isDarkMode) ? "text-white" : "text-gray-900"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Aperçu de l'image")
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode("img", {
                        src: unref(previewImageUrl),
                        alt: "Aperçu",
                        class: "max-h-80 max-w-full object-contain"
                      }, null, 8, ["src"])
                    ]),
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$f), {
                          onClick: ($event) => previewImageUrl.value = ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Fermer")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$d), {
                class: [unref(isDarkMode) ? "dark bg-gray-900" : "bg-white", "max-w-2xl"]
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$b), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$a), {
                        class: unref(isDarkMode) ? "text-white" : "text-gray-900"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Aperçu de l'image")
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("img", {
                      src: unref(previewImageUrl),
                      alt: "Aperçu",
                      class: "max-h-80 max-w-full object-contain"
                    }, null, 8, ["src"])
                  ]),
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$f), {
                        onClick: ($event) => previewImageUrl.value = ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Fermer")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["class"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        "is-open": unref(showEditDialog),
        "is-dark-mode": unref(isDarkMode),
        movement: unref(selectedMovement),
        "onUpdate:isOpen": ($event) => showEditDialog.value = $event,
        onSaveMovement: handleSaveMovement,
        onDeleteMovement: handleDeleteMovement
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
//# sourceMappingURL=index-IP-gGsif.js.map
