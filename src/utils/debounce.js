

export const debounce = (func, wait) => {
    if (!func) {
        throw  new TypeError('func is a required argument');
    }

    if (!wait) {
        throw new TypeError('wait is a required argument.');
    }

    let timeout;
    return function (...args) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func(...args)
        }, wait);
    }
}