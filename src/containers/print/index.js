import React, { memo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/saga/injectSaga'
import PrinPDF from './component'
import reducer from './reducer'
import { selectHistorySigned } from './selectors'
import { createStructuredSelector } from 'reselect'
import { getHistorySigned } from './actions'
import saga from './saga'
import { context } from './constants'

export function Print(props) {
  useInjectReducer({ key: context, reducer })
  useInjectSaga({ key: context, saga })
  // const { getListPatient } = props
  // useEffect(() => {
  //   getListPatient()
  // }, [getListPatient])

  return (
        <PrinPDF ref={props.printRef} {...props} />
  )
}

export function mapDispatchToProps(dispatch) {
  return {
    getHistorySigned: data => dispatch(getHistorySigned(data)),
  }
}
const mapStateToProps = createStructuredSelector({
  listHistorySigned: selectHistorySigned(),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(Print)
