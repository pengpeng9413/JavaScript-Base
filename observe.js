
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


// ==== 还记得一个非常经典的迷你库么 mitter ====
// 这里我们来实现一个类似这样的功能
class Events {
  constructor() {
    this.events = new Map();
  }
  // 注册事件
  addEvent(key, fn, isOnce, ...args) {
    const value = this.events.has(key) ? this.events.has(key) : this.events.set(key, new Map()).get(key) // 里面又嵌套一层map,骚气
    value.set(fn, (...args1) => { // fn 作为key，骚气啊
        fn(...args, ...args1)
        isOnce && this.off(key, fn)
    })
  }

  on(key, fn, ...args) {
    if (!fn) {
      console.error(`没有传入回调函数`);
      return
    }
    this.addEvent(key, fn, false, ...args)
  }

  emit(key, ...args) {
    if (!this.events.has(key)) {
      console.warn(`没有 ${key} 事件`);
      return;
    }
    for (let [key, cbFn] of this.events.get(key).entries()) {
      cbFn(...args);
    }
  }

  off(key, fn) {
    if (this.events.get(key)) {
      this.events.get(key).delete(fn); // 这样做到了函数相等，巧妙的利用了Map 的key 值
    }
  }

  once(key, fn, ...args) {
    this.addEvent(key, fn, true, ...args)
  }
}
// 请使用原生代码实现一个Events模块，可以实现自定义事件的订阅、触发、移除功能
const fn1 = (... args)=>console.log('I want sleep1', ... args)
const fn2 = (... args)=>console.log('I want sleep2', ... args)
const event = new Events();
event.on('sleep', fn1, 1, 2, 3);
event.on('sleep', fn2, 1, 2, 3);
event.fire('sleep', 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
event.off('sleep', fn1);
event.once('sleep', () => console.log('I want sleep'));
event.fire('sleep');
// I want sleep2 1 2 3
// I want sleep
event.fire('sleep');
// I want sleep2 1 2 3


// class mitt{
//     constructor(){
//       this.maps=new Map()
//     }

//     // 注册事件
//     on(type,handler,...args){
//       if(this.maps.has(type)){// 一个type可以注册不同事件
//         this.map.set(type,[{cb:handler}])
//         return
//       }
//       this.map.get(type).push({cb:handler})
//     }

//     // 触发事件
//     emit(type,...args){
//       if(this.maps.has(type)){
//         throw new Error(`${type} 事件没有注册`)
//       }
//       this.maps.get("type").forEach(element => {
//         if(element.hasOwnProperty("cb")){
//           element.cb(...args);
//         }else{
//           element.once(...args)
//           this.off(type,element.once)
//         }
        
//       });
//     }

//     // 取消事件
//     off(type,handler){
//       this.maps.entries((key,value)=>{
//         if(type===key){
//           value.forEach((item,index)=>{
//            if(handler===item){
//              value.splice(index,1)
//            }
//           })
//         }
//       })
//     }

//     // 只触发一次，注意这里只是注册不触发
//     once(type,handler){
//       this.maps.forEach((item,index)=>{ // 如何保证只执行一次，执行完销毁掉这个==》难点
//         if(item.type===type){
//           this.maps.get(type).push({once:handler})
//         }
//       })
//     }
    
// }


/** 尽量写es6 版本的答案吧 */

function mitt(){ 
  return{
    maps:new Object(),
    on:function (type,handler,...args){  // 如何缓存参数,利用bind
      if(this.maps.hasOwnProperty(type)){
        this.maps[type].push({cb:handler.bind(this,...args)})
        return
      }
      this.maps[type]=[{cb:handler.bind(this,...args)}];
    },
    emit:function(type,...args){
      if(!this.maps.hasOwnProperty(type)){
        throw new Error(`${type} 事件没有注册`)
      }
      this.maps[type].forEach(element => {
        if(element.hasOwnProperty("cb")){
          element.cb(...args);
        }else if(element.hasOwnProperty("once")){
          element.once(...args)
          this.off(type,element.once)
        }
      });
    },
    off:function(type,handler){
      if(!this.maps.hasOwnProperty(type)){
        throw new Error("不存在该事件")
      }
      this.maps[type].forEach((item,index)=>{ // 函数相当怎么区别
        // 这样永远不相等，因为饮用地址不同
        if(item.cb===handler){
          this.maps[type].splice(index,1)
        }
      })
    },
    once:function(type,handler){
     this.maps[type].push({once:handler})
    }
  }
}

const events=new mitt();

const fn1 = (... args)=>console.log('I want sleep1', ... args)
const fn2 = (... args)=>console.log('I want sleep2', ... args)
// const event = new Events();
events.on('sleep', fn1, 1, 2, 3);
events.on('sleep', fn2, 1, 2, 3);
events.emit('sleep', 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
events.off('sleep', fn1);
events.once('sleep', () => console.log('I want sleep'));
events.emit('sleep');
// I want sleep2 1 2 3
// I want sleep
events.emit('sleep');
// I want sleep2 1 2 3

