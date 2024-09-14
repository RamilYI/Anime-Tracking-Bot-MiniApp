import {TitleInformationDto} from "../../Infrastructure/TitleInformationDto.ts";
import {Cell, Checkbox} from "@telegram-apps/telegram-ui";

export default function CardComponent({cardDto}:{cardDto: TitleInformationDto})
{
    return <Cell
        Component="label"
        before={<img style={{
            display: 'block',
            height: 50,
            objectFit: 'cover',
            width: 41.2
        }}
                     src={cardDto.coverImage.large}/>}
        after={<Checkbox onChange={() => {
            cardDto.isEnabled = !cardDto.isEnabled;
        }} />}
        subtitle={<p style={{fontSize: "12px", margin: 0}}>9/12</p>}
        multiline
        style={{margin:-10}}>
        <h1 style={{fontSize:"13px", margin: 0, color:"#229ED9"}}>{cardDto.title.english ?? cardDto.title.romaji}</h1>
    </Cell>
}