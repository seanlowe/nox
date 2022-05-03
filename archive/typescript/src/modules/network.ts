#!/usr/bin/env node

import Network = require('netgear');
import * as env from '../env';


export async function test() {
    const router = new Network();

    try {
        const options = { password: env.NETGEAR_PASS };
        await router.login(options);
        const devices = await router.getAttachedDevices();

        console.log(devices);
	} catch (error) {
		console.log(error);
	}
}