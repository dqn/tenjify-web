const tenjiCols = 2;
const tenjiRows = 4;

function numberToTenji(num: number): string {
  let flags = 0;
  flags += (num & 0b00001000) << 3;
  flags += (num & 0b01110000) >> 1;
  flags += num & 0b10000111;

  return String.fromCharCode(flags + 0x2800);
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  const image = new Image();

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = src;
  });

  return image;
}

type TenjifyOptions = {
  width?: number;
  threshold?: number;
  reverse?: boolean;
};

export async function tenjify(
  src: string,
  options?: TenjifyOptions,
): Promise<string> {
  const { width, threshold, reverse } = {
    width: 30,
    threshold: 128,
    reverse: false,
    ...options,
  };

  const image = await loadImage(src);

  const canvasWidth = tenjiCols * width;
  const canvasHeight = Math.round(image.height * (canvasWidth / image.width));

  const canvas = document.createElement("canvas");

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

  let result = "";

  for (let sy = 0; sy < canvasHeight; sy += tenjiRows) {
    for (let sx = 0; sx < canvasWidth; sx += tenjiCols) {
      let n = 0;

      for (let dy = 0; dy < tenjiRows && sy + dy < canvasHeight; ++dy) {
        for (let dx = 0; dx < tenjiCols; ++dx) {
          const [r, g, b] = ctx.getImageData(sx + dx, sy + dy, 1, 1).data;
          const isBelow = (r + g + b) / 3 < threshold;

          if ((isBelow && !reverse) || (!isBelow && reverse)) {
            let diff = 1;
            diff <<= 4 * dx;
            diff <<= dy;
            n += diff;
          }
        }
      }

      result += numberToTenji(n);
    }

    result += "\n";
  }

  return result;
}
