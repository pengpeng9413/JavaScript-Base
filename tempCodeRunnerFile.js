class MyClassroom {
    constructor(number) {
      this.number = 60;
      console.info(11)
    }
    // 定义类的静态方法
    static get1() {
      return this.number; 
      // 静态方法包含的this关键字，这个this指的是类，而不是实例
    }
     static get2() {
      return 80;
    }
  }
  
  console.log(MyClassroom.get1()); // undefined

  MyClassroom.number = 50;  //  定义静态属性
  console.log(MyClassroom.get1()); // 50