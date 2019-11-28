export const scrollToEvent = function (event_index) {
  const dom = document.querySelector(".event" + event_index)
  dom && window.scrollTo(
    0, dom["offsetTop"] - 26
  )
}

export const scrollToBtm = function () {
  const dom = document.querySelector(".vw-act-copyright")
  dom && window.scrollTo(
    0, dom["offsetTop"] - 26
  )
}