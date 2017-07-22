# Intro
专门为钉钉人力窝项目打造的一键发布工具。
# Why
背景： 目前我们的发布流程是这样的
git tag publish/版本号
git push origin publish/版本号

然后去cdn（https://g.alicdn.com/dingding/react-hrm-h5/version/index.js）上查看是否发布成功。

# Usage
```bash
npm i hrm-deploy -g
hrm-deploy --help

hrm-deploy 1.0.1
```