import { Platform } from 'react-native';

type MarkdownStylesParams = {
	isUser: boolean;
};

export const getMarkdownStyles = ({ isUser }: MarkdownStylesParams) => {
	const textColor = isUser ? '#FFFFFF' : '#000000';
	const backgroundColor = isUser ? '#0A82FF' : '#F1F1F1';
	const codeBackground = isUser
		? 'rgba(255, 255, 255, 0.2)'
		: 'rgba(0, 0, 0, 0.08)';
	const codeFenceBackground = isUser
		? 'rgba(255, 255, 255, 0.15)'
		: 'rgba(0, 0, 0, 0.05)';
	const borderColor = isUser
		? 'rgba(255, 255, 255, 0.3)'
		: 'rgba(0, 0, 0, 0.1)';

	return {
		body: {
			color: textColor,
			fontSize: 16,
			lineHeight: 22,
		},
		heading1: {
			color: textColor,
			fontSize: 24,
			fontWeight: 'bold' as const,
			marginTop: 12,
			marginBottom: 8,
		},
		heading2: {
			color: textColor,
			fontSize: 20,
			fontWeight: 'bold' as const,
			marginTop: 10,
			marginBottom: 6,
		},
		heading3: {
			color: textColor,
			fontSize: 18,
			fontWeight: 'bold' as const,
			marginTop: 8,
			marginBottom: 4,
		},
		strong: {
			fontWeight: 'bold' as const,
			color: textColor,
		},
		em: {
			fontStyle: 'italic' as const,
			color: textColor,
		},
		code_inline: {
			backgroundColor: codeBackground,
			color: isUser ? '#FFFFFF' : '#D63384',
			paddingHorizontal: 6,
			paddingVertical: 2,
			borderRadius: 4,
			fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
			fontSize: 14,
		},
		code_block: {
			backgroundColor: codeFenceBackground,
			color: textColor,
			padding: 12,
			borderRadius: 8,
			fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
			fontSize: 14,
			marginVertical: 8,
		},
		fence: {
			backgroundColor: codeFenceBackground,
			color: textColor,
			padding: 12,
			borderRadius: 8,
			fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
			fontSize: 14,
			marginVertical: 8,
		},
		blockquote: {
			backgroundColor: isUser
				? 'rgba(255, 255, 255, 0.1)'
				: 'rgba(255, 193, 7, 0.1)',
			borderLeftWidth: 4,
			borderLeftColor: isUser ? 'rgba(255, 255, 255, 0.5)' : '#FFC107',
			paddingHorizontal: 12,
			paddingVertical: 8,
			marginVertical: 8,
		},
		bullet_list: {
			marginVertical: 4,
		},
		ordered_list: {
			marginVertical: 4,
		},
		list_item: {
			flexDirection: 'row' as const,
			marginVertical: 2,
		},
		bullet_list_icon: {
			color: textColor,
			marginRight: 8,
		},
		ordered_list_icon: {
			color: textColor,
			marginRight: 8,
		},
		table: {
			borderWidth: 1,
			borderColor: borderColor,
			borderRadius: 4,
			marginVertical: 8,
		},
		thead: {
			backgroundColor: isUser
				? 'rgba(255, 255, 255, 0.1)'
				: 'rgba(0, 0, 0, 0.05)',
		},
		th: {
			padding: 8,
			borderRightWidth: 1,
			borderBottomWidth: 1,
			borderColor: borderColor,
			fontWeight: 'bold' as const,
		},
		tr: {
			borderBottomWidth: 1,
			borderColor: isUser ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
		},
		td: {
			padding: 8,
			borderRightWidth: 1,
			borderColor: isUser ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
		},
		link: {
			color: isUser ? '#FFFFFF' : '#0A82FF',
			textDecorationLine: 'underline' as const,
		},
		hr: {
			backgroundColor: isUser
				? 'rgba(255, 255, 255, 0.3)'
				: 'rgba(0, 0, 0, 0.1)',
			height: 1,
			marginVertical: 12,
		},
		paragraph: {
			marginVertical: 4,
			flexWrap: 'wrap' as const,
			flexDirection: 'row' as const,
			alignItems: 'flex-start' as const,
			justifyContent: 'flex-start' as const,
		},
	};
};
