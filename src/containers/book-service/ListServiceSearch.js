import React, { PureComponent } from 'react';
import T from 'prop-types';
import keyEventProvider from 'data-access/keyevent-provider';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import KeyEventWrapper from 'components/KeyEventWrapper';
import Button from 'components/Button';
import CheckBox from './CheckBox';
import { MainInnerItem } from './Styles';

class ListServiceSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.node = null;
    this.state = {
      listSearch: props.listSearch || [],
      openListService: false,
      size: 20,
      page: 1,
      type: 1,
      index0: 0,
      index1: -1,
      sortType: 1,
      sortValue: 1,
      focusMe: false,
    };
  }
  componentWillUnmount() {
    // keyEventProvider.setTarget(null);
    keyEventProvider.unregister([38, 40, 32], this);
    document.removeEventListener('mousedown', this.clickOutSide);
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(this.props.listSearch, newProps.listSearch)) {
      if (newProps.listSearch && newProps.listSearch.length === 1) {
        newProps.listSearch[0].checked = true;
      }
      this.setState({
        listSearch: newProps.listSearch || [],
        page: 1,
      });
    }
  }

  requestBlurTextSearch = () => {
    if (this.props.onRequestBlurTextSearch)
      this.props.onRequestBlurTextSearch();
  };

  requestFocusTextSearch = () => {
    if (this.props.onRequestFocusTextSearch)
      this.props.onRequestFocusTextSearch();
  };

  checkIfInView(element) {
    if (element) {
      const parent = document.getElementById('list-service-search');
      const height = parent.offsetHeight;
      const offset = element.offsetTop;

      if (offset > height - 50) {
        parent.scrollTo(0, offset - height + 70);
      } else if (offset < height - 70) {
        parent.scrollTo(0, 0);
      }
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.clickOutSide);

    keyEventProvider.register(40, this, this.handleArrowDown);

    keyEventProvider.register(38, this, this.handleArrowUp);

    keyEventProvider.register(32, this, this.handleSpace);

    this.requestFocusTextSearch();
  }

  clickOutSide = (e) => {
    if (this.node && !this.node.contains(e.target)) {
      this.setState({ focusMe: false });
    }
  };

  handleSpace = () => {
    const { focusMe } = this.state;

    if (focusMe) {
      try {
        if (
          document.activeElement &&
          document.activeElement.tagName === 'INPUT'
        ) {
          return true;
        }
        let group = this.groups[this.state.index0];
        let item = group.items[this.state.index1];
        if (item) {
          item.checked = !item.checked;
        }
        this.setState({
          listSearch: [...this.state.listSearch],
        });
      } catch (error) {}
    }
  };

  handleArrowUp = () => {
    let { index0, index1, listSearch, focusMe } = this.state;
    if (focusMe) {
      let groups = this.groups || [];
      let group = groups[index0];
      if (index0 === 0 && index1 === 0) {
        this.requestFocusTextSearch();
      } else {
        if (!group) {
          this.checkIfInView(
            document.getElementById('item-service-search-0-0'),
          );

          this.setState({
            index0: 0,
            index1: 0,
          });
          return;
        }
        if (index1 > 0) {
          index1--;
        } else {
          if (index0 > 0) {
            index0--;
            group = groups[index0];
            index1 = 0;
            if (group) {
              index1 = group.items.length - 1;
            }
          }
        }
        if (keyEventProvider.shiftDown) {
          group = groups[index0];
          let item = group.items[index1];
          item.checked = true;
        }
        this.checkIfInView(
          document.getElementById(`item-service-search-${index0}-${index1}`),
        );

        this.setState({
          index0,
          index1,
          listSearch: [...listSearch],
        });
      }
    }
  };

  handleArrowDown = () => {
    let { index0, index1, listSearch, focusMe } = this.state;
    if (focusMe) {
      let groups = this.groups || [];
      let group = groups[index0];
      if (!group) {
        this.checkIfInView(document.getElementById('item-service-search-0-0`'));
        this.setState({
          index0: 0,
          index1: 0,
        });
        return;
      }
      if (index1 < group.items.length - 1) {
        index1++;
      } else {
        if (index0 < groups.length - 1) {
          index0++;
          index1 = 0;
        }
      }
      if (keyEventProvider.shiftDown) {
        group = groups[index0];
        let item = group.items[index1];
        item.checked = true;
      }
      this.checkIfInView(
        document.getElementById(`item-service-search-${index0}-${index1}`),
      );
      this.setState({
        index0,
        index1,
        listSearch: [...listSearch],
      });
      this.requestBlurTextSearch();
    }
  };

  onScroll = e => {
    let element = e.target;
    if (
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + 100
    ) {
      if (this.state.page * this.state.size < this.state.listSearch.length)
        this.setState({
          page: this.state.page + 1,
        });
    }
  };

  getIcon = value => {
    switch (value) {
      case 'KB':
        return require('resources/images/group-service/khambenh2.png');
      case 'XN':
        return require('resources/images/group-service/xetnghiem2.png');
      case 'TT':
        return require('resources/images/group-service/thuthuat2.png');
      case 'CDHA':
        return require('resources/images/group-service/chandoanhinhanh2.png');
      case 'KHAC':
        return require('resources/images/group-service/dichvukhac2.png');
      case 'TDCN':
        return require('resources/images/group-service/thamdochucnang2.png');
      case 'PT':
        return require('resources/images/group-service/phauthuat2.png');
      case 'PDM':
        return require('resources/images/group-service/phacdomau2.png');
      default:
    }
    return require('resources/images/group-service/khambenh2.png');
  };

  getRoom(item) {
    if (item.room) {
      return item.room.name;
    }
  }

  getFormatPrice(price) {
    try {
      if (!price) return '0';
      let number = parseFloat(price).formatPrice();
      return number;
    } catch (error) {
      return price;
    }
  }

  getGroup = listSearch => {
    try {
      let obj = {};
      listSearch.forEach(item => {
        if (!obj[item.serviceGroupLevel1Id]) {
          obj[item.serviceGroupLevel1Id] = {
            group: item,
            items: [],
          };
        }
        obj[item.serviceGroupLevel1Id].items.push(item);
      });
      let groups = [];
      for (let key in obj) {
        obj[key].checked =
          this.state.listSearch.filter(item => {
            return (
              item.serviceGroupLevel1Id ===
                obj[key].group.serviceGroupLevel1Id && !item.checked
            );
          }).length === 0;
        obj[key].items = obj[key].items.sort((itema, itemb) => {
          switch (this.state.sortType) {
            case 1:
              return itema.value > itemb.value
                ? this.state.sortValue
                : this.state.sortValue * -1;
            case 2: {
              if (!itema.nameUnsignText)
                itema.nameUnsignText = itema.name
                  .toLocaleLowerCase()
                  .unsignText();
              if (!itemb.nameUnsignText)
                itemb.nameUnsignText = itemb.name
                  .toLocaleLowerCase()
                  .unsignText();
              return itema.nameUnsignText > itemb.nameUnsignText
                ? this.state.sortValue
                : this.state.sortValue * -1;
            }

            default:
              return itema.value > itemb.value ? 1 : -1;
          }
        });
        groups.push(obj[key]);
      }
      return groups.sort((itema, itemb) => {
        if (!itema.group.serviceGroupLevel1) return 1;
        if (!itemb.group.serviceGroupLevel1) return -1;
        return itema.group.serviceGroupLevel1.sequenceNo >
          itemb.group.serviceGroupLevel1.sequenceNo
          ? 1
          : -1;
      });
    } catch (error) {
      return [];
    }
  };
  pagingGroup = groups => {
    let { page, size } = this.state;
    let totalItem = 0;
    let max = (page + 1) * size;
    let full = false;
    groups.forEach(item => {
      if (full) {
        item.items = [];
        return;
      }
      if (totalItem + item.items.length > max) {
        full = true;
        let remain = max - totalItem;
        item.items = item.items.filter((item, index) => {
          return index < remain;
        });
      }
    });
    return groups.filter(item => item.items.length);
  };
  onCheck = (item, item2, index0, index1, indexItemClick) => () => {
    const { updateListSearch } = this.props;
    if (item2) {
      item2.checked = !item2.checked;
    } else {
      if (item) {
        item.checked = !item.checked;
        this.state.listSearch.map(item2 => {
          if (item2.serviceGroupLevel1Id === item.group.serviceGroupLevel1Id)
            item2.checked = item.checked;
        });
        // item.items = item.items.map(item2 => item2.checked = item.checked);
      }
    }
    if (keyEventProvider.shiftDown && indexItemClick !== undefined) {
      try {
        if (this.state.indexItemClick !== undefined) {
          if (
            this.state.indexGroupClick === index0 &&
            indexItemClick !== this.state.indexItemClick
          ) {
            let group = this.groups[index0];
            if (indexItemClick < this.state.indexItemClick) {
              for (
                let i = indexItemClick;
                i <= this.state.indexItemClick;
                i++
              ) {
                group.items[i].checked = true;
              }
            } else {
              for (
                let i = this.state.indexItemClick;
                i <= indexItemClick;
                i++
              ) {
                group.items[i].checked = true;
              }
            }
            indexItemClick = undefined;
          }
        }
      } catch (error) {}
    }

    updateListSearch([...this.state.listSearch]);

    this.setState({
      index0,
      index1,
      indexGroupClick: index0,
      indexItemClick,
      listSearch: [...this.state.listSearch],
    });
  };

  sort = sortType => () => {
    if (sortType !== this.state.sortType) {
      this.setState({ sortType, sortValue: 1 });
    } else {
      this.setState({ sortValue: this.state.sortValue * -1 });
    }
  };

  focus = (clicked) => {
    if (clicked) {
      this.setState({ focusMe: true });
    } else {
      this.setState({ focusMe: true, index1: 0 });
    }
  };

  blur = () => {
    this.setState({ focusMe: false, index1: -1 })
  };

  setNode = node => this.node = node;

  render() {
    const { onSubmit } = this.props;
    let listSearch = this.state.listSearch || [];
    this.groups = this.pagingGroup(this.getGroup(listSearch));

    return (
      <div
        ref={this.setNode}
        id={'service-search-list'}
        className="list-service-search"
        onClick={() => this.focus(true)}
        onBlur={this.blur}
      >
        <div className="main-content">
          <div className="main-info">
            <div className="main-inner">
              <MainInnerItem
                className="main-inner-item mostly-customized-scrollbar"
                onScroll={this.onScroll}
                height="500px"
                id="list-service-search"
              >
                <ul
                  className="main-inner-title main-inner-ul"
                  style={{ width: 1000 }}
                >
                  <li className="" style={{ width: 150 }}>
                    Dịch vụ
                  </li>
                  <li
                    className=""
                    style={{ width: 100 }}
                    onClick={this.sort(1)}
                  >
                    Mã DV
                    <img
                      alt=""
                      src={require('resources/images/group-service/sort.png')}
                      style={{ width: 10, marginLeft: 5 }}
                    />
                  </li>
                  <li
                    className=""
                    style={{ width: 300 }}
                    onClick={this.sort(2)}
                  >
                    {' '}
                    Tên DV
                    <img
                      alt=""
                      src={require('resources/images/group-service/sort.png')}
                      style={{ width: 10, marginLeft: 5 }}
                    />
                  </li>
                  <li className="" style={{ width: 90 }}>
                    Đơn giá DV
                  </li>
                  <li className="" style={{ width: 90 }}>
                    Đơn giá BH
                  </li>
                  <li className="" style={{ width: 90 }}>
                    Giá chênh
                  </li>
                  <li className="" style={{ width: 200 }}>
                    Phòng
                  </li>
                </ul>
                <div
                  className="main-inner-info"
                  style={{ width: 1000 }}
                  id="div-list-service"
                >
                  {this.groups &&
                    this.groups.length &&
                    this.groups.map((item, index) => {
                      return (
                        <ul
                          key={index}
                          style={{ display: 'flex' }}
                          className="item-service"
                        >
                          <li style={{ width: 100 }}>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <CheckBox
                                type={1}
                                checked={item.checked}
                                style={{
                                  width: 18,
                                  height: 18,
                                  marginRight: 5,
                                  cursor: 'pointer',
                                }}
                                onClick={this.onCheck(item, null, index, 0)}
                              />
                              <div style={{ width: 30 }}>
                                {item.group.serviceGroupLevel1Id ? (
                                  <img
                                    src={this.getIcon(
                                      item.group.serviceGroupLevel1.value,
                                    )}
                                    alt=""
                                    style={{
                                      height: 18,
                                      width: 18,
                                      marginLeft: 5,
                                      objectFit: 'contain',
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={this.getIcon('PDM')}
                                    alt=""
                                    style={{
                                      height: 18,
                                      width: 18,
                                      marginLeft: 5,
                                      objectFit: 'contain',
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </li>
                          <ul>
                            {item.items.map((item2, index2) => {
                              return (
                                <ul
                                  className={`main-inner-sum 
                                                                              ${
                                                                                index2 %
                                                                                  2 ===
                                                                                0
                                                                                  ? 'even'
                                                                                  : ''
                                                                              }
                                                                              ${
                                                                                this
                                                                                  .state
                                                                                  .index0 ===
                                                                                  index &&
                                                                                this
                                                                                  .state
                                                                                  .index1 ===
                                                                                  index2
                                                                                  ? 'current-item'
                                                                                  : ''
                                                                              }
                                                                              `}
                                  style={{
                                    display: 'flex',
                                    width: 'auto',
                                    cursor: 'pointer',
                                  }}
                                  key={index2}
                                  onClick={this.onCheck(
                                    item,
                                    item2,
                                    index,
                                    index2,
                                    index2,
                                  )}
                                  id={`item-service-search-${index}-${index2}`}
                                >
                                  <li
                                    className=""
                                    style={{
                                      width: 50,
                                      display: 'flex',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <CheckBox
                                      checked={item2.checked}
                                      style={{
                                        width: 18,
                                        height: 18,
                                        marginRight: 5,
                                      }}
                                    />
                                  </li>
                                  <li
                                    className=""
                                    style={{ width: 100 }}
                                    title={item2.value}
                                  >
                                    {item2.value}
                                  </li>
                                  <li
                                    className=""
                                    style={{ width: 300, textAlign: 'left' }}
                                    title={item2.name}
                                  >
                                    {item2.name}
                                  </li>
                                  <li className="" style={{ width: 90 }}>
                                    {this.getFormatPrice(
                                      item2.serviceUnitPrice,
                                    )}
                                  </li>
                                  <li className="" style={{ width: 90 }}>
                                    {this.getFormatPrice(
                                      item2.insuranceUnitPrice,
                                    )}
                                  </li>
                                  <li className="" style={{ width: 90 }}>
                                    {this.getFormatPrice(
                                      item2.differenceUnitPrice,
                                    )}
                                  </li>
                                  <li className="" style={{ width: 200 }}>
                                    {this.getRoom(item2)}
                                  </li>
                                </ul>
                              );
                            })}
                          </ul>
                        </ul>
                      );
                    })}
                </div>
              </MainInnerItem>
            </div>
            <div className="action-fillter-bottom">
              <div
                style={{
                  flex: 1,
                  textAlign: 'left',
                  marginLeft: 120,
                  color: '#00A9FF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontStyle: 'italic',
                }}
              >
                <div>
                  <img
                    src={require('resources/images/group-service/selected.png')}
                    style={{ width: 15, height: 10, marginRight: 5 }}
                    alt=""
                  />
                  {(() => {
                    return this.state.listSearch.filter(item => item.checked)
                      .length;
                  })()}{' '}
                  Đã chọn
                </div>
                <div
                  style={{
                    marginLeft: 50,
                    fontStyle: 'normal',
                    color: '#000',
                    fontWeight: 600,
                  }}
                >
                  [{(this.state.listSearch || []).length === 0 ? 0 : 1} -{' '}
                  {(this.state.listSearch || []).length === 0
                    ? 0
                    : Math.min(
                        (this.state.page + 1) * this.state.size,
                        (this.state.listSearch || []).length,
                      )}
                  /{(this.state.listSearch || []).length}]
                </div>
              </div>
              <KeyEventWrapper keyCode={13} keyAction={onSubmit}>
                <Button
                  icon={<img src="/images/icon-check-white.png" alt="" />}
                  onClick={onSubmit}
                  keyCode={115}
                  shortKey={'F4'}
                >
                  {'Xong'}
                </Button>
              </KeyEventWrapper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ListServiceSearch.defaultProps = {
  onSubmit: () => {}
};

ListServiceSearch.propTypes = {
  onSubmit: T.func,
};

export default connect(null, null, null, { forwardRef: true })(
  ListServiceSearch,
);
