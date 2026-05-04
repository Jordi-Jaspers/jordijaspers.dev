// Mock ResizeObserver for jsdom — synchronously fires callback with width=600px
// so dynamic week count resolves to Math.floor((600 + 3) / (11 + 3)) = 43 weeks

class ResizeObserverMock {
	private callback: ResizeObserverCallback;

	constructor(callback: ResizeObserverCallback) {
		this.callback = callback;
	}

	observe(target: Element): void {
		// Fire synchronously with a fake 600px-wide contentRect
		this.callback(
			[
				{
					target,
					contentRect: {
						width: 600,
						height: 100,
						top: 0,
						left: 0,
						bottom: 100,
						right: 600,
						x: 0,
						y: 0,
						toJSON: () => ({})
					} as DOMRectReadOnly,
					borderBoxSize: [],
					contentBoxSize: [],
					devicePixelContentBoxSize: []
				}
			],
			this as unknown as ResizeObserver
		);
	}

	unobserve(): void {}
	disconnect(): void {}
}

// Install globally so all tests see it
(globalThis as unknown as Record<string, unknown>)['ResizeObserver'] = ResizeObserverMock;
