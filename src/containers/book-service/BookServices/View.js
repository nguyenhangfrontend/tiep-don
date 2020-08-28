import React from 'react';
import EventLayerWrapper from 'components/EventLayerWrapper';
import Loading from 'components/Loading';
import GroupService from 'containers/book-service/GroupService';
import SelectService from 'containers/book-service/SelectService';

const BookServiceView = ({
	groupServiceRef, groupChange, onTypeChange, selectServiceRef, onSearch,
	onSubmit, loading, quit
}) => {
	return (
		<EventLayerWrapper layerEvent={{ key: 'book-service', events: [] }}>
			<div className='popup-kedichvu'>
				<button
					className='close-icon'
					onClick={quit}
				>
					<img alt='' src='/images/close.png' />
				</button>
				<div className='over-lay-popup' />
				<div className='popup-content'>
					<div className='row'>
						<GroupService
							ref={groupServiceRef}
							groupChange={groupChange}
							onTypeChange={onTypeChange}
						/>

						<SelectService
							ref={selectServiceRef}
							onSearch={onSearch}
							onSubmit={onSubmit}
							onTypeChange={onTypeChange}
						/>
					</div>
				</div>
				<Loading visible={loading} />
			</div>
		</EventLayerWrapper>
	);
};

export default BookServiceView;
