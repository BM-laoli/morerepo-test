'use strict';

function add(a, b) {
	console.log("tools库，调用函数add,入参：%d, %d",a ,b)
    return a + b;
}
function min(a, b) {
	console.log("tools库，调用函数min,入参：%d, %d",a ,b)
    return Math.min(a, b);
}

// 我现在再来发布一下 发布失败之后没有 重发布的配置选项了 
function test555(cb1,bc2)  {
  console.log("--->", cb1(), bc2())
  return 6666
}

module.exports = { add, min };
