import styled from 'styled-components';

const Main = styled('div')`
	& table {
		margin-bottom: 24px;
	}

	& thead {
		background-color: #CCEEFF;
		
		& tr {
			display: block;
			color: rgba(0, 0, 0, 0.8);
			font-size: 14px;
			
			& th {
				padding: 6px 12px;
				font-weight: normal;
				border: solid 1px rgba(0, 0, 0, 0.06);
			}
		}
		
		& tr:hover {
			background-color: #CCEEFF;
		}
	}
	
	& tbody {
		display: block;
		overflow-x: hidden;
		overflow-y: auto;
		height: 300px;
	
		& .group-line {
			& td {
				color: #0c89cb;
				background-color: #fff;
				text-align: left;
				font-size: 18px;
				
				& svg {
					width: 30px;
					height: 36px;
					margin-right: 12px;
				}
			}
		}
		
		& .numerical-order {
			background-color: #0c89cb;
			
			& td {
				color: #fff;
				text-align: left;
			}
			
			& .td-code {
				font-weight: bold;
			}
		}
		
		& tr {
			color: rgba(0, 0, 0, 0.8);
			background-color: #fff;
			
			& td {
				padding: 6px 12px;
				border: solid 1px rgba(0, 0, 0, 0.06);
			}
		}
	}
	
	& .color-row {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

export { Main };
