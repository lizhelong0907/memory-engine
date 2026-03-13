# Memory Engine 配置说明

以下配置通过环境变量控制，均可选。

##记忆检索

- `MEMORY_ENGINE_RECALL_TOPK`
 -说明：最多召回多少条记忆
 - 默认：`5`

- `MEMORY_ENGINE_MEMORY_LIMIT`
 -说明：每次检索最多拉取多少条记忆用于相似度计算
 - 默认：`100`

- `MEMORY_ENGINE_SIM_THRESHOLD`
 -说明：记忆相似度过滤阈值（越高越严格）
 - 默认：`0.3`

- `MEMORY_ENGINE_SEM_THRESHOLD`
 -说明：语义检索触发阈值（越高越严格）
 - 默认：`0.35`

## embedding 缓存

- `MEMORY_ENGINE_EMBED_CACHE_SIZE`
 -说明：embedding 缓存最大条目数
 - 默认：`1000`

## 数据库路径

- `MEMORY_ENGINE_DB_PATH`
 -说明：SQLite 数据库路径
 - 默认：`~/.openclaw/memory/memories.db`

## 写入控制

- `MEMORY_ENGINE_STORE_MIN_LEN`
 -说明：写入记忆的最小长度
 - 默认：`6`

- `MEMORY_ENGINE_DEDUP_SIM`
 -说明：语义近似去重阈值（越高越严格）
 - 默认：`0.92`

## 自动归档

- `MEMORY_ENGINE_CLEANUP_ENABLED`
 -说明：是否启用自动归档
 - 默认：`false`

- `MEMORY_ENGINE_CLEANUP_MAX_DAYS`
 -说明：超过多少天的低重要性记忆可归档
 - 默认：`90`

- `MEMORY_ENGINE_CLEANUP_MIN_IMPORTANCE`
 -说明：低于该重要性的记忆可归档
 - 默认：`0.4`

## 调试日志

- `MEMORY_ENGINE_DEBUG`
 -说明：启用调试日志
 - 可选值：`1` 或 `true`
 - 默认：关闭

## 配置优先级

- 插件 config > 环境变量 > 默认值
