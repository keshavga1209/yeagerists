import React from "react";
import logo from "../assets/img/logo-removebg-preview.png";

export default function Navbar() {
	return (
		<div>
			<header role="banner" className="ui-section-header">
				<div className="ui-layout-container">
					<div className="ui-section-header__layout ui-layout-flex">
						<a href="#" role="link" aria-label="#" className="ui-section-header--logo">
							<img
								width="300"
								// src="https://cdn.shopify.com/s/files/1/0021/7481/2195/files/logo_350x.jpg?v=1677304208"
								src={logo}
							/>
						</a>

						<input type="checkbox" id="ui-section-header--menu-id" />

						<label htmlFor="ui-section-header--menu-id" className="ui-section-header--menu-icon"></label>

						<nav role="navigation" className="ui-section-header--nav ui-layout-flex">
							{/* <a href="#" role="link" aria-label="#" class="ui-section-header--nav-link">
								Home
							</a> */}
							<a
								href="https://yourfootdoctor.in/products/unisex-flat-feet-shoe-insole"
								target="_blank"
								role="link"
								aria-label="#"
								className="ui-section-header--nav-link">
								Get Product
							</a>
							<a
								href="https://github.com/keshavga1209/yeagerists"
								target="_blank"
								role="link"
								aria-label="#"
								className="ui-section-header--nav-link">
								GitHub
							</a>
						</nav>
					</div>
				</div>
			</header>
		</div>
	);
}
