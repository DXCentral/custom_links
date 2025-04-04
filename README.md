# FM-DX Webserver Custom_Links Plugin

This plugin adds customizable buttons to the FM-DX Webserver interface that open external URLs in draggable iframe windows.

![Custom_Links plugin screenshot](https://drive.google.com/file/d/10OcQ9OuyLhXryt-dcjEJg4pB4GiN-j0K/view?usp=drive_link)

## Installation

1. Copy the `Custom_LinksPlugin.js` file and the `Custom_Links` folder into your FM-DX Webserver's `plugins` directory.
2. Restart your FM-DX Webserver.
3. Enable the plugin in the administration panel.
4. Edit the button titles and URLs inside `Custom_Links/custom_links.js` to suit your needs.
5. Enjoy your customized experience!

## Configuration Example

Inside `custom_links.js`, modify the following section with your own values:

```js
const customLinksConfig = [
  {
    label: "Your Button Title Here",
    url: "https://www.enteryoururlhere.com"
  },
  {
    label: "Another Button Title",
    url: "https://www.anotherurl.com"
  }
];
```

## Credits

Created by **Loyd Van Horn/DX Central**  
License: GNU General Public License v3 (GPL-3.0)