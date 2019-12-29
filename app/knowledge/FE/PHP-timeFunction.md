# PHP时间函数

本文通过两个小例子讲解如何获取当前时间戳和设置时区。

## 通过 time 函数获取当前时间戳

```php
date-default_timezone_set('Asia/Shanghai'); //将当前时区设置成中国（上海）。
$time = time();
echo date('Y-m-d H:i:s',$time);
```

以上代码中，time 函数用来获取当前时间，date 函数用来规定输出的格式。因为我们的输出需要设置当前时区，所以我们设置了时区为上海时间。

## 通过 date 函数获取当前时间戳

```php
echo date('Y-m-d H:i:s');
```

以上代码就会输出正确格式。这里，我们如果不想手动修改时间时区，也可以在配置文件里面修改。
打开```php.ini```配置文件，找到```date.timezone```,删除分号，如果需要就进行修改。这样也可以更改时区。

## 获取昨天和明天的时间

通过date函数我们还能获取其他时间，列如昨天和明天：

date('Y-m-d H:i:s',strtotime('-1 day'));

date('Y-m-d H:i:s',strtotime('+1 day'));

## php time/date 函数

可以阅读官方文档来使用响应函数:

<https://www.php.net/manual/zh/ref.datetime.php>