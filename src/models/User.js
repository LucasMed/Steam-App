import { makeObservable, observable } from "mobx";

class UserModel {
	id = null;

	email = null;

	isActive = null;

	constructor(id, email, active) {
		makeObservable(this, {
			id: observable,
			email: observable,
			isActive: observable,
		});

		this.id = id;
		this.email = email;
		this.isActive = active;
	}

	static fromJson({ id, email, active }) {
		return new UserModel(id, email, active);
	}
}

export default UserModel;
