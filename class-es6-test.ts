class test1 {
  // 定义类实例属性
  state = { name: 'xxp' }
  user: { count: 11 }
  // 构造函数
  constructor(props) {
    // 如果下面这行没有被注释，你会发现它会抛出一个错，只有派生类才能调用super()
    // super(props)
    console.info(props)
    console.info(this.state)
    console.info(this.user)
    // this.province = '江西'
    this.getName()
    this.getAge()
  }

  //    定义一个私有方法
  private getName() {
    console.info(this.state)
  }
  public getAge() {
    console.info(this.state)
  }
}

// 将类进行实例化
const A1 = new test1({ age: 26 })

// 上面执行的结果是，为啥是undefined呢，因为user我们只是声明了但是没有赋值，所以是undefined,而且我们的声明类型是不严谨的，用了数字11
// {age: 26}
// {name: 'xxp'}
// undefined
