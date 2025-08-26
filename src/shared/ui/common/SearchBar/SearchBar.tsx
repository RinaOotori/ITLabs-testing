import './SearchBar.css'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../../app/store/store.ts";
import {setFilter} from "../../../../app/store/statsSlice.ts";
import * as React from "react";

/* Компонент поиска по имени */
export function SearchBar({classNames}: {classNames?: string}) {
    const dispatch = useDispatch();
    const {searchQuery, presence} = useSelector((state: RootState) => state.stats.filter);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilter({searchQuery: event.target.value, presence: presence}))
    }

    return (
        <input type='search'
               className={`${classNames} SearchBar`}
               placeholder='Поиск по имени'
               value={searchQuery}
               onChange={handleSearchChange}/>
    )
}