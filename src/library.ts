export function wait(time: number = 0) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, time)
  })
}

export function generateRandomValInGivenNum(lowerInteger, upperInteger) {
  var choices = upperInteger - lowerInteger + 1;
  return Math.floor(Math.random() * choices + lowerInteger);
}
