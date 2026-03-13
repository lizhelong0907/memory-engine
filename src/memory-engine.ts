// 核心引擎
import { Store } from './store';
import { KnowledgeExtractor } from './extractor';
import { ContextCompressor } from './compressor';
import {
 MemoryRecord,
 MemoryCreateInput,
 SearchOptions,
 SearchResult,
 ContextMessage,
 CompressionResult,
 KnowledgeExtractionResult
} from './types';

// Debug mode toggle
const DEBUG_MODE = process.env.MEMORY_ENGINE_DEBUG === 'true' || process.env.MEMORY_ENGINE_DEBUG === '1';

const debugLog = (...args: any[]) => {
 if (DEBUG_MODE) {
 console.log('[memory-engine]', ...args);
 }
};

export interface MemoryEngineConfig {
 dbPath?: string;
 enableCompression?: boolean;
 maxMessages?: number;
 keepRecentCount?: number;
}

export class MemoryEngine {
 private store!: Store;
 private extractor: KnowledgeExtractor;
 private compressor: ContextCompressor;
 private initialized: boolean = false;
 public embeddingModel: any; // EmbeddingModel 类型

 constructor(config: MemoryEngineConfig = {}) {
 const dbPath = config.dbPath || ':memory:';
 this.store = new Store(dbPath);
 this.extractor = new KnowledgeExtractor();
 this.compressor = new ContextCompressor();

 if (config.keepRecentCount) {
 this.compressor.setKeepRecentCount(config.keepRecentCount);
 }
 this.compressor.setEnableCompression(config.enableCompression !== false);
 }

 // 初始化引擎
 async initialize(): Promise<void> {
 if (this.initialized) return;

 await this.store.initialize();
 await this.extractor.initialize();

 this.initialized = true;
 debugLog('✅ Engine initialized');
 }

 // 检查是否初始化
 isInitialized(): boolean {
 return this.initialized;
 }

 // 添加记忆
 async addMemory(input: MemoryCreateInput): Promise<MemoryRecord> {
 const record = this.store.create(input);
 if (!record) {
 debugLog('ℹ️ Memory already exists, skipped');
 return null as any;
 }
 debugLog('💾 Memory saved:', record.content.substring(0,30));
 return record;
 }

 // 搜索记忆
 async searchMemories(query: string, options?: SearchOptions): Promise<SearchResult[]> {
 const searchOptions: SearchOptions = {
 query,
 limit: options?.limit ||10,
 status: 'active',
 ...options
 };

 const memories = this.store.search(searchOptions);
 return memories.map(memory => ({
 memory,
 score: memory.importance ||0.5
 }));
 }

 // 获取所有记忆
 async getAllMemories(limit: number =50): Promise<MemoryRecord[]> {
 return this.store.getAllMemories(limit);
 }

 // 提取知识
 async extractKnowledge(content: string, messageType: 'user' | 'ai' = 'user'): Promise<KnowledgeExtractionResult | null> {
 if (messageType === 'user') {
 return await this.extractor.extractFromUserMessage(content);
 }
 return this.extractor.extractFromAIMessage(content);
 }

 // 从对话对提取知识
 async extractFromConversationPair(userMessage: string, aiMessage: string): Promise<KnowledgeExtractionResult[]> {
 return await this.extractor.extractFromConversationPair(userMessage, aiMessage);
 }

 // 压缩上下文
 compressContext(messages: ContextMessage[]): CompressionResult {
 return this.compressor.compress(messages);
 }

 // 获取上下文（带压缩）
 getContext(messages: ContextMessage[], _tokenBudget?: number): ContextMessage[] {
 const result = this.compressContext(messages);
 return this.compressor.getPreservedMessages(result.messages);
 }

 // 获取统计信息
 getStatistics(): any {
 return this.store.getStats();
 }

 //归档旧记忆
 archiveOldMemories(maxAgeDays: number, minImportance: number): number {
 return this.store.archiveOldMemories(maxAgeDays, minImportance);
 }

 //关闭引擎
 async shutdown(): Promise<void> {
 if (this.store) {
 this.store.close();
 }
 debugLog('✅ Engine shutdown');
 }
}

// 创建引擎实例
export async function createMemoryEngine(config: MemoryEngineConfig = {}): Promise<MemoryEngine> {
 const engine = new MemoryEngine(config);
 await engine.initialize();
 return engine;
}
