const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

const path = require("path");
const isDev = require("electron-is-dev");
const platform = process.platform;


let aboutWindow;

app.on("ready", () => 
{
    const win = new BrowserWindow({
        height: 700,
        width: 900,
        title: "Pixel Center",
        webPreferences: {
            nodeIntegration: true
        }
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);


    // if (mainMenu != undefined) Menu.setApplicationMenu(maipaintnMenu);

    win.loadURL(
        isDev ?
            "http://localhost:3000"
            :
            `file://${path.join(__dirname, "../build/index.html")}`
    );
});

function createAboutWindow()
{
    aboutWindow = new BrowserWindow({
        width: 410,
        height: 250,
        resizable: false,
        title: "About Pixel Center"
    });

    aboutWindow.loadURL(
        (isDev) ?
          `file://${path.join(__dirname, "./about-window/about.html")}`
          :
          `file://${path.join(__dirname, "../build/about-window/about.html")}`
      );
}


const menuTemplate = [
    {
        label: "Application",
        submenu: [
            {
                label: "About",
                click()
                {
                    createAboutWindow();
                }
            },
            {
                label: "Quit",
                accelerator: (platform == "darwin") ? "Command+Q" : "Ctrl+Q",
                click()
                {
                    app.quit();
                }
            }
        ]
    }
];
