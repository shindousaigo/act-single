import Vue from "vue"
export default class Mark {

  static _ins: Mark
  static get instance(): Mark {
    return this._ins || new Mark;
  }
  constructor() {
    Mark._ins = this;

    (function (f: any, b, e, v, n?: any, t?: any, s?: any) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
      const noscript = document.createElement('noscript')
      noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${Vue.prototype.VUE_APP_FACEBOOK_MARK_ID}&ev=PageView&noscript=1" />`;
      document.body.appendChild(noscript);
    })(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', Vue.prototype.VUE_APP_FACEBOOK_MARK_ID);
    window.fbq('track', 'PageView');
  }

  mark(name) {
    window.fbq('track', name)
    console.info(`"${name}" has marked - facebook`, Vue.prototype.VUE_APP_FACEBOOK_MARK_ID)
  }


}

new Mark