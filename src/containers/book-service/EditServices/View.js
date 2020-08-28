import React from 'react';
import T from 'prop-types';
import Table from './Table';
import Button from 'components/Button';
import Modal from 'components/Modal';
import SaveIcon from 'resources/svg/save.svg';
import UserInfo from 'containers/book-service/UserInfo';
import { Main, Header, Footer } from './styled';
import { columns, types } from './constants';
import { status } from 'containers/book-service/constants';

const EditServiceView = ({
	services, tableRef, errors, type, sequences, group, rooms,
	technicalServices, dyeMethods, users, departments, biopsyLocations, submitEdit,
}) => {
	const title = types.find(item => item.type === type) || {};
	const header = (
		<Header>
			<div className={'edit-popup-header'}>
				<div className="title-popup text-left">
					<span className={'title-icon'}>
						<title.icon />
					</span>
					<span className={'title-message'}>
						{title.name}{' '}{type === 'sequence' ? (sequences[0].sequenceGroupNo): ''}
					</span>
				</div>
				{errors.map(item => (
					<div className={'errors-display'}>
						<span className="error_service">{'Dịch vụ'} {item.group}:</span>
						<span className="error_message">{item.message}</span>
					</div>
				))}
			</div>

			<div className={'head-user-info'}>
				<UserInfo type={'light'} />
			</div>
		</Header>
	);

	const footer = (
		<Footer>
			<div>{'[ 1 - 1 /1 ]'}</div>
			<div>
				<Button
					icon={<SaveIcon />}
					type={'primary'}
					shortKey={'F4'}
					onClick={submitEdit}
					keyCode={115}
				>
					{'LƯU LẠI'}
				</Button>
			</div>
		</Footer>
	);
	return (
		<Modal show width={'80%'} header={header} footer={footer}>
			<Main>
				<div className="edit-table-wrap">
					<Table
						ref={tableRef}
						columns={columns}
						group={group}
						sequences={sequences}
						rowData={services.map(service => ({ key: service.id, ...service }))}
						common={{
							technicalServices,
							dyeMethods,
							users,
							departments,
							biopsyLocations,
							status,
							rooms,
							editFromBook: type === 'booking'
						}}
					/>
				</div>
			</Main>
		</Modal>
	);
};

EditServiceView.defaultProps = {
	technicalServices: [],
	errors: [],
};

EditServiceView.propTypes = {
	closePopup: T.func,
	submit: T.func,
	services: T.arrayOf(T.shape({})),
	technicalServices: T.shape({}),
	doctors: T.arrayOf(T.shape({})),
	errors: T.arrayOf(T.shape({})),
	departments: T.arrayOf(T.shape({})),
};

export default EditServiceView;
