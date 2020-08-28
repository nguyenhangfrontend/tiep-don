import React, { Component } from 'react'
class CheckBox extends Component {
    render() {
        let checked = this.props.checked;
        let type = this.props.type;
        if (!checked)
            return (<img src={this.props.ic_uncheck ? this.props.ic_uncheck : require("resources/images/group-service/checkbox0.png")} {...this.props} />)
        if (this.props.ic_check)
            return (<img src={this.props.ic_check} {...this.props} />)
        if (type == 1)
            return (<img src={require("resources/images/group-service/checkbox2.png")} {...this.props} />)
        return (<img src={require("resources/images/group-service/checkbox1.png")}  {...this.props} />)
    }
}
export default CheckBox;