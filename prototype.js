//  再探js中的原型和原型链

//=====先用构造函数创建一个对象

function Person(){

}

var person =new Person()
person.name='Kevin';
console.log(person.name)

// 在这个例子中，Person 就是一个构造函数，我们使用 new 创建了一个实例对象 person。

// 很简单吧，接下来进入正题：


//===========>  prototype
// 每个函数都有一个prototype的属性，就是我们熟知的在各种例子上看到的prototype的。比如

function Person(){

}
// 注意 prototype是函数才会有的属性
Person.prototype.name='谢秀鹏'
var person1=new Person()
var person2=new Person()
console.log(person1.name)
console.log(person2.name)

