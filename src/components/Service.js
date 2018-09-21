import React, { Component } from 'react';
import { Dragact } from 'dragact';
import * as PIXI from "pixi.js";
import test from "../css/Lee.jpg";

const fakeData = [
	{ GridX: 0, GridY: 0, w: 4, h: 2, key: '0' },
	{ GridX: 0, GridY: 0, w: 4, h: 2, key: '1' },
	{ GridX: 0, GridY: 0, w: 4, h: 2, key: '2' }
];

const getBlockStyle = (isDragging) => ({ background: isDragging ? '#1890ff' : 'white' });

class Service extends Component {

	game = () => {
		let app = new PIXI.Application({
		  width: 800,
		  height: 500,
		  antialias: true, //边界和尺寸圆滑
		  resolution: 1
		  // transparent: true
		});
		document.getElementById("game").appendChild(app.view);
		PIXI.loader.add(test).load(() => {
			console.log(test)
		  let cat = new PIXI.Sprite(PIXI.loader.resources[test].texture);
		  // var bunny = PIXI.Sprite.fromImage('Lee.jpg')
		  app.stage.addChild(cat);
	 
		});
	  };

	render() {
		return (
			<div>
				<Dragact
					layout={fakeData} //必填项
					col={16} //必填项
					width={800} //必填项
					rowHeight={40} //必填项
					margin={[ 5, 5 ]} //必填项
					className="plant-layout" //必填项
					style={{ background: '#333' }} //非必填项
					placeholder={true}
				>
					{(item, provided) => {
						return (
							<div
								{...provided.props}
								{...provided.dragHandle}
								style={{
									...provided.props.style,
									...getBlockStyle(provided.isDragging)
								}}
							>
								{provided.isDragging ? '正在抓取' : '停放'}
							</div>
						);
					}}
				</Dragact>
				<div id="game" ref={() => this.game()} />
			</div>
		);
	}
}

export default Service;
