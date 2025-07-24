import SendIcon from '@mui/icons-material/Send';
import {
	Avatar,
	Box,
	IconButton,
	List,
	ListItem,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';
import styles from './ChatView.module.css';
import { DOTS } from './constants';
import { IChatView } from './types';

export const ChatView: React.FC<IChatView> = ({
	messages,
	typing,
	inputValue,
	setInputValue,
	handleKeyPress,
	handleSend,
}) => {
	return (
		<div className={styles.container}>
			<Box
				sx={{
					width: '100%',
					height: '600px',
					maxWidth: '800px',
				}}
			>
				<Paper
					elevation={3}
					sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
				>
					{/* Message List */}
					<Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
						<List>
							{messages.map((message, i) => (
								<ListItem
									key={i}
									sx={{
										display: 'flex',
										justifyContent:
											message.direction === 'outgoing'
												? 'flex-end'
												: 'flex-start',
										mb: 1,
									}}
								>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'flex-end',
											gap: 1,
											flexDirection:
												message.direction === 'outgoing'
													? 'row-reverse'
													: 'row',
											maxWidth: '70%',
										}}
									>
										<Avatar sx={{ width: 32, height: 32 }}>
											{message.direction === 'outgoing' ? 'U' : 'F'}
										</Avatar>
										<Paper
											elevation={1}
											sx={{
												p: 1.5,
												backgroundColor:
													message.direction === 'outgoing'
														? '#1976d2'
														: '#f5f5f5',
												color:
													message.direction === 'outgoing' ? 'white' : 'black',
												borderRadius: 2,
											}}
										>
											<Typography variant='body2'>{message.message}</Typography>
										</Paper>
									</Box>
								</ListItem>
							))}

							{/* Typing Indicator */}
							{typing && (
								<ListItem
									sx={{ display: 'flex', justifyContent: 'flex-start' }}
								>
									<Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
										<Avatar sx={{ width: 32, height: 32 }}>F</Avatar>
										<Paper
											elevation={1}
											sx={{
												p: 1.5,
												backgroundColor: '#f5f5f5',
												borderRadius: 2,
												minWidth: '80px',
											}}
										>
											<Box
												sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
											>
												<Typography variant='body2' color='text.secondary'>
													Your companion is typing
												</Typography>
												<Box sx={{ display: 'flex', gap: 0.2, ml: 0.5 }}>
													{DOTS.map((index) => (
														<Box
															key={index}
															className={styles.typingDot}
															sx={{
																width: 4,
																height: 4,
																borderRadius: '50%',
																backgroundColor: '#666',
																animationDelay: `${index * 0.2}s`,
															}}
														/>
													))}
												</Box>
											</Box>
										</Paper>
									</Box>
								</ListItem>
							)}
						</List>
					</Box>

					<Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<TextField
								fullWidth
								variant='outlined'
								placeholder='Type message here'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyPress={handleKeyPress}
								size='small'
							/>
							<IconButton
								color='primary'
								onClick={() => handleSend(inputValue)}
								disabled={!inputValue.trim()}
							>
								<SendIcon />
							</IconButton>
						</Box>
					</Box>
				</Paper>
			</Box>
		</div>
	);
};
