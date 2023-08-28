export interface SectionsWithImgFile {
    id: string,
    subTitle: string,
    paragraph: string,
    order: number,
    difficulty?: string
    duration?: number | undefined
    img?: string,
    imgFile: File  | null,
}