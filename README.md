# [中国各地历年ETC用户数变化一览](https://yutonghan1123.github.io/etctest/)
通过D3.js实现全国各地ETC用户数分布及占有量随时间的变化

## 数据
北京、广东等ETC通行较早的地区数据主要源自公开报道
> 如北京日报[《北京高速路速通卡十多年卖不出10万张》](https://auto.sina.com.cn/news/2009-02-17/0736459396.shtml)

贵州、陕西等ETC通行较晚的地区数据在各地交通运输厅官网、交通运输官方公众号用“ETC”、“黔通卡”等关键词进行搜索而得
> 如广西捷通公众号、[陕西省交通运输厅](http://jtyst.shaanxi.gov.cn/show/173974)

2019年部分地区的数据源自中商产业研究院[《2020年中国ETC盈利模式创新行业市场前景及投资研究报告》](http://pdf.dfcfw.com/pdf/H3_AP202003311377255478_1.pdf)

部分年份缺乏数据的情况下，我根据国家统计局中，当年该地的民用汽车拥有量与日期相近的ETC用户占比计算而得
> 如用2019年的ETC用户数据、2019年民用汽车拥有量和[中国统计年鉴2021](http://www.stats.gov.cn/tjsj/ndsj/2021/indexch.htm)中民用汽车拥有量数据，则可估算出2021年对应地区的ETC用户数

## 动画
通过setInterval，定时改变地图上的圆圈大小、年份和文字描述

开篇的小动画源自Zayan Mohammed在CodePen上的开源小动画[Car Animation using html/css/js](https://codepen.io/az-b/pen/WNEabzO)

## 背景图
背景图改自Freepik上的免费svg[city vector](https://www.freepik.com/free-vector/silhouette-skyline-illustration_3786396.htm#query=city&position=22&from_view=search)

## 文字
主要引用自政府门户网站、前瞻产业研究院[《2022年中国ETC行业全景图谱》](https://www.qianzhan.com/analyst/detail/220/220225-4791e451.html)和[《2022年中国及31省市ETC行业政策汇总及解读》](https://www.qianzhan.com/analyst/detail/220/220304-4a10f690.html)等公开资料
> 如[14个省份实现高速公路ETC联网](http://www.gov.cn/xinwen/2014-12/26/content_2797522.htm)
