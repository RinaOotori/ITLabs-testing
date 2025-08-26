import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../../entities/client";
import { convertFilterToString } from "../../../shared/model";
import { setFilter, setStats } from "../../../app/store/statsSlice.ts";
import { initFilters } from "./initFilters.ts";
import type { RootState } from "../../../app/store/store.ts";

export function useClients() {
    const dispatch = useDispatch();
    const clients = useSelector((state: RootState) => state.stats.clients);
    const filters = useSelector((state: RootState) => state.stats.filter);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const init = initFilters();
        dispatch(setFilter(init));
        setIsInitialized(true);
    }, [dispatch]);

    useEffect(() => {
        if (!isInitialized) return;

        const params = new URLSearchParams({ fullName_like: filters.searchQuery });
        if (filters.presence !== "") {
            params.append("present", filters.presence);
        }

        const fetchClients = async () => {
            const clients = await getClients(convertFilterToString(filters));
            dispatch(setStats({ clients }));
            window.history.pushState({}, "", `?${params.toString()}`);
        };

        fetchClients().then();
    }, [dispatch, filters, isInitialized]);

    return { clients };
}
