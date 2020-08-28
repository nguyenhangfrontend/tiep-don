import styled from 'styled-components';

const Main = styled('div')`
`;

const Error = styled(Main)`
	color: ${props => props.theme.pink};
`;

const Primary = styled(Main)`
	color: ${props => props.theme.blue};
`;

const Success = styled(Main)`
	color: ${props => props.theme.green};
`;

const Warning = styled(Main)`
	color: ${props => props.theme.orangeMedium1};
`;

const Default = styled(Main)`
	color: ${props => props.theme.white};
`;

export { Error, Primary, Success, Warning, Default };
