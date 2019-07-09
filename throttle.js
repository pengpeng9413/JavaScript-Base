/**
 * 这节我们是接着防抖的内容，来讲一下 节流：throttle
 * 节流的原理很简单：
    如果你持续触发事件，每隔一段时间，只执行一次事件。
    根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
    我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。
    关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。
 * 
 */

 /**
  * 1. 使用时间戳
  *    让我们来看第一种方法：使用时间戳，当触发事件的时候，我们取出当前的时间戳，
  *    然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，就执行函数，
  *    然后更新时间戳为当前的时间戳，如果小于，就不执行
  */
 function throttle(func,wait){
    
    var context,args ;
    var previous =0
    
    return function(){
        // 看到下面这个+你是不是充满着疑惑，对我也一堆疑惑，
        // 让我想起了+= 赋值运算，甚至一度懵逼中 ，我们很有必要来解释一波
        /**
         * 我们知道new  date()直接执行是 Tue Jul 09 2019 14:02:17 GMT+0800 (中国标准时间)
         * 显然我们需要的是毫秒数，怎么办呢，我们先给出答案，这里用 + 是为了转时间戳，也就是毫秒数
         * 1. 这其实是隐式转换的玄学
         *     === ‘+ 隐形转换’ ===
         */
        var now=+new Date()  
            context=this
            args=arguments
        if(now-previous>wait){
            func.apply(context, args);
            previous = now;
        }
    }
 }

 /**
  * 上面我们提到 + 其实是隐式转换 ，我们先看看ECMAScript规范对一元运算符的规范：
  * 1. 一元+ 运算符
  * 一元+运算符将其操作数转换为Number类型并反转其正负。注意负的+0产生-0，负的-0产生+0。
  *  产生式 UnaryExpression : - UnaryExpression 按照下面的过程执行 :

    令 expr（表达式） 为解释执行 UnaryExpression 的结果 .
    令 oldValue 为 ToNumber(GetValue(expr)).
    如果 oldValue is NaN ，return NaN.
    返回 oldValue 取负（即，算出一个数字相同但是符号相反的值）的结果。
    +new Date()相当于 ToNumber(new Date())
  */

  // 例子依然是用讲 debounce 中的例子，如果你要使用： 
  container.onmousemove = throttle(getUserAction, 1000);

  /**
   * 2. 使用定时器， 直接上代码
   */
function throttle(){
    var timeout,args,context;
 
    return function(){
        context=this;
        args=arguments
        if(!timeout){
            timeout=setTimeout(function (){
                timeout=null // 清除定时器
                func.apply(context,args)
            },wait)
        }
    }
}

//=============以上  第一种事件会立刻执行，第二种事件会在 n 秒后第一次执行
//=============第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件
/**
 * 那我们可不可以将两者综合到一起呢，既让他立即执行，同时让他能在最后停止触发的时候还能再执行一次
 * 我们综合两者的优势，写出第三版代码
 * 说实话，下面这段代码还得好好研究一下，copy过来的看了一眼，似懂非懂，但我觉的应付面试肯定是没什么问题了
 */
function throttle(){
    var timeout,context,args,result;
    var previous=0

    var later=function(){
        previous=+new Date()
        timeout=null
        func.apply(context,args)
    }
    var throttled=function(){
        var now=+new Date()
        // 下次触发 func 剩余时间
        var remaining=wait-(now-previous)
        context=this
        agrs=arguments
        // 如果没有剩余时间了或者你改了系统的时间
        if(remaining<=0||remaining>wait){
            if(timeout){
                clearTimeout(timeout)
                timeout=null
            }
            previous=now
            func.apply(context,args)
        }else if(!timeout){
            timeout=setTimeout(later,remaining)
        }
    }
    return throttled
}
/**
 * 当然根据underscore的源码，其实我们还有是优化空间的，这个我们跟防抖一样，有时间，我们再来精进
 * 总结 ：节流防抖是我们在实际应用中经常会用到的，两个的侧重点事不一样的
 *        防抖是虽然事件持续触发，但只有等事件停止触发后 n 秒才执行函数，
 *       节流是持续触发的时候，每 n 秒执行一次函数
 * 其实实际的应用场景中，不同的场景可能侧重的点不一样，比如搜索下拉框的，个人觉得防抖比较合适，当你不再输入了，然后才执行接口查询
 */