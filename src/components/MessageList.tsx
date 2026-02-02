import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ChatMessage from './ChatMessage';
import { Message } from '../types/message.types';
import { useAutoScroll } from '../hooks/useAutoScroll';

const ChevronDownIcon = () => (
	<View style={styles.icon}>
		<View style={styles.chevron} />
	</View>
);

interface Props {
	messages: Message[];
	isStreaming: boolean;
}

const MessageList = ({ messages, isStreaming }: Props) => {
	const {
		listRef,
		isAtBottom,
		buttonOpacity,
		scrollToBottom,
		handleScrollBeginDrag,
		handleScrollEndDrag,
		handleMomentumScrollEnd,
	} = useAutoScroll(messages, isStreaming, {
		threshold: 200,
	});

	return (
		<View style={styles.container}>
			<FlashList
				ref={listRef}
				data={messages}
				renderItem={({ item }) => <ChatMessage message={item} />}
				keyExtractor={(item) => item.id}
				onScrollBeginDrag={handleScrollBeginDrag}
				onScrollEndDrag={handleScrollEndDrag}
				onMomentumScrollEnd={handleMomentumScrollEnd}
				scrollEventThrottle={16}
				contentContainerStyle={styles.contentContainer}
			/>

			{/* Botón flotante para volver al bottom */}
			<Animated.View
				style={[
					styles.scrollToBottomButton,
					{
						opacity: buttonOpacity,
						pointerEvents: isAtBottom ? 'none' : 'auto',
					},
				]}
			>
				<TouchableOpacity
					style={styles.buttonTouchable}
					onPress={scrollToBottom}
					activeOpacity={0.7}
				>
					<ChevronDownIcon />
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	contentContainer: {
		paddingTop: 16,
		paddingBottom: 8,
	},
	scrollToBottomButton: {
		position: 'absolute',
		bottom: 16,
		right: 16,
		zIndex: 1000,
	},
	buttonTouchable: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	icon: {
		width: 20,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	chevron: {
		width: 12,
		height: 12,
		borderBottomWidth: 2,
		borderRightWidth: 2,
		borderColor: '#666666',
		transform: [{ rotate: '45deg' }, { translateY: -2 }],
	},
});

export default MessageList;
