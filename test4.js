/**
 * @alias 今天面试官问了这么一个问题，就是我们日常的表哥的排序问题
 */

// 假如有这么一个数组
var arr=[{name:'xxp',number:12},{name:'xxx',number:113},{name:'www',number:2}]

// 进行排序，比如table的数据过滤，主要考察sort 函数

// 生成器函数   如何来理解生成器函数这几句话呢
function* funn1(x){
    var y=yield x+2
    return y
}
var g=funn1(2)
// 特别注意：函数生成器的写法，星号紧贴function，同时generator函数返回的指针对象 {value:yield表达式的结果值，done:布尔值，是否还有下一个阶段}
console.info(g.next()) // { value: 4, done: false }

// 我们再来熟悉一下  generator  函数  ； generator 函数不能自执行，但是我们平时用的dva  发送dispatch  它能自执行，这又是为什么呢？
/**
 * @name 先来了解一下thunk函数
 * @name 在计算机世界中，一直有个争论的焦点就是求值策略，即函数参数到底应该在何时求职
 * @alias 1.--传值调用--
 * @alias 2.--传名调用--
 * @description 传值调用比较简单，到是对参数求值的时候，实际上还没有用到这个参数，有可能造成性能损耗
 */

 // thunk函数的定义
 function f(m){
    return m*2
}

f(x+5)
//------> 等价于

var thunk=function(){  // 这就是thunk的的定义了
    return x+5
}
function f(thunk){
    return thunk()*2
}


// 问题1:假如小程序只支持6个并发，如何封装一个函数，让它免于这个限制？  ---》  石头科技之问？