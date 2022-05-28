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

        this.pixiScreenRatio =  this.pixiSizeHeight / this.pixiSizeWidth;

        this.objPixiApp = new PIXI.Application(
            {
                width: this.pixiSizeWidth,
                height: this.pixiSizeHeight,
                backgroundColor: 0x000,
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
        /////////////////////////////////////////////////////////////
        // Learnt about clientWidth, scrollWidth
        // Concluded that offsetWidth is the most accurate way
        // suitable for screen rotation also.
        /////////////////////////////////////////////////////////////

        
        //this.divHolder.style.height = this.pixiSizeHeight * iRatio + "px";
        //console.log("this.pixiScreenRatio:"+this.pixiScreenRatio);

        this.divHolder.style.height = (this.divHolder.offsetWidth * this.pixiScreenRatio) + "px";
        
        try
        {
            /////////////////////////////////////////////////////
            // This cause the ratio to be off at certain width
            /////////////////////////////////////////////////////
            this.objPixiApp.resize(this.divHolder.offsetWidth, this.divHolder.offsetHeight);
        }
        catch(error)
        {
            //console.error(error);
        }

        let iScaleRatioX = this.divHolder.offsetWidth / this.pixiSizeWidth;
        let iScaleRatioY = this.divHolder.offsetHeight / this.pixiSizeHeight;
        //console.log("this.objPixiApp.stage:"+this.objPixiApp.stage);
        //console.log("iRatio:"+iRatio);
        //console.log("this.divHolder.offsetWidth :"+this.divHolder.offsetWidth);
        //console.log("this.divHolder.style.height :"+this.divHolder.style.height);

        try
        {
            this.objPixiApp.stage.scale.x = iScaleRatioX;
            this.objPixiApp.stage.scale.y = iScaleRatioY;
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