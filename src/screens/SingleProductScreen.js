import React from 'react';
import * as PIXI from 'pixi.js'

class SingleProductScreen extends React.Component
{
    constructor() {
        super()

        this.pixiSizeWidth = 1080;
        this.pixiSizeHeight = 720;

        this.divPixi = null;

        this.setDivRef = element => {
            this.divPixi = element;
        }

        this.resizePixi = this.resizePixi.bind(this);
    }

    resizePixi()
    {
        let iRatio = this.divPixi.offsetWidth / this.pixiSizeWidth;
        this.divPixi.style.height = this.pixiSizeHeight * iRatio + "px";

        this.objPixiApp.stage.scale.x = this.objPixiApp.stage.scale.y = iRatio;

        console.log("this.divPixi.offsetWidth:"+this.divPixi.offsetWidth);
        console.log("this.divPixi.offsetHeight:"+this.divPixi.offsetHeight);
        this.objPixiApp.resize(this.divPixi.offsetWidth, this.divPixi.offsetHeight);
    }

    componentDidMount() 
    {
        window.addEventListener('resize', this.resizePixi);

        window.addEventListener('load', this.resizePixi);

        document.addEventListener('DOMContentLoaded', this.resizePixi);

        this.objPixiApp = new PIXI.Application(
            {
                width: this.pixiSizeWidth,
                height: this.pixiSizeHeight,
                backgroundColor: 0xFFFFFF,
                resizeTo: this.divPixi
            }
        );

        this.divPixi.appendChild(this.objPixiApp.view);
        this.objPixiApp.start();
        
        this.resizePixi();
        
        const sprBg = PIXI.Sprite.from(process.env.PUBLIC_URL+'/images/underwater_background.svg');
        this.objPixiApp.stage.addChild(sprBg);

        var blurFilter = new PIXI.filters.BlurFilter();
        sprBg.filters = [blurFilter];
    
        blurFilter.blur = 5;

        for(let i=0; i<this.props.productId; i++)
        {
            const iColor = 1 + Math.floor (Math.random() * 4)
            const sprFish = PIXI.Sprite.from(process.env.PUBLIC_URL+'/images/fish0'+iColor+'.svg');
            
            // center the sprite's anchor point
            sprFish.anchor.set(0.5);

            // move the sprite to the center of the screen
            sprFish.x = 50 + Math.random() * (this.pixiSizeWidth - 100);
            sprFish.y = 50 + Math.random() * (this.pixiSizeHeight - 100);

            sprFish.scale.x = sprFish.scale.y = 0.35;
            
            this.objPixiApp.stage.addChild(sprFish);

            const swimSpeed = 3 + Math.floor (Math.random() * 5);

            this.objPixiApp.ticker.add(() => {
                sprFish.x -= swimSpeed;

                if(sprFish.x + sprFish.width < 0) sprFish.x = this.pixiSizeWidth + 50;
            });
        }

        const sprFg = PIXI.Sprite.from(process.env.PUBLIC_URL+'/images/underwater_foreground.svg');
        this.objPixiApp.stage.addChild(sprFg);

        var blurFilter2 = new PIXI.filters.BlurFilter();
        sprFg.filters = [blurFilter2];
        blurFilter2.blur = 2;
    }
  
    componentWillUnmount() 
    {
        this.objPixiApp.destroy(true, true);
    }

    render()
    {
        

        return (
            <div className='Main'>
                <h1>Product {this.props.productId}</h1>
                <div ref={this.setDivRef}></div>
            </div>
        );
    }
}

export default SingleProductScreen;