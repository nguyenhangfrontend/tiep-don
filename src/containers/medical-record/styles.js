// 01DE9BY5ETNB3ZJ3ZTAC9JQBK7
import styled from 'styled-components';

export const Tabs = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const ChildTab = styled.div`
  flex: 1;
  height: 42px;
  margin-bottom: 0;
  padding: 7px;
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
  background-color: ${({ checked }) =>
    checked ? '#46ace0' : 'rgba(70, 172, 224, 0.2)'};
  color: ${({ checked, theme }) => (checked ? theme.whitePrimary : '#bbb')};
  cursor: pointer;
`;

export const RecordsButton = styled.button`
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  background-color: rgba(70, 172, 224, 0.2);
  color: ${({ theme }) => theme.whitePrimary};
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
`;

export const Service = styled.div`
  color: ${props =>
    props.isHighLight ? props.theme.blue : props.theme.whitePrimary};
  display: flex;
  align-items: center;
`;

export const ButtonForm = styled.i`
  font-size: 18px;
  color: ${props =>
    props.isHighLight ? props.theme.blue : props.theme.whitePrimary};
`;

export const Span = styled.span`
  flex: 1;
  padding-left: 10px;
  font-size: 14px;
  color: ${props =>
    props.isHighLight ? props.theme.blue : props.theme.whitePrimary};
`;

export const ButtonSub = styled.i`
  font-size: 10px;
  color: ${props =>
    props.isHighLight ? props.theme.blue : props.theme.whitePrimary};
`;

export const SpanSub = styled.span`
  color: ${props =>
    props.isHighLight ? props.theme.blue : props.theme.whitePrimary};
`;

export const RowSubMenu = styled.li`
  display: flex;
  align-items: flex-start;
`;

export const WrapperBtnSub = styled.div``;

export const WrapperNameSub = styled.div`
  margin-left: 4px;
`;
