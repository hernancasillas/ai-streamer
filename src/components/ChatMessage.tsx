import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Message } from '../types/message.types';
import { getMarkdownStyles } from '../utils/markdownStyles';

interface Props {
	message: Message;
}

const ChatMessage = ({ message }: Props) => {
	const isUser = message.role === 'user';

	const markdownStyles = useMemo(() => getMarkdownStyles({ isUser }), [isUser]);

	return (
		<View
			style={[
				styles.container,
				isUser ? styles.userContainer : styles.aiContainer,
			]}
		>
			<View
				style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}
			>
				<Markdown style={markdownStyles}>{message.content}</Markdown>

				{message.isStreaming && (
					<View style={styles.cursorContainer}>
						<View
							style={[
								styles.cursor,
								{ backgroundColor: isUser ? '#FFFFFF' : '#000000' },
							]}
						/>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 6,
		width: '100%',
	},
	userContainer: {
		alignItems: 'flex-end',
	},
	aiContainer: {
		alignItems: 'flex-start',
	},
	bubble: {
		maxWidth: '85%',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	userBubble: {
		backgroundColor: '#0A82FF',
		borderBottomRightRadius: 4,
	},
	aiBubble: {
		backgroundColor: '#F1F1F1',
		borderBottomLeftRadius: 4,
	},
	cursorContainer: {
		marginTop: 4,
		flexDirection: 'row',
	},
	cursor: {
		width: 8,
		height: 16,
		opacity: 0.7,
	},
});

export default memo(ChatMessage, (prevProps, nextProps) => {
	return (
		prevProps.message.content === nextProps.message.content &&
		prevProps.message.isStreaming === nextProps.message.isStreaming
	);
});
