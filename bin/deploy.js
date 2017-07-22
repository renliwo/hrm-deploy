#!/usr/bin/env node

const program = require("commander");
const request = require("request");
const spawn = require("child_process").spawn;

// init
program
  .version(require("../package.json").version)
  .usage("[version] [options] ")
  .parse(process.argv);

// collect args
const version = program.args[0];

function checkCDN(version) {
  // 如果cdn 已经有这个文件了，那么说明不应该发布这个版本了
  let result = false;
  request(`xxxxx${version}`, function(error, response, body) {
    if (!error) {
      console.error(`当前版本已经发布，请检查你的版本。您正在操作的版本是${version}`);
    }
    result = true;
  });
  return result;
}

function checkDeployStatus(version) {
  request(`xxxxx${version}`, function(error, response, body) {
    if (!error) {
      console.log(`发布成功！当前线上版本为${version}`);
    } else {
      console.error(`发布失败。您正在操作的版本是${version}`);
    }
  });
}

if (checkCDN(version)) {
  tag = spawn("git", ["tag", `publish/${version}`]);
  //  push = spawn(`sudo git push origin publish/${version}`);
  // 捕获标准输出并将其打印到控制台
  tag.stdout.on("data", function(data) {
    console.log("tag已建立:\n" + data);
  });
  // 捕获标准错误输出并将其打印到控制台
  tag.stderr.on("data", function(data) {
    console.log("tag 建立失败:\n" + data);
  });

  push = spawn("git", ["push", "origin", `publish/${version}`]);
  //  push = spawn(`sudo git push origin publish/${version}`);
  // 捕获标准输出并将其打印到控制台
  push.stdout.on("data", function(data) {
    console.log("tag已推送到远端:\n" + data);
  });
  // 捕获标准错误输出并将其打印到控制台
  push.stderr.on("data", function(data) {
    console.log("tag未能推送到远端:\n" + data);
  });

  checkDeployStatus(version);
}
