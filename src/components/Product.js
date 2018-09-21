import React, { Component } from 'react';
import JsBarcode from 'jsbarcode';
import svgpath from 'svgpath';
import qr from 'qr-image';
import pic from '../set/image2.jpg';
import index from '../css/index.css';

class Product extends Component {
	state = {
		path: null
	};

	loadQRC = (qrc) => {
		console.log('qrc', qrc);
	};

	render() {
		return (
			<div>
				<br />
				<label>二维码</label>
				<br />
				<svg margin="300" width="300" height="300" ref={(ref) => (this._qrcodeSVG = ref)} transform="scale(2)">
					<path d={this.state.path ? this.state.path : null} />
				</svg>
				<div style={{ marginTop: 200 }}>
					<input
						type="text"
						placeholder="请输入"
						onChange={(e) => {
							const originPath = qr.svgObject(e.target.value).path; //  获得二维码的绘制路径
							this.setState({ path: originPath });
							const scaledPath = svgpath(originPath).scale(5, 5).toString();
							this.setState({ path: scaledPath });
						}}
					/>
				</div>
				<div>
					<img src={pic} className="imgInfo" />
				</div>
			</div>
		);
	}
}

export default Product;
