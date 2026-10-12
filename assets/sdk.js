var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var WorkBuddyCloud = (() => {
  var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t2, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H;
  var ne = Object.defineProperty;
  var Et = Object.getOwnPropertyDescriptor;
  var xt = Object.getOwnPropertyNames;
  var kt = Object.prototype.hasOwnProperty;
  var a = (r, e) => ne(r, "name", { value: e, configurable: true });
  var vt = (r, e) => {
    for (var t in e) ne(r, t, { get: e[t], enumerable: true });
  }, Pt = (r, e, t, s) => {
    if (e && typeof e == "object" || typeof e == "function") for (let n of xt(e)) !kt.call(r, n) && n !== t && ne(r, n, { get: () => e[n], enumerable: !(s = Et(e, n)) || s.enumerable });
    return r;
  };
  var _t = (r) => Pt(ne({}, "__esModule", { value: true }), r);
  var Qt = {};
  vt(Qt, { AuthModule: () => D, CLOUD_MODULE_PATHS: () => A, CLOUD_PATH_PREFIX: () => I, CloudOpenAIError: () => x, CloudStoragePathError: () => b, DEFAULT_SIGNED_URL_TTL_SECONDS: () => pe, LlmModule: () => F, MAX_SIGNED_URL_TTL_SECONDS: () => me, PUBLISHABLE_KEY_HEADER: () => ge, RUNTIME_STORAGE_BUCKET: () => q, WorkBuddyCloudClient: () => re, WorkBuddyCloudConfigError: () => _, WorkBuddyDatabaseModule: () => G, WorkBuddyStorageBucket: () => H, WorkBuddyStorageDownload: () => ee, WorkBuddyStorageModule: () => te, anonymousTokenProvider: () => ie, createMemoryStorage: () => we, createWorkBuddyCloud: () => wt, getModelCapability: () => Pe, getModelDisplayName: () => ve, shouldClearCredentials: () => St });
  var _ = (_a = class extends Error {
    constructor(e) {
      super(e), this.name = "WorkBuddyCloudConfigError";
    }
  }, a(_a, "WorkBuddyCloudConfigError"), _a);
  var Tt = /^wbpk_/;
  function Ue(r, e) {
    if (typeof r != "string" || r.trim() === "") throw new _(`${e} is required and must be a non-empty string.`);
    let t = r.trim(), s;
    try {
      s = new URL(t);
    } catch {
      throw new _(`${e} must be an absolute URL, received: ${t}`);
    }
    if (s.protocol !== "https:" && s.protocol !== "http:") throw new _(`${e} must use http(s), received protocol: ${s.protocol}`);
    return t.replace(/\/+$/, "");
  }
  a(Ue, "normalizeHttpUrl");
  function Ot(r) {
    var _a2;
    if (r != null && r !== "") return Ue(r, "endpoint");
    let e = (_a2 = globalThis.location) == null ? void 0 : _a2.origin;
    if (typeof e != "string" || e === "") throw new _("endpoint is required outside browsers (no location.origin to fall back to).");
    return e.replace(/\/+$/, "");
  }
  a(Ot, "resolveEndpoint");
  function At(r) {
    if (typeof r != "string" || r.trim() === "") throw new _("publishableKey is required and must be a non-empty string.");
    let e = r.trim();
    if (!Tt.test(e)) throw new _('publishableKey must start with "wbpk_".');
    return e;
  }
  a(At, "normalizePublishableKey");
  function Rt(r) {
    if (r) return r;
    if (typeof globalThis.fetch != "function") throw new _("Global fetch is unavailable in this runtime; pass options.fetch explicitly.");
    return globalThis.fetch.bind(globalThis);
  }
  a(Rt, "resolveFetch");
  function Le(r) {
    if (!r || typeof r != "object") throw new _("createWorkBuddyCloud requires publishableKey.");
    return Object.freeze({ endpoint: Ot(r.endpoint), oauthRelayBaseUrl: r.oauthRelayBaseUrl ? Ue(r.oauthRelayBaseUrl, "oauthRelayBaseUrl") : "", publishableKey: At(r.publishableKey), fetch: Rt(r.fetch) });
  }
  a(Le, "resolveRuntimeConfig");
  var ge = "x-wb-webapp-access-key";
  function ye(r, e) {
    return async (t, s) => {
      let n = new Headers(s == null ? void 0 : s.headers);
      if (n.set(ge, r.publishableKey), !n.has("Authorization")) {
        let i = await e();
        i && n.set("Authorization", `Bearer ${i}`);
      }
      return r.fetch(t, { ...s, headers: n });
    };
  }
  a(ye, "createCloudFetch");
  var ie = a(() => Promise.resolve(void 0), "anonymousTokenProvider");
  var I = "/.cloud", A = Object.freeze({ auth: `${I}/auth`, database: `${I}/database/rest`, storage: `${I}/storage`, llm: `${I}/llm` });
  var $t = "workbuddy-cloud.pkce.workbuddy.", Ut = "workbuddy-cloud.pkce-done.workbuddy.";
  function Ce(r) {
    let e = "";
    for (let t of r) e += String.fromCharCode(t);
    return btoa(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  a(Ce, "base64UrlEncode");
  function Ie() {
    var _a2;
    let r = globalThis.crypto;
    return typeof (r == null ? void 0 : r.getRandomValues) == "function" && typeof ((_a2 = r == null ? void 0 : r.subtle) == null ? void 0 : _a2.digest) == "function" && typeof globalThis.btoa == "function";
  }
  a(Ie, "hasWebCrypto");
  function je() {
    let r = new Uint8Array(32);
    return globalThis.crypto.getRandomValues(r), Ce(r);
  }
  a(je, "createCodeVerifier");
  async function De(r) {
    let e = new TextEncoder().encode(r), t = await globalThis.crypto.subtle.digest("SHA-256", e);
    return Ce(new Uint8Array(t));
  }
  a(De, "computeS256Challenge");
  var oe = (_b = class {
    constructor(e) {
      __publicField(this, "verifierKey");
      __publicField(this, "consumedKey");
      this.verifierKey = $t + e, this.consumedKey = Ut + e;
    }
    usable() {
      let e = this.storage();
      if (!e) return false;
      try {
        let t = `${this.verifierKey}.probe`;
        return e.setItem(t, "1"), e.removeItem(t), true;
      } catch {
        return false;
      }
    }
    saveVerifier(e) {
      try {
        let t = this.storage();
        return t ? (t.setItem(this.verifierKey, e), t.removeItem(this.consumedKey), true) : false;
      } catch {
        return false;
      }
    }
    readVerifier() {
      var _a2, _b2;
      try {
        return (_b2 = (_a2 = this.storage()) == null ? void 0 : _a2.getItem(this.verifierKey)) != null ? _b2 : null;
      } catch {
        return null;
      }
    }
    clearVerifier() {
      var _a2;
      try {
        (_a2 = this.storage()) == null ? void 0 : _a2.removeItem(this.verifierKey);
      } catch {
      }
    }
    markConsumed(e) {
      var _a2;
      try {
        (_a2 = this.storage()) == null ? void 0 : _a2.setItem(this.consumedKey, e);
      } catch {
      }
    }
    isConsumed(e) {
      var _a2;
      try {
        return !!e && ((_a2 = this.storage()) == null ? void 0 : _a2.getItem(this.consumedKey)) === e;
      } catch {
        return false;
      }
    }
    storage() {
      var _a2;
      try {
        return (_a2 = globalThis.sessionStorage) != null ? _a2 : null;
      } catch {
        return null;
      }
    }
  }, a(_b, "WorkBuddyPkceStore"), _b);
  var w = { signUp: "/v1/signup", signIn: "/v1/signin", signInWithProvider: "/v1/signin/with/provider", token: "/v1/token", loginWechat: "/v1/login-wechat", loginWechatWeb: "/v1/login-wechat-web", loginWorkBuddy: "/v1/login-workbuddy", signOut: "/v1/user/signout", userMe: "/v1/user/me", verification: "/v1/verification", verificationVerify: "/v1/verification/verify", resetPassword: "/v1/reset", sudo: "/v1/user/sudo", userPassword: "/v1/user/password" };
  function be(r, e) {
    let t = r != null ? r : {}, s = typeof t.access_token == "string" ? t.access_token : "";
    if (!s) throw It("response has no access_token");
    let n = typeof t.refresh_token == "string" ? t.refresh_token : "", i = typeof t.expires_in == "number" ? t.expires_in : 0;
    return { accessToken: s, refreshToken: n, expiresAt: e + i * 1e3, user: Lt(t) };
  }
  a(be, "parseSession");
  function Lt(r) {
    let e = r.is_anonymous === true;
    return { id: typeof r.sub == "string" ? r.sub : "", name: T(r.name), avatarUrl: T(r.avatar_url), isAnonymous: e, raw: r };
  }
  a(Lt, "userFromSessionPayload");
  function Ne(r) {
    var _a2, _b2, _c2;
    let e = r != null ? r : {}, t = typeof e.sub == "string" ? e.sub : typeof e.uid == "string" ? e.uid : "", s = (_a2 = e.user_metadata) != null ? _a2 : {};
    return { id: t, email: (_b2 = T(e.email)) != null ? _b2 : T(s.email), phone: (_c2 = T(e.phone_number)) != null ? _c2 : T(e.phone), name: T(e.name), avatarUrl: T(e.avatar_url), isAnonymous: e.is_anonymous === true || e.scope === "anonymous", raw: e };
  }
  a(Ne, "parseUser");
  function T(r) {
    return typeof r == "string" && r !== "" ? r : void 0;
  }
  a(T, "pickString");
  function Fe(r, e) {
    var _a2, _b2, _c2;
    let t = e != null ? e : {}, s = typeof t.error == "string" ? t.error : void 0, n = (_c2 = (_b2 = (_a2 = T(t.error_description)) != null ? _a2 : T(t.message)) != null ? _b2 : T(t.msg)) != null ? _c2 : `HTTP ${r}`;
    return { kind: Ct(r, s), message: n, status: r, code: s, cause: e };
  }
  a(Fe, "normalizeHttpError");
  function Ct(r, e) {
    if (e === "invalid_grant") return "unauthenticated";
    switch (r) {
      case 400:
        return "invalid-request";
      case 401:
        return "unauthenticated";
      case 403:
        return "permission-denied";
      case 404:
        return "not-found";
      case 429:
        return "rate-limited";
      case 501:
        return "unimplemented";
      case 503:
        return "backend-unavailable";
      default:
        return r >= 500 ? "backend-unavailable" : "unknown";
    }
  }
  a(Ct, "errorKind");
  function W(r) {
    return { kind: "network", message: `request failed before a response was received: ${r instanceof Error ? r.message : String(r)}`, status: 0, cause: r };
  }
  a(W, "normalizeNetworkError");
  function It(r) {
    let e = new Error(`workbuddy-cloud auth: ${r}`);
    return e.kind = "unknown", e.status = 0, e;
  }
  a(It, "sessionShapeError");
  var ae = (_c = class {
    constructor(e) {
      __publicField(this, "store");
      __publicField(this, "refresh");
      __publicField(this, "emit");
      __publicField(this, "isCredentialsRejected");
      __publicField(this, "now");
      __publicField(this, "inflight", null);
      __publicField(this, "signOutEpoch", 0);
      __publicField(this, "lastFailure", null);
      var _a2;
      this.store = e.store, this.refresh = e.refresh, this.emit = e.emit, this.isCredentialsRejected = e.isCredentialsRejected, this.now = (_a2 = e.now) != null ? _a2 : Date.now;
    }
    peek() {
      return this.store.read();
    }
    async ensure() {
      let e = this.store.read();
      return e ? this.isExpiring(e) ? e.refreshToken ? this.refreshOnce(e) : this.abandon() : e : null;
    }
    async forceRefresh() {
      let e = this.store.read();
      return (e == null ? void 0 : e.refreshToken) ? this.refreshOnce(e, { ignoreCooldown: true }) : null;
    }
    commitSignIn(e) {
      return this.lastFailure = null, this.store.write(e), this.emit("SIGNED_IN", e), e;
    }
    commitUserUpdate(e) {
      return this.store.write(e), this.emit("USER_UPDATED", e), e;
    }
    clear() {
      this.signOutEpoch += 1, this.lastFailure = null, this.inflight = null, this.store.clear(), this.emit("SIGNED_OUT", null);
    }
    isExpiring(e) {
      return typeof e.expiresAt != "number" ? true : e.expiresAt - this.now() < 9e4;
    }
    refreshOnce(e, t = {}) {
      if (this.inflight) return this.inflight;
      if (!t.ignoreCooldown && this.inCooldown(e.refreshToken)) return Promise.resolve(null);
      let s = this.doRefresh(e).finally(() => {
        this.inflight = null;
      });
      return this.inflight = s, s;
    }
    inCooldown(e) {
      let t = this.lastFailure;
      return t !== null && t.token === e && this.now() - t.at < 6e4;
    }
    async doRefresh(e) {
      let t = this.signOutEpoch, s = e.refreshToken, n;
      try {
        n = await this.refresh(s);
      } catch (o) {
        return this.onRefreshFailed(s, o);
      }
      if (this.signOutEpoch !== t) return this.store.clear(), null;
      let i = this.store.read();
      return i && i.refreshToken !== s ? i : (this.lastFailure = null, this.store.write(n), this.emit("TOKEN_REFRESHED", n), n);
    }
    onRefreshFailed(e, t) {
      return this.isCredentialsRejected(t) ? this.abandon() : (this.lastFailure = { token: e, at: this.now() }, null);
    }
    abandon() {
      return this.store.clear(), this.lastFailure = null, this.emit("SIGNED_OUT", null), null;
    }
  }, a(_c, "SessionManager"), _c);
  var jt = "workbuddy-cloud.session.";
  function we() {
    let r = /* @__PURE__ */ new Map();
    return { getItem: a((e) => {
      var _a2;
      return (_a2 = r.get(e)) != null ? _a2 : null;
    }, "getItem"), setItem: a((e, t) => {
      r.set(e, t);
    }, "setItem"), removeItem: a((e) => {
      r.delete(e);
    }, "removeItem") };
  }
  a(we, "createMemoryStorage");
  function Be(r) {
    if (r) return r;
    try {
      let e = "__workbuddy_probe__";
      return globalThis.localStorage.setItem(e, "1"), globalThis.localStorage.removeItem(e), globalThis.localStorage;
    } catch {
      return we();
    }
  }
  a(Be, "resolveStorage");
  var ce = (_d = class {
    constructor(e, t) {
      __publicField(this, "storage");
      __publicField(this, "key");
      this.storage = e, this.key = jt + t;
    }
    read() {
      let e;
      try {
        e = this.storage.getItem(this.key);
      } catch {
        return null;
      }
      if (!e) return null;
      try {
        let t = JSON.parse(e);
        return Dt(t) ? t : this.discard();
      } catch {
        return this.discard();
      }
    }
    write(e) {
      try {
        this.storage.setItem(this.key, JSON.stringify(e));
      } catch {
      }
    }
    clear() {
      try {
        this.storage.removeItem(this.key);
      } catch {
      }
    }
    discard() {
      return this.clear(), null;
    }
  }, a(_d, "SessionStore"), _d);
  function Dt(r) {
    if (!r || typeof r != "object") return false;
    let e = r;
    return typeof e.accessToken == "string" && e.accessToken !== "" && typeof e.refreshToken == "string" && typeof e.expiresAt == "number" && !!e.user && typeof e.user == "object";
  }
  a(Dt, "isStoredSession");
  function j(r, e) {
    var _a2, _b2;
    let t = (_a2 = r.email) != null ? _a2 : "", s = (_b2 = r.phone) != null ? _b2 : "";
    return !!t == !!s ? { data: null, error: { kind: "invalid-request", message: `${e} requires exactly one of email or phone`, status: 0 } } : { data: t ? { kind: "email", value: t, username: t } : { kind: "phone", value: s, username: Nt(s) }, error: null };
  }
  a(j, "resolveAuthIdentifier");
  function Nt(r) {
    let t = r.replace(/\D/g, "");
    return t.startsWith("0086") ? t = t.slice(4) : t.startsWith("86") && t.length === 13 && (t = t.slice(2)), /^1\d{10}$/.test(t) ? `+86 ${t}` : r;
  }
  a(Nt, "normalizePhone");
  var He = 200;
  function We(r, e) {
    let t = Array.from(r);
    return t.length <= e ? r : `${t.slice(0, e).join("")}\u2026`;
  }
  a(We, "truncateMessage");
  function Se(r) {
    let e = r.get("error");
    if (!e) return null;
    let t = r.get("error_description"), s = t ? `oauth provider rejected the request: ${e}: ${t}` : `oauth provider rejected the request: ${e}`;
    return We(s, He);
  }
  a(Se, "oauthProviderRejectMessage");
  var D = (_e2 = class {
    constructor(e, t, s = {}) {
      __publicField(this, "fetch");
      __publicField(this, "baseUrl");
      __publicField(this, "sessions");
      __publicField(this, "storage");
      __publicField(this, "oauthRelayBaseUrl");
      __publicField(this, "workBuddyPkce");
      __publicField(this, "workBuddyExchanges", /* @__PURE__ */ new Map());
      __publicField(this, "listeners", /* @__PURE__ */ new Map());
      __publicField(this, "nextListenerId", 1);
      this.fetch = t, this.baseUrl = `${e.endpoint}${A.auth}`, this.oauthRelayBaseUrl = e.oauthRelayBaseUrl, this.storage = Be(s.storage), this.workBuddyPkce = new oe(e.publishableKey), this.sessions = new ae({ store: new ce(this.storage, e.publishableKey), refresh: a((n) => this.exchangeRefreshHandle(n), "refresh"), emit: a((n, i) => this.notify(n, i), "emit"), isCredentialsRejected: a((n) => ue(n) && Me(n), "isCredentialsRejected") });
    }
    async getAccessToken() {
      var _a2;
      return (_a2 = await this.sessions.ensure()) == null ? void 0 : _a2.accessToken;
    }
    async signInWithPassword(e) {
      if (!e.password) return h(p("signInWithPassword requires a password"));
      let t = j(e, "signInWithPassword");
      return t.error ? h(t.error) : this.postForSession(w.signIn, { username: t.data.username, password: e.password });
    }
    async signInWithWechat(e, t) {
      return e ? t ? this.postForSession(w.loginWechat, { code: e, appid: t }) : h(p("signInWithWechat requires appid")) : h(p("signInWithWechat requires code"));
    }
    async signUp(e) {
      let t = j(e, "signUp");
      if (t.error) return h(t.error);
      if (!e.verificationToken) return h(p("signUp requires a verificationToken; run sendOtp + verifyOtp first (the provider rejects username+password-only signup)"));
      let s = { verification_token: e.verificationToken };
      return t.data.kind === "phone" ? s.phone_number = t.data.username : s.email = t.data.username, e.password && (s.password = e.password), this.postForSession(w.signUp, s);
    }
    async sendOtp(e) {
      var _a2;
      let t = j(e, "sendOtp");
      if (t.error) return h(t.error);
      let s = {};
      t.data.kind === "phone" ? (s.phone_number = t.data.username, s.target = "ANY") : (s.email = t.data.username, s.usage = "email", e.emailRedirectTo && (s.email_redirect_to = e.emailRedirectTo));
      let n = await this.request(w.verification, { method: "POST", body: s });
      if (n.error) return h(n.error);
      let i = (_a2 = n.data) != null ? _a2 : {}, o = typeof i.verification_id == "string" ? i.verification_id : "";
      return o ? S({ verificationId: o, isExistingUser: i.is_user === true }) : h(p("provider returned no verification_id"));
    }
    async signInWithOtp(e) {
      let t = j(e, "signInWithOtp");
      if (t.error) return h(t.error);
      let s = await this.sendOtp(e);
      if (s.error) return h(s.error);
      let { verificationId: n, isExistingUser: i } = s.data, o = t.data.kind === "phone" ? { phone: t.data.username } : { email: t.data.username };
      return S({ verificationId: n, isExistingUser: i, isUser: i, verify: a(({ token: c, password: u }) => this.verifyOtp({ verificationId: n, token: c, ...o, isExistingUser: i, password: u }), "verify") });
    }
    async verifyOtp(e) {
      var _a2;
      let t = j(e, "verifyOtp");
      if (t.error) return h(t.error);
      if (!e.verificationId || !e.token) return h(p("verifyOtp requires verificationId and token"));
      let s = await this.request(w.verificationVerify, { method: "POST", body: { verification_id: e.verificationId, verification_code: e.token } });
      if (s.error) return h(s.error);
      let n = (_a2 = s.data) != null ? _a2 : {}, i = typeof n.verification_token == "string" ? n.verification_token : "";
      if (!i) return h(p("provider returned no verification_token"));
      if (e.isExistingUser) return this.postForSession(w.signIn, { username: t.data.username, verification_token: i });
      let o = t.data.kind === "phone" ? { phone: t.data.value, password: e.password } : { email: t.data.value, password: e.password };
      return this.signUp({ ...o, verificationToken: i });
    }
    async signInWithOAuth(e) {
      var _a2;
      if (!this.oauthRelayBaseUrl) return h(p("signInWithOAuth requires oauthRelayBaseUrl"));
      if (e.provider !== "google" && e.provider !== "wechat" && e.provider !== "workbuddy") return h(p("\u5F53\u524D SDK \u4E0D\u652F\u6301\u8BE5\u767B\u5F55\u65B9\u5F0F\uFF0C\u8BF7\u68C0\u67E5 SDK \u7248\u672C\u4E0E\u767B\u5F55\u914D\u7F6E\u3002"));
      let t = (_a2 = e.redirectTo) != null ? _a2 : Mt();
      return t ? this.startRelayOAuth(e, t) : h(p("signInWithOAuth requires redirectTo outside a browser environment"));
    }
    parseCallbackQuery(e) {
      try {
        let t = /^https?:\/\//i.test(e) ? new URL(e).search : e;
        return S(new URLSearchParams(t));
      } catch {
        return h(p("oauth callback URL is invalid"));
      }
    }
    async handleOAuthCallback(e) {
      var _a2, _b2;
      let t = this.parseCallbackQuery(e != null ? e : Ee());
      if (t.error || !t.data) return h((_a2 = t.error) != null ? _a2 : p("oauth callback URL is invalid"));
      let s = t.data, n = Se(s);
      if (n) return h({ kind: "unauthenticated", message: n, status: 0 });
      let i = s.get("code");
      if (!i) return S(null);
      let o = (_b2 = s.get("state")) != null ? _b2 : "";
      if (!o) return h(p("oauth callback requires state"));
      let c = s.get("provider_id");
      if (c !== "custom-oauth") return h(p("oauth callback requires provider_id=custom-oauth"));
      let u = { provider_id: c, provider_code: i, state: o, provider_params: { state: o } };
      return this.postForSession(w.signInWithProvider, u);
    }
    async handleWechatWebCallback(e) {
      var _a2, _b2;
      let t = this.parseCallbackQuery(e != null ? e : Ee());
      if (t.error || !t.data) return h((_a2 = t.error) != null ? _a2 : p("oauth callback URL is invalid"));
      let s = t.data, n = Se(s);
      if (n) return h({ kind: "unauthenticated", message: n, status: 0 });
      let i = s.get("code");
      if (!i) return S(null);
      let o = (_b2 = s.get("state")) != null ? _b2 : "";
      if (!o) return h(p("oauth callback requires state"));
      let c = s.get("provider");
      return c && c !== "wechat" ? h(p("wechat callback requires provider=wechat")) : s.get("provider_id") === "custom-oauth" ? h(p("wechat callback must not use provider_id=custom-oauth")) : this.postForSession(w.loginWechatWeb, { code: i, state: o });
    }
    async handleWorkBuddyCallback(e) {
      var _a2, _b2;
      let t = this.parseCallbackQuery(e != null ? e : Ee());
      if (t.error || !t.data) return h((_a2 = t.error) != null ? _a2 : p("oauth callback URL is invalid"));
      let s = t.data, n = s.get("provider");
      if (n && n !== "workbuddy") return S(null);
      let i = Se(s);
      if (i) return this.workBuddyPkce.clearVerifier(), h({ kind: "unauthenticated", message: i, status: 0 });
      let o = s.get("code");
      if (!o) return S(null);
      let c = (_b2 = s.get("state")) != null ? _b2 : "";
      if (!c) return h(p("workbuddy callback requires state"));
      if (s.get("provider_id") === "custom-oauth") return h(p("workbuddy callback must not use provider_id=custom-oauth"));
      if (this.workBuddyPkce.isConsumed(c)) return S(null);
      let u = this.workBuddyExchanges.get(c);
      if (u) return u;
      let d = this.workBuddyPkce.readVerifier();
      if (!d) return h(p("workbuddy callback has no local PKCE verifier; sign in again in this tab"));
      this.workBuddyPkce.clearVerifier();
      let l = this.exchangeWorkBuddyCode(o, c, d);
      this.workBuddyExchanges.set(c, l);
      try {
        return await l;
      } finally {
        this.workBuddyExchanges.delete(c);
      }
    }
    async exchangeWorkBuddyCode(e, t, s) {
      let n = await this.postForSession(w.loginWorkBuddy, { code: e, state: t, code_verifier: s });
      return n.data && this.workBuddyPkce.markConsumed(t), n;
    }
    async resetPasswordForEmail(e) {
      var _a2;
      if (!e) return h(p("resetPasswordForEmail requires email"));
      let t = await this.request(w.verification, { method: "POST", body: { email: e, usage: "PASSWORD_RESET", target: "USER" } });
      if (t.error) return h(t.error);
      let s = (_a2 = t.data) != null ? _a2 : {}, n = typeof s.verification_id == "string" ? s.verification_id : "";
      return n ? S({ updateUser: a(async ({ nonce: i, password: o }) => {
        var _a3;
        let c = await this.request(w.verificationVerify, { method: "POST", body: { verification_id: n, verification_code: i } });
        if (c.error) return h(c.error);
        let u = (_a3 = c.data) != null ? _a3 : {}, d = typeof u.verification_token == "string" ? u.verification_token : "";
        if (!d) return h(p("provider returned no verification_token"));
        let l = await this.request(w.resetPassword, { method: "POST", body: { email: e, new_password: o, verification_token: d } });
        if (l.error) return h(l.error);
        let f = await this.signInWithPassword({ email: e, password: o });
        return f.error || this.notify("PASSWORD_RECOVERY", f.data), f;
      }, "updateUser") }) : h(p("provider returned no verification_id"));
    }
    async resetPasswordForOld(e) {
      var _a2, _b2;
      let t = await this.getAccessToken();
      if (!t) return h({ kind: "unauthenticated", message: "no active session", status: 0 });
      let s = await this.request(w.sudo, { method: "POST", token: t, body: { password: e.oldPassword } });
      if (s.error) return h(s.error);
      let n = (_a2 = s.data) != null ? _a2 : {}, i = typeof n.sudo_token == "string" ? n.sudo_token : "";
      if (!i) return h(p("provider returned no sudo_token"));
      let o = await this.request(w.userPassword, { method: "PATCH", token: t, body: { sudo_token: i, new_password: e.newPassword } });
      if (o.error) return h(o.error);
      let c = await this.getSession();
      return c.data ? (this.notify("USER_UPDATED", c.data), S(c.data)) : h((_b2 = c.error) != null ? _b2 : { kind: "unauthenticated", message: "no active session", status: 0 });
    }
    async getSession() {
      try {
        return S(await this.sessions.ensure());
      } catch (e) {
        return h(ue(e) ? e : W(e));
      }
    }
    async refreshSession() {
      try {
        return S(await this.sessions.forceRefresh());
      } catch (e) {
        return h(ue(e) ? e : W(e));
      }
    }
    async getUser() {
      let e = await this.getAccessToken();
      if (!e) return h({ kind: "unauthenticated", message: "no active session", status: 0 });
      let t = await this.request(w.userMe, { method: "GET", token: e });
      return t.error ? (Me(t.error) && this.sessions.clear(), h(t.error)) : S(Ne(t.data));
    }
    async signOut() {
      let e = this.sessions.peek();
      return (e == null ? void 0 : e.accessToken) && await this.request(w.signOut, { method: "POST", body: {}, token: e.accessToken }), this.sessions.clear(), S(null);
    }
    onAuthStateChange(e) {
      let t = this.nextListenerId++;
      return this.listeners.set(t, e), qe(e, "INITIAL_SESSION", this.sessions.peek()), () => {
        this.listeners.delete(t);
      };
    }
    async startRelayOAuth(e, t) {
      var _a2;
      let s;
      try {
        s = new URL(t);
      } catch {
        return h(p("signInWithOAuth requires an absolute redirectTo URL"));
      }
      let n = new URL(`${this.oauthRelayBaseUrl}/authorize`);
      if (n.searchParams.set("provider", e.provider), n.searchParams.set("callback_url", s.toString()), e.provider === "workbuddy") {
        let i = await this.createWorkBuddyProof();
        if (i.error || !i.data) return h((_a2 = i.error) != null ? _a2 : p("signInWithOAuth could not create PKCE"));
        n.searchParams.set("code_challenge", i.data), n.searchParams.set("code_challenge_method", "S256");
      }
      return S({ url: n.toString() });
    }
    async createWorkBuddyProof() {
      if (!Ie()) return h(p("workbuddy sign-in requires WebCrypto; it is unavailable in this runtime (an insecure http:// origin disables it \u2014 serve the app over https)"));
      if (!this.workBuddyPkce.usable()) return h(p("workbuddy sign-in requires sessionStorage to keep the PKCE verifier across the redirect; it is unavailable in this runtime"));
      let e, t;
      try {
        e = je(), t = await De(e);
      } catch (s) {
        return h(p(`workbuddy sign-in could not create a PKCE proof: ${Ft(s)}`));
      }
      return this.workBuddyPkce.saveVerifier(e) ? S(t) : h(p("workbuddy sign-in could not persist the PKCE verifier"));
    }
    async exchangeRefreshHandle(e) {
      let t = await this.request(w.token, { method: "POST", body: { grant_type: "refresh_token", refresh_token: e } });
      if (t.error) throw t.error;
      return be(t.data, Date.now());
    }
    async postForSession(e, t, s = {}) {
      let n = await this.request(e, { method: "POST", body: t, headers: s.headers });
      if (n.error) return h(n.error);
      try {
        return S(this.sessions.commitSignIn(be(n.data, Date.now())));
      } catch (i) {
        return h(ue(i) ? i : W(i));
      }
    }
    async request(e, t) {
      let s = { ...t.headers };
      t.body !== void 0 && (s["Content-Type"] = "application/json"), t.token && (s.Authorization = `Bearer ${t.token}`);
      let n;
      try {
        n = await this.fetch(this.baseUrl + e, { method: t.method, headers: s, body: t.body === void 0 ? void 0 : JSON.stringify(t.body) });
      } catch (o) {
        return h(W(o));
      }
      let i = await Bt(n);
      return n.ok ? S(i) : h(Fe(n.status, i));
    }
    notify(e, t) {
      for (let s of this.listeners.values()) qe(s, e, t);
    }
  }, a(_e2, "AuthModule"), _e2);
  function S(r) {
    return { data: r, error: null };
  }
  a(S, "ok");
  function h(r) {
    return { data: null, error: r };
  }
  a(h, "fail");
  function p(r) {
    return { kind: "invalid-request", message: r, status: 0 };
  }
  a(p, "badRequest");
  function Ft(r) {
    return We(r instanceof Error ? r.message : String(r), He);
  }
  a(Ft, "describeError");
  function ue(r) {
    return !!r && typeof r == "object" && typeof r.kind == "string";
  }
  a(ue, "isCloudError");
  function Me(r) {
    return r.kind === "unauthenticated" || r.code === "invalid_grant";
  }
  a(Me, "rejectedCredentials");
  async function Bt(r) {
    let e = await r.text();
    if (!e) return null;
    try {
      return JSON.parse(e);
    } catch {
      return { message: e };
    }
  }
  a(Bt, "readBody");
  function qe(r, e, t) {
    try {
      r(e, t);
    } catch {
    }
  }
  a(qe, "safeInvoke");
  function Mt() {
    let r = globalThis.location;
    return r ? r.origin + r.pathname : "";
  }
  a(Mt, "currentPageUrl");
  function Ee() {
    var _a2, _b2;
    return (_b2 = (_a2 = globalThis.location) == null ? void 0 : _a2.search) != null ? _b2 : "";
  }
  a(Ee, "currentPageSearch");
  var xe = a((r) => Math.min(1e3 * 2 ** r, 3e4), "getRetryDelay"), Ke = [520, 503], ke = ["GET", "HEAD", "OPTIONS"];
  var U = (_f = class extends Error {
    constructor(e) {
      super(e.message);
      __publicField(this, "details");
      __publicField(this, "hint");
      __publicField(this, "code");
      this.name = "PostgrestError", this.details = e.details, this.hint = e.hint, this.code = e.code;
    }
    toJSON() {
      return { name: this.name, message: this.message, details: this.details, hint: this.hint, code: this.code };
    }
  }, a(_f, "PostgrestError"), _f);
  function ze(r, e) {
    return new Promise((t) => {
      if (e == null ? void 0 : e.aborted) {
        t();
        return;
      }
      let s = setTimeout(() => {
        e == null ? void 0 : e.removeEventListener("abort", n), t();
      }, r);
      function n() {
        clearTimeout(s), t();
      }
      a(n, "onAbort"), e == null ? void 0 : e.addEventListener("abort", n);
    });
  }
  a(ze, "sleep");
  function qt(r, e, t, s) {
    return !(!s || t >= 3 || !ke.includes(r) || !Ke.includes(e));
  }
  a(qt, "shouldRetry");
  var K = (_g = class {
    constructor(e) {
      __publicField(this, "method");
      __publicField(this, "url");
      __publicField(this, "headers");
      __publicField(this, "schema");
      __publicField(this, "body");
      __publicField(this, "shouldThrowOnError", false);
      __publicField(this, "signal");
      __publicField(this, "fetch");
      __publicField(this, "isMaybeSingle");
      __publicField(this, "shouldStripNulls");
      __publicField(this, "urlLengthLimit");
      __publicField(this, "retryEnabled", true);
      var _a2, _b2, _c2, _d2, _e3;
      this.method = e.method, this.url = e.url, this.headers = new Headers(e.headers), this.schema = e.schema, this.body = e.body, this.shouldThrowOnError = (_a2 = e.shouldThrowOnError) != null ? _a2 : false, this.signal = e.signal, this.isMaybeSingle = (_b2 = e.isMaybeSingle) != null ? _b2 : false, this.shouldStripNulls = (_c2 = e.shouldStripNulls) != null ? _c2 : false, this.urlLengthLimit = (_d2 = e.urlLengthLimit) != null ? _d2 : 8e3, this.retryEnabled = (_e3 = e.retry) != null ? _e3 : true, e.fetch ? this.fetch = e.fetch : this.fetch = fetch;
    }
    throwOnError() {
      return this.shouldThrowOnError = true, this;
    }
    stripNulls() {
      if (this.headers.get("Accept") === "text/csv") throw new Error("stripNulls() cannot be used with csv()");
      return this.shouldStripNulls = true, this;
    }
    setHeader(e, t) {
      return this.headers = new Headers(this.headers), this.headers.set(e, t), this;
    }
    retry(e) {
      return this.retryEnabled = e, this;
    }
    then(e, t) {
      if (this.schema === void 0 || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), this.method !== "GET" && this.method !== "HEAD" && this.headers.set("Content-Type", "application/json"), this.shouldStripNulls) {
        let o = this.headers.get("Accept");
        o === "application/vnd.pgrst.object+json" ? this.headers.set("Accept", "application/vnd.pgrst.object+json;nulls=stripped") : (!o || o === "application/json") && this.headers.set("Accept", "application/vnd.pgrst.array+json;nulls=stripped");
      }
      let s = this.fetch, i = a(async () => {
        var _a2, _b2;
        let o = 0;
        for (; ; ) {
          let c = {};
          this.headers.forEach((d, l) => {
            c[l] = d;
          }), o > 0 && (c["X-Retry-Count"] = String(o));
          let u;
          try {
            u = await s(this.url.toString(), { method: this.method, headers: c, body: JSON.stringify(this.body, (d, l) => typeof l == "bigint" ? l.toString() : l), signal: this.signal });
          } catch (d) {
            if ((d == null ? void 0 : d.name) === "AbortError" || (d == null ? void 0 : d.code) === "ABORT_ERR" || !ke.includes(this.method)) throw d;
            if (this.retryEnabled && o < 3) {
              let l = xe(o);
              o++, await ze(l, this.signal);
              continue;
            }
            throw d;
          }
          if (qt(this.method, u.status, o, this.retryEnabled)) {
            let d = (_b2 = (_a2 = u.headers) == null ? void 0 : _a2.get("Retry-After")) != null ? _b2 : null, l = d !== null ? Math.max(0, parseInt(d, 10) || 0) * 1e3 : xe(o);
            await u.text(), o++, await ze(l, this.signal);
            continue;
          }
          return await this.processResponse(u);
        }
      }, "executeWithRetry")();
      return this.shouldThrowOnError || (i = i.catch((o) => {
        var _a2, _b2, _c2, _d2, _e3, _f2;
        let c = "", u = "", d = "", l = o == null ? void 0 : o.cause;
        if (l) {
          let g = (_a2 = l == null ? void 0 : l.message) != null ? _a2 : "", y = (_b2 = l == null ? void 0 : l.code) != null ? _b2 : "";
          c = `${(_c2 = o == null ? void 0 : o.name) != null ? _c2 : "FetchError"}: ${o == null ? void 0 : o.message}`, c += `

Caused by: ${(_d2 = l == null ? void 0 : l.name) != null ? _d2 : "Error"}: ${g}`, y && (c += ` (${y})`), (l == null ? void 0 : l.stack) && (c += `
${l.stack}`);
        } else c = (_e3 = o == null ? void 0 : o.stack) != null ? _e3 : "";
        let f = this.url.toString().length;
        return (o == null ? void 0 : o.name) === "AbortError" || (o == null ? void 0 : o.code) === "ABORT_ERR" ? (d = "", u = "Request was aborted (timeout or manual cancellation)", f > this.urlLengthLimit && (u += `. Note: Your request URL is ${f} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)) : ((l == null ? void 0 : l.name) === "HeadersOverflowError" || (l == null ? void 0 : l.code) === "UND_ERR_HEADERS_OVERFLOW") && (d = "", u = "HTTP headers exceeded server limits (typically 16KB)", f > this.urlLengthLimit && (u += `. Your request URL is ${f} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)), { success: false, error: { message: `${(_f2 = o == null ? void 0 : o.name) != null ? _f2 : "FetchError"}: ${o == null ? void 0 : o.message}`, details: c, hint: u, code: d }, data: null, count: null, status: 0, statusText: "" };
      })), i.then(e, t);
    }
    async processResponse(e) {
      var _a2, _b2, _c2, _d2;
      let t = null, s = null, n = null, i = e.status, o = e.statusText;
      if (e.ok) {
        if (this.method !== "HEAD") {
          let d = await e.text();
          if (d !== "") if (this.headers.get("Accept") === "text/csv") s = d;
          else if (this.headers.get("Accept") && ((_a2 = this.headers.get("Accept")) == null ? void 0 : _a2.includes("application/vnd.pgrst.plan+text"))) s = d;
          else try {
            s = JSON.parse(d);
          } catch {
            if (t = { message: d }, s = null, this.shouldThrowOnError) throw new U({ message: d, details: "", hint: "", code: "" });
          }
        }
        let c = (_b2 = this.headers.get("Prefer")) == null ? void 0 : _b2.match(/count=(exact|planned|estimated)/), u = (_c2 = e.headers.get("content-range")) == null ? void 0 : _c2.split("/");
        if (c && u && u.length > 1 && (n = parseInt(u[1])), this.isMaybeSingle && Array.isArray(s)) if (s.length > 1) {
          if (t = { code: "PGRST116", details: `Results contain ${s.length} rows, application/vnd.pgrst.object+json requires 1 row`, hint: null, message: "JSON object requested, multiple (or no) rows returned" }, s = null, n = null, i = 406, o = "Not Acceptable", this.shouldThrowOnError) throw new U({ ...t, hint: (_d2 = t.hint) != null ? _d2 : "" });
        } else s.length === 1 ? s = s[0] : s = null;
      } else {
        let c = await e.text();
        try {
          t = JSON.parse(c), Array.isArray(t) && e.status === 404 && (s = [], t = null, i = 200, o = "OK");
        } catch {
          e.status === 404 && c === "" ? (i = 204, o = "No Content") : t = { message: c };
        }
        if (t && this.shouldThrowOnError) throw new U(t);
      }
      return { success: t === null, error: t, data: s, count: n, status: i, statusText: o };
    }
    returns() {
      return this;
    }
    overrideTypes() {
      return this;
    }
  }, a(_g, "PostgrestBuilder"), _g);
  var z = (_h = class extends K {
    throwOnError() {
      return super.throwOnError();
    }
    select(e) {
      let t = false, s = (e != null ? e : "*").split("").map((n) => /\s/.test(n) && !t ? "" : (n === '"' && (t = !t), n)).join("");
      return this.url.searchParams.set("select", s), this.headers.append("Prefer", "return=representation"), this;
    }
    order(e, { ascending: t = true, nullsFirst: s, foreignTable: n, referencedTable: i = n } = {}) {
      let o = i ? `${i}.order` : "order", c = this.url.searchParams.get(o);
      return this.url.searchParams.set(o, `${c ? `${c},` : ""}${e}.${t ? "asc" : "desc"}${s === void 0 ? "" : s ? ".nullsfirst" : ".nullslast"}`), this;
    }
    limit(e, { foreignTable: t, referencedTable: s = t } = {}) {
      let n = typeof s > "u" ? "limit" : `${s}.limit`;
      return this.url.searchParams.set(n, `${e}`), this;
    }
    range(e, t, { foreignTable: s, referencedTable: n = s } = {}) {
      let i = typeof n > "u" ? "offset" : `${n}.offset`, o = typeof n > "u" ? "limit" : `${n}.limit`;
      return this.url.searchParams.set(i, `${e}`), this.url.searchParams.set(o, `${t - e + 1}`), this;
    }
    abortSignal(e) {
      return this.signal = e, this;
    }
    single() {
      return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
    }
    maybeSingle() {
      return this.isMaybeSingle = true, this;
    }
    csv() {
      return this.headers.set("Accept", "text/csv"), this;
    }
    geojson() {
      return this.headers.set("Accept", "application/geo+json"), this;
    }
    explain({ analyze: e = false, verbose: t = false, settings: s = false, buffers: n = false, wal: i = false, format: o = "text" } = {}) {
      var _a2;
      let c = [e ? "analyze" : null, t ? "verbose" : null, s ? "settings" : null, n ? "buffers" : null, i ? "wal" : null].filter(Boolean).join("|"), u = (_a2 = this.headers.get("Accept")) != null ? _a2 : "application/json";
      return this.headers.set("Accept", `application/vnd.pgrst.plan+${o}; for="${u}"; options=${c};`), o === "json" ? this : this;
    }
    rollback() {
      return this.headers.append("Prefer", "tx=rollback"), this;
    }
    returns() {
      return this;
    }
    maxAffected(e) {
      return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${e}`), this;
    }
  }, a(_h, "PostgrestTransformBuilder"), _h);
  var Ge = new RegExp("[,()]"), O = (_i = class extends z {
    throwOnError() {
      return super.throwOnError();
    }
    eq(e, t) {
      return this.url.searchParams.append(e, `eq.${t}`), this;
    }
    neq(e, t) {
      return this.url.searchParams.append(e, `neq.${t}`), this;
    }
    gt(e, t) {
      return this.url.searchParams.append(e, `gt.${t}`), this;
    }
    gte(e, t) {
      return this.url.searchParams.append(e, `gte.${t}`), this;
    }
    lt(e, t) {
      return this.url.searchParams.append(e, `lt.${t}`), this;
    }
    lte(e, t) {
      return this.url.searchParams.append(e, `lte.${t}`), this;
    }
    like(e, t) {
      return this.url.searchParams.append(e, `like.${t}`), this;
    }
    likeAllOf(e, t) {
      return this.url.searchParams.append(e, `like(all).{${t.join(",")}}`), this;
    }
    likeAnyOf(e, t) {
      return this.url.searchParams.append(e, `like(any).{${t.join(",")}}`), this;
    }
    ilike(e, t) {
      return this.url.searchParams.append(e, `ilike.${t}`), this;
    }
    ilikeAllOf(e, t) {
      return this.url.searchParams.append(e, `ilike(all).{${t.join(",")}}`), this;
    }
    ilikeAnyOf(e, t) {
      return this.url.searchParams.append(e, `ilike(any).{${t.join(",")}}`), this;
    }
    regexMatch(e, t) {
      return this.url.searchParams.append(e, `match.${t}`), this;
    }
    regexIMatch(e, t) {
      return this.url.searchParams.append(e, `imatch.${t}`), this;
    }
    is(e, t) {
      return this.url.searchParams.append(e, `is.${t}`), this;
    }
    isDistinct(e, t) {
      return this.url.searchParams.append(e, `isdistinct.${t}`), this;
    }
    in(e, t) {
      let s = Array.from(new Set(t)).map((n) => typeof n == "string" && Ge.test(n) ? `"${n}"` : `${n}`).join(",");
      return this.url.searchParams.append(e, `in.(${s})`), this;
    }
    notIn(e, t) {
      let s = Array.from(new Set(t)).map((n) => typeof n == "string" && Ge.test(n) ? `"${n}"` : `${n}`).join(",");
      return this.url.searchParams.append(e, `not.in.(${s})`), this;
    }
    contains(e, t) {
      return typeof t == "string" ? this.url.searchParams.append(e, `cs.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cs.{${t.join(",")}}`) : this.url.searchParams.append(e, `cs.${JSON.stringify(t)}`), this;
    }
    containedBy(e, t) {
      return typeof t == "string" ? this.url.searchParams.append(e, `cd.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cd.{${t.join(",")}}`) : this.url.searchParams.append(e, `cd.${JSON.stringify(t)}`), this;
    }
    rangeGt(e, t) {
      return this.url.searchParams.append(e, `sr.${t}`), this;
    }
    rangeGte(e, t) {
      return this.url.searchParams.append(e, `nxl.${t}`), this;
    }
    rangeLt(e, t) {
      return this.url.searchParams.append(e, `sl.${t}`), this;
    }
    rangeLte(e, t) {
      return this.url.searchParams.append(e, `nxr.${t}`), this;
    }
    rangeAdjacent(e, t) {
      return this.url.searchParams.append(e, `adj.${t}`), this;
    }
    overlaps(e, t) {
      return typeof t == "string" ? this.url.searchParams.append(e, `ov.${t}`) : this.url.searchParams.append(e, `ov.{${t.join(",")}}`), this;
    }
    textSearch(e, t, { config: s, type: n } = {}) {
      let i = "";
      n === "plain" ? i = "pl" : n === "phrase" ? i = "ph" : n === "websearch" && (i = "w");
      let o = s === void 0 ? "" : `(${s})`;
      return this.url.searchParams.append(e, `${i}fts${o}.${t}`), this;
    }
    match(e) {
      return Object.entries(e).filter(([t, s]) => s !== void 0).forEach(([t, s]) => {
        this.url.searchParams.append(t, `eq.${s}`);
      }), this;
    }
    not(e, t, s) {
      return this.url.searchParams.append(e, `not.${t}.${s}`), this;
    }
    or(e, { foreignTable: t, referencedTable: s = t } = {}) {
      let n = s ? `${s}.or` : "or";
      return this.url.searchParams.append(n, `(${e})`), this;
    }
    filter(e, t, s) {
      return this.url.searchParams.append(e, `${t}.${s}`), this;
    }
  }, a(_i, "PostgrestFilterBuilder"), _i);
  var V = (_j = class {
    constructor(e, { headers: t = {}, schema: s, fetch: n, urlLengthLimit: i = 8e3, retry: o }) {
      __publicField(this, "url");
      __publicField(this, "headers");
      __publicField(this, "schema");
      __publicField(this, "signal");
      __publicField(this, "fetch");
      __publicField(this, "urlLengthLimit");
      __publicField(this, "retry");
      this.url = e, this.headers = new Headers(t), this.schema = s, this.fetch = n, this.urlLengthLimit = i, this.retry = o;
    }
    cloneRequestState() {
      return { url: new URL(this.url.toString()), headers: new Headers(this.headers) };
    }
    select(e, t) {
      let { head: s = false, count: n } = t != null ? t : {}, i = s ? "HEAD" : "GET", o = false, c = (e != null ? e : "*").split("").map((l) => /\s/.test(l) && !o ? "" : (l === '"' && (o = !o), l)).join(""), { url: u, headers: d } = this.cloneRequestState();
      return u.searchParams.set("select", c), n && d.append("Prefer", `count=${n}`), new O({ method: i, url: u, headers: d, schema: this.schema, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
    }
    insert(e, { count: t, defaultToNull: s = true } = {}) {
      var _a2;
      let n = "POST", { url: i, headers: o } = this.cloneRequestState();
      if (t && o.append("Prefer", `count=${t}`), s || o.append("Prefer", "missing=default"), Array.isArray(e)) {
        let c = e.reduce((u, d) => u.concat(Object.keys(d)), []);
        if (c.length > 0) {
          let u = [...new Set(c)].map((d) => `"${d}"`);
          i.searchParams.set("columns", u.join(","));
        }
      }
      return new O({ method: n, url: i, headers: o, schema: this.schema, body: e, fetch: (_a2 = this.fetch) != null ? _a2 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
    }
    upsert(e, { onConflict: t, ignoreDuplicates: s = false, count: n, defaultToNull: i = true } = {}) {
      var _a2;
      let o = "POST", { url: c, headers: u } = this.cloneRequestState();
      if (u.append("Prefer", `resolution=${s ? "ignore" : "merge"}-duplicates`), t !== void 0 && c.searchParams.set("on_conflict", t), n && u.append("Prefer", `count=${n}`), i || u.append("Prefer", "missing=default"), Array.isArray(e)) {
        let d = e.reduce((l, f) => l.concat(Object.keys(f)), []);
        if (d.length > 0) {
          let l = [...new Set(d)].map((f) => `"${f}"`);
          c.searchParams.set("columns", l.join(","));
        }
      }
      return new O({ method: o, url: c, headers: u, schema: this.schema, body: e, fetch: (_a2 = this.fetch) != null ? _a2 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
    }
    update(e, { count: t } = {}) {
      var _a2;
      let s = "PATCH", { url: n, headers: i } = this.cloneRequestState();
      return t && i.append("Prefer", `count=${t}`), new O({ method: s, url: n, headers: i, schema: this.schema, body: e, fetch: (_a2 = this.fetch) != null ? _a2 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
    }
    delete({ count: e } = {}) {
      var _a2;
      let t = "DELETE", { url: s, headers: n } = this.cloneRequestState();
      return e && n.append("Prefer", `count=${e}`), new O({ method: t, url: s, headers: n, schema: this.schema, fetch: (_a2 = this.fetch) != null ? _a2 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
    }
  }, a(_j, "PostgrestQueryBuilder"), _j);
  var N = (_k = class {
    constructor(e, { headers: t = {}, schema: s, fetch: n, timeout: i, urlLengthLimit: o = 8e3, retry: c } = {}) {
      __publicField(this, "url");
      __publicField(this, "headers");
      __publicField(this, "schemaName");
      __publicField(this, "fetch");
      __publicField(this, "urlLengthLimit");
      __publicField(this, "retry");
      this.url = e, this.headers = new Headers(t), this.schemaName = s, this.urlLengthLimit = o;
      let u = n != null ? n : globalThis.fetch;
      i !== void 0 && i > 0 ? this.fetch = (d, l) => {
        let f = new AbortController(), g = setTimeout(() => f.abort(), i), y = l == null ? void 0 : l.signal;
        if (y) {
          if (y.aborted) return clearTimeout(g), u(d, l);
          let se = a(() => {
            clearTimeout(g), f.abort();
          }, "abortHandler");
          return y.addEventListener("abort", se, { once: true }), u(d, { ...l, signal: f.signal }).finally(() => {
            clearTimeout(g), y.removeEventListener("abort", se);
          });
        }
        return u(d, { ...l, signal: f.signal }).finally(() => clearTimeout(g));
      } : this.fetch = u, this.retry = c;
    }
    from(e) {
      if (!e || typeof e != "string" || e.trim() === "") throw new Error("Invalid relation name: relation must be a non-empty string.");
      let t = new URL(`${this.url}/${e}`);
      return new V(t, { headers: new Headers(this.headers), schema: this.schemaName, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
    }
    schema(e) {
      return new _k(this.url, { headers: this.headers, schema: e, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
    }
    rpc(e, t = {}, { head: s = false, get: n = false, count: i } = {}) {
      var _a2;
      let o, c = new URL(`${this.url}/rpc/${e}`), u, d = a((g) => g !== null && typeof g == "object" && (!Array.isArray(g) || g.some(d)), "_isObject"), l = s && Object.values(t).some(d);
      l ? (o = "POST", u = t) : s || n ? (o = s ? "HEAD" : "GET", Object.entries(t).filter(([g, y]) => y !== void 0).map(([g, y]) => [g, Array.isArray(y) ? `{${y.join(",")}}` : `${y}`]).forEach(([g, y]) => {
        c.searchParams.append(g, y);
      })) : (o = "POST", u = t);
      let f = new Headers(this.headers);
      return l ? f.set("Prefer", i ? `count=${i},return=minimal` : "return=minimal") : i && f.set("Prefer", `count=${i}`), new O({ method: o, url: c, headers: f, schema: this.schemaName, body: u, fetch: (_a2 = this.fetch) != null ? _a2 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
    }
  }, a(_k, "PostgrestClient"), _k);
  var G = (_l = class {
    constructor(e, t) {
      __publicField(this, "client");
      __publicField(this, "from");
      __publicField(this, "rpc");
      this.client = new N(`${e.endpoint}${A.database}`, { fetch: t }), this.from = this.client.from.bind(this.client), this.rpc = this.client.rpc.bind(this.client);
    }
    get url() {
      return this.client.url;
    }
  }, a(_l, "WorkBuddyDatabaseModule"), _l);
  function Je(r, e) {
    return new G(r, e);
  }
  a(Je, "createDatabaseModule");
  var x = (_m = class extends Error {
    constructor(e, t = {}) {
      let s = typeof e == "string" ? { message: e, type: "server_error", param: null, code: null } : e;
      super(s.message);
      __publicField(this, "error");
      __publicField(this, "status");
      __publicField(this, "requestId");
      __publicField(this, "retryAfterMs");
      this.name = "CloudOpenAIError", this.error = s, this.status = t.status, this.requestId = t.requestId, this.retryAfterMs = t.retryAfterMs, t.cause !== void 0 && ("cause" in this || Object.defineProperty(this, "cause", { value: t.cause, writable: false, enumerable: false, configurable: false }));
    }
  }, a(_m, "CloudOpenAIError"), _m);
  function Ye(r) {
    if (!r) return;
    let e = r.trim(), t = Number(e);
    if (!isNaN(t) && t >= 0 && Number.isInteger(t)) return t * 1e3;
    let s = Date.parse(e);
    if (!isNaN(s)) {
      let n = s - Date.now();
      return n > 0 ? n : 0;
    }
  }
  a(Ye, "parseRetryAfter");
  function m(...r) {
    return r.find((e) => typeof e == "string" && e.length > 0);
  }
  a(m, "stringField");
  function E(...r) {
    return r.find((e) => typeof e == "number" && Number.isFinite(e));
  }
  a(E, "numberField");
  function k(...r) {
    return r.find((e) => typeof e == "boolean");
  }
  a(k, "booleanField");
  function Xe(...r) {
    for (let e of r) {
      if (typeof e == "number" && Number.isFinite(e)) return e;
      if (e !== null && typeof e == "object" && !Array.isArray(e)) return Ht(e);
    }
  }
  a(Xe, "contextWindowField");
  function Ht(r) {
    let e = {};
    for (let [t, s] of Object.entries(r)) {
      if (t === "supportedLengths") {
        Array.isArray(s) && (e.supportedLengths = s.filter((n) => typeof n == "number" && Number.isFinite(n)));
        continue;
      }
      if (t === "defaultLength") {
        typeof s == "number" && Number.isFinite(s) && (e.defaultLength = s);
        continue;
      }
      Object.defineProperty(e, t, { value: s, writable: true, enumerable: true, configurable: true });
    }
    return e;
  }
  a(Ht, "normalizeContextWindowObject");
  function Qe(r) {
    if (!r || typeof r != "object") return;
    let e = r, t = Array.isArray(e.input) ? e.input.filter((n) => typeof n == "string") : void 0, s = Array.isArray(e.output) ? e.output.filter((n) => typeof n == "string") : void 0;
    return (t == null ? void 0 : t.length) || (s == null ? void 0 : s.length) ? { ...(t == null ? void 0 : t.length) ? { input: t } : {}, ...(s == null ? void 0 : s.length) ? { output: s } : {} } : void 0;
  }
  a(Qe, "modalitiesField");
  function Ze(r) {
    if (!r || typeof r != "object") return;
    let t = Object.entries(r).filter(([, s]) => typeof s == "boolean");
    return t.length ? Object.fromEntries(t) : void 0;
  }
  a(Ze, "capabilitiesField");
  function et(r) {
    if (!r || typeof r != "object") return;
    let e = r, t = { ...m(e.currency) ? { currency: e.currency } : {}, ...E(e.inputPerMillionTokens) !== void 0 ? { inputPerMillionTokens: e.inputPerMillionTokens } : {}, ...E(e.outputPerMillionTokens) !== void 0 ? { outputPerMillionTokens: e.outputPerMillionTokens } : {}, ...m(e.displayText) ? { displayText: e.displayText } : {} };
    return Object.keys(t).length ? t : void 0;
  }
  a(et, "pricingField");
  function tt(r) {
    if (!r || typeof r != "object") return;
    let e = r, t = {}, s = m(e.effort);
    s !== void 0 && (t.effort = s);
    let n = m(e.defaultEffort);
    n !== void 0 && (t.defaultEffort = n), Array.isArray(e.supportedEfforts) && (t.supportedEfforts = e.supportedEfforts.filter((c) => typeof c == "string"));
    let i = m(e.summary);
    i !== void 0 && (i === "auto" || i === "concise" || i === "detailed") && (t.summary = i);
    let o = k(e.canDisableThinking);
    return o !== void 0 && (t.canDisableThinking = o), Object.keys(t).length > 0 ? t : void 0;
  }
  a(tt, "reasoningField");
  function Wt(r) {
    var _a2, _b2, _c2, _d2, _e3, _f2, _g2, _h2, _i2;
    let e = m(r.id, r.ID);
    if (!e) return null;
    let t = k(r.enabled, r.Enabled), s = k(r.disabled, r.Disabled), n, i;
    return t !== void 0 ? (n = t, s !== void 0 && (i = s)) : s !== void 0 ? (i = s, n = !s) : n = true, { id: e, name: (_a2 = m(r.name, r.Name)) != null ? _a2 : e, ...m(r.provider, r.Provider) ? { provider: m(r.provider, r.Provider) } : {}, ...m(r.vendor, r.Vendor) ? { vendor: m(r.vendor, r.Vendor) } : {}, ...m(r.family, r.Family) ? { family: m(r.family, r.Family) } : {}, ...m(r.version, r.Version) ? { version: m(r.version, r.Version) } : {}, ...m(r.description, r.Description) ? { description: m(r.description, r.Description) } : {}, ...m(r.descriptionZh, r.DescriptionZh) ? { descriptionZh: m(r.descriptionZh, r.DescriptionZh) } : {}, ...m(r.descriptionEn, r.DescriptionEn) ? { descriptionEn: m(r.descriptionEn, r.DescriptionEn) } : {}, ...m(r.iconUrl, r.IconURL) ? { iconUrl: m(r.iconUrl, r.IconURL) } : {}, ...Xe(r.contextWindow, r.ContextWindow) !== void 0 ? { contextWindow: Xe(r.contextWindow, r.ContextWindow) } : {}, ...E(r.maxInputTokens, r.MaxInputTokens) !== void 0 ? { maxInputTokens: E(r.maxInputTokens, r.MaxInputTokens) } : {}, ...E(r.maxOutputTokens, r.MaxOutputTokens) !== void 0 ? { maxOutputTokens: E(r.maxOutputTokens, r.MaxOutputTokens) } : {}, ...Qe((_b2 = r.modalities) != null ? _b2 : r.Modalities) ? { modalities: Qe((_c2 = r.modalities) != null ? _c2 : r.Modalities) } : {}, ...Ze((_d2 = r.capabilities) != null ? _d2 : r.Capabilities) ? { capabilities: Ze((_e3 = r.capabilities) != null ? _e3 : r.Capabilities) } : {}, enabled: n, ...i !== void 0 ? { disabled: i } : {}, ...k(r.isDefault, r.IsDefault) !== void 0 ? { isDefault: k(r.isDefault, r.IsDefault) } : {}, ...E(r.sortOrder, r.SortOrder) !== void 0 ? { sortOrder: E(r.sortOrder, r.SortOrder) } : {}, ...et((_f2 = r.pricing) != null ? _f2 : r.Pricing) ? { pricing: et((_g2 = r.pricing) != null ? _g2 : r.Pricing) } : {}, ...m(r.credits, r.Credits) ? { credits: m(r.credits, r.Credits) } : {}, ...E(r.maxAllowedSize, r.MaxAllowedSize) !== void 0 ? { maxAllowedSize: E(r.maxAllowedSize, r.MaxAllowedSize) } : {}, ...k(r.disabledMultimodal, r.DisabledMultimodal) !== void 0 ? { disabledMultimodal: k(r.disabledMultimodal, r.DisabledMultimodal) } : {}, ...k(r.supportsImages, r.SupportsImages) !== void 0 ? { supportsImages: k(r.supportsImages, r.SupportsImages) } : {}, ...k(r.supportsToolCall, r.SupportsToolCall) !== void 0 ? { supportsToolCall: k(r.supportsToolCall, r.SupportsToolCall) } : {}, ...k(r.supportsReasoning, r.SupportsReasoning) !== void 0 ? { supportsReasoning: k(r.supportsReasoning, r.SupportsReasoning) } : {}, ...k(r.onlyReasoning, r.OnlyReasoning) !== void 0 ? { onlyReasoning: k(r.onlyReasoning, r.OnlyReasoning) } : {}, ...tt((_h2 = r.reasoning) != null ? _h2 : r.Reasoning) ? { reasoning: tt((_i2 = r.reasoning) != null ? _i2 : r.Reasoning) } : {}, ...E(r.temperature, r.Temperature) !== void 0 ? { temperature: E(r.temperature, r.Temperature) } : {}, ...E(r.top_k, r.Top_K) !== void 0 ? { top_k: E(r.top_k, r.Top_K) } : {}, ...E(r.top_p, r.Top_P) !== void 0 ? { top_p: E(r.top_p, r.Top_P) } : {}, ...E(r.repetition_penalty, r.Repetition_Penalty) !== void 0 ? { repetition_penalty: E(r.repetition_penalty, r.Repetition_Penalty) } : {} };
  }
  a(Wt, "normalizeModel");
  function ve(r) {
    return r.name || r.id;
  }
  a(ve, "getModelDisplayName");
  function Pe(r, e) {
    var _a2;
    return (_a2 = r.capabilities) == null ? void 0 : _a2[e];
  }
  a(Pe, "getModelCapability");
  var de = (_n = class {
    constructor(e, t) {
      __publicField(this, "baseUrl");
      __publicField(this, "fetch");
      this.baseUrl = e, this.fetch = t;
    }
    async list(e) {
      var _a2;
      let t;
      try {
        t = await this.fetch(`${this.baseUrl}/models`, { method: "GET", headers: { Accept: "application/json" }, signal: e });
      } catch (c) {
        throw c instanceof Error && c.name === "AbortError" ? c : new x({ message: `Network error: ${(_a2 = c == null ? void 0 : c.message) != null ? _a2 : "unknown"}`, type: "server_error", param: null, code: "gateway_network_error" }, { cause: c });
      }
      if (!t.ok) throw await _e(t);
      let s = await t.text(), n;
      try {
        n = JSON.parse(s);
      } catch {
        throw new x({ message: "Failed to parse models response: invalid JSON", type: "server_error", param: null, code: "gateway_invalid_response" });
      }
      let i = Array.isArray(n) ? n : Array.isArray(n == null ? void 0 : n.data) ? n.data : [], o = [];
      for (let c of i) {
        let u = Wt(c);
        u && o.push(u);
      }
      return o;
    }
  }, a(_n, "ModelsAPI"), _n);
  async function _e(r) {
    var _a2;
    let e = await r.text().catch(() => ""), t;
    try {
      let i = JSON.parse(e);
      if (i && typeof i == "object" && i.error) {
        let o = i.error;
        t = { message: typeof o.message == "string" ? o.message : `HTTP ${r.status}`, type: typeof o.type == "string" ? o.type : "server_error", param: o.param === void 0 ? null : o.param, code: o.code === void 0 ? null : o.code };
      } else t = { message: typeof i == "string" ? i : `HTTP ${r.status}`, type: "server_error", param: null, code: null };
    } catch {
      t = { message: e || `HTTP ${r.status}`, type: "server_error", param: null, code: null };
    }
    let s = (_a2 = r.headers.get("x-request-id")) != null ? _a2 : void 0, n = Ye(r.headers.get("retry-after"));
    return new x(t, { status: r.status, requestId: s, retryAfterMs: n });
  }
  a(_e, "httpError");
  var le = (_o = class {
    constructor() {
      __publicField(this, "codePoint", 0);
      __publicField(this, "bytesNeeded", 0);
      __publicField(this, "bytesSeen", 0);
      __publicField(this, "lowerBoundary", 128);
      __publicField(this, "upperBoundary", 191);
      __publicField(this, "bomSeen", false);
      __publicField(this, "streaming", false);
    }
    resetSequence() {
      this.codePoint = 0, this.bytesNeeded = 0, this.bytesSeen = 0, this.lowerBoundary = 128, this.upperBoundary = 191;
    }
    decode(e = new Uint8Array(), t = {}) {
      this.streaming || (this.resetSequence(), this.bomSeen = false), this.streaming = t.stream === true;
      let s = "", n = a((i) => {
        !this.bomSeen && (this.bomSeen = true, i === 65279) || (s += String.fromCodePoint(i));
      }, "emit");
      for (let i = 0; i < e.length; i++) {
        let o = e[i];
        if (this.bytesNeeded === 0) {
          o <= 127 ? n(o) : o >= 194 && o <= 223 ? (this.bytesNeeded = 1, this.codePoint = o & 31) : o >= 224 && o <= 239 ? (this.bytesNeeded = 2, this.codePoint = o & 15, o === 224 && (this.lowerBoundary = 160), o === 237 && (this.upperBoundary = 159)) : o >= 240 && o <= 244 ? (this.bytesNeeded = 3, this.codePoint = o & 7, o === 240 && (this.lowerBoundary = 144), o === 244 && (this.upperBoundary = 143)) : n(65533);
          continue;
        }
        if (o < this.lowerBoundary || o > this.upperBoundary) {
          this.resetSequence(), n(65533), i--;
          continue;
        }
        this.lowerBoundary = 128, this.upperBoundary = 191, this.codePoint = this.codePoint << 6 | o & 63, this.bytesSeen++, this.bytesSeen === this.bytesNeeded && (n(this.codePoint), this.resetSequence());
      }
      return !this.streaming && this.bytesNeeded > 0 && (n(65533), this.resetSequence()), s;
    }
  }, a(_o, "Utf8Decoder"), _o);
  var Kt = (_p = class {
    constructor() {
      __publicField(this, "event", null);
      __publicField(this, "dataParts", []);
    }
    decode(e) {
      let t = e;
      if (t.endsWith("\r") && (t = t.slice(0, -1)), t === "") {
        if (this.event === null && this.dataParts.length === 0) return null;
        let o = { event: this.event, data: this.dataParts.join(`
`) };
        return this.event = null, this.dataParts = [], o;
      }
      if (t.startsWith(":")) return null;
      let s = t.indexOf(":"), n, i;
      if (s === -1) n = t, i = "";
      else {
        n = t.slice(0, s);
        let o = t.slice(s + 1);
        o.startsWith(" ") && (o = o.slice(1)), i = o;
      }
      return n === "event" ? this.event = i : n === "data" && this.dataParts.push(i), null;
    }
    flush() {
      if (this.event === null && this.dataParts.length === 0) return null;
      let e = { event: this.event, data: this.dataParts.join(`
`) };
      return this.event = null, this.dataParts = [], e;
    }
  }, a(_p, "SSEDecoder"), _p), zt = (_q = class {
    constructor() {
      __publicField(this, "buffer", new Uint8Array());
      __publicField(this, "decoder");
      this.decoder = typeof TextDecoder > "u" ? new le() : new TextDecoder("utf-8");
    }
    decode(e) {
      let t = new Uint8Array(this.buffer.length + e.length);
      t.set(this.buffer), t.set(e, this.buffer.length), this.buffer = t;
      let s = [], n = 0;
      for (let i = 0; i < this.buffer.length; i++) if (this.buffer[i] === 10 || this.buffer[i] === 13) {
        let o = this.buffer.subarray(n, i), c = this.decoder.decode(o, { stream: true });
        s.push(c), this.buffer[i] === 13 && i + 1 < this.buffer.length && this.buffer[i + 1] === 10 && i++, n = i + 1;
      }
      return n > 0 && (this.buffer = this.buffer.slice(n)), s;
    }
    flush() {
      if (this.buffer.length === 0) {
        let t = this.decoder.decode();
        return t ? [t] : [];
      }
      let e = this.decoder.decode(this.buffer, { stream: false });
      return this.buffer = new Uint8Array(), e ? [e] : [];
    }
  }, a(_q, "LineDecoder"), _q), rt = "[DONE]";
  async function* st(r, e) {
    let t = new Kt(), s = new zt(), n = r.getReader(), i = false, o = a(() => {
      i = true, n.cancel().catch(() => {
      });
    }, "onAbort");
    if (e) {
      if (e.aborted) return;
      e.addEventListener("abort", o, { once: true });
    }
    try {
      for (; ; ) {
        if (i) return;
        let u;
        try {
          u = await n.read();
        } catch (f) {
          if (i || f instanceof Error && f.name === "AbortError") return;
          throw f;
        }
        let { done: d, value: l } = u;
        if (d) break;
        for (let f of s.decode(l)) {
          let g = t.decode(f);
          g && (yield g);
        }
      }
      for (let u of s.flush()) {
        let d = t.decode(u);
        d && (yield d);
      }
      let c = t.flush();
      c && (yield c);
    } finally {
      e && e.removeEventListener("abort", o);
      try {
        n.releaseLock();
      } catch {
      }
    }
  }
  a(st, "iterSSEEvents");
  function Vt(r, e) {
    var _a2;
    let t = e ? { requestId: e } : {};
    try {
      let s = JSON.parse(r);
      if (s && typeof s == "object") {
        let n = (_a2 = s.error) != null ? _a2 : s;
        if (n && typeof n == "object") return new x({ message: typeof n.message == "string" ? n.message : "Stream error", type: typeof n.type == "string" ? n.type : "server_error", param: n.param === void 0 ? null : n.param, code: n.code === void 0 ? null : n.code }, t);
      }
    } catch {
    }
    return new x({ message: r || "Stream error", type: "server_error", param: null, code: null }, t);
  }
  a(Vt, "extractSSEError");
  var he = (_r = class {
    constructor(e, t) {
      __publicField(this, "baseUrl");
      __publicField(this, "fetch");
      this.baseUrl = e, this.fetch = t;
    }
    create(e) {
      if (e.stream !== true) throw new x({ message: "stream must be true; non-streaming chat completions are not supported", type: "invalid_request_error", param: "stream", code: "request_stream_required" });
      return this.createStreaming(e);
    }
    async *createStreaming(e) {
      var _a2, _b2, _c2;
      let { signal: t, conversationId: s, ...n } = e;
      n.stream = true;
      let i;
      try {
        i = await this.fetch(`${this.baseUrl}/chat/completions`, { method: "POST", headers: { Accept: "text/event-stream", "Content-Type": "application/json", ...s !== void 0 ? { "X-Conversation-ID": s } : {} }, body: JSON.stringify(n), signal: t });
      } catch (d) {
        if (d instanceof Error && d.name === "AbortError") return;
        throw new x({ message: `Network error: ${(_a2 = d == null ? void 0 : d.message) != null ? _a2 : "unknown"}`, type: "server_error", param: null, code: "gateway_network_error" }, { cause: d });
      }
      if (!i.ok) throw await _e(i);
      if (!i.body) throw new x({ message: "Response body is empty \u2014 streaming not supported", type: "server_error", param: null, code: "gateway_invalid_response" }, { requestId: (_b2 = i.headers.get("x-request-id")) != null ? _b2 : void 0 });
      let o = (_c2 = i.headers.get("x-request-id")) != null ? _c2 : void 0, c = false, u = false;
      try {
        for await (let d of st(i.body, t)) {
          if (d.event === "error") throw u = true, Vt(d.data, o);
          if (d.event === null || d.event === "") {
            if (d.data === rt) {
              c = true;
              return;
            }
            if (!d.data) continue;
            let l;
            try {
              l = JSON.parse(d.data);
            } catch {
              throw u = true, new x({ message: `Failed to parse SSE data: ${d.data}`, type: "server_error", param: null, code: "gateway_invalid_response" }, { requestId: o });
            }
            if (l && typeof l == "object" && "error" in l) {
              u = true;
              let f = l.error;
              throw new x({ message: typeof (f == null ? void 0 : f.message) == "string" ? f.message : "Stream error", type: typeof (f == null ? void 0 : f.type) == "string" ? f.type : "server_error", param: (f == null ? void 0 : f.param) === void 0 ? null : f.param, code: (f == null ? void 0 : f.code) === void 0 ? null : f.code }, { requestId: o });
            }
            yield l;
          }
        }
      } catch (d) {
        if (d instanceof Error && d.name === "AbortError") return;
        throw u = true, d;
      }
      if (!c && !u && !(t == null ? void 0 : t.aborted)) throw new x({ message: "\u6D41\u5F0F\u54CD\u5E94\u4E2D\u65AD\u3002", type: "server_error", param: null, code: "gateway_stream_interrupted" }, { requestId: o });
    }
  }, a(_r, "ChatCompletionsAPI"), _r);
  var F = (_s = class {
    constructor(e, t) {
      __publicField(this, "fetch");
      __publicField(this, "baseUrl");
      __publicField(this, "models");
      __publicField(this, "chat");
      this.fetch = t, this.baseUrl = `${e.endpoint}${A.llm}`, this.models = new de(this.baseUrl, this.fetch), this.chat = { completions: new he(this.baseUrl, this.fetch) };
    }
  }, a(_s, "LlmModule"), _s);
  var B = (_t2 = class extends Error {
    constructor(e, t = "storage", s, n) {
      super(e);
      __publicField(this, "__isStorageError", true);
      __publicField(this, "namespace");
      __publicField(this, "status");
      __publicField(this, "statusCode");
      this.namespace = t, this.name = t === "vectors" ? "StorageVectorsError" : "StorageError", this.status = s, this.statusCode = n;
    }
    toJSON() {
      return { name: this.name, message: this.message, status: this.status, statusCode: this.statusCode };
    }
  }, a(_t2, "StorageError"), _t2);
  function $(r) {
    return typeof r == "object" && r !== null && "__isStorageError" in r;
  }
  a($, "isStorageError");
  var L = (_u = class extends B {
    constructor(e, t, s, n = "storage", i) {
      super(e, n, t, s);
      __publicField(this, "status");
      __publicField(this, "statusCode");
      __publicField(this, "code");
      this.name = n === "vectors" ? "StorageVectorsApiError" : "StorageApiError", this.status = t, this.statusCode = s, this.code = i;
    }
    toJSON() {
      return { ...super.toJSON(), code: this.code };
    }
  }, a(_u, "StorageApiError"), _u), M = (_v = class extends B {
    constructor(e, t, s = "storage") {
      super(e, s);
      __publicField(this, "originalError");
      this.name = s === "vectors" ? "StorageVectorsUnknownError" : "StorageUnknownError", this.originalError = t;
    }
  }, a(_v, "StorageUnknownError"), _v);
  function C(r, e, t) {
    let s = { ...r }, n = e.toLowerCase();
    for (let i of Object.keys(s)) i.toLowerCase() === n && delete s[i];
    return s[n] = t, s;
  }
  a(C, "setHeader");
  function nt(r) {
    let e = {};
    for (let [t, s] of Object.entries(r)) e[t.toLowerCase()] = s;
    return e;
  }
  a(nt, "normalizeHeaders");
  var it = a((r) => r ? (...e) => r(...e) : (...e) => fetch(...e), "resolveFetch");
  var ot = a((r) => {
    if (typeof r != "object" || r === null) return false;
    let e = Object.getPrototypeOf(r);
    return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in r) && !(Symbol.iterator in r);
  }, "isPlainObject"), fe = a((r) => {
    if (Array.isArray(r)) return r.map((t) => fe(t));
    if (typeof r == "function" || r !== Object(r)) return r;
    let e = {};
    return Object.entries(r).forEach(([t, s]) => {
      let n = t.replace(/([-_][a-z])/gi, (i) => i.toUpperCase().replace(/[-_]/g, ""));
      e[n] = fe(s);
    }), e;
  }, "recursiveToCamel");
  var at = a((r) => r.split("/").map(encodeURIComponent).join("/"), "encodeStoragePath");
  var ct = a((r) => {
    if (typeof r == "object" && r !== null) {
      let e = r;
      if (typeof e.msg == "string") return e.msg;
      if (typeof e.message == "string") return e.message;
      if (typeof e.error_description == "string") return e.error_description;
      if (typeof e.error == "string") return e.error;
      if (typeof e.error == "object" && e.error !== null) {
        let t = e.error;
        if (typeof t.message == "string") return t.message;
      }
    }
    return JSON.stringify(r);
  }, "_getErrorMessage"), Gt = a(async (r, e, t, s) => {
    if (r !== null && typeof r == "object" && "json" in r && typeof r.json == "function") {
      let i = r, o = parseInt(String(i.status), 10);
      Number.isFinite(o) || (o = 500), i.json().then((c) => {
        let u = (c == null ? void 0 : c.statusCode) || (c == null ? void 0 : c.code) || o + "";
        e(new L(ct(c), o, u, s, c == null ? void 0 : c.code));
      }).catch(() => {
        let c = o + "", u = i.statusText || `HTTP ${o} error`;
        e(new L(u, o, c, s));
      });
    } else e(new M(ct(r), r, s));
  }, "handleError"), Jt = a((r, e, t, s) => {
    let n = { method: r, headers: (e == null ? void 0 : e.headers) || {} };
    if (r === "GET" || r === "HEAD" || !s) return { ...n, ...t };
    if (ot(s)) {
      let i = (e == null ? void 0 : e.headers) || {}, o;
      for (let [c, u] of Object.entries(i)) c.toLowerCase() === "content-type" && (o = u);
      n.headers = C(i, "Content-Type", o != null ? o : "application/json"), n.body = JSON.stringify(s);
    } else n.body = s;
    return (e == null ? void 0 : e.duplex) && (n.duplex = e.duplex), { ...n, ...t };
  }, "_getRequestParams");
  async function J(r, e, t, s, n, i, o) {
    return new Promise((c, u) => {
      r(t, Jt(e, s, n, i)).then((d) => {
        if (!d.ok) throw d;
        if (s == null ? void 0 : s.noResolveJson) return d;
        if (o === "vectors") {
          let l = d.headers.get("content-type");
          if (d.headers.get("content-length") === "0" || d.status === 204) return {};
          if (!l || !l.includes("application/json")) return {};
        }
        return d.json();
      }).then((d) => c(d)).catch((d) => Gt(d, u, s, o));
    });
  }
  a(J, "_handleRequest");
  function ut(r = "storage") {
    return { get: a(async (e, t, s, n) => J(e, "GET", t, s, n, void 0, r), "get"), post: a(async (e, t, s, n, i) => J(e, "POST", t, n, i, s, r), "post"), put: a(async (e, t, s, n, i) => J(e, "PUT", t, n, i, s, r), "put"), head: a(async (e, t, s, n) => J(e, "HEAD", t, { ...s, noResolveJson: true }, n, void 0, r), "head"), remove: a(async (e, t, s, n, i) => J(e, "DELETE", t, n, i, s, r), "remove") };
  }
  a(ut, "createFetchApi");
  var Yt = ut("storage"), { get: Te, post: R, put: Oe, head: dt, remove: Ae } = Yt, $s = ut("vectors");
  var Y = (_w = class {
    constructor(e, t = {}, s, n = "storage") {
      __publicField(this, "url");
      __publicField(this, "headers");
      __publicField(this, "fetch");
      __publicField(this, "shouldThrowOnError", false);
      __publicField(this, "namespace");
      this.url = e, this.headers = nt(t), this.fetch = it(s), this.namespace = n;
    }
    throwOnError() {
      return this.shouldThrowOnError = true, this;
    }
    setHeader(e, t) {
      return this.headers = C(this.headers, e, t), this;
    }
    async handleOperation(e) {
      try {
        return { data: await e(), error: null };
      } catch (t) {
        if (this.shouldThrowOnError) throw t;
        if ($(t)) return { data: null, error: t };
        throw t;
      }
    }
  }, a(_w, "BaseApiClient"), _w);
  var X = (_x = Symbol.toStringTag, _y = class {
    constructor(e, t) {
      __publicField(this, "downloadFn");
      __publicField(this, "shouldThrowOnError");
      __publicField(this, _x, "StreamDownloadBuilder");
      __publicField(this, "promise", null);
      this.downloadFn = e, this.shouldThrowOnError = t;
    }
    then(e, t) {
      return this.getPromise().then(e, t);
    }
    catch(e) {
      return this.getPromise().catch(e);
    }
    finally(e) {
      return this.getPromise().finally(e);
    }
    getPromise() {
      return this.promise || (this.promise = this.execute()), this.promise;
    }
    async execute() {
      try {
        return { data: (await this.downloadFn()).body, error: null };
      } catch (e) {
        if (this.shouldThrowOnError) throw e;
        if ($(e)) return { data: null, error: e };
        throw e;
      }
    }
  }, a(_y, "StreamDownloadBuilder"), _y);
  var Q = (_z = Symbol.toStringTag, _A = class {
    constructor(e, t) {
      __publicField(this, "downloadFn");
      __publicField(this, "shouldThrowOnError");
      __publicField(this, _z, "BlobDownloadBuilder");
      __publicField(this, "promise", null);
      this.downloadFn = e, this.shouldThrowOnError = t;
    }
    asStream() {
      return new X(this.downloadFn, this.shouldThrowOnError);
    }
    then(e, t) {
      return this.getPromise().then(e, t);
    }
    catch(e) {
      return this.getPromise().catch(e);
    }
    finally(e) {
      return this.getPromise().finally(e);
    }
    getPromise() {
      return this.promise || (this.promise = this.execute()), this.promise;
    }
    async execute() {
      try {
        return { data: await (await this.downloadFn()).blob(), error: null };
      } catch (e) {
        if (this.shouldThrowOnError) throw e;
        if ($(e)) return { data: null, error: e };
        throw e;
      }
    }
  }, a(_A, "BlobDownloadBuilder"), _A);
  var Re = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } }, lt = { cacheControl: "3600", contentType: "text/plain;charset=UTF-8", upsert: false }, Z = (_B = class extends Y {
    constructor(e, t = {}, s, n) {
      super(e, t, n, "storage");
      __publicField(this, "bucketId");
      this.bucketId = s;
    }
    async uploadOrUpdate(e, t, s, n) {
      return this.handleOperation(async () => {
        let i, o = { ...lt, ...n }, c = { ...this.headers, ...e === "POST" && { "x-upsert": String(o.upsert) } }, u = o.metadata;
        if (typeof Blob < "u" && s instanceof Blob ? (i = new FormData(), i.append("cacheControl", o.cacheControl), u && i.append("metadata", this.encodeMetadata(u)), i.append("", s)) : typeof FormData < "u" && s instanceof FormData ? (i = s, i.has("cacheControl") || i.append("cacheControl", o.cacheControl), u && !i.has("metadata") && i.append("metadata", this.encodeMetadata(u))) : (i = s, c["cache-control"] = `max-age=${o.cacheControl}`, c["content-type"] = o.contentType, u && (c["x-metadata"] = this.toBase64(this.encodeMetadata(u))), (typeof ReadableStream < "u" && i instanceof ReadableStream || i && typeof i == "object" && "pipe" in i && typeof i.pipe == "function") && !o.duplex && (o.duplex = "half")), n == null ? void 0 : n.headers) for (let [g, y] of Object.entries(n.headers)) c = C(c, g, y);
        let d = this._removeEmptyFolders(t), l = this._getFinalPath(d), f = await (e == "PUT" ? Oe : R)(this.fetch, `${this.url}/object/${l}`, i, { headers: c, ...(o == null ? void 0 : o.duplex) ? { duplex: o.duplex } : {} });
        return { path: d, id: f.Id, fullPath: f.Key };
      });
    }
    async upload(e, t, s) {
      return this.uploadOrUpdate("POST", e, t, s);
    }
    async uploadToSignedUrl(e, t, s, n) {
      let i = this._removeEmptyFolders(e), o = this._getFinalPath(i), c = new URL(this.url + `/object/upload/sign/${o}`);
      return c.searchParams.set("token", t), this.handleOperation(async () => {
        let u, d = { ...lt, ...n }, l = { ...this.headers, "x-upsert": String(d.upsert) }, f = d.metadata;
        if (typeof Blob < "u" && s instanceof Blob ? (u = new FormData(), u.append("cacheControl", d.cacheControl), f && u.append("metadata", this.encodeMetadata(f)), u.append("", s)) : typeof FormData < "u" && s instanceof FormData ? (u = s, u.has("cacheControl") || u.append("cacheControl", d.cacheControl), f && !u.has("metadata") && u.append("metadata", this.encodeMetadata(f))) : (u = s, l["cache-control"] = `max-age=${d.cacheControl}`, l["content-type"] = d.contentType, f && (l["x-metadata"] = this.toBase64(this.encodeMetadata(f))), (typeof ReadableStream < "u" && u instanceof ReadableStream || u && typeof u == "object" && "pipe" in u && typeof u.pipe == "function") && !d.duplex && (d.duplex = "half")), n == null ? void 0 : n.headers) for (let [y, se] of Object.entries(n.headers)) l = C(l, y, se);
        let g = await Oe(this.fetch, c.toString(), u, { headers: l, ...(d == null ? void 0 : d.duplex) ? { duplex: d.duplex } : {} });
        return { path: i, fullPath: g.Key };
      });
    }
    async createSignedUploadUrl(e, t) {
      return this.handleOperation(async () => {
        let s = this._getFinalPath(e), n = { ...this.headers };
        (t == null ? void 0 : t.upsert) && (n["x-upsert"] = "true");
        let i = await R(this.fetch, `${this.url}/object/upload/sign/${s}`, {}, { headers: n }), o = new URL(this.url + i.url), c = o.searchParams.get("token");
        if (!c) throw new B("No token returned by API");
        return { signedUrl: o.toString(), path: e, token: c };
      });
    }
    async update(e, t, s) {
      return this.uploadOrUpdate("PUT", e, t, s);
    }
    async move(e, t, s) {
      return this.handleOperation(async () => await R(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: e, destinationKey: t, destinationBucket: s == null ? void 0 : s.destinationBucket }, { headers: this.headers }));
    }
    async copy(e, t, s) {
      return this.handleOperation(async () => ({ path: (await R(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: e, destinationKey: t, destinationBucket: s == null ? void 0 : s.destinationBucket }, { headers: this.headers })).Key }));
    }
    async createSignedUrl(e, t, s) {
      return this.handleOperation(async () => {
        let n = this._getFinalPath(e), i = typeof (s == null ? void 0 : s.transform) == "object" && s.transform !== null && Object.keys(s.transform).length > 0, o = await R(this.fetch, `${this.url}/object/sign/${n}`, { expiresIn: t, ...i ? { transform: s.transform } : {} }, { headers: this.headers }), c = new URLSearchParams();
        (s == null ? void 0 : s.download) && c.set("download", s.download === true ? "" : s.download), (s == null ? void 0 : s.cacheNonce) != null && c.set("cacheNonce", String(s.cacheNonce));
        let u = c.toString();
        return { signedUrl: encodeURI(`${this.url}${o.signedURL}${u ? `&${u}` : ""}`) };
      });
    }
    async createSignedUrls(e, t, s) {
      return this.handleOperation(async () => {
        let n = await R(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn: t, paths: e }, { headers: this.headers }), i = new URLSearchParams();
        (s == null ? void 0 : s.download) && i.set("download", s.download === true ? "" : s.download), (s == null ? void 0 : s.cacheNonce) != null && i.set("cacheNonce", String(s.cacheNonce));
        let o = i.toString();
        return n.map((c) => ({ ...c, signedUrl: c.signedURL ? encodeURI(`${this.url}${c.signedURL}${o ? `&${o}` : ""}`) : null }));
      });
    }
    download(e, t, s) {
      let i = typeof (t == null ? void 0 : t.transform) == "object" && t.transform !== null && Object.keys(t.transform).length > 0 ? "render/image/authenticated" : "object", o = new URLSearchParams();
      (t == null ? void 0 : t.transform) && this.applyTransformOptsToQuery(o, t.transform), (t == null ? void 0 : t.cacheNonce) != null && o.set("cacheNonce", String(t.cacheNonce));
      let c = o.toString(), u = this._getFinalPath(e), d = a(() => Te(this.fetch, `${this.url}/${i}/${u}${c ? `?${c}` : ""}`, { headers: this.headers, noResolveJson: true }, s), "downloadFn");
      return new Q(d, this.shouldThrowOnError);
    }
    async info(e) {
      let t = this._getFinalPath(e);
      return this.handleOperation(async () => {
        let s = await Te(this.fetch, `${this.url}/object/info/${t}`, { headers: this.headers });
        return fe(s);
      });
    }
    async exists(e) {
      var _a2;
      let t = this._getFinalPath(e);
      try {
        return await dt(this.fetch, `${this.url}/object/${t}`, { headers: this.headers }), { data: true, error: null };
      } catch (s) {
        if (this.shouldThrowOnError) throw s;
        if ($(s)) {
          let n = s instanceof L ? s.status : s instanceof M ? (_a2 = s.originalError) == null ? void 0 : _a2.status : void 0;
          if (n !== void 0 && [400, 404].includes(n)) return { data: false, error: s };
        }
        throw s;
      }
    }
    getPublicUrl(e, t) {
      let s = this._getFinalPath(e), n = new URLSearchParams();
      (t == null ? void 0 : t.download) && n.set("download", t.download === true ? "" : t.download), (t == null ? void 0 : t.transform) && this.applyTransformOptsToQuery(n, t.transform), (t == null ? void 0 : t.cacheNonce) != null && n.set("cacheNonce", String(t.cacheNonce));
      let i = n.toString(), c = typeof (t == null ? void 0 : t.transform) == "object" && t.transform !== null && Object.keys(t.transform).length > 0 ? "render/image" : "object";
      return { data: { publicUrl: encodeURI(`${this.url}/${c}/public/${s}`) + (i ? `?${i}` : "") } };
    }
    async remove(e) {
      return this.handleOperation(async () => await Ae(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: e }, { headers: this.headers }));
    }
    async purgeCache(e, t, s) {
      return this.handleOperation(async () => {
        let n = at(this._getFinalPath(e)), i = new URLSearchParams();
        (t == null ? void 0 : t.transformations) && i.set("transformations", "true");
        let o = i.toString();
        return await Ae(this.fetch, `${this.url}/cdn/${n}${o ? `?${o}` : ""}`, {}, { headers: this.headers }, s);
      });
    }
    async list(e, t, s) {
      return this.handleOperation(async () => {
        let n = (t == null ? void 0 : t.sortBy) ? { ...Re.sortBy, ...t.sortBy } : Re.sortBy, i = { ...Re, ...t, sortBy: n, prefix: e || "" };
        return await R(this.fetch, `${this.url}/object/list/${this.bucketId}`, i, { headers: this.headers }, s);
      });
    }
    async listV2(e, t) {
      return this.handleOperation(async () => {
        let s = { ...e };
        return await R(this.fetch, `${this.url}/object/list-v2/${this.bucketId}`, s, { headers: this.headers }, t);
      });
    }
    encodeMetadata(e) {
      return JSON.stringify(e);
    }
    toBase64(e) {
      return typeof Buffer < "u" ? Buffer.from(e).toString("base64") : btoa(e);
    }
    _getFinalPath(e) {
      return `${this.bucketId}/${e.replace(/^\/+/, "")}`;
    }
    _removeEmptyFolders(e) {
      return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
    }
    applyTransformOptsToQuery(e, t) {
      return t.width && e.set("width", t.width.toString()), t.height && e.set("height", t.height.toString()), t.resize && e.set("resize", t.resize), t.format && e.set("format", t.format), t.quality && e.set("quality", t.quality.toString()), e;
    }
  }, a(_B, "StorageFileApi"), _B);
  var ht = "2.112.3";
  var ft = { "X-Client-Info": `storage-js/${ht}` };
  var q = "runtime", pe = 600, me = 3600, b = (_C = class extends Error {
    constructor(e) {
      super(e), this.name = "CloudStoragePathError";
    }
  }, a(_C, "CloudStoragePathError"), _C), ee = (_D = Symbol.toStringTag, _E = class {
    constructor(e, t) {
      __publicField(this, "blob");
      __publicField(this, "stream");
      __publicField(this, _D, "WorkBuddyStorageDownload");
      this.blob = e, this.stream = t;
    }
    asStream() {
      return this.stream();
    }
    then(e, t) {
      return this.blob().then(e, t);
    }
    catch(e) {
      return this.blob().catch(e);
    }
    finally(e) {
      return this.blob().finally(e);
    }
  }, a(_E, "WorkBuddyStorageDownload"), _E), H = (_F = class {
    constructor(e) {
      __publicField(this, "fileApi");
      this.fileApi = e;
    }
    upload(e, t, s) {
      return P(this.fileApi.upload(v(e), t, s));
    }
    update(e, t, s) {
      return P(this.fileApi.update(v(e), t, s));
    }
    list(e = "", t) {
      return P(this.fileApi.list(mt(e), t));
    }
    listPage(e) {
      var _a2;
      return P(this.fileApi.listV2({ ...e, prefix: mt((_a2 = e == null ? void 0 : e.prefix) != null ? _a2 : "") }));
    }
    info(e) {
      return P(this.fileApi.info(v(e)));
    }
    async exists(e) {
      let t = await this.fileApi.exists(v(e));
      return t.error ? { data: null, error: bt(t.error) } : { data: t.data, error: null };
    }
    download(e) {
      let t = this.fileApi.download(v(e));
      return new ee(() => P(t), () => P(t.asStream()));
    }
    remove(e) {
      if (e.length === 0) throw new b("remove requires at least one object path.");
      return P(this.fileApi.remove(e.map(v)));
    }
    copy(e, t) {
      return P(this.fileApi.copy(v(e), v(t)));
    }
    move(e, t) {
      return P(this.fileApi.move(v(e), v(t)));
    }
    createSignedUrl(e, t = pe) {
      return P(this.fileApi.createSignedUrl(v(e), gt(t)));
    }
    createSignedUrls(e, t = pe) {
      if (e.length === 0) throw new b("createSignedUrls requires at least one object path.");
      return P(this.fileApi.createSignedUrls(e.map(v), gt(t)));
    }
    createSignedUploadUrl(e, t) {
      var _a2;
      return P(this.fileApi.createSignedUploadUrl(v(e), { upsert: (_a2 = t == null ? void 0 : t.upsert) != null ? _a2 : false }));
    }
    uploadToSignedUrl(e, t, s, n) {
      if (!t) throw new b("signed upload token is required.");
      return P(this.fileApi.uploadToSignedUrl(v(e), t, s, n));
    }
  }, a(_F, "WorkBuddyStorageBucket"), _F), te = (_G = class extends H {
    constructor(e) {
      let s = e.from(q);
      super(s);
      __publicField(this, "runtime");
      this.runtime = new H(s);
    }
    from(e = q) {
      if (e !== q) throw new b(`Only the "${q}" storage bucket is available.`);
      return this.runtime;
    }
    userPath(e, t) {
      return pt("users", e, t);
    }
    sharedPath(e, t) {
      return pt("shared", e, t);
    }
  }, a(_G, "WorkBuddyStorageModule"), _G);
  function yt(r, e) {
    let t = { from: a((s) => new Z(`${r.endpoint}${A.storage}`, ft, s, e), "from") };
    return new te(t);
  }
  a(yt, "createStorageModule");
  function pt(r, e, t) {
    let s = Xt(e, "owner/user id"), n = $e(t, false);
    return v(`${r}/${s}/${n}`);
  }
  a(pt, "scopedPath");
  function v(r) {
    let e = $e(r, false);
    if (!e.includes("/")) throw new b("Object paths must use users/<uid>/... or shared/<ownerUid>/....");
    let [t, s, ...n] = e.split("/");
    if (t !== "users" && t !== "shared" || !s || n.length === 0) throw new b("Object paths must use users/<uid>/... or shared/<ownerUid>/....");
    return e;
  }
  a(v, "validateObjectPath");
  function mt(r) {
    if (r === "") return "";
    let e = $e(r, true), [t, s] = e.split("/");
    if (t === "shared" && !s) return "shared";
    if (t !== "users" && t !== "shared" || !s) throw new b("List prefixes must start with users/<uid> or shared/<ownerUid>.");
    return e;
  }
  a(mt, "validateObjectPrefix");
  function $e(r, e) {
    if (typeof r != "string" || r.trim() === "") throw new b("Storage path must be a non-empty relative path.");
    let t = r.trim();
    for (let i = 0; i < 3; i += 1) try {
      let o = decodeURIComponent(t);
      if (o === t) break;
      t = o;
    } catch {
      throw new b("Storage path contains invalid URL encoding.");
    }
    if (t.startsWith("/") || t.includes("\\") || t.includes("\0") || t.includes("//") || !e && t.endsWith("/")) throw new b("Storage path is not a safe relative object path.");
    let s = e ? t.replace(/\/+$/, "") : t;
    if (s.split("/").some((i) => i === "" || i === "." || i === "..")) throw new b("Storage path traversal is not allowed.");
    return s;
  }
  a($e, "validatePath");
  function Xt(r, e) {
    if (!r) throw new b(`${e} is not a valid storage path segment.`);
    let t = r;
    for (let s = 0; s < 3; s += 1) try {
      let n = decodeURIComponent(t);
      if (n === t) break;
      t = n;
    } catch {
      throw new b(`${e} contains invalid URL encoding.`);
    }
    if (t.includes("/") || t.includes("\\") || t.includes("\0") || t === "." || t === "..") throw new b(`${e} is not a valid storage path segment.`);
    return t;
  }
  a(Xt, "validatePathSegment");
  function gt(r) {
    if (!Number.isInteger(r) || r <= 0 || r > me) throw new b(`Signed URL expiry must be an integer between 1 and ${me} seconds.`);
    return r;
  }
  a(gt, "validateSignedURLTTL");
  async function P(r) {
    let e = await r;
    return e.error ? { data: null, error: bt(e.error) } : e.data === null ? { data: null, error: { name: "CloudStorageResponseError", message: "Storage API returned neither data nor an error." } } : { data: e.data, error: null };
  }
  a(P, "mapStorageResult");
  function bt(r) {
    if (r instanceof Error) {
      let e = r;
      return { name: e.name, message: e.message, status: e.status, statusCode: e.statusCode, code: e.code, cause: r };
    }
    return { name: "CloudStorageError", message: String(r), cause: r };
  }
  a(bt, "normalizeStorageError");
  var re = (_H = class {
    constructor(e, t = {}) {
      __publicField(this, "config");
      __publicField(this, "database");
      __publicField(this, "auth");
      __publicField(this, "storage");
      __publicField(this, "llm");
      this.config = e, this.auth = new D(e, ye(e, ie), { storage: t.storage });
      let s = ye(e, () => this.auth.getAccessToken());
      this.database = Je(e, s), this.storage = yt(e, s), this.llm = new F(e, s);
    }
    get endpoint() {
      return this.config.endpoint;
    }
    get oauthRelayBaseUrl() {
      return this.config.oauthRelayBaseUrl;
    }
  }, a(_H, "WorkBuddyCloudClient"), _H);
  function wt(r) {
    return new re(Le(r), { storage: r.storage });
  }
  a(wt, "createWorkBuddyCloud");
  function St(r) {
    return r.kind === "unauthenticated" || r.code === "invalid_grant";
  }
  a(St, "shouldClearCredentials");
  return _t(Qt);
})();
