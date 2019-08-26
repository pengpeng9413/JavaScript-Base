/**
 * @see 今天我们看一道promise的延展题，
 * @see 问，如果有这么这里一个异步请求：[p1,p2,p3,p4,p5,p6],数组形式，分批两两去请求，如果执行p1请求，我们直接写成p1()
 * @see 先批量一起执行[p1,p2],但是如果有一个执行完了，另外一个顶上去,如
 *      在上述请求中【p1,p2】,p2先执行完，那么两两执行的会是【p1,p3】
 * @see 该如何实现这个方法呢？这里就需要数据结构来帮忙了
 * 思考：一次性只能同时请求两个，后面的只能排队了，第一想到的常规做法可能是利用数组递归
 */

 let urlArr=[p1,p2,p3,p4,p5]
 /* 1. 常规解法：数组递归 */ 

 // 在开始之前，我们先实现一个最简单的一个异步请求顺序执行如： 【p1,p2,p3】,条件：p1执行完之后执行p2,p2执行完之后，执行p3
 // 而且不用管各个异步之间的关联，假设这个urlArr数组里面的异步都是没有关系的（不需要管是否需要拿之前的response作为接下来异步的请求）
 function twoPromise(urlArr){
    let p = Promise.resolve() // 预先定义一个resoved状态的Promise对象
    for(let i=0;i<urlArr.length;i++){
        p.then(urlArr[i])
    }
 }
 // 以上代码我们可以用reduce做简单的优化
 function twoPromise(urlArr){  //  后续待检验
    urlArr.reduce((p,ascy)=>{
        return p.then(ascy)
    },promise.resolve())
 }
 
 //
 /* 巧用promise.race() */
 function twoPromise(urlArr){

}