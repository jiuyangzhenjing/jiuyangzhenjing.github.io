# webpack 中蕴含的前端知识（一）
## 关于 node module 和 ES6 module 的不同之处

### 从模块化说起

我们现在都已经知道，前端的模块化是一个逐步成长的过程。
`AMD`，`CMD`，`CommonJS`，`ES6 module`是分别在不同场景下不同历史时期提出的模块化概念。

我们今天的主角是`CommonJS`和`ES6 module`这两个标准，他们有很多相似的地方，又有很多不同之处。如果我们弄懂了这两种模块的标准，我们也就基本弄懂了现在JS的模块标准了。

### CommonJS

`CommonJS` 是由 `JavaScript` 组织于2009年提出的包含模块，文件，IO，控制台在内的一系列标准。在`Node.js`实现中采用了`CommonJS`标准的一部分。但是`Node.js`做了一些调整，现在谈到`CommonJS`一般都是`Node.js`中的概念，而不是原始的概念了。

最初，`CommonJS`只在服务端，后来有了`Browserify`(一个运行在`Node.js`下的模块打包工具)，它可以将`CommonJS`模块打包为浏览器可以运行的单个文件，所以，`CommonJS`标准下的代码也可以运行在浏览器和客户端环境下了。

#### 模块，导出和导入

`CommonJS`规定每个JS文件是一个模块，当一个模块中引入另一个模块的时候不会造成全局污染。

模块向外暴露自身的唯一办法就是导出，通过语法`module.exports`可以导出模块中的内容，他可以直接写成`exports`,我们可以把二者这样看待:
```javascript
var exports = module.exports;
```
所以，我们现在也同时知道了，我们只可以操作`exports`这个‘指针’,不能为它赋值。

在`CommonJS`导入其他模块的方法是用`require`，在`require`执行的时候可以分为两种情况：
- 第一次加载模块，这是首先会执行该模块再导出内容。
- 模块已经被加载过了，此时不再执行，直接导出上次执行的结果。

有时候我们只需要加载一个模块然后把它挂载至全局变量上，此时我们只要`require`即可。
`require`可以接受一个表达式，所以我们可以动态的加载一个模块。

### ES6 Module

ES6 Module 是在2015年才被正式发布的一项模块标准，这也是目前为止唯一一个官方的模块标准。ES6 Module 也是将每个文件作为一个模块，每个模块拥有自身的作用域，不同的是导入，导出语句。import 和 export 也作为保留关键字在ES6版本中加入进来了。

ES6 Module会自动采用严格模式，这在ES5中是一个可选选项。以前我们可以通过选择是否在文件的开始处添加‘use strict’来控制严格模式，在ES6 Module中就是必须准守的一个规则了。

#### 导出，导入

在ES6 Module中，使用 export 进行模块的导出。可以通过两种形式导出一个模块：
- 命名导出
- 默认导出
一个模块可以有多个命名导出。它有两种不同写法：
```javascript
// 写法一
export const name = 'calculator';
export const add = function(a,b) {
    return a + b;
}

// 写法二
const name = 'calculator';
const add = function(a,b) {
    return a + b;
}
export { name, add };
```

与命名导出不同，模块的默认导出只能有一个。

```javascript
export default {
    name: 'calculator',
    add : function() {
        return a + b;
    }
}
```