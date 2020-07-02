/**
 * @alias 今天面试官问了这么一个问题，就是我们日常的表格的排序问题
 */

// 假如有这么一个数组
var arr = [
  { name: "xxp", number: 12 },
  { name: "xxx", number: 113 },
  { name: "www", number: 2 }
];

// 进行排序，比如table的数据过滤，主要考察sort 函数

// 生成器函数   如何来理解生成器函数这几句话呢
function* funn1(x) {
  var y = yield x + 2;
  return y;
}
var g = funn1(2);
// 特别注意：函数生成器的写法，星号紧贴function，同时generator函数返回的指针对象 {value:yield表达式的结果值，done:布尔值，是否还有下一个阶段}
console.info(g.next()); // { value: 4, done: false }

// 我们再来熟悉一下  generator  函数  ； generator 函数不能自执行，但是我们平时用的dva  发送dispatch  它能自执行，这又是为什么呢？
/**
 * @name 先来了解一下thunk函数
 * @name 在计算机世界中，一直有个争论的焦点就是求值策略，即函数参数到底应该在何时求职
 * @alias 1.--传值调用--
 * @alias 2.--传名调用--
 * @description 传值调用比较简单，到是对参数求值的时候，实际上还没有用到这个参数，有可能造成性能损耗
 */

// thunk函数的定义
function f(m) {
  return m * 2;
}

f(x + 5);
//------> 等价于

var thunk = function() {
  // 这就是thunk的的定义了
  return x + 5;
};
function f(thunk) {
  return thunk() * 2;
}

// 接下来我们来讲讲非常经典的co模块
/**
 * @alias thunk函数可以实现generator的函数自执行，我们来看看co是怎么来实现
 */

function co(gen) {
  // v1.0返回一个promise
  var ctx = this;
  return new Promise(function(resolve, reject) {});
}
function co(gen) {
  var ctx = this;
  return new Promise(function(resolve, reject) {});
}

// 我们一般写并发请求的时候是这样写的
let [foo, bar] = await Promise.all(getFoo(), getBar());

// 问题1:假如小程序只支持6个并发，如何封装一个函数，让它免于这个限制？  ---》  石头科技面试题？

/**
 *
 * @param {*} urls
 * @name 在es6入门这本书中，有一下这个例子，如何来解释这里的是并发请求？
 */
// 问题：如何并发请求，同时依前后顺序输出结果
async function loginOrder(urls) {
  // 并发远程读取  url，这里有个很容易出错的问题，很有意思，灵魂之问：这里为啥是同步并发？
  // 贴一个链接：https://segmentfault.com/a/1190000020809964?utm_source=tag-newest    --》  async函数在map forEach 的应用

  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });
  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
