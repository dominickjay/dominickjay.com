// Color extraction utility for music cards
// This provides a reusable way to extract dominant colors from album/artist images

import { rgbToHsl } from "./color";

export interface ColorExtractionResult {
	success: boolean;
	color: string;
	error?: string;
}

// Function to extract dominant color from image URL
export function extractImageColor(
	imageUrl: string,
): Promise<ColorExtractionResult> {
	return new Promise((resolve) => {
		const img = new Image();
		img.crossOrigin = "anonymous";

		img.onload = function () {
			try {
				// Check if ColorThief is available
				if (typeof window !== "undefined" && (window as any).ColorThief) {
					const colorThief = new (window as any).ColorThief();
					const dominantColor = colorThief.getColor(img);
					const rgbColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

					resolve({
						success: true,
						color: rgbColor,
					});
				} else {
					resolve({
						success: false,
						color: "#000000",
						error: "ColorThief not available",
					});
				}
			} catch (error) {
				resolve({
					success: false,
					color: "#000000",
					error: `Error extracting color: ${error}`,
				});
			}
		};

		img.onerror = function () {
			resolve({
				success: false,
				color: "#000000",
				error: `Error loading image: ${imageUrl}`,
			});
		};

		img.src = imageUrl;
	});
}

// Function to extract colors from all music cards on the page
export async function extractMusicCardColors(): Promise<void> {
	const musicCards = document.querySelectorAll(".artist-card");

	if (musicCards.length === 0) {
		// console.log('No music cards found for color extraction');
		return;
	}

	// console.log(`Found ${musicCards.length} music cards for color extraction`);

	// Process each music card
	for (let i = 0; i < musicCards.length; i++) {
		const musicCard = musicCards[i] as HTMLElement;
		const trackImage = musicCard.querySelector("img") as HTMLImageElement;

		if (trackImage && trackImage.src) {
			try {
				const result = await extractImageColor(trackImage.src);

				if (result.success) {
					const trackColorHsl = rgbToHsl(result.color);
					musicCard.style.setProperty("--track-color", trackColorHsl);

					// Also set a global fallback
					document.documentElement.style.setProperty(
						"--track-color",
						trackColorHsl,
					);

					console.log(`Extracted color for music card ${i + 1}:`, trackColorHsl);
				} else {
					console.warn(
						`Failed to extract color for card ${i + 1}:`,
						result.error,
					);
				}
			} catch (error) {
				console.error(`Error processing music card ${i + 1}:`, error);
			}
		} else {
			console.log(`Missing image for music card ${i + 1}`);
		}
	}
}

// Function to initialize color extraction when DOM is ready
export function initializeColorExtraction(): void {
	if (typeof window === "undefined") {
		return; // Server-side, skip
	}

	document.addEventListener("DOMContentLoaded", async () => {
		// console.log("DOM loaded, initializing color extraction...");
		await extractMusicCardColors();
		await extractArtistCardColors();
		await extractMusicCardColorsFromImages();
	});
}

// Function to re-extract colors (useful for dynamic content)
export async function reExtractColors(): Promise<void> {
	// console.log("Re-extracting colors for music cards...");
	await extractMusicCardColors();
	await extractArtistCardColors();
	await extractMusicCardColorsFromImages();
}

// Extract dominant colors for each artist card using its embedded image (.artist-card)
async function extractArtistCardColors(): Promise<void> {
	const artistCards = document.querySelectorAll(".artist-card");
	if (artistCards.length === 0) return;

	for (let i = 0; i < artistCards.length; i++) {
		const card = artistCards[i] as HTMLElement;
		const img = card.querySelector("img") as HTMLImageElement | null;
		if (!img || !img.src) continue;

		try {
			const result = await extractImageColor(img.src);
			if (result.success) {
				card.style.setProperty("--track-color", rgbToHsl(result.color));
			}
		} catch (_) {
			// ignore
		}
	}
}

// Extract dominant colors for each .music-card (ArtistCard) using its embedded image
export async function extractMusicCardColorsFromImages(): Promise<void> {
	const cards = document.querySelectorAll(".music-card");
	if (cards.length === 0) return;

	for (let i = 0; i < cards.length; i++) {
		const card = cards[i] as HTMLElement;
		const img = card.querySelector("img") as HTMLImageElement | null;
		if (!img || !img.src) continue;

		try {
			const result = await extractImageColor(img.src);
			if (result.success) {
				card.style.setProperty("--track-color", rgbToHsl(result.color));
			}
		} catch (_) {
			// ignore
		}
	}
}
