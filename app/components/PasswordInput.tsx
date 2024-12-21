import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

const PasswordInput = ({idName, label, hideStatus, value, required, onChange, toggle }) => {
	return (
		<>
			<label htmlFor={idName} className="font-bold">{label}</label>
			<div className="relative mb-8">
				<input type={hideStatus ? "password" : "text"} id={idName} name={idName} value={value} 
					required={required}
					onChange={onChange} autoComplete="one-time-code"
					className="w-full rounded-md border-2 border-neutral-500 py-5 px-2"
				/>
				<button onClick={toggle} type="button"
					className="flex justify-center items-center absolute right-3 w-5 h-5 top-6">
					{hideStatus ? <EyeIcon /> : <EyeSlashIcon />}
				</button>
			</div>
		</>
	);
};

export default PasswordInput;