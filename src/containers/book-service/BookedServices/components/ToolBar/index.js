import React from 'react';
import T from 'prop-types';
import { Main } from './styled';
import Button from 'components/Button';
import EditIcon from 'resources/svg/edit.svg';
import TrashIcon from 'resources/svg/trash.svg';
import PrintIcon from 'resources/svg/print-white.svg';

const ToolBar = ({
	showBookServices, editServices, removeService,
	disabledButton, printSpecifyForm, printReceptionForm
}) => (
	<Main>
		<div className={'tool-group-left'}>
			<Button
				onClick={showBookServices}
				keyCode={113}
				shortKey={'F2'}
				type={'light-green'}
				className={'book-bar-btn'}
			>
				{'+ THÊM DỊCH VỤ'}
			</Button>

			<div>
				<Button
					className={'book-bar-btn'}
					type={'light-orange'}
					icon={<EditIcon />}
					onClick={editServices}
				>
					{'SỬA'}
				</Button>

				<Button
					className={'book-bar-btn'}
					onClick={removeService}
					icon={<TrashIcon />}
					shortKey={'F9'}
					keyCode={120}
					type={'light-pink'}
				>
					{'XÓA'}
				</Button>
			</div>
		</div>

		<div>
			<Button
				className={'book-bar-btn'}
				icon={<PrintIcon />}
				onClick={printReceptionForm}
				shortKey={'F8'}
				keyCode={119}
				type={'blue-light'}
			>
				{'IN PHIẾU KHÁM'}
			</Button>

			<Button
				className={'book-bar-btn'}
				type={'blue-light'}
				icon={<PrintIcon />}
				keyCode={121}
				onClick={printSpecifyForm}
				shortKey={'F10'}
			>
				{'IN PHIẾU CHỈ ĐỊNH'}
			</Button>
		</div>
	</Main>
);

ToolBar.propTypes = {
	printReceptionForm: T.func,
};

export default ToolBar;
