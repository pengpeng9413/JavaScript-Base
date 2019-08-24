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
 function twoPromise(urlArr){

 }
 /* 巧用promise.race() */
 function twoPromise(urlArr){

}