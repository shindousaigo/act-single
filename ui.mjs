// node --experimental-modules ui.mjs & 
// node --experimental-modules ui.mjs & 

import Path from "path"
import Write from "write"
import JsonFormat from "json-format"
import AssignDeep from "assign-deep"
import Ui from "./src/modules/activity/ui/index.mjs"

setTimeout(function () {
  const assign = AssignDeep({}, template, Ui)
  Write(
    Path.resolve('src/modules/activity/ui/index.mjs'),
    'export default  ' + JsonFormat(assign)
    .replace(/\t"/g, '\t')
    .replace(/":/g, ':'),
    function (err) {
      if (err) console.log(err);
    })
})

const template = {
  index: {
    overflow_x: ""
  },
  login: {
    bg_btn: "",
    bg_box: "",
    input_username: {},
    input_password: {},
    input_server: {},
    btns: {
      sdk: ""
    }
  }
}