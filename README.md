# 西浦太仓 AR 校园导览 Demo

ENT303TC · Table 26 Team 10  
正式项目名称：**Rokid: AR Application Challenge (July)**

用于项目展示、早期访谈与界面可用性探索的校园导览网页，包含太仓校区概念模型、第一/第三人称漫游、AR 提示模拟和轻量地图。

- 在线体验：https://raymondhuang31.github.io/taicang-ar-campus-team10/
- 原 Vercel 地址：https://taicang-ar-campus-team10.vercel.app/ （部分网络连接超时）
- 兼容地图：https://raymondhuang31.github.io/taicang-ar-campus-team10/compat.html
- 当前源码：**v0.6.0**；文档更新：2026-10-28。

## 本地运行

安装 Python 3，在仓库目录执行：

```sh
python -m http.server 8080
```

打开 http://localhost:8080 。必须通过 HTTP 运行，不要双击 HTML。无需 npm 依赖或密钥。

## 操作

1. PC 总览中拖动旋转、滚轮缩放；“沙盘俯视”检查布局。
2. 选择目的地，点击“进入 AR 导览”。
3. WASD / 方向键移动，鼠标环顾，Shift 奔跑，Esc 释放鼠标。
4. V 切换第一/第三人称，M 查看地图。
5. 手机先显示轻量地图，手动选择 3D；目前优先维护 PC。

## 文档

- [版本迭代记录](CHANGELOG.md)
- [技术与维护说明](docs/TECHNICAL.md)
- [验证记录与已知问题](docs/VALIDATION.md)
- [模型参考资料](MODEL_REFERENCES.md)
- [第三方版权说明](THIRD_PARTY_NOTICES.md)

## 能力边界

这是网页原型，不是实景定位系统。模型依据照片估算，未达到 1:1；阅览区为概念场景。没有 GPS、Rokid SDK、头部跟踪或空间锚定。团队设备为 Rokid Max Pro Enterprise 与 Station Pro Enterprise，尚未接入本网页。

研究记录仅在浏览器内存生成，取得参与同意后由研究员本地下载 JSON；仓库不含参与者数据。网页体验不能替代真实校园或眼镜实验。

用户反馈 v0.5.2 后苹果可打开、华为仍失败，原因未确认，按要求暂停手机专项排查。不同网络下 Vercel 域名的可达性未全面验证。

## 历史与维护

仓库从 v0.5.2 实际源码快照开始。早期版本根据项目记录整理为 CHANGELOG，不补造历史提交或早期源码。最初归档不改变 Vercel。2026-10-28 已启用 GitHub Pages，从 main 分支根目录自动发布备用站点；Vercel 仍单独部署。

当前首页内嵌 CSS 和轻量地图代码，修改独立副本不会自动更新首页，详见技术说明。v0.6.0 的轻量地图与导航弹窗共用 SVG 底图，依据现场标识修正了 E 栋图书馆、分翼编号和体育设施方位；桥梁增加缓拱与步行高度跟随。
