/**
 * @overview A minimalistic wrapper around React Native's AsyncStorage.
 * @license MIT
 * @see https://github.com/jasonmerino/react-native-simple-store
 */
import { merge } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
	/**
	 * Get a one or more value for a key or array of keys from AsyncStorage
	 * @param {String|Array} key A key or array of keys
	 * @return {Promise}
	 */
	static get(key) {
		if (!Array.isArray(key)) {
			return AsyncStorage.getItem(key).then((value) =>
				value ? JSON.parse(value) : null
			);
		}
		return AsyncStorage.multiGet(key).then((values) =>
			values.map((value) => JSON.parse(value[1]))
		);
	}

	/**
	 * Save a key value pair or a series of key value pairs to AsyncStorage.
	 * @param  {String|Array} key The key or an array of key/value pairs
	 * @param  {*} value The value to save
	 * @return {Promise}
	 */
	static save(key, value = null) {
		if (!Array.isArray(key)) {
			return AsyncStorage.setItem(key, JSON.stringify(value));
		}
		const pairs = key.map((pair) => [pair[0], JSON.stringify(pair[1])]);
		return AsyncStorage.multiSet(pairs);
	}

	/**
	 * Updates the value in the store for a given key in AsyncStorage.
	 * If the value is a string it will be replaced. If the value is an object it will be deep merged.
	 * @param  {String} key The key
	 * @param  {*} value The value to update with
	 * @return {Promise}
	 */
	static update(key, value) {
		return this.get(key).then((item) => {
			const finalValue =
				typeof value === "string" ? value : merge({}, item, value);
			return this.save(key, JSON.stringify(finalValue));
		});
	}

	/**
	 * Delete the value for a given key in AsyncStorage.
	 * @param  {String|Array} key The key or an array of keys to be deleted
	 * @return {Promise}
	 */
	static delete(key) {
		if (Array.isArray(key)) {
			return AsyncStorage.multiRemove(key);
		}
		return AsyncStorage.removeItem(key);
	}

	/**
	 * Get all keys in AsyncStorage.
	 * @return {Promise} A promise which when it resolves gets passed the saved keys in AsyncStorage.
	 */
	static keys() {
		return AsyncStorage.getAllKeys();
	}

	/**
	 * Push a value onto an array stored in AsyncStorage by key
	 * or create a new array in AsyncStorage for a key if it's not yet defined.
	 * @param {String} key They key
	 * @param {*} value The value to push onto the array
	 * @return {Promise}
	 */
	static push(key, value) {
		return this.get(key).then((currentValue) => {
			if (currentValue === null) {
				// if there is no current value populate it with the new value
				return this.save(key, [value]);
			}
			if (Array.isArray(currentValue)) {
				return this.save(key, [...currentValue, value]);
			}
			throw new Error(
				`Existing value for key "${key}" must be of type null or Array, received ${typeof currentValue}.`
			);
		});
	}
}

export default Storage;
