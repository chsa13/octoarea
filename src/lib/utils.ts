// src/lib/utils.ts

// Полный текущий URL (строкой)
export function getCurrentUrl(): string {
	return window.location.href; // возвращает весь URL [web:56]
}

// Скопировать текст в буфер обмена
export async function copyText(text: string): Promise<void> {
	// writeText пишет строку в системный буфер и возвращает Promise [web:61]
	await navigator.clipboard.writeText(text); // работает в secure context (HTTPS) [web:61]
}

export function cssVar(name:string){
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}