import styled from 'styled-components';

const Main = styled('div')`
	display: flex;
	color: ${props => props.type === 'light' ? props.theme.black : props.theme.white};
	
	& h4 {
		color: ${props => props.type === 'light' ? props.theme.black : props.theme.white};
		margin-bottom: 12px;
		text-align: right;
	}
	
	& p {
		text-align: right;
		margin-bottom: 3px;
	}
	
	& .user-base-info {
		margin-right: 12px;
	}
	
	& .user-avatar {
		width: 60px;
    height: 74px;
    border-radius: 10px;
    object-fit: cover;
	}
`;

export { Main };
