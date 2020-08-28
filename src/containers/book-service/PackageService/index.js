import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { search } from 'utils/functions';
import { createStructuredSelector } from 'reselect';
import { selectServices } from 'containers/book-service/selectors';
import View from './View';

class PackageService extends React.Component {
	constructor(props) {
		super(props);
		this.listSearchRef = React.createRef();
		this.state = {
			packages: [],
			packageDefault: [],
			packageActive: {},
			services: [],
			focusMe: false,
		};
	}

	componentDidMount() {
		const { services } = this.props;
		document.addEventListener('keydown', this.handleKeyDown);

		// package technical
		const package170 = services.filter(item => item.serviceType === 170);

		// package medicine
		const package180 = services.filter(item => item.serviceType === 180);

		// package material
		const package190 = services.filter(item => item.serviceType === 190);

		const packages = [...package170, ...package180, ...package190];
		const packageActive = packages[0] ? packages[0] : {};
		const servicesActive = packageActive.services ? packageActive.services.map(s => ({ ...s, checked: true })) : [];

		this.setState({ packages, packageDefault: packages, packageActive, services: servicesActive })
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	search = (keyword) => {
		const { packageDefault } = this.state;

		if (packageDefault) {
			keyword = keyword.trim().toLocaleLowerCase().unsignText();
			keyword = keyword.substr(1);

			const newPackages = packageDefault.filter(item => {
				const resource = item.value.toLocaleLowerCase().unsignText() + item.name.toLocaleLowerCase().unsignText();
				return search(resource, keyword);
			});

			this.setState({ packages: newPackages });
		}
	};

	choosePackage = (id) => {
		const { packages } = this.state;
		const packageActive = packages.find(item => item.id === id) || {};

		this.setState({
			packageActive,
			services: packageActive.services.map(s => ({ ...s, checked: true })),
		})
	};

	updateListSearch = (services) => {
		this.setState({ services });
	};

	onSubmit = () => {
		const { onSubmit } = this.props;
		const { services } = this.state;
		onSubmit(services.filter(item => item.checked));
	};

	handleKeyDown = (e) => {
		const { focusMe, packageActive, packages } = this.state;
		const index = packages.findIndex(item => item.id === packageActive.id);
		const size = packages.length - 1;
		if (e.keyCode === 37) {
			this.setState({ focusMe: true });
			if (this.listSearchRef.current) {
				this.listSearchRef.current.blur();
			}
		}

		if (focusMe) {
			switch (e.keyCode) {
				case 38:
					this.handleArrowUp(index, size, packages);
					break;
				case 40:
					this.handleArrowDown(index, size, packages);
					break;
				case 39:
					this.setState({ focusMe: false });
					if (this.listSearchRef.current) {
						this.listSearchRef.current.focus();
					}
					break;
				default: break;
			}
		}
	};

	handleArrowDown = (currentIndex, size, packages) => {
		const nextIndex = currentIndex + 1 > size ? currentIndex : currentIndex + 1;
		const packageActive = packages[nextIndex] || {};

		this.choosePackage(packageActive.id);
	};

	handleArrowUp = (currentIndex, size, packages) => {
		const nextIndex = currentIndex - 1 < 0 ? currentIndex : currentIndex - 1;
		const packageActive = packages[nextIndex] || {};

		this.choosePackage(packageActive.id);
	};

	focus = () => {
		this.setState({ focusMe: true });
	};

	blur = () => {
		this.setState({ focusMe: false });
	};

	render() {
		const { switchType } = this.props;

		return (
			<View
				{...this.state}
				focus={this.focus}
				listSearchRef={this.listSearchRef}
				switchType={switchType}
				onSubmit={this.onSubmit}
				choosePackage={this.choosePackage}
				updateListSearch={this.updateListSearch}
				handleKeyDown={this.handleKeyDown}
			/>
		);
	}
}

PackageService.defaultProps = {
	services: [],
};

PackageService.propTypes = {
	services: T.arrayOf(T.shape({})),
};

const mapState = createStructuredSelector({
	services: selectServices()
});

export default connect(mapState, null, null, { forwardRef: true })(PackageService);
