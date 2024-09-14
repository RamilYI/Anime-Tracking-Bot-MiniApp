import React, {useState} from "react";
import {TitleInformationDto} from "../../Infrastructure/TitleInformationDto.ts";
import CardComponent from "../CardComponent/CardComponent.tsx";
import {Button, List} from "@telegram-apps/telegram-ui";
import SearchComponent from "../SearchComponent/SearchComponent.tsx";
import {initMiniApp, string, useMiniApp} from "@telegram-apps/sdk-react";
import axios from 'axios';

export default function ListComponent()
{
    // const [titleInformationsDto, setTitleInformationsDto] = useState<TitleInformationDto[]>();
    const miniApp = useMiniApp();
    let count = 0;
    const fakeDataList = [
        {
            id: count++,
            title: {
                english: "Sengoku Youko: The Thousandfold Chaos Arc",
                native: "戦国妖狐 千魔混沌編",
                romaji: "Sengoku Youko: Senma Konton-hen",
            },
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx16498-73IhOXpJZiMF.jpg",
            isEnabled: false,
        },
        {
            id: count++,
            title: {
                english: undefined,
                native: "すとぷり はじまりの物語 ～Strawberry School Festival!!!～ ",
                romaji: "StPri: Hajimari no Monogatari - Strawberry School Festival!!!",
            },
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101922-WBsBl0ClmgYL.jpg",
            isEnabled: false,
        },
        {
            id: count++,
            title: {
                english: undefined,
                native: "グレンダイザーU",
                romaji: "Grendizer U",
            },
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1535-4r88a1tsBEIz.jpg",
            isEnabled: false,
        },
        {
            id: count++,
            title: {
                english: "Lucky Bunny Lunny & Mx. Birthday",
                native: "ラニーちゃんとたんじょうびやさん",
                romaji: "Lunny-chan to Tanjoubiya-san",
            },
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx113415-bbBWj4pEFseh.jpg",
            isEnabled: false,
        },
        {
            id: count++,
            title: {
                english: "DEAD DEAD DEMONS DEDEDEDE DESTRUCTION",
                native: "デッドデッドデーモンズデデデデデストラクション",
                romaji: "Dead Dead Demon's Dededededestruction",
            },
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21459-RoPwgrZ32gM3.jpg",
            isEnabled: false,
        },
        {
            id: count++,
            title: {
                english: "Code Geass: Rozé of the Recapture",
                native: "コードギアス 奪還のロゼ",
                romaji: "Code Geass: Dakkan no Rozé",
            },
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx11061-NpIIobuQNbJW.png",
            isEnabled: false,
        },
        {
            id: count++,
            title: {
                english: "CARDFIGHT!! VANGUARD Divinez Season 2",
                native: "カードファイト!! ヴァンガード Divinez Season2",
                romaji: "Cardfight!! Vanguard: Divinez Season 2",
            },
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21087-2OkAdgfnQown.jpg",
            isEnabled: false,
        },
        {
            id: count++,
            title: {
                english: "A Journey Through Another World: Raising Kids While Adventuring",
                native: "異世界ゆるり紀行 ～子育てしながら冒険者します～",
                romaji: "Isekai Yururi Kikou: Kosodate Shinagara Boukensha Shimasu",
            },
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx20605-fmnHdfurM7m6.jpg",
            isEnabled: false,
        },
        {
            id: count++,
            title: {
                english: "JOCHUM",
                native: "JOCHUM",
                romaji: "JOCHUM",
            },
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx11757-Q9P2zjCPICq5.jpg",
            isEnabled: false,
        },
        {
            id: count++,
            title: {
                english: undefined,
                native: "未来の黒幕系悪役令嬢モリアーティーの異世界完全犯罪白書",
                romaji: "Mirai no Kuromakukei Akuyaku Reijou Moriarty no Isekai Kanzen Hanzai Hakusho",
            },
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx5114-Dilr312jctdJ.jpg",
            isEnabled: false,
        },
        {
            id: count++,
            title: {
                english: undefined,
                native: "Fate/Grand Order 藤丸立香はわからない Season2",
                romaji: "Fate/Grand Order: Fujimaru Ritsuka wa Wakaranai Season 2",
            },
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20-LxrhhIQyiE60.jpg",
            isEnabled: false,
        },
    ];

    const [filteredFakeData, setfilteredFakeData] = useState<TitleInformationDto[]>(fakeDataList);
    const [searchItem, setSearchItem] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const filteredItems = fakeDataList.filter((fakeData) =>
            fakeData.title.english?.toLowerCase().includes(searchTerm.toLowerCase())
            || fakeData.title.romaji.toLowerCase().includes(searchTerm.toLowerCase())
            || fakeData.title.native.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setfilteredFakeData(filteredItems);
    }

    // useEffect(() => {
    //     setTitleInformationsDto(fakeDataList);
    // }, [fakeDataList]);

    return (
        <List>
            <SearchComponent value={searchItem} onChange={handleInputChange}/>
                {filteredFakeData?.map((dto) => {
                    return <CardComponent key={dto.id} cardDto={dto}/>;
                })}
            <Button style={{width:"100%"}} onClick={() =>
            {
                const ids = filteredFakeData?.filter((dto) => dto.isEnabled).map((dto) => dto.id).toString();
                miniApp.sendData(ids);
                miniApp.close();
            }}>OK</Button>
        </List>
    );
}