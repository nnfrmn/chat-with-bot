import React, { useState } from 'react';
import { ChatView } from '../ChatView';
import { IMessage } from '../types';
import { BOT_ANSWER_DELAY, INITIAL_GREETING } from './constants';

export const ChatContainer: React.FC = () => {
	const [typing, setTyping] = useState<boolean>(false);
	const [messages, setMessages] = useState<IMessage[]>([INITIAL_GREETING]);
	const [inputValue, setInputValue] = useState<string>('');

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

	const processReply = (userMessage: string) => {
		setTimeout(() => {
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
