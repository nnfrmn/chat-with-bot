import { IWithChildrenProps } from '@/common';
import React from 'react';
import styles from './GeneralLayout.module.css';

export const GeneralLayout: React.FC<IWithChildrenProps> = ({ children }) => {
	return <div className={styles.container}>{children}</div>;
};
