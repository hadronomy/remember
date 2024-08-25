import {
	StoreApi,
	UseBoundStore,
	create,
	createStore,
	useStore,
} from "zustand";

import { storage } from "@/store/mmkv";
import { ColorScheme, COLOR_SCHEME_STORAGE_KEY } from "@/constants/colors";

type Config = {
	colorScheme: ColorScheme | "auto";
};

type UpdateConfig = {
	updateColorScheme: (colorScheme: ColorScheme) => void;
};

type WithSelectors<S> = S extends { getState: () => infer T }
	? S & { use: { [K in keyof T]: () => T[K] } }
	: never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
	_store: S,
) => {
	let store = _store as WithSelectors<typeof _store>;
	store.use = {};
	for (let k of Object.keys(store.getState())) {
		(store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
	}
	return store;
};

const configStoreBase = create<Config & UpdateConfig>((set) => ({
	colorScheme: "auto",
	updateColorScheme: (colorScheme) =>
		set(() => {
			storage.set(COLOR_SCHEME_STORAGE_KEY, colorScheme);
			console.log("set colorScheme to", colorScheme);
			return { colorScheme };
		}),
}));

export const useConfigStore = createSelectors(configStoreBase);
