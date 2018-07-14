/**
 * Created by Sergun on 27.05.2018.
 */
/* eslint import/extensions: 0 */

import { AsyncStorage } from 'react-native';
const SESSION_TOKEN_KEY = '$session';

class Storage {

  setSessionToken(token) {
    return AsyncStorage.setItem(
      SESSION_TOKEN_KEY,
      token
    );
  }

  getSessionToken() {
    return AsyncStorage.getItem(SESSION_TOKEN_KEY);
  }

  cleanSessionToken() {
    return AsyncStorage.removeItem(SESSION_TOKEN_KEY);
  }
}

const AppStorage = new Storage();

export default AppStorage;
