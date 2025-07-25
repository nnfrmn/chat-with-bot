import React, { useEffect, useRef, useState } from 'react';
import { ChatView } from '../ChatView';
import { IMessage } from '../types';
import { BOT_ANSWER_DELAY, INITIAL_GREETING } from './constants';

export const ChatContainer: React.FC = () => {
	const [typing, setTyping] = useState<boolean>(false);
	const [messages, setMessages] = useState<IMessage[]>([INITIAL_GREETING]);
	const [inputValue, setInputValue] = useState<string>('');
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleSend = async (message: string): Promise<void> => {
		if (!message.trim()) return;

		const newMessage = {
			message: message,
			sender: 'user',
			direction: 'outgoing' as const,
		};
		const newMessages: IMessage[] = [...messages, newMessage];
		setMessages(newMessages);
		setInputValue('');
		setTyping(true);
		await processReply(message);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const processReply = (userMessage: string) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			const responseMessage: IMessage = {
				message: userMessage,
				sender: 'Your friend',
				direction: 'incoming',
			};
			setMessages((prevMessages: IMessage[]) => [
				...prevMessages,
				responseMessage,
			]);
			setTyping(false);
			timeoutRef.current = null;
		}, BOT_ANSWER_DELAY);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend(inputValue);
		}
	};

	return (
		<ChatView
			messages={messages}
			typing={typing}
			inputValue={inputValue}
			setInputValue={setInputValue}
			handleKeyPress={handleKeyPress}
			handleSend={handleSend}
		/>
	);
};
