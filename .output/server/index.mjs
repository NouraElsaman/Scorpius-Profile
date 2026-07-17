globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/aichat-project-CkqfGTwP.png": {
		"type": "image/png",
		"etag": "\"36d7f-Rw7zA0zEOHYSi7iGxNZ63zEMURs\"",
		"mtime": "2026-07-17T06:53:27.677Z",
		"size": 224639,
		"path": "../public/assets/aichat-project-CkqfGTwP.png"
	},
	"/assets/aichat-skills-D1hBILt4.png": {
		"type": "image/png",
		"etag": "\"2a338-gooBELESHyl6esNG00BUAORLQY8\"",
		"mtime": "2026-07-17T06:53:27.677Z",
		"size": 172856,
		"path": "../public/assets/aichat-skills-D1hBILt4.png"
	},
	"/assets/aichat-contact-mzc8yEXo.png": {
		"type": "image/png",
		"etag": "\"44c42-kA471K/WLBVcZJDzzm3tX2Sza14\"",
		"mtime": "2026-07-17T06:53:27.677Z",
		"size": 281666,
		"path": "../public/assets/aichat-contact-mzc8yEXo.png"
	},
	"/assets/career-intelligence-hero-abDxqXXW.png": {
		"type": "image/png",
		"etag": "\"3febf-iQAoOPcRzLvrYjhZd5mGnDUmfkw\"",
		"mtime": "2026-07-17T06:53:27.677Z",
		"size": 261823,
		"path": "../public/assets/career-intelligence-hero-abDxqXXW.png"
	},
	"/assets/index-BowScPCL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54ad6-dV39+ImEzjo9KDKDaH/oLDcWClE\"",
		"mtime": "2026-07-17T06:53:27.677Z",
		"size": 346838,
		"path": "../public/assets/index-BowScPCL.js"
	},
	"/assets/lead-generation-pipeline-hero-gCBq1zCM.png": {
		"type": "image/png",
		"etag": "\"30406-b3YRkngLxQaH/ohpx+Qy0ER2fCs\"",
		"mtime": "2026-07-17T06:53:27.686Z",
		"size": 197638,
		"path": "../public/assets/lead-generation-pipeline-hero-gCBq1zCM.png"
	},
	"/assets/madarekiq-arabic-hero-BxNgphZB.png": {
		"type": "image/png",
		"etag": "\"60c83-N3fYn9guOBUF29+c3u/gDk3gOV4\"",
		"mtime": "2026-07-17T06:53:27.686Z",
		"size": 396419,
		"path": "../public/assets/madarekiq-arabic-hero-BxNgphZB.png"
	},
	"/assets/madarekiq-cta-rj70fAUd.png": {
		"type": "image/png",
		"etag": "\"4120a-dkfxsz7++qJZdB+cMaMxoDRxoto\"",
		"mtime": "2026-07-17T06:53:27.686Z",
		"size": 266762,
		"path": "../public/assets/madarekiq-cta-rj70fAUd.png"
	},
	"/assets/madarekiq-how-it-works-XgHDmTXI.png": {
		"type": "image/png",
		"etag": "\"3394c-KmhzJov5X1gHp0G/IutaCWUAbhE\"",
		"mtime": "2026-07-17T06:53:27.686Z",
		"size": 211276,
		"path": "../public/assets/madarekiq-how-it-works-XgHDmTXI.png"
	},
	"/assets/project-elraed-C4cYYf8h.jpg": {
		"type": "image/jpeg",
		"etag": "\"a35a-JCuMYBnSf6aru1Ya0GwXWqIWv3U\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 41818,
		"path": "../public/assets/project-elraed-C4cYYf8h.jpg"
	},
	"/assets/project-manara-iBwrXGOq.jpg": {
		"type": "image/jpeg",
		"etag": "\"7037-/g0EgooFkZ9I8AuSlzGyf6rx0HY\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 28727,
		"path": "../public/assets/project-manara-iBwrXGOq.jpg"
	},
	"/assets/project-bayyinah-CSvByDjJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"b0c7-xM1wqwu9qdxjfzy9hKzUOXU2yos\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 45255,
		"path": "../public/assets/project-bayyinah-CSvByDjJ.jpg"
	},
	"/assets/content-strategy-engine-hero-DAUrf6vn.png": {
		"type": "image/png",
		"etag": "\"a0c5c-r5YrCpFnT2/+ttxRXvdERCFdA+M\"",
		"mtime": "2026-07-17T06:53:27.677Z",
		"size": 658524,
		"path": "../public/assets/content-strategy-engine-hero-DAUrf6vn.png"
	},
	"/assets/routes-bYWZtFJk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"43e62-GUIXtuCO0kO9EmBEUk2dvIAmpwY\"",
		"mtime": "2026-07-17T06:53:27.677Z",
		"size": 278114,
		"path": "../public/assets/routes-bYWZtFJk.js"
	},
	"/assets/madarekiq-hero-BR41kRDd.png": {
		"type": "image/png",
		"etag": "\"8060f-acoJVo8yX4BQwv/I/tikZj8jcTw\"",
		"mtime": "2026-07-17T06:53:27.686Z",
		"size": 525839,
		"path": "../public/assets/madarekiq-hero-BR41kRDd.png"
	},
	"/assets/metro-masr-hero-slKJKF30.png": {
		"type": "image/png",
		"etag": "\"b759f-knHZGl3MvY9uPQW2Def18zlQ5Ok\"",
		"mtime": "2026-07-17T06:53:27.686Z",
		"size": 751007,
		"path": "../public/assets/metro-masr-hero-slKJKF30.png"
	},
	"/assets/islamy-screens-BGwSIZE0.png": {
		"type": "image/png",
		"etag": "\"f6625-AB3ze5JgQWV8rtfr59nK89hTm6A\"",
		"mtime": "2026-07-17T06:53:27.686Z",
		"size": 1009189,
		"path": "../public/assets/islamy-screens-BGwSIZE0.png"
	},
	"/assets/madarekiq-assessments-CRRJ-h8Y.png": {
		"type": "image/png",
		"etag": "\"fcfeb-2Y2ZAEgyvxMN1aSwKczKCTA+nwg\"",
		"mtime": "2026-07-17T06:53:27.686Z",
		"size": 1036267,
		"path": "../public/assets/madarekiq-assessments-CRRJ-h8Y.png"
	},
	"/assets/restro360-workflow-PMxCFPYs.png": {
		"type": "image/png",
		"etag": "\"12885a-Hl28Zq6t/VC8K4Jz3Fvc4X2+c0g\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 1214554,
		"path": "../public/assets/restro360-workflow-PMxCFPYs.png"
	},
	"/assets/sales-intelligence-hero-CfvKUp3Q.jpeg": {
		"type": "image/jpeg",
		"etag": "\"2c849-7oS8XylevjbrV8FsTH81mnDTlB8\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 182345,
		"path": "../public/assets/sales-intelligence-hero-CfvKUp3Q.jpeg"
	},
	"/assets/scorpius-mark-DlPycDp0.png": {
		"type": "image/png",
		"etag": "\"22e87-hDBAb/yq0EkqnOPu/iK1Hb+5Qb8\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 142983,
		"path": "../public/assets/scorpius-mark-DlPycDp0.png"
	},
	"/assets/scorpius-mark-light-ngVCergy.png": {
		"type": "image/png",
		"etag": "\"11c2d-GXReRJUI0LU29YIbkhYERMdXyAc\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 72749,
		"path": "../public/assets/scorpius-mark-light-ngVCergy.png"
	},
	"/assets/scorpius-wordmark-light-C6_Gcm0d.png": {
		"type": "image/png",
		"etag": "\"ccf7-8K48rLd04TwMCU+yUcTs67P1ncg\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 52471,
		"path": "../public/assets/scorpius-wordmark-light-C6_Gcm0d.png"
	},
	"/assets/scorpius-wordmark-Be8ecCVQ.png": {
		"type": "image/png",
		"etag": "\"18a60-Q0hsBi2lYuACmAY41GQEWxr5jKE\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 100960,
		"path": "../public/assets/scorpius-wordmark-Be8ecCVQ.png"
	},
	"/assets/styles-hhUN-w1g.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"160bc-jJLge7psSnNXWGKDYICnXoQeIJc\"",
		"mtime": "2026-07-17T06:53:27.709Z",
		"size": 90300,
		"path": "../public/assets/styles-hhUN-w1g.css"
	},
	"/assets/whatsapp-sales-agent-hero-C9-wf7PJ.jpeg": {
		"type": "image/jpeg",
		"etag": "\"19a3a-AXATCRheVHRnvtmpzGDaEJFPUzo\"",
		"mtime": "2026-07-17T06:53:27.710Z",
		"size": 105018,
		"path": "../public/assets/whatsapp-sales-agent-hero-C9-wf7PJ.jpeg"
	},
	"/assets/nasm-Screenshot_1615-CRnfk0b7.png": {
		"type": "image/png",
		"etag": "\"22933a-Ru8W3V6qPnKA1nejqUhzIBpZb8A\"",
		"mtime": "2026-07-17T06:53:27.696Z",
		"size": 2265914,
		"path": "../public/assets/nasm-Screenshot_1615-CRnfk0b7.png"
	},
	"/assets/nasm-Screenshot_1621-Dwd2fn_j.png": {
		"type": "image/png",
		"etag": "\"20310c-HwCS1sifdAfoLcbk9x0YvUlEbzA\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 2109708,
		"path": "../public/assets/nasm-Screenshot_1621-Dwd2fn_j.png"
	},
	"/assets/nasm-Screenshot_1614-C9B3_my7.png": {
		"type": "image/png",
		"etag": "\"2b7e62-kGfFDvnuZIkOetiyMO9npXIFPKo\"",
		"mtime": "2026-07-17T06:53:27.693Z",
		"size": 2850402,
		"path": "../public/assets/nasm-Screenshot_1614-C9B3_my7.png"
	},
	"/assets/nasm-Screenshot_1617-DRkv5kZK.png": {
		"type": "image/png",
		"etag": "\"281154-xfNQYVcLBCmK5uMvnFY0wuuL5FM\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 2625876,
		"path": "../public/assets/nasm-Screenshot_1617-DRkv5kZK.png"
	},
	"/assets/nasm-Screenshot_1620-D6o_CJSB.png": {
		"type": "image/png",
		"etag": "\"2b638c-hjc2rRpci6olBp1DBNyzcTpC7VU\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 2843532,
		"path": "../public/assets/nasm-Screenshot_1620-D6o_CJSB.png"
	},
	"/assets/nasm-Screenshot_1619-CPBtjUfQ.png": {
		"type": "image/png",
		"etag": "\"2b39dc-ObF9hb4xDMHteBM36RXLeYx3MC4\"",
		"mtime": "2026-07-17T06:53:27.698Z",
		"size": 2832860,
		"path": "../public/assets/nasm-Screenshot_1619-CPBtjUfQ.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_99FrOz = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_99FrOz
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
