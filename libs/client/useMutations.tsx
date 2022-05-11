import { useState } from "react";

export interface UseMutationState<T> {
	loading: boolean;
	data?: T;
	error?: object;
}
export type UseMutationProps<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(url: string): UseMutationProps<T> {
	// const [loading, setLoading] = useState(false);
	// const [data, setData] = useState<undefined | any>(undefined);
	// const [error, setError] = useState<undefined | any>(undefined);

	const [state, setState] = useState<UseMutationState<T>>({
		loading: false,
		data: undefined,
		error: undefined,
	});

	function mutation(data: any) {
		// setLoading(true);
		setState((prev) => ({ ...prev, loading: true }));
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
				// setData(data);
				setState((prev) => ({ ...prev, data: data }));
			})
			.catch((err) => setState((prev) => ({ ...prev, error: err })))
			.finally(() => setState((prev) => ({ ...prev, loading: false })));
	}
	return [mutation, { ...state }];
}
