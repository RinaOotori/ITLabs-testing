export interface Filter {
    searchQuery: string;
    presence: string;
}

export function convertFilterToString(filter: Filter): string {
    return filter.searchQuery == '' && filter.presence == '' ? '' : filter.presence == '' ? `fullName_like=${filter.searchQuery}` : `fullName_like=${filter.searchQuery}&present=${filter.presence}`
}