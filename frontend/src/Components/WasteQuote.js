import React from "react";

export default function WasteQuote() {
	return (
		<div>
			<section className="ui-section-testimonial">
				<div className="ui-layout-container">
					<div className="ui-layout-column-4 ui-layout-column-center">
						<img
							src="https://res.cloudinary.com/uisual/image/upload/assets/icons/avatar.svg"
							alt="#"
							className="ui-section-testimonial--avatar"
						/>

						<p className="ui-section-testimonial--quote ui-text-intro">
							Refuse what you do not need; reduce what you do need; reuse what you consume; recycle what
							you cannot refuse, reduce, or reuse; and rot the rest.
						</p>

						<p className="ui-section-testimonial--author">
							-<strong>Bea Johnson</strong>
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
