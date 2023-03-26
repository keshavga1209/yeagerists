import React, { useState, useRef } from "react";
import { Button, TextField } from "@mui/material";

import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
import { canvasPreview } from "./Crop/canvasPreview.ts";
import { useDebounceEffect } from "./Crop/useDebounceEffect.ts";

import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

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
	const [aspect, setAspect] = useState(undefined);

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

		// setImage(e.target.files[0]);
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

	// function handleToggleAspectClick() {
	// 	if (aspect) {
	// 		setAspect(undefined);
	// 	} else if (imgRef.current) {
	// 		const { width, height } = imgRef.current;
	// 		setAspect(16 / 9);
	// 		setCrop(centerAspectCrop(width, height, 16 / 9));
	// 	}
	// }

	const uploadImage = async (e) => {
		const files = e.target.files;
		setImage(files[0]);

		setLoading(true);

		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "footimg");

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
						"https://f9ba-2401-4900-5630-44c9-cff9-e533-3cd6-91ff.in.ngrok.io/predict-arch",
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
					<div className="">
						<div>
							<h1>Flat foot Detection</h1>
							<p className="ui-text-intro">
								Relax, we have got your back! Upload a side view image of you foot below, to get to know
								whether you have a flat foot or not...
							</p>

							<div className="Crop-Controls">
								{/* <input type="file" accept="image/*" onChange={onSelectFile} /> */}

								<Button variant="contained" component="label" sx={{ mt: 1, mr: 1, ml: 3, p: 1 }}>
									<b>
										{imgSrc ? "Re-u" : "U"}
										pload image for editing
									</b>
									<input accept="image/*" type="file" onChange={onSelectFile} hidden />
								</Button>

								<Button
									onClick={refreshPage}
									variant="outlined"
									sx={{ mt: 1, ml: 1, p: 1 }}
									className="display-button">
									Reset
								</Button>

								{/* {imgSrc && (
									<>
										<TextField
											style={{ width: "200px", margin: "3vh 2vw" }}
											type="number"
											label="Scale"
											variant="outlined"
											value={scale}
											disabled={!imgSrc}
											onChange={(e) => setScale(Number(e.target.value))}
										/>

										<TextField
											style={{ width: "200px", margin: "3vh 2vw 3vh 0vw" }}
											type="number"
											label="Rotate"
											variant="outlined"
											value={rotate}
											disabled={!imgSrc}
											onChange={(e) =>
												setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
											}
										/>

										<div>
											<label htmlFor="scale-input">Scale: </label>
											<input
												id="scale-input"
												type="number"
												step="0.1"
												value={scale}
												disabled={!imgSrc}
												onChange={(e) => setScale(Number(e.target.value))}
											/>
										</div>

										<div>
											<label htmlFor="rotate-input">Rotate: </label>
											<input
												id="rotate-input"
												type="number"
												value={rotate}
												disabled={!imgSrc}
												onChange={(e) =>
													setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
												}
											/>
										</div>
									</>
								)} */}

								{/* <div>
									<button onClick={handleToggleAspectClick}>
										Toggle aspect {aspect ? "off" : "on"}
									</button>
								</div> */}
							</div>

							{!!imgSrc && (
								<>
									<h4>
										<DoubleArrowIcon style={{ margin: "2vh 0vw 0vh" }} /> Draw a box over the below
										image to get the edit options for the image
									</h4>
									<ReactCrop
										crop={crop}
										onChange={(_, percentCrop) => setCrop(percentCrop)}
										onComplete={(c) => setCompletedCrop(c)}
										aspect={aspect}>
										<img
											ref={imgRef}
											alt="Crop me"
											src={imgSrc}
											style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
											onLoad={onImageLoad}
											className="croping-img"
										/>
									</ReactCrop>
								</>
							)}

							{!!completedCrop && (
								<>
									<div className="centering-div">
										<TextField
											style={{ width: "200px", margin: "3vh 2vw" }}
											type="number"
											label="Zoom"
											variant="outlined"
											value={scale}
											disabled={!imgSrc}
											onChange={(e) => setScale(Number(e.target.value))}
										/>

										<TextField
											style={{ width: "200px", margin: "3vh 2vw 3vh 0vw" }}
											type="number"
											label="Rotate"
											variant="outlined"
											value={rotate}
											disabled={!imgSrc}
											onChange={(e) =>
												setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
											}
										/>
									</div>

									<h4>
										<DoubleArrowIcon style={{ margin: "2vh 0vw 0vh" }} />
										Preview of the edited image:
									</h4>

									<div>
										<canvas
											ref={previewCanvasRef}
											style={{
												border: "1px solid black",
												objectFit: "contain",
												width: completedCrop.width,
												height: completedCrop.height,
											}}
										/>
									</div>
									<div>
										<Button
											variant="contained"
											component="label"
											sx={{ mt: 5, mr: 1, ml: 3, p: 1 }}
											onClick={onDownloadCropClick}>
											<b>Download edited image</b>
										</Button>
										<a
											ref={hiddenAnchorRef}
											download
											style={{
												position: "absolute",
												top: "-200vh",
												visibility: "hidden",
											}}>
											Hidden download
										</a>
									</div>
								</>
							)}
						</div>

						<Button variant="contained" component="label" sx={{ mt: 5, mr: 1, ml: 3, p: 1 }}>
							<b>
								{image ? "Re-u" : "U"}
								pload new image for analysis
							</b>
							<input accept="image/*" type="file" onChange={uploadImage} hidden />
						</Button>

						<Button
							onClick={refreshPage}
							variant="outlined"
							sx={{ mt: 5, ml: 1, p: 1 }}
							className="display-button">
							Reset
						</Button>

						{/* <img src="https://cdn.dribbble.com/users/1068771/screenshots/8801476/media/517d9a1e6d85d294d5daa0a870633994.jpg" /> */}
						{/* <img src="https://cdn.dribbble.com/users/1061799/screenshots/10222586/media/20d15a1a163e82fe69814269aa120742.png" /> */}
					</div>
					<div>
						{loading ? (
							<img
								className="loading-gif"
								src="https://cdn.dribbble.com/users/4531160/screenshots/14904162/media/921bfb0808a9d70e2a8c4c43fe5191a0.gif"
							/>
						) : prediction ? (
							<>
								<div className="display-image">
									<img className="waste-image" src={imageURL} />
								</div>
								<div className="waste-type-div">
									<h2 className="waste-heading">Predicted arch type: {prediction}</h2>
								</div>
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
