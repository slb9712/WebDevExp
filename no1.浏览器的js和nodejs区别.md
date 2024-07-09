## 浏览器的js和nodejs的区别

1. 全局环境下，node中this指向global，而浏览器中this指向window；
2. 浏览器中可直接或间接的操作DOM和BOM，而node中不会操作DOM和BOM；
3. 浏览器无法执行nodejs中的文件操作等功能。
4. 使用的模块标准不同，nodejs使用的是CommonJs的模块标准，而浏览器使用的是ES的模块标准。所以nodejs中使用的是require()导入模块；浏览器中js使用的是import的方式导入。
5. JS需要浏览器的JS引擎进行解析执行，但是不同浏览器的JS引擎不同，存在兼容性问题。而node.js是基于 chrome v8引擎的运行时环境，无兼容性问题。