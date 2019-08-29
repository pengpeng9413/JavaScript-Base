/**
 * @see 老生常谈，这节我们重新回过头再来看看js一些最基础的东西，执行上下文：context
 * @see  先来看下面这一道题
 * 
 */
var name='jack'
function isName(){
    console.log(name)  // undefined
    var name='xxp'
    console.log('name') // xxp
}
isName() // 输出啥？   对以上的输出结果会感到疑惑么？

/**
 * 在解决以上疑惑之前，我们先来介绍几个概念：
 * @see 1.作用域：指程序源代码中定义变量的区域，作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限
 *         javascript采用词法作用域，也就是下面会讲到的静态作用域 
 * @see 2.静态作用域：函数的作用域在函数定义的时候就决定了（JavaScript 采用的是词法作用域，即静态作用域）
 * @see 3.动态作用域：函数的作用域在函数调用的时候才决定
 * 为了更好的解释上面这两个概念,我们继续回到上面的例子
 */

 // ===1.0
var name='jack'
function change(){
    console.log(name)
}
change()

// 结果是？？？  答案是 ： jack
//====2.0====那么如果在这个函数的基础之上，我们改进一下==========
var name='jack'
function change(){
    console.log(name)
    var name='xxp'
}
change()

// 结果是？？？  答案是 ： undefined  ，
// ===3.0===我们在来变通一下
function change(){
    console.log(name)
}
change()
// 结果是？？？  答案是：抛错了

// ===4.0===我们再来变通一下
function change(){
    console.log(name)
}
change()
var name='jack'
// 结果是？？？ 答案是： undefined

//很神奇有木有?，很想知道答案有木有？很想搞清楚到底是怎么肥事有木有？
// ==========彭彭哥带你一探究竟！！

/**
 * @释一下上面的执行逻辑
 * @see 执行change()函数，js会先从change()函数内部查找是否有局部变量，
 * @see 如果没有，就根据书写的位置，查找上一层代码，于是在1.0中我们得到的答案是‘jack’,注意这里的描述，会向上查找！！这很关键
 * @see 因为我们在4.0中，外层代码也是有name的定义的，但是它不在change()函数的上层！因为只会向上查找。当然这只是我们从答案到自己总结的结论
 * @see 这里给出的结论的不一定对，只是归纳的，下面我们会对这其中涉及的知识点一个一个的展开讲！
 * 
 */


 /**
  * 1. 变量提升 
  * */
 console.log(a); // undefined
 var a='hi';
 console.log(a) // hi
 // -----以上写法等价于-----
 var a;
 console.log(a);  // undefined
 a='hi'
 console.log(a) // hi

 /**
  * @see 以前其实自己是有误区的，认为变量提升就是讲变量赋值放到作用域最顶上，这其实是错误的
  * @see 真正的变量提升的含义是：敲黑板！！----->变量声明会被提升到作用域最顶上,注意是声明不是赋值
  * @see 另外一个需要准确理解的是在js中，什么情况会出现undefined！！，undefined英文本意为未定义，但是你可能会奇怪，我变量声明了啊，
  * @see 为啥还是undefined呢，常规的来讲，声明了就代表了定义了啊！敲黑板！！！---->
  */
