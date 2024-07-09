**圣杯布局**和**双飞翼布局**解决问题的方案在前一半是相同的，即：

中间栏宽度设置为100%

三栏全部float浮动

左右两栏加上负margin让其跟中间栏p并排，以形成三栏布局。

不同在于解决中间栏p内容不被遮挡问题的思路不一样。

1. 圣杯布局

将三栏的外包裹层设置左右padding-left和padding-right

将左右两个p用相对布局position: relative并分别配合right和left属性，相对自身移动以便不遮挡中间p

2. 双飞翼布局

中间p内部创建子p用于放置内容

在该子p里用margin-left和margin-right为左右两栏p留出位置

多了1个p，少用4个css属性（圣杯布局中间pp的adding-left和padding-right这2个属性，加上左右两个p用相对布局position: relative及对应的right和left共4个属性，一共6个；而双飞翼布局子p里用margin-left和margin-right共2个属性，6-2=4）。

并且双飞翼布局还有个好处，让Main变成BFC元素了，屏幕宽度缩小Main也不会被挤下去，圣杯布局就会被挤下去。