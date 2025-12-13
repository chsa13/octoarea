import type { FieldCoordinate } from "./CanvasMethods";
import { config } from "./config";
function byteToHex(n: number): string {
  return n.toString(16).padStart(2, '0');
}

function hexToByte(a: string, b: string): number {
  return parseInt(a + b, 16);
}

function toBase64Url(b64: string): string {
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 ? 4 - (b64.length % 4) : 0;
  return b64 + '='.repeat(pad);
}

// points -> строка
export function encodePoints(
  points: FieldCoordinate[],
): string {
  const W = config.fieldWidth;
  const H = config.fieldHeight;

  if (W * H > 256) {
    throw new Error('encodePoints: field too big for 1 byte per cell');
  }

  let hex = '';

  for (const { x, y } of points) {
    if (x < 0 || x >= W || y < 0 || y >= H) {
      throw new Error('FieldCoordinate out of range');
    }
    const p = y * W + x; // 0..(W*H-1) <= 255
    hex += byteToHex(p);
  }

  const b64 = btoa(hex);
  return toBase64Url(b64);
}

// строка -> points
export function decodePoints(
  code: string,
): FieldCoordinate[] {
  const W = config.fieldWidth;
  const H = config.fieldHeight;

  const b64 = fromBase64Url(code);
  const hex = atob(b64);

  if (hex.length % 2 !== 0) {
    throw new Error('invalid code length');
  }

  const points: FieldCoordinate[] = [];

  for (let i = 0; i < hex.length; i += 2) {
    const p = hexToByte(hex[i], hex[i + 1]);
    if (p < 0 || p >= W * H) {
      throw new Error('encoded point out of range for this config');
    }
    const x = p % W;
    const y = Math.floor(p / W);
    points.push({ x, y });
  }

  return points;
}
