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
