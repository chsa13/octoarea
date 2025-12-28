// src/lib/query.ts

// получить: ?foo=bar -> getQuery('foo') === 'bar'
export function getQuery(name: string): string | null {
	const url = new URL(window.location.href);
	return url.searchParams.get(name); // возвращает string или null [web:22]
}

// установить/удалить:
// setQuery('foo', 'bar') -> добавит/обновит foo=bar
// setQuery('foo') или setQuery('foo', null) -> удалит foo
export function setQuery(name: string, value?: string | number | boolean | null): void {
	const url = new URL(window.location.href);

	if (value === undefined || value === null || value === '') {
		url.searchParams.delete(name);
	} else {
		url.searchParams.set(name, String(value)); // set(name, value) [web:21]
	}

	history.pushState(history.state, '', url);
}
