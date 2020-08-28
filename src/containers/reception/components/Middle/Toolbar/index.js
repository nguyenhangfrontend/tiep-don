import React from 'react';
import T from 'prop-types';
import Button from 'components/Button';
import PrintIcon from 'resources/svg/print-white.svg';
import ArrowRightIcon from 'resources/svg/arrow-right-blue.svg';
import { Main } from './styled';

const ToolBar  = ({ resetForm, printF, nextPatient }) => (
	<Main>
		<div className={'tool-left'}>
			<h4>{'Hồ sơ cá nhân'}</h4>
			<Button
				className={'tool-bar-btn-reception'}
				onClick={resetForm}
				keyCode={112}
				shortKey={'F1'}
				type={"dark-green"}
				icon={<span className="icon-plus">+</span>}
			>
				{'Thêm mới'}
			</Button>
		</div>
		<div>
			<Button
				className={'tool-bar-btn-reception'}
				icon={<PrintIcon />}
				onClick={printF}
				type={'blue-light'}
			>
				{'In giấy giữ thẻ'}
			</Button>

			<Button
				icon={<ArrowRightIcon />}
				className={'tool-bar-btn-reception'}
				onClick={nextPatient}
				keyCode={114}
				type={'dark-blue'}
				shortKey={'F3'}
			>
				{'Người tiếp theo'}
			</Button>
		</div>
	</Main>
);

ToolBar.propTypes = {
	resetForm: T.func.isRequired,
	printF: T.func.isRequired,
	nextPatient: T.func.isRequired
};

export default ToolBar;
