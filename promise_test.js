/**
 * @see 今天我们看一道promise的延展题，
 * @see 问，如果有这么这里一个异步请求：[p1,p2,p3,p4,p5,p6],数组形式，分批两两去请求，如果执行p1请求，我们直接写成p1()
 * @see 先批量一起执行[p1,p2],但是如果有一个执行完了，另外一个顶上去,如
 *      在上述请求中【p1,p2】,p2先执行完，那么两两执行的会是【p1,p3】
 * @see 该如何实现这个方法呢？这里就需要数据结构来帮忙了
 * 思考：一次性只能同时请求两个，后面的只能排队了，第一想到的常规做法可能是利用数组递归i
 */

let urlArr = [p1, p2, p3, p4, p5];
/* 1. 常规解法：数组递归 */

// 在开始之前，我们先实现一个最简单的一个异步请求顺序执行如： 【p1,p2,p3】,条件：p1执行完之后执行p2,p2执行完之后，执行p3
// 而且不用管各个异步之间的关联，假设这个urlArr数组里面的异步都是没有关系的（不需要管是否需要拿之前的response作为接下来异步的请求）
function twoPromise(urlArr) {
  let p = Promise.resolve(); // 预先定义一个resoved状态的Promise对象
  for (let i = 0; i < urlArr.length; i++) {
    p.then(urlArr[i]);
  }
}
// 以上代码我们可以用reduce做简单的优化
function twoPromise(urlArr) {
  //  后续待检验
  // 很久没有用reduce了，我们再来回顾一下，reduce()的用法，
  // reduce(callback(),initValue) ;reduce()函数接收两个参数：
  // first: 一个回调函数callback(prev,curr);其中prev为累加器（姑且也可以认为为初始值），currr为当前值
  // second: 一个初始值initValue
  urlArr.reduce((prev, currt) => {
    return prev.then(currt);
  }, promise.resolve()); // promise.resolve为初始值，也是函数中prev的初始值
}

/**
 * @see 以上的是多个并发请求没有关联，如果是多个并发请求【p1,p2,p3】他们之间是拿到前一个请求的response作为参数然后做异步请求呢
 * @param {*} urlArr
 * @todo 明天再写了
 */

//
/* 巧用promise.race() */
function twoPromise(urlArr) {}

// 重新来理解一下promise的错误处理机制
var promise1 = new Promise((resolve, reject) => {
  console.log('Promise 构造器会立即执行');
  reject('失败');
  //   setTimeout(function() {
  //     if (true) {
  //       resolve('完成');
  //     } else {
  //       reject('失败');
  //     }
  //   }, 1000);
});

promise1
  .then(result => {
    // do something
    console.log(result);
    return 1;

    // return Promise.resolve(1);  // 返回一个决议为成功的 promise 实例
    // return Promise.reject("error");  // 返回一个决议为拒绝的 Promise 实例
  })
  .then(result => {
    // .then() 方法会返回一个 promise, 完成调用的参数为前一个 promise 的返回值或者决议值。
    // do other things
    console.log(result);
    throw new Error('错误'); // 抛出错误是隐式拒绝
  })
  .catch(error => {
    // 捕捉错误
    console.log('错误11' + error);
  })
  .then(() => {
    // 还能继续执行！
  })
  .finally(() => {
    // always do somethings
    console.log('finally!');
  });
