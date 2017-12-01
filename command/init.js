/**
 * author: GavinLuo
 * site: https://gavinluo.cn/
 * date: 2017/11/30 16:06
 */
'use strict';
// 参数输入
const { prompt } = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
// 拉取项目，不下载 .git/ 文件
const download = require('download-git-repo');

let tpList = require(`${__dirname}/../templates`);

const question = [
    {
        type: 'input',
        name: 'name',
        message: 'Template name:',
        validate (val) {
            if (tpList[val]) {
                return true
            } else if (val === '') {
                return 'Name is required!'
            } else if (!tpList[val]) {
                return 'This template doesn\'t exists.'
            }
        }
    },
    {
        type: 'input',
        name: 'project',
        message: 'Project name:',
        validate (val) {
            if (val !== '') {
                return true
            }
            return 'Project name is required!'
        }
    },
    {
        type: 'input',
        name: 'place',
        message: 'Where to init the project:',
        default: './'
    }
];

module.exports = prompt(question).then(({ name, project, place }) => {
    const gitPlace = tpList[name]['owner/name'];
    const gitBranch = tpList[name]['branch'];

    downloadRepo(`${gitPlace}#${gitBranch}`, `${place}/${project}`);
});

/**
 * download git repo
 * @param {String} template
 * @param {String} projectPath
 */
function downloadRepo(template, projectPath) {
    const spinner = ora('Downloading template...');

    spinner.start();
    // download-git-repo 下载 Git 项目
    download(template, projectPath, (err) => {
        if(err){
            console.log(chalk.red(err));
            process.exit();
        }
        spinner.stop();
        console.log(chalk.green(`Project initialized successfully！`));
    });

}
