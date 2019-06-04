//===============今天我们来学习一下类数组，最典型的你应该知道是  arguments ====
// 我们先来看一下类数组的定义
拥有一个length属性和若干索引属性的对象
// 举个例子
var likeArray={
    1:'name',
    2:'age',
    3:'sex',
    length:3
}
// 类数组调用数组的方法，我们可以利用Function.prototype.call来实现数组的方法
Function.prototype.join.call(likeArray,'&') // 输出 name&age&sex

Function.prototype.slice.call(likeArray,0)//  ["name", "age", "sex"] 

// 下面再多介绍一些类数组转数组的方法
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
// 1. slice
Array.prototype.slice.call(likeArray); // ["name", "age", "sex"] 
// 2. splice
Array.prototype.splice.call(likeArray, 0); // ["name", "age", "sex"] 
// 3. ES6 Array.from
Array.from(likeArray); // ["name", "age", "sex"] 
// 4. apply
Array.prototype.concat.apply([], likeArray)

//========常见的类数组：字符串，获取的dom节点document.getElementsByTagName()，arguments对象
//=====接下来我们主要介绍一下arguments对象=====
// Arguments 对象只定义在函数体中，包括了函数的参数和其他属性。在函数体中，arguments 指代该函数的 Arguments 对象。
function foo(name, age, sex) {
    console.log(arguments);
}

foo('name', 'age', 'sex')

// 这段代码在浏览器上打印会有一个callee属性  callee: ƒ foo(name, age, sex)，当然其他属性我们会一一介绍，但是我们重点介绍一下callee属性
// 1.length 属性
// Arguments对象的length属性，表示实参的长度，举个例子：
function foo(b, c, d){
    console.log("实参的长度为：" + arguments.length)
}

console.log("形参的长度为：" + foo.length)

foo(1)

// 形参的长度为：3
// 实参的长度为：1

// 2.callee属性 ,Arguments 对象的 callee 属性，通过它可以调用函数自身。
// 以下是经典闭包面试题使用callee的解决方法，非严格模式下

var data=[]
for(var i=0;i<3;i++){
    (data[i]=function(){
        console.log(arguments.callee.i) // 调用自身 
    }).i=i   // 函数也是一种对象，我们可以通过这种方式给函数添加一个自定义的属性
  //  上面这段代码相当于
    //  data[i] = function () { console.log(arguments.callee.i)
    //  data[i].i = i;
    //  其实是 (...).i = i 给函数添加了 i 属性，然后通过 arguments.callee.i 获取了这个属性值,因为arguments.callee其实就代表了这个函数
}

data[0]()  // 0
data[1]()  // 1
data[2]()  // 2

// 我第一开始看到这个，什么，js还有这种写法么，不着急，我们慢慢来一句一句看
// 我们先拆开这段代码来看
// data[i] 其实就是个函数，data[o]()相当于执行这个函数
// 即相当于 
(function(){
    console.log(arguments.callee.i) // 调用自身 
})()
// 解开迷雾之前，我们先看看arguments和函数绑定参数的关系
function foo(name, age, sex, hobbit) {

    console.log(name, arguments[0]); // name name

    // 改变形参
    name = 'new name';

    console.log(name, arguments[0]); // new name new name

    // 改变arguments
    arguments[1] = 'new age';

    console.log(age, arguments[1]); // new age new age

    // 测试未传入的是否会绑定
    console.log(sex); // undefined

    sex = 'new sex';

    console.log(sex, arguments[2]); // new sex undefined

    arguments[3] = 'new hobbit';

    console.log(hobbit, arguments[3]); // undefined new hobbit

}

foo('name', 'age')

// 传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享
// 除此之外，以上是在非严格模式下，如果是在严格模式下，实参和 arguments 是不会共享的。

//======传递参数
// 使用 apply 将 foo 的参数传递给 bar
function foo() {
    bar.apply(this, arguments);
}
function bar(a, b, c) {
   console.log(a, b, c);
}

foo(1, 2, 3)

// 应用es6的...扩展运算符，我们可以轻松的把类数组转化数组的形势
function func(...arguments) {
    console.log(arguments); // [1, 2, 3]
}

func(1, 2, 3);


//  arguments的应用有很多，只要有以下几个

// 参数不定长
// 函数柯里化
// 递归调用
// 函数重载...





