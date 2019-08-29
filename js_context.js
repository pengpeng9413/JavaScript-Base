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
  * @see 为啥还是undefined呢，常规的来讲，声明了就代表了定义了啊！敲黑板！！！---->在计算机科学中
  * @see undefined通常用于指示变量尚未赋值，而不是未定义，也不是什么未声明，这不仅仅适用于js
  * @see 总的来说，我们需要记住下面这个结论：变量提升是变量声明提升，undefined通常用于指示变量尚未赋值，记住这两句话就够了
  */

  /* 在js中 undefined出现的原因有以下： */
  1.变量被声明了但是没有赋值
  2.调用函数时，应该提供的参数没有提供，该参数为undefined
  3.函数没有返回值时，默认返回undefined
  4.对象没有赋值的属性
  /* 在此也一并介绍一下undefined的难兄难弟null吧，null表示一个无的对象 ,null出现的原因有以下*/
  1.作为函数的参数，表示该函数的参数不是对象
  2.作为对象原型链的终点

  /* 为了加强理解，我们再来看一下这个例子 */
    console.log(a);//undefined
    console.log(b);//error
    var a = 10;
   // 等价于
    var a;
    console.log(a);
    console.log(b);
    a = 10;

/**
  * 1. 函数提升 
  * */

 console.log(a);//function a(){}
 var a = 10;
 function a(){
 
 }
 console.log(a);//10           ---------------对于这里的结果你是不是很吃惊，yhh,其实我也是，来看看究竟怎么肥事
 //===============> 变量的声明虽然在函数声明之前，但是函数优先被编译，实际代码是
   function a(){

    }
    console.log(a);
    a = 10;
    console.log(a);
 // 注意：这里的实际代码中是a = 10而不是var a = 10;因为函数声明不仅优先被编译了，还覆盖掉剩余的同名变量的声明。

 /**
  * @see 以上，我们得出结论：
  * @see 1.js的变量和函数在编译阶段会被提升到当前作用域最前面编译
  * @see 2.函数是一等公民，优先编译函数，且会覆盖同名变量的声明
  * @see 所以我们之前的总结归纳是理论不正确的，正确的理解应该是以变量提升和函数提升机制来解释
  */

  /**
   * 经过以上的知识点的学习，相信我们应对面试题应该是没什么问题了，现在我们进入一个更加抽象的话题
   * @see context执行上下文
   */




