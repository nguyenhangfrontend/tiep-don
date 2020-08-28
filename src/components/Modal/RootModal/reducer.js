import produce from 'immer';
import * as types from './constants';

export const initialState = {
  modalQ: [],
  current: _blankModal(),
};

const modal = (state = initialState, action) =>
  produce(state, draftState => {
    switch (action.type) {
      case types.SHOW_MODAL:
        return queueModal(draftState, action.payload);
      case types.STACK_MODAL:
        return stackModal(draftState, action.payload);
      case types.TOP_MODAL:
        return topModal(draftState, action.payload);
      case types.REPLACE_MODAL:
        return replaceModal(draftState, action.payload);
      case types.HIDE_MODAL:
        return hideModal(draftState);
      default:
        return state;
    }
  });

function _newModal(action) {
  return {
    modalType: action.modalType,
    modalProps: action.modalProps,
  };
}

function _blankModal() {
  return {
    modalType: null,
    modalProps: {},
  };
}

function _isPresent(current) {
  return !!current.modalType;
}

// Append new modal to queue
function queueModal(state, action) {
  const newModal = _newModal(action);
  const newQ = state.modalQ.slice();
  newQ.push(newModal);
  const _current = _isPresent(state.current) ? state.current : newQ.shift();
  return {
    ...state,
    modalQ: newQ,
    current: _current,
  };
}

// Prepend current modal to queue and show new modal immediately
function stackModal(state, action) {
  const newModal = _newModal(action);
  const oldModal = { ...state.current };
  const newQ = state.modalQ.slice();
  newQ.unshift(oldModal);
  const _current = newModal;
  return {
    ...state,
    modalQ: newQ,
    current: _current,
  };
}

// Prepend new modal to queue
function topModal(state, action) {
  const newModal = _newModal(action);
  const newQ = state.modalQ.slice();
  newQ.unshift(newModal);
  const _current = _isPresent(state.current) ? state.current : newQ.shift();
  return {
    ...state,
    modalQ: newQ,
    current: _current,
  };
}

function replaceModal(state, action) {
  const newModal = _newModal(action);
  return {
    ...state,
    current: newModal,
  };
}

function hideModal(state) {
  const newQ = state.modalQ.slice();
  const nextModal = newQ.shift();
  const _current = nextModal || _blankModal();
  return {
    ...state,
    modalQ: newQ,
    current: _current,
  };
}

export default modal;
