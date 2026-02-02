export interface Message {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	isStreaming?: boolean;
	timestamp: number;
}

export type StreamStatus = 'idle' | 'streaming' | 'stopped';
