# 项目链接功能使用说明

## 🔗 链接类型支持

现在每个项目都支持多种类型的链接，通过 `links` 数组配置：

### 支持的链接类型：

1. **`github`** - GitHub 仓库链接
2. **`youtube`** - YouTube 视频链接  
3. **`video`** - 本地视频文件
4. **`demo`** - 在线演示链接
5. **`website`** - 项目网站
6. **`download`** - 下载链接

## 📝 配置示例

在 `src/data/mockData.ts` 中配置项目链接：

```typescript
{
  id: '1',
  title: 'My Project',
  description: '项目描述...',
  // ... 其他配置
  links: [
    { type: 'github', url: 'https://github.com/username/repo' },
    { type: 'demo', url: 'https://my-demo.vercel.app' },
    { type: 'youtube', url: 'https://youtube.com/watch?v=video-id' },
    { type: 'video', url: '/assets/videos/demo.mp4' },
    { type: 'download', url: 'https://github.com/username/repo/releases' },
    { type: 'website', url: 'https://my-project-website.com' }
  ]
}
```

## 🎨 视觉效果

- **项目卡片悬停时**: 显示前2个链接作为覆盖按钮
- **项目详情区域**: 显示所有链接按钮
- **不同链接类型**: 使用不同的图标和悬停颜色
  - GitHub: 黑色
  - YouTube: 红色  
  - Demo/Website: 蓝色
  - 其他: 默认猫咪色

## 📁 本地资源

将视频文件放在 `public/assets/videos/` 目录下：

```
public/
├── assets/
│   └── videos/
│       ├── project1-demo.mp4
│       ├── ar-game-demo.mp4
│       └── hololens-demo.mp4
```

然后在配置中引用：

```typescript
{ type: 'video', url: '/assets/videos/project1-demo.mp4' }
```

## 🔧 自定义标签

可以为每个链接指定自定义标签：

```typescript
{ 
  type: 'github', 
  url: 'https://github.com/username/repo',
  label: 'Source Code' 
}
```

如果不指定 `label`，将使用默认标签。

## 📱 响应式设计

- 移动端会自动换行显示链接按钮
- 悬停效果在移动端会转换为点击效果
- 图标大小会根据屏幕尺寸调整
