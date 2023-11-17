import API, { mockApi } from "../helpers/api";
import { isEmpty } from "lodash";
import AuthModel from "../models/Auth";
import UserModel from "../models/User";

class AuthService {
	async login(email, password) {
		return API.post(
			"/login",
			{
				email,
				password,
				platform,
			},
			{ baseURL: mockApi }
		)
			.then(({ data }) =>
				AuthModel.fromJson({
					id: data.user.id,
					token: data.token,
					user: UserModel.fromJson(data.user),
				})
			)
			.catch((err) => {
				throw err;
			});
	}

	async getSettings() {
		// TODO: integrar con back
		return sleep(2000).then(() => ({
			setting: {},
		}));
	}

	async sendDeviceToken(fcmToken) {
		// TODO: integrar con back
		return sleep(2000).then(() => ({
			fcmToken,
		}));
	}

	async register(
		firstName,
		lastName,
		birthdate,
		gender,
		phoneNumber,
		email,
		password
	) {
		return API.post(
			"/customers",
			{
				firstName,
				lastName,
				birthDate:
					birthdate === "" ? null : moment(birthdate).format("YYYY-MM-DD"),
				gender: isEmpty(gender) ? null : gender,
				phone: isEmpty(phoneNumber) ? null : phoneNumber,
				password,
				passwordConfirm: password,
				email,
			},
			{ baseURL: mockApi }
		)
			.then(({ data }) =>
				AuthModel.fromJson({
					id: data.user.id,
					user: UserModel.fromJson(data.user),
					token: data?.token,
				})
			)
			.catch((err) => {
				throw err;
			});
	}

	async passwordRecovery(email) {
		return API.post(
			"/password-recovery",
			{
				email,
				platform,
			},
			{ baseURL: mockApi }
		).catch((err) => {
			throw err;
		});
	}

	async changePassword(password, passwordConfirmation) {
		return API.patch(
			"/me",
			{ password, passwordConfirmation },
			{ baseURL: mockApi }
		).catch((err) => {
			throw err;
		});
	}

	async logout() {
		return API.post("/logout", {}, { baseURL: mockApi }).catch((err) => {
			throw err;
		});
	}
}

export default AuthService;
