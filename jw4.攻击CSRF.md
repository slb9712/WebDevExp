## CSRF跨站点请求伪造（Cross Site Request Forgery）
攻击者盗用了用户的身份，以用户的身份发送恶意请求，但是对服务器来说这个请求是合理的，这样就完成了攻击者的目标

## 预防措施
1. 使用验证码，在表单中添加一个随机的数字或者字母验证码，强制要求用户和应用进行直接的交互。
2. HTTP中Referer字段，检查是不是从正确的域名访问过来，它记录了HTTP请求的来源地址。不一定会完全有用，不同浏览器可能在referer上的实现有漏洞。
3. 使用token验证，在HTTP请求头中添加token字段，并且在服务器端建立一个拦截器验证这个token，如果token不对，就拒绝这个请求。
4. 二次验证，敏感操作，用验证码什么得


## 原理
用户打开浏览器，访问目标网站A，输入用户名和密码请求登录 - 用户信息在通过认证后，网站A产生一个cookie信息返回给浏览器，这个时候用户以可正常发送请求到网站A - 用户在没有退出网站A之前在同一个浏览器打开了另一个新网站B。 - 新网站B收到用户请求之后返回一些攻击代码，并发出一个请求要求访问网站A - 浏览器收到这些攻击性代码之后根据新网站B的请求在用户不知道的情况下以用户的权限操作了cookie并向网站A服务器发起了合法的请求。

## 还有SSRF 是服务器端请求伪造，由服务器发起