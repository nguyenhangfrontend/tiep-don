import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import HospitalDB from 'utils/IndexedDB/Hospital';
import DropdownList from 'components/DropdownList';

class ListHospitalFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hospitalsIds1: [],
      hospitalId: '',
      size: 8,
      page: 1,
      text: '',
      textHospital: '',
      searching: false,
    };
  }

  componentDidMount() {
    HospitalDB.getAll(this.getHospitalFromDB);
  }

  getHospitalFromDB = data => {
    const listHospital = data.sort((a, b) => {
      return new Date(a.value) - new Date(b.value);
    });

    this.setState({
      hospitalsIds: listHospital.map(item => {
        return {
          ...item,
          displayText: `${item.value} - ${item.name}`,
        };
      }),
    });
  };

  closeHospitalDropdown = () => {
    this.setState({
      hospitalsIds1: []
    })
  };

  getSelectedHospital = item => {
    const { onChange } = this.props;
    this.setState({
      textHospital: item.displayText,
      hospitalsIds1: [],
      searching: true
    });
    onChange(item.id);
  };

  onSearch = e => {
    let event = e.target.value;
    this.setState({ textHospital: event, searching: true,});

    // Make a new timeout set to go off in 800ms

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let list = this.state.hospitalsIds;
      if (event) {
        event = event.toLocaleLowerCase().unsignText();
        if (event[0] === '%') {
          event = event
            .substring(1)
            .toLocaleLowerCase()
            .trim();
          if (event.length === 0) return;
          list = (this.state.hospitalsIds || []).filter(item => {
            return (
              item.name
                .unsignText()
                .toLocaleLowerCase()
                .indexOf(event) === 0 ||
              item.value
                .unsignText()
                .toLocaleLowerCase()
                .indexOf(event) === 0
            );
          });
        } else {
          event = event.toLocaleLowerCase().unsignText();
          list = (this.state.hospitalsIds || []).filter(item => {
            return (
              item.name
                .toLocaleLowerCase()
                .unsignText()
                .includes(event) ||
              item.value
                .toLocaleLowerCase()
                .unsignText()
                .includes(event)
            );
          });
        }
        if (list) {
          list = list.sort(function(itema, itemb) {
            return itema.value > itemb.value ? 1 : -1;
          });
        }
      }

      this.setState({
        hospitalsIds1: JSON.parse(JSON.stringify(list)),
        page: 1,
        regAtHospitalId: event,
        selectedIndex: 0,
      });
    }, 100);
    
  };

  setPage = page => {
    this.setState({
      page: page,
    });
  };

  render() {
    const { value, disabled } = this.props;
    const { textHospital, hospitalsIds, searching, size, hospitalsIds1 } = this.state;
    const hospital = hospitalsIds && hospitalsIds.find(item => {
      return item.id === value
    }) || {};
    
    const valueText = hospital.displayText;
    
    return (
      <div>
        <input
          type="text"
          disabled={disabled}
          className="active-element insurance-element form-control priority"
          onChange={this.onSearch}
          value={searching ? textHospital : valueText || ''}
          onFocus={this.onSearch}
          onBlur={() => this.setState({ searching: false })}
        />
        {hospitalsIds1.length > 0 && (
          <DropdownList
            size={size}
            onClick={this.getSelectedHospital}
            listData={hospitalsIds1}
            closeDropList={this.closeHospitalDropdown}
          />
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userApp: state.global.userApp,
  };
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  ListHospitalFilter,
);
