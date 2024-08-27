import {
    bindMiniAppCSSVars,
    bindThemeParamsCSSVars, bindViewportCSSVars,
    useLaunchParams,
    useMiniApp,
    useThemeParams,
    useViewport
} from "@telegram-apps/sdk-react";
import {useEffect} from "react";
import {AppRoot} from "@telegram-apps/telegram-ui";
import ListComponent from "../components/ListComponent/ListComponent.tsx";
import {Layout} from "../Layout/Layout.tsx";

export default function HomePage()
{
    const lp = useLaunchParams();
    const miniApp = useMiniApp();
    const themeParams = useThemeParams();
    const viewport = useViewport();

    useEffect(() => {
        return bindMiniAppCSSVars(miniApp, themeParams);
    }, [miniApp, themeParams]);

    useEffect(() => {
        return bindThemeParamsCSSVars(themeParams);
    }, [themeParams]);

    useEffect(() => {
        return viewport && bindViewportCSSVars(viewport);
    }, [viewport]);

    return (
        <AppRoot
            appearance={miniApp.isDark ? 'dark' : 'light'}
            platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
        >
            <Layout>
                <ListComponent/>
            </Layout>
        </AppRoot>
    );
}