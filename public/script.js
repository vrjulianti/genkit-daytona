document.getElementById("generate").addEventListener("click", async () => {
	const title = document.getElementById("title").value;
	const description = document.getElementById("description").value;

	try {
		// Send a POST request to GenKit's complimentFlow endpoint on port 4000
		const response = await fetch(
			`http://localhost:4000/api/runAction?batch=1`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					0: {
						key: "/flow/stackRecomFlow",
						input: {
							start: {
								input: {
									title,
									description,
								},
							},
						},
					},
				}),
			}
		);

		if (response.ok) {
			const data = await response.json();
			document.getElementById("recommendation").textContent =
				data[0].result.data.result; // Display the generated compliment
		} else {
			document.getElementById(
				"recommendation"
			).textContent = `Error generating requirement: ${response.status}`;
		}
	} catch (error) {
		console.error("Fetch error:", error);
		document.getElementById("recommendation").textContent =
			"Network error: " + error.message;
	}
});
