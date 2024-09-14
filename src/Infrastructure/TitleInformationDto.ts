export type TitleInformationDto = {
    id: number;
    title: { english: string | undefined, romaji: string | undefined, native: string | undefined };
    image: string | undefined;
    isEnabled: boolean;
}

