import React, { useEffect, useRef } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	View,
	Text,
	StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MessageList from './src/components/MessageList';
import ChatInput from './src/components/ChatInput';
import { useChatStore } from './src/store/chatStore';
import { useStreamingMessage } from './src/hooks/useStreamingMessage';

function ChatScreen() {
	const {
		messages,
		addUserMessage,
		updateStreamingMessage,
		completeStreamingMessage,
		streamStatus,
		setStreamStatus,
	} = useChatStore();

	const { streamingContent, isStreaming, startStream, stopStream } =
		useStreamingMessage();

	const currentAiMessageIdRef = useRef<string | null>(null);

	useEffect(() => {
		if (isStreaming && streamingContent) {
			if (!currentAiMessageIdRef.current) {
				currentAiMessageIdRef.current = `ai-${Date.now()}`;
			}
			updateStreamingMessage(currentAiMessageIdRef.current, streamingContent);
		}
	}, [streamingContent, isStreaming, updateStreamingMessage]);

	useEffect(() => {
		if (
			!isStreaming &&
			currentAiMessageIdRef.current &&
			streamStatus === 'streaming'
		) {
			completeStreamingMessage(currentAiMessageIdRef.current);
			currentAiMessageIdRef.current = null;
			setStreamStatus('idle');
		}
	}, [isStreaming, streamStatus, completeStreamingMessage, setStreamStatus]);

	const handleSend = (message: string) => {
		if (isStreaming) return;
		currentAiMessageIdRef.current = null;
		addUserMessage(message);
		setStreamStatus('streaming');
		setTimeout(() => {
			startStream();
		}, 500);
	};

	const handleStop = () => {
		stopStream();
		if (currentAiMessageIdRef.current) {
			completeStreamingMessage(currentAiMessageIdRef.current);
			currentAiMessageIdRef.current = null;
		}
		setStreamStatus('idle');
	};

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			<StatusBar barStyle="dark-content" />
			<View style={styles.header}>
				<Text style={styles.headerTitle}>AI Streamer</Text>
			</View>
			<KeyboardAvoidingView
				style={styles.keyboardView}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={0}
			>
				<MessageList messages={messages} isStreaming={isStreaming} />
				<ChatInput
					onSend={handleSend}
					onStop={handleStop}
					disabled={isStreaming}
					isStreaming={isStreaming}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

export default function App() {
	return (
		<SafeAreaProvider>
			<ChatScreen />
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	header: {
		backgroundColor: '#FFFFFF',
		paddingVertical: 16,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#E0E0E0',
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#000000',
		textAlign: 'center',
	},
	keyboardView: {
		flex: 1,
	},
});
