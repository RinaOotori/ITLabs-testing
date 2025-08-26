import type {Filter} from "../../../shared/model";

export function initFilters(): Filter {
    const params = new URLSearchParams(window.location.search)
    const initSearchQuery = params.get('fullName_like') || ''
    const initPresence = params.get('present') || ''
    console.log({searchQuery: initSearchQuery, presence: initPresence})
    return {searchQuery: initSearchQuery, presence: initPresence}
}