import React from "react";
import img1 from "../assets/img/correct-img.jpg";
import img2 from "../assets/img/wrong-img.jpeg";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function Instructions() {
	return (
		<section className="ui-section-feature ui-section-feature-instructions">
			<div className="ui-layout-container">
				<h1>General instructions:</h1>

				<div className="ui-section-feature__layout ui-layout-grid ui-layout-grid-2">
					<img
						loading="lazy"
						alt="#"
						className="ui-image-half-left"
						src="https://cdn.dribbble.com/users/1061799/screenshots/10222586/media/20d15a1a163e82fe69814269aa120742.png"
					/>

					<div>
						<h3 style={{ marginTop: "0px" }}>Keep note of the following</h3>
						<p className="ui-text-intro"></p>
						<ul className="ui-component-list ui-component-list-feature ui-layout-grid">
							<li className="ui-component-list--item ui-component-list--item-check">
								Click the image of a single leg only, if both legs are there, crop the image
								appropiately
							</li>
							<li className="ui-component-list--item ui-component-list--item-check">
								Capture the area from upper calf to sole of the foot with the some inches of base floor
								as well(this example might help 👉🏻)
							</li>
							<li className="ui-component-list--item ui-component-list--item-check">
								Try to keep the background clear, an empty wall works best as the background.
							</li>
							<li className="ui-component-list--item ui-component-list--item-check">
								Try to keep the image's orientation correct and not rotated to get the best results.
							</li>
						</ul>
					</div>

					<div>
						<img
							alt="Image 1"
							className="ui-image-half-left"
							// src="https://cdn.dribbble.com/users/1061799/screenshots/10222586/media/20d15a1a163e82fe69814269aa120742.png"
							src={img1}
							width="400"
							height="300"
						/>
						<CheckIcon style={{ marginTop: "2vh", backgroundColor: "#1ecc2f", borderRadius: "1rem" }} />{" "}
						Correct Image:
						<ul style={{ margin: "2vh 3vw" }}>
							<li>background: uniform</li>
							<li>Elevation: lower</li>
							<li>Only 1 foot taken</li>
						</ul>
					</div>
					<div>
						<img
							alt="Image 2"
							className="ui-image-half-right"
							// src="https://cdn.dribbble.com/users/1061799/screenshots/10222586/media/20d15a1a163e82fe69814269aa120742.png"
							src={img2}
							width="400"
							height="300"
						/>
						<ClearIcon style={{ marginTop: "2vh", backgroundColor: "#ef5050", borderRadius: "1rem" }} />{" "}
						Incorrect Image:
						<ul style={{ margin: "2vh 3vw" }}>
							<li>background: non-uniform</li>
							<li>Elevation: higher than knee</li>
							<li>Multiple body parts in the photo</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
