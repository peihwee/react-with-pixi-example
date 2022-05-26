import React from 'react';
import * as PIXI from 'pixi.js'

class SingleProductScreen extends React.Component
{
    constructor() {
        super()

        this.divPixi = null;

        this.setDivRef = element => {
            this.divPixi = element;
        }
    }

    componentDidMount() 
    {
        this.objPixiApp = new PIXI.Application(
            {
                width: 400,
                height: 280,
                backgroundColor: 0x5BBA6F,
            }
        );

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