React中的props是只读的，这是为了保证React的单向数据流的设计模式，使状态更可预测。 

如果允许自组件修改props，那么一个父组件将状态传递给多个子组件，这几个子组件随意修改，就完全不可预测，不知道在什么地方修改了状态，所以我们必须像纯函数一样保护props不被修改

props 是上层组件传递进来的值，这个值是父类的值，同 Vue 一样，props 的传值是单项数据流，也就是不会让影响父类的值，如果需要改值，可以先让 props 赋值给一个变量，在修改这个变量。