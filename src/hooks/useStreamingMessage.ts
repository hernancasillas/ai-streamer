import { useState, useCallback, useRef, useEffect } from 'react';
import { MOCK_RESPONSE, STREAM_DELAY_MS } from '../constants/mockData';

export const useStreamingMessage = () => {
	const [streamingContent, setStreamingContent] = useState('');
	const [isStreaming, setIsStreaming] = useState(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const indexRef = useRef(0);
	const fullTextRef = useRef('');

	const startStream = useCallback((fullText: string = MOCK_RESPONSE) => {
		setStreamingContent('');
		indexRef.current = 0;
		fullTextRef.current = fullText;
		setIsStreaming(true);

		const streamNextToken = () => {
			if (indexRef.current < fullTextRef.current.length) {
				const nextChar = fullTextRef.current[indexRef.current];
				setStreamingContent((prev) => prev + nextChar);
				indexRef.current++;
				timeoutRef.current = setTimeout(streamNextToken, STREAM_DELAY_MS);
			} else {
				setIsStreaming(false);
			}
		};

		streamNextToken();
	}, []);

	const stopStream = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setIsStreaming(false);
	}, []);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return {
		streamingContent,
		isStreaming,
		startStream,
		stopStream,
	};
};
