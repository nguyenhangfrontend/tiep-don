import constants from 'resources/strings'
import request from 'utils/request'

export const fetchRooms = (data) => {
	return request(constants.api.room.get_all, {
		params: { ...data },
	})
};

export const fetchRoomsByServiceId = data => {
	return request(constants.api.room.service_rooms, {
		params: { ...data },
	})
};
