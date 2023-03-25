import React from "react";

export default function WasteDetail() {
	return (
		<div>
			<section className="ui-section-feature">
				<div className="ui-layout-container">
					<div className="ui-section-feature__layout ui-layout-grid ui-layout-grid-2">
						<img
							src="https://cdn.dribbble.com/users/1912068/screenshots/6388092/zero-waste.jpg"
							loading="lazy"
							alt="#"
							className="ui-image-half-left"
						/>

						<div>
							<h2>Biodegradable Waste</h2>
							<p className="ui-text-intro">
								Some examples of biodegradable waste for your reference: Old vegetables, paper,
								cardboard, etc.
							</p>
							<ul className="ui-component-list ui-component-list-feature ui-layout-grid">
								<li className="ui-component-list--item ui-component-list--item-check">
									Breaks down into natural components.
								</li>
								<li className="ui-component-list--item ui-component-list--item-check">
									Exists for short time.
								</li>
								<li className="ui-component-list--item ui-component-list--item-check">
									Can be recycled.
								</li>
							</ul>
						</div>
					</div>
					<div className="ui-section-feature__layout ui-layout-grid ui-layout-grid-2">
						<img
							src="https://cdn.dribbble.com/users/2846201/screenshots/12108245/media/11faafb323cf60e9afb5e3e219e1bf3f.png"
							loading="lazy"
							alt="#"
							className="ui-image-half-left"
						/>

						<div>
							<h2>Non-Biodegradable Waste</h2>
							<p className="ui-text-intro">
								Some examples of non-biodegradable waste for your reference: Tyre, plastic, metal, etc.
							</p>
							<ul className="ui-component-list ui-component-list-feature ui-layout-grid">
								<li className="ui-component-list--item ui-component-list--item-check">
									Connot break down into natural components.
								</li>
								<li className="ui-component-list--item ui-component-list--item-check">
									Exists for long time.
								</li>
								<li className="ui-component-list--item ui-component-list--item-check">
									Cannot be recycled.
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
