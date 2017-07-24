#!/usr/bin/env node

const program = require("commander");
const request = require("request");
const fetch = require("isomorphic-fetch");
const spawn = require("child_process").spawn;

// init
program
  .version(require("../package.json").version)
  .usage("[version] [options] ")
  .parse(process.argv);

function checkCDN(version) {
  // 如果cdn 已经有这个文件了，那么说明不应该发布这个版本了
  let result = false;
  return fetch(
    `https://g.alicdn.com/dingding/react-hrm-h5/${version}/index.js`
  ).then(res => {
    if (res.status !== 200) {
      result = true;
    }
    return result;
  });
}

function checkDeployStatus(version) {
  request(
    `https://g.alicdn.com/dingding/react-hrm-h5/${version}/index.js`,
    function(error, response, body) {
      if (response.statusCode === 200) {
        console.log(`发布成功！当前线上版本为${version}`);
      } else {
        console.error(`发布失败。CDN上未找到该文件.\n您正在操作的版本是${version}`);
      }
    }
  );
}

async function startProcess() {
  // collect args
  const version = program.args[0];

  if (!version) {
    console.warn("**请先输入要发布的版本号**");
    return 1;
  }

  const notFound = await checkCDN(version);
  if (notFound) {
    newbranch = spawn("git", ["checkout", "-b", `daily/${version}`]);
    // 捕获标准错误输出并将其打印到控制台
    newbranch.on("exit", function(code) {
      if (code === 128) {
        // 已经有这个分支了
        checkout = spawn("git", ["checkout", `daily/${version}`]);
      }
      track = spawn("git", [
        "branch",
        `--set-upstream-to=origin/daily/${version}`,
        `daily/${version}`
      ]);
      track.on("exit", code => {
        if (code === 1) {
          console.info("找不到远程分支，请确保远程有对应的分支. git branch --remote");
          process.exit(code);
        } // 未能找到对应的远程分支
      });
      pull = spawn("git", ["pull"]);

      tag = spawn("git", ["tag", `publish/${version}`]);
      // 捕获标准错误输出并将其打印到控制台
      tag.stderr.on("data", function(data) {
        console.log("" + data);
      });

      push = spawn("git", ["push", "origin", `publish/${version}`]);
      // 捕获标准错误输出并将其打印到控制台
      push.stderr.on("data", function(data) {
        console.log("" + data);
        checkDeployStatus(version);
      });
    });
  } else {
    console.error("不能发布已经存在的版本");
  }
}

startProcess();
