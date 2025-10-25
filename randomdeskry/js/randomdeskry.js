
//init_control();

var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

if (isIOS) {

    window.history.pushState({}, "title", "#");

}

setTimeout(function () { init_control(); }, 700);

//当浏览器窗口大小改变时，设置显示内容的高度  
window.onresize = function () {

    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {

    }
    else {
        //init_control();
        //layer.msg('加载中==');
    }
}


// 点击输入框时滑动到最底端
//$(".input-message").click(function () { setTimeout(function () { $("body").scrollTop($(document).height()); }, 1000) });
//$(".input-message").click(function () { $("#div_msgbox").animate({ "scrollTop": $("#div_msgbox").height() }, 400); $("#div_privmsg").animate({ "scrollTop": $("#div_privmsg").height() }, 400); });


$(".title-left").click(function () { $(".left-main").animate({ "left": "0%" }, 500) });

$(".left-main-pannel,.left-main-pannel_upUserlist").click(function () { $(".left-main").animate({ "left": "-100%" }, 500) });

$(".title-right").click(function () { fun_more(); }); // 更多功能

$(".right-main-pannel").click(function () { $(".right-main").animate({ "left": "100%" }, 500) });

$("#btn_creat").click(function () { $("#btn_inroom").trigger("click"); });

$("#btn_more").click(function () { fun_more(); });

$("#ButtonRandom").click(function () { $("#btn_random").click(); });

$(".btn_Friends").click(function () { $(".title-left").click(); });

var index_more;

//更多功能
function fun_more() {
    var htmlstr = "<div id='more_fun'>" +
        "<button id='more_index' type='button' class='btn btn-success' style='margin: 7px 5px;margin-left:10px;width:85px;'>首页</button>" +
        "<button id='more_msgback' type='button' class='btn btn-success' style='margin: 7px 5px;width:85px;'>消息撤回</button>" +
        "<button id='more_msgclear' type='button' class='btn btn-success' style='margin: 7px 5px;width:85px;'>消息清空</button>" +
        "<button id='more_xf' type='button' class='btn btn-warning' style='margin: 7px 5px;margin-left:10px;width:85px;'>异常注销</button>" +
        "</div>";

    index_more = layer.open({
        type: 1,
        title: "更多功能",
        skin: 'demo-class',
        shadeClose: true,
        closeBtn: 0,
        area: ['295px', '140px'],
        content: htmlstr
    });
    $("#more_xf").click(function () {
        Del_Cookies();
    });
    $("#more_index").click(function () {
        //window.location.href = '/';
        window.open('/default.html');
    });
    $("#more_msgback").click(function () {
        var lastTime = sel_userid ? (pri_lastSendTime[sel_userid] ? (sel_userid + "_" + pri_lastSendTime[sel_userid]) : "") : pub_lastSendTime;
        if (ws && ws.readyState == 1 && lastTime) {
            var lay_index = layer.confirm('是否确定撤回最新消息？', {
                skin: 'demo-class',
                btn: ['确定', '取消']
            }, function () {
                //清除保存的最新消息的时间
                if (lastTime.indexOf('_') != -1) {
                    pri_lastSendTime[sel_userid] = "";
                }
                else {
                    pub_lastSendTime = "";
                }
                layer.close(lay_index);
                //fun_loading(true);
                sendJson('msgrevoke', lastTime, true);//撤回最新的聊天的内容
                layer.msg("撤销成功！");
            });
        }
        else {
            layer.msg("没有可撤销的内容");
        }
    });
    $("#more_msgclear").click(function () {
        var lay_index = layer.confirm('是否确定清除本地缓存消息？', {
            skin: 'demo-class',
            btn: ['确定', '取消']
        }, function () {
            layer.close(lay_index);
            $("#div_msgbox").html("");
            $("#div_privmsg").html("");
        });

    });

}

var swfobject = function () { var D = "undefined", r = "object", S = "Shockwave Flash", W = "ShockwaveFlash.ShockwaveFlash", q = "application/x-shockwave-flash", R = "SWFObjectExprInst", x = "onreadystatechange", O = window, j = document, t = navigator, T = false, U = [h], o = [], N = [], I = [], l, Q, E, B, J = false, a = false, n, G, m = true, M = function () { var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D, ah = t.userAgent.toLowerCase(), Y = t.platform.toLowerCase(), ae = Y ? /win/.test(Y) : /win/.test(ah), ac = Y ? /mac/.test(Y) : /mac/.test(ah), af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, X = !+"\v1", ag = [0, 0, 0], ab = null; if (typeof t.plugins != D && typeof t.plugins[S] == r) { ab = t.plugins[S].description; if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) { T = true; X = false; ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1"); ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10); ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10); ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0 } } else { if (typeof O.ActiveXObject != D) { try { var ad = new ActiveXObject(W); if (ad) { ab = ad.GetVariable("$version"); if (ab) { X = true; ab = ab.split(" ")[1].split(","); ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)] } } } catch (Z) { } } } return { w3: aa, pv: ag, wk: af, ie: X, win: ae, mac: ac } }(), k = function () { if (!M.w3) { return } if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) { f() } if (!J) { if (typeof j.addEventListener != D) { j.addEventListener("DOMContentLoaded", f, false) } if (M.ie && M.win) { j.attachEvent(x, function () { if (j.readyState == "complete") { j.detachEvent(x, arguments.callee); f() } }); if (O == top) { (function () { if (J) { return } try { j.documentElement.doScroll("left") } catch (X) { setTimeout(arguments.callee, 0); return } f() })() } } if (M.wk) { (function () { if (J) { return } if (!/loaded|complete/.test(j.readyState)) { setTimeout(arguments.callee, 0); return } f() })() } s(f) } }(); function f() { if (J) { return } try { var Z = j.getElementsByTagName("body")[0].appendChild(C("span")); Z.parentNode.removeChild(Z) } catch (aa) { return } J = true; var X = U.length; for (var Y = 0; Y < X; Y++) { U[Y]() } } function K(X) { if (J) { X() } else { U[U.length] = X } } function s(Y) { if (typeof O.addEventListener != D) { O.addEventListener("load", Y, false) } else { if (typeof j.addEventListener != D) { j.addEventListener("load", Y, false) } else { if (typeof O.attachEvent != D) { i(O, "onload", Y) } else { if (typeof O.onload == "function") { var X = O.onload; O.onload = function () { X(); Y() } } else { O.onload = Y } } } } } function h() { if (T) { V() } else { H() } } function V() { var X = j.getElementsByTagName("body")[0]; var aa = C(r); aa.setAttribute("type", q); var Z = X.appendChild(aa); if (Z) { var Y = 0; (function () { if (typeof Z.GetVariable != D) { var ab = Z.GetVariable("$version"); if (ab) { ab = ab.split(" ")[1].split(","); M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)] } } else { if (Y < 10) { Y++; setTimeout(arguments.callee, 10); return } } X.removeChild(aa); Z = null; H() })() } else { H() } } function H() { var ag = o.length; if (ag > 0) { for (var af = 0; af < ag; af++) { var Y = o[af].id; var ab = o[af].callbackFn; var aa = { success: false, id: Y }; if (M.pv[0] > 0) { var ae = c(Y); if (ae) { if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) { w(Y, true); if (ab) { aa.success = true; aa.ref = z(Y); ab(aa) } } else { if (o[af].expressInstall && A()) { var ai = {}; ai.data = o[af].expressInstall; ai.width = ae.getAttribute("width") || "0"; ai.height = ae.getAttribute("height") || "0"; if (ae.getAttribute("class")) { ai.styleclass = ae.getAttribute("class") } if (ae.getAttribute("align")) { ai.align = ae.getAttribute("align") } var ah = {}; var X = ae.getElementsByTagName("param"); var ac = X.length; for (var ad = 0; ad < ac; ad++) { if (X[ad].getAttribute("name").toLowerCase() != "movie") { ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value") } } P(ai, ah, Y, ab) } else { p(ae); if (ab) { ab(aa) } } } } } else { w(Y, true); if (ab) { var Z = z(Y); if (Z && typeof Z.SetVariable != D) { aa.success = true; aa.ref = Z } ab(aa) } } } } } function z(aa) { var X = null; var Y = c(aa); if (Y && Y.nodeName == "OBJECT") { if (typeof Y.SetVariable != D) { X = Y } else { var Z = Y.getElementsByTagName(r)[0]; if (Z) { X = Z } } } return X } function A() { return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312) } function P(aa, ab, X, Z) { a = true; E = Z || null; B = { success: false, id: X }; var ae = c(X); if (ae) { if (ae.nodeName == "OBJECT") { l = g(ae); Q = null } else { l = ae; Q = X } aa.id = R; if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) { aa.width = "310" } if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) { aa.height = "137" } j.title = j.title.slice(0, 47) + " - Flash Player Installation"; var ad = M.ie && M.win ? "ActiveX" : "PlugIn", ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title; if (typeof ab.flashvars != D) { ab.flashvars += "&" + ac } else { ab.flashvars = ac } if (M.ie && M.win && ae.readyState != 4) { var Y = C("div"); X += "SWFObjectNew"; Y.setAttribute("id", X); ae.parentNode.insertBefore(Y, ae); ae.style.display = "none"; (function () { if (ae.readyState == 4) { ae.parentNode.removeChild(ae) } else { setTimeout(arguments.callee, 10) } })() } u(aa, ab, X) } } function p(Y) { if (M.ie && M.win && Y.readyState != 4) { var X = C("div"); Y.parentNode.insertBefore(X, Y); X.parentNode.replaceChild(g(Y), X); Y.style.display = "none"; (function () { if (Y.readyState == 4) { Y.parentNode.removeChild(Y) } else { setTimeout(arguments.callee, 10) } })() } else { Y.parentNode.replaceChild(g(Y), Y) } } function g(ab) { var aa = C("div"); if (M.win && M.ie) { aa.innerHTML = ab.innerHTML } else { var Y = ab.getElementsByTagName(r)[0]; if (Y) { var ad = Y.childNodes; if (ad) { var X = ad.length; for (var Z = 0; Z < X; Z++) { if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) { aa.appendChild(ad[Z].cloneNode(true)) } } } } } return aa } function u(ai, ag, Y) { var X, aa = c(Y); if (M.wk && M.wk < 312) { return X } if (aa) { if (typeof ai.id == D) { ai.id = Y } if (M.ie && M.win) { var ah = ""; for (var ae in ai) { if (ai[ae] != Object.prototype[ae]) { if (ae.toLowerCase() == "data") { ag.movie = ai[ae] } else { if (ae.toLowerCase() == "styleclass") { ah += ' class="' + ai[ae] + '"' } else { if (ae.toLowerCase() != "classid") { ah += " " + ae + '="' + ai[ae] + '"' } } } } } var af = ""; for (var ad in ag) { if (ag[ad] != Object.prototype[ad]) { af += '<param name="' + ad + '" value="' + ag[ad] + '" />' } } aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>"; N[N.length] = ai.id; X = c(ai.id) } else { var Z = C(r); Z.setAttribute("type", q); for (var ac in ai) { if (ai[ac] != Object.prototype[ac]) { if (ac.toLowerCase() == "styleclass") { Z.setAttribute("class", ai[ac]) } else { if (ac.toLowerCase() != "classid") { Z.setAttribute(ac, ai[ac]) } } } } for (var ab in ag) { if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") { e(Z, ab, ag[ab]) } } aa.parentNode.replaceChild(Z, aa); X = Z } } return X } function e(Z, X, Y) { var aa = C("param"); aa.setAttribute("name", X); aa.setAttribute("value", Y); Z.appendChild(aa) } function y(Y) { var X = c(Y); if (X && X.nodeName == "OBJECT") { if (M.ie && M.win) { X.style.display = "none"; (function () { if (X.readyState == 4) { b(Y) } else { setTimeout(arguments.callee, 10) } })() } else { X.parentNode.removeChild(X) } } } function b(Z) { var Y = c(Z); if (Y) { for (var X in Y) { if (typeof Y[X] == "function") { Y[X] = null } } Y.parentNode.removeChild(Y) } } function c(Z) { var X = null; try { X = j.getElementById(Z) } catch (Y) { } return X } function C(X) { return j.createElement(X) } function i(Z, X, Y) { Z.attachEvent(X, Y); I[I.length] = [Z, X, Y] } function F(Z) { var Y = M.pv, X = Z.split("."); X[0] = parseInt(X[0], 10); X[1] = parseInt(X[1], 10) || 0; X[2] = parseInt(X[2], 10) || 0; return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false } function v(ac, Y, ad, ab) { if (M.ie && M.mac) { return } var aa = j.getElementsByTagName("head")[0]; if (!aa) { return } var X = (ad && typeof ad == "string") ? ad : "screen"; if (ab) { n = null; G = null } if (!n || G != X) { var Z = C("style"); Z.setAttribute("type", "text/css"); Z.setAttribute("media", X); n = aa.appendChild(Z); if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) { n = j.styleSheets[j.styleSheets.length - 1] } G = X } if (M.ie && M.win) { if (n && typeof n.addRule == r) { n.addRule(ac, Y) } } else { if (n && typeof j.createTextNode != D) { n.appendChild(j.createTextNode(ac + " {" + Y + "}")) } } } function w(Z, X) { if (!m) { return } var Y = X ? "visible" : "hidden"; if (J && c(Z)) { c(Z).style.visibility = Y } else { v("#" + Z, "visibility:" + Y) } } function L(Y) { var Z = /[\\\"<>\.;]/; var X = Z.exec(Y) != null; return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y } var d = function () { if (M.ie && M.win) { window.attachEvent("onunload", function () { var ac = I.length; for (var ab = 0; ab < ac; ab++) { I[ab][0].detachEvent(I[ab][1], I[ab][2]) } var Z = N.length; for (var aa = 0; aa < Z; aa++) { y(N[aa]) } for (var Y in M) { M[Y] = null } M = null; for (var X in swfobject) { swfobject[X] = null } swfobject = null }) } }(); return { registerObject: function (ab, X, aa, Z) { if (M.w3 && ab && X) { var Y = {}; Y.id = ab; Y.swfVersion = X; Y.expressInstall = aa; Y.callbackFn = Z; o[o.length] = Y; w(ab, false) } else { if (Z) { Z({ success: false, id: ab }) } } }, getObjectById: function (X) { if (M.w3) { return z(X) } }, embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) { var X = { success: false, id: ah }; if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) { w(ah, false); K(function () { ae += ""; ag += ""; var aj = {}; if (af && typeof af === r) { for (var al in af) { aj[al] = af[al] } } aj.data = ab; aj.width = ae; aj.height = ag; var am = {}; if (ad && typeof ad === r) { for (var ak in ad) { am[ak] = ad[ak] } } if (Z && typeof Z === r) { for (var ai in Z) { if (typeof am.flashvars != D) { am.flashvars += "&" + ai + "=" + Z[ai] } else { am.flashvars = ai + "=" + Z[ai] } } } if (F(Y)) { var an = u(aj, am, ah); if (aj.id == ah) { w(ah, true) } X.success = true; X.ref = an } else { if (aa && A()) { aj.data = aa; P(aj, am, ah, ac); return } else { w(ah, true) } } if (ac) { ac(X) } }) } else { if (ac) { ac(X) } } }, switchOffAutoHideShow: function () { m = false }, ua: M, getFlashPlayerVersion: function () { return { major: M.pv[0], minor: M.pv[1], release: M.pv[2] } }, hasFlashPlayerVersion: F, createSWF: function (Z, Y, X) { if (M.w3) { return u(Z, Y, X) } else { return undefined } }, showExpressInstall: function (Z, aa, X, Y) { if (M.w3 && A()) { P(Z, aa, X, Y) } }, removeSWF: function (X) { if (M.w3) { y(X) } }, createCSS: function (aa, Z, Y, X) { if (M.w3) { v(aa, Z, Y, X) } }, addDomLoadEvent: K, addLoadEvent: s, getQueryParamValue: function (aa) { var Z = j.location.search || j.location.hash; if (Z) { if (/\?/.test(Z)) { Z = Z.split("?")[1] } if (aa == null) { return L(Z) } var Y = Z.split("&"); for (var X = 0; X < Y.length; X++) { if (Y[X].substring(0, Y[X].indexOf("=")) == aa) { return L(Y[X].substring((Y[X].indexOf("=") + 1))) } } } return "" }, expressInstallCallback: function () { if (a) { var X = c(R); if (X && l) { X.parentNode.replaceChild(l, X); if (Q) { w(Q, true); if (M.ie && M.win) { l.style.display = "block" } } if (E) { E(B) } } a = false } } } }();
(function () { if (window.WEB_SOCKET_FORCE_FLASH) { } else { if (window.WebSocket) { return } else { if (window.MozWebSocket) { window.WebSocket = MozWebSocket; return } } } var a; if (window.WEB_SOCKET_LOGGER) { a = WEB_SOCKET_LOGGER } else { if (window.console && window.console.log && window.console.error) { a = window.console } else { a = { log: function () { }, error: function () { } } } } if (swfobject.getFlashPlayerVersion().major < 10) { a.error("Flash Player >= 10.0.0 is required."); return } if (location.protocol == "file:") { a.error("WARNING: web-socket-js doesn't work in file:///... URL " + "unless you set Flash Security Settings properly. " + "Open the page via Web server i.e. http://...") } window.WebSocket = function (d, e, c, g, f) { var b = this; b.__id = WebSocket.__nextId++; WebSocket.__instances[b.__id] = b; b.readyState = WebSocket.CONNECTING; b.bufferedAmount = 0; b.__events = {}; if (!e) { e = [] } else { if (typeof e == "string") { e = [e] } } b.__createTask = setTimeout(function () { WebSocket.__addTask(function () { b.__createTask = null; WebSocket.__flash.create(b.__id, d, e, c || null, g || 0, f || null) }) }, 0) }; WebSocket.prototype.send = function (c) { if (this.readyState == WebSocket.CONNECTING) { throw "INVALID_STATE_ERR: Web Socket connection has not been established" } var b = WebSocket.__flash.send(this.__id, encodeURIComponent(c)); if (b < 0) { return true } else { this.bufferedAmount += b; return false } }; WebSocket.prototype.close = function () { if (this.__createTask) { clearTimeout(this.__createTask); this.__createTask = null; this.readyState = WebSocket.CLOSED; return } if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) { return } this.readyState = WebSocket.CLOSING; WebSocket.__flash.close(this.__id) }; WebSocket.prototype.addEventListener = function (c, d, b) { if (!(c in this.__events)) { this.__events[c] = [] } this.__events[c].push(d) }; WebSocket.prototype.removeEventListener = function (e, f, b) { if (!(e in this.__events)) { return } var d = this.__events[e]; for (var c = d.length - 1; c >= 0; --c) { if (d[c] === f) { d.splice(c, 1); break } } }; WebSocket.prototype.dispatchEvent = function (e) { var c = this.__events[e.type] || []; for (var b = 0; b < c.length; ++b) { c[b](e) } var d = this["on" + e.type]; if (d) { d.apply(this, [e]) } }; WebSocket.prototype.__handleEvent = function (d) { if ("readyState" in d) { this.readyState = d.readyState } if ("protocol" in d) { this.protocol = d.protocol } var b; if (d.type == "open" || d.type == "error") { b = this.__createSimpleEvent(d.type) } else { if (d.type == "close") { b = this.__createSimpleEvent("close"); b.wasClean = d.wasClean ? true : false; b.code = d.code; b.reason = d.reason } else { if (d.type == "message") { var c = decodeURIComponent(d.message); b = this.__createMessageEvent("message", c) } else { throw "unknown event type: " + d.type } } } this.dispatchEvent(b) }; WebSocket.prototype.__createSimpleEvent = function (b) { if (document.createEvent && window.Event) { var c = document.createEvent("Event"); c.initEvent(b, false, false); return c } else { return { type: b, bubbles: false, cancelable: false } } }; WebSocket.prototype.__createMessageEvent = function (b, d) { if (window.MessageEvent && typeof (MessageEvent) == "function" && !window.opera) { return new MessageEvent("message", { "view": window, "bubbles": false, "cancelable": false, "data": d }) } else { if (document.createEvent && window.MessageEvent && !window.opera) { var c = document.createEvent("MessageEvent"); c.initMessageEvent("message", false, false, d, null, null, window, null); return c } else { return { type: b, data: d, bubbles: false, cancelable: false } } } }; WebSocket.CONNECTING = 0; WebSocket.OPEN = 1; WebSocket.CLOSING = 2; WebSocket.CLOSED = 3; WebSocket.__isFlashImplementation = true; WebSocket.__initialized = false; WebSocket.__flash = null; WebSocket.__instances = {}; WebSocket.__tasks = []; WebSocket.__nextId = 0; WebSocket.loadFlashPolicyFile = function (b) { WebSocket.__addTask(function () { WebSocket.__flash.loadManualPolicyFile(b) }) }; WebSocket.__initialize = function () { if (WebSocket.__initialized) { return } WebSocket.__initialized = true; if (WebSocket.__swfLocation) { window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation } if (!window.WEB_SOCKET_SWF_LOCATION) { a.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf"); return } if (!window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR && !WEB_SOCKET_SWF_LOCATION.match(/(^|\/)WebSocketMainInsecure\.swf(\?.*)?$/) && WEB_SOCKET_SWF_LOCATION.match(/^\w+:\/\/([^\/]+)/)) { var d = RegExp.$1; if (location.host != d) { a.error("[WebSocket] You must host HTML and WebSocketMain.swf in the same host " + "('" + location.host + "' != '" + d + "'). " + "See also 'How to host HTML file and SWF file in different domains' section " + "in README.md. If you use WebSocketMainInsecure.swf, you can suppress this message " + "by WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = true;") } } var b = document.createElement("div"); b.id = "webSocketContainer"; b.style.position = "absolute"; if (WebSocket.__isFlashLite()) { b.style.left = "0px"; b.style.top = "0px" } else { b.style.left = "-100px"; b.style.top = "-100px" } var c = document.createElement("div"); c.id = "webSocketFlash"; b.appendChild(c); document.body.appendChild(b); swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, { hasPriority: true, swliveconnect: true, allowScriptAccess: "always" }, null, function (f) { if (!f.success) { a.error("[WebSocket] swfobject.embedSWF failed") } }) }; WebSocket.__onFlashInitialized = function () { setTimeout(function () { WebSocket.__flash = document.getElementById("webSocketFlash"); WebSocket.__flash.setCallerUrl(location.href); WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG); for (var b = 0; b < WebSocket.__tasks.length; ++b) { WebSocket.__tasks[b]() } WebSocket.__tasks = [] }, 0) }; WebSocket.__onFlashEvent = function () { setTimeout(function () { try { var c = WebSocket.__flash.receiveEvents(); for (var b = 0; b < c.length; ++b) { WebSocket.__instances[c[b].webSocketId].__handleEvent(c[b]) } } catch (d) { a.error(d) } }, 0); return true }; WebSocket.__log = function (b) { a.log(decodeURIComponent(b)) }; WebSocket.__error = function (b) { a.error(decodeURIComponent(b)) }; WebSocket.__addTask = function (b) { if (WebSocket.__flash) { b() } else { WebSocket.__tasks.push(b) } }; WebSocket.__isFlashLite = function () { if (!window.navigator || !window.navigator.mimeTypes) { return false } var b = window.navigator.mimeTypes["application/x-shockwave-flash"]; if (!b || !b.enabledPlugin || !b.enabledPlugin.filename) { return false } return b.enabledPlugin.filename.match(/flashlite/i) ? true : false }; if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) { swfobject.addDomLoadEvent(function () { WebSocket.__initialize() }) } })();
(function (a) { if (typeof define === "function" && define.amd) { define(["jquery"], a) } else { a(jQuery) } }(function (f) { var a = /\+/g; function d(i) { return b.raw ? i : encodeURIComponent(i) } function g(i) { return b.raw ? i : decodeURIComponent(i) } function h(i) { return d(b.json ? JSON.stringify(i) : String(i)) } function c(i) { if (i.indexOf('"') === 0) { i = i.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\") } try { i = decodeURIComponent(i.replace(a, " ")) } catch (j) { return } try { return b.json ? JSON.parse(i) : i } catch (j) { } } function e(j, i) { var k = b.raw ? j : c(j); return f.isFunction(i) ? i(k) : k } var b = f.cookie = function (q, p, v) { if (p !== undefined && !f.isFunction(p)) { v = f.extend({}, b.defaults, v); if (typeof v.expires === "number") { var r = v.expires, u = v.expires = new Date(); u.setDate(u.getDate() + r) } return (document.cookie = [d(q), "=", h(p), v.expires ? "; expires=" + v.expires.toUTCString() : "", v.path ? "; path=" + v.path : "", v.domain ? "; domain=" + v.domain : "", v.secure ? "; secure" : ""].join("")) } var w = q ? undefined : {}; var s = document.cookie ? document.cookie.split("; ") : []; for (var o = 0, m = s.length; o < m; o++) { var n = s[o].split("="); var j = g(n.shift()); var k = n.join("="); if (q && q === j) { w = e(k, p); break } if (!q && (k = e(k)) !== undefined) { w[j] = k } } return w }; b.defaults = {}; f.removeCookie = function (j, i) { if (f.cookie(j) !== undefined) { f.cookie(j, "", f.extend({}, i, { expires: -1 })); return true } return false } }));

//WEB_SOCKET_SWF_LOCATION = "/plug/WebSocketMain.swf";

var img_addr = "nmpipei.com";

GetImgAddr();

function GetImgAddr() {

    $.ajax({
        url: '/asmx/method.asmx/getImgServer',
        async: false,  // 是否多线程异步处理
        dataType: 'json',
        cache: false,
        timeout: 2000,
        data: '',
        success: function (response) {

            if (response.state == 'OK') {
                //console.info(response.msg.server);
                img_addr = response.msg.server;
            }

        }
    });

}

//var ws_addr = "wss://wss.nmpipei.com:1001";
//var ws_addr = "wss://nmpipei.com:8007";

//var ws_addr = "ws://nmpipei.com:7007";
var ws_addr = "ws://nmpipei.com:7007";

var resultData;
// var resultServers = ZQLAjaxJson("/Act/WebService.asmx/getRandServer", "post", "false", "");

$.ajax(
    {
        type: 'get',
        url: "/Act/WebService.asmx/getRandServer?ServerInfo=" + ServerInfo,
        async: false,  // 是否多线程异步处理
        dataType: 'json',
        cache: false,
        timeout: 5000,
        data: '',
        success: function (data) {

            //resultData = $.parseJSON('{"code":"0","msg":"成功","data":' + JSON.stringify(data) + '}');
            resultData = $.parseJSON(JSON.stringify(data));

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            if (textStatus == "timeout") {

                resultData = $.parseJSON('{"code":"-1","msg":"网络延迟：' + errorThrown + '","data":{}}');

            }
            else {

                resultData = $.parseJSON('{"code":"-2","msg":"失败：' + textStatus + errorThrown + '","data":{}}');

            }

        },
        complete: function () {

        }

    })

try {
    ws_addr = resultData.msg.server;
}
catch (err) {
    console.info('err:' + err);
}

//console.info(ws_addr);

var FilesCDN = 'wss.nmpipei.com';

try {
    FilesCDN = ws_addr.split('/')[2].split(':')[0];
}
catch (err) {

}

var ret = '0';
var FileProt = '8001';

// 获取文件负载端口
function NetPing(url, ImgarrPort) {


    try {
        $.ajax({
            type: "GET",
            //cache: false,
            async: true,
            timeout: 800,
            url: url,
            data: "",
            success: function () {
                FileProt = ImgarrPort;
                ret = '1';
            },
            error: function () {
                ret = '0';
            },
            complete: function () {

            }
        });
    }
    catch (err) {

    }

    return ret;

}

GetImgPort();

function GetImgPort() {

    try {

        for (var i = 0 ; i < Imgarr.length ; i++) {
            NetPing('http://' + img_addr + ':' + Imgarr[i] + '/useripaddressv23.js', Imgarr[i]);

            if (ret == '1') {
                FileProt = Imgarr[i];
                break;
            }

        }
    }
    catch (err) {

    }

    //参数分别为：遍历的数组内容；第对应的数组索引，数组本身。
    //Imgarr.forEach(function(x, index, a){
    //	
    //	var ret = NetPing('http://' + img_addr + ':' + x + '/useripaddressv23.js');
    //	if(ret == '1')
    //	{
    //		FileProt = x;
    //		console.log(x);
    //		break;
    //	}
    //	console.log('tt');
    //	//console.log(x + '|-' + index + '|' + (a === Imgarr));

    //});

}


// 当前好友列表类型 0：未收藏，1：已收藏
var CurrUserType = '0';

//用户列表
var dic_userlist = {};
//选择的用户
var sel_userid = "";
//消息是否发送到【公共留言】区
var sendPublic = "";


if (getQueryVariable('touserid') && getQueryVariable('tousername')) {

    dic_userlist[getQueryVariable('touserid')] = '' + decodeURI(getQueryVariable('tousername'));

    click_userlist('_' + getQueryVariable('touserid'));


}

//console.info(window.location.pathname);

var serverPort = '';

try {
    serverPort = window.location.pathname.split('/')[1];
}
catch (err) {
    console.info('err:' + err);
}

//serverPort = '1002';

if (serverPort != '' && !isNaN(serverPort)) {
    //console.info('shi')
    ws_addr = ws_addr.split(':')[0] + ':' + ws_addr.split(':')[1] + ':' + serverPort;
}

//var ws_addr = "ws://127.0.0.1:1001";
var ws = null;
var tick_heartpac = null;//心跳包
var tick_titletips = null;//标题闪烁
var tick_autoConnect = null;//自动定时重连
var isconning = false;// 链接状态
var ifAutoConn = true;// 是否自动重连
var isforceOut = false;//客户端是否强制离线
var isFocus = true;//当前页是否活动
var isBeforeUpload = false;//是否执行上传动作完毕
var isUploadStyle = 0;//0:上传图片 1:上传文件
var index_sharelink = null;
var pub_lastSendTime = "";//公共聊天最新发表的时间
var pri_lastSendTime = {};//私聊聊天所有人最后发表的时间
var pri_OldMsgTid = 0;//私聊聊天历史记录最早发表的时间
var pri_BlackUserID = "";//私聊黑名单
var cur_rname = "公共场所";//当前房间名
var cur_rpsw = "";//当前房间密码
var isWebPageStart = 1;//当前房间密码

$.cookie('room_name_random', cur_rname, { expires: 365 });
$.cookie('room_psw_random', cur_rpsw, { expires: 365 });

setTimeout(function () {

    layer.tips('点击此处，简化界面', layui.$("#SlideUserInfos"), {
        tips: [1, '#3595CC']
        , time: 2000
        , shift: 6
    });

}, 2000);

var SlideUserInfos = $.cookie('SlideUserInfos') ? $.cookie('SlideUserInfos') : "1";
var SlideSysInfos = $.cookie('SlideSysInfos') ? $.cookie('SlideSysInfos') : "1";

if (SlideUserInfos == '1') {
    $(".userInfo").slideDown();
}
else {
    $(".userInfo").slideUp();
}

if (SlideSysInfos == '1') {
    $(".sysInfo").fadeIn();
}
else {
    $(".sysInfo").fadeOut();
}

$("#SlideUserInfos").click(function () {

    if (SlideUserInfos == '1') {
        SlideUserInfos = '0';
        $(".userInfo,#AltInfo").slideUp();
        $.cookie('SlideUserInfos', '0', { expires: 365 });
    }
    else {
        SlideUserInfos = '1';
        $(".userInfo,#AltInfo").slideDown();
        $.cookie('SlideUserInfos', '1', { expires: 365 });
    }

});

$("#SlideSysInfos").click(function () {

    if (SlideSysInfos == '1') {
        SlideSysInfos = '0';
        $(".sysInfo").fadeOut();
        $.cookie('SlideSysInfos', '0', { expires: 365 });
    }
    else {
        SlideSysInfos = '1';
        $(".sysInfo").fadeIn();
        $.cookie('SlideSysInfos', '1', { expires: 365 });
    }

});


$(function () {
    // 修改自己的信息
    $("#inp_nickname_other").change(function () {
        if ($.trim($("#inp_nickname_other").val())) {
            sendJson('chgname', $.trim($("#inp_nickname_other").val()), true);
        }
    });

})


var cur_rauthor = "";//当前房间的创建者ID

var che_message_focus = 0;  //  2018-06-18 判断是否聊天窗口焦点，防止自动下滑

var first_message_time = "";//目前房间的最早信息时间，据此分批推送消息

var emoji = {
    "[最右]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c8/lxhzuiyou_thumb.gif",
    "[泪流满面]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/64/lxhtongku_thumb.gif",
    "[江南style]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/67/gangnamstyle_thumb.gif",
    "[偷乐]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/fa/lxhtouxiao_thumb.gif",
    "[加油啊]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/03/lxhjiayou_thumb.gif",
    "[doge]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/doge_thumb.gif",
    "[喵喵]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4a/mm_thumb.gif",
    "[笑cry]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/34/xiaoku_thumb.gif",
    "[xkl转圈]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f4/xklzhuanquan_thumb.gif",
    "[微笑]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/huanglianwx_thumb.gif",
    "[嘻嘻]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/tootha_thumb.gif",
    "[哈哈]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6a/laugh.gif",
    "[可爱]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/14/tza_thumb.gif",
    "[可怜]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/kl_thumb.gif",
    "[挖鼻]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/wabi_thumb.gif",
    "[吃惊]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f4/cj_thumb.gif",
    "[害羞]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/shamea_thumb.gif",
    "[挤眼]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c3/zy_thumb.gif",
    "[闭嘴]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/29/bz_thumb.gif",
    "[鄙视]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/71/bs2_thumb.gif",
    "[爱你]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/lovea_thumb.gif",
    "[泪]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9d/sada_thumb.gif",
    "[偷笑]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/19/heia_thumb.gif",
    "[亲亲]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/qq_thumb.gif",
    "[生病]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/sb_thumb.gif",
    "[太开心]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/58/mb_thumb.gif",
    "[白眼]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/landeln_thumb.gif",
    "[右哼哼]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/98/yhh_thumb.gif",
    "[左哼哼]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/zhh_thumb.gif",
    "[嘘]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a6/x_thumb.gif",
    "[衰]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/cry.gif",
    "[委屈]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/73/wq_thumb.gif",
    "[吐]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9e/t_thumb.gif",
    "[哈欠]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cc/haqianv2_thumb.gif",
    "[抱抱]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/27/bba_thumb.gif",
    "[怒]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7c/angrya_thumb.gif",
    "[疑问]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/yw_thumb.gif",
    "[馋嘴]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a5/cza_thumb.gif",
    "[拜拜]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/88_thumb.gif",
    "[思考]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e9/sk_thumb.gif",
    "[汗]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/24/sweata_thumb.gif",
    "[困]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/kunv2_thumb.gif",
    "[睡]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/96/huangliansj_thumb.gif",
    "[钱]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/90/money_thumb.gif",
    "[失望]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0c/sw_thumb.gif",
    "[酷]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/cool_thumb.gif",
    "[色]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/20/huanglianse_thumb.gif",
    "[哼]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/49/hatea_thumb.gif",
    "[鼓掌]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/36/gza_thumb.gif",
    "[晕]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/dizzya_thumb.gif",
    "[悲伤]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1a/bs_thumb.gif",
    "[泪]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9d/sada_thumb.gif",
    "[偷笑]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/19/heia_thumb.gif",
    "[抓狂]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/62/crazya_thumb.gif",
    "[黑线]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/91/h_thumb.gif",
    "[阴险]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/yx_thumb.gif",
    "[怒骂]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/numav2_thumb.gif",
    "[互粉]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/89/hufen_thumb.gif",
    "[心]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/hearta_thumb.gif",
    "[伤心]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ea/unheart.gif",
    "[猪头]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/58/pig.gif",
    "[熊猫]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/panda_thumb.gif",
    "[兔子]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/81/rabbit_thumb.gif",
    "[ok]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d6/ok_thumb.gif",
    "[耶]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/ye_thumb.gif",
    "[good]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/good_thumb.gif",
    "[no]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ae/buyao_org.gif",
    "[赞]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d0/z2_thumb.gif",
    "[来]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/come_thumb.gif",
    "[弱]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/sad_thumb.gif",
    "[草泥马]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7a/shenshou_thumb.gif",
    "[神马]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/horse2_thumb.gif",
    "[囧]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/15/j_thumb.gif",
    "[浮云]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/bc/fuyun_thumb.gif",
    "[给力]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1e/geiliv2_thumb.gif",
    "[围观]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f2/wg_thumb.gif",
    "[威武]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/vw_thumb.gif",
    "[奥特曼]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/bc/otm_thumb.gif",
    "[礼物]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c4/liwu_thumb.gif",
    "[钟]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d3/clock_thumb.gif",
    "[话筒]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9f/huatongv2_thumb.gif",
    "[蜡烛]": "https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/lazhuv2_thumb.gif"
};


// 用户性别和地址开关信息
var userSex = $.cookie('userSex') ? $.cookie('userSex') : "保密";
var userAge = $.cookie('userAge') ? $.cookie('userAge') : "0";
var address_show = $.cookie('address_show') ? $.cookie('address_show') : "false";
var switchvipsex = $.cookie('switchvipsex') ? $.cookie('switchvipsex') : "0";
var switchVipAddress = $.cookie('switchVipAddress') ? $.cookie('switchVipAddress') : "0";
var randomVipCode = $.cookie('randomVipCode') ? $.cookie('randomVipCode') : "";

var switchHealthMode = $.cookie('switchHealthMode') ? $.cookie('switchHealthMode') : "0";

$("#SliderrandomAge").html(userAge);
$("#InitAge").attr('value', userAge);

//if (userSex != "保密") {
//$("[name='sex']").attr("disabled", "disabled");
//}


layui.use('form', function () {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功

    //……

    //但是，如果你的HTML是动态生成的，自动渲染就会失效
    //因此你需要在相应的地方，执行下述方法来手动渲染，跟这类似的还有 element.init();
    //form.render();

    //监听指定单选框
    form.on('radio(radioSex)', function (data) {
        //console.log(data.elem); //得到radio原始DOM对象
        userSex = data.value; //被点击的radio的value值

        //if (userSex != "保密") {
        //$("[name='sex']").attr("disabled", "disabled");

        //form.render('radio');

        //}

        $("#btn_modinfo").click();

    });

    //监听指定开关
    form.on('switch(switchAddress)', function (data) {
        //layer.msg('开关checked：' + (this.checked ? 'true' : 'false'));

        address_show = this.checked ? 'true' : 'false';

        $("#btn_modinfo").click();

        if (this.checked) {
            //layer.tips('温馨提示：公开地址会让对方知道您所在的城市，保密则对方无法知道。', data.othis)
        }
    });

    //监听指定开关
    form.on('switch(switchVipSex)', function (data) {
        //layer.msg('开关checked：' + (this.checked ? 'true' : 'false'));

        switchvipsex = this.checked ? '1' : '0';

        $("#btn_modinfo").click();

        if (this.checked) {
            //layer.tips('温馨提示：公开地址会让对方知道您所在的城市，保密则对方无法知道。', data.othis)
        }
    });

    //监听指定开关
    form.on('switch(switchVipAddress)', function (data) {
        //layer.msg('开关checked：' + (this.checked ? 'true' : 'false'));

        switchVipAddress = this.checked ? '1' : '0';

        $("#btn_modinfo").click();

        if (this.checked) {
            //layer.tips('温馨提示：公开地址会让对方知道您所在的城市，保密则对方无法知道。', data.othis)
        }
    });

    //监听指定开关
    form.on('switch(switchHealthMode)', function (data) {
        //layer.msg('开关checked：' + (this.checked ? 'true' : 'false'));

        switchHealthMode = this.checked ? '1' : '0';

        $("#btn_modinfo").click();

        if (this.checked) {
            //layer.tips('温馨提示：公开地址会让对方知道您所在的城市，保密则对方无法知道。', data.othis)
        }
    });

});

//// vip 身份验证
//function vipCheck() {
//    sendJson('modinfo', '{"randomvipcode":"' + randomVipCode + '"}', true);
//};

// 初始化layer 的性别和城市开关
function fun_setUserSexAdderss() {

    fun_setUserAge();

    if ($.cookie('address_show') == 'true') {
        $("#address_show").attr("checked", "checked");
    } else {
        $("#address_show").remove("checked");
    }

    $('[name=sex]').each(function (i, item) {
        if ($(item).val() == $.cookie('userSex')) {
            $(item).prop('checked', true);
            layui.use('form', function () {
                //var form = layui.form();
                //form.render();
            });
        }
    })

    if ($.cookie('switchvipsex') == '1' && $.cookie('randomVipCode')) {
        $("#vip_sex").attr("checked", "checked");
    } else {
        $.cookie('switchvipsex', "0", { expires: 365 });
        $("#vip_sex").remove("checked");
    }

    if ($.cookie('switchVipAddress') == '1' && $.cookie('randomVipCode')) {
        $("#vip_Address").attr("checked", "checked");
    } else {
        $.cookie('switchVipAddress', "0", { expires: 365 });
        $("#vip_Address").remove("checked");
    }

    if ($.cookie('switchHealthMode') == '1' && $.cookie('randomVipCode')) {
        $("#health_mode").attr("checked", "checked");
    } else {
        $.cookie('switchHealthMode', "0", { expires: 365 });
        $("#health_mode").remove("checked");
    }


}

function fun_setUserAge() {

    var $document = $(document);
    var selector = '[data-rangeslider]';
    var $inputRange = $(selector);

    // Example functionality to demonstrate a value feedback
    // and change the output's value.
    function valueOutput(element) {

        var value = element.value;

        //var output = element.parentNode.getElementsByTagName('output')[0];

        //output.innerHTML = value;

        $("#SliderrandomAge").html(value);

        userAge = value;
        $.cookie('userAge', userAge, { expires: 365 });

    }

    // Initial value output
    for (var i = $inputRange.length - 1; i >= 0; i--) {
        valueOutput($inputRange[i]);
    };

    // Update value output
    $document.on('input', selector, function (e) {
        valueOutput(e.target);
    });

    // Initialize the elements
    $inputRange.rangeslider({
        polyfill: false
    });

    // Example functionality to demonstrate programmatic value changes
    $document.on('click', '#js-example-change-value button', function (e) {
        var $inputRange = $('input[type="range"]', e.target.parentNode);
        var value = $('input[type="number"]', e.target.parentNode)[0].value;

        $inputRange
            .val(value)
            .change();
    });

    // Example functionality to demonstrate programmatic attribute changes
    $document.on('click', '#js-example-change-attributes button', function (e) {
        var $inputRange = $('input[type="range"]', e.target.parentNode);
        var attributes = {
            min: $('input[name="min"]', e.target.parentNode)[0].value,
            max: $('input[name="max"]', e.target.parentNode)[0].value,
            step: $('input[name="step"]', e.target.parentNode)[0].value
        };

        $inputRange
            .attr(attributes)
            .rangeslider('update', true);
    });

    // Example functionality to demonstrate destroy functionality
    $document
        .on('click', '#js-example-destroy button[data-behaviour="destroy"]', function (e) {
            $('input[type="range"]', e.target.parentNode).rangeslider('destroy');
        })
        .on('click', '#js-example-destroy button[data-behaviour="initialize"]', function (e) {
            $('input[type="range"]', e.target.parentNode).rangeslider({ polyfill: false });
        });
};

//用户更改性别和地址开关
function fun_userchgsexaddress() {

    $.cookie('userSex', userSex, { expires: 365 });
    $.cookie('address_show', address_show, { expires: 365 });
    $.cookie('switchvipsex', switchvipsex, { expires: 365 });
    $.cookie('switchVipAddress', switchVipAddress, { expires: 365 });

    $.cookie('switchHealthMode', switchHealthMode, { expires: 365 });

    layer.msg('信息修改成功', { time: 600 });

}


// 用户离开后的展示内容
var randomOutMessge = '<div id="userOutOnline" onclick="return false;" style="width: 260px;text-align: center;margin: 10px auto;color: #AAA;line-height: 20px;letter-spacing: 2px;background-color: transparent;border-radius: 5px;padding: 5px;border: 1px solid #009688;">'
randomOutMessge += '<img class="GG_img" alt="Deskry 匿名聊" src="/img/gg/gg1.png" width="200" style="position: relative;top:0px;margin-bottom:5px;cursor:pointer;display:none;" />'
randomOutMessge += '<div style="text-align: left; text-indent: 2em;font-size: 10px;">对方已离开本次对话，但是您可以在本页面继续给对方留言，对方会收到提示。</div>'
randomOutMessge += '<div style="text-indent:2em;text-align:left;font-size: 10px;">重新匹配好友请点击左下角【返回】按钮，开始新的探索。</div>'
randomOutMessge += '<div style="text-align:center;text-indent: 0em;"><span style="color: #5BC0DE; font-weight: 700;">nmliao.cn(匿名聊)</span></div>'
randomOutMessge += '<div style="text-align: center; line-height: 18px; letter-spacing:2px;margin:5px;"><button type="button" class="btn btn-info btn_Leave_Message" style="margin-right:15px;display:none;">我要寻人</button><button type="button" class="btn btn-info btn_Show_Leave_Message">我要寻人</button></div>'
randomOutMessge += '</div>';

// 用户离开后的展示内容
var randomOutMessgeAD = '<div id="userOutOnline" onclick="return false;" style="width: 260px;text-align: center;margin: 10px auto;color: #AAA;line-height: 20px;letter-spacing: 2px;background-color: transparent;border-radius: 5px;padding: 5px;border: 1px solid #009688;">'
randomOutMessgeAD += '<img class="GG_img" alt="Deskry 匿名聊" src="/img/gg/gg1.png" width="200" style="position: relative;top:0px;margin-bottom:5px;cursor:pointer;display:;" />'
randomOutMessgeAD += '<div style="text-align: left; text-indent: 2em;font-size: 10px;">对方已离开本次对话，但是您可以在本页面继续给对方留言，对方会收到提示。</div>'
randomOutMessgeAD += '<div style="text-indent:2em;text-align:left;font-size: 10px;">重新匹配好友请点击左下角【返回】按钮，开始新的探索。</div>'
randomOutMessgeAD += '<div style="text-align:center;text-indent: 0em;"><span style="color: #5BC0DE; font-weight: 700;">nmliao.cn(匿名聊)</span></div>'
randomOutMessgeAD += '<div style="text-align: center; line-height: 18px; letter-spacing:2px;margin:5px;"><button type="button" class="btn btn-info btn_Leave_Message" style="margin-right:15px;display:none;">我要寻人</button><button type="button" class="btn btn-info btn_Show_Leave_Message">我要寻人</button></div>'
randomOutMessgeAD += '</div>';

$(function () {

    get_referrer();

    //if (!init_geturlparams()) return;
    init_initEmoji();
    //init_control();
    fun_getnickname(true);
    fun_setUserSexAdderss();  // 性别和地址开关根据cookie初始化
    //fun_getuploadimg();
    window.onblur = function () { isFocus = false; }
    window.onfocus = function () { isFocus = true; }
    //全局鼠标按下监听
    window.onmousedown = function (e) {
        var sign = e.target.id ? e.target.id : e.target.className;
        if (sign == "layui-layer-content" || e.target.outerHTML.indexOf('data-page') != -1) return;
        if (sign.indexOf('emoji') == -1) {
            layer.close(index_emoji);
            index_emoji = null;
        }
        if (sign.indexOf('uploadimg') == -1) {
            layer.close(index_img);
            index_img = null;
        }
        if (sign.indexOf('sharelink') == -1) {
            layer.close(index_sharelink);
            index_sharelink = null;
        }
        if (sign.indexOf('img_emoji') == -1) {
            $(".emoji_div").fadeOut(300);
            //$(".emoji_div").slideDown(300);
        }
        return
    };

    $("#sendVoice").click(function () {

        init_record();//加载录音

    });

    $("#btn_inroom").click(function () {
        //fun_inroom();
    });
    $("#btn_getnick").click(function () {
        fun_getnickname(false);
    });
    $("#btn_getnick_other").click(function () {
        fun_getnickname(false);
    });
    $("#inp_nickname").change(function () {
        if ($.trim($("#inp_nickname").val()))
            sendJson('chgname', $.trim($("#inp_nickname").val()), true);
    });

    // 显示 匹配 Tips 
    setTimeout(function () {
        //layer.tips('<div class="shake-slow shake-constant">点击此处即可开始<br/><span style="color:orange;font-weight:700;">一对一</span>自动匹配有缘人哦</div>', $("#toolMain"), { tips: [1, '#3595CC'], time: 5000, shift: 6 });
    }, 2000);


    $("#btn_modinfo").click(function () {
        sendJson('modinfo', '{"userSex":"' + userSex + '","address_show":"' + address_show + '","randomvipsex":"' + switchvipsex + '","randomvipaddress":"' + switchVipAddress + '","randomhealthmode":"' + switchHealthMode + '"}', true);

    });

    $("#btn_say").unbind("click").click(function () {
        var v = $.trim($("#inp_say").val());
        if (ws && ws.readyState == 1) {
            if (!v) {
                layer.msg('不能输入空字符');
                return;
            }
            if (sel_userid != "") {
                inputStatus_int = 0;
                sendJson('touser_' + sel_userid + "_" + dic_userlist[sel_userid], v, true);

                //setTimeout(function () { 
                //    sendJson('inputStatusOff_' + sel_userid + "_" + dic_userlist[sel_userid], "", true);// 停止输入提示
                //}, 300);

            }
            else if (sendPublic != "") {
                sendJson('toall', v, true);
                layer.msg('留言成功，请等待审核<br/>审核通过后才可对外显示');
            }
            else {
                layer.msg('请点击【匹配】按钮连接新用户<br/>或是点击左侧历史用户列表进行留言');
            }
            $("#inp_say").val('');
        }
        else {
            layer.msg('你已经离线，请先连接');
        }
    });

    bindClisk();

    $("#btn_conn").click(function () {
        fun_initWebSocket();
    });
    $("#inp_say").unbind("keydown").keydown(function (e) {//组合键
        //if (e.keyCode == 13 && e.ctrlKey) {       
        if (e.keyCode == 13) {
            $("#btn_say").trigger("click");
            return false;
        }
    });
    $("#user_count").click(function () {
        $(".userList").removeClass("active");
        //$(".userList").css("color", sel_userid == cur_rauthor ? "orange" : "black");
        $(".userList").css("color", "black");
        $(".userList").css("background-color", "#BBB");
        fun_showPublicZone();
    });
    $("#a_uploadimg").click(function () {

        if (!randomGetIDTimeLimit()) {
            init_uploadPic();
        }
        else {
            layer.msg("匹配后前5秒不允许发送图片", { time: 3000 });
        }

    });
    $("#a_uploadfile").click(function () {
        isUploadStyle = 1;
        isBeforeUpload = false;
        document.getElementById('uploading_file').click();
    });
    $("#a_getphoto").click(function () { init_getphoto() });
    $("#a_record").click(function () { init_record() });
    $("#a_doodle").click(function () { init_doodle(); });
    $("#msg_tips").click(function () {
        if ($.cookie('isSound') == 1 || !$.cookie('isSound')) {
            $.cookie('isSound', -1, { expires: 365 });
            $("#msg_tips").attr('src', "/img/sys/sound_off.png");
        }
        else {
            $.cookie('isSound', 1, { expires: 365 });
            $("#msg_tips").attr('src', "/img/sys/sound_on.png");
        }
    });

    if (!$.cookie('isMoon')) {

        $.cookie('isMoon', -1, { expires: 365 });
    }

    $("#theme_sun_moon").click(function () {
        if ($.cookie('isMoon') == 1 || !$.cookie('isMoon')) {

            $.cookie('isMoon', -1, { expires: 365 });
            $("#theme_sun_moon").attr('src', "/img/sys/sun1.png");

            //$("#themeChange").attr('href', '/css/random.css?v' + Math.ceil(Math.random() * 99999))
            $("#themeChange").attr('href', '/css/random.css?v=1')

            $("body").css("background-color", "#FFF");
            $.cookie('colorpicker', "#FFF", { expires: 365 });

        }
        else {

            $.cookie('isMoon', 1, { expires: 365 });
            $("#theme_sun_moon").attr('src', "/img/sys/moon1.png");

            //$("#themeChange").attr('href', '/css/random-black.css?v' + Math.ceil(Math.random() * 99999))
            $("#themeChange").attr('href', '/css/random-black.css?v=1')

            $("body").css("background-color", "#414550");
            $.cookie('colorpicker', "#414550", { expires: 365 });

        }
    });

    $("#msg_clear").click(function () {
        var lay_index = layer.confirm('是否确定清除本地记录？', {
            skin: 'demo-class',
            btn: ['确定', '取消']
        }, function () {
            layer.close(lay_index);
            $("#div_msgbox").html("");
        });

    });
    $("#msg_back").click(function () {
        var lastTime = sel_userid ? (pri_lastSendTime[sel_userid] ? (sel_userid + "_" + pri_lastSendTime[sel_userid]) : "") : pub_lastSendTime;
        if (ws && ws.readyState == 1 && lastTime) {
            var lay_index = layer.confirm('是否确定撤回最新消息？', {
                skin: 'demo-class',
                btn: ['确定', '取消']
            }, function () {
                //清除保存的最新消息的时间
                if (lastTime.indexOf('_') != -1) {
                    pri_lastSendTime[sel_userid] = "";
                }
                else {
                    pub_lastSendTime = "";
                }
                layer.close(lay_index);
                //fun_loading(true);
                sendJson('msgrevoke', lastTime, true);//撤回最新的聊天的内容
                layer.msg("撤销成功！");
            });
        }
        else {
            layer.msg("没有可撤销的内容");
        }
    });
    $("#sharelink").click(function () {
        if (!index_sharelink) {
            index_sharelink = layer.tips("<div style='color:#000;margin:10px 10px'>" +
                "<input id='sharelink_link' type='text' class='form-control' value=" + window.location.href + "?rname=" + cur_rname + (cur_rpsw ? "&rpsw=" + cur_rpsw : "") + " />" +
                "<div id='sharelink_state' style='float:left;margin:15px 0px;font-size:16px;color:green;'>当前房间的链接url</div>" +
                "</div>", '#sharelink', {
                    tips: [1, '#fff'],
                    time: 0,
                    area: ['200px', '105px'],
                    shift: 1
                });
            $("#sharelink_link").click(function () {
                this.select();
            });
        }
        else {
            layer.close(index_sharelink);
            index_sharelink = null;
        }
    });
    $("#uploading_file").change(function () {//图片/文件上传功能
        if (isBeforeUpload) return;
        var file = document.getElementById('uploading_file').files[0];//图片/文件
        var filesize = file.size / 1024;//图片/文件大小KB
        var data = new FormData();
        data.append('upload_file', file);
        if (isUploadStyle == 0) {
            if (file.name.toLowerCase().indexOf(".gif") != -1) {
                //if (filesize > 10000) {
                //isBeforeUpload = true;
                //$("#uploading_file").val('');
                //layer.msg('gif图片上传失败,当前最大限制10MB');
                //return false;
                //}
                imgupload_file(data);
            }
            else {
                if (filesize > 50000) {
                    $("#uploadimg_upload").attr("disabled", true);
                    $(".sp_uploadimg").html("上传中...");
                    lrz(this.files[0], { width: 2000 }, function (r) {
                        imgupload_base64(r.base64);
                    });
                    layer.msg('图片大小不能超过50MB<br/>建议使用截屏后发送');
                }
                else {
                    imgupload_file(data);
                }
            }
        }
        else if (isUploadStyle == 1) {
            if (filesize > 10000) {
                isBeforeUpload = true;
                $("#uploading_file").val('');
                layer.msg('压缩包的大小不得超过10MB');
                return;
            }
            uploadfile(data);
        }
    });


});


function bindClisk() {

    $(".btn_Leave_Message").click(function () {

        var htmlstr = "<div id='more_fun'>" +
        "<div style='margin: 15px 5px;margin-top:33px;text-align:center;color: #666;'>您可以发表公共消息了</div>" +
        "<div style='margin: 15px 5px;text-align:center;'><button id='publicMsgOK' type='button' class='btn btn-success' style='margin: 10px 5px;text-align:center;'>确定</button></div>" +
        "</div>";

        index_more = layer.open({
            type: 1,
            title: "",
            skin: 'demo-class',
            shadeClose: true,
            closeBtn: 0,
            area: ['200px', '140px'],
            content: htmlstr
        });

        $("#publicMsgOK").click(function () {
            layer.close(index_more);

        });
        //$("#inp_say").focus();
        sendPublic = 'toall';
        sel_userid = '';

        $("#goTop").show();
        $("#warningReport,#doBlack,#doAD").show();
        $("#goBottom").show();

        $("#div_msgbox_first").hide();
        $("#div_msgbox").show();
        $("#div_privmsg").hide();
        $('#div_msgbox').scrollTop($('#div_msgbox')[0].scrollHeight);

    });

    $(".btn_Show_Myinfos").click(function () {

        $(".userInfo").fadeOut(300);
        setTimeout(function () { $(".userInfo").fadeIn(); }, 300);
    });

    $(".btn_Show_Leave_Message").unbind("click").click(function () {

        XR();

        //var htmlstr = "<div id='more_fun'>" +
        //"<div style='margin: 15px 5px;margin-top:33px;text-align:center;color: #666;'>您可以发表公共消息了</div>" +
        //"<div style='margin: 15px 5px;text-align:center;'><button id='publicMsgOK' type='button' class='btn btn-success' style='margin: 10px 5px;text-align:center;'>确定</button></div>" +
        //"</div>";

        //index_more = layer.open({
        //    type: 1,
        //    title: "",
        //    skin: 'demo-class',
        //    shadeClose: true,
        //    closeBtn: 0,
        //    area: ['200px', '140px'],
        //    content: htmlstr
        //});

        //$("#publicMsgOK").click(function () {
        //    layer.close(index_more);
        //});

        //layer.msg("您可以在此发表公共消息了<br/>审核通过才可对外显示哦", { time: 3000 });

        ////$("#inp_say").focus();
        //sendPublic = 'toall';
        //sel_userid = '';

        //$("#goTop").show();
        ////$("#warningReport").show();
        //$("#goBottom").show();

        //$(".input-main").show();
        //$("#btn_random").hide();
        //$("#btn_random_break").hide();
        //$("#btn_random_return").show();

        //$("#div_msgbox_first").hide();
        //$("#div_msgbox").show();
        //$("#div_privmsg").hide();
        //$('#div_msgbox').scrollTop($('#div_msgbox')[0].scrollHeight);

        //$(".userList").removeClass("active");
        ////$(".userList").css("color", sel_userid == cur_rauthor ? "orange" : "black");
        //$(".userList").css("color", "black");
        //$(".userList").css("background-color", "#BBB");

    });

}

var layerOpenSNSInfo;
// 社区介绍
$(".btn_Show_SNSInfo").unbind("click").click(function () {

    layerOpenSNSInfo = layer.open({
        type: 2,
        title: '',
        closeBtn: 0,
        maxmin: false,
        shadeClose: true,
        area: ['350px', '512px'],
        //content: ['/list/70', 'no'], // 去掉滚动条
        content: '/SNSInfo.html?v1'
    });

    //$("#div_msgbox_first").hide();
    ////$("#div_SNSInfo").fadeIn(200);
    //$("#div_SNSInfo").slideDown(200);
    //$("#div_privmsg").hide();
    //$('#div_SNSInfo').scrollTop(0);

});

// 社区介绍返回
$("#btn_SNSInfo_return").click(function () {

    $(".userList").removeClass("active");
    $(".userList").css("color", "black");

    $(".layui-layer-tips").css('display', 'none');

    $("#msg_title").html("");
    sel_userid = "";

    $(".input-main").hide();
    $("#btn_random").show();
    $("#btn_random_break").hide();
    $("#btn_random_return").hide();

    $("#goTop").hide();
    $("#warningReport,#doBlack,#doAD").hide();
    $("#goBottom").hide();

    $("#div_msgbox_first").show();
    $("#div_msgbox").hide();
    $("#div_privmsg").hide();

    $("#div_SNSInfo").hide();

    layer.close(inputStatusTips);
    inputStatusTips = null;

});

$(".btn_Orders").click(function () {

    window.open("http://weixin.nmpipei.com/shop/orders.aspx");

})

$(".btn_QR_Share").click(function () {

    //console.info(ws_addr);
    //console.info(ws_addr.split(':')[2]);

    fun_loading(true);

    // 用户历史消息获取
    var url = '' + '/asmx/method.asmx/randomVIPGetQRShareImg_My';
    var method = 'get';
    var ifAsync = true;
    var tempdd = '{"myUserID":"' + (typeof ($.cookie('user_id')) == "undefined" ? "" : $.cookie('user_id')) + '","area":"' + ws_addr.split(':')[2] + '"}';
    var sendJsonData = $.parseJSON(tempdd);

    //var resultData = ZQLAjaxJson(url, method, ifAsync, sendJsonData);

    $.ajax(
    {
        type: method,
        url: url,
        async: ifAsync,  // 是否多线程异步处理
        dataType: "json",
        cache: false,
        timeout: 5000,
        data: sendJsonData,
        success: function (data) {

            if (data.code == 0) {

                var NoticeStr = "<div style='padding: 10px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;'>";
                NoticeStr += "<div style='text-align:center;margin-bottom:0px;'></div>";
                NoticeStr += "<div style='text-align:center;margin-bottom:10px;color:aqua;'>【" + Notice1_WXGZHTitle + "】</div>";
                NoticeStr += "<div style=text-align:center;margin-bottom:15px;><img width='200' height='auto' src='/" + data.msg + "'></div>";
                NoticeStr += "<div style='text-align:center;'></div>";
                NoticeStr += "<div style='text-align:center;color:#BBB;font-size:10px;'>长按保存图片分享到社交平台<br/>您的好友就能用匿名身份与您交流了哦 ^_^</div>";
                NoticeStr += "</div>";

                //公告层
                layer.open({
                    type: 1
                  , title: false //不显示标题栏
                  , closeBtn: true
                  , area: '250px'
                  , shade: 0.3
                  , id: 'NoticeShow1' //设定一个id，防止重复弹出
                    //, btn: ['火速围观', '残忍拒绝']
                  , btnAlign: 'l'
                  , moveType: 1 //拖拽模式，0或者1
                  , content: NoticeStr
                  , offset: ['30px']
                  , success: function (layero) {
                      //var btn = layero.find('.layui-layer-btn');
                      //btn.find('.layui-layer-btn0').attr({
                      //    href: 'http://www.layui.com/'
                      //  , target: '_blank'
                      //});
                  }
                });

            }
            else {
                layer.msg('获取专属分享海报失败,请重试', { time: 1000 });
            }

            fun_loading(false);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            layer.msg('网络延迟，请稍后再试哈');

            if (textStatus == "timeout") {

                //resultData = $.parseJSON('{"code":"-1","msg":"网络延迟：' + errorThrown + '","data":{}}');
                layer.msg('网络延迟,请稍后重试');

            }
            else {

                //resultData = $.parseJSON('{"code":"-2","msg":"失败：' + textStatus + errorThrown + '","data":{}}');
                layer.msg('通讯失败:<br/>' + errorThrown);

            }

        },
        complete: function () {

            fun_loading(false);

        }

    });


});


$(".btn_Reload").click(function () {

    var layerReload = layer.alert('确定刷新？', {
        time: 0, skin: 'demo-class', title: '',
        btn: ['确定', '取消'],
        //icon: 6,
        btn1: function () { layer.close(layerReload); fun_loading(true); setTimeout(function () { window.location.reload(); }, 500) },
        btn2: function () { layer.close(layerReload); }
    })

})

$(".btn_Repair").click(function () {

    Del_Cookies();

})

//jquery扩展
$.fn.extend({
    insertAtCaret: function (myValue) {
        var $t = $(this)[0];
        if (document.selection) {
            this.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
            this.focus();
        } else
            if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
    }//在光标处插入文本
});

//当浏览器窗口大小改变时，设置显示内容的高度  
//window.onresize = function () {
//    init_control();
//}

//对组件进行设置
function init_control() {
    //    $("#zone_left .list-group").height(window.innerHeight - 225);//左侧栏的高度
    //    $("#div_msgpanel").width((window.innerWidth - 100) * 0.51);
    //    $("#div_msgpanel").height(window.innerHeight - 200);
    //    $("#div_msgbox").height(window.innerHeight - 246);
    //    $("#div_privmsg").height(window.innerHeight - 246);
    //    $(".hotrooms_title").width(window.innerWidth - 340 - $("#div_msgpanel").width());
    //    $("#hotrooms").height($("#div_msgbox").height());
    //    $("#zone_left").show();
    //    $("#zone_center").show();


    if (!$.cookie('user_id')) {
        $("#Tips_Warn").prepend('<span style="color:#666;" onclick="login()">【当前为匿名状态，建议点击此处注册登录保留好友纪录】</span><br/>');
        //layer.msg('当前为匿名状态<br/>建议点击此处注册登录保持好友与纪录', { icon: 6 });
    }
    else {
        $("#UserID").html($.cookie('user_id'));
    }

    $("body").height(window.innerHeight);//body 的高度

    if (wx) {
        $("#div_privmsg").css('height', '91%');
    }

    if ($.cookie('isSound') == 1 || !$.cookie('isSound')) {
        $("#msg_tips").attr('src', "/img/sys/sound_on.png");
    }
    else {
        $("#msg_tips").attr('src', "/img/sys/sound_off.png");
    }

    if ($.cookie('isMoon') == 1) {

        $("#theme_sun_moon").attr('src', "/img/sys/moon1.png");
        //$("#themeChange").attr('href', '/css/random-black.css?v' + Math.ceil(Math.random() * 99999))
        $("#themeChange").attr('href', '/css/random-black.css')

    }
    else {

        $("#theme_sun_moon").attr('src', "/img/sys/sun1.png");
        //$("#themeChange").attr('href', '/css/random.css?v' + Math.ceil(Math.random() * 99999))
        $("#themeChange").attr('href', '/css/random.css')

    }

}


//获取页面地址的参数
function init_geturlparams() {
    var request = {
        QueryString: function (val) {
            var uri = window.location.search;
            var re = new RegExp("" + val + "=([^&?]*)", "ig");
            return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
        }
    }
    if (request.QueryString("rname") != null) {
        $.cookie('room_name_random', decodeURIComponent(request.QueryString("rname")), { expires: 365 });
        $.cookie('room_psw_random', (!request.QueryString("rpsw") ? cur_rpsw : decodeURIComponent(request.QueryString("rpsw"))), { expires: 365 });
        window.location.href = 'h5.html'
        return false;
    }
    else {
        $("body").show();
        return true;
    }
}

//获取昵称
function fun_getnickname(isauto) {
    if (!$.cookie('user_id') || !$.cookie('user_nickname_random') || !$.cookie('room_name_random') || !isauto) {

        //$.getJSON("/getrannick12.js?", { act: "getRanNick" }, function (json) {
        fun_loading(true);

        setTimeout(function () {

            $.getJSON("/Act/WebService.asmx/getRandnikename", { act: "getRanNick" }, function (json) {

                if (json.state == "OK") {

                    //fun_loading(false);

                    if (!$.cookie('user_id'))
                        $.cookie('user_id', json.msg.id, { expires: 365 });
                    if (!$.cookie('room_name_random'))
                        $.cookie('room_name_random', cur_rname, { expires: 365 });
                    if (!$.cookie('room_psw_random'))
                        $.cookie('room_psw_random', cur_rpsw, { expires: 365 });
                    if (!isauto)
                        sendJson('chgname', json.msg.nickname, true);
                    else {
                        $.cookie('user_nickname_random', json.msg.nickname, { expires: 365 });
                        $("#inp_nickname").val(json.msg.nickname);
                        $("#inp_nickname_other").val(json.msg.nickname);
                    }
                    if (!ws) {
                        fun_initWebSocket();
                    }

                    $("#UserID").html($.cookie('user_id'));

                }
                else {
                    //fun_loading(false);
                    layer.msg(json.msg, { icon: 6 });
                }

            });

            //get_referrer();

        }, 300);
    }
    else {
        if (!ws)
            fun_initWebSocket();
        $("#inp_nickname").val($.cookie('user_nickname_random'));
        $("#inp_nickname_other").val($.cookie('user_nickname_random'));

        //get_referrer();

    }


}


// 重连超过 3 次提示注销
var reConnectCount = 0;

//定义socket
function fun_initWebSocket() {
    if (ifAutoConn) {
        if (isconning) {
            layer.msg('排队进入中...');
            return;
        }

        layer.msg('排队进入中...');

        reConnectCount++;

        isconning = true;
        ws = new WebSocket(ws_addr);
        ws.onopen = function (e) {

            reConnectCount = 0;

            isconning = false;
            $("#btn_conn").attr("disabled", true);
            $(".layui-layer-tips").css('display', 'none');
            clearInterval(tick_autoConnect);
            tick_autoConnect = null;
            che_message_focus = 0;
            //sendJson('sign', '{"rname":"' + $.cookie("room_name_random") + '","rpsw":"' + $.cookie("room_psw_random") + '","first_message_time":"' + first_message_time + '"}', true);     // 2018-07-16 重启服务端后用户可直接进入之前的带密码的房间
            if ($.cookie('randomVipCode')) {
                sendJson('sign', '{"rname":"公共场所","rpsw":"","first_message_time":"' + first_message_time + '","randomvipcode":"' + randomVipCode + '","randomvipsex":"' + switchvipsex + '","randomvipaddress":"' + switchVipAddress + '","randomhealthmode":"' + switchHealthMode + '"}', true);     // 2018-07-16 重启服务端后用户可直接进入之前的带密码的房间
            }
            else {
                sendJson('sign', '{"rname":"公共场所","rpsw":"","first_message_time":"' + first_message_time + '","randomhealthmode":"' + switchHealthMode + '"}', true);     // 2018-07-16 重启服务端后用户可直接进入之前的带密码的房间
            }
        };
        ws.onmessage = function (e) {
            fun_loading(false);
            var json = $.parseJSON(e.data);

            //  2018-06-27 注销房间删除后，用户一直连不上的问题
            if (json.content == "房间密码错误") {
                //$.cookie('user_id', '', { expires: 365 });
                //$.cookie('user_nickname_random', '', { expires: 365 });
                $.cookie('room_name_random', '', { expires: 365 });
                $.cookie('room_psw_random', '', { expires: 365 });
                //fun_getnickname(true);
                window.location.reload();
            }

            switch (json.code) {
                case -3: fun_closeOld(ws); break;//有新链接，旧的断开
                case -2: fun_fkxx(json.content); break;//反馈信息
                case -1: isforceOut = json.forceout; setTimeout(function () { Double_Con_Limit(json) }, 0); break;//警告信息
                    //case 1: fun_bindList(json); break;//历史用户列表
                    //case 2: fun_newuser(json); break;//新用户登录
                case 3: fun_userlogout(json); break;//用户离线
                case 4: fun_userchgname(json); break;//用户更改名称
                case 5: fun_recbrodata(json); break;//接收广播消息
                case 6: fun_bindtoallmsg(json); break;//绑定所有的广播消息
                case 7: fun_fromusermsg(json); break;//用户发送的新私信
                    //case 8: fun_getprivmsg(json); break;//获取私信内容
                case 9: fun_msgrevoke(json); break;//撤回消息
                    //case 10: fun_showhotrooms(json); break;//热门房间排行
                case 11: fun_NoticeShow(json); break;// 全体公告
                case 12: Con_Succ(json.content); break;// 连接服务器成功
                case 13: random_queue_get_random(json.content); break;// 进入随机好友队列
                case 130: random_queue_get_viprandom(json); break;// 您的激活码已过期
                case 131: random_queue_get_viprandom(json); break;// 您的激活码不存在
                case 132: random_queue_get_viprandom(json); break;// 您的激活码已激活
                case 133: random_queue_get_viprandom(json); break;// 已进入VIP匹配队列
                case 134: random_queue_get_viprandom(json); break;// 已进入VIP匹配队列,额外情况
                case 135: random_queue_get_viprandom(json); break;//  vip 激活码防止多人同时使用
                case 136: random_queue_get_viprandom(json); break;//  暂无
                case 137: random_queue_get_viprandom(json); break;//  vip激活码不能为空
                case 138: random_queue_get_viprandom(json); break;//  vip激活码不能为空
                case 139: random_queue_get_viprandom(json); break;//  vip激活码不能为空
                case 14: random_queue_get_random_cancel(json.content); break;// 退出随机好友队列
                case 15: random_queue_get_random_getID(json); break;// 获取随机好友ID
                case 16: random_queue_get_random_Out(); break;// 获取随机好友-对方离开
                case 17: fun_userchgsexaddress(); break;// 用户更改性别和地址开关
                case 18: fun_inputStatusOn(); break;// 触发输入提示
                case 19: fun_inputStatusOff(); break;// 停止输入提示
                case 20: fun_barrager(json); break;// 弹幕
                case 21: limitTips(json); break;// 违规禁止访问
                case 22: layer.msg('【举报成功】<br/>感谢您的反馈！<br/>已将对方列入黑名单<br/>您已不会再收到其所发信息', { time: 5000 }); break;// 对被举报用户进行检测
                case 30: ShowUserLoginInfo(json); break;// 查看用户登陆信息
                default: layer.msg(json.content, { time: 5000 }); break;// 显示服务端自定义信息
            }
        };
        ws.onclose = function (e) {

            isconning = false;
            $("#btn_conn").attr("disabled", false);
            clearInterval(tick_heartpac);

            if (!tick_autoConnect) {
                if (!isforceOut) {
                    layer.msg('排队进入中...');

                    if ($("#div_msgbox_first").is(':visible')) {
                        $("#btn_random").show();
                        $("#btn_random_break").hide();
                        $("#btn_random_return").hide();
                    }
                    else {
                        $("#goTop").show();
                        $("#warningReport,#doBlack,#doAD").show();
                        $("#goBottom").show();

                        $("#btn_random").hide();
                        $("#btn_random_break").hide();
                        $("#btn_random_return").show();
                    }


                    //$("#div_msgbox_first").show();
                    //$("#div_msgbox").hide();
                    //$("#div_privmsg").hide();

                    try {
                        layer.close(index_more);
                    }
                    catch (err) {

                    }

                    tick_autoConnect = setInterval(function () {
                        //ws.close();

                        if (reConnectCount < 4) {
                            fun_initWebSocket();
                        }
                        else {
                            clearInterval(tick_autoConnect);
                            tick_autoConnect = null;

                            layer.msg('检测到您多次连接失败<br/>请检查网络连接是否正常', { time: 10000 });

                            //var layerreConnectCount = layer.alert('检测到您多次连接失败<br/>您可以使用本页面的【注销】功能', {
                            //    time: 0, skin: 'demo-class', title: '',
                            //    btn: ['确定', '取消'],
                            //    //icon: 6,
                            //    btn1: function () { layer.close(layerreConnectCount); Del_Cookies(); },
                            //    btn2: function () { layer.close(layerreConnectCount); }
                            //});

                        }


                    }, 2000);

                }
            }
        };

    }
    else {
        clearInterval(tick_autoConnect);
        tick_autoConnect = null;
        layer.alert('请勿重复登陆<br/>如没有重复登陆,可尝试关闭所有本社区页面<br/>（检查微信悬浮窗是否已有登陆）<br/>等待30秒后再访问或直接使用页面【注销】功能', { icon: 6, title: '【断开连接】' });
    }

}

// 封禁提示
function limitTips(json) {
    //layer.msg(json.content, { time: 5000 });
    layer.msg("您因违反规定，已被禁言<br/>非恶意违规者 2 分钟自动解封，如误封<br/>请将页面下方【身份码】发给客服进行申诉", { time: 10000 });
}


//$(function () { setTimeout(fun_barrager_first, 1000); });

// 登陆弹幕
function fun_barrager_first() {

    var item = {
        img: '/img/sys/logoBarragerAD.png', //图片
        info: '虚拟恋人、在线哄睡解压、游戏陪玩、情感导师', //文字
        href: 'https://weidian.com/?userid=297880287&spider_token=6c3e', //链接
        //href: '', //链接
        close: true, //显示关闭按钮
        speed: 8, //延迟,单位秒,默认6，数字越大越慢
        //bottom: 70, //固定距离底部高度,单位px,默认随机
        color: 'yellow', //颜色,默认白色
        old_ie_color: '#000000', //ie低版兼容色,不能与网页背景相同,默认黑色
    }

    $('body').barrager(item);

}

// 弹幕
function fun_barrager(json) {

    var item = {
        img: json.img, //图片
        info: json.info, //文字
        href: json.href, //链接
        close: true, //显示关闭按钮
        speed: 8, //延迟,单位秒,默认6，数字越大越慢
        //bottom: 70, //固定距离底部高度,单位px,默认随机
        color: json.color, //颜色,默认白色
        old_ie_color: '#000000', //ie低版兼容色,不能与网页背景相同,默认黑色
    }

    $('body').barrager(item);

}

//$(function () { setTimeout(fun_Notice_first, 3000); });

// 登陆公告
function fun_Notice_first() {

    var json = $.parseJSON('{"code":11,"content":"<span style=\'color:red;font-weight: 700;\'>【重要！已有用户被骗！】</span><br/>千万不要添加对方qq或微信好友后安装其发给的app，已有人安装后【中毒】导致通讯录和相册视频等信息被盗，然后被勒索，社区已配合警方追查，请大家一定要小心！"}');

    var NoticeType = json.content;

    switch (NoticeType) {

        case "0": location.reload([true]); break;//刷新页面
        case "1": Notice1(); break;//关注微信公众号 【Deskry 匿名社区】
        case "2": Notice2(); break;//请文明聊天...
        case "3": Notice3(); break;//运维更新
        default: Notice(json); break;//自定义

    }

}

// 公告
function fun_NoticeShow(json) {

    //layer.alert(json.content, { icon: 6, title: '【网站公告】' });

    var NoticeType = json.content;

    switch (NoticeType) {

        case "0": location.reload([true]); break;//刷新页面
        case "1": Notice1(); break;//关注微信公众号 【Deskry 匿名社区】
        case "2": Notice2(); break;//请文明聊天...
        case "3": Notice3(); break;//运维更新
        default: Notice(json); break;//自定义

    }

}

var layerOpen_Notice;
function Notice(json) {

    layer.close(layerOpen_Notice);

    setTimeout(function () {

        var NoticeStr = "<div style='padding: 10px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;text-align:center;'>";
        NoticeStr += json.content;
        NoticeStr += "<div class='loginTipsKF'>";
        //NoticeStr += "<div>官方微信公众号【Deskry 匿名社区】</div>";
        NoticeStr += "<div>客服QQ：<a href='http://wpa.qq.com/msgrd?v=3&uin=2868355448&site=qq&menu=yes' target='_blank'>2868355448</a></div>";
        NoticeStr += "<div>客服微博：Deskry</div>";
        NoticeStr += "</div>";
        NoticeStr += "</div>";

        //公告层
        layerOpen_Notice = layer.open({
            type: 1
          , title: false //不显示标题栏
          , closeBtn: true
          , area: '250px'
          , shade: 0.3
            , id: 'NoticeShow' //设定一个id，防止重复弹出
            //, btn: ['火速围观', '残忍拒绝']
          , btnAlign: 'l'
          , moveType: 1 //拖拽模式，0或者1
          , content: NoticeStr
          , success: function (layero) {
              //var btn = layero.find('.layui-layer-btn');
              //btn.find('.layui-layer-btn0').attr({
              //    href: 'http://www.layui.com/'
              //  , target: '_blank'
              //});
          }
        });

    }, 200);



}

// 获取 url 参数值 调用 getQueryVariable("image") 
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return ('');
}

function Notice1() {

    if (!wx || (wx && getQueryVariable('tg') == '1')) {

        var NoticeStr = "<div style='padding: 10px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;'>";
        NoticeStr += "<div style='text-align:center;margin-bottom:0px;'>官方微信公众号上线啦</div>";
        NoticeStr += "<div style='text-align:center;margin-bottom:0px;color:aqua;'>【" + Notice1_WXGZHTitle + "】</div>";
        NoticeStr += "<div style=text-align:center;margin-bottom:15px;><img width='200' height='200' src='/img/sys/weixin/" + Notice1_WXGZH + "'></div>";
        NoticeStr += "<div style='text-align:center;'>【长按保存图片 用微信扫一扫】</div>";
        NoticeStr += "<div style='text-align:center;color:#BBB;font-size:10px;'>关注后访问更便捷，功能更强大<br/>微信公众号内访问无此弹窗 ^_^</div>";
        NoticeStr += "</div>";

        //公告层
        layer.open({
            type: 1
          , title: false //不显示标题栏
          , closeBtn: true
          , area: '250px'
          , shade: 0.3
          , id: 'NoticeShow1' //设定一个id，防止重复弹出
            //, btn: ['火速围观', '残忍拒绝']
          , btnAlign: 'l'
          , moveType: 1 //拖拽模式，0或者1
          , content: NoticeStr
          , success: function (layero) {
              //var btn = layero.find('.layui-layer-btn');
              //btn.find('.layui-layer-btn0').attr({
              //    href: 'http://www.layui.com/'
              //  , target: '_blank'
              //});
          }
        });

    }
}

function Notice2() {

    var NoticeStr = "<div style='padding: 10px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;letter-spacing:0px;'>";
    NoticeStr += "<div style='text-align:center;margin-bottom:5px;font-weight: 700;font-size:15px;color:red;'>【重要公告】</div>";
    NoticeStr += "<div style='text-align:center;color:#DEDEDE;'>请文明和谐交流</div>";
    NoticeStr += "<div style='text-align:center;color:#DEDEDE;'>营造良好的网络环境</div>";
    NoticeStr += "<div style='text-align:center;color:#DEDEDE;'>发布非法、违规图片或言论</div>";
    NoticeStr += "<div style='text-align:center;color:#DEDEDE;'>会被禁止访问</div>";
    NoticeStr += "<div style='text-align:center;color:#DEDEDE;'>并且屏蔽违规聊天内容</div>";
    NoticeStr += "<div style='text-align:center;color:#DEDEDE;'>如您发现受到骚扰</div>";
    NoticeStr += "<div style='text-align:center;color:#DEDEDE;'>可联系客服人员处理</div>";
    NoticeStr += "<ul class='loginTipsKF'>";
    //NoticeStr += "<li><span>微信公众号：</span><span>Deskry 匿名社区</span></li>";
    NoticeStr += "<li><span>客服QQ：</span><span><a href='http://wpa.qq.com/msgrd?v=3&uin=2868355448&site=qq&menu=yes' target='_blank'>2868355448</a></span></li>";
    NoticeStr += "<li><span>客服微博：</span><span>Deskry</span></li>";
    NoticeStr += "</ul>";
    NoticeStr += "</div>";

    //公告层
    layer.open({
        type: 1
      , title: false //不显示标题栏
      , closeBtn: true
      , area: '280px;'
      , shade: 0.3
      , id: 'NoticeShow2' //设定一个id，防止重复弹出
        //, btn: ['火速围观', '残忍拒绝']
      , btnAlign: 'l'
      , moveType: 1 //拖拽模式，0或者1
      , content: NoticeStr
      , success: function (layero) {
          //var btn = layero.find('.layui-layer-btn');
          //btn.find('.layui-layer-btn0').attr({
          //    href: 'http://www.layui.com/'
          //  , target: '_blank'
          //});
      }
    });

}

function Notice3() {

    var NoticeStr = "<div style='padding: 10px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;letter-spacing:0px;'>";
    NoticeStr += "<div style='text-align:center;margin-bottom:5px;font-weight: 700;font-size:15px;color:red;'>【系统升级维护】</div>";
    NoticeStr += "<div style='text-align:center;color:#DEDEDE;'>即将进行进行版本更新</div>";
    NoticeStr += "<div style='text-align:center;color:#DEDEDE;'>预计耗时几分钟以内</div>";
    NoticeStr += "<div style='text-align:center;color:#DEDEDE;'>期间可能导致某些功能异常</div>";
    NoticeStr += "<div style='text-align:center;color:#DEDEDE;'>有特别要求请及时与客服反馈</div>";
    NoticeStr += "<div style='text-align:center;color:#DEDEDE;'>请知悉，谢谢</div>";
    NoticeStr += "<ul class='loginTipsKF'>";
    //NoticeStr += "<li><span>微信公众号：</span><span>Deskry 匿名社区</span></li>";
    NoticeStr += "<li><span>客服QQ：</span><span><a href='http://wpa.qq.com/msgrd?v=3&uin=2868355448&site=qq&menu=yes' target='_blank'>2868355448</a></span></li>";
    NoticeStr += "<li><span>客服微博：</span><span>Deskry</span></li>";
    NoticeStr += "</ul>";
    NoticeStr += "</div>";

    //公告层
    layer.open({
        type: 1
      , title: false //不显示标题栏
      , closeBtn: true
      , area: '280px;'
      , shade: 0.3
      , id: 'NoticeShow3' //设定一个id，防止重复弹出
        //, btn: ['火速围观', '残忍拒绝']
      , btnAlign: 'l'
      , moveType: 1 //拖拽模式，0或者1
      , content: NoticeStr
      , success: function (layero) {
          //var btn = layero.find('.layui-layer-btn');
          //btn.find('.layui-layer-btn0').attr({
          //    href: 'http://www.layui.com/'
          //  , target: '_blank'
          //});
      }
    });

}

//console.info("sdfsdfdsfdf".indexOf('dfs'));
//console.info("sdfsdfdsfdf".indexOf('=='));

// 防止重复连接
function Double_Con_Limit(json) {
    var layerCon = layer.alert(json.content, { time: 0, title: '', btn: ['我仍然要连接', '知道了'], icon: 6, btn1: function () { Del_Cookies(); }, btn2: function () { layer.close(layerCon); } })
}

var FirtConSucc = 0;

// 连接服务器成功
function Con_Succ(content) {

    layer.msg(content, { time: 1 * 1000 })

    if (FirtConSucc == 0) {
        Con_SuccInitInfo();
    }

    FirtConSucc++;

    // 获取当前用户聊天历史信息
    fun_getUserOldMsgs(1, 0);

    //$("#div_msgbox_first").show();
    //$("#div_msgbox").hide();
    //$("#div_privmsg").hide();
}

// 登录成功后获取历史用户列表相关信息
function Con_SuccInitInfo() {

    $("#user_Random").click()

}

// 获取未收藏人员
$("#user_Random").click(function () {

    //return false;

    //if (FirtConSucc != 0) {
    //    var url = window.location.href;
    //    var valiable = url.split('?')[0];
    //    window.history.pushState({}, 0, valiable);
    //}

    fun_loading(true);

    CurrUserType = '0';

    var url = '/asmx/method.asmx/randomVIPGetHistoryUserList_Random';
    var method = 'post';
    var ifAsync = true;
    var tempdd = '{"myUserID":"' + (typeof ($.cookie('user_id')) == "undefined" ? "" : $.cookie('user_id')) + '","vipcode":"' + randomVipCode + '","serverPort":"' + ws_addr.split(':')[2] + '"}';
    var sendJsonData = $.parseJSON(tempdd);

    //var resultData = ZQLAjaxJson(url, method, ifAsync, sendJsonData);

    var resultData;

    $.ajax(
    {
        type: method,
        url: url,
        async: ifAsync,  // 是否多线程异步处理
        dataType: "json",
        cache: false,
        timeout: 5000,
        data: sendJsonData,
        success: function (data) {

            resultData = $.parseJSON('{"code":"0","msg":"成功","data":' + JSON.stringify(data) + '}');

            var list = resultData.data;
            var htmlstr = "";
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == $.cookie("user_id"))
                    continue;
                dic_userlist[list[i].id] = list[i].nickname;
                var color = list[i].id == cur_rauthor ? "orange" : "black";//用户的颜色

                if ($.trim(list[i].nickname) != "") {
                    htmlstr += "<a id='userid_" + list[i].id + "' class='list-group-item userList' style='color:" + color + "' onfocus='this.blur()' onclick='click_userlist(id);'>" +
                        "<img id='doheart_userid_" + list[i].id + "' onclick='DoHeartUser(id);' alt='点击收藏' src='/img/sys/emptyheart.png' style='position: absolute;top: 2px;left: 0px;width: 20px;margin: 8px;z-index: 1;' />" +
                        "<span class='badge'></span><span style='margin-right:5px;position: absolute;top: 9px;left: 28px;' class='zql-bnt-user'></span>" +
                        "<span style='margin-left: 40px;' class='nickname'>" + list[i].nickname + "<span>" +
                        "<i id='manage_userid_" + list[i].id + '_' + list[i].nickname + "' class='layui-icon layui-icon-more-vertical' style='float: right;'  onclick='ManageUser(id);'></i></a>";

                }
            }

            $("#div_msgbox").html("");
            //$("#msg_title").html(cur_rname);
            $("#user_list").html(htmlstr);
            $("#nowusers_count").text(list.length);

            $("#user_Random").css("background-color", "#009688");
            $("#user_My").css("background-color", "#EEE");

            if (getQueryVariable('touserid') && getQueryVariable('tousername')) {

                var htmlstr = "<a id='userid_" + getQueryVariable('touserid') + "' class='list-group-item userList' style='color:black' onfocus='this.blur()' onclick='click_userlist(id);'>" +
                            "<img id='doheart_userid_" + getQueryVariable('touserid') + "' onclick='DoHeartUser(id);' alt='点击收藏' src='/img/sys/emptyheart.png' style='position: absolute;top: 2px;left: 0px;width: 20px;margin: 8px;z-index: 1;' />" +
                            "<span class='badge'></span><span style='margin-right:5px;position: absolute;top: 9px;left: 28px;' class='zql-bnt-user'></span>" +
                            "<span style='margin-left: 40px;' class='nickname'>" + '【私聊】- ' + decodeURI(getQueryVariable('tousername')) + "<span>" +
                "<i id='manage_userid_" + getQueryVariable('touserid') + '_' + '【私聊】- ' + decodeURI(getQueryVariable('tousername')) + "' class='layui-icon layui-icon-more-vertical' style='float: right;'  onclick='ManageUser(id);'></i></a>";


                $("#user_list").prepend(htmlstr);

            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            layer.msg('网络延迟，请稍后再试哈');

            if (textStatus == "timeout") {

                resultData = $.parseJSON('{"code":"-1","msg":"网络延迟：' + errorThrown + '","data":{}}');

            }
            else {

                resultData = $.parseJSON('{"code":"-2","msg":"失败：' + textStatus + errorThrown + '","data":{}}');

            }

        },
        complete: function () {
            fun_loading(false);
        }

    })





});

// 获取已收藏人员
$("#user_My").click(function (e) {

    //return false;

    fun_loading(true);

    CurrUserType = '1';

    var url = '/asmx/method.asmx/randomVIPGetHistoryUserList_My';
    var method = 'post';
    var ifAsync = true;
    var tempdd = '{"myUserID":"' + (typeof ($.cookie('user_id')) == "undefined" ? "" : $.cookie('user_id')) + '","vipcode":"' + randomVipCode + '","serverPort":"' + ws_addr.split(':')[2] + '"}';
    var sendJsonData = $.parseJSON(tempdd);

    //var resultData = ZQLAjaxJson(url, method, ifAsync, sendJsonData);

    var resultData;

    $.ajax(
    {
        type: method,
        url: url,
        async: ifAsync,  // 是否多线程异步处理
        dataType: "json",
        cache: false,
        timeout: 5000,
        data: sendJsonData,
        success: function (data) {

            resultData = $.parseJSON('{"code":"0","msg":"成功","data":' + JSON.stringify(data) + '}');

            var list = resultData.data;
            var htmlstr = "";
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == $.cookie("user_id"))
                    continue;
                dic_userlist[list[i].id] = list[i].nickname;
                var color = list[i].id == cur_rauthor ? "orange" : "black";//用户的颜色

                if ($.trim(list[i].nickname) != "") {
                    htmlstr += "<a id='userid_" + list[i].id + "' class='list-group-item userList' style='color:" + color + "' onfocus='this.blur()' onclick='click_userlist(id);'>" +
                        "<img id='cancleheart_userid_" + list[i].id + "' onclick='CancleHeartUser(id);' alt='点击取消收藏' src='/img/sys/heart.png' style='position: absolute;top: 2px;left: 0px;width: 20px;margin: 8px;z-index: 1;' />" +
                        "<span class='badge'></span><span style='margin-right:5px;position: absolute;top: 9px;left: 28px;' class='zql-bnt-user'></span>" +
                        "<span style='margin-left: 40px;' class='nickname'>" + list[i].nickname + "<span>" +
                        "<i id='manage_userid_" + list[i].id + '_' + list[i].nickname + "' class='layui-icon layui-icon-more-vertical' style='float: right;'  onclick='ManageUser(id);'></i></a>";

                }
            }

            $("#div_msgbox").html("");
            //$("#msg_title").html(cur_rname);
            $("#user_list").html(htmlstr);
            $("#nowusers_count").text(list.length);

            $("#user_Random").css("background-color", "#EEE");
            $("#user_My").css("background-color", "#009688");

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            layer.msg('网络延迟，请稍后再试哈');

            if (textStatus == "timeout") {

                resultData = $.parseJSON('{"code":"-1","msg":"网络延迟：' + errorThrown + '","data":{}}');

            }
            else {

                resultData = $.parseJSON('{"code":"-2","msg":"失败：' + textStatus + errorThrown + '","data":{}}');

            }

        },
        complete: function () {
            fun_loading(false);
        }

    })

});


// 收藏某个用户
function DoHeartUser(doheartuserid) {

    //return false;

    event.stopPropagation();

    fun_loading(true);

    var tuserid = doheartuserid.split('_')[2];

    // 用户历史消息获取
    var url = '' + '/asmx/method.asmx/random_MyHeart_Do';
    var method = 'post';
    var ifAsync = true;
    var tempdd = '{"myUserID":"' + (typeof ($.cookie('user_id')) == "undefined" ? "" : $.cookie('user_id')) + '","UserToID":"' + tuserid + '","vipcode":"' + randomVipCode + '","serverPort":"' + ws_addr.split(':')[2] + '"}';
    var sendJsonData = $.parseJSON(tempdd);

    //var resultData = ZQLAjaxJson(url, method, ifAsync, sendJsonData);

    $.ajax(
    {
        type: method,
        url: url,
        async: ifAsync,  // 是否多线程异步处理
        dataType: "json",
        cache: false,
        timeout: 5000,
        data: sendJsonData,
        success: function (data) {

            if (data.code == 0) {
                layer.msg('收藏成功', { time: 1000 });
                $("#" + doheartuserid).parent('a').remove();
            }
            else if (data.code == -10) {
                layer.msg('您的请求异常，请刷新重试哦', { time: 1000 });
            }
            else if (data.code == -11 || data.code == -12) {
                checkVipUser();
            }
            else {
                layer.msg('收藏失败,请重试', { time: 1000 });
            }

            fun_loading(false);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            layer.msg('网络延迟，请稍后再试哈');

            if (textStatus == "timeout") {

                //resultData = $.parseJSON('{"code":"-1","msg":"网络延迟：' + errorThrown + '","data":{}}');
                layer.msg('网络延迟,请稍后重试');

            }
            else {

                //resultData = $.parseJSON('{"code":"-2","msg":"失败：' + textStatus + errorThrown + '","data":{}}');
                layer.msg('通讯失败:<br/>' + errorThrown);

            }

        },
        complete: function () {

            fun_loading(false);

        }

    })

}

// 取消收藏某个用户
function CancleHeartUser(doheartuserid) {

    //return false;

    event.stopPropagation();

    fun_loading(true);

    var tuserid = doheartuserid.split('_')[2];

    // 用户历史消息获取
    var url = '' + '/asmx/method.asmx/random_MyHeart_Cancle';
    var method = 'post';
    var ifAsync = true;
    var tempdd = '{"myUserID":"' + (typeof ($.cookie('user_id')) == "undefined" ? "" : $.cookie('user_id')) + '","UserToID":"' + tuserid + '","serverPort":"' + ws_addr.split(':')[2] + '"}';
    var sendJsonData = $.parseJSON(tempdd);

    //var resultData = ZQLAjaxJson(url, method, ifAsync, sendJsonData);

    $.ajax(
    {
        type: method,
        url: url,
        async: ifAsync,  // 是否多线程异步处理
        dataType: "json",
        cache: false,
        timeout: 5000,
        data: sendJsonData,
        success: function (data) {

            if (data.code == 0) {
                layer.msg('取消收藏成功', { time: 1000 });
                $("#" + doheartuserid).parent('a').remove();
            }
            else {
                layer.msg('取消收藏失败,请重试', { time: 1000 });
            }

            fun_loading(false);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            layer.msg('网络延迟，请稍后再试哈');

            if (textStatus == "timeout") {

                //resultData = $.parseJSON('{"code":"-1","msg":"网络延迟：' + errorThrown + '","data":{}}');
                layer.msg('网络延迟,请稍后重试');

            }
            else {

                //resultData = $.parseJSON('{"code":"-2","msg":"失败：' + textStatus + errorThrown + '","data":{}}');
                layer.msg('通讯失败:<br/>' + errorThrown);

            }

        },
        complete: function () {

            fun_loading(false);

        }

    })

}

$("#user_Random_Del").click(function () {
    //return false;
    Del_User_list('random', '确定清空未收藏记录？<br/>任何一方清空，双方都会删除<br/>如误操作，可联系客服恢复');

});

$("#user_My_Del").click(function () {
    //return false;
    Del_User_list('heart', '确定清空已收藏记录？<br/>任何一方清空，双方都会删除<br/>如误操作，可联系客服恢复');

});

// 清空用户列表
function Del_User_list(userType, warningMsg) {
    var lay_index = layer.alert(warningMsg, {

        skin: 'demo-class', btn: ['确定', '取消'], title: '', btn1: function () {

            var url = '' + '/asmx/method.asmx/random_User_Del_All';
            var method = 'post';
            var ifAsync = true;
            var tempdd = '{"myUserID":"' + (typeof ($.cookie('user_id')) == "undefined" ? "" : $.cookie('user_id')) + '","userType":"' + userType + '","serverPort":"' + ws_addr.split(':')[2] + '"}';
            var sendJsonData = $.parseJSON(tempdd);

            //var resultData = ZQLAjaxJson(url, method, ifAsync, sendJsonData);

            $.ajax(
            {
                type: method,
                url: url,
                async: ifAsync,  // 是否多线程异步处理
                dataType: "json",
                cache: false,
                timeout: 5000,
                data: sendJsonData,
                success: function (data) {

                    if (data.code == 0) {
                        layer.msg('清空成功', { time: 1000 });
                        if (userType == "random") {
                            $("#user_Random").click();
                        }
                        else {
                            $("#user_My").click();
                        }
                    }
                    else {
                        layer.msg('清空失败,请重试', { time: 1000 });
                    }

                    fun_loading(false);

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                    if (textStatus == "timeout") {

                        //resultData = $.parseJSON('{"code":"-1","msg":"网络延迟：' + errorThrown + '","data":{}}');
                        layer.msg('网络延迟,请稍后重试');

                    }
                    else {

                        //resultData = $.parseJSON('{"code":"-2","msg":"失败：' + textStatus + errorThrown + '","data":{}}');
                        layer.msg('通讯失败:<br/>' + errorThrown);

                    }

                },
                complete: function () {

                    fun_loading(false);

                }

            })

        }, btn2: function () {
            layer.close(lay_index);
        }
    });

}


var manageUser;
// 操作好友
function ManageUser(tuserALLid) {

    //return false;

    event.stopPropagation();

    //fun_loading(true);

    //fun_loading(false);

    var tuserid = tuserALLid.split('_')[2];
    var tusername = tuserALLid.split('_')[3];


    var htmlstr = "<div class='inroom_zone' style='text-align: center;'>" +
                    "<div>" +
                        "<p id='title_manageUser' style='margin:8px auto;color: #FFF;' class='oneline'>" + tusername + "</p>" +
                        "<button id='manageUser_Del' class='btn btn-success' style='margin:5px 3px;width:110px;border-radius: 1px;padding:8px;' type='button'>删除</button><br/>" +
                        "<button id='manageUser_ShowInfo' class='btn btn-success' style='margin:5px 3px;width:110px;border-radius: 1px;padding:8px;' type='button'>在线记录</button><br/>" +
                        "<button id='manageUser_doBlack' class='btn btn-success' style='margin:5px 3px;width:110px;border-radius: 1px;padding:8px;' type='button'>拉黑</button><br/>" +
                        "<button id='manageUser_warningReport' class='btn btn-success' style='margin:5px 3px;width:110px;border-radius: 1px;padding:8px;' type='button'>举报</button><br/>" +
                        "<button id='manageUser_DelAll' class='btn btn-success' style='margin:5px 3px;width:110px;border-radius: 1px;padding:8px;' type='button'>清空此列表</button>" +
                    "</div>" +
                  "</div>";

    manageUser = layer.open({
        type: 1,
        title: "",
        skin: 'demo-class',
        shadeClose: true,
        closeBtn: 0,
        //offset: ['30px'],
        area: ['130px', '280px'],
        content: htmlstr
    });


    $("#manageUser_Del").click(function () {

        DelUser(tuserALLid);

    });

    $("#manageUser_ShowInfo").click(function () {

        if ($.cookie('randomVipCode')) {
            sendJson('ShowUserLoginInfo', tuserid, true);
        }
        else {
            layer.msg('此为VIP特权功能，请先购买VIP激活码哦');
        }

    });

    $("#manageUser_doBlack").click(function () {

        warning_Black();

    });

    $("#manageUser_warningReport").click(function () {

        warning_Black();

    });

    $("#manageUser_DelAll").click(function () {

        // 当前好友列表类型 0：未收藏，1：已收藏
        if (CurrUserType == '0') {
            Del_User_list('random', '确定清空未收藏记录？<br/>任何一方清空，对应双方都会删除<br/>如误操作，可联系客服恢复');
        }
        else {
            Del_User_list('heart', '确定清空已收藏记录？<br/>任何一方清空，对应双方都会删除<br/>如误操作，可联系客服恢复');
        }

    });


}

// 删除某个用户
function DelUser(userid) {

    //return false;

    event.stopPropagation();

    var lay_index = layer.confirm('是否删除？', {
        skin: 'demo-class',
        btn: ['确定', '取消'],
        title: ''
    }, function () {



        fun_loading(true);

        //if (CurrUserType == '0') {
        //    $("#user_Random").click();
        //}
        //else {
        //    $("#user_My").click();
        //}

        var tuserid = userid.split('_')[2];



        var url = '' + '/asmx/method.asmx/Del_User';
        var method = 'post';
        var ifAsync = true;
        var tempdd = '{"myUserID":"' + (typeof ($.cookie('user_id')) == "undefined" ? "" : $.cookie('user_id')) + '","UserToID":"' + tuserid + '","vipcode":"' + randomVipCode + '","serverPort":"' + ws_addr.split(':')[2] + '"}';
        var sendJsonData = $.parseJSON(tempdd);

        //var resultData = ZQLAjaxJson(url, method, ifAsync, sendJsonData);

        $.ajax(
        {
            type: method,
            url: url,
            async: ifAsync,  // 是否多线程异步处理
            dataType: "json",
            cache: false,
            timeout: 5000,
            data: sendJsonData,
            success: function (data) {

                if (data.code == 0) {
                    layer.msg('删除成功', { time: 1000 });
                    $("#" + userid).parent().parent().parent().remove();
                }
                else {
                    layer.msg('删除失败,请重试', { time: 1000 });
                }

                fun_loading(false);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                layer.msg('网络延迟，请稍后再试哈');

                if (textStatus == "timeout") {

                    //resultData = $.parseJSON('{"code":"-1","msg":"网络延迟：' + errorThrown + '","data":{}}');
                    layer.msg('网络延迟,请稍后重试');

                }
                else {

                    //resultData = $.parseJSON('{"code":"-2","msg":"失败：' + textStatus + errorThrown + '","data":{}}');
                    layer.msg('通讯失败:<br/>' + errorThrown);

                }

            },
            complete: function () {

                layer.close(manageUser);

                fun_loading(false);

            }

        });

        layer.close(lay_index);

    });

}


var showUserLoginInfo;
// 显示好友登陆信息
function ShowUserLoginInfo(json) {

    if (json.result == '1') {

        var htmlstr = "<div class='inroom_zone' style='text-align: center;'>" +
                            "<p style='margin:8px auto;color: #FFF;' class='oneline'>当前在线状态：" + (json.data.IF_Online == '0' ? '已离线' : '在线') + "</p>" +
                            "<p style='margin:8px auto;color: #FFF;' class='oneline'>最近登陆时间</p>" +
                            "<p style='margin:8px auto;color: #FFF;' class='oneline'>" + json.data.TimeAll + "</p>" +
                      "</div>";

        showUserLoginInfo = layer.open({
            type: 1,
            title: "",
            skin: 'demo-class',
            shadeClose: true,
            closeBtn: 1,
            offset: ['30px'],
            area: ['180px', '100px'],
            content: htmlstr
        });

    }
    else {
        layer.msg('无此用户记录');
    }

}

// 匹配用户开始

// 发起匹配申请
$("#btn_random").click(function () {

    //if (userSex == "保密") {
    //layer.msg('请先选择性别');
    //return;
    //}

    sendPublic = '';

    fun_loading(true);

    $("#div_msgbox_first").show();
    $("#div_msgbox").hide();
    $("#div_privmsg").hide();

    $("#div_SNSInfo").hide();

    sendJson('random', "", true);

    layer.close(inputStatusTips);
    inputStatusTips = null;

});

// 发起离开申请 - 备份
$("#btn_random_break").click(function () {


    var temp = timeDiff(randomGetIDTime, new Date());

    if (temp.indexOf('秒') == -1 || temp.split('秒')[0] > 3 || randomVipCode) {

        var lay_index = layer.confirm('是否断开本次对话？', {
            skin: 'demo-class',
            btn: ['确定', '取消'],
            title: ''
        }, function () {

            sendJson('randomOut', sel_userid, true);

            sel_userid = "";

            layer.close(lay_index);

            $(".input-main").hide();
            $("#btn_random").show();
            $("#btn_random_break").hide();
            $("#btn_random_return").hide();

            $("#goTop").hide();
            $("#warningReport,#doBlack,#doAD").hide();
            $("#goBottom").hide();

            $("#div_msgbox_first").show();
            $("#div_msgbox").hide();
            $("#div_privmsg").hide();

            $("#div_SNSInfo").hide();

            layer.close(inputStatusTips);
            inputStatusTips = null;

        });


    }
    else {
        layer.msg("匹配后3秒内无法离开<br/>vip不受此限制", { time: 3000 });
    }

});

var view_breakAD;

// 发起离开申请
$("#btn_random_break_AD").click(function () {

    var NoticeStr = "<div style='padding: 10px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;'>";
    NoticeStr += "<div style='text-align:center;margin-bottom:5px;'>是否断开本次对话？</div>";
    NoticeStr += "<div style='text-align:center;margin-bottom:0px;color:aqua;display:none;'>【】</div>";
    NoticeStr += "<div style='text-align:center;margin-bottom:5px;' id='random_breakAD'><img width='180' src='/img/sys/weixin/deskryAD.jpg'></div>";
    NoticeStr += "<div style='text-align:center;font-size: 10px;;color:aqua'>【长按图片识别二维码下载App】</div>";
    NoticeStr += "<div class='layui-layer-btn layui-layer-btn-'><a id='random_breakAD_ok' class='layui-layer-btn0'>确定</a><a id='random_breakAD_cancel' class='layui-layer-btn1'>取消</a></div>";
    NoticeStr += "</div>";

    //公告层
    view_breakAD = layer.open({
        type: 1
      , title: false //不显示标题栏
      , closeBtn: true
        //, area: ['250px','390px']
      , offset: '100px'
      , shade: 0.3
      , id: 'NoticeShow1' //设定一个id，防止重复弹出
        //, btn: ['火速围观', '残忍拒绝']
      , btnAlign: 'l'
      , moveType: 1 //拖拽模式，0或者1
      , content: NoticeStr
      , success: function (layero) {
          //var btn = layero.find('.layui-layer-btn');
          //btn.find('.layui-layer-btn0').attr({
          //    href: 'http://www.layui.com/'
          //  , target: '_blank'
          //});
      }
    });

    $("#random_breakAD").click(function () {
        //window.location.href = "https://weidian.com/?userid=297880287&spider_token=6c3e";
    });

    $("#random_breakAD_ok").click(function () {
        sendJson('randomOut', sel_userid, true);

        sel_userid = "";

        $(".input-main").hide();
        $("#btn_random").show();
        $("#btn_random_break").hide();
        $("#btn_random_return").hide();

        $("#goTop").hide();
        $("#warningReport,#doBlack,#doAD").hide();
        $("#goBottom").hide();

        $("#div_msgbox_first").show();
        $("#div_msgbox").hide();
        $("#div_privmsg").hide();

        $("#div_SNSInfo").hide();

        layer.close(inputStatusTips);
        inputStatusTips = null;

        layer.close(view_breakAD);

    });

    $("#random_breakAD_cancel").click(function () {
        layer.close(view_breakAD);
    });

});

// 发起返回
$("#btn_random_return").click(function () {

    $(".userList").removeClass("active");
    $(".userList").css("color", "black");
    $(".userList").css("background-color", "#BBB");

    $(".layui-layer-tips").css('display', 'none');

    $("#msg_title").html("");
    sel_userid = "";

    $(".input-main").hide();
    $("#btn_random").show();
    $("#btn_random_break").hide();
    $("#btn_random_return").hide();

    $("#goTop").hide();
    $("#warningReport,#doBlack,#doAD").hide();
    $("#goBottom").hide();

    $("#div_msgbox_first").show();
    $("#div_msgbox").hide();
    $("#div_privmsg").hide();

    $("#div_SNSInfo").hide();

    layer.close(inputStatusTips);
    inputStatusTips = null;

});

// 对方离开
function random_queue_get_random_Out() {

    $(".layui-layer-tips").css('display', 'none');

    $("#btn_random").hide();
    $("#btn_random_break").hide();
    $("#btn_random_return").show();

    $("#div_privmsg").append(randomOutMessge);

    $(".GG_img").click(function () {

        window.location.href = "https://mp.weixin.qq.com/s/YmbKQ57eJ2GPs2cjIWNM6g";
        //layer.alert('<img src="/gg/img/gg3.jpg" style="width:200px;height:295px;margin-left:10px;" /><br/><div style="width:200px;margin:5px auto;text-align: center;color: #AAA;">长按保存图片 用微信扫一扫</div>', { title: '' })

    });

    bindClisk();
    scrotop();

    //var htmlstr = "<div id='more_fun'>" +
    //    "<div style='margin: 15px 5px;margin-top:33px;text-align:center;color: #666;'>对方已离开</div>" +
    //    "<div style='margin: 15px 5px;text-align:center;'><button id='randomCancel' type='button' class='btn btn-success' style='margin: 2px 5px;text-align:center;'>确定</button></div>" +
    //    "</div>";

    //index_more = layer.open({
    //    type: 1,
    //    title: "",
    //    skin: 'demo-class',
    //    shadeClose: false,
    //    closeBtn: 0,
    //    area: ['200px', '140px'],
    //    content: htmlstr
    //});

    //$("#randomCancel").click(function () {

    //    layer.close(index_more);

    //});

}

//输入 vipcode 激活码
var view_inputVipCode;

$("#btn_input_vipcode").click(function (e) {

    var htmlstr = "<div class='inroom_zone' style='text-align: center;'>" +
                    "<div>" +
                        "<p id='buy_vipcode' style='margin:8px auto;width:100px;color: #E5511D;border-color: #F0CAB6;background: #FFE4D0;display:none;'>立即购买</p>" +
                        "<input id='vipcode' type='text' placeholder='请粘贴您的 vip 激活码' style='width:170px;margin:10px 10px;' maxlength='50' class='form-control' />" +
                        "<button id='vipcode_ok' class='btn btn-success' style='margin:0px 10px;width:100px;' type='button'>确认</button>" +
                    "</div>" +
                  "</div>";

    view_inputVipCode = layer.open({
        type: 1,
        title: "",
        skin: 'demo-class',
        shadeClose: true,
        closeBtn: 0,
        offset: ['10px'],
        area: ['190px', '100px'],
        content: htmlstr
    });

    $("#vipcode").focus();

    $("#vipcode_ok").click(function () {
        if (!$.trim($("#vipcode").val())) {
            layer.msg('请输入 vip 激活码', { time: 700 });
            $("#vipcode").focus();
        }
        else {

            randomVipCode = $.trim($("#vipcode").val());

            fun_loading(true);

            sendJson('randomVIPinfoBind', '{"randomvipcode":"' + randomVipCode + '"}', true);

        }

    });

    $("#vipcode").unbind("keydown").keydown(function (e) {//组合键
        //if (e.keyCode == 13 && e.ctrlKey) {       
        if (e.keyCode == 13) {
            $("#vipcode_ok").trigger("click");
            return false;
        }
    });

    $("#buy_vipcode").click(function () {

        window.open("http://weixin.nmpipei.com/shop/index.aspx");

    });

    e.stopPropagation();

});

//判断是否为微信内打开开始
function wx() {
    return navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1;
};
//判断是否为微信内打开结束

$("#btn_buy_vipcode").click(function (e) {
    if (wx()) {
        window.open("http://weixin.nmpipei.com/shop/index.aspx");
        e.stopPropagation();
    }
    else {
        window.open("http://alipay.nmpipei.com/index.aspx");
        e.stopPropagation();
    }
})

$("#btn_MyOrders,#InformMyOrder").click(function (e) {
    if (wx()) {
        window.open("http://weixin.nmpipei.com/shop/orders.aspx");
        e.stopPropagation();
    }
    else {
        layer.msg('进入支付宝查询支付订单记录<br/>vip开头的订单号即是激活码', { time: 3000 });
        e.stopPropagation();
    }
})


$("#area_VIP_Close_btn").click(function () {

    layer.msg('购买vip后，使用“激活”即可解锁此区域功能哦', { time: 5000 });

})

// vip 激活码验证
// case 130: // 您的激活码已过期
// case 131: // 您的激活码不存在
// case 132: // 您的激活码已激活
// case 133: // VIP激活码验证通过！
// case 134: // 网络异常[E001]
// case 135: // vip 激活码防止多人同时使用
// case 136: // 暂无
// case 137: // vip激活码不能为空

// case 138: // 首次激活并已进入vip匹配队列
// case 139: // 已进入vip匹配队列

// randomVipCode = $.cookie('randomVipCode') ? $.cookie('randomVipCode') : "";

function random_queue_get_viprandom(json) {

    fun_loading(false);

    //Con_SuccInitInfo();

    if (FirtConSucc == 0) {
        Con_SuccInitInfo();
    }

    FirtConSucc++;

    // 获取当前用户聊天历史信息
    //fun_getUserOldMsgs();

    layer.close(view_inputVipCode);

    fun_loading(false);

    switch (json.code) {
        case 130:
            randomVipCode = "";
            $.cookie('randomVipCode', '', { expires: 365 });
            $("#randomVIP").fadeOut();

            $("#area_VIP_Close").fadeIn("slow");
            $("#area_VIP_Close_btn").fadeIn("slow");

            layer.msg('您的激活码已过期', { time: 1000 });
            break;
        case 131:
            randomVipCode = "";
            $.cookie('randomVipCode', '', { expires: 365 });
            $("#randomVIP").fadeOut();

            $("#area_VIP_Close").fadeIn("slow");
            $("#area_VIP_Close_btn").fadeIn("slow");

            layer.msg('您的激活码不存在', { time: 1000 });
            break;
        case 132:

            if ($.cookie('switchvipsex') == '1') {
                $("#vip_sex").attr("checked", "checked");
                // 初始化 layui 组件样式
                layui.use(['form'], function () {
                    var form = layui.form
                    form.render('checkbox')
                });

                $.cookie('switchvipsex', "1", { expires: 365 });
                switchvipsex = 1;
            }

            //$("#btn_modinfo").click();

            $.cookie('randomVipCode', randomVipCode, { expires: 365 });
            $("#randomVIP").fadeIn();

            $("#area_VIP_Close").fadeOut("slow");
            $("#area_VIP_Close_btn").fadeOut("slow");

            layer.msg('您的激活码已激活', { time: 1000 });
            break;
        case 133:
            if ($.cookie('switchvipsex') == '1') {
                $("#vip_sex").attr("checked", "checked");
                // 初始化 layui 组件样式
                layui.use(['form'], function () {
                    var form = layui.form
                    form.render('checkbox')
                });

                $.cookie('switchvipsex', "1", { expires: 365 });
                switchvipsex = 1;
            }

            //$("#btn_modinfo").click();

            $.cookie('randomVipCode', randomVipCode, { expires: 365 });
            $("#randomVIP").fadeIn();

            $("#area_VIP_Close").fadeOut("slow");
            $("#area_VIP_Close_btn").fadeOut("slow");

            layer.msg('VIP激活码验证通过！', { time: 1000 });
            break;
        case 134:
            randomVipCode = "";
            $.cookie('randomVipCode', '', { expires: 365 });
            $("#randomVIP").fadeOut();

            $("#area_VIP_Close").fadeIn("slow");
            $("#area_VIP_Close_btn").fadeIn("slow");

            layer.msg('网络异常[E001]', { time: 700 });
            break;
        case 135:
            randomVipCode = "";
            $.cookie('randomVipCode', '', { expires: 365 });
            $("#randomVIP").fadeOut();

            $("#area_VIP_Close").fadeIn("slow");
            $("#area_VIP_Close_btn").fadeIn("slow");

            layer.msg('此vip激活码不可多人同时使用！', { time: 1000 });
            break;
        case 136:
            break;
        case 137:
            randomVipCode = "";
            $.cookie('randomVipCode', '', { expires: 365 });
            $("#randomVIP").fadeOut();

            $("#area_VIP_Close").fadeIn("slow");
            $("#area_VIP_Close_btn").fadeIn("slow");

            layer.msg('此vip激活码不存在', { time: 700 });
            break;
        case 138:
            $.cookie('randomVipCode', randomVipCode, { expires: 365 });
            $("#randomVIP").fadeIn();

            $("#area_VIP_Close").fadeOut("slow");
            $("#area_VIP_Close_btn").fadeOut("slow");

            //layer.msg('首次激活并已进入vip匹配队列', { time: 300 });
            random_queue_get_random(json)
            break;
        case 139:
            $.cookie('randomVipCode', randomVipCode, { expires: 365 });
            $("#randomVIP").fadeIn();

            $("#area_VIP_Close").fadeOut("slow");
            $("#area_VIP_Close_btn").fadeOut("slow");

            //layer.msg('已进入vip匹配队列', { time: 300 });
            random_queue_get_random(json)
            break;
    }

}

// 退出 vip 模式
$("#randomVIP").click(function () {

    var lay_vip = layer.alert('确定退出 vip 模式？', {
        skin: 'demo-class', btn: ['确定', '取消'],
        btn1: function () {
            $.cookie('randomVipCode', '', { expires: 365 });
            window.location.reload();
        },
        btn2: function () {
            layer.close(lay_vip);
        }
    });

});

// 进入随机好友队列
function random_queue_get_random(json) {

    fun_loading(false);

    var htmlstr = "<div id='more_fun'>" +
        "<div style='margin: 15px 5px;margin-top:33px;text-align:center;color: #DDD;'><img class='rotateImg' src='/img/sys/loading.png' style='position: relative; top: -1px;left:-5px;' />匹配中...</div>" +
        "<div style='margin: 15px 5px;text-align:center;'><button id='randomCancel' type='button' class='btn btn-success' style='margin: 10px 5px;text-align:center;'>" +
        "取消匹配</button></div>" +
        "</div>";

    index_more = layer.open({
        type: 1,
        title: "",
        id: 'RandomInto', //设定一个id，防止重复弹出
        skin: 'demo-class',
        shadeClose: false,
        closeBtn: 0,
        area: ['200px', '140px'],
        content: htmlstr
    });

    $("#randomCancel").click(function () {
        sendJson('randomCancel', "", true);

    });

    $("#btn_random").hide();
    $("#btn_random_break").show();
    $("#btn_random_return").hide();

}

// 退出随机好友队列
function random_queue_get_random_cancel(json) {

    fun_loading(false);

    layer.close(index_more);
    layer.closeAll();

    //$(".input-main").hide();
    $("#btn_random").show();
    $("#btn_random_break").hide();
    $("#btn_random_return").hide();

    $("#div_msgbox_first").show();
    $("#div_msgbox").hide();
    $("#div_privmsg").hide();

    $("#div_SNSInfo").hide();

}

var randomGetIDTime;

// 获取随机好友ID等信息
//\"code\":15,\"sel_userid\":\"" + toID + "\,\"sel_userNikename\":\"" + kv.Value.Name + "\",\"sel_userSex\":\"" + kv.Value.Sex + "\",\"sel_userAddress\":\"" + kv.Value.Address + "\"
var selUserInfo = '';
function random_queue_get_random_getID(json) {

    fun_loading(false);

    randomGetIDTime = new Date();

    haveTitleTips("已匹配");

    sel_userid = json.sel_userid;

    //sendJson('getprivmsg', sel_userid, true);

    if (ws && ws.readyState == 1 && typeof (sel_userid) != "undefined") {

        //fun_loading(true);

        layer.close(index_more);

        //sendJson('getprivmsg', sel_userid, true);

        selUserInfo = '<div id="randomSelInfo" onclick="return false;" style="width: 250px;text-align: center;margin: 10px auto;color: #AAA;line-height: 20px;letter-spacing: 2px;background-color: transparent;border-radius: 10px;padding: 10px;border: 1px solid #009688;">'
        selUserInfo += '<img alt="Deskry 匿名聊" src="/img/sys/logo.png" width="50" style="position: relative;top:0px;margin-bottom:5px;" />'
        selUserInfo += '<div style="text-align: left; text-indent: 0em;font-size: 13px;text-align:center">对方昵称：<span style="color:orange;">' + json.sel_userNikename + '</span></div>'
        selUserInfo += '<div style="text-align: left; text-indent: 0em;font-size: 13px;text-align:center">对方性别：<span style="color:orange;">' + json.sel_userSex + '</span></div>'
        selUserInfo += '<div style="text-align: left; text-indent: 0em;font-size: 13px;text-align:center">对方年龄：<span style="color:orange;">' + json.sel_userAge + '</span></div>'
        selUserInfo += '<div style="text-align: left; text-indent: 0em;font-size: 13px;text-align:center">对方城市：<span style="color:orange;">' + json.sel_userAddress + '</span></div>'
        selUserInfo += '<div style="text-align:center;text-indent: 0em;"><span style="color: #5BC0DE; font-weight: 700;">nmliao.cn(匿名聊)</span></div>'
        selUserInfo += '</div>';

        if (!dic_userlist[sel_userid]) {
            dic_userlist[sel_userid] = json.sel_userNikename;

            var htmlstr = "<a id='userid_" + sel_userid + "' class='list-group-item userList' style='color:black' onfocus='this.blur()' onclick='click_userlist(id);'>" +
                        "<img id='doheart_userid_" + sel_userid + "' onclick='DoHeartUser(id);' alt='点击收藏' src='/img/sys/emptyheart.png' style='position: absolute;top: 2px;left: 0px;width: 20px;margin: 8px;z-index: 1;' />" +
                        "<span class='badge'></span><span style='margin-right:5px;position: absolute;top: 9px;left: 28px;' class='zql-bnt-user'></span>" +
                        "<span style='margin-left: 40px;' class='nickname'>" + json.sel_userNikename + "<span>" +
                        "<i id='manage_userid_" + sel_userid + '_' + json.sel_userNikename + "' class='layui-icon layui-icon-more-vertical' style='float: right;'  onclick='ManageUser(id);'></i></a>";

            $("#user_list").prepend(htmlstr);
        }

        $("#div_privmsg").html('');

        $("#div_privmsg").append(selUserInfo);

        $("#div_msgbox_first").hide();
        $("#div_msgbox").hide();
        $("#div_privmsg").show();
        $('#div_privmsg').scrollTop($('#div_privmsg')[0].scrollHeight);

        $("#div_SNSInfo").hide();

        fancyimg();

        scrotop();

        clearInterval(timeDiffSet);
        handleTimeDiff();
        timeDiffSet = setInterval(handleTimeDiff, 10000);

        $("#goTop").show();
        $("#warningReport,#doBlack,#doAD").show();
        $("#goBottom").show();

        $(".input-main").show();
        $("#btn_random").hide();
        $("#btn_random_break").show();
        $("#btn_random_return").hide();

        /// 获取之前信息 开始

        //fun_getUserOldMsgs();

        /// 获取之前信息 开始


    }

}

// 匹配用户结束

// 图片发送限制

function randomGetIDTimeLimit() {

    var temp = timeDiff(randomGetIDTime, new Date());

    if (temp.indexOf('秒') != -1 && temp.split('秒')[0] < 5) {
        return true;
    }
    else {
        return false;
    }

}


function fun_closeOld(ws) {
    clearInterval(tick_autoConnect);
    tick_autoConnect = null;
    ifAutoConn = false;
    ws.close();
}

function fun_fkxx(content) {

    if (content.indexOf('清流模式') != -1) {
        layer.msg('对方或您已开启青少年模式<br/>消息违禁或图片，停止发送');
    }
    else {
        layer.msg(content);
    }

    fun_inputStatusOff();
}

function Del_Cookies_fkxx() {

    $.cookie("isSound", null, { expires: -1 });
    $.cookie("room_name_random", null, { expires: -1 });
    $.cookie("room_psw_random", null, { expires: -1 });
    $.cookie("user_id", null, { expires: -1 });
    $.cookie("user_nickname_random", null, { expires: -1 });
    $.cookie("his_rooms", null, { expires: -1 });

    layer.close(lay_index);

    setTimeout(function () { ws.close(); window.location.reload(); }, 500);

}

//绑定用户列表
function fun_bindList(json) {
    dic_userlist = {};
    var list = json.users_list;
    var htmlstr = "";
    cur_rauthor = json.rauthor;
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == $.cookie("user_id"))
            continue;
        dic_userlist[list[i].id] = list[i].nickname;
        var color = list[i].id == cur_rauthor ? "orange" : "black";//用户的颜色

        if ($.trim(list[i].nickname) != "") {
            htmlstr += "<a id='userid_" + list[i].id + "' class='list-group-item userList' style='color:" + color + "' onfocus='this.blur()' onclick='click_userlist(id);'>" +
                   "<span class='badge'></span><span style='margin-right:5px;' class='zql-bnt-user'></span>" +
                   "<span class='nickname'>" + list[i].nickname + "<span></a>";

        }
    }
    cur_rname = json.rname;
    cur_rpsw = json.rpsw;
    $.cookie('room_name_random', cur_rname, { expires: 365 });
    $.cookie('room_psw_random', cur_rpsw, { expires: 365 });
    fun_inroom_addhistory(cur_rname, cur_rpsw);
    $("#div_msgbox").html("");
    //$("#msg_title").html(cur_rname);
    $("#user_list").html(htmlstr);
    $("#nowusers_count").text(list.length);
    //layer.msg('欢迎登录 - ' + cur_rname + '<br/>加载中...', { time: 0.5 * 1000 }, function () { });

    layer.close(index_inroom);
}

//新用户登录
function fun_newuser(json) {
    if (dic_userlist[json["user"].id])
        return;
    var color = json["user"].id == cur_rauthor ? "orange" : "black";//用户的颜色
    $("#user_list").prepend("<a id='userid_" + json["user"].id + "' style='color:" + color + "' class='list-group-item userList' onfocus='this.blur()' onclick='click_userlist(id);'><span class='badge'></span><span style='margin-right:5px;' class='zql-bnt-user'></span><span class='nickname'>" + json["user"].nickname + "</span></a>");
    dic_userlist[json["user"].id] = json["user"].nickname;
    $("#nowusers_count").text(parseInt($("#nowusers_count").text()) + 1);
}

//用户离线
function fun_userlogout(json) {
    //$("#userid_" + json["user"].id).remove();  //移除用户列表中离线用户
    //if (dic_userlist[json["user"].id]) {
    //delete dic_userlist[json["user"].id];
    //$("#nowusers_count").text(parseInt($("#nowusers_count").text()) - 1);
    //if (sel_userid == json["user"].id) {
    $("#div_privmsg").append('<div class="chat_msg">' + '用户已离线' + '</div>');

    $("#btn_random").hide();
    $("#btn_random_break").hide();
    $("#btn_random_return").show();

    $("#div_privmsg").append(randomOutMessge);

    $(".GG_img").click(function () {

        window.location.href = "https://mp.weixin.qq.com/s/YmbKQ57eJ2GPs2cjIWNM6g";

        //var htmlstr = "<div id='more_fun'>" +
        //    "<div style='margin: 5px 5px;margin-top:20px;text-align:center;color: #999;'>" +
        //    "<img class='rotateImg' src='/gg/img/gg3.jpg' style='position: relative; top: 0px;left:0px;width:270px;height:360px;' />" +
        //    "<br/>长按保存图片 用微信扫一扫" +
        //    "</div>" +
        //"</div>";

        //index_more = layer.open({
        //    type: 1,
        //    title: "",
        //    skin: 'demo-class',
        //    shadeClose: false,
        //    closeBtn: 1,
        //    area: ['300px', '407px'],
        //    content: htmlstr
        //});

    });

    bindClisk();
    scrotop();

    //}
    //}
}

//用户更改名称
function fun_userchgname(json) {
    if (dic_userlist[json["user"].id]) {
        dic_userlist[json["user"].id] = json["user"].nickname;
        $("#userid_" + json["user"].id + " .nickname").text(json["user"].nickname);
    }
    else {
        $.cookie('user_nickname_random', json["user"].nickname, { expires: 365 });
        $("#inp_nickname").val(json["user"].nickname);
        $("#inp_nickname_other").val(json["user"].nickname);
    }

    layer.msg('昵称修改成功', { time: 600 });

    //$("#div_msgbox").append('<div class="chat_msg"><div>' + json["user"].time + '</div>' + json["user"].beforename + "->" + json["user"].nickname + '</div>');
    scrotop();
}

//接收广播消息
function fun_recbrodata(json) {
    if (sel_userid == "") {
        haveTitleTips("新消息");
    }
    if (json.user.id == $.cookie("user_id")) {
        pub_lastSendTime = json.user.time;
    }
    $("#div_msgbox").append(fun_chatbox(json["user"], json.code));

    fancyimg();

    scrotop();
}

// 定时刷新私信消息变量
var timeDiffSet;

// 处理消息时间间隔

// 计算两时间之间之差，精确到秒，忽略毫秒,这个也可以做成倒计时
function timeDiff(faultDate, completeTime) {
    var stime = Date.parse(new Date(faultDate));
    var etime = Date.parse(new Date(completeTime));
    var usedTime = etime - stime;  //两个时间戳相差的毫秒数
    //计算出天数，Math.floor 向下取整
    var days = Math.floor(usedTime / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = usedTime % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);        //计算分钟数后剩余的毫秒数
    var seconds = Math.floor(leave3 / 1000);
    var time = days + "天" + hours + "时" + minutes + "分" + seconds + "秒";

    //console.info(new Date());
    //console.info(etime);
    //console.info(leave1);
    //console.info(leave2);
    //console.info(leave3);

    if (days == 0 && hours == 0 && minutes == 0) {
        time = seconds + "秒前";
    }
    else if (days == 0 && hours == 0) {
        //time = minutes + "分" + seconds + "秒前";
        time = minutes + "分钟前";
    }
    else if (days == 0) {
        //time = hours + "时" + minutes + "分" + seconds + "秒前";
        time = hours + "小时前";
    }
    else {
        //time = days + "天" + hours + "时" + minutes + "分" + seconds + "秒前";
        if (days == -1) {
            time = "&nbsp;";
        }
        else {
            time = days + "天前";
        }
    }

    $("#timeDiff").html(time);

    return time;
}

function handleTimeDiff() {

    $(".chatbox").each(function () {
        //console.info($(this).find('span:eq(1)').css("display"));
        if ($(this).find('span:eq(1)').css("display") == "none") {
            $(this).find('span:eq(2)').html(timeDiff($(this).find('span:eq(1)').html().replace("-", "/").replace("-", "/").split('.')[0], new Date()));
        }
        else {
            $(this).find('span:eq(1)').html(timeDiff($(this).find('span:eq(0)').html().replace("-", "/").replace("-", "/").split('.')[0], new Date()));

            var MsgTime = $(this).find('img:eq(0)');
            var MsgDiv = $(this).find('div:eq(2)').html();

            //console.info(MsgDiv);

            if (MsgDiv.indexOf('<span') != -1) {
                MsgTime.remove();
            }

            $(this).find('img:eq(0)').unbind('click').on("click", fun_User_Msgrevoke);

        }

    });
}

// 消息撤回
function fun_User_Msgrevoke() {

    var HtmlImg = $(this);
    var DivMsg = $(this).parent().parent().find('div:eq(2)');
    var MsgTime = $(this).parent().find('span:eq(0)').html();
    var MsgTid = $(this).parent().find('span:eq(3)').html();

    var lay_msgrevoke = layer.alert('确认撤回此消息吗？', {
        skin: 'demo-class', title: '', btn: ['确定', '取消'], btn1: function () {

            fun_loading(true);

            // 用户历史消息撤回
            var url = '' + '/asmx/method.asmx/randomRevokeHistoryUserMsgsPage';
            var method = 'post';
            var ifAsync = true;
            var tempdd = '{"myUserID":"' + (typeof ($.cookie('user_id')) == "undefined" ? "" : $.cookie('user_id')) + '","MsgTime":"' + MsgTime + '","serverPort":"' + ws_addr.split(':')[2] + '"}';
            var sendJsonData = $.parseJSON(tempdd);

            //var resultData = ZQLAjaxJson(url, method, ifAsync, sendJsonData);

            var resultData;

            $.ajax(
            {
                type: method,
                url: url,
                async: ifAsync,  // 是否多线程异步处理
                dataType: "json",
                cache: false,
                timeout: 5000,
                data: sendJsonData,
                success: function (data) {

                    if (data.code == 0) {

                        $(DivMsg).html("<span style='color:#bbb'>已撤回</span>");

                        $(HtmlImg).remove();

                        sendJson('msgrevoke', sel_userid + "_" + MsgTime, true);

                        layer.msg('撤回成功');
                    }
                    else {
                        layer.msg('撤回失败,请稍后重试');
                    }


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                    if (textStatus == "timeout") {

                        //resultData = $.parseJSON('{"code":"-1","msg":"网络延迟：' + errorThrown + '","data":{}}');
                        layer.msg('网络延迟,请稍后重试');

                    }
                    else {

                        //resultData = $.parseJSON('{"code":"-2","msg":"失败：' + textStatus + errorThrown + '","data":{}}');
                        layer.msg('消息撤回失败:<br/>' + errorThrown);

                    }

                },
                complete: function () {

                    fun_loading(false);

                    layer.close(lay_msgrevoke);


                }

            });


            layer.close(lay_msgrevoke);

            //setTimeout(function () { ws.close(); window.location.reload(); }, 500);

        }, btn2: function () {
            layer.close(lay_msgrevoke);
        }
    });
}


//绑定所有的广播消息  2018-07-06 只显示最近的 300 条信息
function fun_bindtoallmsg(json) {

    var contlist = json["contents_list"];

    if (contlist.length == 0) {
        $("#old_mes_get").html("已无更早历史消息");
        return;
    }

    //var htmlstr = fun_old_chatbox(contlist, json.code);

    $("#div_msgbox").prepend(fun_old_chatbox(contlist, json.code));
    $("#old_mes_get").remove();
    $("#div_msgbox").prepend('<div id = "old_mes_get" onclick = "get_old_messge();" style="width:200px;text-align:center;margin:10px auto;color:#09c;cursor: pointer;"><img alt="查看历史消息" src="/img/sys/time_pic.png" width="20" style="position: relative;top:-1px;" />查看历史消息</div>');

    fancyimg();

    //for (var i = 0; i < contlist.length; i++) {

    //    $("#div_msgbox").prepend(fun_old_chatbox(contlist[i], json.code));
    //    $("#old_mes_get").remove();
    //    $("#div_msgbox").prepend('<div id = "old_mes_get" onclick = "get_old_messge();" style="width:200px;text-align:center;margin:10px auto;color:#09c;cursor: pointer;"><img alt="查看历史消息" src="/img/sys/time_pic.png" width="20" style="position: relative;top:-1px;" />查看历史消息</div>');

    //}

    // 获取第一条信息的时间
    if (contlist.length > 0) {
        first_message_time = contlist[0].time;
    }

    //$("#div_msgbox").hide();    //  2018-07-04 注销点击私聊后再点击房间无法看到房间内容的问题
    //$("#div_privmsg").hide();

    scrotop();

    clearInterval(timeDiffSet);
    handleTimeDiff();
    timeDiffSet = setInterval(handleTimeDiff, 10000);

}

//获取历史消息
function get_old_messge() {
    var old_temp = layer.msg('获取中...', { time: 10 * 1000 }, { icon: 1 });
    sendJson('old_mes_get', '{"rname":"' + $.cookie("room_name_random") + '","rpsw":"' + $.cookie("room_psw_random") + '","first_message_time":"' + first_message_time + '"}', true);
    setTimeout(function () { layer.close(old_temp) }, 500);
}

//历史聊天信息展示
function fun_old_chatbox(json_user, code) {
    var htmlstr = ""
    for (var i = 0; i < json_user.length; i++) {

        if (json_user[i].code) {
            code = json_user[i].code;
        }
        switch (code) {
            case 4://用户修改名称
                htmlstr += '<div class="chat_msg"><div>' + json_user[i].time + '</div>' + json_user[i].beforename + " --> " + json_user[i].nickname + '</div>'; break;
            default:
                var self = json_user[i].id == $.cookie("user_id");
                var id = code == 8 || code == 7 ? $.cookie("user_id") : json_user[i].id;//为内容块指定唯一ID
                var color = cur_rauthor == id && code != 8 && code != 7 ? "orange" : "#ABABAB"
                var chattitle = !self ? "<span style='color:" + color + "'>" + json_user[i].nickname + "</span> " + "<span style='color:#d2d2d2;display:none;'>" + json_user[i].time + "</span><span class='timeSpan' style='color:#ABABAB;margin-left:5px;'>&nbsp;</span>" : "<img style='margin-right:5px;width:17px;height:17px;opacity:0.6;' src='/img/sys/ret.png'><span style='color:#d2d2d2;display:none;'>" + json_user[i].time + "</span><span style='color:#ABABAB;margin-right:5px;'>&nbsp;</span><span style='color:" + color + "'>" + json_user[i].nickname + "</span><span style='color:#d2d2d2;display:none;'>" + json_user[i].Tid + "</span>";
                htmlstr += "<div class='chatbox' style='" + (self ? "float:right" : "float:left") + "' >"
                    + "<div style='text-align:" + (self ? "right" : "left") + "'>" + chattitle + "</div>" +
                    "<div class='chatarrow' style='" + (self ? "right:5px;border-bottom: 8px solid #ffe6b8;" : "left:5px;border-bottom: 8px solid #cfffcf;") + "'></div><div id='" + (sortID(id) + json_user[i].time.replace(/:/g, '_')) + "' class='chat" + (self ? " selfchat" : "") + "' style='max-width:" + ($("#div_msgpanel").width() * 0 + 315) + "px;'>" + chg_resource(json_user[i].content, json_user[i].time) + "<br />" + "</div>" +
                    "</div><div class='clearboth'></div>"; break;
        }
    }
    return htmlstr;
}


//用户的新私信
function fun_fromusermsg(json) {

    var fu = json["fromuser"];
    var tu = json["touser"];

    if (hex_md5($.cookie('user_id')) != fu.id) {
        haveTitleTips("新私信");
    }

    if (!dic_userlist[fu.id] && hex_md5($.cookie('user_id')) != fu.id) {
        dic_userlist[fu.id] = fu.nickname;

        var htmlstr = "<a id='userid_" + fu.id + "' class='list-group-item userList' style='color:black' onfocus='this.blur()' onclick='click_userlist(id);'>" +
                    "<img id='doheart_userid_" + fu.id + "' onclick='DoHeartUser(id);' alt='点击收藏' src='/img/sys/emptyheart.png' style='position: absolute;top: 2px;left: 0px;width: 20px;margin: 8px;z-index: 1;' />" +
                    "<span class='badge'></span><span style='margin-right:5px;position: absolute;top: 9px;left: 28px;' class='zql-bnt-user'></span>" +
                    "<span style='margin-left: 40px;' class='nickname'>" + fu.nickname + "<span></a>";

        $("#user_list").prepend(htmlstr);
    }


    if (hex_md5($.cookie('user_id')) == fu.id) {

        pri_lastSendTime[tu.id] = fu.time;
        $("#div_privmsg").append(fun_chatbox(fu, json.code));
        $('#div_privmsg').scrollTop($('#div_privmsg')[0].scrollHeight);
        fancyimg();
    }
    else {

        if (pri_BlackUserID.indexOf(fu.id) != -1) {
            return;
        }

        if (sel_userid != fu.id || sel_userid == "") {
            layer.tips('有新消息', $("#oldUserList"), { tips: [3, 'orange'], time: 5000, shift: 6 });
            //layer.tips('有用户私信您<br/>请点击此处查看左边用户列表<br/>点击高亮显示用户即可查看并回复<br/>如果没有看到请刷新页面重试', $("#oldUserList"), { tips: [3, 'orange'], time: 5000, shift: 6 });
            //layer.msg("有用户私信您<br/>请查看左边用户列表<br/>点击高亮显示用户即可查看并对话。", { time: 2 * 1000 })
        }

        if (sel_userid != fu.id) {
            var count = ($("#userid_" + fu.id + " .badge").text() ? parseInt($("#userid_" + fu.id + " .badge").text()) : 0) + 1;
            $("#userid_" + fu.id + " .badge").text(count);
            $("#userid_" + fu.id).insertBefore($("#user_list")[0].childNodes[0]);
        }
        else {
            $("#div_privmsg").append(fun_chatbox(fu, json.code));
            $('#div_privmsg').scrollTop($('#div_privmsg')[0].scrollHeight);
            fancyimg();
        }

    }

    handleTimeDiff(); // 遍历时间与撤回事件

}

//获取所有私信内容
function fun_getprivmsg(json) {

    sendPublic = '';

    var contlist = json["contents_list"];
    $("#div_privmsg").html('');

    $("#div_privmsg").append(selUserInfo);

    for (var i = 0; i < contlist.length; i++) {
        $("#div_privmsg").append(fun_chatbox(contlist[i], json.code));
    }

    $("#div_msgbox_first").hide();
    $("#div_msgbox").hide();
    $("#div_privmsg").show();
    $('#div_privmsg').scrollTop($('#div_privmsg')[0].scrollHeight);

    $("#div_SNSInfo").hide();

    fancyimg();

    scrotop();

    clearInterval(timeDiffSet);
    handleTimeDiff();
    timeDiffSet = setInterval(handleTimeDiff, 10000);

}

//撤回消息
function fun_msgrevoke(json) {

    var mess_time = json.user.content.replace('&nbsp;', ' ');

    $(".chatbox").each(function () {

        //console.info($(this).find('span:eq(1)').css("display"));
        //console.info(1);
        if ($(this).find('span:eq(1)').css("display") == "none") {
            //console.info(2);

            if (mess_time == $(this).find('span:eq(1)').html()) {
                $(this).find('div:eq(2)').html("<span style='color:#bbb'>已撤回</span>");
            }

        }

    });

    //document.getElementById(mess_id).innerHTML = "<span style='color:#b2b2b2'>撤回一条消息</span>";

    //$("#" + mess_id).html("<span style='color:#b2b2b2'>撤回一条消息</span>");

    //$("#" + json.user.content).html("<span style='color:#b2b2b2'>撤回一条消息</span>");
}

//用户列表点击
function click_userlist(id) {

    clearInterval(timeDiffSet);

    selUserInfo = "";

    id = id.split('_')[1];
    if (sel_userid != id) {
        //$("#userid_" + sel_userid).removeClass("active");
        //$("#userid_" + sel_userid).css("color", sel_userid == cur_rauthor ? "orange" : "black");

        $(".userList").removeClass("active");
        //$(".userList").css("color", sel_userid == cur_rauthor ? "orange" : "black");
        $(".userList").css("color", "black");
        $(".userList").css("background-color", "#BBB");

        $("#userid_" + id).addClass("active");
        $("#userid_" + id).css("color", "orange");
        $("#userid_" + id).css("background-color", "#ffa5");
        $("#msg_title").html('<span style="color:orange">' + dic_userlist[id] + '</span> - 私聊');
        sel_userid = id;

        $("#userid_" + id + " .badge").text("");

        if (ws && ws.readyState == 1 || true) {

            fun_loading(true);

            fun_getUserOldMsgs(1, 0);

            $(".input-main").show();
            $("#btn_random").hide();
            $("#btn_random_break").hide();
            $("#btn_random_return").show();

        }

    }
    else {
        $(".userList").removeClass("active");
        //$(".userList").css("color", sel_userid == cur_rauthor ? "orange" : "black");
        $(".userList").css("color", "black");
        $(".userList").css("background-color", "#BBB");

        $("#goTop").hide();
        $("#warningReport,#doBlack,#doAD").hide();
        $("#goBottom").hide();

        fun_showPublicZone();


    }
}

// 获取某用户私聊历史消息
function fun_getUserOldMsgs(isFirst, firstTid) {

    //layer.msg('加急注销中，敬请期待');

    //fun_loading(false);
    //return false;

    if (!sel_userid) {
        //layer.msg('此用户无对话信息');
        return;
    }

    // sendJson('getprivmsg', sel_userid, true);  
    // 用户历史消息获取
    var url = '/asmx/method.asmx/randomVIPGetHistoryUserMsgsPage';
    var method = 'post';
    var ifAsync = true;
    var tempdd = '{"myUserID":"' + (typeof ($.cookie('user_id')) == "undefined" ? "" : $.cookie('user_id')) + '","UserToID":"' + sel_userid + '","isFirst":"' + isFirst + '","firstTid":"' + firstTid + '","vipcode":"' + randomVipCode + '","serverPort":"' + ws_addr.split(':')[2] + '"}';
    var sendJsonData = $.parseJSON(tempdd);

    //var resultData = ZQLAjaxJson(url, method, ifAsync, sendJsonData);

    var resultData;

    $.ajax(
    {
        type: method,
        url: url,
        async: ifAsync,  // 是否多线程异步处理
        dataType: "json",
        cache: false,
        timeout: 5000,
        data: sendJsonData,
        success: function (data) {

            if (data.code == 0) {
                $(".userList").removeClass("active");
                //$(".userList").css("color", sel_userid == cur_rauthor ? "orange" : "black");
                $(".userList").css("color", "black");
                $(".userList").css("background-color", "#BBB");

                $("#userid_" + sel_userid).addClass("active");
                $("#userid_" + sel_userid).css("color", "orange");
                $("#userid_" + sel_userid).css("background-color", "#ffa5");
                $("#msg_title").html('<span style="color:orange">' + dic_userlist[sel_userid] + '</span> - 私聊');

                resultData = $.parseJSON('{"code":"0","msg":"成功","data":' + JSON.stringify(data) + '}');

                sendPublic = '';

                var contlist = resultData.data["contents_list"];

                if (isFirst == 1) {
                    $("#div_privmsg").html('');

                    $("#div_privmsg").append(selUserInfo);
                }

                for (var i = 0; i < contlist.length; i++) {
                    $("#div_privmsg").prepend(fun_chatbox(contlist[i], resultData.code));

                    if (i == contlist.length - 1) {
                        pri_OldMsgTid = contlist[i].Tid;
                    }
                }

                $("#goTop").show();
                $("#warningReport,#doBlack,#doAD").show();
                $("#goBottom").show();

                $("#div_msgbox_first").hide();
                $("#div_msgbox").hide();
                $("#div_privmsg").show();

                // 翻页 开始

                if (contlist.length == 0) {
                    $("#old_mes_get").html("已无更早历史消息");
                    $("#old_mes_get").attr('onclick', '');
                    return;
                }

                $("#old_mes_get").remove();
                $("#div_privmsg").prepend('<div id = "old_mes_get" onclick = "get_Random_Old_MessgePage();" style="width:200px;text-align:center;margin:10px auto;color:#09c;cursor: pointer;"><img alt="查看历史消息" src="/img/sys/time_pic.png" width="20" style="position: relative;top:-1px;" />查看历史消息</div>');

                // 翻页 结束

                if (isFirst == 1) {
                    $('#div_privmsg').scrollTop($('#div_privmsg')[0].scrollHeight);
                }

                $("#div_SNSInfo").hide();

                fancyimg();

                //scrotop();

                clearInterval(timeDiffSet);
                handleTimeDiff();
                timeDiffSet = setInterval(handleTimeDiff, 10000);

            }
            else {
                checkVipUser();
            }

            fun_loading(false);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            if (textStatus == "timeout") {

                //resultData = $.parseJSON('{"code":"-1","msg":"网络延迟：' + errorThrown + '","data":{}}');
                layer.msg('网络延迟,请稍后重试');

            }
            else {

                //resultData = $.parseJSON('{"code":"-2","msg":"失败：' + textStatus + errorThrown + '","data":{}}');
                layer.msg('获取历史信息失败:<br/>' + errorThrown);

            }

        },
        complete: function () {

            fun_loading(false);

        }

    })

}


//获取历史消息
function get_Random_Old_MessgePage() {
    var old_temp = layer.msg('获取中...', { time: 10 * 1000 }, { icon: 1 });

    fun_getUserOldMsgs(0, pri_OldMsgTid);

    setTimeout(function () { layer.close(old_temp) }, 500);
}

//非 vip 用户，提示购买激活码
var view_checkVipUser;
function checkVipUser() {

    var htmlstr = "<div class='inroom_zone' style='text-align: center;'>" +
                    "<div>" +
                        "<div style='margin:10px 10px;' maxlength='50'>此为VIP特权功能<br/>请先购买VIP激活码哦</div>" +
                        "<button id='vipcode_buy' class='btn btn-success' style='margin:0px 10px;width:100px;' type='button'>购买</button>" +
                        "<button id='vipcode_cancel' class='btn btn-success' style='margin:0px 10px;width:100px;' type='button'>取消</button>" +
                    "</div>" +
                  "</div>";

    view_checkVipUser = layer.open({
        type: 1,
        title: "",
        skin: 'demo-class',
        shadeClose: true,
        closeBtn: 0,
        area: ['260px', '100px'],
        content: htmlstr
    });

    $("#vipcode_buy").click(function () {

        urlGoBuyVipCode();

    });

    $("#vipcode_cancel").click(function () {

        layer.close(view_checkVipUser);

    });

}

//显示公共消息区
function fun_showPublicZone() {
    //$("#userid_" + sel_userid).css("color", sel_userid == cur_rauthor ? "orange" : "black");
    $("#userid_" + sel_userid).css("color", "black");
    $("#userid_" + sel_userid).removeClass("active");
    sel_userid = "";
    $("#msg_title").html("");
    $(".input-main").hide();
    $("#div_msgbox_first").show();
    $("#div_msgbox").hide();
    $("#div_privmsg").hide();
    $('#div_msgbox').scrollTop($('#div_msgbox')[0].scrollHeight);
    $('#div_privmsg').scrollTop($('#div_privmsg')[0].scrollHeight);

    $("#div_SNSInfo").hide();

    $("#goTop").hide();
    $("#warningReport,#doBlack,#doAD").hide();
    $("#goBottom").hide();

    scrotop();
}

//聊天信息展示
function fun_chatbox(json_user, code) {
    var htmlstr = ""
    if (json_user.code) code = json_user.code;
    switch (code) {
        case 4://用户修改名称
            htmlstr = '<div class="chat_msg"><div>' + json_user.time + '</div>' + json_user.beforename + " --> " + json_user.nickname + '</div>'; break;
        default:
            var self = json_user.id == hex_md5($.cookie("user_id"));

            if (self) {
                //$("#inp_say").val('');
            }

            if (!self) {
                layer.close(inputStatusTips); // 关闭对方输入提示
                inputStatusTips = null;
            }

            var id = code == 8 || code == 7 ? hex_md5($.cookie("user_id")) : json_user.id;//为内容块指定唯一ID
            var color = cur_rauthor == id && code != 8 && code != 7 ? "orange" : "#ABABAB"
            var chattitle = !self ? "<span style='color:" + color + "'>" + json_user.nickname + "</span> " + "<span style='color:#d2d2d2;display:none;'>" + json_user.time + "</span><span class='timeSpan' style='color:#ABABAB;margin-left:5px;'>&nbsp;</span>" : "<img style='margin-right:5px;width:17px;height:17px;opacity:0.6;' src='/img/sys/ret.png'><span style='color:#d2d2d2;display:none;'>" + json_user.time + "</span><span style='color:#ABABAB;margin-right:5px;'>&nbsp;</span><span style='color:" + color + "'>" + json_user.nickname + "</span><span style='color:#d2d2d2;display:none;'>" + json_user.Tid + "</span>";
            htmlstr = "<div class='chatbox' style='" + (self ? "float:right" : "float:left") + "' >"
                + "<div style='text-align:" + (self ? "right" : "left") + "'>" + chattitle + "</div>" +
                "<div class='chatarrow' style='" + (self ? "right:5px;border-bottom: 8px solid #ffe6b8;" : "left:5px;border-bottom: 8px solid #cfffcf;") + "'></div><div id='" + (sortID(id) + json_user.time.replace(/:/g, '_')) + "' class='chat" + (self ? " selfchat" : "") + "' style='max-width:" + ($("#div_msgpanel").width() * 0 + 315) + "px;'>" + chg_resource(json_user.content, json_user.time) + "<br />" + "</div>" +
                "</div><div class='clearboth'></div>"; break;
    }
    return htmlstr;
}

//  2018-06-18 不要有新消息就自动滑到最底端

//setInterval(function () { console.info(che_message_focus); }, 500);

$("#div_msgbox").click(function () { che_message_focus = 1; });
$("#div_msgbox").mouseenter(function () { che_message_focus = 0; });
$("#div_privmsg").click(function () { che_message_focus = 1; });
$("#div_privmsg").mouseleave(function () { che_message_focus = 0; });

function scrotop() {

    if (che_message_focus == 1) {

    }
    else {
        $('#div_msgbox').scrollTop($('#div_msgbox')[0].scrollHeight);
        $('#div_privmsg').scrollTop($('#div_privmsg')[0].scrollHeight);
    }

}

var isloading = null;
var index_loading;
//显示加载中
function fun_loading(show) {
    if (show) {
        isloading = setTimeout(function () {
            index_loading = layer.load(1, {
                shade: [0.2, '#000'] //0.1透明度的白色背景
            });
        }, 100);
    }
    else {
        layer.close(index_loading);
        clearTimeout(isloading);
    }
}

//文字转为日期
function fun_strtodate(str) {
    var d = new Date();
    return new Date(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + str);
}

//标题闪烁提醒
function haveTitleTips(msg) {

    if (!isFocus && !tick_titletips) {
        //haveSoundTips();
        tick_titletips = setInterval(function () {
            if (document.title.indexOf(msg) == -1) {
                document.title = "[" + msg + "]-匿名聊";
            }
            else {
                document.title = "[deskry]-匿名聊";
            }
            if (isFocus) {
                clearInterval(tick_titletips);
                tick_titletips = null;
                document.title = "匿名聊";
            }
        }, 500);
    }
    else if (!isFocus) {
        //haveSoundTips();
    }

    haveSoundTips();

}

//声音提醒
function haveSoundTips() {
    //alert($.cookie('isSound'));
    if ($.cookie('isSound') == 1 || !$.cookie('isSound')) {
        var audioEle = document.getElementById("msg_sound");
        audioEle.play();//播放
    }
}

//对自己用户id和所选用户id进行顺序排列
function sortID(uid) {
    if (sel_userid) {
        for (var i = 0; i < 8; i++) {
            if (uid[i] != sel_userid[i])
                return uid[i] > sel_userid[i] ? (uid + sel_userid) : (sel_userid + uid);
        }
        return uid;
    }
    else
        return uid;
}

//发送json数据
function sendJson(act, msg, self) {
    if (ws && ws.readyState == 1) {

        //if (self) {
        //    clearInterval(tick_heartpac);
        //    tick_heartpac = setInterval(function () {
        //        sendJson('heart', '');//定时心跳包
        //    }, 25000);
        //}

        if (act.indexOf("inputStatusOn") != -1) {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id') }));
        }
        else if (act.indexOf("inputStatusOff") != -1) {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id') }));
        }
        else if (act.indexOf("touser") != -1) {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id'), msg: msg }));
        }
        else if (act == "random") {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id'), userAge: userAge }));
        }
        else if (act == "randomOut") { // 匹配后离开
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id'), msg: msg }));
        }
        else if (act == "randomCancel") {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id') }));
        }
        else if (act == "heart") {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id') }));
        }
        else if (act == "modinfo") {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id'), userSex: userSex, address_show: address_show, randomhealthmode: switchHealthMode, randomvipsex: switchvipsex, randomvipaddress: switchVipAddress }));
        }
        else if (act == "sign") {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id'), name: $.cookie('user_nickname_random'), userSex: userSex, address_show: address_show, randomhealthmode: switchHealthMode, randomvipsex: switchvipsex, randomvipaddress: switchVipAddress, userip: userIP, useraddree: userAddree, randomvipcode: randomVipCode }));
        }
        else if (act == "chgname") {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id'), msg: msg }));
        }
        else if (act == "randomVIPinfoBind") {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id'), randomvipcode: randomVipCode, randomvipsex: 1 }));
        }
        else if (act == "warningreport") {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id'), msg: msg }));
        }
        else if (act == "ShowUserLoginInfo") {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id'), msg: msg, randomvipcode: randomVipCode }));
        }
        else if (act == "msgrevoke") {
            ws.send(JSON.stringify({ act: act, id: $.cookie('user_id'), msg: msg }));
        }
        else {
            ws.send(JSON.stringify({ act: act, rname: $.cookie('room_name_random'), rpsw: $.cookie('room_psw_random'), id: $.cookie('user_id'), name: $.cookie('user_nickname_random'), userip: userIP, useraddree: userAddree, userSex: userSex, address_show: address_show, msg: msg }));
        }

    }
    else {
        layer.msg('排队进入中...');
        fun_initWebSocket();
    }
}

/////////////////////////////////////////////////表情显示相关方法///////////////////////////////////////////////////

var index_emoji = 0;
//定义表情包
function init_initEmoji() {
    var emoji_html = "";
    for (var i in emoji) {
        emoji_html += "<span class='item_emoji' id='emoji_" + i + "' onclick='click_emojiItems(\"emoji_" + i + "\");'  title='" + i + "'><img class='imgitem_emoji' src='" + emoji[i] + "' /></span>";
    }
    $(".emoji").click(function () {
        $(".emoji_div").html(emoji_html);
        //$(".emoji_div").fadeToggle(300); 
        $(".emoji_div").slideToggle(300);

        //if (!index_emoji) {
        //    index_emoji = layer.tips("<div  class='list_emoji'>" + emoji_html + "</div>", '.emoji', {
        //        tips: [1, '#fff'],
        //        //shade: 0.4,
        //        //shadeClose: true,
        //        time: 0,
        //        area: ['350px', '235px'],
        //        shift: 3
        //    });
        //}
        //else {
        //    layer.close(index_emoji);
        //    index_emoji = null;
        //}



    });
}

//表情项的点击
function click_emojiItems(id) {
    $("#inp_say").insertAtCaret(id.split('_')[1]);
    $("html,body").animate({ "scrollTop": $(document).height() }, 400);
    layer.close(index_emoji);
    index_emoji = null;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////图片上传相关方法///////////////////////////////////////////////////

//用户上传的所有图片集合
var uploadPic = [];
var index_img = null;
var index_zoomimg = null;

var uploadPicListTime = [];

//获取用户上传的所有图片
function fun_getuploadimg() {
    $.getJSON("/asmx/upload.asmx/ProcessRequest", { act: "getUploadImg" }, function (json) {
        if (json.code != -1)
            uploadPic = json.msg;
    });
}

//绑定上传图片的分页
function bind_imgpage() {
    laypage({
        cont: 'uploadimg_pages', //容器。值支持id名、原生dom对象，jquery对象,
        pages: Math.ceil(uploadPic.length / 8), //总页数
        first: false,
        groups: 5,
        last: false,
        prev: false, //若不显示，设置false即可
        next: false, //若不显示，设置false即可
        jump: function (obj, first) { //触发分页后的回调
            if (!first) {
                bind_imglist(obj.curr);
            }
        }
    });
}

//背景图片错误时
function errpic(dom) {
    dom.background = "url('/img/BG.jpg') no-repeat"
}

//图片错误时
function errpic(dom) {
    dom.src = "/img/limit.jpg"
}

//转换文字为各种资源
function chg_resource(str, userid) {
    var em = str.match(/\[.*?]/gi);
    var img = "", wav = "", rar = "", video = "";
    if (em) {
        for (var i = 0; i < em.length; i++) {
            if (em[i].indexOf('.') != -1) {
                if (em[i].indexOf('.wav') != -1) {
                    wav = em[i].replace("[", "").replace("]", "");
                    if (wav)
                        str = str.replace(em[i], '<audio controls="controls"><source src="/Voice/' + $.trim(wav) + '"></audio>');
                }
                else if (em[i].indexOf('.rar') != -1 || em[i].indexOf('.zip') != -1) {
                    rar = em[i].replace("[", "").replace("]", "");
                    if (rar) {
                        var rar_param = rar.split('|');
                        str = str.replace(em[i], '<a href="/Files/' + rar_param[2] + '" target="_blank">' +
                        '<img style="float:left;" src="http://' + img_addr + ':668/img/sys/rarico.png" />' +
                        '<div style="float:left;margin-left:5px;font-size:18px;">' +
                        '<div style="margin-bottom:10px;">' + rar_param[0] + '</div><div style="color:orange;">' + rar_param[1] + 'kb</div></div></a>');
                    }
                }
                if (em[i].indexOf('.mp4') != -1 || em[i].indexOf('.avi') != -1 || em[i].indexOf('.3gp') != -1 || em[i].indexOf('.mov') != -1) {
                    video = em[i].replace("[", "").replace("]", "");
                    if (video)
                        str = str.replace(em[i], "<video width='300' height='auto' controls='controls'  poster=''><source src='http://" + img_addr + ":" + FileProt + "/img/Upload/" + video + "' type='video/mp4' /></video>");
                }
                else {
                    img = em[i].replace("[", "").replace("]", "");
                    if (img) {
                        str = str.replace(em[i], "<a class='fancybox' rel='group1' href='http://" + img_addr + ":" + FileProt + "/img/Upload/" + img + "' target='_blank'>" +
                            "<img onerror='errpic(this)' style='max-width:" + ($("#div_msgpanel").width() * 0 + 200) + "px;' src='http://" + img_addr + ":" + FileProt + "/img/Upload/" + img + "' /></a>");
                    }

                }
            }
            else {
                if (emoji[em[i]])
                    str = str.replace(em[i], "<img src='" + emoji[em[i]] + "' />");
            }
        }
    }
    return str;
}

// 时间格式调整
function formatDate(time) {
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();

    //var newTime = year + '-' +
    //            (month < 10 ? '0' + month : month) + '-' +
    //            (day < 10 ? '0' + day : day) + ' ' +
    //            (hour < 10 ? '0' + hour : hour) + ':' +
    //            (min < 10 ? '0' + min : min) + ':' +
    //            (sec < 10 ? '0' + sec : sec);

    var newTime = '/' + year + '-' +
                (month < 10 ? '0' + month : month) + '/' +
                (day < 10 ? '0' + day : day) + '/';

    return newTime;
}

//定义图片按钮
function init_uploadPic() {
    if (!index_img) {
        index_img = layer.tips("<div id='uploadimg_list' style='height:200px;'></div>" +
        "<button id='uploadimg_upload' class='btn btn-default uploadimg' type='button' style='float: right'>" +
        "<span class='sp_uploadimg'>上传</span></button>" + "<span style='color: #999;float: right;line-height: 35px;margin-right: 5px;position:absolute;top:0px;left:10px;'>上传后，点击图片/视频进行发送</span>" +
        //"<span class='sp_uploadimg_t'>维护中</span></button>" + "<span style='color: #999;float: right;line-height: 35px;margin-right: 5px;position:absolute;top:0px;left:10px;'>此功能维护中...</span>" +
        "<div id='uploadimg_pages' style='float:right;margin-top:5px;'></div>", '#a_uploadimg', {
            tips: [1, '#FEFEFE'],
            shade: 0.4,
            shadeClose: true,
            time: 0,
            area: ['275px', '250px'],
            shift: 3
        });
        bind_imglist(1);
        bind_imgpage();
        isBeforeUpload = false;
        $("#uploadimg_upload").click(function () {
            isUploadStyle = 0;
            isBeforeUpload = false;
            document.getElementById('uploading_file').click();
        });

        Clear_ImgList();

    }
    else {
        layer.close(index_img);
        index_img = null;
    }
}

//图片文件形式上传
function imgupload_file(file) {

    GetImgAddr();

    var upUrl;
    if (sel_userid == "") {
        upUrl = 'http://' + img_addr + ':' + FileProt + '/asmx/upload.asmx/ProcessRequest?act=uploadImgRandom';
    }
    else {
        upUrl = 'http://' + img_addr + ':' + FileProt + '/asmx/upload.asmx/ProcessRequest?act=' + UpImg + '&userid=' + $.cookie('user_id');
    }

    $.ajax({
        url: upUrl,
        type: 'POST',
        data: file,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            $("#uploadimg_upload").attr("disabled", false);
            $(".sp_uploadimg").text("上传");
            isBeforeUpload = true;
            $("#uploading_file").val('');
            var json = $.parseJSON(response);
            var issame = false;
            if (json.state == "Fail") {//上传图片错误提示
                layer.alert(json.msg, { icon: 5, title: '上传结果' });
                return;
            }
            for (var i = 0; i < uploadPic.length; i++) {
                if (uploadPic[i] == json.msg) {
                    issame = true;
                    break;
                }
            }
            if (!issame) {
                uploadPic.splice(0, 0, json.msg);

                uploadPicListTime.push(new Date());


            }
            bind_imglist(1);//自动跳转到第一页
            bind_imgpage();
        }
    });
}

//图片base64形式上传
function imgupload_base64(base64str) {
    $("#uploadimg_upload").attr("disabled", true);
    $(".sp_uploadimg").html("上传中...");

    var upUrl;
    if (sel_userid == "") {
        upUrl = '/asmx/upload.asmx/ProcessRequest?act=uploadPhotoRandoms';
    }
    else {
        upUrl = '/asmx/upload.asmx/ProcessRequest?act=uploadPhotoRandom';
    }

    $.post(upUrl, { base64str: base64str }, function (d) {
        $("#uploadimg_upload").attr("disabled", false);
        $(".sp_uploadimg").text("上传");
        isBeforeUpload = true;
        $("#uploading_file").val('');
        var json = $.parseJSON(d);
        var issame = false;
        if (json.state == "Fail") {//上传图片错误提示
            layer.alert(json.msg, { icon: 5, title: '上传结果' });
            return;
        }
        for (var i = 0; i < uploadPic.length; i++) {
            if (uploadPic[i] == json.msg) {
                issame = true;
                break;
            }
        }
        if (!issame)
            uploadPic.splice(0, 0, json.msg);
        bind_imglist(1);//自动跳转到第一页
        bind_imgpage();
    });
}

//绑定图片的列表
function bind_imglist(cur_page) {
    var uploadpic_html = "";
    for (var i = 8 * (cur_page - 1) ; i < cur_page * 8; i++) {
        if (uploadPic[i]) {
            uploadpic_html += "<div style='height:64px;float:left;margin:25px 5px;'>" +
            "<img id='uploadimgitem_" + uploadPic[i] + "'onclick='click_selimg(id);' onmouseover='mouseover_zoomimg(id);' onmouseout='mouseout_closezoom();' style='height:64px;width:64px;' src='http://" + img_addr + ":" + FileProt + "/img/Upload/" + uploadPic[i] + "' /></div>";
        }
    }
    $("#uploadimg_list").html(uploadpic_html);
}


// 定时清除过期图片
function Clear_ImgList() {

    for (var i = 0; i < uploadPicListTime.length; i++) {

        var temp = timeDiff(uploadPicListTime[i], new Date());

        if (temp.indexOf('分') != -1 && temp.split('分')[0] >= 9) {

            uploadPic.splice(uploadPicListTime.length - i - 1, 1);

            uploadPicListTime.splice(i, 1);

            if (1 > 0) {
                i--;
            }
			
        }

    }

}



//悬停在图片项时放大
function mouseover_zoomimg(id) {
    return;

    if (index_zoomimg || true)
        return;
    var imgID = id.split('_')[1];
    var imgSuffix = id.split('_')[2]
    index_zoomimg = layer.tips("<div><img style='max-width:100px;' src='http://" + img_addr + ":" + FileProt + "/img/Upload/" + $.cookie('user_id') + "/" + imgID + "." + imgSuffix + "' /></div>", '#' + id, {
        tipsMore: true,
        tips: [1, '#fff'],
        time: 0,
        area: 'auto',
        maxWidth: 400,
        shift: 5
    });
}

//从图片移出项时取消
function mouseout_closezoom() {
    layer.close(index_zoomimg);
    index_zoomimg = null;
}

//选中点击图片发送
function click_selimg(id) {
    var tmp = id.split('_')[1];
    $("#inp_say").insertAtCaret("[" + tmp + "]");
    $("#btn_say").trigger('click');
    layer.close(index_img);
    index_img = null;
    layer.close(index_zoomimg);
    index_zoomimg = null;
    $("html,body").animate({ "scrollTop": $(document).height() }, 400);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////拍照相关方法///////////////////////////////////////////////////

var index_getphoto;

//定义拍照按钮
function init_getphoto() {
    index_getphoto = layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        area: ['346px', '305px'],
        content: ['GetVideo.html', 'no']
    });
}

//拍照窗口返回结果
function result_getphoto(result) {
    layer.close(index_getphoto);
    var json = $.parseJSON(result);
    if (json.state != "Fail") {
        isFocus = true;
        $("#inp_say").val("[" + json.msg + "]");
        $("#btn_say").trigger('click');
    }
    else
        layer.msg('上传照片失败...');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////录音相关方法//////////////////////////////////////////////////////

var index_getvoice;

//录音
function init_record() {
    index_getvoice = layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        skin: 'layui-layer-rim',
        shadeClose: true,
        area: ['150px', '150px'],
        content: ['GetVoice.html', 'no']
    });
}

//返回录音界面的错误信息
function voice_errordialog(e) {
    layer.close(index_getvoice);
    layer.msg(e);
}

//录音窗口返回结果
function result_getvoice(result) {
    layer.close(index_getvoice);
    if (result.state != "Fail") {
        isFocus = true;
        $("#inp_say").val("[" + result.msg + "]");
        $("#btn_say").trigger('click');
    }
    else
        layer.msg(result.msg);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////上传压缩包方法////////////////////////////////////////////////////

//ajax上传文件
function uploadfile(file) {
    fun_loading(true);

    var upUrl;
    if (sel_userid == "") {
        upUrl = '/asmx/upload.asmx/ProcessRequest?act=uploadfileRandoms';
    }
    else {
        upUrl = '/asmx/upload.asmx/ProcessRequest?act=uploadfileRandom';
    }

    $.ajax({
        url: upUrl,
        type: 'POST',
        data: file,
        cache: false,
        async: true,
        contentType: false,
        processData: false,
        success: function (response) {
            fun_loading(false);
            isBeforeUpload = true;
            $("#uploading_file").val('');
            var json = $.parseJSON(response);
            if (json.state == "OK") {
                $("#inp_say").val("[" + json.msg + "]");
                $("#btn_say").trigger('click');
            }
            else {
                layer.msg(json.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            if (textStatus == "timeout") {
                console.log("网络延迟，请稍后尝试" + errorThrown);
            }
        },
        complete: function () {
            fun_loading(false);
        }

    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////涂鸦/////////////////////////////////////////////////////////////
var index_doodle;

//定义涂鸦
function init_doodle() {
    index_doodle = layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        skin: 'layui-layer-rim',
        area: ['756px', '415px'],
        content: ['Doodle.html', 'no']
    });
}

function result_doodle(result) {
    layer.close(index_doodle);
    var json = $.parseJSON(result);
    if (json.state != "Fail") {
        isFocus = true;
        $("#inp_say").val("[" + json.msg + "]");
        $("#btn_say").trigger('click');
    }
    else
        layer.msg(json.msg);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////复制粘贴上传/////////////////////////////////////////////////////////////
// 处理粘贴事件
$("#inp_say").on('paste', function (eventObj) {
    // 处理粘贴事件
    var event = eventObj.originalEvent;
    var imageRe = new RegExp(/image\/.*/);
    var fileList = $.map(event.clipboardData.items, function (o) {
        if (!imageRe.test(o.type)) { return }
        var blob = o.getAsFile();
        return blob;
    });
    if (fileList.length <= 0) { return }
    upload(fileList);
    //阻止默认行为即不让剪贴板内容在div中显示出来
    event.preventDefault();
});

function upload(fileList) {
    for (var i = 0, l = fileList.length; i < l; i++) {
        var fd = new FormData();
        var f = fileList[i];
        fd.append('files', f);
        var editor = document.getElementById("inp_say");

        var upUrl;
        if (sel_userid == "") {
            upUrl = '/asmx/upload.asmx/ProcessRequest?act=uploadImgRandom';
        }
        else {
            upUrl = '/asmx/upload.asmx/ProcessRequest?act=' + UpImg + '&userid=' + $.cookie('user_id');
        }

        $.ajax({
            url: upUrl,
            type: 'POST',
            dataType: 'json',
            data: fd,
            processData: false,
            contentType: false,
            xhrFields: { withCredentials: true },
            //headers: {
            //    'Access-Control-Allow-Origin': '*',
            //    'Access-Control-Allow-Credentials': 'true'
            //},
            success: function (res) {
                //var img = document.createElement('img');
                //img.src = '/img/Upload/' + res.msg; //设置上传完图片之后展示的图片
                //editor.appendChild(img);

                $("#inp_say").val("[" + res.msg + "]");
                $("#btn_say").trigger('click');
            },
            error: function () {
                layer.alert("上传图片错误");
            },
            complete: function () {
                fun_loading(false);
            }
        });
    }
}

/////////////////////////////////////////////////复制粘贴上传结束/////////////////////////////////////////////////////////////


/////////////////////////////////////////////////房间功能/////////////////////////////////////////////////////////////
var index_inroom;
var his_rooms_colors = ["#7c0000", "#0a4e1d", "#091f77", "#d08700", "#2c2c2c", "#540051", "#007a7c", "#3f7095", "#28a15b", "#000000"];

//向服务端提交房间信息
function fun_applyroom(rname, rpsw) {
    if (ws && ws.readyState == 1) {
        //sendJson("inroom", rname + "|" + rpsw, true);
    }
    else {
        //$.cookie('room_name_random', rname, { expires: 365 });
        //$.cookie('room_psw_random', rpsw, { expires: 365 });
        //fun_initWebSocket();
    }
}

//进入或者创建房间
function fun_inroom() {
    var htmlstr = "<div class='inroom_zone'><div class='inroom_leftzone'>" +
                  "<input id='inp_roomname' type='text' placeholder='房间名' style='width:150px;margin:12px 10px;' maxlength='10' class='form-control' />" +
                  "<input id='inp_roompsw' type='text' placeholder='密码（默认空）' style='width:150px;margin:20px 10px;' maxlength='6' class='form-control' />" +
                  "<button id='inroom_ok' class='btn btn-success' style='margin:0px 10px;width:150px;' type='button'>创建&进入</button></div>" +
                  "<div class='inroom_rightzone' style='overflow-y:auto;'>" + fun_inroom_showhistory() + "</div></div>";

    index_inroom = layer.open({
        type: 1,
        title: "进入/创建房间",
        skin: 'demo-class',
        shadeClose: true,
        closeBtn: 0,
        area: ['350px', '240px'],
        content: htmlstr
    });
    $(".inroom_zone").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#inroom_ok").trigger("click");
            return false;
        }
    });
    //$("#inp_roomname").val(cur_rname);    // 2018-07-03 去掉房间名称赋值
    $("#inroom_ok").click(function () {
        if (!$.trim($("#inp_roomname").val())) return;
        fun_loading(true);
        fun_applyroom($.trim($("#inp_roomname").val()), $.trim($("#inp_roompsw").val()));
    });
}


//添加历史房间
function fun_inroom_addhistory(rname, rpws) {
    var his_rooms = $.cookie("his_rooms") ? $.cookie("his_rooms").split('|') : [];
    var info = rname + "," + rpws;
    var index = $.inArray(info, his_rooms)
    if (index == -1) {
        his_rooms.unshift(info);
        if (his_rooms.length == 11)
            his_rooms.pop();
    }
    else {
        his_rooms.splice(index, 1);
        his_rooms.unshift(info);
    }
    $.cookie('his_rooms', his_rooms.join("|"), { expires: 365 });
}

//显示历史房间名称
function fun_inroom_showhistory() {
    var htmlstr = "";
    var his_rooms = $.cookie("his_rooms") ? $.cookie("his_rooms").split('|') : [];
    for (var i = 0; i < his_rooms.length; i++) {
        var info = his_rooms[i].split(',');
        var color = his_rooms_colors[Math.floor((Math.random() * his_rooms_colors.length))];
        htmlstr += "<button type='button' onclick='click_inroom_tag(\"" + info[0] + "\",\"" + info[1] + "\")' class='btn btn-primary btn-xs' style='margin:8px 6px;background-color:" + color + ";border-color:" + color + "'>" + info[0] + "</button>";
    }
    return htmlstr;
}

//历史房间的点击
function click_inroom_tag(rname, rpsw) {
    //fun_loading(true);
    //fun_applyroom(rname, rpsw);
}

//显示活跃度高的房间
function fun_showhotrooms(json) {
    var rooms = json.hotrooms_list;
    var htmlstr = "";
    for (var i = 0; i < rooms.length; i++) {
        htmlstr += "<div class='class_hotrooms' onclick='click_hotroom(\"" + rooms[i].rname + "\",\"" + rooms[i].needpsw + "\")'>" +
                   "<div style='color:#ffe6b8;margin-right:0px;' class='zql_btn_inroom'></div>" +
                   "<div class='label label-info' style='margin-right:5px;'>" + rooms[i].msgcount + "</div>" +
                    rooms[i].rname +
                   "<div style='color:orange;margin-left:5px;' class='" + (rooms[i].needpsw == 1 ? "hotrooms_lock" : "") + "'></div></div>";
    }
    $("#hotrooms").html(htmlstr);
}

//热门房间的点击
function click_hotroom(rname, needpsw) {
    che_message_focus = 0;
    if (needpsw == 0) {
        //fun_loading(true);
        //fun_applyroom(rname, "");

    }
    else {
        fun_inroom();
        $("#inp_roomname").val(rname);    // 2018-07-03 去掉房间名称赋值
    }
}

// 注销
$("#btn_xf").click(function () { Del_Cookies(); });

function Del_Cookies() {
    var lay_index = layer.alert('注销会<span style="color:orange;">&nbsp;重置&nbsp;</span>所有身份信息<br/>建议操作前先保存您当前的身份码<br/>以备注销后使用【身份找回】功能<br/>恢复原来身份与历史聊天用户信息<br/>您当前的身份码为：<br/><span style="color:orange;">' + $.cookie('user_id') + '</span>', {
        skin: 'demo-class', title: '', btn: ['确定', '取消'], btn1: function () {

            $.cookie("isSound", null, { expires: -1 });
            $.cookie("room_name_random", null, { expires: -1 });
            $.cookie("room_psw_random", null, { expires: -1 });
            $.cookie("user_id", null, { expires: -1 });
            $.cookie("user_nickname_random", null, { expires: -1 });
            $.cookie("his_rooms", null, { expires: -1 });
            $.cookie("userSex", null, { expires: -1 });
            $.cookie("userAge", null, { expires: -1 });
            $.cookie("address_show", null, { expires: -1 });

            layer.close(lay_index);

            layer.msg("注销成功");

            setTimeout(function () { ws.close(); window.location.reload(); }, 500);

        }, btn2: function () {
            layer.close(lay_index);
        }
    });

}

var inputStatus_int = 0;

//输入状态监测
function inputStatus() {

    var orderid = $("#inp_say").val().trim();

    if ($("#inp_say").val().trim() != "" && inputStatus_int == 0) {
        inputStatus_int = 1;
        sendJson('inputStatusOn_' + sel_userid + "_" + dic_userlist[sel_userid], 1, true);// 触发输入提示
    }
    else if ($("#inp_say").val().trim() == "") {
        inputStatus_int = 0;
        sendJson('inputStatusOff_' + sel_userid + "_" + dic_userlist[sel_userid], 0, true);// 停止输入提示
    }

}

// 输入框失去焦点触发
function hidInputStatus() {
    //inputStatus_int = 0;
    //setTimeout(function () { 
    //    sendJson('inputStatusOff_' + sel_userid + "_" + dic_userlist[sel_userid], 0, true);// 停止输入提示
    //}, 300);

    //this.$refs.phoneValue.blur();
    //this.$refs.verifyCode.blur();

    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 100);

}

var inputStatusTips;

function fun_inputStatusOn() {
    if (!inputStatusTips) {
        inputStatusTips = layer.tips('对方正在输入...', '.input-area', { tips: [1, '#0FA6D8'], tipsMore: true, time: 0 });
    }
}

function fun_inputStatusOff() {
    layer.close(inputStatusTips);
    inputStatusTips = null;
}

//置顶
$("#goTop").click(function () {
    che_message_focus = 1;
    $('#div_msgbox').animate({ scrollTop: 0 }, 400);
    $('#div_privmsg').animate({ scrollTop: 0 }, 400);
});

//陪伴
$("#doAD").click(function () {

    window.location.href = "https://weidian.com/?userid=297880287&spider_token=6c3e";

});

//举报
$("#warningReport,#doBlack").click(function () {

    warning_Black();

});

function warning_Black() {
    var lay_index = layer.confirm('确定举报并拉黑对方？<br/>被多人举报会自动封禁<br/>拉黑会在每天凌晨0点自动解除', {
        skin: 'demo-class',
        title: '',
        btn: ['确定', '取消']
    }, function () {
        pri_BlackUserID += sel_userid + ";";
        sendJson('warningreport', sel_userid, true);
        layer.close(lay_index);
    });
}

//置底
$("#goBottom").click(function () {
    che_message_focus = 0;
    $('#div_msgbox').animate({ scrollTop: $('#div_msgbox')[0].scrollHeight }, 400);
    $('#div_privmsg').animate({ scrollTop: $('#div_privmsg')[0].scrollHeight }, 400);
});

//注销点击表情和图片后蒙层无法消失的问题
$(".layui-layer-shade").click(function () {
    layer.close(index_img);
    index_img = null;
    layer.close(index_emoji);
    index_emoji = null;
});


// 加载Tips
$(function () {

    setTimeout(function () {

        if ($.cookie('FirstNotice') != '1') {
            //loginTips();
        }
        else {
            Notice1();
        }

    }, 1200);

})

//登录提示
var loginTipslayOpen;
function loginTips() {

    var NoticeStr = "<div class='loginTips' style='padding-bottom: 0px;'>";
    NoticeStr += "<ul>【用户须知】";
    NoticeStr += "<li><span>1、</span><span>请遵守您所在国家地区的法律法规，禁止发布任何违反法律法规、广告、恶意刷屏的信息，违者将被禁止访问；</span></li>";
    NoticeStr += "<li><span>2、</span><span>为了保障大家拥有和谐良好的聊天环境，公屏禁止发布图片；</span></li>";
    //NoticeStr += "<li><span>3、</span><span>房间密码为用户自建、自传播，其他人无权散播。房间审核通过后才能对外显示，一个工作日内审核完毕，请保持关注，也可联系客服加急处理，谨防受骗上当；</span></li>";
    NoticeStr += "<li><span>3、</span><span>如果您在使用本站过程中遇到任何问题，可直接联系本站客服，我们会尽快为您处理。请勿轻易将自己隐私信息公布，以免被骗。</span></li>";
    NoticeStr += "</ul>";
    NoticeStr += "<ul class='loginTipsKF'>";
    //NoticeStr += "<li><span>微信公众号：</span><span>Deskry 匿名社区</span></li>";
    NoticeStr += "<li><span>客服QQ：</span><span><a href='http://wpa.qq.com/msgrd?v=3&uin=2868355448&site=qq&menu=yes' target='_blank'>2868355448</a></span></li>";
    NoticeStr += "<li><span>客服微博：</span><span>Deskry</span></li>";
    NoticeStr += "</ul>";
    NoticeStr += "<div id='FirstNotice' style='text-align:center;color:aqua;font-size:13px;'>不再显示</div>";
    NoticeStr += "</div>";

    //公告层
    loginTipslayOpen = layer.open({
        type: 1
      , title: false //不显示标题栏
      , closeBtn: false
      , area: '300px;'
      , shade: 0.3
      , id: 'NoticeShowloginTips' //设定一个id，防止重复弹出
      , btn: ['我同意以上规则']
      , btnAlign: 'l'
      , moveType: 1 //拖拽模式，0或者1
      , content: NoticeStr
      , success: function (layero) {
          //var btn = layero.find('.layui-layer-btn');
          //btn.find('.layui-layer-btn0').attr({
          //    href: 'http://www.layui.com/'
          //  , target: '_blank'
          //});

          $("#FirstNotice").click(function () {
              $.cookie('FirstNotice', "1", { expires: 365 });

              layer.close(loginTipslayOpen);
              setTimeout(function () {
                  Notice1();
              }, 1000);

          });


      }
      , yes: function (index, layero) {
          //事件
          layer.close(loginTipslayOpen);
          setTimeout(function () {
              Notice1();
          }, 1000);

          // 显示 匹配 Tips 
          setTimeout(function () {

              layer.tips('<div class="shake-slow shake-constant" style="color:#FFF;font-weight:700;">点击此处切换日、夜间模式</div>', $("#theme_sun_moon"), { tips: [3, '#009688'], time: 2000, shift: 6 });

              setTimeout(function () {

                  layer.tips('<div class="shake-slow shake-constant" style="color:#FFF;font-weight:700;">点击此处切换背景色</div>', $("#colorpicker"), { tips: [3, '#009688'], time: 2000, shift: 5 });

                  setTimeout(function () {

                      layer.tips('<div class="shake-slow shake-constant" style="color:#FFF;font-weight:700;">开启青少年模式可屏蔽所有敏感信息和图片</div>', $("#health_mode_tip"), { tips: [1, '#009688'], time: 2000, shift: 4 });

                  }, 2000);

              }, 2000);

          }, 1500);

      }

    });

}

$("body").css("background-color", $.cookie('colorpicker'));

/// 颜色选择器
layui.use('colorpicker', function () {

    var colorpicker = layui.colorpicker;
    //渲染
    colorpicker.render({
        elem: '#colorpicker'  //绑定元素
    , color: '#009688' //自定义默认颜色
    , colors: ['#414550', '#294714', '#009688', '#EFEFEF'] //自定义预定义颜色项
    , predefine: true
    , done: function (color) {
        // 清空、确定 按钮触发
        //layer.tips('给指定隐藏域设置了颜色值：' + color, this.elem);
        //color || this.change(color); //清空时执行 change
    }
    , change: function (color) {
        //给页面元素设置主题色
        $("body").css("background-color", color);
        $.cookie('colorpicker', color, { expires: 365 });
    }
    });

});

// 滑块 - 年龄
layui.use('slider', function () {
    var $ = layui.$
    , slider = layui.slider;


    //开启输入框
    slider.render({
        elem: '#slideTest8'
      , min: 1
      , max: 100
      , value: 22 //初始值
      , tips: true //开启默认提示层
      , step: 1 //步长
      , showstep: false //开启间隔点
      , setTips: function (value) { //自定义提示文本
          return value + '岁';
      }
      , input: true //输入框
      , theme: '#5FB878' //主题色
    });

    // 自定义文本框
    $(".layui-slider-input-txt input").attr('type', 'number');
    $(".layui-slider-input-txt input").attr('max', '100');
    $(".layui-slider-input-txt input").attr('maxlength', '2');

});


/// 身份找回
var GetMyinfo;
$("#btn_GetMyinfo").click(function () {

    // $.cookie('user_id', json.msg.id, { expires: 365 });

    var htmlstr = "<div class='inroom_zone' style='text-align: center;'>" +
                    "<div>" +
                        "<p id='buy_vipcode' style='margin:8px auto;width:200px;color: #E5511D;border: none;'>请录入您需要找回的身份码</p>" +
                        "<input id='random_user_id' type='text' placeholder='请录入您需要找回的身份码' style='width:200px;margin:10px auto;' length='50' class='form-control' />" +
                        "<button id='user_id_Copy' class='btn btn-success' style='margin:10px auto;width:100px;display:none;' type='button'>复制</button>" +
                        "<button id='user_id_Clear' class='btn btn-success' style='margin:10px auto;width:100px;display:block;' type='button'>输入清除</button>" +
                        "<button id='user_id_Ok' class='btn btn-success' style='margin:10px auto;width:100px;display:block;' type='button'>确认找回</button>" +
                    "</div>" +
                  "</div>";

    GetMyinfo = layer.open({
        type: 1,
        title: "",
        skin: 'demo-class',
        shadeClose: true,
        closeBtn: 0,
        offset: ['10px'],
        area: ['220px', '172px'],
        content: htmlstr
    });

    //$("#random_user_id").focus();

    //$("#random_user_id").val($.cookie('user_id'));

    $("#random_user_id").unbind("keydown").keydown(function (e) {//组合键
        //if (e.keyCode == 13 && e.ctrlKey) {       
        if (e.keyCode == 13) {
            $("#user_id_Ok").trigger("click");
            return false;
        }
    });

    $("#user_id_Copy").click(function () {

        if ($.trim($("#random_user_id").val()).length != 32) {

            $("#random_user_id").focus();
            layer.msg('身份码不合法', { time: 700, offset: ['30px'] });

        }
        else {

            var e = document.getElementById("random_user_id");
            e.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            $("#random_user_id").blur();

            layer.msg("身份码复制成功！", { time: 1000, offset: ['30px'] });

        }

    });

    $("#user_id_Clear").click(function () {

        $("#random_user_id").val('');
        $("#random_user_id").focus();

        //layer.msg('身份码已清空', { time: 700 });

    });

    $("#user_id_Ok").click(function () {

        if ($.trim($("#random_user_id").val()).length != 32) {

            $("#random_user_id").focus();
            layer.msg('身份码不合法', { time: 700, offset: ['30px'] });

        }
        else {

            $.cookie('user_id', $.trim($("#random_user_id").val()), { expires: 365 });
            layer.msg('身份已找回,刷新后生效', { time: 700 });

            window.location.reload();

        }

    });

})

$("#UserID").click(function () {

    var userID = $.trim($("#UserID").html());

    if (userID.length != 32) {

        $("#UserID").focus();
        layer.msg('身份码不合法', { time: 700, offset: ['30px'] });

    }
    else {

        var element = $("<textarea>" + userID + "</textarea>");
        $("body").append(element);
        element[0].select();
        document.execCommand("Copy");
        element.remove();

        layer.msg("身份码复制成功！", { time: 1000 });

    }

});

// 寻人开始 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var layer;

layui.use(['layer'], function () {
    layer = layui.layer //弹层
})

var shop_XR;

//寻人页面
function XR() {

    layer.msg("寻人、找回身份码请联系在线QQ客服<br/>需尽快，因为 3 天内找回的几率最大哦", { time: 2500 });

    //window.location.href = "https://bbs.nmpipei.com";

    //shop_XR = layer.open({
    //    type: 2,
    //    title: '',
    //    closeBtn: 0,
    //    maxmin: false,
    //    shadeClose: true,
    //    area: ['350px', '512px'],
    //    //content: ['/list/70', 'no'], // 去掉滚动条
    //    content: 'https://bbs.nmpipei.com/list/70'
    //});

}

// 寻人结束 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$(".btn_Login").click(function () { login() });
$(".btn_regist").click(function () { regist() });


// 注册开始 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var view_regist;

function regist() {

    view_regist = layer.open({
        type: 2,
        title: '',
        closeBtn: false,
        maxmin: false,
        shadeClose: true,
        area: ['300px', '400px'],
        //content: ['/Demos/add.html', 'no'], // 去掉滚动条
        content: '/registSimple/regist.html??v=129&userID=' + $.cookie("user_id") + '&servername=' + ws_addr.split(':')[2]
    });

}

function result_regist(data) {
    layer.close(view_regist);
}

// 注册结束 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 登陆开始 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var view_login;

function login() {

    view_login = layer.open({
        type: 2,
        title: '',
        closeBtn: false,
        maxmin: false,
        shadeClose: true,
        area: ['300px', '280px'],
        //content: ['/Demos/add.html', 'no'], // 去掉滚动条
        content: '/login/login.html?v130'
    });

}

function result_login(data) {
    $.cookie('user_id', data.userid, { expires: 365 });
    layer.close(view_login);
    setTimeout(function () { window.location.reload(); }, 500)
}

function result_gotoReg() {
    layer.close(view_login);
    regist();
}


// 登陆结束 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////