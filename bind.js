

//      专题
// ===================原生实现 call，apply,bind========================
// mdn 对call  fun.call(thisArg[, arg1[, arg2[, ...]]])  对call是这么定义的

/* 
  call  是改变this 指向的，第一个对象是this指向的对象
 */
var foo={
    value:1
}
function bar(){
    console.log(this.value)
}

bar.call(foo)

//  1.call  改变了this的指向，
//  2.同时执行了bar方法

// 我们改造一下这个函数  
var foo={
    value:1,
    bar:()=>{
        console.log(this.value)
    }
}
foo.bar()
// 这个时候 this 就指向了 foo，是不是很简单呢？

//但是这样却给 foo 对象本身添加了一个属性，这可不行呐！

//不过也不用担心，我们用 delete 再删除它不就好了~

/* 所以我们的思路是：
先将函数设为对象的属性
执行该函数
删除该函数 */
/* 
第一步
foo.fn = bar
第二步
foo.fn()
第三步
delete foo.fn 
*/
// fn 是对象的属性名，反正最后也要删除它，所以起成什么都无所谓
///=============第一版========
Function.prototype.call2=function(context){
    // 首先要获取调用call的函数，用this可以获取
    console.log(context)
    console.log(this)   // this 是指当前函数中正在执行的上下文环境  ,这里指的就是bar
    console.log(1)

    context.fn = this;  // 把bar函数作为context的一个属性fn
   
    context.fn();  // 执行

    delete context.fn; // 从这个对象上删掉这个函数，本身这个属性也是自己手动添加进来的，最后还是需要把它删了，还原
}
// 测试一下
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call2(foo); // 1      完美实现了


//   走到这步，貌似好像实现了call的功能欸，但是call 的一个特变就是，除了改变this指向问题，还能传参，怎么做到通配呢

var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call(foo, 'kevin', 18);

//   但是这里的动态参数如何来处理呢，我们需要借助  Arguments 对象，取出第二个到最后一个参数，然后放到一个数组里面
//   以上例子为例,此时的arguments为
arguments={
    0:value,
    1:name,
    2:age,
    length:3
}
//  arguments  是类数组，具有length的属性
var  args=[]
for (var i=1;i<arguments.length;i++){  // 这里i=1是去取第二个参数开始，第一个是this指向的对象，不是参数
    args.push('argument['+i+']')
}
// 执行后 args为 ["arguments[1]", "arguments[2]", "arguments[3]"]
// 不定长的参数问题解决了，我们接着要把这个参数数组放到要执行的函数的参数里面去

//  我们再来回到之前咱们写的第一版的call的实现

//==========================最完整的一版=====================
Function.prototype.call2=function(context){
    console.log(context) 
    console.log(arguments) 

    var context = context || window;  // this 参数可以传 null，当为 null 的时候，视为指向 window
    context.fn=this   
    // 谁调用指向谁，bar调用，this指向bar   [Function bar]
    // 接下来我们需要将后面的参数解析出来，传进fn中
    var  args=[]
    for (var i=1;i<arguments.length;i++){  // 这里i=1是去取第二个参数开始，第一个是this指向的对象，不是参数
        args.push('arguments['+i+']')
    }
    // 执行后 args为 ["arguments[1]", "arguments[2]", "arguments[3]"]  这一步还没有得到值，只是完成了字符串拼接
    var  result=eval('context.fn(' + args +')'); // Array.toString()  这里 args 会自动调用 Array.toString() 这个方法。
    // 在执行了eval()时，他会首先把数组转成字符串，然后把eval()里面的内容当做执行语句，这时候arguments[2]  才会真正从arguments中取出
    // eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。
    // 来说eval eval方法接收字符串作为脚本来执行。也就是说，
    // 如果接收的参数不是字符串，会强转为字符串。这也就是为啥他会自动调用Array.toString()方法
    // context.fn(args.toString())
    delete context.fn
    return   result
}

var foo={
    value:1
}

function bar(name,age){
    console.log(this.value)
    console.log(name)
    console.log(age)
}

 bar.call2(foo,'协修彭',118)

//======================apply的实现=============
Function.prototype.apply2=function(context){
    context.fn=this
   
    // 接下来解决这个不定长的参数问题，而且apply传的是数组
    //console.info(arguments[1]) // 后面传的数组参数
    var  arg=[]
    for(var i=0;i<arguments[1].length;i++){
        arg.push("arguments[1]["+i+"]")  // 同理，我们只转化成字符串，此时我们不解析出来
    }
    var result=eval("context.fn("+arg+")")
     // 执行这个函数
    delete context.fn  // 删除这个属性（函数）
    return  result

}
// ========================由于apply其实内部也是展开了传入的数组===================
// 在新的es6中，我们经常用扩展运算符...来结构数组，使之扁平化
// 或者在apply的实现上，我们可以不用for循环，只用扩展运算符，或者用slice(1)来截取数组再转成字符串参数
var foo={
    value:2
}

function bar(name,age){ 
    console.info(this.value)
    console.info(name)
    console.info(age)
}

bar.apply2(foo,['xiexiupeng',12])

//  ===============================bind的原生实现===================
// 这里简要介绍一下bind和call  ,apply的区别，call和apply只是后面传递的参数形势不同，一个是参数列表，一个是数组的形势
// 但是bind() 是返回一个新的函数，并且需要调用才会执行，不会像call和apply一样立即执行
// 这里插入一下 ，之前我们了解过原型链和原型，构造函数之间的关系，现在我们来深入的了解一下instanceof
// instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。
// 在mdn中他是这么定义的：object instanceof constructor   其中object 为要检测的对象，constructor为某个构造函数
// instanceof 运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置 



function Person() {

}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true  构造函数的prototype属性是否出现在对象的原型链中的任何位置 
console.log(Person === Person.prototype.constructor); // true   上述我们已经讲清楚了三者之间的关系
console.log(person instanceof Person)

// 现在想想难怪面试的时候必考bind的原生实现，原来涉及到那么多知识点
// 我们知道返回新的一个函数，我们有多种方式，可以直接在后面加上()上调用即可
// 但是我们也可以new()一下，然后再来调用，那么这样会对我们我们实现bind有什么影响呢？先保留悬念，我们先来看一下new（）发生了什么
// 这个也是面试必考的知识点
// 我们先来回忆一下，new（）中到底发生了什么，或者new()实现了那些功能
// 1.访问到构造函数的属性
// 2.访问到构造函数的原型属性

// 我们来模拟实现new() 的功能
function Otaku () {
    // ....
}

// 使用 new
var person = new Otaku();
// 使用 objectFactory
var person = objectFactory(Otaku)
//=========第一版=======
function objectFactory(){
    var obj=new Object() // 创建一个新的对象
    Constructor =[].shift.call(arguments)  //  取出arguments 中的第一个参数,就是我们传入的构造函数
    // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
    obj.__proto__=Constructor.prototype // 构造函数的protptype指向obj的_proto_  ,使obj可以继承Constructor的属性
    Constructor.apply(obj,arguments)  // 改变this指向，同时可以传入其他参数，arguments为相当于new(arg)中的arg
    return obj  // 返回这个obj
}
// =======第二版======
// 在一版我们会发现，其实我们并不确定他是返回的什么，有可能是新创建的这个对象的本身，也有可能是执行构造函数返回的字符串抑或是其他
// 这里我们就要做个判断了 ，如果是结果是对象的话，就返回这个新创建的对象，如果不是的话，返回结果本身就好了
function objectFactory(){
    var obj=new Object() // 创建一个新的对象
    Constructor =[].shift.call(arguments)  //  取出arguments 中的第一个参数,就是我们传入的构造函数
    // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
    obj.__proto__=Constructor.prototype // 构造函数的protptype指向obj的_proto_  ,使obj可以继承Constructor的属性
    var ret = Constructor.apply(obj,arguments)  // 改变this指向，同时可以传入其他参数，arguments为相当于new(arg)中的arg
    return ret ==='Object'?obj: ret // 返回这个obj
}

//  以上就是new()的过程发生的一切，我们再来看一下bind的实现

//  妈呀，bind的实现怎么那么多的知识点，感觉需要理解很多东西


//  我们要解决一下几个事情
//  1.解决改变this指向的问题
//  2.解决不定长参数传递问题，
//  3.解决new之后，this绑定失效的问题

//  我们先来看一下第一版
Function.prototype.bind2=function(context){  
    // 其实之前一直对这个context理解不了，为啥取context,我们可以理解为执行上下文，即this对象
    //  从js传参的角度来说也是一样的，context代表的是第一个参数对象，即绑定的this对象
    var self=this  // 谁调用this指向谁，此处为bar
    // 返回一个函数
    return function(){
        return  self.apply(context)  //   这里改变this指向我们也可以用call，其实真正内部改变this指向的是用的call，详见可以看一下mdn的实现
    }
}
// 第一版改变改变this指向，返回一个新的函数 我们实现了，接下来我们要解决传参的模拟实现
// 第二版本
Function.prototype.bind2=function(context){
    var  self=this
    // 获取到bind2函数从第二个到最后一个参数  arguments
    var args = Array.prototype.slice.call(arguments, 1);   // 伪数组转成真数组。这个方法是常用的
    
    return function(){
        // 获取到第二段函数传递的参数
        var bindArgs=Arry.prototype.slice.call(arguments)
        // 最后拼接的参数
        return self.apply(context,args.concat(bindArgs))
    }
}
// 第三版，我们已经实现了返回新的函数，同时解决了不定长参数的问题，接下来我们需要解决new()构造函数效果的模拟实现
// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数
Function.prototype.bind2=function(context){
    var  self=this
    var agrs=Arry.prototype.slice.call(arguments)

    // return  function(){
    //     var bindArgs=Arry.prototype.slice.call(arguments)
    //     return self.apply(context,args.concat(bindArgs))
    // }
    var fBound=function(){
        var bindArgs=Arry.prototype.slice.call(arguments)
        // 如果this是bBound的实例的话，Bfound作为构造函数，this指向实例，此时为true
        //  将绑定函数的this 指向该实例，可以让实例获得来自绑定函数的值，如下面的obj其实就是fun1的实例

        // 当作为普通函数的时候，this指向window(直接调用fun1()),此时结果为false,将绑定函数的this指向context
        return self.apply(this instanceof fBound ? this: context,args.concat(bindArgs))
    }
   
     // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
     // 其实昨晚一直不解为啥需要加上这个，这个其实就是为了如果是通过new操作符构造的话，这个新的对象需要继承构造函数的属性
     // 
    fBound.prototype = this.prototype;
    return  fBound
}
//  第四版本，对于博主说的加一个函数进行空转其实没怎么看懂,说是
//  我们直接将 fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype
Function.prototype.bind2=function(context){
    var   self=this
    var   agrs=Arry.prototype.slice.all(arguments,1) // 第一部分参数

    var  fNOP=function(){ // 哪一个空函数出来进行中转

    }

    var   bind2Fun=function(){
        // 如果是通过new操作符来的 直接指向this,否则是普通函数不是构造而来的，直接指向绑定的对象
        
        var bind2Agrs=Array.prototype.slice(arguments,1)
        return self.apply(this instanceof fNOP?this:context,agrs.concat(bind2Agrs))
    }
    //  为了不影响this的原型对象，我们中间通过fNOP来进行中转，当你改变bind2Fun.protype的时候,也只改变fNOP这个函数原型属性
    //  而不会影响到this.prototype
    fNOP.prototype=this.prototype
    bind2Fun.prototype=new fNOP()
    return bind2Fun

}
//   相信你对以上拿一个函数进行中转没有看懂，
// 我们直接将 fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，
// 也会直接修改绑定函数的 prototype。这里有点不太懂诶，

// 我也是一样的，下面我们在解释这个问题
//   如果我们没有拿一个函数来空转，以第三版为基准， 那么我们来看下面这段代码会输出啥
function bar() {}

var bindFoo = bar.bind2(null);

bindFoo.prototype.value = 1;    // 这里就相当于直接改变fBound.prototype的值，改变其原型属性

console.log(bar.prototype.value) // 以第三版为例，输出会是  1，这也就是为啥，我改变的是bindFoo的原型属性，但是也会改变bar的原型属性
// 也许你还会问，为啥fBound.prototype = this.prototype;就会改变bar的原型属性呢，因为他们都是关联同一个原型对象，
// 原型对象被修改了，当然也会改变啦
//=============
var  foo={
    value:1
}

 function bar(name,age){
     console.log(this.value)
     console.log(name)
     console.log(age)
 }

 var fun1=bar.bind2(foo,'xiexiupeng','18') // 其实这个fun1为绑定bind2返回的一个新的函数
 fun1('22')  //  直接调用   第一种用法
 var obj=new fun1()  // 当作为构造函数的时候，使用了new操作符
//  实例


//======妈呀，终于把bind的原生实现写完了，自己再来梳理一下，重写一个bind实现
Function.prototype.bind2=function(context){
    // 这里我们要注意问你们要防止我们调用bind的是不是一个函数
    if(typeof this !=='function'){
        throw new Error('调用的不是一个函数')
    }
    var self=this
    var args=Array.prototype.slice(arguments,1)
    // 函数中转
    var fNOP=function(){

    }
    var bindFunc=function(){
        // 参数不定长，分布在多处的问题
        var bindArgs=Array.prototype.slice(arguments,1)
        // 构造函数的问题。new操作符，this指向失效问题
        // 普通函数照旧
        return self.apply(bindFunc instanceof this?this:context,args.concat(bindArgs))
    }
    // 解决new继承的问题，同时避免继承污染
    fNOP.prototype=this.prototype
    bindFoo.prototype=new fNOP()
    // 返回一个新的函数
    return  bindFoo
}
//===上面提到了typeof这个玩意儿，所以就特意的在mdn上查了一下
// typeof  在let  const前使用会存在暂存死区 ，会返回 ReferenceError

// 好了，这一节终于可以happy的结束了






