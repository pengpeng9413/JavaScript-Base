/**    这个文件，是我平时测试什么代码或者做什么题会在上面进行run,如果是读者的话，可以忽略这个文件 */
/**  红绿灯问题，用promise实现 
 * 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？
 */
// 三个亮灯函数已经存在
function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}
// 思路，拆分，先解决每个灯的问题，假如他们不同步

/**红灯 */  
setTimeout(function(){
    console.log('red')
},3000)

/**绿灯 */
setTimeout(function(){
    console.log('green')
},1000)

/**黄灯 */
setTimeout(function(){
    console.log('yellow')
},2000)

//  替换掉函数
/**红灯 */  
setTimeout(red(),3000)

/**绿灯 */
setTimeout(green(),1000)

/**黄灯 */
setTimeout(yellow(),2000)

var light=Promise.race([
    setTimeout(red(),3000),
    setTimeout(green(),1000),
    setTimeout(yellow(),2000)
]).then(

)
//  好吧，自己好像没有什么好的思路，我们来看看正确的答案，
//  看了正确答案，好像理解错题目意思了，我以为需要三个函数同时进行，原来是一个一个灯闪，然后交替重复进行
//  那自己来实现一遍吧
var  light=function(timmer,callback){
     return new promise(function(resolved,rejected){
         setTimeout(function(){
            callback  // 传入的函数
            resolved() // 将promise结果传递出去
         },timmer) // timmer  是个定时器
     })
}

var step=Promise.resolve().then(function(){
    // 红灯
    light(3000,red())
}).then(function(){
    // 绿灯
    light(1000,green())
}).then(function(){
    light(2000,yellow())
}).then(step())  // 最后一步进行递归

step()  // 启动，开始执行

// 这样回过头来看，这个答案还涉及了很多promise的知识点


// ====面试题===考试js事件循环机制
for(var i=1;i<=3;i++){
    setTimeout(function(){
        console.log(i)
    },0)
}
// ===========考察js的解析机制，从右往左，
(function(){
    var a=b=5
})()
console.log(b)
console.log(a)
// ============考察js是如何执行的，涉及词法作用域==========
var name='jack'
function change(){
    console.log(name)
    var name='licy'
    //console.log(name)
}
change()






