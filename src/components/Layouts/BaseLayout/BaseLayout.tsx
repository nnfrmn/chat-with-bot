import React, { useEffect } from 'react';
import { IBaseLayout } from './types';

export const BaseLayout: React.FC<IBaseLayout> = ({
	children,
	title,
	description,
}) => {
	useEffect(() => {
		if (title) document.title = title;

		if (description) {
			let meta = document.querySelector('meta[name="description"]');
			if (!meta) {
				meta = document.createElement('meta');
				meta.setAttribute('name', 'description');
				document.head.appendChild(meta);
			}
			meta.setAttribute('content', description);
		}
	}, [title, description]);
	return <div>{children}</div>;
};
