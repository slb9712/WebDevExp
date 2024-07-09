## compiler的处理流程
Vue中编译器会先对template进行解析，这一步称为parse，结束之后会得到一个JS对象，我们成为抽象语法树AST
然后是对AST进行深加工的转换过程，这一步称为transform
最后将前面得到的AST生成（generate）JS代码，也就是render函数；