export interface IMessage {
	message: string;
	sender: string;
	direction: 'incoming' | 'outgoing';
}
