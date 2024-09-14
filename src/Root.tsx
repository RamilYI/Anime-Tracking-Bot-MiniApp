import {FC, StrictMode, useEffect} from "react";
import {SDKProvider, useLaunchParams} from "@telegram-apps/sdk-react";
import App from "./App";

export const Root: FC = () =>
{
    const debug = useLaunchParams().startParam === 'debug';

    // Enable debug mode to see all the methods sent and events received.
    useEffect(() => {
        if (debug) {
            import('eruda').then((lib) => lib.default.init());
        }
    }, [debug]);

    return (
    <StrictMode>
        <SDKProvider acceptCustomStyles debug={debug}>
                <App />
        </SDKProvider>
    </StrictMode>
    );
}