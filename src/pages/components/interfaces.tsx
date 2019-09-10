export interface FbEvent {
	id: string;
	description: string;
	end_time: string;
	name: string;
	place: {
		id?: string;
		name: string;
		location?: {
			city?: string;
			city_id?: number;
			country?: string;
			country_code?: string;
			latitute?: number;
			located_in?: string;
			longitute?: number;
			name?: string;
			region?: string;
			region_id?: number;
			state?: string;
			street?: string;
			zip?: string;
		};
	};
	start_time: string;
}

export interface MyEvent {
	name: string;
	description: string;
	location: string;
	end: Date;
	start: Date;
	allday: boolean;
	id: string;
}
