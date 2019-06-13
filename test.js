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


/**  ganwei 记录 数据配置表 */
/** 系统层级 (空调，制冷，制热) 在web上可以自定义配置     table:systermTable
 *     系统下耳机配置    （如空调系统，1栋；2栋；3栋）    table:systermTable    
 *          第三级
 *              第四级      (这里可以设置多级)
 *   svg 图层级    table:svgtable              svgtable和systermTable 进行关联，  最小层级行数据关联
 *   数据层级 (具体里面的状态，数值：如温度，是否停机等)  
 */




