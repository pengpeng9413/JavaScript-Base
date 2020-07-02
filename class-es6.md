# 这节我们来聊聊 es6 中 class

为啥今天突然又来讲这个呢，因为在完成一个第三方流程图库 go.js 的时候，居然在 private 方法中取不到 this.props
这让我非常困惑，我们话不多说，我们直接代码走起

我们这一节其实总共有四个关联文件，我们将会系统深入的讲讲这里面的道道

- ts 的 class 和 js 的 class

```ts
  // 如果要运行的化，全局安装ts-node 和 typescript,可直接执行ts文件
  class test {
      // 构造函数
      constructor(props){
          super（props）
          // 定义状态
          this.state={
              name:'pengpeng'
          }
      }

      // 定义一个私有方法
      private getName(){
          console.info(this)
      }
  }

  // 将类进行实例化
  const A = new test({age:26})

```
