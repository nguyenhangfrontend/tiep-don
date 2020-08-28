import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectServices } from 'containers/book-service/selectors';

class GroupService extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            menus: {},
            servicesChecked: [],
            type: 1
        }
    }

    componentDidMount() {
      this.show();
    }

    show = () => {
        const { services } = this.props;
        let data = {};
        services.forEach(item => {
            if (item.serviceGroupLevel1Id) {
                if (item.serviceGroupLevel1.active) {
                    if (!data[item.serviceGroupLevel1Id]) {
                        data[item.serviceGroupLevel1Id] = {
                            item: item.serviceGroupLevel1,
                            level: 1,
                            childs: {}
                        }
                    }
                    if (item.serviceGroupLevel2Id) {
                        if (item.serviceGroupLevel2.active) {
                            if (!data[item.serviceGroupLevel1Id].childs[item.serviceGroupLevel2Id]) {
                                data[item.serviceGroupLevel1Id].childs[item.serviceGroupLevel2Id] = {
                                    item: item.serviceGroupLevel2,
                                    level: 2,
                                    childs: {}
                                }
                            }
                            if (item.serviceGroupLevel3Id) {
                                if (item.serviceGroupLevel3.active) {
                                    if (!data[item.serviceGroupLevel1Id].childs[item.serviceGroupLevel2Id].childs[item.serviceGroupLevel3Id]) {
                                        data[item.serviceGroupLevel1Id].childs[item.serviceGroupLevel2Id].childs[item.serviceGroupLevel3Id] = {
                                            item: item.serviceGroupLevel3,
                                            level: 3,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (item.serviceType === 170) {
                if (!data[item.serviceType]) {
                    data[item.serviceType] = [];
                }
                data[item.serviceType].push({
                    item: item,
                    type: "pdm"
                });
            }
        });
        this.setState({
            menus: data,
            services
        }, () => {
            if (this.props.groupChange)
                this.props.groupChange(services);
            this.showLevel3(this.state.type)();
        })
    };
    selectItem = (item) => () => {
        if (!item.item) {
            this.setState({
                type: 0,
                showLevel: 0,
                currentGroup: null
            }, () => {
                if (this.props.onTypeChange)
                    this.props.onTypeChange(0);
                if (this.props.groupChange) {
                    this.props.groupChange(this.state.services.filter(item2 => {
                        return !item2.serviceGroupLevel1Id
                    }));
                }
            });
            return;
        }
        let list = [];
        if (item && this.state.services) {
            switch (item.level) {
                case 1:
                    list = this.state.services.filter(item2 => {
                        return item2.serviceGroupLevel1Id === item.item.id
                    });
                    break;
                case 2:
                    list = this.state.services.filter(item2 => {
                        return item2.serviceGroupLevel2Id === item.item.id
                    });
                    break;
                case 3:
                    list = this.state.services.filter(item2 => {
                        return item2.serviceGroupLevel3Id === item.item.id
                    });
                    break;
            }
        }

        this.setState({
            currentGroup: item,
            type: 1
        }, () => {
            if (this.props.groupChange) {
                this.props.groupChange(list);
            }
            if (this.props.onTypeChange) {
                this.props.onTypeChange(1);
            }
        });
    };
    expandOrCollapse = (item, id) => () => {

        item.open = !item.open;
        this.setState({
            showLevel: 0,
            isOpen: item.open,
            selectedItemIndex: id,
            menus: { ...this.state.menus }
        })

    };

    selectType(type) {
        if (type !== this.state.type) {
            if (type === 1) {
                this.showLevel3(type)();
            }
            else {
                this.showLevel1(type)();
            }
        } else {
            if (type === 0)
                this.showLevel1(type)();
        }
    }

    renderMenu(menus, level) {
        let menusKey = [];
        if (level === 1)
            menusKey = Object.keys(menus).sort((itema, itemb) => {
                if (!menus[itema].item || !menus[itemb].item)
                    return 1;
                return menus[itema].item.sequenceNo > menus[itemb].item.sequenceNo ? 1 : -1;
            });
        else
            menusKey = Object.keys(menus).sort((itema, itemb) => {
                if (!menus[itema].item || !menus[itemb].item)
                    return 1;
                return menus[itema].item.name.unsignText().trim() > menus[itemb].item.name.unsignText().trim() ? 1 : -1;
            });

        if (menusKey && menusKey.length)
            return menusKey.map((item, index) => {

                if (!menus[item].item) {
                    if (menus[item].length > 0) {
                        return <li onClick={this.selectItem(menus[item])} key={index} className={`menu-item menu-level pdm ${this.state.type === 0 ? "active" : ""}`} >
                            <a href="javascript:void(0)" style={{ marginLeft: 34 }}>
                                {
                                    <img src={this.getIcon("PDM")} style={{ width: 18, marginRight: 10 }} />
                                }
                                {"Phác đồ mẫu"}
                            </a>
                        </li>
                    } else
                        return null;
                }
                return item ? <li key={index} level={menus[item].level} className={'menu-item menu-level' + menus[item].level} >
                    <button onClick={this.expandOrCollapse(menus[item], menus[item].item.id)} className={menus[item].childs && Object.keys(menus[item].childs).length ? menus[item].open ? "menu-icon active-menu" : "menu-icon inactive-menu" : "menu-icon"}>
                        {/* {menus[item].checked ? 1 : 0} */}
                    </button>
                    <a href="javascript:void(0)" onClick={this.selectItem(menus[item])} className={this.state.currentGroup === menus[item] ? "hight-light" : ''}>
                        {
                            level === 1 ?
                                <img src={this.getIcon(menus[item].item.value)} style={{ width: 18, marginRight: 10 }} /> :
                                <div style={{ width: 28 }} />
                        }
                        {menus[item].item.name}
                    </a>
                    {
                        (menus[item].open && menus[item].childs && Object.keys(menus[item].childs).length) ?
                            <ul style={{ marginLeft: 20 }}>
                                {
                                    this.renderMenu(menus[item].childs, level + 1)
                                }
                            </ul> : null
                    }</li > : null
            });
    }
    showLevel1 = (type) => () => {

        let menus = { ...this.state.menus };
        for (let key in menus) {
            menus[key].open = false;
            if (menus[key].childs)
                for (let key2 in menus[key].childs) {
                    menus[key].childs[key2].open = false;
                    if (menus[key].childs[key2].childs)
                        for (let key3 in menus[key].childs[key2].childs) {
                            menus[key].childs[key2].childs[key3].open = false;
                        }
                }
        }
        this.setState({ menus: menus, showLevel: type === 0 ? 0 : 1, currentGroup: null, type }, () => {
            if (this.props.groupChange) {
                this.props.groupChange(this.state.services.filter(item => ((type === 0 && !item.serviceGroupLevel1) || (type === 1 && item.serviceGroupLevel1))));
            }
        });

    };
    showLevel2 = (type) => () => {
        let menus = { ...this.state.menus };
        for (let key in menus) {
            menus[key].open = true;
            if (menus[key].childs) {
                for (let key2 in menus[key].childs) {
                    menus[key].childs[key2].open = false;
                    if (menus[key].childs[key2].childs)
                        for (let key3 in menus[key].childs[key2].childs) {
                            menus[key].childs[key2].childs[key3].open = false;
                        }
                }
            }
        }
        this.setState({ menus: menus, showLevel: 2, type }, () => {
            if (this.props.groupChange) {
                this.props.groupChange(this.state.services);
            }
        });

    };
    showLevel3 = (type) => () => {
        let menus = { ...this.state.menus };
        for (let key in menus) {
            menus[key].open = true;
            if (menus[key].childs) {
                for (let key2 in menus[key].childs) {
                    menus[key].childs[key2].open = true;
                    if (menus[key].childs[key2].childs) {
                        for (let key3 in menus[key].childs[key2].childs) {
                            menus[key].childs[key2].childs[key3].open = false;
                        }
                    }
                }
            }
        }
        this.setState({ menus: menus, showLevel: 3, type }, () => {
            if (this.props.groupChange) {
                this.props.groupChange(this.state.services);
            }
        });

    };

    getIcon = (value) => {
        switch (value) {
            case "KB":
                return require("resources/images/group-service/khambenh.png");
            case "XN":
                return require("resources/images/group-service/xetnghiem.png");
            case "TT":
                return require("resources/images/group-service/thuthuat.png");
            case "CDHA":
                return require("resources/images/group-service/chandoanhinhanh.png");
            case "KHAC":
                return require("resources/images/group-service/dichvukhac.png");
            case "TDCN":
                return require("resources/images/group-service/thamdochucnang.png");
            case "PT":
                return require("resources/images/group-service/phauthuat.png");
            case "PDM":
                return require("resources/images/group-service/phacdomau0.png");

        }
        return require("resources/images/group-service/khambenh.png");
    };

    render() {
        return (
            <div className="col-md-2 pr-0 custom-md2">
                <div className="menu-inner">
                    <div style={{ display: 'flex' }}>
                        <div className="head-menu text-center" style={{
                            fontWeight: 'bold', color: '#00A9FF',
                            flex: 1,
                            alignSelf: 'center',
                            fontSize: 18,
                        }}>
                            TẤT CẢ CÁC DỊCH VỤ
                </div>
                        <div className="menu-control">
                            <button className={this.state.showLevel === 1 ? "active" : ""} onClick={this.showLevel1(this.state.type)}>1</button>
                            <button className={this.state.showLevel === 2 ? "active" : ""} onClick={this.showLevel2(this.state.type)}>2</button>
                            <button className={this.state.showLevel === 3 ? "active" : ""} onClick={this.showLevel3(this.state.type)}>3</button>
                        </div>
                    </div>
                    <ul className="menu-list mostly-customized-scrollbar">
                        {
                            this.state.menus && Object.keys(this.state.menus).length ?
                                this.renderMenu(this.state.menus, 1)
                                :
                                <li className="menu-item loading">
                                    <img src={"/images/loading.gif"} style={{ width: 50 }} />
                                </li>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapState = createStructuredSelector({
   services:  selectServices(),
});

export default connect(mapState, null, null, { forwardRef: true })(GroupService);


