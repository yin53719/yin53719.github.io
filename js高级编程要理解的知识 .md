1,this作用域

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this

2，原型以及原型链

es5时代:主要用途 扩展更新对象方法

es6/7：使用被class取代，趋向于正统的面向对象语法

http://www.cnblogs.com/yjf512/archive/2011/06/03/2071914.html

function People(name)
{
  this.name=name;
  //对象方法
  this.Introduce=function(){
    alert("My name is "+this.name);
  }
}
//类方法
People.Run=function(){
  alert("I can run");
}
//原型方法
People.prototype.IntroduceChinese=function(){
  alert("我的名字是"+this.name);
}

 

//测试

var p1=new People("Windking");

p1.Introduce();

People.Run();

p1.IntroduceChinese(); 



3，call，apply
用途：方法的复用，继承，桥接
http://uule.iteye.com/blog/1158829

var name=  "window" ;

var add=
{  
  name:"add",
  
  test:function(){
  
    alert(this.name+"2222"); 
    
  }
     
}  
var sub=
{  
  name:"sub",
  
  test:function(){
  
    alert(this.name+"1111"); 
    
  }
  
}  
  
sub.test.call(add,3,1); 

4， Closures (闭包)

执行外包函数，返回内部函数，内部函数可以读取外部函数私有变量
     可以实现函数的嵌套，实现私有变量，连接内部函数与外部函数

5,异常处理

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

try {

  throw new Error('Whoops!');
  
} catch (e) {

  console.log(e.name + ': ' + e.message);
  
}

浅谈深拷贝和浅拷贝（js）

如何区分深拷贝与浅拷贝？简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明是浅拷贝，如果B没变，那就是深拷贝。深入点来说，就是B复制了A，如果B复制的是A的引用，那就是浅拷贝，如果B复制的是A的本体，那就是深拷贝。在深入了解深拷贝和浅拷贝之前，我们先得了解堆栈和数据类型


