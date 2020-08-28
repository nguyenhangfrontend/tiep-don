import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Selects from 'react-select';




class CheckOut extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <section className="emr-section">
                Thanh toán
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        userApp: state.global.userApp
    };
}
CheckOut.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (connect(mapStateToProps)(CheckOut));