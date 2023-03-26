import React, { useState, useRef } from "react";
import { Button } from "@mui/material";

import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
import { canvasPreview } from "./Crop/canvasPreview.ts";
import { useDebounceEffect } from "./Crop/useDebounceEffect.ts";

import "react-image-crop/dist/ReactCrop.css";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: "%",
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		),
		mediaWidth,
		mediaHeight
	);
}

export default function Header() {
	const [imgSrc, setImgSrc] = useState("");
	const previewCanvasRef = useRef(null);
	const imgRef = useRef(null);
	const hiddenAnchorRef = useRef(null);
	const blobUrlRef = useRef("");
	const [crop, setCrop] = useState();
	const [completedCrop, setCompletedCrop] = useState();
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);
	const [aspect, setAspect] = useState(16 / 9);

	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [imageURL, setImageURL] = useState("");
	const [prediction, setPrediction] = useState("");

	function onSelectFile(e) {
		if (e.target.files && e.target.files.length > 0) {
			setCrop(undefined); // Makes crop preview update between images.
			const reader = new FileReader();
			reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));

			reader.readAsDataURL(e.target.files[0]);
		}
	}

	function onImageLoad(e) {
		if (aspect) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect));
		}
	}

	function onDownloadCropClick() {
		if (!previewCanvasRef.current) {
			throw new Error("Crop canvas does not exist");
		}

		previewCanvasRef.current.toBlob((blob) => {
			if (!blob) {
				throw new Error("Failed to create blob");
			}
			if (blobUrlRef.current) {
				URL.revokeObjectURL(blobUrlRef.current);
			}
			blobUrlRef.current = URL.createObjectURL(blob);
			hiddenAnchorRef.current.href = blobUrlRef.current;
			hiddenAnchorRef.current.click();
		});
	}

	useDebounceEffect(
		async () => {
			if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
				// We use canvasPreview as it's much faster than imgPreview.
				canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
			}
		},
		100,
		[completedCrop, scale, rotate]
	);

	function handleToggleAspectClick() {
		if (aspect) {
			setAspect(undefined);
		} else if (imgRef.current) {
			const { width, height } = imgRef.current;
			setAspect(16 / 9);
			setCrop(centerAspectCrop(width, height, 16 / 9));
		}
	}

	const uploadImage = async (e) => {
		const files = e.target.files;

		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "footimg");

		setLoading(true);
		setImage(files[0]);

		const res1 = await fetch("https://api.cloudinary.com/v1_1/team-40/image/upload", {
			method: "POST",
			body: data,
		})
			.then((res) => res.json())
			.then(async (data) => {
				console.log("Response from cloudinary", data);

				if (!data.error && data.secure_url != null) {
					setImageURL(data.secure_url);

					const res2 = await fetch(
						"https://6749-2401-4900-53f0-45f6-d4f0-84e6-ab86-9de9.in.ngrok.io/predict-arch",
						{
							method: "POST",
							headers: {
								"Content-type": "application/json",
							},
							body: JSON.stringify({
								image: data.secure_url,
							}),
						}
					)
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

							<Button variant="contained" component="label" sx={{ mt: 1, mr: 1, ml: 3, p: 1 }}>
								<b>
									{image ? "Re-u" : "U"}
									pload
								</b>
								<input accept="image/*" type="file" onChange={uploadImage} hidden />
							</Button>

							<Button
								onClick={refreshPage}
								variant="outlined"
								sx={{ mt: 1, ml: 1, p: 1 }}
								className="display-button">
								Reset
							</Button>

							{/* <div className="ui-component-cta ui-layout-flex">
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
							</div> */}
						</div>

						{/* <img src="https://cdn.dribbble.com/users/1068771/screenshots/8801476/media/517d9a1e6d85d294d5daa0a870633994.jpg" /> */}
						<img src="https://cdn.dribbble.com/users/1061799/screenshots/10222586/media/20d15a1a163e82fe69814269aa120742.png" />
					</div>
					<div>
						{loading ? (
							<img
								className="loading-gif"
								src="https://cdn.dribbble.com/users/4531160/screenshots/14904162/media/921bfb0808a9d70e2a8c4c43fe5191a0.gif"
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
