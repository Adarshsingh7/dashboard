/** @format */
import { users } from '@/data/user.json';

export class UserService {
	private users: User[];

	constructor() {
		this.users = users;
	}

	// CREATE
	create(user: User): User {
		this.users.push(user);
		return user;
	}

	// READ ALL
	findAll(filter: { total?: number }): User[] {
		if (filter?.total === undefined) {
			return this.users;
		}
		return this.users.filter((_, i) => i < filter.total);
	}

	// READ BY ID
	findById(id: string): User | null {
		return this.users.find((u) => u.id === id) || null;
	}

	// UPDATE
	update(id: string, updatedData: Partial<User>): User | null {
		const index = this.users.findIndex((u) => u.id === id);
		if (index === -1) return null;

		const updated: User = {
			...this.users[index],
			...updatedData,
			updated_at: new Date().toISOString(),
		};

		this.users[index] = updated;
		return updated;
	}

	// DELETE
	delete(id: string): boolean {
		const index = this.users.findIndex((u) => u.id === id);
		if (index === -1) return false;

		this.users.splice(index, 1);
		return true;
	}
}

const userService = new UserService();
export { userService };
