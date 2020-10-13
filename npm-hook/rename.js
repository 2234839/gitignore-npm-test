//引入模块
var fs = require("fs");

const renameMap = {
  ".gitignore": "_gitignore_",
  _gitignore_: ".gitignore",
};

function rename(src) {
  // 读取目录中的所有文件/目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err;
    }
    paths.forEach(function (path) {
      //拼合路径
      const fullSrc = src + "/" + path;
      //判断文件状态
      fs.stat(fullSrc, function (err, st) {
        if (err) {
          throw err;
        }
        // 判断是否为文件
        if (st.isFile()) {
          if (renameMap.hasOwnProperty(path)) {
            fs.rename(fullSrc, src + "/" + renameMap[path], function (err) {
              if (err) throw err;
            });
          }
        }
        // 如果是目录则递归调用自身
        else if (st.isDirectory()) {
          exists(fullSrc, rename);
        }
      });
    });
  });
  var exists = function (src, callback) {
    callback(src);
  };
}
rename("./");
