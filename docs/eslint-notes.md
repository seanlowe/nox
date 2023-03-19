## ESLint Notes

This project has an ESLint configuration file. In order to make the best use of it, add these lines to your workspace settings.

You can reach your workspace settings by hitting `Cmd + P`, then typing `> Preferences: Open Workspace Settings (JSON)`.

```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript"
  ]
```
