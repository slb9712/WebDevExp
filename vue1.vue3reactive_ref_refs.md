## reactive是一个函数，它可以定义一个复杂数据类型，成为响应式数据。
```js
const obj = reactive({
      name: 'ls',
      age: 10
    })
```

## ref函数
常用于简单数据类型定义为响应式数据

再修改值，获取值的时候，需要.value
在模板中使用ref申明的响应式数据，可以省略.value

## toRef是函数，转换响应式对象中某个属性为单独响应式数据，并且值是关联的。
```js
const name = toRef(obj, 'name')
```

## toRefs是函数，转换响应式对象中所有属性为单独响应式数据，对象成为普通对象，并且值是关联的
```js
const obj3 = toRefs(obj)
```

## 当你明确知道需要的是一个响应式数据对象 那么就使用 reactive 即可,其他情况使用ref

## 父后代传递数据
provide函数提供数据和函数给后代组件使用
inject函数给当前组件注入provide提供的数据和函数