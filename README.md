# Kartotek: Bookmarks Manager Extension

Kartotek is a Chrome Extension for managing the 'Other bookmarks' folder.

Built with Vue 3 and TypeScript.

### [Link to Chrome Web Store](https://chrome.google.com/webstore/detail/kartotek/hcinbgecljcibhpfpjibkodifeaanjep)

![screen-capture (3)](https://github.com/aniamarkh/bookmarks/assets/93217444/40a5784c-a396-44ed-a5c8-6cb0fdbaae43)


## Features

- Manage bookmarks and folders in a new tab with a drag-and-drop interface
- Hide unnecessary bookmarks folders without deleting them from Chrome
- Customize a new tab design (color theme, font size and family, column count and width)
- Add, edit, delete, and move bookmarks and folders. **Be careful! All changes fully sync with Chrome**
- But... **The app syncs fully with Chrome only when a New Tab is opened**

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

## Extension loading for Development

1. Build the project.

```sh
npm run build
```

2. Open Google Chrome.
3. Go to the **Extensions** page
   - Type `chrome://extensions` into the URL bar.
   - Click the icon with three dots in the upper right corner of Chrome. Then hover on **More Tools** and then select **Extensions**.
4. Click the checkbox labeled **Developer mode** (at the top right corner of the list of extensions).
5. Click the **Load unpacked** button.
6. Find and select dist folder.
7. Open a new tab.
