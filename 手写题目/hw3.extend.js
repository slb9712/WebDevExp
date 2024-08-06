/**
 * 原型继承
 * 
 * Parent 中的引用属性会被每个子类示例共享
 */

function Parent() {}
function Children() {}
Children.prototype = new Parent()
Children.prototype.constructor = Children;
/**构造函数继承
 * 
 * 避免了子类示例共享引用属性的情况,但无法继承父类原型上的方法 
 * 如果Parent中存在一个函数，那么每次实例化Children的时候，都会创建一个同样函数，函数的复用性就难以体现
 */

function Parent() {
  this.property = 'parent'
}
Parent.prototype.say = function () {
  console.log('say')
}
function Child() {
  Parent.call(this)
  this.property = 'child'
}


/***
 * 组合继承： 原型继承+构造函数继承
 * 调用了父类构造函数组合式继承将原型链和构造函数的技术组合到一起，
 * 结合两者的优点，通过原型链实现对原型属性和方法的继承以及借用构造函数
 * 来实现对实例属性的继承。拥有以下的优点。
 * 
 * 
 * 1. 父类的方法可以被复用
 * 2. 父类的引用属性不会被共享
 * 3. 子类构建实例时可以向父类传递参数，不过组合式继承中两次
 * 
 * */ 
function Person(name, age, gender) {
  this.name = name || '';
  this.age = age || '';
  this.gender = gender || '';
}
// 父类方法再原型上定义
Person.prototype.singSong = function() {
  console.log('ddd');
}

function Student(name, age, gender, score) {
  // 构造函数继承属性
  Person.call(this, name, age, gender); // 第二次调用Person
  // 自己私有属性
  this.score = score;
}
// 原型继承方法
Student.prototype = new Person(); // /第一次调用Person
// 修改constructor指向
Student.prototype.constructor = Student;
// 自己的成员方法
Student.prototype.inFo = function() {
  console.log(this.score);
}
let s1 = new Student('lisi', 3, '男', 80);
console.log(s1)

/**
 * ES6 通过extends关键字实现继承
 * class Stu extends Person{}
 */

/**
 * 寄生式继承
 * 
 * 寄生式继承因为使用了一个函数以某种形式来增强对象，最后返回对象，
 * 那么复用率就不高，导致效率低。
 * 
 */

// 设置父类
let Person = {
  name: 'zs',
  age: 18,
  gender: '男',
  singSong: function() {
      console.log('ttt')
  }
}
// 创建新对象，连接原型链
function object(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

function createStu (exObj, score) {
  // 传入父类创建新对象，此时student的prototype指向继承对象
  let student = object(exObj);
 // 添加属性和方法
  student.score = score;
  student.getScore = function () {
      console.log(this.score)
  }
  return student
}
let stu2 = createStu(Person, 99)
console.log(stu2)
stu2.getScore()
stu2.singSong()



/**
 * 寄生组合式继承：
 * 
 * 通过借用构造函数来继承属性，通过原型链形式来继承方法，
 * 会解决2次调用父类函数以及复用率的问题
 */
 function exPrototype(son, father) {
  function F() {}
   //F()的原型指向的是superType
  F.prototype = father.prototype
  //subType的原型指向的是F()
  son.prototype = new F();
  // 重新将构造函数指向自己，修正构造函数
  son.prototype.constructor = son
}

// 设置父类
let Person = function (name, age, gender) {
  this.name = name
  this.age = age
  this.gender = gender
}
Person.prototype.singSong = function() {
console.log('singsong')
}
// 子类
let Stu = function(name, age, gender, score) {
  Person.call(this, name, age, gender, score);
  this.score = score;
}
// 核心：因为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
exPrototype(Stu, Person)
Stu.prototype.getScore = function() {
  console.log(this.score)
}

let stu1 = new Stu('学生', 13, '女', 89)
console.dir(stu1)

function extends(fat, chil) {
  function F(){}
  F.prototype = fat.prototype
  chil.prototype = new F();
  chil.prototype.constructor = chil
}
function Father(){}
function Children(){
  Father.call(this)
}
extends(Father, Children)



/**
 * ES6继承的实现
 */
class Child extends Parent {
  constructor(a,b) {
    super(a);
    this.filed3 = b;
  }
  filed4 = 1;
  func2 = function(){}
}