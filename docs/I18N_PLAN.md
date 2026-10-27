# Portfolio 中英文国际化实施方案

## 目标与默认语言

- 使用 `i18next` 与 `react-i18next`，支持英文 `en` 和简体中文 `zh`。
- 首次访问读取浏览器提供的首选系统语言（`navigator.languages[0]`，缺省读取 `navigator.language`）；`zh`、`zh-CN`、`zh-TW`、`zh-HK` 等中文区域统一显示简体中文，其他语言显示英文。
- 导航栏提供 `中文 / EN` 按钮，桌面与手机均可操作，无需刷新页面。
- 用户手动选择后写入 `localStorage` 的 `portfolio-language`，之后优先使用该选择；未手动选择时继续跟随浏览器语言。存储被禁用时仍可正常使用和切换。
- 同步更新页面 `<html lang>`、标题及描述。初始化完成后再挂载 React，避免首屏先显示另一种语言。

## 已预览的现有文件与修改范围

| 文件 | 已确认的用途及改动 |
| --- | --- |
| `frontend/package.json`、`frontend/package-lock.json` | 当前未配置国际化，加入 i18next 与 React 绑定依赖。 |
| `frontend/src/main.tsx` | 当前直接挂载 App，改为初始化 i18n 后挂载。 |
| `frontend/src/components/Navbar/Navbar.tsx`、`Navbar.module.css` | 导航文案国际化，加入可访问的语言切换按钮，适配手机及中等宽度。 |
| `frontend/src/components/Home/Home.tsx`、`Home.module.css` | 首页职业、简介与查看项目按钮国际化；中文模式在英文姓名下方显示中文姓名。 |
| `frontend/src/components/About/About.tsx` | 个人资料标签、角色、教育及兴趣文案国际化。 |
| `frontend/src/components/Skills/Skills.tsx` | 标题、分类、分类说明、技能数量与通用技能名称国际化；保留分类所用原始技术名称。 |
| `frontend/src/components/Experience/Experience.tsx` | 职位、地区、日期及职责国际化。 |
| `frontend/src/components/Projects/Projects.tsx` | 项目说明、按钮、展开/收起、画廊及无障碍标签国际化。 |
| `frontend/src/components/Playground/Playground.tsx` | 标题、项目说明与入口国际化。 |
| `frontend/src/components/Contact/Contact.tsx` | 联系方式标签、表单字段、提示与提交状态国际化。 |
| `frontend/src/components/Chatbot/Chatbot.tsx` | 聊天界面、欢迎语及客户端错误提示国际化，保留对话及正在进行的请求。 |
| `frontend/src/index.css` | 补充系统中文字体。 |
| `frontend/src/App.css` | 统一按钮与链接的焦点样式，鼠标点击不显示红色描边，键盘导航保留灰色提示。 |
| `frontend/index.html` | 添加可由 i18n 更新的页面描述。 |

`App.tsx` 已确认挂载以上九个组件。`Hero.tsx` 是未被 App 引用的旧组件，不属于本次页面修改范围。

## 新增文件结构

```text
frontend/src/i18n/
  index.ts                   # 初始化、资源注册、页面元信息同步
  language.ts                # 默认语言解析及手动选择的存储
  language.test.ts           # 语言检测、优先级及存储异常验证
  resources.test.ts          # 翻译完整性、插值、内容覆盖验证
  locales/
    en/common.ts             # 导航及主要页面界面文案
    zh/common.ts
    en/interactive.ts        # 项目、实验室、联系及聊天界面文案
    zh/interactive.ts
    en/portfolio.ts          # 从原始英文资料派生的翻译资源
    zh/portfolio.ts          # 对应中文资料
frontend/src/data/usePortfolioData.ts # 按当前语言派生展示资料
docs/CODE_MAP.md                     # 项目功能位置与调用关系
```

## 实施约束

- 保留 `mockData.ts` 的原始英文导出、ID、媒体路径、URL、联系方式及技术标识，后端现有资料一致性测试仍会导入这些数据。
- 使用稳定 ID 关联项目与工作经历翻译。中文展示资料由 hook 派生，切换语言时不重新挂载 App。
- 保留项目轮播、展开状态、画廊、联系表单输入和聊天记录；欢迎语作为界面文案随语言切换，已有用户输入与 AI 回复保留原文。
- 本次完成前端国际化；AI 生成回复及后端检索继续按现有服务处理，不改写对话或扩大到后端多语言检索改造。
- 中文模式的导航姓名显示用户指定的「许伟振」，首页保留英文姓名并在下方增加中文姓名一行；英文模式保留原有显示。
- 不翻译公司/项目品牌、编程语言、库名、引擎名或资源文件，原始资料中的英文姓名保留不变。

## 验证

1. 修改前记录现有前端测试与 lint 结果。
2. 检查中文区域、英文、未支持语言、已保存选择及存储异常。
3. 检查两套资源键、插值和资料条目覆盖，验证实时切换及页面元信息同步。
4. 运行前端单元测试、TypeScript/Vite 构建与 ESLint；核对后端现有资料一致性测试。
5. 浏览器桌面/手机布局检查有助于确认导航和中文排版，按项目约定仅在用户要求后执行 Playwright。

## 官方资料

- [i18next 配置](https://www.i18next.com/overview/configuration-options)
- [react-i18next useTranslation](https://react.i18next.com/latest/usetranslation-hook)

## 执行记录

- 已完成源码预览，先建立本方案，再开始实现。
- 已完成页面及资料的中英文资源、默认语言检测、手动切换记忆和元信息同步；保留原始英文资料及组件状态结构。
- 已根据后续要求移除按钮与链接点击后的红色描边，并加入中文模式的导航及首页姓名显示。
- 修改前：前端 4 项测试通过；ESLint 有 7 处原有错误和 1 处警告。
- 修改后：前端 30 项测试通过；后端 23 项测试通过（包括前后端资料一致性）；TypeScript 与 Vite 生产构建通过。
- 已修复本次触及的 Home、Contact 与 Projects 原有 lint 问题；完整 ESLint 剩余 3 处错误均来自未使用的旧 `Hero.tsx`（`@ts-ignore` 和两个未使用导入），本次未改动该组件。
- 尚未运行浏览器/Playwright；桌面与手机语言切换、中文排版及切换时交互状态保留仍建议进行浏览器验收。
