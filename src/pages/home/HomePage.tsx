import { BaseLayout, Chat, GeneralLayout } from '@/components';
import React from 'react';

export const HomePage: React.FC = () => {
	return (
		<BaseLayout title={'Test Chat Bot'} description={'Chat Bot'}>
			<GeneralLayout>
				<Chat />
			</GeneralLayout>
		</BaseLayout>
	);
};
