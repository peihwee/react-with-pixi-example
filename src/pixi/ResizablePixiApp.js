import * as PIXI from 'pixi.js'

class ResizablePixiApp
{
    constructor(div, width=1080, height=720)
    {
        this.resizePixi = this.resizePixi.bind(this);
        this.getPixiApp = this.getPixiApp.bind(this);
        
        this.divHolder = div;

        this.pixiSizeWidth = width;
        this.pixiSizeHeight = height;

        this.objPixiApp = new PIXI.Application(
            {
                width: this.pixiSizeWidth,
                height: this.pixiSizeHeight,
                backgroundColor: 0xFFFFFF,
                resizeTo: this.divHolder
            }
        );

        this.divHolder.appendChild(this.objPixiApp.view);
        this.objPixiApp.start();

        this.resizePixi();

        window.addEventListener('resize', this.resizePixi);
        window.addEventListener('load', this.resizePixi);
        document.addEventListener('DOMContentLoaded', this.resizePixi);
    }
    
    resizePixi()
    {
        try
        {
            let iRatio = this.divHolder.scrollWidth / this.pixiSizeWidth;
            this.divHolder.style.height = this.pixiSizeHeight * iRatio + "px";

            //console.log("this.objPixiApp.stage:"+this.objPixiApp.stage);
            //console.log("iRatio:"+iRatio);
            //console.log("this.divHolder.scrollWidth :"+this.divHolder.scrollWidth);
            //console.log("this.divHolder.scrollHeight :"+this.divHolder.scrollHeight);

            this.objPixiApp.stage.scale.x = this.objPixiApp.stage.scale.y = iRatio;
            this.objPixiApp.resize(this.divHolder.offsetWidth, this.divHolder.scrollHeight);
        }
        catch(error)
        {
            //console.error(error);
        }
    }

    getPixiApp()
    {
        return this.objPixiApp;
    }

    get width()
    {
        return this.pixiSizeWidth;
    }

    get height()
    {
        return this.pixiSizeHeight;
    }
}

export default ResizablePixiApp;