import React from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import App from '../App.js';
import MainWeb from '../components/MainWeb';
import Product from '../components/Product';
import Service from '../components/Service';
import Contract from '../components/Contract';

const Root = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route
					render={(porps) => (
						<App>
							<Switch>
								<Route exact path="/" component={MainWeb} />
								<Route exact path="/service" component={Service} />
								<Route exact path="/contract" component={Contract} />
								<Route exact path="/product" component={Product} />
								{/* 路由不正确是跳转HOme */}
								<Route render={() => <Redirect to="/" />} />
							</Switch>
						</App>
					)}
				/>
				<Route exact path="/product/:id" component={Product} />
			</Switch>
		</BrowserRouter>
	);
};

export default Root;
