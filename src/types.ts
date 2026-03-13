// Memory Engine 类型定义

//记忆类型
export type MemoryType = 'fact' | 'experience' | 'lesson' | 'preference' | 'skill';

//记忆状态
export type MemoryStatus = 'active' | 'archived';

//记忆记录
export interface MemoryRecord {
 id: string;
 content: string;
 type: MemoryType;
 status: MemoryStatus;
 importance: number;
 tags: string[];
 userId?: string;
 agentId?: string;
 createdAt: number;
 updatedAt: number;
 accessedAt: number;
 accessCount: number;
 version: number;
 metadata?: Record<string, unknown>;
 embedding?: number[];
}

// 创建记忆输入
export interface MemoryCreateInput {
 content: string;
 type?: MemoryType;
 importance?: number;
 tags?: string[];
 userId?: string;
 agentId?: string;
 metadata?: Record<string, unknown>;
 embedding?: number[];
}

// 搜索选项
export interface SearchOptions {
 query?: string;
 limit?: number;
 offset?: number;
 userId?: string;
 type?: MemoryType;
 tags?: string[];
 status?: MemoryStatus;
}

// 搜索结果
export interface SearchResult {
 memory: MemoryRecord;
 score: number;
}

// 上下文消息
export interface ContextMessage {
 role: 'user' | 'assistant' | 'system';
 content: string;
}

// 压缩消息
export interface CompressedMessage {
 role: 'user' | 'assistant' | 'system';
 content: string;
 originalIndex: number;
 preserved: boolean;
 summary?: string;
}

// 压缩结果
export interface CompressionResult {
 messages: CompressedMessage[];
 originalCount: number;
 compressedCount: number;
 compressionRate: number;
 removedCount: number;
}

// 知识提取结果
export interface KnowledgeExtractionResult {
 shouldExtract: boolean;
 content: string;
 knowledgeType: MemoryType;
 importance: number;
 tags: string[];
 metadata?: Record<string, any>;
}

// 上下文引擎参数
export interface AfterTurnParams {
 sessionId: string;
 sessionFile: string;
 messages: any[];
 prePromptMessageCount: number;
}

// afterTurn 返回值
export interface AfterTurnResult {
 processed: boolean;
 totalTokens?: number;
 tokenEstimate?: number;
}

export interface AssembleParams {
 sessionId: string;
 sessionFile: string;
 messages: any[];
 tokenBudget?: number;
}

export interface CompactParams {
 sessionId: string;
 sessionFile: string;
 tokenBudget?: number;
 force?: boolean;
}

// 上下文引擎返回
export interface AssembleResult {
 system: string;
 messages: ContextMessage[];
 tokenEstimate?: number;
 totalTokens?: number;
 systemPromptAddition?: string;
 activeRecallPrompts?: string[];
}

// 插件配置（目前未强制使用）
export interface PluginConfig {
 dbPath?: string;
}
