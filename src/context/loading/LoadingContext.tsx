import { createContext } from "react";

import { LoadingText } from "src/interfaces/ui.types";

export interface LoadingContextProps {
    loading: boolean | number;
    texts: LoadingText;
    show: (texts: LoadingText) => void;
    hide: () => void;
}

export const LoadingContext = createContext<LoadingContextProps>({} as LoadingContextProps);