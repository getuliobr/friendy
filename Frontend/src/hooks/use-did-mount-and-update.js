import { useEffect } from 'react';

/**
 * @param {function} callback
 * @param {Array} inputs
 */
const useDidMountAndUpdate = (callback, inputs) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(callback, inputs);
};

export default useDidMountAndUpdate;
