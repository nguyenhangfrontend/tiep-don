import React from 'react';
import T from 'prop-types';
import PackageIcon from 'resources/svg/package_service.svg';
import { Main } from './styled';
import ListServiceSearch from '../ListServiceSearch';

const PackageServiceView = ({
	onSubmit, updateListSearch, choosePackage, packages, focus,
	packageActive, services, switchType, handleKeyDown, listSearchRef
}) => (
	<Main onClick={focus}>
		<div className={'package-list'} onKeyDown={handleKeyDown}>
			<div className={'package-head'}>
				{'Phác đồ mẫu'}
			</div>

			{packages.map(item  => (
				<div
					key={item.id}
					className={`package-item ${packageActive === item ? 'item-active' : ''}`}
					onClick={() => choosePackage(item.id)}
				>
					<div className={'package-item-icon'}>
						<PackageIcon />
					</div>
					<div className={'package-item-name'}>
						{item.name}
					</div>
				</div>
			))}
		</div>

		<div className={'package-service'}>
			<ListServiceSearch
				ref={listSearchRef}
				switchType={switchType}
				listSearch={services || []}
				onSubmit={onSubmit}
				updateListSearch={updateListSearch}
			/>
		</div>
	</Main>
);

PackageServiceView.propTypes = {
	onSubmit: T.func,
	updateListSearch: T.func,
	choosePackage: T.func,
	packages: T.arrayOf(T.shape({})),
	packageActive: T.shape({})
};

export default PackageServiceView;
