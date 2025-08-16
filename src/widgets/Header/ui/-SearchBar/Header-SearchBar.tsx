import './Header-SearchBar.css'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../../app/store/store.ts";
import {setFilter} from "../../../../app/store/statsSlice.ts";
import * as React from "react";

/* Компонент поиска по имени */
export function HeaderSearchBar() {
    const dispatch = useDispatch();
    const {searchQuery, presence} = useSelector((state: RootState) => state.stats.filter);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilter({searchQuery: event.target.value, presence: presence}))
    }

    return (
        <input type='search'
               className='Header-SearchBar'
               placeholder='Поиск по имени'
               value={searchQuery}
               onChange={handleSearchChange}/>
    )
}