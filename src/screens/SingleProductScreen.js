import React from 'react';
import * as PIXI from 'pixi.js'

class SingleProductScreen extends React.Component
{
    constructor() {
        super()

        this.pixiSizeWidth = 400;
        this.pixiSizeHeight = 280;

        this.divPixi = null;

        this.setDivRef = element => {
            this.divPixi = element;
        }

        this.resizePixi = this.resizePixi.bind(this);
    }

    resizePixi()
    {
        console.log("this.divPixi.clientWidth:"+this.divPixi.clientWidth);

        let iRatio = this.divPixi.clientWidth / this.pixiSizeWidth;
        this.divPixi.style.height = this.pixiSizeHeight * iRatio + "px";
    }

    componentDidMount() 
    {
        window.addEventListener('resize', this.resizePixi);

        this.objPixiApp = new PIXI.Application(
            {
                width: this.pixiSizeWidth,
                height: this.pixiSizeHeight,
                backgroundColor: 0x5BBA6F,
                resizeTo: this.divPixi
            }
        );

        this.resizePixi();
        
        this.divPixi.appendChild(this.objPixiApp.view);

        this.objPixiApp.start();

        for(let i=0; i<this.props.productId; i++)
        {
            const sprFish = PIXI.Sprite.from(process.env.PUBLIC_URL+'/images/fish.svg');

            // center the sprite's anchor point
            sprFish.anchor.set(0.5);

            // move the sprite to the center of the screen
            sprFish.x = Math.random() * this.objPixiApp.screen.width;
            sprFish.y = Math.random() * this.objPixiApp.screen.height;

            sprFish.scale.x = sprFish.scale.y = 0.1;

            this.objPixiApp.stage.addChild(sprFish);

            this.objPixiApp.ticker.add(() => {
                sprFish.rotation += 0.1;
            });
        }
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