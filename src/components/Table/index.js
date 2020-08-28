import React, { memo, PureComponent } from 'react';
import Body from './Body';
import Header from './Header';
import { Main } from './styled';
class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {columns, rows, onClick } = this.props
    return (
      <Main className="table">
        <Header columns={columns} />
        <Body columns={columns} rows={rows} onClick={onClick} />{' '}
      </Main>
    );
  }
}
export default memo(Table);
