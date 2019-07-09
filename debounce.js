/**
 * 老哥们，好久不见，过了这么久才来继续更新自己的github，看着github的提交记录，没有了绿萌萌的一片 自己也看着心痛啊
 * 这节我们来梳理一下 防抖 (debounce)和 节流 （throttle）
 * 防抖节流的应用场景：
 *      窗口的resize、scroll、输入框内容校验等操作时，如果这些操作处理函数是较为复杂或页面频繁重渲染等操作时，
 *      在这种情况下如果事件触发的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕。
 *      此时我们可以采用debounce（防抖）和throttle（节流）的方式来减少触发的频率，同时又不影响实际效果。
 *      eg：搜索框的请求优化，输入搜索词条需要立即触发搜索请求时，防抖和节流可以将多个请求合并为一个请求
 * 场景解决思路：
 *  1.防抖 ： 简单来说就是防止抖动，当持续触发事件时，debounce 会合并事件且不会去触发事件，当一定时间内没有触发再这个事件时，才真正去触发事件
 *    原理：    你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，
 *             那我就以新的事件的时间为准，n 秒后才执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行，真是任性呐!
 *  2.节流 ： 当持续触发事件时，保证隔间时间触发一次事件，持续触发事件时，throttle 会合并一定时间内的事件，并在该时间结束时真正去触发一次事件
 */

// 先写个html文件
/*
 <!DOCTYPE html>
    <html lang="zh-cmn-Hans">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="IE=edge, chrome=1">
        <title>debounce</title>
        <style>
            #container{
                width: 100%; height: 200px; line-height: 200px; text-align: center; color: #fff; background-color: #444; font-size: 30px;
            }
        </style>
    </head>

    <body>
        <div id="container"></div>
        <script src="debounce.js"></script>
    </body>

</html>
// debounce.js 文件的代码如下：

    var count = 1;
    var container = document.getElementById('container');

    function getUserAction() {
        container.innerHTML = count++;
    };
    // 我们注意这里的写法
    container.onmousemove = getUserAction;
*/
// 第一版  防抖  根据防抖的原理描述，
function debounce(func, wait) {
  var timeout;
  return function() {
    // 执行到这里的时候this指向container，即  <div id="container"></div>
    clearTimeout(timeout);
    // func 作为函数调用，this此时指向windows
    timeout = setTimeout(func, wait);
  };
}
// 如果我们要使用它，以上面的html为例，
container.onmousemove = debounce(getUserAction, 1000); // 现在随你怎么移动，反正你移动完 1000ms 内不再触发，我才执行事件。

// 我们接着来完善他，上面这版，
// 如果我们在 getUserAction 函数中 console.log(this)，在不使用 debounce 函数的时候，this 的值为：<div id="container"></div>
// 但是如果使用我们的 debounce 函数，函数里面的函数的 this 就会指向 Window 对象！然而这不是我们所想要的====重点

// 第二版
function debounce(func, wait) {
  var timeout;
  return function() {
    // 没错，这里又遇到了this,真是一件让人兴奋的事，是的，让我们仔细体会一下我刚才上面说的重点，我们会在下面再次复习一下this,因为this的指向太重要了
    // 作为一个前端人 ，必须毫不含糊的掌握
    var context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context); // 回顾一下  apply传的是数组
    }, wait);
  };
}
/**
 *  this 回温，
 *  问题：this 在内部函数中，如何来判断this的指向 ？
 *  一个常见的陷阱是理所应当的认为函数调用中的，内部函数中 this 等同于它的外部函数中的 this。
 *  答案是 nope
 *  正确的理解是内部函数的上下文环境取决于调用环境，准确的来说，是执行的时候确定的，而不是外部函数的上下文环境，跟外部函数没有绝对的关系
 *
 *
 */
// eg ： 我们来看这么一个例子：
var numbers = {
  numberA: 5,
  numberB: 10,
  sum: function() {
    console.log(this === numbers); // => true
    function calculate() {
      // 严格模式下， this 是 window or undefined
      console.log(this === numbers); // => false
      return this.numberA + this.numberB;
    }
    return calculate();
  }
};
numbers.sum(); // => 严格模式下，结果为 NaN 或者 throws TypeError

// 上面这个例子是我们经常容易犯的，
/*
    numbers.sum() 是对象内的一个方法调用，因此 sum 的上下文是 numbers 对象，
    而 calculate 函数定义在 sum 函数内，所以会误以为在 calculate 内 this 也指向的是 numbers。
    然而 calculate() 在函数调用（而不是作为方法调用）时，此时的 this 指向的是全局对象 window 或者在严格模式下指向 undefined ，
    即使外部函数 sum 拥有 numbers对象作上下文环境，它也没有办法影响到内部的 this。
    numbers.sum() 调用的结果是 NaN 或者在严格模式下直接抛出错误 TypeError: Cannot read property 'numberA' of undefined，
    而绝非期待的结果 5 + 10 = 15，造成这样的原因是 calculate 并没有正确的被调用。
    为了解决这个问题，正确的方法是使 calculate 函数被调用时的上下文同 sum 调用时一样，
    为了得到属性 numberA 和 numberB，其中一种办法是使用 .call(),apply()  方法，改变this的指向。
*/
// this  修正后版本
var numbers = {
  numberA: 5,
  numberB: 10,
  sum: function() {
    console.log(this === numbers); // => true
    function calculate() {
      console.log(this === numbers); // => true
      return this.numberA + this.numberB;
    }
    // 使用 .call() 方法修改上下文环境
    return calculate.call(this);
  }
};
numbers.sum(); // => 15

// 说到这里，我们来亲自验证一下，这里注释以及理论的正确性，得知此事要躬行，测试再test2.html上进行

// this的指向正确了，我们接着继续往下看
/**
 * 1. event 对象
 * 如果我们不使用debouce，那么以下会打印MouseEvent 对象，
 * 但是在我们实现的 debounce 函数中，却只会打印 undefined!
 */
function getUserAction(e) {
  console.log(e);
  container.innerHTML = count++;
}
// 所以我们需要修改一下代码
function decounce(func, wait) {
  var timeout; // 定义一个定时器
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timeout); // 清除定时器，因为触发了，保证重新计时
    timeout = setTimeout(function() {
      func.bind(context, args);
    }, wait);
  };
}

//===============到此为止，我们解决了两个问题   this 指向  ;   event 对象  , 以上的代码其实已经比较完善了
// 现在有这么一个需求 ：我不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
/**
 * 我们接着来完善
 */
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
// 第五版
function debounce(func, wait, immediate) {
  var timeout, result;

  return function() {
    var context = this;
    var args = arguments;
    // 如果定时器存在，清除定时器
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行，timeout肯定不为false
      var callNow = !timeout;
      // 定时器 timeout
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
    // 不管怎样，都要返回result,保证程序的健壮
    return result;
  };
}
// 是不是已经觉得很完善了，其实我们还是有继续优化的空间的，这个后续有时间再来补充
/**
 * 中间插播一下关于settimeout和cleartimeout  的使用
 * js中可以通过setTimeout函数设置定时器，让指定的代码在指定的时间运动. 如果我们希望在setTimeout之行前终止其运行就可以使用clearTimeout()。
 * 我们跟setinterval 来比较一下
 * setInterval() ：按照指定的周期（以毫秒计）来调用函数或计算表达式。方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
 * 一个调用一次，一个循环调用，之前没有系统的梳理这块的内容，趁机整理一下
 */
