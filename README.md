## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Extension loading for Development

1. Build the project.
```sh
npm run build
```
2. Open Google Chrome.
3. Go to the **Extensions** page
    * Type `chrome://extensions` into the URL bar.
    * Click the icon with three dots in the upper right corner of Chrome. Then hover on **More Tools** and then select **Extensions**.
4. Click the checkbox labeled **Developer mode** (at the top right corner of the list of extensions).
5. Click the **Load unpacked** button.
6. Find and select dist folder.
7. Open a new tab.