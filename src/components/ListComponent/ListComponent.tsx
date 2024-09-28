import React, {useEffect, useState} from "react";
import {TitleInformationDto} from "../../Infrastructure/TitleInformationDto.ts";
import CardComponent from "../CardComponent/CardComponent.tsx";
import {Button, List} from "@telegram-apps/telegram-ui";
import SearchComponent from "../SearchComponent/SearchComponent.tsx";
import {useMiniApp} from "@telegram-apps/sdk-react";

export default function ListComponent()
{
    const [seasonsData, setSeasonsData] = useState<TitleInformationDto[]>([]);
    const [filteredData, setfilteredData] = useState<TitleInformationDto[]>();
    const miniApp = useMiniApp();

    useEffect(() => {
        const getSeasonData = async () => {
            try{
                const response = await fetch('/api/bot/getSeason');
                const data = await response.json() as TitleInformationDto[];
                const filteredData = data.filter(function (value: TitleInformationDto, index: number, array: TitleInformationDto[]) {
                    const findDtoIndex = array.findIndex(x => value.id == x.id);
                    return findDtoIndex == index;
                });
                setSeasonsData(filteredData);
                setfilteredData(filteredData);
            }
            catch(error){
                console.error(error, "error fetching data");
            }
        };
        getSeasonData();
    }, []);

    const [searchItem, setSearchItem] = useState('');


    // обработать поиск тайтла
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const filteredItems = seasonsData.filter((titleInfoDto) =>
            titleInfoDto.title.english?.toLowerCase().includes(searchTerm.toLowerCase())
            || titleInfoDto.title.romaji?.toLowerCase().includes(searchTerm.toLowerCase())
            || titleInfoDto.title.native?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setfilteredData(filteredItems);
    }

    return (
        <List>
            <SearchComponent value={searchItem} onChange={handleInputChange}/>
            <div>
                {filteredData?.map((dto) => {
                    return <CardComponent key={dto.id} cardDto={dto}/>;
                })}

            <Button style={{visibility:"hidden"}}/>
            </div>
            <Button style={{width:"100%", position:"fixed", bottom:0}} onClick={() =>
            {
                const ids = filteredData?.filter((dto) => dto.isEnabled).map((dto) => dto.id).toString();
                if (typeof ids === "string") {
                    miniApp.sendData(ids);
                }
                else
                {
                    miniApp.sendData("");
                }

                miniApp.close();
            }}>OK</Button>
        </List>
    );
}