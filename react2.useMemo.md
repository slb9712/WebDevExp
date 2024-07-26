```ts

 const attributes = useMemo(
    () => [
      {
        type: 'input',
        key: 'ip',
        name: t('服务器IP'),
      },
      {
        type: 'input',
        key: 'resourceId',
        name: t('资源ID'),
      },
    ],
    [TagSelectPanelWithConfirm],
  );
```

# React.memo：高阶组件（Higher-Order Component），用于对函数组件进行性能优化。它通过对比前后 props 的变化来决定是否重新渲染组件。如果传递给组件的 props 没有变化，则组件不会重新渲染，从而提高性能。
```js
const ChildComponent = React.memo(({ value }) => {
  console.log('ChildComponent rendered');
  return <div>{value}</div>;
});
```

父组件重新渲染，没有被 memo 包裹的子组件也会重新渲染

被 memo 包裹的组件只有在 props 改变后，才会重新渲染

memo 只会对新旧 props 做浅比较，所以对于引用类型的数据如果发生了更改，需要返回一个新的地址

memo 并不是用的越多越好，因为缓存本身也是需要开销的。如果每一个组件都用 memo 去包裹一下，那么对浏览器的开销就会很大，本末倒置了
项目中可以针对刷新频率高的组件，根据实际情况，使用 memo 进行优化

## 一般使用memo，会搭配useMemo和useCallback

# useMemo：

useMemo 是对计算的结果进行缓存，当缓存结果不变时，会使用缓存结果

useMemo 并不是用的越多越好，对于耗时长、性能开销大的地方，可以使用 useMemo 来优化，

但大多数情况下，计算结果的开销还没有使用 useMemo 的开销大，应视情况而定



举例 
当父组件传了一个引用类型的结果 result 给子组件，且子组件用 memo 包裹时，需要使用 useMemo 对 result 进行缓存，因为 memo 只对 props 做浅比较，当父组件因为其他数据变动重新渲染时，传递给子组件的数据result也会重新在内存中开辟一个地址赋值给 result，此时地址发生改变，子组件会重新渲染

```js
// 使用useMemo，返回一个和原对象一样的对象，第二个参数是依赖性，仅当name发生改变的时候，才产生一个新的对象，注意：依赖项千万要填写正确，否则name改变时，profile依旧使用旧值，就会产生错误

const Child = memo((props) => {
    console.log('我是一个子组件');
    const {profile, handleClick} = props;
    return (
        <div>
           <div>{`父组件传来的用户信息：姓名${profile.name}, 性别${profile.gender}`}</div>
           <button onClick={handleClick}>改变父组件age</button>
        </div>
    )
 
const Father = () => {
    console.log('我是一个父组件')
    const [age, setAge] = useState(0);
    const [name, setName] = useState('张三男');
    const 
    return (
        <div>
            <span>`目前的年龄为${age}`<span>
            <Child
                profile={useMemo(() => ({
                    name, 
                    gender: name.indexOf('男') > -1 ? '男' : '女' }), [name])
                }
                handleClick={useCallback(() => setAge(age + 1), [])}
            />
        </div>
        
    )
}
```

# useCallback：

useCallback 与 useMemo 类似，只不过是对函数进行缓存
useCallback 可以单独使用，但是单独使用的使用对性能优化并没有实质的提升，且父组件此时重新渲染，子组件同样会渲染，通常搭配memo使用。

useCallBack在什么情况下使用？
在往子组件传入了一个函数并且子组件被React.momo缓存了的时候使用
使用useCallBack包一下需要传入子组件的那个函数。那样的话，父组件重新渲染，子组件中的函数就会因为被useCallBack保护而返回旧的函数地址，子组件就不会检测成地址变化，也就不会重选渲染。
```js

const Child = memo((props) => {
    console.log('我是一个子组件');
    return (
        <button onClick={props.handleClick}>改变父组件中的年龄</button>
    )
})

// 使用了useCallback优化了传递给子组件的函数，只初始化一次这个函数，下次不产生新的函数
const Father = () => {
    console.log('我是一个父组件')
    const [age, setAge] = useState(0);
    return (
        <div>
            <span>`目前的年龄为${age}`<span>
            <Child handleClick={useCallback(() => setAge(age + 1), [])}/>
        </div>
    )
}
```



useCallback 需要配合 memo 一起使用，这样当父组件重新渲染时，缓存的函数的地址不会发生改变，memo 浅比较会认为 props 没有改变，因此子组件不会重新渲染

