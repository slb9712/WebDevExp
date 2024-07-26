## 浏览器兼容性问题产生原因
 因为不同浏览器使用内核及所支持的HTML等网页语言标准不同；以及用户客户端的环境不同（如分辨率不同）造成的显示效果不能达到理想效果。最常见的问题就是网页元素位置混乱，错位，显示不出。


1. 不同浏览器标签默认的外边距和内边距不同
*{margin:0px; padding:0px}。

2. 块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大。
在float的标签样式中加入:display:inline;将其转化为行内属性。

3. 图片默认有间距。
使用float为img布局。

4. 设置较小高度标签（一般小于10px），在IE6、IE7，遨游中高度超出自己设置的高度。
给超出高度的标签设置overflow:hidden;或者设置行高line-height小于你设置的高度。

5. 行内属性标签，设置display:block后采用float布局，又有横行的margin的情况，IE6间距bug。

在display:block;后面加入display:inline;display:table;


## js等兼容可以配置bebel和polyfill
Babel 本身的插件或专门的代码检查工具可以扫描代码看哪些特性不支持
@babel/eslint-parser， 安装并设置好 @babel/eslint-parser 后，只需运行 ./node_modules/.bin/eslint yourfile.js，即可对文件进行完整的 ESLint 检查

Babel 主要负责将新的 JavaScript 语法和特性转换为目标环境能够理解的旧语法。例如，将 ES6 的类定义转换为基于 ES5 的构造函数实现。
polyfill 则用于填补浏览器中缺失的原生 JavaScript 方法和特性，Babel 在转译过程中会识别到这一点，而配置好的 polyfill （如 core-js ）会提供这个方法的实现。

### 常用polyfill库有 core-js、 babel-polyfill       bebel库@babel/core @babel/preset-env

## css兼容

Autoprefixer 的使用步骤
1. 安装 Autoprefixer 和 PostCSS
首先，需要安装 Autoprefixer 以及 PostCSS 作为其依赖。

2. 配置 PostCSS
在项目根目录下创建 postcss.config.js 文件，并进行配置：
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
3. 配置 Browserslist
Browserslist 用于定义你希望支持的浏览器范围。可以在 package.json 文件中添加 Browserslist 配置：
{
  "browserslist": [
    "last 2 versions",
    "> 1%",
    "IE 10"
  ]
}
4. webpack配置
rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer()
                ]
              }
            }
          }
        ]
      }]