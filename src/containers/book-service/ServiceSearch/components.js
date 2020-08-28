import React from 'react';
import CheckBox from 'components/CheckBox';
import { getStatusClass } from '../Table/utils';
import WrapperContent from 'containers/book-service/Table/WrapperContent';
import Row from 'containers/book-service/Table/Row';

export const CheckAll = () => {
	return <CheckBox type={'pink'} />
};

export const CheckOne = () => {
	return <CheckBox type={'dark'} />
};
