export interface Waypoint {
	id: string;
	name: string;
	location: string;
	coordinates: [number, number];
	zoom: number;
	description: string;
	dateRange: string;
}
