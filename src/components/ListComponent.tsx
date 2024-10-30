import React, {useEffect, useState} from "react";
import {TitleInformationDto} from "../Infrastructure/TitleInformationDto.ts";
import CardComponent from "./CardComponent.tsx";
import {Button, List} from "@telegram-apps/telegram-ui";
import SearchComponent from "./SearchComponent.tsx";
import {useMiniApp} from "@telegram-apps/sdk-react";

export default function ListComponent({seasonsData}: {
    seasonsData: TitleInformationDto[]
}) {
    const miniApp = useMiniApp();
    const [searchItem, setSearchItem] = useState('');
    const [filteredData, setFilteredData] = useState<TitleInformationDto[]>();
    useEffect(() => {
        setFilteredData(seasonsData);
    }, [seasonsData]);

    // обработать поиск тайтла
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const filteredItems = seasonsData.filter((titleInfoDto) =>
            titleInfoDto.title.english?.toLowerCase().includes(searchTerm.toLowerCase())
            || titleInfoDto.title.romaji?.toLowerCase().includes(searchTerm.toLowerCase())
            || titleInfoDto.title.native?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredData(filteredItems);
    }

    return (
        <List>
            <SearchComponent value={searchItem} onChange={handleInputChange}/>
            <div>
                {filteredData?.map((dto) => {
                    return <CardComponent key={dto.id} cardDto={dto}/>;
                })}

                <Button style={{visibility: "hidden"}}/>
            </div>
            <Button style={{width: "100%", position: "fixed", bottom: 0}} onClick={() => {
                const ids = filteredData?.filter((dto) => dto.isEnabled).map((dto) => dto.id).toString();
                if (typeof ids === "string") {
                    miniApp.sendData(ids);
                } else {
                    miniApp.sendData("");
                }

                miniApp.close();
            }}>OK</Button>
        </List>
    );
}