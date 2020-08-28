import styled from 'styled-components';

export const MainInnerItem = styled.div`
  background: url(${require('resources/images/group-service/empty.png')}), ${({ theme }) => theme.darkBlue1};
  background-size: 252px;
  overflow: ${({ hiddenOverflow }) => (hiddenOverflow ? 'hidden' : 'auto')};
  background-repeat: no-repeat;
  background-position: center;
  flex: 1;
  max-height: ${({ height }) => height || '400px'};
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.white1};
    border-radius: 20px;
    position: absolute;
    left: 0;
  }
`;

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.whitePrimary};
  flex: 1;
`;
