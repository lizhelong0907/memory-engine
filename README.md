# Memory Engine

OpenClaw 3.8+ 智能上下文管理与记忆系统插件。

## 功能特点

- **本地向量存储**：基于 SQLite + ONNX 本地推理，无需联网
- **语义搜索**：支持语义相似度匹配
- **自动知识提取**：从对话中自动提取关键信息
- **记忆分类**：支持多种记忆类型（fact/experience/lesson/preference/skill）
- **重要性评分**：根据重要性自动过滤低价值记忆
- **去重**：基于语义相似度自动去重

## 环境要求

- OpenClaw 3.8+
- Node.js 18+
- Windows/macOS/Linux

## 安装

### 方式一：直接安装（推荐）

```bash
# 克隆或下载本项目
# 将 dist 目录复制到 OpenClaw 插件目录
cp -r dist ~/.openclaw/extensions/memory-engine
```

### 方式二：从源码构建

```bash
# 安装依赖
npm install

# 编译
npm run build
```

## 配置

配置文件：`openclaw.plugin.json`

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dbPath | string | ./data/memories.db | SQLite 数据库路径 |
| recallTopK | number | 5 | 最多召回多少条记忆 |
| memoryFetchLimit | number | 100 | 每次检索拉取的记忆上限 |
| similarityThreshold | number | 0.3 | 相似度阈值（越高越严格） |
| semanticThreshold | number | 0.35 | 语义触发阈值 |
| embeddingCacheSize | number | 1000 | embedding 缓存大小 |
| storeMinLength | number | 6 | 写入记忆的最小长度 |
| dedupSimilarityThreshold | number | 0.92 | 语义去重阈值 |
| cleanupEnabled | boolean | false | 是否启用自动归档 |
| cleanupMaxAgeDays | number | 90 | 自动归档天数 |
| cleanupMinImportance | number | 0.4 | 归档最小重要性 |

## 工具

插件提供以下 OpenClaw 工具：

### memory_save

保存重要信息到记忆系统

```json
{
  "content": "要记忆的内容",
  "type": "fact|experience|lesson|preference|skill",
  "importance": 0.0-1.0
}
```

### memory_search

搜索记忆

```json
{
  "query": "搜索关键词",
  "limit": 5
}
```

### memory_list

列出所有记忆

```json
{
  "type": "fact|experience|lesson|preference|skill",
  "limit": 20
}
```

### memory_stats

获取记忆统计信息（无需参数）

## 使用示例

### 通过 OpenClaw 对话

**记住偏好：**
```
记住我爱吃水煎饺
```

**搜索记忆：**
```
搜索我喜欢吃什么
```

**列出记忆：**
```
列出我的所有偏好
```

### 编程调用

```javascript
const { createMemoryEngine } = require('./dist/memory-engine');

async function main() {
  const engine = await createMemoryEngine({
    dbPath: './data/memories.db'
  });

  // 保存记忆
  await engine.addMemory({
    content: '用户爱吃水煎饺',
    type: 'preference',
    importance: 0.8
  });

  // 搜索记忆
  const results = await engine.searchMemories('吃');
  console.log(results);

  await engine.shutdown();
}

main();
```

## 数据库

- 默认路径：`~/.openclaw/memory/memories.db`
- 使用 SQLite 存储
- 可以用任何 SQLite 工具查看

```bash
# 查看数据库
sqlite3 ~/.openclaw/memory/memories.db "SELECT * FROM memories;"
```

## 模型

内置模型：`models/all-MiniLM-L6-v2.onnx`

- 维度：384
- 大小：~90MB
- 无需额外下载

## 常见问题

### 1. 模型加载失败

确保 `dist/models/all-MiniLM-L6-v2.onnx` 存在。

### 2. 中文搜索不工作

当前版本使用英文模型，中文语义搜索可能有局限。可以通过关键词匹配辅助搜索。

### 3. 数据库被锁定

确保没有其他进程同时访问数据库。

## 调试

启用调试日志：

```bash
export MEMORY_ENGINE_DEBUG=1
```

## 更新日志

### v2.0.0

- 初始版本
- 支持 memory_save/memory_search/memory_list/memory_stats 工具
- 内置 ONNX embedding 模型
- SQLite 本地存储

## 许可证

MIT
