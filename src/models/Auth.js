import { makeObservable, observable } from "mobx";

class AuthModel {
	id = null;

	token = null;

	user = null;

	constructor(id, token, user) {
		makeObservable(this, {
			id: observable,
			token: observable,
			user: observable,
		});

		this.id = id;
		this.token = token;
		this.user = user;
	}

	static fromJson({ id, token, user }) {
		return new AuthModel(id, token, user);
	}
}

export default AuthModel;
