#!/usr/bin/env node

import Network = require('netgear');
import * as env from '../env';


export async function test() {
    const router = new Network();

    try {
        const options = { password: env.NETGEAR_PASS };
			await router.login(options);
			const systemInfo = await router.getInfo();
            console.log(systemInfo);

            // WOL not working but other netgear functions are
            // await router.wol(env.SEAN_TOWER_MAC, "00:00:00:00:00:00");
	} catch (error) {
		console.log(error);
	}
}