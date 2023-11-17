import { makeAutoObservable, observable, action, runInAction, computed } from 'mobx';

import StorageHelper from '../helpers/storage';
import AuthService from '../services/AuthService';
import UserModel from '../models/User';

const STORAGE_KEYS = {
  ID: 'id',
  TOKEN: 'token',
  USER: 'user',
  LANG: 'lang',
};

const INITIAL_STATE = {
  id: null,
  token: null,
  user: null,
  lang: 'es',
  settingLoaded: false,
  settings: {},
  isError: false,
};

class AuthStore {
  id = INITIAL_STATE.id;

  isLoaded = false;

  token = INITIAL_STATE.token;

  isLoading = false;

  user = INITIAL_STATE.user;

  lang = INITIAL_STATE.lang;

  settingLoaded = INITIAL_STATE.settingLoaded;

  settings = INITIAL_STATE.settings;

  isError = INITIAL_STATE.isError;

  constructor() {
    this.authService = new AuthService();

    makeAutoObservable(this, {
      id: observable,
      isLoaded: observable,
      token: observable,
      isLoding: observable,
      user: observable,
      lang: observable,
      isError: observable,

      loadFromStorage: action,
      login: action,
      checkAccount: action,
      checkSession: action,
      register: action,
      setLang: action,
      clear: action,

      isLoggedIn: computed,
      isLoginStarted: computed,
      isAnActiveUser: computed,
    });

    this.loadFromStorage()
      .then(() => {
        this.checkSession(this.token);
      })
      .catch((err) => {
        this.isLoaded = true;
        throw err;
      });
  }

  async loadFromStorage() {
    const keys = Object.values(STORAGE_KEYS);
    const data = await StorageHelper.get(keys);

    keys.forEach((key, i) => {
      if (data[i]) {
        runInAction(() => {
          this[key] = data[i];
        });
      }
    });
    runInAction(() => {
      this.isLoaded = true;
    });
  }

  initLogin(data) {
    const keys = Object.values(STORAGE_KEYS);
    runInAction(() => {
      this.id = data?.user?.id;
      this.token = data.token;
      this.user = UserModel.fromJson(data.user);
    });

    keys.forEach((key) => {
      if (data[key]) {
        runInAction(() => {
          this[key] = data[key];
        });
      }
    });

    return StorageHelper.save(Object.values(STORAGE_KEYS).map((key) => [key, this[key] || '']));
  }

  async login(email, password) {
    runInAction(() => {
      this.loading = true;
    });

    try {
      const data = await this.authService.login(email, password);
      runInAction(() => {
        this.initLogin(data);
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.loading = false;
        this.isError = true;
      });
      throw err;
    }
  }


  get isLoggedIn() {
    return !!this.token && this.isAnActiveUser;
  }

  get isLoginStarted() {
    return !!this.id;
  }

  async getSettings() {
    try {
      const data = {};
      runInAction(() => {
        this.settings = data;
        this.settingLoaded = true;
      });
    } catch (err) {
      throw err;
    }
  }

  async checkSession(token) {
    try {
      // TODO: cambiar por el requerido
      const fcmToken = 'test';

      if (token) {
        const data = await this.authService.checkSession(token, fcmToken);
        this.initLogin(data);
      }
    } catch (err) {
      // Session expired
    }
  }

  async register(email, password) {
    this.loading = true;

    try {
      const response = await this.authService.register(
        email,
        password,
      );
      runInAction(() => {
        this.id = response.id;
        this.user = response;
        this.registerToken = response.token;
        this.loading = false;
        this.isError = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.isError = true;

        ReportingHelper.reportError(error);
        throw error;
      });
    }
  }

  async passwordRecovery(email) {
    this.loading = true;
    try {
      await this.authService.passwordRecovery(email);
      runInAction(() => {
        this.loading = false;
      });
    } catch (err) {
      this.loading = false;
      throw err;
    }
  }

  async changePassword(password, passwordConfirmation) {
    this.loading = true;
    try {
      await this.authService.changePassword(password, passwordConfirmation);
      runInAction(() => {
        this.loading = false;
      });
    } catch (err) {
      this.loading = false;
      throw err;
    }
  }

  clear() {
    const keys = Object.keys(INITIAL_STATE);
    runInAction(() => {
      this.token = null;
      this.user = null;
    });

    keys.forEach((key) => {
      runInAction(() => {
        this[key] = INITIAL_STATE[key];
      });
    });

    return StorageHelper.delete(Object.values(STORAGE_KEYS));
  }

  setLang(value) {
    this.lang = value;
  }

  async logout() {
    runInAction(() => {
      this.loading = true;
    });
    try {
      await this.authService.logout();
      runInAction(() => {
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.loading = false;
        this.isError = true;
      });
      ReportingHelper.reportError(err);
    }
  }
}

export default AuthStore;
export { STORAGE_KEYS };
