import { get as _get } from "lodash";

import * as configs from "./configs";

const env = _get({}, "ENV_NAME", "development");
const config = configs[env];

console.log(`[${config.appName}] Environment detected: ${env}`);

export default {
	env,
	...config,
};
