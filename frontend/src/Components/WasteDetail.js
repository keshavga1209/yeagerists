import React from "react";
import img1 from "../assets/img/pathologies-of-foot.jpg";
import normalImg from "../assets/img/normal_foot.png";

export default function WasteDetail() {
	return (
		<div>
			<section className="ui-section-feature ui-section-feature-glossary">
				<div className="ui-layout-container">
					<h1>Glossary:</h1>
					<img src={img1} alt="" width={"70%"} className="ui-section-large-img" />

					<div className="ui-section-feature__layout ui-layout-grid ui-layout-grid-2">
						<img
							// src="https://cdn.dribbble.com/users/6234567/screenshots/15866375/media/50a23e857a1cde3ff5e2f755dd43ade9.jpg"
							src={normalImg}
							loading="lazy"
							alt="#"
							className="ui-image-half-left"
						/>

						<div>
							<h2>Normal Foot</h2>
							<p className="ui-text-intro">
								Normal feet have a moderate arch in the middle of the foot, which helps distribute
								weight and shock evenly across the foot when standing, walking, or running.
							</p>
							<ul className="ui-component-list ui-component-list-feature ui-layout-grid">
								<li className="ui-component-list--item ui-component-list--item-check">
									Normal feet are aligned with the rest of the body, allowing for proper balance and
									stability.
								</li>
								<li className="ui-component-list--item ui-component-list--item-check">
									Helps distributing weight and shock evenly across the foot.
								</li>
								<li className="ui-component-list--item ui-component-list--item-check">
									Full range of motion.
								</li>
							</ul>
						</div>
					</div>

					<div className="ui-section-feature__layout ui-layout-grid ui-layout-grid-2 ui-even-section">
						<img
							// src="https://cdn.dribbble.com/users/2846201/screenshots/12108245/media/11faafb323cf60e9afb5e3e219e1bf3f.png"
							src="https://cdn.dribbble.com/users/15139/screenshots/4738702/media/940db9db5e82f4a6b047e71e5ab161da.png"
							loading="lazy"
							alt="#"
							className="ui-image-half-left"
						/>

						<div>
							<h2>Flat Foot</h2>
							<p className="ui-text-intro">
								Flat feet, also known as fallen arches, occur when the arch of the foot is lower than
								usual or completely flat on the ground. This can happen when the tendons and ligaments
								in the foot do not pull together properly to form the arch. Flat feet can cause foot
								pain, fatigue, and other issues if left untreated.
							</p>
							<ul className="ui-component-list ui-component-list-feature ui-layout-grid">
								<li className="ui-component-list--item ui-component-list--item-check">
									Have little to no arch in the middle of the foot.
								</li>
								<li className="ui-component-list--item ui-component-list--item-check">
									Cause difficulty with balance and stability.
								</li>
								<li className="ui-component-list--item ui-component-list--item-check">
									Cause excessive wear and tear on the inside of shoes.
								</li>
							</ul>
						</div>
					</div>

					<div className="ui-section-feature__layout ui-layout-grid ui-layout-grid-2">
						<img
							// src="https://cdn.dribbble.com/users/2846201/screenshots/12108245/media/11faafb323cf60e9afb5e3e219e1bf3f.png"
							src="https://cdn.dribbble.com/users/925008/screenshots/17013776/media/fb1a967ca5240a8754958bcd1a81ec6b.png"
							loading="lazy"
							alt="#"
							className="ui-image-half-left"
						/>

						<div>
							<h2>Hollow Foot</h2>
							<p className="ui-text-intro">
								High arch feet, also known as cavus feet, have a very high arch in the middle of the
								foot. This can cause the foot to be more rigid and less able to absorb shock, which can
								lead to foot pain and discomfort.
							</p>
							<ul className="ui-component-list ui-component-list-feature ui-layout-grid">
								<li className="ui-component-list--item ui-component-list--item-check">
									Arch in high arch feet is often stiff and inflexible.
								</li>
								<li className="ui-component-list--item ui-component-list--item-check">
									High arch feet can cause calluses to form on the ball or heel of the foot
								</li>
								<li className="ui-component-list--item ui-component-list--item-check">
									High arch feet can cause excessive wear on the outside of shoes.
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
