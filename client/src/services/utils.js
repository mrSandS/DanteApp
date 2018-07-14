import {hostname} from "@consts/api";

class Utils {
  getAvatar (id) {
    return `${hostname}/api/authors/${id}/avatar`
  }
}

const $Utils = new Utils();

export default $Utils;