
const polyfills = ["Promise", "Array.prototype.flat"]
const polyfillUrl = "https://polyfill.io/v3/polyfill.min.js"
const features: any = [];

polyfills.forEach(feature => {
  if (!(feature in window)) {
    features.push(feature)
  }
})
if (features.length) {
  var s = document.createElement('script');
  s.src = `${polyfillUrl}?features=${features.join(',')}&flags=gated,always&rum=0`;
  s.async = true;
  document.head.appendChild(s);
  s.onload = function () {
    window.main()
  }
} else {
  window.main()
}