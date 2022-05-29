import React from 'react';
import * as PIXI from 'pixi.js';
import ResizablePixiApp from '../pixi/ResizablePixiApp';
import Popup from '../components/Popup';

import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

class SingleProductScreen extends React.Component
{
    constructor() {
        super();

        this.divPixi = null;

        this.setDivRef = element => {
            this.divPixi = element;
        }

        this.objPopup = null;

        this.setPopupRef = element => {
            this.objPopup = element;
        }
    }
    componentDidMount() 
    {
        /*
        // register the plugin
        gsap.registerPlugin(PixiPlugin);

        // give the plugin a reference to the PIXI object
        PixiPlugin.registerPIXI(PIXI);
        */
        this.objResizable = new ResizablePixiApp(this.divPixi);
        this.objPixiApp = this.objResizable.getPixiApp();
        
        const sprBg = PIXI.Sprite.from(process.env.PUBLIC_URL+'/images/underwater_background.svg');
        this.objPixiApp.stage.addChild(sprBg);

        var blurFilter = new PIXI.filters.BlurFilter();
        sprBg.filters = [blurFilter];
    
        blurFilter.blur = 5;

        for(let i=0; i<this.props.productId; i++)
        {
            const iColor = 1 + Math.floor (Math.random() * 13);
            
            let sColor = ""+iColor;
            if(iColor < 10) sColor = "0"+iColor;

            const sprFish = PIXI.Sprite.from(process.env.PUBLIC_URL+'/images/fish'+sColor+'.svg');
            
            // center the sprite's anchor point
            sprFish.anchor.set(0.5);

            // move the sprite to the center of the screen
            sprFish.x = 50 + Math.random() * (this.objResizable.width - 100);
            sprFish.y = 50 + Math.random() * (this.objResizable.height - 100);

            sprFish.iScale = sprFish.scale.x = sprFish.scale.y = 0.15 + (Math.random() * 0.2);
            
            this.objPixiApp.stage.addChild(sprFish);

            const swimSpeed = 3 + (Math.random() * 6);

            /*
            this.objPixiApp.ticker.add(() => {
                sprFish.x -= swimSpeed;

                if(sprFish.x + sprFish.width < 0) sprFish.x = this.objResizable.width + 50;
            });
            */

            sprFish.fThink = () => 
            {
                let randomX = 50 + Math.random() * (this.objResizable.width - 100);
                let randomY = 50 + Math.random() * (this.objResizable.height - 100);
                let randomDuration = 3 + (Math.random() * 20);
                //console.log(sprFish);

                if(randomX > sprFish.x) sprFish.scale.x = -1 * sprFish.iScale;
                else sprFish.scale.x = 1 * sprFish.iScale;
                
                gsap.to(sprFish.position, { x: randomX, y: randomY, duration: randomDuration, onComplete: sprFish.fThink } );
            }

            sprFish.fThink();
            
            
            sprFish.iID = i;
            sprFish.iColor = iColor;

            sprFish.interactive = true;
            sprFish.on('pointerdown', (event) => 
            {
                ///////////////////////////////////////////////////////////////////////////
                // Convert global to follow stage position
                ///////////////////////////////////////////////////////////////////////////
                event.data.getLocalPosition(this.objPixiApp.stage, event.data.global);
                ///////////////////////////////////////////////////////////////////////////

                console.log('X', event.data.global.x, 'Y', event.data.global.y);
                this.objPopup.showModal("Fish ID is "+sprFish.iID+" and Color is "+sprFish.iColor
                                        +', X='+ Math.floor(event.data.global.x)+ ' & Y='+ Math.floor(event.data.global.y));
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
                <Popup ref={this.setPopupRef}/>
                <h1>Product {this.props.productId}</h1>
                <div ref={this.setDivRef}></div>
            </div>
        );
    }
}

export default SingleProductScreen;