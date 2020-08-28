import React, { memo, useState, useEffect } from 'react';
import ZonesDB from 'utils/IndexedDB/Zones';
import DropdownList from 'components/DropdownList';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectDistrictIds, selectProvinceIds } from 'containers/reception/selectors';


const AddressFilter = ({ onChange, selectAddress, value, districtIds, provinceIds, disabled }) => {
  const [address, setAddress] = useState([]);
  const [size] = useState(8);

  const getProvinces = (text) => {
    return provinceIds.filter(province => province['acronym'] === text);
  };

  const convertAddress = (e) => {
    const output = e.target.value;
    onChange(output);

    let addressList = [];
    let provinces = [];
    let districts = [];
    let zones = [];

    const shortText = output.match(/.{1,2}/g) || [];

    switch (shortText.length) {
      case 1:
        provinces = provinceIds.filter(province => province['acronym'] === shortText[0])
          .map(item => ({ ...item, displayText: item.name }));
        addressList = provinces;
        setAddress(addressList);
        break;
      case 2:
        provinces = getProvinces(shortText[1]);
        provinces.forEach(province => {
          districtIds.filter(district => district.provinceId === province.id)
            .filter(district => district['acronym'] === shortText[0])
            .forEach(district => {
              districts.push({ ...district, province });
            })
        });
        addressList = districts.map(item => ({ ...item, displayText: `${item.name}, ${item.province.name}` }));
        setAddress(addressList);
        break;
      case 3:
        provinces = getProvinces(shortText[2]);
        provinces.forEach(province => {
          districtIds.filter(district => district.provinceId === province.id)
            .filter(district => district['acronym'] === shortText[1])
            .forEach(district => {
              ZonesDB.getOne(district.id, data => {
                zones = data.zones.filter(zone => zone['acronym'] === shortText[0])
                  .map(zone => ({
                    ...zone,
                    district,
                    province,
                    displayText: `${zone.name}, ${district.name}, ${province.name}`
                  }));
                setAddress(zones);
              });
            })
          });
        break;
      default:
        break;
    }

  };

  const getSelectedAddress = item => {
    if(item){
      onChange(`${item.displayText}, Việt  Nam`);
      selectAddress(item);
      setAddress([]);
    }
  };
  
  const closeAddressDropdown = () => {
    this.setState({
      address: []
    })
  }
  return (
    <div className="input-content">
      <input
        className="form-control"
        onChange={convertAddress}
        value={value}
        disabled={disabled}
      />

      {address.length > 0 && <DropdownList size={size} onClick={getSelectedAddress} closeDropList={closeAddressDropdown} listData={address}/>}
    </div>
  );
};

const mapState = createStructuredSelector({
  districtIds: selectDistrictIds(),
  provinceIds: selectProvinceIds(),
});

const withConnect = connect(
  mapState,
  null,
  null,
  { forwardRef: true },
);

export default compose(withConnect, memo)(AddressFilter);
