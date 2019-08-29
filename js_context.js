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
 */