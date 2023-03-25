import React, { useState, useEffect } from "react";
import { Cloudinary } from "cloudinary-core";

export default function Header() {
	const [loading, setLoading] = useState(false);

	const [image, setImage] = useState(null);
	const [imageURL, setImageURL] = useState("");

	const [prediction, setPrediction] = useState("");

	const uploadImage = async (e) => {
		const files = e.target.files;

		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "footimg");

		setLoading(true);

		const res1 = await fetch("https://api.cloudinary.com/v1_1/team-40/image/upload", {
			method: "POST",
			body: data,
		})
			.then((res) => res.json())
			.then(async (data) => {
				console.log("Response from cloudinary", data);

				if (!data.error && data.secure_url != null) {
					setImageURL(data.secure_url);

					const res2 = await fetch("https://489d-117-99-48-74.in.ngrok.io/predict-arch", {
						method: "POST",
						headers: {
							"Content-type": "application/json",
						},
						body: JSON.stringify({
							image: data.secure_url,
						}),
					})
						.then((res) => res.json())
						.then((data) => {
							console.log("Response from flask", data);

							if (!data.error && data.prediction != null) {
								setPrediction(data.prediction);
							} else {
								alert("Server error, please try again after some time.");
							}
						})
						.catch((err) => {
							console.log("Some error while processing the image.", err);
							alert("Server error, please try again after some time.");
						});
				} else {
					alert("Image upload failed.");
				}
			})
			.catch((err) => {
				console.log("Some Error while uploading the image.", err);
				alert("Server error, please try again after some time.");
			});

		setLoading(false);
	};

	function refreshPage() {
		window.location.reload(false);
	}

	return (
		<div>
			<section className="ui-section-hero">
				<div className="ui-layout-container">
					<div className="ui-section-hero__layout ui-layout-grid ui-layout-grid-2">
						<div>
							<h1>Flatness Detection</h1>
							<p className="ui-text-intro">
								Relax, we have got your back! Upload a side view image of you foot below, to get to know
								whether you have a flat foot or not...
							</p>

							<div className="ui-component-cta ui-layout-flex">
								<input
									type="file"
									id="InputFile"
									name="file"
									accept="image/png, image/gif, image/jpeg"
									onChange={uploadImage}
								/>

								<button onClick={refreshPage} className="display-button">
									Reset
								</button>
							</div>
						</div>

						{/* <img src="https://cdn.dribbble.com/users/1068771/screenshots/8801476/media/517d9a1e6d85d294d5daa0a870633994.jpg" /> */}
						<img src="https://cdn.dribbble.com/users/1061799/screenshots/10222586/media/20d15a1a163e82fe69814269aa120742.png" />
					</div>
					<div>
						{loading ? (
							<img
								className="loading-gif"
								src="https://cdn.dribbble.com/users/227188/screenshots/6792663/recycle.gif"
							/>
						) : (
							<>
								<div className="display-image">
									<img className="waste-image" src={imageURL} />
								</div>
								<div className="waste-type-div">
									<h2 className="waste-heading">{prediction}</h2>
								</div>
							</>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
