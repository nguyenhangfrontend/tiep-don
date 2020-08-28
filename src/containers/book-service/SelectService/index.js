import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import keyEventProvider from 'data-access/keyevent-provider';
import { createStructuredSelector } from 'reselect';
import { selectPatientOnPlanServices } from 'containers/book-service/selectors';
import { selectPatient } from 'containers/reception/selectors';
import View from './View';
import { toast } from 'react-toastify';

class SelectService extends React.Component {
  constructor(props) {
    super(props);
    this.textSearch = null;
    this.servicesRef = React.createRef();
    this.packageRef = React.createRef();
    this.listSearchRef = React.createRef();
    this.state = {
      listSearch: [],
      showListSearch: false,
      size: 20,
      page: 1,
      type: 1,
      index0: 0,
      index1: 0,
      sortType: 1,
      sortValue: 1,
      text: '',
    };
  }

  componentWillUnmount() {
    keyEventProvider.unregister(
      [97, 98, 49, 50],
      this,
    );
  }

  componentDidMount() {
    this.textSearch.focus();
  }

  setTextSearch = node => {
    this.textSearch = node;
  };


  onSearch = (value, blur) => {
    let list = [];
    if (this.props.onSearch) {
      list = this.props.onSearch(value, this.state.type);
    }
    list = list.sort((itema, itemb) => {
      if (itema.serviceGroupLevel1 && itemb.serviceGroupLevel1) {
        if (itema.serviceGroupLevel1.id === itemb.serviceGroupLevel1.id) {
          return itema.value > itemb.value ? 1 : -1;
        } else
          return itema.serviceGroupLevel1.sequenceNo >
            itemb.serviceGroupLevel1.sequenceNo
            ? 1
            : -1;
      }
    });
    if (list && list.length && blur) this.textSearch.blur();
    this.setState(
      {
        index: 0,
        listSearch: JSON.parse(JSON.stringify(list)),
        showListSearch: true,
        page: 1,
      },
      );
      
  };

  clear = () => {
    this.textSearch.value = '';
    this.onSearch(this.textSearch.value, false);
    this.textSearch.focus();
  };

  onSubmit = () => {
    const { onSubmit } = this.props;

    //lay ra danh sách dịch vụ đã chọn với checked=true
    let listChecked = this.state.listSearch.filter(item => item.checked);
    let listKB = listChecked.filter(
      item => item.serviceGroupLevel1 && item.serviceGroupLevel1.value === 'KB',
    );

    if (listKB.length > 1) {
      toast.error(`Không kê nhiều dịch vụ khám cùng lúc`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const callback = () => {
      this.textSearch.focus();
      this.setState({ searchWhenFocus: false, listSearch: [], showListSearch: false, text: '' })
    };

    if (onSubmit && !isEmpty(listChecked)) {
      onSubmit(listChecked, () => {}, callback);
    }
  };

  submitPackage = (services) => {
    const { onSubmit } = this.props;
    const callback = () => {
      this.textSearch.focus();
      this.setState({ listSearch: [], showListSearch: false, text: '' });
    };

    if (!isEmpty(services)) {
      onSubmit(services, null, callback);
    }
  };

  onTypeChange = type => () => {
    this.setState({ type },
      () => {
        if (this.props.onTypeChange) {
          this.props.onTypeChange(type);
          this.textSearch.focus();
        }
      },
    );
  };

  selectType(type) {
    if (type !== this.state.type) {
      this.setState({ type });
    }
  }

  remove = () => {
    this.servicesRef.current.removeService(null, true)();
  };

  onFocusTextSearch = e => {
    if (this.listSearchRef.current) {
      this.listSearchRef.current.blur();
    }
    if (this.packageRef.current) {
      this.packageRef.current.blur();
    }

    if (!this.state.searchWhenFocus) {
      this.setState({ searchWhenFocus: true });
    } else {
      e.target.setSelectionRange(0, e.target.value.length);
      this.onSearch(e.target.value, false);
    }
  };

  hideListSearch = () => {
    this.setState({
      showListSearch: false,
    });
    if (this.listSearchRef.current) {
      this.listSearchRef.current.blur();
    }
    if (this.packageRef.current) {
      this.packageRef.current.blur();
    }
  };

  printReceptionForm = () => {
    const { printReceptionForm } = this.servicesRef.current;
    printReceptionForm();
  };

  printSpecifyForm = () => {
    const { printAllService } = this.servicesRef.current;
    printAllService();
  };

  updateListSearch = listSearch => {
    this.setState({ listSearch });
  };

  onChangeSearch = (e) => {
    const timeDelay = 500;
    const value = e.target.value;
    this.setState({ text: value });

    if (this.packageRef.current) {
      this.packageRef.current.search();
    } else {
      const timeOut = setTimeout(() => {
        this.onSearch(value);
        clearTimeout(timeOut);
      }, timeDelay);
    }
  };

  onKeydown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.textSearch.blur();

      if (this.listSearchRef.current) {
        this.listSearchRef.current.focus();
      }

      if (this.packageRef.current) {
        this.packageRef.current.focus();
      }
    }
  };

  render() {
    const { patientOnPlanServices, patient } = this.props;

    return (
      <View
        {...this.state}
        servicesRef={this.servicesRef}
        packageRef={this.packageRef}
        listSearchRef={this.listSearchRef}
        patient={patient}
        setTextSearch={this.setTextSearch}
        onSubmit={this.onSubmit}
        onFocusTextSearch={this.onFocusTextSearch}
        printSpecifyForm={this.printSpecifyForm}
        printReceptionForm={this.printReceptionForm}
        hideListSearch={this.hideListSearch}
        onTypeChange={this.onTypeChange}
        remove={this.remove}
        updateListSearch={this.updateListSearch}
        onChangeSearch={this.onChangeSearch}
        submitPackage={this.submitPackage}
        onKeydown={this.onKeydown}
        patientOnPlanServices={patientOnPlanServices}
      />
    );
  }
}

const mapState = createStructuredSelector({
  patientOnPlanServices: selectPatientOnPlanServices(),
  patient: selectPatient(),
});

export default connect(mapState, null, null, { forwardRef: true })(SelectService);
