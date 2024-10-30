export type TitleInformationDto = {
    id: number;
    title: { english: string | undefined, romaji: string | undefined, native: string | undefined };
    coverImage: { large: string | undefined };
    isEnabled: boolean | undefined;
}

