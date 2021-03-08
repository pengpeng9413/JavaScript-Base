
// 观察者模式:观察者模式顾名思义，观察你，感知你变化了
// we can create our own Subsjects and Obsersers in Javascript ,let's see how this is implenmented


// 观察者
var Subject=function(){
  return {
      observers:[],
      subscribeObserver:function(observer){ // 订阅观察
        this.observers.push(observer)
      },
      unSubscribeObserve:function(observer){ // 取消订阅
        var index=this.observers.indexOf(observer)
        if(index>-1){
            this.observers.splice(index,1) // splice 为拼接会改变原数组
        }
      },
      notifyObserve:function(observer){ // 通知观察者
        var index=this.observers.indexOf(observer)
        if(index>-1){
            this.observers[index].notify(index);
        }
      },
      notifyAllObserve:function(){ // 通知所有观察者
        this.observers.forEach((item,index) => {
            this.observers[index].notify(index)
        });
      }
  }
}

// 被观察者
var Observers=function(){
    return {
        notify:function(index){
            console.log("观察到了",index)
        }
    }
}

// 我们来试试我们的观察者 好不好使
var subject = new Subject();

// 来一波观察者
var observer1 = new Observers();
var observer2 = new Observers();
var observer3 = new Observers();

// 订阅一波观察
subject.subscribeObserver(observer1);
subject.subscribeObserver(observer2);
subject.subscribeObserver(observer3);

// 取消一个被观察者
subject.unSubscribeObserve(observer3);

// 通知被观察者 执行某个操作
subject.notifyObserve(observer1);

// 取消所有观察者
subject.notifyAllObserve();

// 我们总结一波观察者模式，其实subject相当与一个中央调度系统，观察着外面的制造出来的对象(被观察着)
// 想象一个情景，玻璃房里面是中央调度系统，外面是被制造出来的机器人，机器人和中央调度系统是如何通信的呢
// 在被观察者身上绑定个执行器，这个定位器，这个定位器就是这里的 notify 方法，在每个被观察者被制造出来
// 前，我们需要在他身上安装执行期，

// 在《Head First 设计模式》里讲到
// 出版者 + 订阅者 = 观察者模式 ，如果你了解报纸的订阅，那么我们很容易知道这里出版者相当与subject 订阅者相当与observe。给订阅者不断的推一些东西
// 内容由订阅者决定。

// 观察者模式解决了一个松耦合的问题，我们把中央调度系统和机器人拆开了，这可以使机器人到处跑，同时还受控制,可以接收我们的信息

// 难么观察者模式和我们经常过的发布订阅有啥区别么？
// 普及一下两种设计模式的英文：
// 1. 观察者模式：Observer pattern
// 2. 发布订阅模式：Publish-subscribe-pattern 

// 答案就是 : 发布订阅其实比观察者模式多了个中介，由中介再来做统一的分发，publisher 和 subscriber 完全解耦

// 问题？ js 中如何实现这个这种发布订阅---- 》
// 联想一下dom事件，注册回调函数没准能帮助我们解决问题




// ============= 标准的实现 ===========
// publisher
// Subscriber
// unsubscribe
// Some place to store callbacks that are registered from subscribers.

function pubSub() {
  // 存储事件回调函数，key:callback
  const subscribers = {}

  // Publisher: 发布
  function publish(eventName, data) {
    // 如果没有注册这个事件，直接返回
    if (!Array.isArray(subscribers[eventName])) {
      return
    }
    // 为啥需要循环回调呢：同一个事件执行不同的回调或者相同的回调
    subscribers[eventName].forEach((callback) => {
      callback(data)
    })
  }

  // Subscriber： 订阅。注册回调事件 
  function subscribe(eventName, callback) {
    // 如果不存在这个注册事件，赋值为空数组
    if (!Array.isArray(subscribers[eventName])) {
      subscribers[eventName] = []
    }
    // 将回调函数推入栈中
    subscribers[eventName].push(callback);
    // 定位到注册事件的索引
    const index = subscribers[eventName].length - 1;
    // 取消订阅
    return {
      unsubscribe() {
        subscribers[eventName].splice(index, 1);
      },
    }
  }

  return {
    publish,
    subscribe,
  }
}

// 使用-注册一个事件
const handle1=pubSub.subscribe('handleChange1',(message)=>{
  console.log("handleChange1",message)
})

// 给 handleChange1 发布一个信息
pubSub.publish("handleChange1",new Date())

// 取消订阅
handle1.unsubscribe()

