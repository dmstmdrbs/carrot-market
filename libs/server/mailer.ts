import nodemailer from "nodemailer";
// 메일발송 객체
interface ISendParam {
	to: string;
	title: string;
	text: string;
}
export async function sendMail({ to, title, text }: ISendParam) {
	const transporter = nodemailer.createTransport({
		service: "naver",
		host: "smtp.naver.com",
		prot: 587,
		auth: {
			user: process.env.NODEMAILER_USER!, // 보내는 메일의 주소
			pass: process.env.NODEMAILER_PW!, // 보내는 메일의 비밀번호
		},
	});
	// 메일 옵션
	const mailOptions = {
		from: process.env.NODEMAILER_USER!, // 보내는 메일의 주소
		to: to, // 수신할 이메일
		subject: title, // 메일 제목
		text: text, // 메일 내용
	};

	// 메일 발송

	transporter.sendMail(mailOptions, function (error: any, info: any) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
}
