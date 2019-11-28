const Path = require('path')
const Yargs = require("yargs")
const Webpack = require("webpack")
const fs = require("fs")
const path = require("path")
const content = fs.readFileSync(path.resolve("./.env.local"), { encoding: 'utf8' })
const argv = Yargs.argv

const VUE_APPS = {}

content.trim().split(/\n/).forEach(item => {
  const arr = item.split("=")
  VUE_APPS[arr[0]] = JSON.parse(arr[1])
})

module.exports = {
  devServer: {
    port: process.env.VUE_APP_CLIENT_PORT,
    // disableHostCheck: true,
    // https: true
  },
  publicPath: argv.mode === "production" ? "/activity/2ndanniversary/" : "/", // 
  pluginOptions: {
    apollo: {
      enableMocks: false,
      enableEngine: true
    },
    i18n: {
      locale: 'en', // The locale of project localization
      fallbackLocale: 'en', // The fallback locale of project localization
      localeDir: 'locales', // The directory where store localization messages of project
      enableInSFC: false // Enable locale messages in Single file components
    }
  },
  configureWebpack: config => {
    config.module.rules.find(item => item.test.test("*.scss")).oneOf.forEach((item, index, array) => {
      array[index].use.push({
        loader: 'sass-resources-loader',
        options: {
          resources: [
            Path.resolve(__dirname, 'src/modules/activity/common.scss')
          ]
        }
      })
    })
    config.resolve.alias = {
      "apollo-server": Path.resolve(__dirname, "apollo-server"),
      "src": Path.resolve(__dirname, "src"),
      "public": Path.resolve(__dirname, "public")
    }
    const DefinePluginOptions = {
      BaseUrl: JSON.stringify(process.env.VUE_APP_BASE_URL_TEST),
      VUE_APPS: JSON.stringify(
        require("./public/assets/" + VUE_APPS["VUE_APP_PATH"] + "/config.js")
      )
    }
    if (argv.mode === "production") { // 正式环境
      DefinePluginOptions.BaseUrl = JSON.stringify(process.env.VUE_APP_BASE_URL)
    }
    config.plugins.push(
      new Webpack.DefinePlugin(DefinePluginOptions)
    )
  }

}