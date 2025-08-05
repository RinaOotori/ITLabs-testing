import './SearchBar.css'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store.ts";
import {setFilter} from "../../statsSlice.ts";
import * as React from "react";

export default function SearchBar() {
    const dispatch = useDispatch();
    const { searchQuery, presence } = useSelector((state: RootState) => state.stats.filter);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilter({searchQuery: event.target.value, presence: presence}))
    }

    return (
        <div>
            <input type='search'
                   id='search_bar'
                   placeholder='Поиск по имени'
                   value={searchQuery}
                   onChange={handleSearchChange} />
        </div>
    )
}