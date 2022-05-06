import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
// form에서 원하는 항목들
// Less code
// Better validation
// Better Errors (set, clear, display)
// Have control over inputs
// Don't deal with events
// Easier inputs
interface ILoginForm {
	username: string;
	email: string;
	password: string;
}

export default function Forms() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>({
		mode: "onChange",
	});

	const onValid = (data: ILoginForm) => {
		console.log("valid", data);
	};
	const onInvalid = (errors: FieldErrors) => {
		console.log("invalid", errors);
	};
	// handleSubmit의 인자는 2개, 1개는 필수(onValid : valid할때 실행), 나머지 1개는 onInvalid: invalid일때 실행
	return (
		<form onSubmit={handleSubmit(onValid, onInvalid)}>
			<div>
				<input
					{...register("username", {
						required: "이름이 필요합니다",
						minLength: {
							value: 3,
							message: "이름은 3글자 이상입니다.",
						},
					})}
					className={`${Boolean(errors.username?.message) ? "border-red-500" : ""}`}
					type="text"
					placeholder="Username"
				/>
				{errors.username?.message}
			</div>
			<div>
				<input
					{...register("email", {
						required: "이메일이 필요합니다",
						validate: {
							notAjouMail: (value) => value.includes("@ajou.ac.kr") || "아주 메일을 사용해주세요",
						},
					})}
					className={`${Boolean(errors.email?.message) ? "border-red-500" : ""}`}
					type="email"
					placeholder="Email"
				/>
				{errors.email?.message}
			</div>
			<div>
				<input
					{...register("password", {
						required: "패스워드가 필요합니다",
					})}
					className={`${Boolean(errors.password?.message) ? "border-red-500" : ""}`}
					type="password"
					placeholder="Password"
				/>
				{errors.password?.message}
			</div>
			<div>
				<button style={{ border: "1px solid", borderRadius: "4px", width: "100px" }}>Submit</button>
			</div>
		</form>
	);
}
