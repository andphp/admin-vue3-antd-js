/** module/index.js
 * 常量枚举池
 * 可以根据文件对枚举所属的模块进行拆分
 * 此文件主要是收集模块常量然后统一暴露出去
 */

const EnumModule = {};

const req = (context) => context.keys().map(context);
const options = req(require.context("./", true, /\.js$/)); // 批量导入当前文件所在目录下的.js文件

options.forEach((option) => {
  Object.assign(EnumModule, {
    ...option,
  });
});

export default EnumModule;
