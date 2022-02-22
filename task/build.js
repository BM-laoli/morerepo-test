// build  所有的项目
const { execSync }  = require('child_process');

const start = ()=>{
    console.log('start====>');
    execSync(`ls`, {
      stdio: 'inherit',
    });
}

exports.default = start