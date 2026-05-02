import { browser } from '$app/environment';

class LocalStorageState<T> {
	#key: string;
	#value: T = $state()!;

	constructor(key: string, initialValue: T) {
		this.#key = key;
		this.#value = initialValue;

		if (browser) {
			const stored = localStorage.getItem(key);
			if (stored) {
				try {
					this.#value = JSON.parse(stored);
				} catch {
					this.#value = stored as unknown as T;
				}
			}
		}
	}

	get value(): T {
		return this.#value;
	}

	set value(newValue: T) {
		this.#value = newValue;
		if (browser) {
			localStorage.setItem(this.#key, JSON.stringify(newValue));
		}
	}
}

export const isDarkMode = new LocalStorageState<boolean>('isDarkMode', false);
