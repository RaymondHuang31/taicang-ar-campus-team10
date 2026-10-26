# 技术与维护说明

纯静态 HTML/CSS/JavaScript 网页，无服务端、数据库或登录系统。Three.js r160 使用仓库本地文件。

| 文件 | 用途 |
| --- | --- |
| index.html | 页面、弹窗、内嵌样式、轻量入口、3D 加载器 |
| app.js | 三维模型、碰撞、移动、AR 提示、研究会话 |
| core.mjs | 地点、导航图、最短路径、角度工具 |
| style.css | 样式副本，运行页面使用内嵌版本 |
| lite.js | 轻量地图副本，与当前首页内嵌版有少量差异 |
| compat.html | 无脚本分区图 |
| vercel.json | 静态托管配置 |
| vendor/ | Three.js 与许可证 |

## 修改注意

v0.5.2 为减少首屏请求将 CSS 和轻量脚本内嵌。修改独立文件不会自动更新首页，需检查并同步 index.html。不要直接用 lite.js 覆盖内嵌版本：内嵌版包含默认打开地图、兼容页链接等后续调整。推荐以后增加构建脚本，当前尚未实施。

app.js 主版本为 v0.5.2；模型元数据和 core.mjs 缓存参数仍保留 v0.5.0，不代表它们是独立发布版本。

## 导航

导航坐标是模型单位，不是真实米数。最短路径在导航图上计算，连续移动通过 passable() 检查楼体和水域，桥面可跨水。不支持真实楼层导航。

轻量地图的示意路线独立实现；兼容版仅分区。三种表示尚未完全统一，不能作为实际校园导航依据。

## 性能与加载

静态几何按材质合并。手机限制像素比并关闭阴影，先加载 SVG，再按需加载 3D。回退机制不解决域名、网络或浏览器进程级故障。

## 数据

研究记录保存在内存，取得参与同意后开始，结束时本地下载 JSON；没有上传接口。不要将真实参与者记录提交至仓库。

## 部署

支持静态文件和 ES modules 的 HTTPS 托管即可运行。Vercel 使用仓库根目录输出，无构建步骤。

```sh
npx vercel login
npx vercel link
npx vercel project inspect
npx vercel deploy --prod
```

发布前确认账号、团队和项目。仓库不含 .vercel、.env.local，需自行关联。此次归档不配置自动发布，不改变生产站点。

## 测试

安装 Node.js 后执行：

```sh
node --test tests/core.test.mjs
```

运行时提供 window.demoReady、window.renderStats()、window.navigationState()、window.navigationGeometry、window.campusModelInfo 等检查接口，不含参与者数据。完整三维效果仍需浏览器验证。
