import axios from "axios";
import Qs from "qs";
import appConfig from "../config";

const API = axios.create({
	baseURL: `${appConfig.apiUrl}`,
	headers: {
		"X-Origin-Application": appConfig.appName,
		"Api-Version": appConfig.apiVersion,
		"Accept-Lenguage": "es-PY",
	},
	paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: "repeat" }),
});

let cancelTokenSource = axios.CancelToken.source();
const init = (rootStore) => {
	const { authStore } = rootStore;

	API.interceptors.response.use(
		(response) => {
			const { data = {}, meta = {} } = response;
			const { token } = meta;

			if (token) {
				// Renew Json Web Token
				authStore.setToken(token.access_token);
			}

			return data;
		},
		(responseError) => {
			if (axios.isCancel(responseError)) {
				return Promise.reject({ code: "cancelled" });
			}

			const { response, request } = responseError;

			if (response) {
				const { status, data = {} } = response;
				const { error = {} } = data;
				switch (true) {
					case status === 401:
						// Unauthorized
						if (authStore.isLoggedIn) {
							rootStore.logout();
						}
						return Promise.reject(error);
					case status === 403:
						// Forbidden
						return Promise.reject(error);
					case status === 409:
						// Client error
						return Promise.reject(data);
					case status >= 400 && status < 500:
						// Client error
						return Promise.reject(error);
					case status >= 500:
					default:
					// Server error
				}
			} else if (request) {
				return Promise.reject({ code: "networkError" });
			} else {
			}

			return Promise.reject(responseError);
		}
	);

	// Cancelable requests
	API.interceptors.request.use((config) => {
		/* eslint-disable no-param-reassign */
		config.headers.Accept = "application/json";

		const { token, registerToken } = authStore;

		if (token || registerToken) {
			config.headers.Authorization = `Bearer ${token || registerToken}`;
		}

		if (typeof config.cancelToken === "undefined") {
			config.cancelToken = cancelTokenSource.token;
		}

		return config;
		/* eslint-enable no-param-reassign */
	});
};

const cancelPromises = () => {
	if (cancelTokenSource) {
		cancelTokenSource.cancel();
		cancelTokenSource = axios.CancelToken.source();
	}
};

export const authApi = `${appConfig.microservice.auth}${appConfig.apiUrl}`;
export const customersApi = `${appConfig.microservice.customers}${appConfig.apiUrl}`;
export const storesApi = `${appConfig.microservice.stores}${appConfig.apiUrl}`;
export const publicationsApi = `${appConfig.microservice.publications}${appConfig.apiUrl}`;
export const invoicesApi = `${appConfig.microservice.invoices}${appConfig.apiUrl}`;
export const mockApi = `${appConfig.mockApiUrl}`;

export const { platform, tenantProvider } = appConfig;

API.cancelPromises = cancelPromises;
API.init = init;
export default API;
