import { makeAutoObservable, observable } from "mobx";

import AuthStore from "./AuthStore";

class RootStore {
	constructor() {
		this.authStore = new AuthStore();

		makeAutoObservable(this, {
			authStore: observable,
		});
	}

	async logout() {
		try {
			await this.authStore.logout();
			await this.authStore.clear();
		} catch (error) {
			// logout
		}
	}
}

export default RootStore;
