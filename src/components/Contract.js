import React, { Component } from 'react';
import testCss from '../css/test.css';

class Service extends Component {
	state = {
		moveUp: {
			now: true,
			pre: true
		},
		t: 0,
		X: 0,
		boxPosition: {}
	};

	moveUp = () => {
		this.setState({
			t: 0,
			moveUp: { ...this.state.moveUp, now: !this.state.moveUp.now }
		});
	};

	timerStart = () => {
		const { now, pre } = this.state.moveUp;
		clearInterval(this.timer);
		let { t, X } = this.state;
		let [ t0, v, g ] = [ 20, 600, 0.5 ];
		// document.getElementsByClassName("moveUp").addEventListener("click",()=>{
		// 	console.log('a')
		// })
		this.timer = setInterval(() => {
			if (now) {
				v = 0;
			}
			t = t + t0;
			this.setState({ t, X: X + (-v * t0 + 1 / 2 * g * t0 * t0 + g * t * t0) / 1000 });
			console.log(t, X);
		}, t0);

		return { top: `${this.state.X}px` };
	};

	stopTimer = () => {
		clearInterval(this.timer);
	};

	render() {
		// const {boxPosition}=this.state
		const boxPosition = this.timerStart() || {};
		return (
			<div>
				<div className="container">
					<div className="box" style={boxPosition} />
				</div>
				<div>
					<button onClick={this.timerStart}>Start</button>
					<button onClick={this.stopTimer}>Stop</button>
					<button className="moveUp" onClick={() => this.moveUp()}>
						moveUp
					</button>
				</div>
			</div>
		);
	}
}

export default Service;
