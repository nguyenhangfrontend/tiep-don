import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { isFunction } from 'lodash';
import CloseIcon from 'resources/svg/close.svg';
import Wrapper from './Wrapper';
import { Main } from './styled';
import * as ModalAction from './RootModal/actions';

export { ModalAction };

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.node = null;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escClose);
    this.disabledTabIndex()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escClose);
  }
  enabledTabIndex = () => {
    let children = document.querySelectorAll('.active-element');
    children.forEach(child => {
      child.setAttribute('tabIndex', '0');
    });

    let childDropdoowwn = document.querySelectorAll('.active-dropdown input');
    childDropdoowwn.forEach(child => {
      child.setAttribute('tabIndex', '0');
    });
  };

  disabledTabIndex = () => {
    
    let children = document.querySelectorAll('.active-element');
    children.forEach(child => {
      child.setAttribute('tabIndex', '-1');
    });

    let childDropdoowwn = document.querySelectorAll('.active-dropdown input');
    childDropdoowwn.forEach(child => {
      child.setAttribute('tabIndex', '-1');
    });
  };

  escClose = e => {
    if (e && e.keyCode === 27) {
      this.customClose();
    }
  };

  close = () => {
    const { onClose, hideModal } = this.props;
    this.enabledTabIndex()
    if (onClose) {
      onClose();
    } else {
      hideModal();
    }
    
  };

  customClose = () => {
    const { callBackWithCustomClose } = this.props;

    if(callBackWithCustomClose) {
      callBackWithCustomClose();
    }

    this.close()
  };


  handleFooter = () => {
    const { footer } = this.props;
    if (!isFunction(footer)) {
      return footer;
    }
    return footer(this.close);
  };

  handleBody = () => {
    const { children } = this.props;
    if (!isFunction(children)) {
      return children;
    }
    return children(this.close);
  };

  render() {
    const { header, footer, width, isDark } = this.props;
    return (
      <Main ref={node => (this.node = node)} width={width} isDark={isDark}>
        <div className={'c-modal-mark'} onClick={this.customClose} />

        <div className={'c-modal-content'}>
          <div className={'c-modal-display'}>
            <button className={'close-btn icon-btn'} onClick={this.customClose}>
              {isDark ? <img alt="" src="/images/close.png" /> : <CloseIcon />}
            </button>
            {header && <div className={'c-modal-header'}>{header}</div>}

            <div className={'c-modal-body'}>{this.handleBody()}</div>

            {footer && (
              <div className={'c-modal-footer'}>{this.handleFooter()}</div>
            )}
          </div>
        </div>
      </Main>
    );
  }
}

Modal.defaultProps = {
  width: '70%',
  show: false,
  callBackWithCustomClose: null,
};

Modal.propTypes = {
  hideModal: T.func.isRequired,
  show: T.bool,
  header: T.node,
  callBackWithCustomClose: T.func,
  footer: T.oneOfType([T.node, T.func]),
  width: T.oneOfType([T.number, T.string]),
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(ModalAction.hideModal()),
  };
};
export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  Wrapper(Modal),
);
