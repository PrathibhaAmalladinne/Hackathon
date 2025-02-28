const url = '/url/';


export const API = {
	getReservationData(id, site) {
		const params = {
            id,
            site
		};

		return url.getRequest(params);
	}
}