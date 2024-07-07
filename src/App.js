import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import html2canvas from 'html2canvas';

import pencilTool from "./Assets/pencil-tool.png";
import eraserTool from "./Assets/eraser-tool.png";
import paintBucketTool from "./Assets/paint-bucket-tool.png";

import { filterRepeats } from './custom-modules/customModules';


function Grid({ numberOfRows, numberOfColumns, tool, color, clearGrid, inkSize, save, getGrid })
{
    // The only reason why this useState is not a constant, is to be accessable by other components.
    const [grid, setGrid] = useState([]);

    const [cnt, setCnt] = useState(0);
    const [theSrc, setTheSrc] = useState("");



    useEffect(() =>
    {
        if (clearGrid == true) setGrid([]);
    }, [clearGrid]);

    if (save == true) getGrid("", grid);


    function createGrid(numberOfRows, numberOfColumns, condition1, condition2)
    {
        let boardArray = [];

        let rowMax = numberOfRows;
        let columnMax = numberOfColumns;

        for (let rows = 1; rows <= rowMax; rows += 1)
        {
        rows % 2 == 0 ? columnMax = numberOfColumns + 1 : columnMax = numberOfColumns;

        for (let columns = 1; columns <= columnMax; columns += 1)
        {
            if ((columns == 1) && (columnMax == numberOfColumns + 1)) columns += 1;

            if (columns % 2 == 0) boardArray = [...boardArray, condition1];
            else boardArray = [...boardArray, condition2];
        }
        }

        return boardArray;
    }


    function setDraw(e, index, event)
    {
        e.preventDefault();
        if (event == "move")
        {
            let isScrubbing = (e.buttons & 1) === 1;
            if (isScrubbing == false) return;
        }


        let newGrid = grid;

        if (tool == "pencil")
        {
            if (newGrid[index] == color) return;
            newGrid[index] = color;
        }
        else if (tool == "eraser")
        {
            if (newGrid[index] == undefined) return;
            newGrid[index] = undefined;
        }
        else if (tool == "bucket")
        {
            floodFill(index, color);

            function floodFillV2(index, color)
            {
                let currentColor = newGrid[index];
                let colorQueue = [index];

                let pointer = index;


                let complete = false;
                while (!complete)
                {
                    let completing = true;

                    // step 1: fill the bottom
                    while (completing)
                    {
                        
                    }
                }
            }

            function floodFill(index, color)
            {
                let queue = [index];
                let toBeQueued = [];
                let lastQueued = [];
                let colorValue = newGrid[index];

                // console.log(colorValue);

                if (color == colorValue) return;
                
                while (queue.length != 0)
                {
                    for (let i = 0; i < queue.length; i+= 1)
                    {
                        newGrid[queue[i]] = color;
                        // console.log("colored: ", queue[i]);
                    }

                    // console.log("-------------------------");

                    for (let i = 0; i < queue.length; i += 1)
                    {
                        if ((newGrid[queue[i] + 1] == colorValue) && (Number.isInteger((queue[i] + 1) / numberOfColumns) == false))
                        {
                            toBeQueued = [...toBeQueued, queue[i] + 1];
                        }
                        if ((newGrid[queue[i] - 1] == colorValue) && (Number.isInteger(queue[i] / numberOfColumns) == false))
                        {
                            toBeQueued = [...toBeQueued, queue[i] - 1];
                        }
                        if ((newGrid[queue[i] - numberOfColumns] == colorValue) && ((queue[i] - numberOfColumns) >= 0))
                        {
                            toBeQueued = [...toBeQueued, queue[i] - numberOfColumns];
                        }
                        if ((newGrid[queue[i] + numberOfColumns] == colorValue) && ((queue[i] + numberOfColumns) <= ((numberOfColumns * numberOfRows) - 1)))
                        {
                            toBeQueued = [...toBeQueued, queue[i] + numberOfColumns];
                        }
                    }

                    queue = [];
                    queue = filterRepeats(toBeQueued);
                    toBeQueued = [];
                    
                }
                
            }
            
        }

        if ((tool == "pencil") || (tool == "eraser"))
        {
            if (inkSize > 1)
            {
                if (tool == "pencil")
                {
                    let canGoRight = true;
                    let canGoLeft = true;
                    let canGoUp = true;
                    let canGoDown = true;

                    function colorSidePixels(index, direction)
                    {
                        if (direction == "horizontal")
                        {
                            if (Number.isInteger((index + 1) / numberOfColumns) == false) newGrid[index + 1] = color;
                            if (Number.isInteger(index / numberOfColumns) == false) newGrid[index - 1] = color;
                        }
                        else if (direction == "vertical")
                        {
                            if (Number.isInteger(index - numberOfColumns >= 0)) newGrid[index - numberOfColumns] = color;
                            if (Number.isInteger(index + numberOfColumns <= (numberOfColumns * numberOfRows - 1))) newGrid[index + numberOfColumns] = color;
                        }
                        else console.error("Error! Could not specify the direction in colorSidePixels().");
                    }

                    for (let i = 1; i < inkSize; i += 1)
                    {
                        if ((Number.isInteger((index + i) / numberOfColumns) == false) && (canGoRight))
                        {
                            newGrid[index + i] = color;
                            if (i != (inkSize - 1)) colorSidePixels(index + i, "vertical");
                        }
                        else canGoRight = false;
                        if ((Number.isInteger((index - (i - 1)) / numberOfColumns) == false) && (canGoLeft))
                        {
                            newGrid[index - i] = color;
                            if (i != (inkSize - 1)) colorSidePixels(index - i, "vertical");
                        }
                        else canGoLeft = false;
                        if ((index - (numberOfColumns * i) >= 0) && (canGoUp))
                        {
                            newGrid[index - (numberOfColumns * i)] = color;
                            if (i != (inkSize - 1)) colorSidePixels(index - (numberOfColumns * i), "horizontal");
                        }
                        else canGoUp = false;
                        if ((index + (numberOfColumns * i) <= (numberOfColumns * numberOfRows - 1)) && (canGoDown))
                        {
                            newGrid[index + (numberOfColumns * i)] = color;
                            if (i != (inkSize - 1)) colorSidePixels(index + (numberOfColumns * i), "horizontal");
                        }
                        else canGoDown = false;
                    }
                }
            }
        }
        setGrid(newGrid);
        
        if (cnt == 0) setCnt(1);
        else setCnt(0);
    }

    function removeIndex(array, index)
    {
        let newArray = [];
        let newArrayIndex = 0;

        for (let i = 0; i < array.length; i += 1)
        {
            if (i == index) i += 1;
            newArray[newArrayIndex] = array[i];
            
            newArrayIndex += 1;
        }
        

        return newArray;
    }





    return (
        <>
            <div className="grid" id="grid" style={{ minWidth: `${numberOfColumns * 20}px`, minHeight: `${numberOfRows * 20}px`, width: `${numberOfColumns * 20}px`, height: `${numberOfRows * 20}px` }}>
            {
                createGrid(numberOfRows, numberOfColumns, "pix1", "pix2").map((value, index) => <div className={value} style={grid[index] == undefined ? {  } : { backgroundColor: grid[index] }} onClick={(e) => setDraw(e, index, "click")} onMouseMove={(e) => setDraw(e, index, "move")}></div>)
            }
            </div>
            <img src={theSrc} />
        </>
    );
}

function PureGrid({ numberOfColumns, numberOfRows, grid })
{
    function createGrid(numberOfRows, numberOfColumns, condition1, condition2)
    {
        let boardArray = [];

        let rowMax = numberOfRows;
        let columnMax = numberOfColumns;

        for (let rows = 1; rows <= rowMax; rows += 1)
        {
        rows % 2 == 0 ? columnMax = numberOfColumns + 1 : columnMax = numberOfColumns;

        for (let columns = 1; columns <= columnMax; columns += 1)
        {
            if ((columns == 1) && (columnMax == numberOfColumns + 1)) columns += 1;

            if (columns % 2 == 0) boardArray = [...boardArray, condition1];
            else boardArray = [...boardArray, condition2];
        }
        }

        return boardArray;
    }

    return (
        <div className="grid" style={{ minWidth: `${numberOfColumns}px`, minHeight: `${numberOfRows}px`, width: `${numberOfColumns}px`, height: `${numberOfRows}px` }}>
            {
                createGrid(numberOfRows, numberOfColumns, "", "").map((value, index) => <div style={grid[index] == undefined ? { width: "1px", height: "1px", background: "none" } : { width: "1px", height: "1px", backgroundColor: grid[index] }}></div>)
            }
        </div>
    );
}


function App()
{

    const [initiallized, setInitiallized] = useState(false);
    const [save, setSave] = useState(false);
    const [grid, setGrid] = useState([]);

    const [projectInfo, setProjectInfo] = useState({
        projectName: "Untitled",
        width: 0,
        height: 0,
        creatable: false
    });

    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const [inkSize, setInkSize] = useState(1);

    const [clearGrid, setClearGrid] = useState(false);

    const dataImage = useRef();

    

    useEffect(() =>
    { 
        if (clearGrid == true) setClearGrid(false);
    }, [clearGrid])

    let numberOfRows = Math.floor(projectInfo.width);
    let numberOfColumns = Math.floor(projectInfo.height);

    function getGrid(e, grid)
    {
        setGrid(grid);
    }

    function createImage()
    {
        const content = document.getElementById("pure-grid");
        html2canvas(content, {backgroundColor: null})
            .then((canvas) => 
            {
                let imgData = canvas.toDataURL("image/png");
                saveAs(imgData, "something.png");   
            })
            .catch((err) => console.log(err));

        function saveAs(url, fileName)
        {
            let link = dataImage.current;

            if (typeof link.download === "string")
            {
                dataImage.current.href = url;
                dataImage.current.download = fileName;

                dataImage.current.click();
            }
            else
            {
                window.open(url);
            }
        }
    }  

        

    if (initiallized == false)
    {
        if ((isNaN(Number(projectInfo.width)) != true) && (isNaN(Number(projectInfo.height)) != true) && (Number(projectInfo.width) != 0) && (Number(projectInfo.height) != 0) && (projectInfo.projectName != "")) projectInfo.creatable = true;
        else projectInfo.creatable = false;

        function createProject()
        {
            if (projectInfo.creatable == false) return;

            setInitiallized(true);
        }

          

        return (
            <div className="initial-container">
                <div className="initial-window">
                    <div className="initial-etc">
                        <div className="size-example-container">
                            <div className="size-example" style={{ width: `${projectInfo.width * 5}px`, height: `${projectInfo.height * 5}px` }}></div>
                        </div>
                    </div>
                    <div className="initial-configurations">
                        <div className="configurations-top">
                            <label style={{ display: "flex", alignItems: "center" }}>Width: <input value={projectInfo.width} onInput={(e) => setProjectInfo({...projectInfo, width: e.target.value})} style={{ height: "10px", padding: "5px", width: "100%", border: "1px solid rgb(41, 41, 41)", borderRadius: "3x", backgroundColor: "rgb(47, 47, 47)", marginLeft: "8px", marginRight: "4px" }} />px</label>
                            <label style={{ display: "flex", alignItems: "center" }}>Height: <input value={projectInfo.height} onInput={(e) => setProjectInfo({...projectInfo, height: e.target.value})} style={{ height: "10px", padding: "5px", width: "100%", border: "1px solid rgb(41, 41, 41)", borderRadius: "3x", backgroundColor: "rgb(47, 47, 47)", marginLeft: "8px", marginRight: "4px" }} />px</label>
                        </div>
                        <div className="configurations-bottom">
                            <button className={projectInfo.creatable == true ? "create-btn" : "uncreate-btn"} onClick={createProject}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else
    {
        return (
            <>
                <div style={save == true ? { display: "block" } : { display: "none" }} onClick={() => setSave(false)} className="save-container">
                    <div className="save-popup-container">
                        <div className="save-popup">
                            <span >Save as PNG</span> <br /> <br /> <br /> <br />
                            <div className="pure-grid-container">
                                <span id="pure-grid"><PureGrid numberOfColumns={numberOfColumns} numberOfRows={numberOfRows} grid={grid} /></span>
                            </div> <br /> <br /> <br /> <br />

                            <button className="save-as-image-btn" onClick={createImage}>Save Image</button>
                            <a ref={dataImage} style={{ display: "none" }}></a>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="toolbar-container">
                        <div className="toolbar">
                            <button className={tool == "pencil" ? "tool-btn tool-btn-selected" : "tool-btn"} onClick={() => setTool("pencil")}>
                                <img src={pencilTool} style={{ width: "20px" }} />
                            </button>
                            <button className={tool == "eraser" ? "tool-btn tool-btn-selected" : "tool-btn"} onClick={() => setTool("eraser")}>
                                <img src={eraserTool} style={{ width: "20px" }} />
                            </button>
                            <button className={tool == "bucket" ? "tool-btn tool-btn-selected" : "tool-btn"} onClick={() => setTool("bucket")}>
                                <img src={paintBucketTool} style={{ width: "20px" }} />
                            </button>
                        </div>
                    </div>
                    <div className="grid-container" id="grid-container">
                        <Grid numberOfRows={numberOfRows} numberOfColumns={numberOfColumns} color={color} tool={tool} clearGrid={clearGrid} inkSize={inkSize < 1 ? 1 : isNaN(inkSize) == true ? 1 : Math.floor(inkSize)} getGrid={getGrid} save={save} />
                    </div>
                    <div className="settings-container">
                        <div className="settings">
                            <button className="settings-btn" onClick={() => setClearGrid(true)}>Clear Grid</button>
                            <button className="settings-btn" onClick={() => setSave(true)}>Save as Image</button>
                            <input type="color" value={color} onInput={(e) => setColor(e.target.value)} />
                            <div className="settings-section">
                                <label style={{ alignSelf: "flex-start" }}>SECTION</label> <br />
                                <div>Ink Size: <input type="text" className="input settings-input" value={inkSize} onInput={(e) => setInkSize(e.target.value)} /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default App;