import { IMessage } from '../types';

export interface IChatView {
	messages: IMessage[];
	typing: boolean;
	inputValue: string;
	setInputValue: (value: string) => void;
	handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	handleSend: (message: string) => Promise<void>;
}
