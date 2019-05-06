/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-30 09:23:16
 * @LastEditTime: 2019-05-06 16:48:27
 */
class MyClassroom {
    constructor(number) {
      this.number = 60;
      console.info(11)
    }
    // 定义类的静态方法
    static get1() {
      return this.number; 
      // 静态方法包含的this关键字，这个this指的是类，而不是实例
    }
     static get2() {
      return 80;
    }
  }
  
  console.log(MyClassroom.get1()); // undefined

  MyClassroom.number = 50;  //  定义静态属性
  console.log(MyClassroom.get1()); // 50

  console.log(MyClassroom.get2()); // 80
  
  var classroom = new MyClassroom();
  console.log(classroom.get1()); // undefined

  // es5中构造函数
  function pointA(){
    this.age=12;
    this.year=2019;
  }
  // 给类定义方法，这里涉及原型prototype,后续带来叙述与原型的关系到底是咋样的
  pointA.prototype.toDo=function(){
    return this.age+"我是你爸爸"
  }
  const b=new pointA()
  console.info(b.toDo())

  //===============重点看一点es6的class中的类============
  class pointA {
    // 构造函数
    constructor(name){
      this.name='周海英';
      this.state={    // 实例属性,在es7中，我们可以直接把实例属性写在最外层，可以不用写constructor,这样也就更简洁，但是要babel转义
        age:12,
        year:2019
      }
    }
    // 实例方法
    todo1(){
      console.info(this.state.age+'我是你爸爸')
    }
    todo2(){
      console.info(this.state.year+'我是你爸爸')

    }
    // 类的静态方法,类自身的方法
    static selfFun1(){
        //console.info(this.name)
        return this.name
      }
    static selfFun2(){
        console.info(this.name)
    }
  }
//  定义类的静态属性
pointA.name='谢秀鹏'
pointA.age='24'

console.log(pointA.selfFun1())

const B=new pointA()


// ===================promise==================
var  promise=new promise(function(reslove,reject){
  if("异步操作成功"){
    reslove(value)
  }else{
    reject(value)
  }

})
//   常用的promise结构就是这样的，promise对象是一个构造函数，用来生成promise实例；
//   一单新建，就会立即执行，无法取消；它接受一个函数作为参数，其中这个函数包含两个参数
// 1:  resolve 2:    reject
// 这两个参数由js引擎提供，不用部署，
// 同时这两个参数也是函数，作为异步操作的回调，
// 其中reslove是异步操作成功时调用，将异步操作结果作为参数传递出去，reject则是异步操作失败调用，将结果作为参数传递出去

//===当promise实例生成后，我们可以用then方法来分别指定 resolved状态 和  rejected状态的回调函数，紧跟上面上面，如下
promise.then(function(value){

},function(value){

})
//  then  方法接收两个函数，第一个函数是promise对象变为 resolved时调用
//  第二个函数为  rejected   时调用
//  这两个函数都接收promise对象传出来的值作为参数  ，即代码里的value,其中第二个参数是可选的



//=====接下来，我们会在讲promise中穿插讲一下fetch  ，为什么讲fetch呢，以为之前用antd pro  用的就是fetch
//===== Fetch API 是基于 Promise 设计
//   Promise<Response> fetch(input[, init]);

// fetch  返回一个promise对象，resolve 时回传 Response 对象
fetch(url)
//  第一次then
.then(function(response) {  
  return response.json();
})
// 第二次then
.then(function(data) {
  console.log(data);
}).catch(function(e) {
  //  处理fetch(url) 和 前两个回调函数运行时发生的错误
  //  处理前面三个promise 返回的错误
    console.log("Oops, error");
});

// 我们刚到好奇，上述代码用到了两次then,第一次很好理解，以为fetch之后，它返回是一个promise对象，而promise对象是有这个then方法的，
// 那后面为啥还可以then  呢，  唯一的解释就是  then   方法返回的也是一个 promise  对象。这是一个新的promise对象，不是最开始的promise实例
//  因此可以采用链式写法，真是太妙了有木有

// =======promise.prototype.catch===============
// 相信我们日常的开发过程中我们也常看见利用catch来捕获错误，让我们来真正认识一个  我们的老朋友   catch
// Promise.prototype.catch()  是 .then(null,reject) 的别名，用于指定发生错误时的回调函数



// 我们再来看一下一段代码
 const promise=new promise(function(resolve,reject){
  resolve('ok')
  throw  new Error('我是错误的')
 })
 promise.then(function(value){
    console.log(value)
 }).catch(function(error){
    console.log(error)
 })

 // ok
//  这段代码很有意思，现在梳理下来发现，这不就是面试题么，现在觉得他们好公司不要我，确实自己js基础太渣
//  promise  实例传入的函数，函数中执行了 resolve('ok') 说明promise状态已经确定，promise状态一但确定，就会永远保持该状态
//  不会再改变了，后面跑出的错误并不会被捕获到，所以答案输出是  “ok”

// promise的对象具有冒泡的性质，会一直向后传递，直到被捕获为止，也就是说，错误总会被下一个catch语句捕获
// 我们直接拿书上的例子来说明一下情况
  getJson('post/1.json').then(function (params1) {
    // some code
  }).then(function (params2) {
    // some code
  }).catch(function (err) {
    // 处理前面的三个promise产生的错误
  })
   // 上述代码总共有三个promise.一个由getjson产生，两个由then产生，其中任何一个抛出的错误都会被最后一个catch捕获到
   // 需要注意的是，这里的catch方法返回的也是一个promise对象，因此后面可以接着调用then的方法。

   //=================这里我们介绍一下promise.resolve()方法，简单理解为这个方法可以转为一个promise对象，=====
   //  先来看一下一个例子
   const p=Promise.resolve('hello')
   p.then(function (params) {
     console.log(params)
   })
   // hello   
   // 我们发现它打印的是   hello   ;  这时，resolve的参数会传给promise的回调函数，即params的值

   //  说到这里，我们再来聊一下，event  loop   事件循环机制，看下面这个例子
   setTimeout(function () {
     console.log(11)
   },1000)
  Promise.resolve().then(function (params) { // Promise.resolve() 这里得到一个promise对象
    console.log(22)
  })
   console.log(33)

  //  最后输出的是
  //  33
  //  22
  //  11

  // 其实之前对事件循环机制，自我觉得还理解的还行，今天看完这个promise，尤其看到阮一峰中提到的Promise.resolve()中在事件循环中是在本轮
  // 事件循环中结束时执行的，而setTimeout是在下一轮事件循环开始时执行的。这两句话值得我们非常仔细的品味
  // 上述的这个例子，我觉得我理解的有失偏颇了，之前我还没有真正理解 
  //  event loop
  // 到底是怎么回事
  // 


//   我们进入正题，除了广义的同步任务和异步任务，我们对任务有更精细的定义：

// macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
// micro-task(微任务)：Promise，process.nextTick


// 其实这里我们重点需要注意上面所描述的：包括整体代码srcipt是属于宏任务的

// 然后我们来描述这段代码在浏览器中究竟发生了什么事



// 这段代码作为宏任务，进入主线程。
// 先遇到setTimeout，那么将其回调函数注册后分发到宏任务Event Queue。(注册过程与上同，下文不再描述)
// 接下来遇到了Promise，new Promise立即执行，then函数分发到微任务Event Queue。
// 遇到console.log()，立即执行。
// 好啦，整体代码script作为第一个宏任务执行结束，看看有哪些微任务？我们发现了then在微任务Event Queue里面，执行。
// ok，第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务Event Queue开始。我们发现了宏任务Event Queue中setTimeout对应的回调函数，立即执行。
// 结束。

// 限于时间原因，这里有两篇参考文献：
// 1.https://www.yuque.com/dundun/issue/zm3ft6
// 2.https://juejin.im/post/59e85eebf265da430d571f89

// 相信这两篇文章能让你对js的事件循环更加的了解

// 我们继续阅读阮一峰的es6中promise的部分，书中提到了一个done()的方法，其实书中并没有详细的说明为啥这个我们部署的方法总是可以捕捉到错误
// 我们还原一下这个自己在Promise部署的方法
Promise.prototype.done(function(fullied,rejected){
  this.then(onFullied,onRected)
      .catch(function (params) {
        // 抛出一个全局的错误
        setTimeout(()=>{throw params},1000)
      })
})

// 读到这里的时候我就在想为啥这里方法可以抛出全局错误，因为调用链尾端不一定能捕获错误，这里我的理解其实是利用了js的事件循环机制来实现的，
// 我们往回看之前我们温习的js事件循环机制，setTimeout是在下一个循环开始时执行的，所以他能在下一轮的loop中能捕获前一轮promise中产生的错误
// 如果读者认为我理解的不对，欢迎拍砖。

// 我们再来看一下Promise.finally()是怎么实现的,finally()接收一个回调函数作为参数
// 这个函数的作用是不管promise的状态是啥，都会执行的一个回调，这样就不用在catch和then中都写一遍了
// 我们来看看他的原生实现

 Promise.prototype.finally=function (callback) { // 这里的callback  其实就是指的是回调函数
   let p=this.constructor
   return this.then(
     value=>p.reslove(callback()).then((()=>value)),
     reason=>p.reslove(callback()).then((()=>{throw reason}))  
   )
 }
 
const w=new Promise()

w.finally(function () {7
  console.info('我是魔鬼')
})
// 到这里，没看懂阮老师的promise.finally的方法是怎么实现的，正在求助中

// 来，我们继续，之前我们说到上面没怎么看懂，其实我不懂的是传入的callback()是什么时候执行，没办法，事件循环搞得我必须弄清楚，某段代码的执行顺序是啥，洁癖。
// 昨天问了京东的前端小姐姐，其实她说的我是知道的，到此我们翻篇吧。

// 我们继续阅读阮老师的promise，统一处理异步和同步的处理流程
//======Promise.try()=====
Promise.try(database.user.get({id:userid}))
.then(...)
.catch(...)
// 事实上，Promise.try是模拟了try代码块，就想promoise.catch模拟catch代码块一样



