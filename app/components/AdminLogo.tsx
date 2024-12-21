import React from "react";
import Image from "next/image";

const AdminLogo = ({ containerClassName }) => {
	return (
		<div className={containerClassName}>
			<Image
				width={500}
				height={300}
				priority
				src="/MKnows_Admin.png"
				alt="M-Knows Logo"
				style={{
					objectFit: "contain",
					objectPosition: "center",
					width: "100%",
					height: "auto"
				}}
			/>
		</div>
	);
};

export default AdminLogo;