#!/usr/bin/env node

// file for consolidating functions that pertain to app settings

// possible functions
// users [add, remove]
// rss feeds [add, remove]
// env [add, edit, remove]

import { showRssSettings } from './wip/rss'
import { showUserSettings } from './wip/user'

export function showSettings() {
    showRssSettings()
    showUserSettings()
}
