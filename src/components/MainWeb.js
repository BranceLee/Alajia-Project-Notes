import React, { Component } from 'react';
import Game from '../Game/lib/game';

class MainWeb extends Component {
	state = {
		currentLevel: 1
	};

	onCanvasLoad = (el) => {
		console.log(el.clientHeight)
		Game.setup({
			root: 'gameCanvas',
			width: el.clientWidth,
			height: el.clientHeight,
			level: this.state.currentLevel,
			speed: 1,
		});
	};

	render() {
		return (
			<div>
				<div>
					<div id='gameCanvas' style={{ width: '800px', height: '600px' }} ref={(el) => this.onCanvasLoad(el)} />
				</div>
			</div>
		);
	}
}

export default MainWeb;
