import React from 'react';

import {getFromURL} from './useRoomID';

export const getUserNameFromURL = (): string | undefined => {
    const encodedName = getFromURL('name');
    return encodedName ? decodeURIComponent(encodedName) : undefined;
};

export const useName = (): [string | undefined, (v?: string) => void] => {
    const [state, setState] = React.useState<string | undefined>(() => getUserNameFromURL());
    React.useEffect(() => {
        const onChange = (): void => setState(getUserNameFromURL());
        window.addEventListener('popstate', onChange);
        return () => window.removeEventListener('popstate', onChange);
    }, [setState]);
    return [
        state,
        React.useCallback(
            (name?: string) =>
                setState((oldName?: string) => {
                    if (oldName !== name) {
                        const urlParams = new URLSearchParams(window.location.search);
                        if (name) {
                            urlParams.set('name', name);
                        } else {
                            urlParams.delete('name');
                        }
                        const queryString = Array.from(urlParams.entries())
                            .map(([key, value]) => {
                                return key === 'name'
                                    ? `${key}=${encodeURIComponent(value)}`
                                    : `${key}=${value}`;
                            })
                            .join('&');
                        const newUrl = queryString ? `?${queryString}` : window.location.pathname;
                        window.history.pushState({userName: name}, '', newUrl);
                    }
                    return name;
                }),
            [setState]
        ),
    ];
};
