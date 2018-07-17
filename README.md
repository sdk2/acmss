# ACM赛事

### [项目Demo](http://acm.sdut.edu.cn/acmss/)

### 主页布局

左侧nav导航 + 右侧iframe

左侧导航栏每层固定宽度为`100px`，目前最多支持两层

右侧iframe的宽度为`100%`，高度在JS中设置始终为`浏览器窗口的高度`

### 目录结构
- acmxs 山东理工大学ACM校赛
- cccc 团体程序设计天梯赛
- ccpc 中国大学生程序设计竞赛
- icpc ACM国际大学生程序设计竞赛
- sd2012 山东省ACM省赛
- sdut_gplt 山东理工大学团体程序设计天梯赛

### 其他说明
在`cccc`文件夹中，年份文件夹为数据，其余内容为PDF阅读器，服务器运行环境为`PHP`

使用`new`小图标请添加代码`<img src="img/new.gif">`到导航标题后

添加新页面需要使用如`获奖名单`等模态框时，注意设置`div.modal-dialog`的宽度为子页面的宽度，一般在模态框div的第二层
