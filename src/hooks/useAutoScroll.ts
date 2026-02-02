import { useRef, useEffect, useState, RefObject } from 'react';
import {
	Animated,
	NativeScrollEvent,
	NativeSyntheticEvent,
} from 'react-native';
import type { FlashListRef } from '@shopify/flash-list';

interface UseAutoScrollOptions {
	enabled?: boolean;
	threshold?: number;
}

interface UseAutoScrollReturn<T> {
	listRef: RefObject<FlashListRef<T>>;
	isAtBottom: boolean;
	buttonOpacity: Animated.Value;
	scrollToBottom: () => void;
	handleScrollBeginDrag: () => void;
	handleScrollEndDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
	handleMomentumScrollEnd: (
		event: NativeSyntheticEvent<NativeScrollEvent>,
	) => void;
}

export const useAutoScroll = <T = any>(
	messages: T[],
	isStreaming: boolean,
	options: UseAutoScrollOptions = {},
): UseAutoScrollReturn<T> => {
	const { enabled = true, threshold = 100 } = options;

	const [isAtBottom, setIsAtBottom] = useState(true);

	const listRef = useRef<FlashListRef<T>>(null!);
	const isTouchingRef = useRef(false);
	const buttonOpacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(buttonOpacity, {
			toValue: isAtBottom ? 0 : 1,
			duration: 200,
			useNativeDriver: true,
		}).start();
	}, [isAtBottom, buttonOpacity]);

	useEffect(() => {
		if (!enabled) return;

		if (isAtBottom && !isTouchingRef.current && messages.length > 0) {
			setTimeout(() => {
				listRef.current?.scrollToEnd({ animated: true });
			}, 100);
		}
	}, [messages.length, isAtBottom, enabled]);

	useEffect(() => {
		if (!enabled) return;

		if (isStreaming && isAtBottom && !isTouchingRef.current) {
			listRef.current?.scrollToEnd({ animated: false });
		}
	}, [messages, isStreaming, isAtBottom, enabled]);

	const checkIfAtBottom = (
		event: NativeSyntheticEvent<NativeScrollEvent>,
	): boolean => {
		const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
		const distanceFromBottom =
			contentSize.height - (contentOffset.y + layoutMeasurement.height);

		return distanceFromBottom <= threshold;
	};

	const handleScrollBeginDrag = () => {
		isTouchingRef.current = true;
	};

	const handleScrollEndDrag = (
		event: NativeSyntheticEvent<NativeScrollEvent>,
	) => {
		isTouchingRef.current = false;
		setIsAtBottom(checkIfAtBottom(event));
	};

	const handleMomentumScrollEnd = (
		event: NativeSyntheticEvent<NativeScrollEvent>,
	) => {
		setIsAtBottom(checkIfAtBottom(event));
	};

	const scrollToBottom = () => {
		listRef.current?.scrollToEnd({ animated: true });
		setIsAtBottom(true);
	};

	return {
		listRef,
		isAtBottom,
		buttonOpacity,
		scrollToBottom,
		handleScrollBeginDrag,
		handleScrollEndDrag,
		handleMomentumScrollEnd,
	};
};
