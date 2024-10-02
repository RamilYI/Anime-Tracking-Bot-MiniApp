import React from "react";
import {Input, Tappable} from "@telegram-apps/telegram-ui";
import {Icon24Close} from "@telegram-apps/telegram-ui/dist/icons/24/close";


export default function SearchComponent({value, onChange}: {value?:string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
    return <Input status="focused" header="Поиск" placeholder="Поиск анимэ... (например Naruto)" value={value}
                  onChange={onChange}
                  after={<Tappable Component="div" style={{
                      display: 'flex'
                  }}>
                      <Icon24Close/>
                  </Tappable>}/>;
}