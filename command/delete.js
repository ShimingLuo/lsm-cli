/**
 * author: GavinLuo
 * site: https://gavinluo.cn/
 * date: 2017/11/30 15:59
 */
'use strict';
const program = require('commander');
const chalk = require('chalk');
const { writeFile } = require('fs');

let tpList = require(`${__dirname}/../templates`);

/* 配置 */
const tmpName = program.args[0];
const password = program.args[1];

(() => {
    if(typeof tmpName === 'string' && !!tpList[tmpName]){

        if(typeof password === 'string' && password === '123456'){
            tpList[tmpName] = undefined;
            writeFile(`${__dirname}/../templates.json`, JSON.stringify(tpList), 'utf-8', (err) => {
                if(err){
                    console.log(chalk.red(err));
                }
                console.log(tpList);
                console.log('\n');
                process.exit();
            });
        }else {
            console.log(chalk.red('删除模板权限不足'));
            process.exit();
        }

    }else {
        console.log(chalk.red(`${tmpName} 模板没有找到！`));
        process.exit();
    }
})();
