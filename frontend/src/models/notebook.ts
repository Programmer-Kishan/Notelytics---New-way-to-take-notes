export interface Notebook {
    _id: string,
    userId: string,
    title: string,
    description: string,
    notes: string[],
    notesName: string[]
}