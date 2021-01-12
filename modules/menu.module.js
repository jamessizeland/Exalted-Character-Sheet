const { Menu } = require("electron");

function initMenu(isMac = false, isDev = false, clearCharacters) {
  const menu = [
    ...(isMac ? [{ role: "appMenu" }] : []),
    {
      role: "fileMenu",
    },
    {
      role: "editMenu",
    },
    {
      label: "Characters",
      submenu: [
        {
          label: "Clear Characters",
          click: () => clearCharacters(),
        },
      ],
    },
    ...(isDev
      ? [
          {
            label: "Developer",
            submenu: [
              { role: "reload" },
              { role: "forcereload" },
              { type: "separator" },
              { role: "toggledevtools" },
            ],
          },
        ]
      : []),
  ];

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
}

module.exports = initMenu;
