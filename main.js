/************************************************************
Top Level Application - Server Side
************************************************************/
const path = require("path");
const url = require("url");
const { app, BrowserWindow, ipcMain } = require("electron");
const Character = require("./models/Character.type");
const connectDB = require("./modules/db.module");
const Store = require("./modules/store.module");
const initMenu = require("./modules/menu.module");
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

// init store and defaults
const store = new Store({
  configName: "user-settings",
  defaults: {
    settings: {
      databaseKey: "",
    },
  },
});

// send Characters to Renderer - App.js
async function sendCharacters() {
  try {
    const Characters = await Character.find().sort({ created: 1 });
    mainWindow.webContents.send("Characters:get", JSON.stringify(Characters));
    console.log(Characters);
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

async function clearCharacters() {
  try {
    await Character.deleteMany({}); //empty object arg means delete all
    mainWindow.webContents.send("Characters:clear");
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

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  isDev = true;
}

/************************************************************
Set Listeners
************************************************************/

// events from renderer
ipcMain.on("Characters:load", sendCharacters);

ipcMain.on("Characters:add", async (e, item) => {
  console.log(item);
  try {
    await Character.create(item);
    sendCharacters();
  } catch (err) {
    reportError(err);
  }
});

ipcMain.on("Characters:delete", async (e, _id) => {
  try {
    await Character.findOneAndDelete({ _id });
    sendCharacters();
  } catch (err) {
    reportError(err);
  }
});

// set settings
ipcMain.on("settings:set", (e, value) => {
  store.set("settings", value);
  mainWindow.webContents.send("settings:get", store.get("settings"));
});

// app global events
app.on("ready", () => {
  createMainWindow();
  connectDB(password); // Connect to Database

  mainWindow.webContents.on("dom-ready", () => {
    //retrieve settings a soon as the dom is ready
    mainWindow.webContents.send("settings:get", store.get("settings"));
  });
  initMenu(isMac, isDev, clearCharacters);
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
