import React from 'react';
import T from 'prop-types';
import { Typography, Card, ScrollWrapper } from 'components';


import { Input } from 'components/Input';
import { formatName, formatAge } from '../../utils';

import List from './List';
import ControlBar from './ControlBar';
import { Main } from './styled';
import { columnsPatient } from './constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const LeftSideView = ({
	patients, changeCounter, isSelectAllCounter, counter, counters, getPatients,
	selectRow, patient, activeCounter, selectAllCounter, value, changeSearch, changeActiveFilter,
}) => {

	return (
		
		<Main>
			<ControlBar
				className="side-row"
				activeCounter={activeCounter}
				changeCounter={changeCounter}
				selectAllCounter={selectAllCounter}
				isSelectAllCounter={isSelectAllCounter}
				counter={counter}
				counters={counters}
				changeActiveFilter={changeActiveFilter}
			/>

			<div className="side-row">
				<Input
					onKeyDown={getPatients}
					value={value}
					className={'search-row'}
					onChange={changeSearch}
					placeholder="Tìm kiếm Mã hồ sơ, STT, Tên người bệnh"
				/>
			</div>

			
				<Card
					title={<Typography className={'head-title'} type={'success'}>{'Người bệnh chờ tiếp đón'}</Typography>}
					className={'side-row'}
					bodyRender={(
						<List
							rowSelected={{...patient, key: patient.id}}
							selectRow={selectRow}
							visibleHeader
							columns={columnsPatient}
							rows={ patients.waitingPatents.slice(0, 6).map(item => ({
								...item,
								key: item.id || item.receptionId,
								sequenceNo: item.sequenceNo || '',
								name: formatName(item.patientName),
								age: formatAge(item.age),
								counterName: item.counterName || '',
							}))}
						/>
					)}
				/>
			
			

			<Card
				title={<Typography className={'head-title'} type={'error'}>{'Người bệnh bỏ qua'}</Typography>}
				className={'side-row'}
				bodyRender={(
					<List
						rowSelected={{...patient, key: patient.id}}
						selectRow={selectRow}
						visibleHeader
						columns={columnsPatient}
						rows={patients.skipPatients.slice(0, 3).map(item => ({
							...item,
							key: item.id || item.receptionId,
							sequenceNo: item.sequenceNo || '',
							name: formatName(item.patientName),
							age: formatAge(item.age),
							counterName: item.counterName || '',
						}))}
					/>
				)}
			/>

			<Card
				title={<Typography className={'head-title'} type={'primary'}>{'Người bệnh đã tiếp đón'}</Typography>}
				className={'side-row'}
				bodyRender={(
					<ScrollWrapper scrollY={180}>
						<List
							type={'active'}
							rowSelected={{...patient, key: patient.id}}
							selectRow={selectRow}
							visibleHeader
							columns={columnsPatient}
							rows={patients.receivedPatients.map(item => ({
								...item,
								key: item.id || item.receptionId,
								sequenceNo: item.sequenceNo || '',
								name: formatName(item.patientName),
								age: formatAge(item.age),
								counterName: item.counterName || '',
							}))}
						/>
					</ScrollWrapper>
				)}
			/>
		</Main>
	);
};

LeftSideView.defaultProps = {};

LeftSideView.propTypes = {};

const mapDispatch = dispatch => ({
  
});

export default connect(null, mapDispatch)(withRouter(LeftSideView));
