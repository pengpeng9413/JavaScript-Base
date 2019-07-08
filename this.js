/**
 * 之前我们有学习过 节流和防抖  这之前的那篇中介绍过this ,这篇的话将更加细致的更加底层的来介绍  
 * js中 最隐晦的this ,知识水平有限，欢迎拍砖
 * 1. 首先我们来回答一个问题，为啥javascript会this这个玩意儿，这不是为难兄弟们么？
 *      
 *      
 */

 // 首先看看一个特别容易出错的题目
 function foo() {
    console.log(this.a);
  }
  
  var obj = {
    a: 2,
    foo: foo
  };
  
  var bar = obj.foo;  // 函数别名！
  var a = "oops, global"; // a是全局对象的属性
  bar();  //  "oops, global"