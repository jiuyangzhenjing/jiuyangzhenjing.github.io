# 有那么多介绍打包工具的教程了，为什么要在自己写一个

毕业一年半，我在公司负责了各种各样不同的业务，使用过各种各样不同的技术，从开始进到公司上级让我做什么我就做什么，到后来逐渐有了自己的思路，自己摸索着去实践。先后负责过web开发(从17年毕业之前两个月进入公司到18年2月这大概一年的时间中，我先后使用过1.jsp+原生js,手写html页面,jquery->2.使用使用angularjs,vuejs开发页面，requirejs管理->3.使用webpack+vue-cli进行开发->4.进行原生app开发,独立完成一个项目90,3-11月我又进行了(5.使用angular4+electron开发桌面项目->5.使用vue+iview+webpack进行新项目开发
),11月底我被抽调到了新的项目组，参加java后台(ssm)的开发，在这个过程中，我被管理过，尽力自我管理，做过小主管管理过别人，开过‘高层会’讨论过公司的命运问题。也经历过公司发不出工资的时刻，连续三个月加班到一点，遇到过各种沟通问题有开心也有郁闷的时刻。我很感激能在一个让我不断试错的公司一直坚持着干了这将近两年的时间，经历过这些丰富的工作过程。但是这毕竟不是长久之计，我始终是一个野路子，就像打仗没有正经装备和战术。这些道理我也知道，我一直在问自己，你到想干什么。我也一直不断的回答是前端，但是，我又在不断地问自己，怎么定义前端？写页面是不是前端，写app的时候是不是前端，搭建项目的时候是不是前端？我想说这些都是，做前端，这些就是都要掌握。于是我又问那这些掌握的都怎么样，我最后给自己的回答是，每一个都不能算得上优秀，甚至大部分都在70-80分之间，写项目的时候需要查很多资料，百度，google，不断调试。没有一个我敢说我可以达到深刻理解，所掌握的也不过是转过几手的api而已。这不是长久之计，这样下去再停不几年，就废了。

我说了这么多，也算是吹了牛皮了，不知道我又没有说出重点，就是，人必须要有核心竞争力，不然什么也干不长远。

所以，我写这文章，只是想激励自己，不忘初心，走的更远。

# 这篇文章将会包括多少内容

这篇文章，会包括gulp的使用，webpack的深度分析和使用，以及对全新的打包工具的浅析。

# 不说什么

这篇文章不会介绍什么是打包工具，问什么需要打包工具，因为都9102年了，相比于8102，7102都过去一两千年了，更何况和文章本身内容无关的东西就不说了吧。

# 首先认识大明星-webpakc

webpack从诞生之日起，就靠着四个功能打天下，分别是：
- entry
    > 这是webpack处理文件的入口。

    entry有几个特点：
    - 某段代码的入口
        通过这个入口webpack能够知道这段代码依赖于谁，import和require的内容，webpakc能把他的依赖‘送给他’。
    - 打包的入口
        webpack通过这个入口就能知道，去哪个文件开始处理，使用那些依赖。
    - 单个或多个
        单个入口和多个入口的区别在于，单页面主要用到但入口，多页面主要用多入口。
    ```javascript
        /***
        * module.exports 是common的模块语法，webpack遵循这个语法。
        * entry 就是打包入口，这里的文件名称不是个定的格式，保证能找到这个文件就行。
        * entry也可以是一个数组，['index.js','vendor.js'];
        * entry也可以写成{index:'index.js'}的形式，这就相当于个文件加了别名，在打包的过程中可以继续识别这个文件。
        * 待续
        */
        module.exports ={
            entry: 'index.js'
        }
    ```
-----------
- output
    > 有入口就会有输出，在输出里能够规定其处理好的文件存放的位置和名称。

    output有几个对应于entry的功能:
    - 打包成文件bundle
    - 一个或多个
    - 自定义规则
    ```javascript
        /***
        * output是一个对象，拥有一个必须指定的filename
        */
        module.exports = {
            entry: 'index.js',
            output: {
                filename: 'index.min.js'
            }
        }
    ```
    ```javascript
        /***
        * 当entry是多入口的时候
        * output 就可以使用自定义规则
        * name就是entry中的文件名称，hash：5是指使用MD5方式对文件进行加密，生成一个版本号。
        */
        module.exports = {
            entry: {
                index: 'index.js',
                vendor: 'vendor.js'
            },
            output: {
                filename: '[name].min.[hash:5].js'
            }
        }
    ```
----------
- loaders
    > 有了loaders，webpack就获得了能够处理除了js的另外一些文件的的能力。这里可以理解为官方外挂。
    
    - 处理文件
    - 转化为模块（转化为js能够处理的module）
    ```javascript
        /***
        * module就是指对应生成一个模块可以被js使用。
        * rules就是处理每一个模块。
        * rules中每一个项对应处理一种文件的‘方法’，test是指文件的明明规则，use就是loaders。
        * 常见的loaders有：编译相关的loaders(babel-loader,ts-loader),样式相关的loaders(style-loader,css-loader,less-loader,postcss-loader),文件相关(file-loader,url-loader)
        */
        module.exports = {
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: 'css-loader'
                    }
                ]
            }
        }
    ```
----------
- plugins
    > 还有一些肯定是需要但是不在核心功能里面的一些不可少的功能，但又不能让自己看起来是个大胖子怎么办呢？就做成plugins吧，真棒！
    
    - 参与打包过程
    - 打包优化和压缩
    - 配置编译时的变量
    - webpack本身也是基于plugins来完成打包的
    ```javascript
        /***
        * 常用的插件有：优化相关(CommonsChunkPlugin,UglifyjsWebpackPlugin),功能相关(ExtractTextWebpackPlugin,HtmlWebpackPlugin,HotModuleReplacementPlugin,CopyWebpackPlugin)
        */
        const webpack = require('webpack');
        module.exports = {
            plugins: [
                new webpack.optimize.UglifyJsPlugin()
            ]
        }
    ```
## 使用webpack打包js
webpack的使用有两种方式，一种是使用命令行进行打包操作，一种是使用配置文件进行打包操作。
实际使用的时候我们可能会写各种各样的代码，其中不免会有规范的冲突，不可能每个团队使用的都是common或者是es6。不用担心，webpack能够处理各种各样的规范。
- es6
```javascript
    //app.js
    import sum from './sum';
    console.log(sum(1,2));
```

```javascript
    //sum.js
    export default function(m,n){
        return m+n;
    }
```
- common
```javascript
    //app.js
    var sum = require('sum');
    console.log(sum(1,2));
```

```javascript
    //sum.js
    module.exports = function(m,n){
        return m+n;
    }
```
这样两种方式的代码，都可以使用webpack打包。
```javascript
    // webpack.config.js
    module.exports = {
        entry: {
            app: 'app.js'
        },
        output: {
            filename: "[name].[hash:5].js"
        }
    }
```