# Bookmarks Manager Extension (In Development)
Bookmarks Manager is a Chrome extension designed to enhance your bookmark management experience in Google Chrome. It replaces the default Chrome bookmarks folder with a new and intuitive interface, built with Vue 3, TypeScript, and Vite. This extension leverages the power of vueform and vue-draggable libraries to make your bookmark organization more efficient and streamlined.

## Features (Work In Progress)
- Manage bookmarks in a new tab.
- Drag and drop interface for easy organization.
- Hide unnecessary bookmarks folders.
- Qustomise a new tab design.
- Bulk edit, delete, and move bookmarks.
- Create and edit bookmark folders.
- Please note that the project is still in development, and the listed features are subject to change.


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
