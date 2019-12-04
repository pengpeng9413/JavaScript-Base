/**
 * @alias 这节我们主要会梳理一下js,css的几个基础知识点
 * 
 */

 /**
  * @alias 盒模型
  * @description 很多时候我们觉得css样式很简单，或者对于写业务完全没有什么问题，但是面试或者对于一个jeek来说，
  *              这是不能容忍的；
  * @name 一般的文章会给我们里画一张图，最里面是content，padding，border，margin，你以为就这点知识点了，其实不然，一个width范围问题就会把你考住
  * @name  下面我们挑一些干的捞
  */
1. 浏览器中盒模型分为两种（模式）--》标准和怪异
怪异模式的 width和height   包含border、padding和content
标准模式下的 width和height 只包含content

2. 一般的浏览器是按照标准模式下进行渲染的，如果在html 不声明 DOCTYPE ，那么IE会按照怪异模式去渲染，否则其他浏览器都是默认的标准模式

3. 当然, 还有用来改变盒模型width范围的一个css3的属性, box-sizing:

    当设置为'border-box'时, width = border + padding + content;

    当设置为'content-box'时, width = content

4. 你以为躺坑结束了么，远远还没有？这里还有个margin的折叠问题（margin collapsing）：
    通常我们说的折叠, 都是垂直方向上的折叠, 水平方向是不存在的。标准模式下, 
    上下两个兄弟的块级元素, margin是会重叠的, 并且以最大的那个间距为准(都为正数)。

    看下边的这个例子：

    .wrapper{ 
        width: 100px; 
        height: 50px; 
        margin: 10px; 
        background-color: #dedede; 
    }
    <div class="wrapper"></div> 
    <div class="wrapper"></div>

    // 这两个div 上下之间的间距为 10px

    既然兄弟盒模型会有margin折叠, 那么父子呢? 答案是一定的, 父子也存在margin折叠的问题,
     只不过条件稍微苛刻一点, 我们一起来看下。 父子组件的折叠触发, 要求不能有间隙, 
     就是父组件不能设置border或padding值, 不能有空余的内容, 且同时有margin值

     以下是一个统一的整理：

    a. 浮动的盒模型不会margin折叠
    b. 创建BFC与子不折叠
    c. 设置定位的盒模型不会折叠
    d. 行内块级元素的盒模型不折叠
    e. 兄弟元素有间隙不折叠
    f. 父子盒模型元素, 孩子元素有border、padding、有浮动就不折叠
    g. height为auto、min-height为0的块级盒模型, 和它的最后一个没有border和padding的孩子盒模型底边距折叠, 且孩子的底部外边距和被清除浮动上边距有间隙不折叠。
    h. 如果min-height为0, 上下border、上下padding都为0, height为0或auto, 且没有行内盒模型, 他的孩子节点都会折叠

    对于值的取值我们整理为：

    同为正值时, 取较大者为两者为间距
    一正一负时, 正负相加为间距, 若结果为负值, 则两者部分重合
    都为负值时, 两者重合, 且重合部分为绝对值大者
