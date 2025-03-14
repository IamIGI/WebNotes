// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebounceFunction<T extends (...args: any[]) => any> = {
	(...args: Parameters<T>): ReturnType<T>;
	cancel: () => void;
};

/**
 *
 * @param callbackFn - function executed after time passed in delay param
 * @param delay - delay in [s] unit
 * @returns A debounced version of `callbackFn`, which returns a `Promise` of the result of the `callbackFn` execution,
 *          and includes a `cancel` method to cancel the pending invocation.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => ReturnType<T>>(
	callbackFn: T,
	delay: number
): DebounceFunction<T> => {
	let timer: ReturnType<typeof setTimeout>;

	const debounceFunction = (...args: Parameters<T>): ReturnType<T> => {
		clearTimeout(timer);
		return new Promise<ReturnType<T>>((resolve) => {
			timer = setTimeout(() => resolve(callbackFn(...args)), delay * 1000);
		}) as ReturnType<T>;
	};

	debounceFunction.cancel = () => {
		clearTimeout(timer);
	};

	return debounceFunction;
};

export default {
	debounce
};
