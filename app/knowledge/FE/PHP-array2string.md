# PHP数组转换字符串的两种方法

## implode

```php
$arr = ['php','python','java','c'];
$str = implode(' ',$arr);
```

以上代码就完成了数组转换为string的操作，implode函数需要俩参数，分别是“glue:”+链接标记和需要处理的数组。

## 循环遍历

```php
$arr = ['php','python','java','c'];
$str1 = '';
foreach($arr as $v){
    $str1 .= ' '.$v;
};
```

以上代码同样完成了处理。