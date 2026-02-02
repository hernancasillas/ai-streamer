import React, { useState } from 'react';
import {
	View,
	TextInput,
	TouchableOpacity,
	Text,
	StyleSheet,
	Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
	onSend: (message: string) => void;
	onStop?: () => void;
	disabled?: boolean;
	isStreaming?: boolean;
}

const ChatInput = ({ onSend, onStop, disabled, isStreaming }: Props) => {
	const [text, setText] = useState('');
	const [inputHeight, setInputHeight] = useState(40);
	const insets = useSafeAreaInsets();

	const handleSend = () => {
		if (text.trim() && !disabled) {
			onSend(text.trim());
			setText('');
			setInputHeight(40);
		}
	};

	const handleContentSizeChange = (event: any) => {
		const height = event.nativeEvent.contentSize.height;
		setInputHeight(Math.min(Math.max(40, height), 100));
	};

	return (
		<View
			style={[
				styles.container,
				{
					paddingBottom: Math.max(insets.bottom, 8),
				},
			]}
		>
			<TextInput
				style={[styles.input, { height: inputHeight }]}
				value={text}
				onChangeText={setText}
				onContentSizeChange={handleContentSizeChange}
				placeholder="Type a message..."
				placeholderTextColor="#999999"
				multiline
				maxLength={500}
				editable={!disabled}
				textAlignVertical="center"
			/>

			{isStreaming ? (
				<TouchableOpacity
					style={[styles.button, styles.stopButton]}
					onPress={onStop}
				>
					<Text style={styles.buttonText}>Stop</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={[
						styles.button,
						(!text.trim() || disabled) && styles.buttonDisabled,
					]}
					onPress={handleSend}
					disabled={!text.trim() || disabled}
				>
					<Text style={styles.buttonText}>Send</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingTop: 12,
		paddingHorizontal: 16,
		backgroundColor: '#FFFFFF',
		borderTopWidth: 1,
		borderTopColor: '#E0E0E0',
		alignItems: 'flex-end',
	},
	input: {
		flex: 1,
		minHeight: 40,
		maxHeight: 100,
		backgroundColor: '#F5F5F5',
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingTop: Platform.OS === 'ios' ? 10 : 8,
		paddingBottom: Platform.OS === 'ios' ? 10 : 8,
		marginRight: 8,
		fontSize: 16,
		color: '#000000',
	},
	button: {
		backgroundColor: '#007AFF',
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 10,
		justifyContent: 'center',
		minHeight: 40,
	},
	stopButton: {
		backgroundColor: '#F97272',
	},
	buttonDisabled: {
		backgroundColor: '#CCCCCC',
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
});

export default ChatInput;
