import Vue from "vue"
declare const FB: any
export default class Share {
  promise
  static _ins: Share
  static get instance(): Share {
    return this._ins || new Share;
  }
  constructor() {
    Share._ins = this
    this.promise = new Promise(resolve => {
      let script = document.createElement("script")
      script.src = "https://connect.facebook.net/en_US/sdk.js"
      document.body.appendChild(script)
      script.onload = () => {
        resolve()
      }
    })
    this.promise.then(() => {
      const initConfig = {
        appId: Vue.prototype.VUE_APP_FACEBOOK_APPLICATION_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: Vue.prototype.VUE_APP_FACEBOOK_SDK_VERSION
      }
      FB.init(initConfig)
    })
  }

  share(shareUrl) {
    
    FB.ui({
      method: 'share',
      href: shareUrl,
      // display: 'popup'
    }, function (shareDialogResponse) { })
    // return new Promise((resolve, reject) => {
    //   this.promise.then(() => {
    //     FB.ui({
    //       method: 'share',
    //       href: shareUrl,
    //       // display: 'popup'
    //     }, function (shareDialogResponse) {
    //       if (shareDialogResponse) {
    //         if (shareDialogResponse.error_message) {
    //           resolve({
    //             code: 0,
    //             error_msg: shareDialogResponse.error_message
    //           })
    //         } else {
    //           resolve({
    //             code: 200
    //           })
    //         }
    //       } else {
    //         resolve({
    //           code: 0
    //         })
    //       }
    //     })
    //   })
    // })
  }

}