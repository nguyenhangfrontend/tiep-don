import constants from 'resources/strings'
import request from 'utils/request'

export const fetchDepartments = (data) => {
	let page = '0', size = '1000';

	return request(constants.api.department.get_all, {
		params: { page, size, ...data },
	})
};
