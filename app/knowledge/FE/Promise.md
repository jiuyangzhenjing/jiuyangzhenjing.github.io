# promise专题

## promise 是什么
> 虽然promise的概念已经满天飞了，可是我们很多前端的小伙伴可能还没有真正了解过它呢。所以，还是要啰嗦一句介绍一下什么是promise。

promise 中文释义是‘承诺’的意思，这和它实际上在程序中的意思是相通的。
在实际运用中，通常这样定义它：
- Promise 对象用于异步计算。
- 一个 Promise 表示一个现在将来或者永远不可能用的值。
好像还是有点抽象，我们可以简单的这么理解：**promise是主要用于异步计算，可以将异步操作队列化，按照期望顺序执行，返回符合预期的结果。在实际运用中可以再对象之间传递和操作promise,帮助我们处理队列。**

## 为什么需要promise
> 我们都知道js的出现是为了检查表单而生的，他的最初的实现方式就是操作DOM。用于动态
更改表单和发送请求，能够实现这种功能的原因就是js中这些操作都是异步的。

在浏览器中，异步操作主要以事件为主，回调主要用在Ajax和FileAPI中，这时问题还不凸显。后来的事情就很微妙了，Node的横空出世，打响了无阻赛和高并发的招牌，这是一把双刃剑，这个特点使得node有了很高的性能，但是带来了回调的可怕。想想一下嵌套了几十层的回调是个什么样子的。
所以，为了解决这个问题，promise就出现了。
```javascript
    new promise(
        // 执行器 executor
        function(resolve,reject){
        // 一段耗时的操作
        resolve();// 数据处理完成时调用
        reject();// 数据处理出错时调用
    }).then(function resolve(){
        // 在执行器中调用的resolve
    },function reject(){
        // 在执行器中调用的reject
    });
```
## 初识promise
promise有三种状态，分别是
- pending 待定状态
- fulfilled 实现状态，操作成功
- rejected 操作失败
将上面的例子当做一个公式，我们可以这样套：
```javascript
    console.log("套公式");
    new promise(function(resolve,reject){
        setTimeout(function(){
            resolve("很好");
        },2000);
    }).then(msg => {
        console.log(msg);
    });
    // 打印“套公式”和“很好”
```
还可以将这个例子写得多复杂一点
```javascript
    console.log("套公式");
    new promise(function(resolve,reject){
        setTimeout(function(){
            resolve("很好");
        },200);
    }).then(msg => {
        console.log(msg);
        return new promise(function(resolve,reject){
         setTimeout(function(){
             resolve("很好很棒");
         },200);
        });
    }).then(msg => {
        console.log(msg);
    });
```
如果这就是promise的话好像没有太多的吸引力,其实我们不需要立即调用，只要我们声明了一个promise，我们可以再任何地方调用；
```javascript
    var promise = new promise(function(resolve,reject){
        setTimeout(function(){
            resolve();
        },200);
    });

    console.log("套公式");

    setTimeout(function(){
        promise.then(msg => {
            console.log(msg);
        });
    },200);
```
当我们在一个promise里面不直接返回一个promise的时候，是调用不到的。
```javascript
    new promise(function(resolve,reject){
        resolve("很好");
    }).then(msg => {
        console.log(msg);
        (function(){
            return new promise(resolve => {
                setTimeout(function(){
                    console.log("很好");
                    resolve("很好");
                });
            });
        }());
    }).then(msg => {
        console.log(msg);
    });
    // 输出 “很好”,undefined,"很好"
```
## .then
1. .then 接受两个函数作为参数，分别代表fulfilled和rejected。
2. .then 返回一个新的 promise 实例，所以它可以链式调用。
3. 当前面的promise状态改变时，.then根据其最终状态，选择特定的状态响应函数执行。
4. 状态响应函数可以返回新的promise或者其他值。
5. 如果返回新的promise,那么下一级的.then会在新的promise状态改变后执行。
6. 如果返回的是任何其他值，就会立即执行.then
------------------------------------
.then 里面仍然有.then
因为.then返回的还是promise实例，所以会等待里层的.then执行完毕在执行外面的.then。

## 错误处理
promise会自动捕捉内部错误返回给rejected;如果我们没有定义rejected，错误会被抛出，最终会被catch处理。