/*
 * @Description: 
 * @Author: xiexiupeng
 */
class test {
  // 定义类实例属性
  state = { name: 'xxp' }

  // 构造函数
  constructor(props) {
    // 如果下面这行没有被注释，你会发现它会抛出一个错，只有派生类才能调用super()
    // super(props)
    console.info(props)
    console.info(this.state)
    this.province = '江西'
    this.getName()
    this.getAge()
  }

  //    定义一个私有方法
  getName() {
    console.info(this.state)
  }
  getAge() {
    console.info(this.province)
  }
}

// 将类进行实例化
const A = new test({ age: 26 })

// 我们来练习一下构造函数
function Person(first, last, age, gender, interests) {
  this.name = {
    'first': first,
    'last': last
  };
  this.genderName={
    'male':'she',
    'man':'he'
  }
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.bio = function() {
    alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old.'+ this.genderName[this.gender]+ 'likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  };
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name.first + '.');
  };
};

var person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);

// 面向对象
// 我们从普通函数，声明一个对象。如：
function createObj(gender){
  var obj={}
  obj.name='xxp'
  obj.age='23'
  obj.gender=gender
}
 var A=createObj('male')
 A.name;
 A.age;
 A.gender;

 // 上面很古老吧，来看看现代一点的构造函数
 function Person(gender){
   this.name='xxp'
   this.age='23'
   this.gender=gender
 }

 const B=Person('man')
 