# 电影管理系统

服务器端：提供API接口

客户端：ajax请求接口获得数据，使用数据渲染页面

服务器端： ts + express + mongodb + class-validator + class-transformer

客户端： ts + react全家桶 (react-router、redux、 antd)

开发顺序

1. 服务器端

使用postman测试

2. 客户端

> tslint: 跟eslint相似，是用于检查代码风格

react脚手架

create-react-app

nextjs

umijs

先开发客户端对ajax请求

有的时候，服务器和客户端会共用一个类型，如果要处理此处的重复代码问题，最佳做法是自行使用webpack搭建工程