## less和sass区别
less @ 定义变量， sass用$ ，sass使用{}嵌套
Sass支持条件语句，可以使用if{}else{},for{}循环等等，而Less不支持

Less是基于JavaScript，是在客户端处理的。

Sass是基于Ruby的，是在服务器端处理的。编译Sass要安装Ruby

3.1 提供CSS缺失的样式层复用机制
3.2 减少冗余代码
3.3 提高样式代码的可维护性
3.4 结构清晰，便于扩展可以方便的屏蔽浏览器私有的语法差异
3.5 轻松实现多重继承，完全兼容了CSS代码，提高了开发效率。


## sass样式封装
字体，颜色等写到一个文件里面，可以在需要的页面import即可，也可以全局导入，在vue.config.js中，css里面配置。
```js
module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData:
            '@import "~@/common/css/variables.scss"; @import "~@/common/css/mixin.scss";',
        },
      },
    },
  };
```