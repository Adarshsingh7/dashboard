/** @format */

import axios from 'axios';
import type { AxiosInstance } from 'axios';

class BaseService<T> {
	private api: AxiosInstance;
	constructor(base_url: string) {
		this.api = axios.create({
			baseURL: base_url,
			headers: {
				'Content-Type': 'application/json',
				// 'Authorization': `Bearer ${this.getToken()}`,
			},
		});
	}

	// create an item
	async create(obj: Partial<T>): Promise<void> {
		await this.api.post('', obj);
	}
}

export default BaseService;
