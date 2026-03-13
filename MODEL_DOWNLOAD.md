# Embedding 模型下载说明

## 模型信息

- **模型名称**: all-MiniLM-L6-v2
- **大小**: ~90MB
- **格式**: ONNX
- **维度**: 384 维

## 手动下载步骤

### 方法1: 浏览器下载

1. 打开浏览器，访问：
   ```
   https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/resolve/main/onnx/model.onnx
   ```

2. 等待文件下载完成

3. 将下载的文件重命名为：
   ```
   D:\memory-engine\models\all-MiniLM-L6-v2.onnx
   ```

### 方法2: 使用 curl（如果可用）

```bash
curl -L "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/resolve/main/onnx/model.onnx" -o "D:\memory-engine\models\all-MiniLM-L6-v2.onnx"
```

### 方法3: 使用 GitHub 镜像

如果 Hugging Face 访问困难，可以尝试：

```bash
# 创建模型目录
mkdir D:\memory-engine\models

# 下载（如果网络允许）
curl -L "https://raw.githubusercontent.com/ukp/sentence-transformers/master/sentence-transformers/sentence-transformers/models/all-MiniLM-L6-v2.onnx" -o "D:\memory-engine\models\all-MiniLM-L6-v2.onnx"
```

## 验证下载

下载完成后，检查文件：

```powershell
# 检查文件是否存在
Test-Path "D:\memory-engine\models\all-MiniLM-L6-v2.onnx"

# 检查文件大小（应该约 50MB）
Get-Item "D:\memory-engine\models\all-MiniLM-L6-v2.onnx" | Select-Object Length
```

## 如果下载失败

由于网络限制，如果无法下载模型，可以使用**简单规则方案**作为临时替代：

1. 当前插件已经部署，使用简单哈希 embedding
2. 虽然精度有限，但基本功能可用
3. 等网络恢复后再下载模型

## 下载完成后的操作

1. 重启 OpenClaw
2. 测试标签提取功能
3. 验证 "我今年41岁" 能正确提取 `age` 标签

---

**提示**: 如果下载困难，可以尝试使用 VPN 或在网络较好的时段下载。
