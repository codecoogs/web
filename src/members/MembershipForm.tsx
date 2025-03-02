import React, { useState } from "react";
import { SIGNUP_API_URL } from "../data/members";
import type { StripeURL, SubmitProps } from "../common/interface";

// TODO: dependency updates may have broken this
const SignUpForm: React.FC<{
	submitProps: SubmitProps;
	stripeProps: StripeURL;
}> = ({ submitProps, stripeProps }) => {
	const selectInputStyle: React.CSSProperties = {
		colorScheme: "dark",
	};

	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		major: "Computer Science",
		classification: "Freshman",
		expected_graduation: "2024-05",
		membership: "Semester",
		discord: "",
	});

	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const resumeInputRef = React.useRef<HTMLInputElement>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
		console.log(formData);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		if (submitProps.submitProcess === true) return;

		submitProps.setSubmitProcess(true);

		e.preventDefault();
		setSuccessMessage("");
		setErrorMessage("");

		const convertedData = new FormData();
		for (const [key, value] of Object.entries(formData)) {
			if (value === null) continue;
			convertedData.append(key, value);
		}

		// for (var pair of convertedData.entries()) {
		//     console.log(pair[0]+ ', ' + pair[1]);
		// }

		const response = await fetch(SIGNUP_API_URL, {
			method: "POST",
			body: convertedData,
		});

		const { success, url, error } = await response.json();

		if (success) {
			console.log(success, url);
			setSuccessMessage("Success! Please continue your payment at Stripe.");
			window.open(url, "_blank");

			stripeProps.setStripeUrl(url);

			if (resumeInputRef.current) {
				resumeInputRef.current.value = "";
			}

			setFormData({
				first_name: "",
				last_name: "",
				email: "",
				phone: "",
				major: "Computer Science",
				classification: "Freshman",
				expected_graduation: "2024-05",
				membership: "Semester",
				discord: "",
			});
		} else {
			setErrorMessage(`Error submitting the form: ${error}`);
			console.log(error);
		}

		// submitProps.setSubmitProcess(false)
	};

	return (
		<form
			className="bg-dark-surface-variant rounded-lg grid ring-1 ring-inset ring-white/[.3] p-8"
			onSubmit={handleSubmit}
		>
			<div className="flex">
				<div className="relative flex-[1_1_100%]">
					<input
						className="peer bg-dark-surface-variant h-10 w-full border-b-2 border-white/[.3] placeholder-dark-surface-variant focus:outline-none focus:border-dark-primary"
						type="text"
						id="firstName"
						name="first_name"
						value={formData.first_name}
						onChange={handleChange}
						placeholder="First Name"
						autoComplete="off"
						required
					/>
					<label
						className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/[.4]"
						htmlFor="firstName"
					>
						First Name
					</label>
				</div>
				<div className="relative flex-[1_1_100%] ml-8">
					<input
						className="peer bg-dark-surface-variant h-10 w-full border-b-2 border-white/[.3] placeholder-dark-surface-variant focus:outline-none focus:border-dark-primary"
						type="text"
						id="lastName"
						name="last_name"
						value={formData.last_name}
						onChange={handleChange}
						placeholder="Last Name"
						autoComplete="off"
						required
					/>
					<label
						className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/[.4]"
						htmlFor="lastName"
					>
						Last Name
					</label>
				</div>
			</div>
			<div className="relative mt-4">
				<input
					className="peer bg-dark-surface-variant h-10 w-full border-b-2 border-white/[.3] placeholder-dark-surface-variant focus:outline-none focus:border-dark-primary"
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="Email"
					autoComplete="off"
					required
				/>
				<label
					className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/[.4]"
					htmlFor="email"
				>
					Email
				</label>
			</div>
			<div className="relative mt-4">
				<input
					className="peer bg-dark-surface-variant h-10 w-full border-b-2 border-white/[.3] placeholder-dark-surface-variant focus:outline-none focus:border-dark-primary"
					type="tel"
					pattern="[0-9]{10}"
					id="phone"
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					placeholder="Phone"
					autoComplete="off"
					required
				/>
				<label
					className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/[.4]"
					htmlFor="phone"
				>
					Phone
				</label>
			</div>
			<div className="relative mt-4">
				<input
					className="peer bg-dark-surface-variant h-10 w-full border-b-2 border-white/[.3] placeholder-dark-surface-variant focus:outline-none focus:border-dark-primary"
					type="discord"
					id="discord"
					name="discord"
					value={formData.discord}
					onChange={handleChange}
					placeholder="Discord"
					autoComplete="off"
					required
				/>
				<label
					className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white/[.4]"
					htmlFor="discord"
				>
					Discord User
				</label>
			</div>
			<div className="flex flex-col mt-4">
				<label className="text-sm" htmlFor="major">
					Major
				</label>
				<select
					className="bg-dark-surface-variant font-normal rounded mt-1 p-2 ring-1 ring-inset ring-white/[.3] focus:ring-dark-primary"
					style={selectInputStyle}
					id="major"
					name="major"
					value={formData.major}
					onChange={handleChange}
					required
				>
					<option value="Computer Science">Computer Science</option>
					<option value="Mathematics">Mathematics</option>
					<option value="Computer Engineering">Computer Engineering</option>
					<option value="Electrical Engineering">Electrical Engineering</option>
					<option value="Management Information System">MIS</option>
					<option value="Computer Information System">CIS</option>
					<option value="Other">Other</option>
				</select>
			</div>
			<div className="flex flex-col mt-4">
				<label className="text-sm" htmlFor="classification">
					Classification
				</label>
				<select
					className="bg-dark-surface-variant font-normal rounded mt-1 p-2 ring-1 ring-inset ring-white/[.3] focus:ring-dark-primary"
					style={selectInputStyle}
					id="classification"
					name="classification"
					value={formData.classification}
					onChange={handleChange}
					required
				>
					<option value="Freshman">Freshman</option>
					<option value="Sophomore">Sophomore</option>
					<option value="Junior">Junior</option>
					<option value="Senior">Senior</option>
					<option value="Super Senior">Super Senior</option>
				</select>
			</div>
			<div className="flex flex-col mt-4">
				<label className="text-sm" htmlFor="expectedGraduation">
					Expected Graduation
				</label>
				<input
					className="bg-dark-surface-variant font-normal rounded mt-1 p-2 pl-3 pr-1 ring-1 ring-inset ring-white/[.3] focus:ring-dark-primary"
					style={selectInputStyle}
					type="month"
					id="expectedGraduation"
					name="expected_graduation"
					min="2024-05"
					value={formData.expected_graduation}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="flex flex-col mt-4">
				<label className="text-sm" htmlFor="membership">
					Membership Length
				</label>
				<select
					className="bg-dark-surface-variant font-normal rounded mt-1 p-2 ring-1 ring-inset ring-white/[.3] focus:ring-dark-primary"
					style={selectInputStyle}
					id="membership"
					name="membership"
					value={formData.membership}
					onChange={handleChange}
					required
				>
					<option value="Semester">Semester ($15)</option>
					<option value="Year">Year ($25)</option>
					{/* <option value="Zelle">Zelle</option> */}
				</select>
			</div>

			{/* <div className="mt-4 text-sm">* Include <span className="text-dark-primary-variant">full name</span> when paying with Venmo or Zelle</div> */}

			<div className="flex mt-6">
				<div className="flex-1 basis-1/2 text-sm text-dark-error">
					<span className="text-dark-primary-variant">{successMessage}</span>
					<span className="text-dark-error">{errorMessage}</span>
				</div>
				<div className="">
					<button
						className="bg-dark-surface-variant hover:ring-dark-primary px-4 w-44 md:w-52 h-10 items-center text-center text-white rounded-lg ring-1 ring-inset ring-white"
						type="submit"
					>
						Pay with Stripe
					</button>
				</div>
			</div>
		</form>
	);
};

export default SignUpForm;
