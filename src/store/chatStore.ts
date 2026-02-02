import { create } from 'zustand';
import { Message, StreamStatus } from '../types/message.types';

interface ChatStore {
	messages: Message[];
	streamStatus: StreamStatus;
	currentStreamingId: string | null;
	addUserMessage: (content: string) => void;
	updateStreamingMessage: (id: string, content: string) => void;
	completeStreamingMessage: (id: string) => void;
	setStreamStatus: (status: StreamStatus) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
	messages: [],
	streamStatus: 'idle',
	currentStreamingId: null,

	addUserMessage: (content) => {
		const userMessage: Message = {
			id: `user-${Date.now()}`,
			role: 'user',
			content,
			timestamp: Date.now(),
		};

		set((state) => ({
			messages: [...state.messages, userMessage],
		}));
	},

	updateStreamingMessage: (id, content) => {
		set((state) => {
			const existingIndex = state.messages.findIndex((m) => m.id === id);

			if (existingIndex !== -1) {
				const updatedMessages = [...state.messages];
				updatedMessages[existingIndex] = {
					...updatedMessages[existingIndex],
					content,
					isStreaming: true,
				};

				return { messages: updatedMessages };
			} else {
				const aiMessage: Message = {
					id,
					role: 'assistant',
					content,
					isStreaming: true,
					timestamp: Date.now(),
				};

				return {
					messages: [...state.messages, aiMessage],
					currentStreamingId: id,
				};
			}
		});
	},

	completeStreamingMessage: (id) => {
		set((state) => ({
			messages: state.messages.map((m) =>
				m.id === id ? { ...m, isStreaming: false } : m,
			),
			currentStreamingId: null,
		}));
	},

	setStreamStatus: (status) => set({ streamStatus: status }),
}));
