//获取当前运行环境 是生产环境还是开发环境
const isPro = process.env.NODE_ENV === 'production';
//引入模块配置
const path = require('path')
const glob = require('glob')
//argv 获取当前连接上的参数与
const argv = require('yargs').argv
const cwd = path.join(__dirname, '.') 
//压缩文件
 
//打包分析结果
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
 
//提供resolve的路径分析效果
function resolve(dir) {
  return path.join(__dirname, dir)
}

//获取当前多页面的page项目
function getPages() {
  //获取pages
  const pages = {} 
  glob.sync('src/views/*/index.js', {
    cwd
  })
    .forEach(filePath => {
      //当前目录的位置
      const dirname = path.dirname(filePath)
      //进行页面配置操作
      const chunks = ['manifest', 'vendors', 'vue-vendors', 'common'];
      
      //获取当前页面的名字
      const name = /(views\/.*\/index)\.js/.exec(filePath)[1].replace('views/', '') //admin/index
      let shortName = name.replace(/\/index/, '') //admin
      chunks.push(name)

      pages[name] = { 
        entry: filePath, //入口文件来源
        template: `${dirname}/index.html`, // . 模板来源.
        filename: isPro ?
          `../pages/${shortName}/index.html` : `${name}.html`, // 输出文件
        title: `${shortName} title`,//页面标题
        chunks: chunks, //提取出来的通用的chunk和vendor
        chunksSortMode: (chunk1, chunk2) => {
          var order = chunks
          var order1 = order.indexOf(chunk1.names[0])
          var order2 = order.indexOf(chunk2.names[0])
          return order1 - order2
        },
        erudaScripts: argv.console ? erudaScripts : ''
      }
    })
  return pages
}
var pages = getPages();
// console.log(pages)

const BASE_URL = isPro ?
  '../../static' :
  '/'
module.exports = { 
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: process.env.NODE_ENV !== 'production',

  //打包前缀路径 通常为当前index.html引用的路径地址 
  publicPath: BASE_URL,

  //将构建好的文件输出到哪里（或者说将编译的文件） 主要应于静态文件打包，index.html 可自行进行配置打包，
  outputDir: path.resolve(__dirname, './dist/static'),

  // 生成环境sourcemap去掉 开发环境中可有利于定位到出错误的地方
  productionSourceMap: process.env.NODE_ENV !== 'production',

  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  runtimeCompiler: false,

  //配置多页面的应用程序
  pages: pages,
  //css操作哦
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},
    extract: {
      filename: 'css/[id].css?v=[contenthash:8]',
      chunkFilename: 'css/[id].css?v=[contenthash:8]',
      ignoreOrder: true
    },
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    // modules: false
  },
  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa
  pwa: {},
 //构建流程中使用得到的效果
  configureWebpack: (config) => {
    const plugins = [];
    const optimization = {
      runtimeChunk: {
        name: 'manifest'
      },
      minimizer: [
       
      ],
      //拆分包
      splitChunks:{
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 4,
        name: false, 
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\\/]node_modules[\\\/]/,
            priority: -15,
            chunks: 'initial'
          },
        }
      }
    }
    Object.assign(config, {
      optimization,
    })

     
    //增加打包分析器
    if(argv.a){
      plugins.push(new BundleAnalyzerPlugin())
    }
    config.plugins = [...config.plugins, ...plugins];

  },
  // 调整内部的 webpack 配置。
  chainWebpack: (config) => {
    //设置别名信息
    config.resolve.alias
      .set('@src', resolve('src'))
      .set('@accout', resolve('src/views/accout'))
      .set('@user', resolve('src/views/user'))
      .set('@style', resolve('src/style'))
    //设置运行环境
    config.optimization.runtimeChunk({
      name: 'manifest'
    })

  }
}