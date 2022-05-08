import { useState } from "react";

interface UseMutationState {
	loading: boolean;
	data?: object;
	error?: object;
}
type UseMutationProps = [(data: any) => void, UseMutationState];
export default function useMutation(url: string): UseMutationProps {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<undefined | any>(undefined);
	const [error, setError] = useState<undefined | any>(undefined);

	function mutation(data: any) {
		setLoading(true);
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				return res.json().catch(() => {});
			})
			.then((data) => {
				setData(data);
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}
	return [mutation, { loading, data, error }];
}
