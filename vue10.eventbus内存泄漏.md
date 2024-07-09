## eventbus内存泄漏原因
activity非正常结束生命周期（发生异常或系统内存不足强制回收）的时候不会执行onDestroy（）

eventBus注册的时候会持有activity的引用，我们在onDestroy反注册。若我们的activity发生异常或系统内存不足对activity强制回收的时候将不会走onDestroy。eventBus持有activity的引用，因此发生内存泄漏。而且当我们再次打开activity时eventBus又会重新注册一次。

解决办法：注册的时候先判断activity是否注册过
```js
if (!EventBus.getDefault().isRegistered(this))
       EventBus.getDefault().register(this);
```

## 频繁使用eventbus会有什么问题？？？？？？？？？？？？？？？

// beforeDestroy（）生命周期函数里取消监听
beforeDestroy () {
    bus.$off('select'，this.handle)

}
```