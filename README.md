#### 使用方式

* 引入代码库

``` html
<link rel="stylesheet" href="iwindow.css">
<script src="jquery.js" charset="utf-8"></script>
<script src="iwindow.js" charset="utf-8"></script>
```

* 对任何想要弹出的代码调用 iwindow,比如有类名为 `aaa` 的 `div`:

``` javascript
$('.aaa').iwindow('show');
```

* 也可以传入参数

``` javascript
$('.aaa').iwindow('show',{
  dragable:true,
  title:'hello,world',
  titleBgColor:'#e3695f'
})
```

* 预览

![预览](./capture.png?raw=true '预览')
