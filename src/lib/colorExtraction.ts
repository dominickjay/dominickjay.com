// Color extraction utility for music cards
// This provides a reusable way to extract dominant colors from album/artist images

export interface ColorExtractionResult {
  success: boolean;
  color: string;
  error?: string;
}

// Function to extract dominant color from image URL
export function extractImageColor(imageUrl: string): Promise<ColorExtractionResult> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = function() {
      try {
        // Check if ColorThief is available
        if (typeof window !== 'undefined' && (window as any).ColorThief) {
          const colorThief = new (window as any).ColorThief();
          const dominantColor = colorThief.getColor(img);
          const rgbColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

          resolve({
            success: true,
            color: rgbColor
          });
        } else {
          resolve({
            success: false,
            color: '#000000',
            error: 'ColorThief not available'
          });
        }
      } catch (error) {
        resolve({
          success: false,
          color: '#000000',
          error: `Error extracting color: ${error}`
        });
      }
    };

    img.onerror = function() {
      resolve({
        success: false,
        color: '#000000',
        error: `Error loading image: ${imageUrl}`
      });
    };

    img.src = imageUrl;
  });
}

// Function to extract colors from all music cards on the page
export async function extractMusicCardColors(): Promise<void> {
  const musicCards = document.querySelectorAll('.music-card');

  if (musicCards.length === 0) {
    console.log('No music cards found for color extraction');
    return;
  }

  console.log(`Found ${musicCards.length} music cards for color extraction`);

  // Process each music card
  for (let i = 0; i < musicCards.length; i++) {
    const musicCard = musicCards[i] as HTMLElement;
    const trackImage = musicCard.querySelector('img') as HTMLImageElement;

    if (trackImage && trackImage.src) {
      try {
        const result = await extractImageColor(trackImage.src);

        if (result.success) {
          musicCard.style.setProperty('--track-color', result.color);
          console.log(`Extracted color for card ${i + 1}:`, result.color);
        } else {
          console.warn(`Failed to extract color for card ${i + 1}:`, result.error);
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
  if (typeof window === 'undefined') {
    return; // Server-side, skip
  }

  document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing color extraction...');
    await extractMusicCardColors();
  });
}

// Function to re-extract colors (useful for dynamic content)
export async function reExtractColors(): Promise<void> {
  console.log('Re-extracting colors for music cards...');
  await extractMusicCardColors();
}
