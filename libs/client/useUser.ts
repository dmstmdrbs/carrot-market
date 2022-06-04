import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useUser() {
	const [user, setUser] = useState();
	const router = useRouter();
	useEffect(() => {
		fetch("/api/users/me")
			.then((res) => res.json())
			.then((json) => {
				if (!json.ok) return router.replace("/enter"); // history에 기록이 남지 않는다.
				else setUser(json.profile);
			});
	}, [router]);
	return user;
}
