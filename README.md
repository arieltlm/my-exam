# 笔试题

> 使用create-react-app起的项目，`npm start`或`yarn start`启动

## 第1题 

exam1

## 第2题

exam2

思路：
* 一个全局数据对象，请求过的就把data储存起来，请求方法`url`参数作为唯一key，每次发起请求前将此xhr推进queue
```js
cacheObj[key] = {
    status: "free", // 当前接口请求的状态 'free|running'
    data: null, // 缓存数据
    errorCount: 0,
    autoRefreshCount: 5, // 自动重试的总次数
    queue: [], // 请求队列
}
```
* 如果key已经存在在对象中且已经请求完成`status = free`，就直接拿对象中的data返回
* 如果key已经存在但是前一个请求正在进行中`status = running`,就找到正在请求的那个对象，然后监听它是否完成，完成后就取值
* 如果key不存在，就发起请求
* 请求失败，根据`autoRefreshCount`次数进行自动重启

## 第3题pipeline组件

pipeline组件在pipeline-box中

