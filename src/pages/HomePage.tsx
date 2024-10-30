import {
    bindMiniAppCSSVars,
    bindThemeParamsCSSVars, bindViewportCSSVars,
    useLaunchParams,
    useMiniApp,
    useThemeParams,
    useViewport
} from "@telegram-apps/sdk-react";
import {useEffect, useState} from "react";
import {AppRoot} from "@telegram-apps/telegram-ui";
import ListComponent from "../components/ListComponent.tsx";
import {Layout} from "../Layout/Layout.tsx";
import {TitleInformationDto} from "../Infrastructure/TitleInformationDto.ts";

export default function HomePage()
{
    const launchParams = useLaunchParams();
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

    const urlParams = new URLSearchParams(window.location.search);
    const titleParams = urlParams?.get('_titles')?.split(';')?.map(Number);
    const [seasonsData, setSeasonsData] = useState<TitleInformationDto[]>([]);

    useEffect(() => {
        const getSeasonData = async () => {
            try{
                const response = await fetch('https://animetracking.duckdns.org/api/bot/getSeason');
                const data = await response.json() as TitleInformationDto[];
                const titleInformationDtos = data.filter(function (value: TitleInformationDto, index: number, array: TitleInformationDto[]) {
                    const findDtoIndex = array.findIndex(x => value.id == x.id);
                    return findDtoIndex == index;
                });
                if (titleParams !== undefined){
                    titleInformationDtos.filter(dto => titleParams.includes(dto.id)).forEach(function(item){
                        item.isEnabled = true;
                        const dtoIndex = titleInformationDtos.findIndex(x => x.id == item.id);
                        titleInformationDtos.splice(dtoIndex, 1);
                        titleInformationDtos.unshift(item);
                    });
                }

                setSeasonsData(titleInformationDtos);
            }
            catch(error){
                console.error(error, "error fetching data");
            }
        };
        getSeasonData();
    }, []);
    return (
        <AppRoot
            appearance={miniApp.isDark ? 'dark' : 'light'}
            platform={['macos', 'ios'].includes(launchParams.platform) ? 'ios' : 'base'}
        >
            <Layout>
                <ListComponent seasonsData={seasonsData} />
            </Layout>
        </AppRoot>
    );
}