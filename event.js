//============6.6(端午节)  今天我们重点来了解一下js  中event  事件===============
Event 对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态。

// 什么时候会产生Event 对象呢? 
例如: 当用户单击某个元素的时候,我们给这个元素注册的事件就会触发,该事件的本质就是一个函数,而该函数的形参接收一个event对象.

讲到js  事件呢，我们肯定会说到js  事件流，说到事件流，我们肯定就会谈到
1. 冒泡
2. 捕获

说到冒泡和捕获呢，我想肯定就会想到事件代理，这一节只是在我的语雀文档（js事件代理详解）会有更加详细的解释

这里我们重点说自定义事件，回归到起点，js事件
/**1.基本用法 */
target.addEventListener(type, listener[, useCapture]);
target.addEventListener(type, listener[, options]);
// target
常见的 target 是 element, document, window 和 XMLHttpRequest
// type
type 就是需要监听的事件类型，字符串类型，参见：https://developer.mozilla.org/en-US/docs/Web/Events
// listener
listener 是对个实现了  EventListener 接口的对象或者个一个函数（回调函数）
// useCapture 
布尔值，默认是 false, 表示捕捉冒泡阶段的事件， true 表示捕捉 capture 阶段的事件

// options 
{
    capture: false, // 捕获
    passive: false, // 被动的, 优化页面的滚动性能,参见 https://segmentfault.com/a/1190000017247263
    once: false    //只触发一次
}

/**2.三个阶段 */  可参考mdn:https://developer.mozilla.org/zh-CN/docs/Web/API/Event/eventPhase
// 一般有有下面几个阶段，可以通过 Event.eventPhase 属性来获取当前所处的阶段。
Event.CAPTURING_PHASE ===>   1

// 事件正在被目标元素的祖先对象处理. 这个处理过程从Window开始，然后Document, 
// 然后是HTMLHtmlElement, 一直这样，直到目标元素的父元素。 
// 通过EventTarget.addEventListener() 注册为捕获模式的Event listeners 被调用。

Event.AT_TARGET ===>  2

// 事件对象已经抵达the event's target. 为这个阶段注册的事件监听被调用。 
// 如果 Event.bubbles 的值为false, 对事件对象的处理在这个阶段后就会结束.

Event.BUBBLING_PHASE  ===> 3

// 事件对象逆向向上传播回目标元素的祖先元素, 从父亲元素开始，并且最终到达包含元素 Window. 
// 这就是冒泡，并且只有Event.bubbles 值为true的时候才会发生。 为这个阶段注册的Event listeners 在这个过程中被触发.

/**3.event 常用的方法和属性 */  参考链接：https://developer.mozilla.org/zh-CN/docs/Web/API/Event
Event.preventDefault()   // 阻止事件触发后默认动作的发生
Event.stopPropagation()  // 阻止捕获和冒泡阶段中当前事件的进一步传播。

target/srcElement // 对事件起源目标的引用。
currentTarget  //   当前注册事件的对象的引用。这是一个这个事件目前需要传递到的对象（译者：大概意思就是注册这个事件监听的对象）。这个值会在传递的途中进行改变。
eventPhase  // 指示事件流正在处理哪个阶段。
type   // 事件的类型  事件类型可参考：https://developer.mozilla.org/zh-CN/docs/Web/Events
isTrusted  // 指明事件是否是由浏览器（当用户点击实例后）或者由脚本（使用事件的创建方法
bubbles   // 布尔值，用来表示该事件是否在DOM中冒泡。

/**4.js自定义事件 */   
// 这是我们今天的重点，这节会重点介绍一下，js如何来创建自定义事件，又是如何来派发事件的，它能和我们用的react合成事件有什么关联，
// 这些都是接下来我们一一要撕开的迷雾
Events 可以使用 Event 构造函数创建如下:

var event = new Event('build');  //  这一步创建自定义事件

// Listen for the event.
elem.addEventListener('build', function (e) { ... }, false);  //  这一步监听事件 。但是这一步如果是自定义事件的话，他是不会执行的

// Dispatch the event.
elem.dispatchEvent(event); //派发事件 代码中手动触发事件  这一步做分发，用代码控制  执行事件触发的回调

自定义事件还有其他写法，但是已经被web标准给废弃了，读者可以查询mdn去查询相关的兼容写法









