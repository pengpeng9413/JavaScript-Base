//===========今天我们来深入看一下js的继承===============
//之前小打卡给过一个面试题，最后一道题，说实话没做出来，我想过完这一章估计能把最后一个问题gark掉了吧

// 之前理解了一遍原型，原型链，构造函数的情仇恩怨，我们知道js这门语言是基于原型链实现的，而继承就是基于此实现的，所以我们现在
// 回过头来再看继承就会显得比较简单了

// 我们回到高程红宝书所说的几种继承，我觉得讲的真的是非常棒了，不亏是经典书

/**
 * 1. 原型链继承
 */
function parent(){   
    this.name='xxp'
}
parent.prototype.getName=function(){ 
    console.log(this.name)
}
function child(){

} 
child.prototype=new parent() // parent  作为构造函数
var  child1=new child()

console.log(child.getName()) //  xxp
//===========这里介绍一下 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
function objCreate(o){
    function f(){

    }
    f.prototype=o
    return new f()
}
// 原型链继承的问题：
// 1.引用类型的属性会被所有的实例共享，继承
// 2.在创建 Child 的实例时，不能向Parent传参
//  举个例子
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy", "yayu"]  因为names是child原型上的属性，所有实例都是由原型构造而来，所以names在任务实例都是一致的
/**
 * 2. 借用构造函数（经典继承）
 */
function Parent(){
    this.names=['kevin', 'daisy']
}
function  child(){
    Parent.call(this)
}
var  child1=new child()
     child1.name.push('xxp')
     console.log(child1.name) //  ["kevin", "daisy", "xxp"]

var  child2=new child()
     console.log(child2.name) // ["kevin", "daisy"]
// 咦你是否会发现，这个例子和上面的不一样，上面的原型链继承（简称原型继承），所有实例会共享原型属性，而这个却不会，究竟玄机在哪里
// 让我们再次回到  原型，构造函数，原型链的  三者之间的关系
// 原型是原材料，构造函数相当于加工工厂， 那生产的实例可以通过从原材料下手改变他，也可以在加工工厂上改变他，加工的改变，可以方便解耦，
// 尽可能的让生产的实例有他的独特性
// 这里我们用了call,改变this指向，将原型属性解耦出来，不至于每个实例都共享原型属性，每次去new的时候，执行parent方法，他的this.name永远只有两个值

// 这里我们再来回顾一下  new()操作符在js中到底干了什么

function  base(){

}
var obj=new base()
// 以上简简单单的两行代码，发生了一下几个事情
// 1. 创建一个空的对象
// 2. 回顾实例与构造函数的关系，此时obj是实例，base()是构造函数，就有   obj._proto_=base.prototype
// 3. 改变this的指向，从base()指向空对象obj,改变指向，你懂得  base.call(obj)或者 base.apply(obj)

// 所以到这里，构造继承其实就是不断的改变this指向，你把new()替换成上述的代码，
// 继承了构造函数原来的属性的同时可以自由扩展自身实例的属性而不影响构造函数本身

// 但是也不是没有缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法。

/**
 * 3. 组合继承（原型继承和经典继承双剑合璧）
 */
// 小哥写到这里的时候挺兴奋的，为啥，因为今天上我就可以把继承结课了，好开心有木有，emmmm,来咱们继续快乐的code
function  Parent(name){
    this.name=name
    this.colors=['red','blue','green']
}
Parent.prototype.getName=function(){
    console.log(this.name)
}
function  child(name,age){
    Parent.call(this,name)
    this.age=age
}

 child.prototype=new Parent()  // 重写child 的原型指向Parent
 child.prototype.constructor=child  // 这个貌似本来就成立的，原型的构造函数指向这个构造函数本身，但是吧，感觉这两行代码可有可无

var  child1=new child('Kevin','18')  // 此时，对于
     child1.colors.push('black')

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var  child2=new child('daisy', '20')


console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]

// 有两行代码没看懂，看懂没有必要写的，就我自己的理解来说，就是同事原型继承，将需要所有实例共享放在构造函数的原型上，将拓展的
// 放在构造函数中，通过传参和改变this指向实现，这样就避免了各自的缺点

/**
 * 4. 寄生式继承  ，创建一个仅用于封装继承过程的函数，把继承过程写成一个函数容器，具体的继承过程写在函数里面
 * 该函数在内部以某种方式来增强对象，最后返回对象。
 */
// 这个名字很有意思，寄生，我们看函数的结构发现，其实所谓的寄生就是在函数里面再写了一个函数

function createAnother(original){
    var clone = Object.create(original);    //通过调用函数创建一个新对象
    clone.sayHi = function(){               //以某种方式来增强这个对象
        console.log("Hi");
    };
    
    return clone;                        //返回这个对象
}

var person = {
    name: "Bob",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi();

//  中间我们再来插入一下这个object.create()的模拟实现，有时我们也会称之为原型式继承
//   
//===========这里介绍一下 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
function objCreate(o){
    function f(){

    }
    f.prototype=o
    return new f()
}
/**
 * 5. 寄生组合继承，看名字就知道，寄生组合，肯定是兼具组合和寄生的特点，
 *    都说寄生组合是最佳的寄生方式，来看看有什么黑魔法，感受代码的魅力
 */
