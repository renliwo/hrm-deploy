# Intro
专门为钉钉人力窝项目打造的一键发布工具。
# Why
背景： 目前我们的发布流程是这样的
git tag publish/版本号
git push origin publish/版本号

然后去cdn（https://g.alicdn.com/dingding/react-hrm-h5/version/index.js） 上查看是否发布成功。
我觉得这已经花费我一定的时间了，而且新来的同学不得不学习这种繁琐的东西。
为什么不能自动化呢？ 借用墨菲定律下， 该自动化的终将实现自动化。
自动化真的不止是减少时间，更重要的是减少出错的可能。
软件工程领域有这么一句话，减少bug有两种方式，一种是少写代码以至于没有明显bug。 二是写很多代码以至于没有明显bug。

> 少写代码，少做重复的事，这是我的信条。


# Usage
```bash
npm i hrm-deploy -g
hrm-deploy --help

hrm-deploy 1.0.1
```
