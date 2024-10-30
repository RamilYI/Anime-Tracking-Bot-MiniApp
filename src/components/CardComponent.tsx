import {TitleInformationDto} from "../Infrastructure/TitleInformationDto.ts";
import {Cell, Checkbox} from "@telegram-apps/telegram-ui";
import React from "react";

export default function CardComponent({cardDto}:{cardDto: TitleInformationDto})
{
    function handleCheckbox(event: React.ChangeEvent<HTMLInputElement>){
        cardDto.isEnabled = event.target.checked;
    }

    return <Cell
        Component="label"
        before={<img style={{
            display: 'block',
            height: 50,
            objectFit: 'cover',
            width: 41.2
        }}
                     src={cardDto.coverImage.large}/>}
        after={<Checkbox defaultChecked={cardDto.isEnabled} onChange={handleCheckbox}/>}
        subtitle={<p style={{fontSize: "12px", margin: 0}}>?/?</p>}
        multiline
        style={{margin:-10}}>
        <h1 style={{fontSize:"13px", margin: 0, color:"#229ED9"}}>{cardDto.title.english ?? cardDto.title.romaji ?? cardDto.title.native}</h1>
    </Cell>
}