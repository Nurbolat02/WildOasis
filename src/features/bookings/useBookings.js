import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get('status');
    const filter = !filterValue || filterValue === 'all' ? null
        :
        // { field: 'totalPrice', value: 5000, method: 'gte' }
        { field: 'status', value: filterValue };

    const sortByRaw = searchParams.get('sprtBy') || 'startDate-desc';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = { field, direction };

    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy }),
    });
    return { isLoading, error, bookings }
}