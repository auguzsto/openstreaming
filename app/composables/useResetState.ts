import type { Store } from "pinia";

export const useResetState = (store: Store) => store.$reset();