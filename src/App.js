import React, { Component } from 'react';
// import MainWeb from './components/MainWeb'
import './set/image3.jpg';

class App extends Component {
	render() {
		return (
			<div id="App">
				<div className="root">
					<nav className="navigation">
						<div className="logo">{/* <img src="../set/image3.jpg"/> */}</div>
						<ul style={{ display: 'flex ' }}>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/product">Products</a>
							</li>
							<li>
								<a href="/service">Services</a>
							</li>
							<li>
								<a href="/contract">Contract</a>
							</li>
						</ul>
					</nav>
				</div>
				<div>{this.props.children}</div>
			</div>
		);
	}
}

export default App;
