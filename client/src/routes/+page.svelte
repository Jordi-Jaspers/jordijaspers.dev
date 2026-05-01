<script lang="ts">
	import Navigation from '$lib/components/navigation';
	import { activeTab } from '$lib/stores/localstorage.svelte';
	import { browser } from '$app/environment';
	import { untrack } from 'svelte';
	import { Grip } from 'lucide-svelte';

	let { data } = $props();

	const fraction: number = 164;
	const gap: number = 16;
	const unit: number = fraction + gap; // 180px per grid unit

	// Deep copies as fallback for reset — untrack: intentionally captures initial data value only
	const mobileCoords: Coordinates[] = untrack(() =>
		data.mobileLayout.map((obj: Coordinates) => ({ ...obj }))
	);
	const desktopCoords: Coordinates[] = untrack(() =>
		data.desktopLayout.map((obj: Coordinates) => ({ ...obj }))
	);

	let cols: number = $state(4);
	let items: GridObject[] = $state([]);

	// Drag state
	let draggingId: string | null = $state(null);
	let dragStartClientX: number = 0;
	let dragStartClientY: number = 0;
	let dragOrigX: number = 0;
	let dragOrigY: number = 0;

	let maxHeight = $derived.by(() => {
		let maxY = 0;
		items.forEach((item) => {
			if (item.y + item.h > maxY) maxY = item.y + item.h;
		});
		const overhead = cols > 2 ? 16 : 8;
		return maxY * fraction + gap * maxY - overhead;
	});

	let maxWidth = $derived.by(() => {
		const overhead = cols > 2 ? 16 : 8;
		return cols * fraction + gap * cols - overhead;
	});

	function getItemStyle(item: GridObject): string {
		const left = item.x * unit;
		const top = item.y * unit;
		const width = item.w * fraction + (item.w - 1) * gap;
		const height = item.h * fraction + (item.h - 1) * gap;
		return `left: ${left}px; top: ${top}px; width: ${width}px; height: ${height}px;`;
	}

	function compressGrid(): void {
		const sorted = [...items].sort((a, b) => (a.y !== b.y ? a.y - b.y : a.x - b.x));
		const occupied = new Set<string>();

		for (const item of sorted) {
			let bestY = 0;
			for (let tryY = 0; tryY <= item.y; tryY++) {
				let canPlace = true;
				for (let dy = 0; dy < item.h && canPlace; dy++) {
					for (let dx = 0; dx < item.w && canPlace; dx++) {
						if (occupied.has(`${item.x + dx},${tryY + dy}`)) {
							canPlace = false;
							bestY = tryY + dy + 1;
						}
					}
				}
				if (canPlace) {
					bestY = tryY;
					break;
				}
			}
			item.y = bestY;
			for (let dy = 0; dy < item.h; dy++) {
				for (let dx = 0; dx < item.w; dx++) {
					occupied.add(`${item.x + dx},${item.y + dy}`);
				}
			}
		}
		items = sorted;
	}

	function resetGrid(): void {
		const coordinates = cols > 2 ? desktopCoords : mobileCoords;
		items = items.map((item) => {
			const coord = coordinates.find((c) => c.id === item.id);
			if (coord) {
				item.x = coord.x;
				item.y = coord.y;
				item.w = coord.w;
				item.h = coord.h;
			}
			return { ...item };
		});
		compressGrid();
	}

	function placeItems(itemsToPlace: GridObject[]): GridObject[] {
		const occupiedCells = new Set<string>();
		for (const obj of itemsToPlace) {
			let placed = false;
			for (let y = 0; !placed; y++) {
				for (let x = 0; x <= cols - obj.w; x++) {
					let canPlace = true;
					for (let i = 0; i < obj.w && canPlace; i++) {
						for (let j = 0; j < obj.h && canPlace; j++) {
							if (occupiedCells.has(`${x + i},${y + j}`)) canPlace = false;
						}
					}
					if (canPlace) {
						obj.x = x;
						obj.y = y;
						for (let i = 0; i < obj.w; i++) {
							for (let j = 0; j < obj.h; j++) {
								occupiedCells.add(`${x + i},${y + j}`);
							}
						}
						placed = true;
						break;
					}
				}
			}
		}
		return itemsToPlace;
	}

	function updateGrid(): void {
		cols = window.innerWidth >= 844 ? 4 : 2;
		items = cols > 2 ? [...data.desktopLayout] : [...data.mobileLayout];
		resetGrid();
	}

	// Initialize and handle resize
	$effect(() => {
		if (!browser) return;
		updateGrid();
		window.addEventListener('resize', updateGrid);
		return () => window.removeEventListener('resize', updateGrid);
	});

	// Tab filtering
	$effect(() => {
		const tab = activeTab.value;
		untrack(() => {
			if (!browser || items.length === 0) return;
			resetGrid();
			if (tab === 'all') return;
			const active = items.filter((i) => i.category.includes(tab));
			const inactive = items.filter((i) => !i.category.includes(tab));
			items = placeItems([...active, ...inactive]);
		});
	});

	// Drag handlers
	function onDragStart(e: PointerEvent, id: string): void {
		const item = items.find((i) => i.id === id);
		if (!item) return;
		draggingId = id;
		dragStartClientX = e.clientX;
		dragStartClientY = e.clientY;
		dragOrigX = item.x;
		dragOrigY = item.y;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onDragMove(e: PointerEvent): void {
		if (!draggingId) return;
		const item = items.find((i) => i.id === draggingId);
		if (!item) return;

		const dx = Math.round((e.clientX - dragStartClientX) / unit);
		const dy = Math.round((e.clientY - dragStartClientY) / unit);

		item.x = Math.max(0, Math.min(cols - item.w, dragOrigX + dx));
		item.y = Math.max(0, dragOrigY + dy);
		items = [...items];
	}

	function onDragEnd(): void {
		if (draggingId) {
			compressGrid();
			draggingId = null;
		}
	}
</script>

<div class="relative h-full w-full">
	<Navigation />
	<div class="max-w-screen relative mx-auto" style="width: {maxWidth}px; height: {maxHeight}px;">
		{#each items as item (item.id)}
			{@const isActive = item.category.includes(activeTab.value) || activeTab.value === 'all'}
			{@const isDragging = draggingId === item.id}
			<div
				class="grid-item absolute !z-[1] {!item.border && 'border-none'} {isActive ? 'opacity-100' : 'opacity-50'} {isDragging ? '!z-[100] cursor-grabbing' : ''}"
				style={getItemStyle(item)}
				role="group"
				aria-label="Grid item"
				onpointermove={onDragMove}
				onpointerup={onDragEnd}
			>
				<div
					class="absolute right-0 top-0 !z-[10] m-2 h-8 w-8 cursor-grab rounded-full bg-muted"
					onpointerdown={(e) => onDragStart(e, item.id)}
					role="button"
					tabindex="0"
					aria-label="Drag to reorder"
					onkeydown={(e) => e.key === 'Enter' && e.preventDefault()}
				>
					<Grip class="h-full w-full p-2" />
				</div>

				{#if item.component}
					<item.component />
				{/if}
			</div>
		{/each}
	</div>
</div>
