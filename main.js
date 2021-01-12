/************************************************************
Top Level Application - Server Side
************************************************************/
const path = require("path");
const url = require("url");
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const Character = require("./models/Character.type");
const connectDB = require("./config/db.module");
const password = "";

/************************************************************
Define Functions
************************************************************/
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 1600 : 1300,
    height: 1000,
    show: true,
    backgroundColor: "white",
    icon: "./assets/icon.png",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let indexPath;

  if (isDev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8081", // might have to modify this if your dev port is different (default was 8080)
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open devtools if dev
    if (isDev) {
      console.log("main.js loaded");
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

// send logs to Renderer - App.js
async function sendLogs() {
  try {
    const logs = await Character.find().sort({ created: 1 });
    mainWindow.webContents.send("logs:get", JSON.stringify(logs));
    console.log(logs);
  } catch (err) {
    reportError(err);
  }
}

async function reportError(error) {
  try {
    mainWindow.webContents.send("error:report", JSON.stringify(error));
  } catch (err) {
    console.error(err);
  }
}

async function clearLogs() {
  try {
    await Character.deleteMany({}); //empty object arg means delete all
    mainWindow.webContents.send("logs:clear");
  } catch (err) {
    reportError(err);
  }
}

/************************************************************
Initialize Program
************************************************************/
let mainWindow;
let isDev = false;
const isMac = process.platform === "darwin";
connectDB(password); // Connect to Database

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  isDev = true;
}
const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    role: "fileMenu",
  },
  {
    role: "editMenu",
  },
  {
    label: "Logs",
    submenu: [
      {
        label: "Clear Logs",
        click: () => clearLogs(),
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
/************************************************************
Set Listeners
************************************************************/

// events from renderer
ipcMain.on("logs:load", sendLogs);

ipcMain.on("logs:add", async (e, item) => {
  console.log(item);
  try {
    await Character.create(item);
    sendLogs();
  } catch (err) {
    reportError(err);
  }
});

ipcMain.on("logs:delete", async (e, _id) => {
  try {
    await Character.findOneAndDelete({ _id });
    sendLogs();
  } catch (err) {
    reportError(err);
  }
});

// app global events
app.on("ready", () => {
  createMainWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop error
app.allowRendererProcessReuse = true;
