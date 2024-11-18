import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { popupError, popupSuccess } from "../components/Popups";
import { ISuspectProfile, TSuspectProfile } from "../schema/suspectProfileSchema";
import supabase from "../supabase";
import { DEFAULT_ERROR_MESSAGE } from "../values/defaultValues";

const tableName = "SuspectProfile"

export default class SuspectProfileService {
    private queryClient = useQueryClient();

    // Create item mutation
    public createItem() {
        return useMutation({
            mutationFn: async (item: ISuspectProfile) => {
                const { data, error } = await supabase
                    .from(tableName)
                    .insert([item])
                    .select();

                if (error !== null) popupError(error.message);
                return data;
            },
            onMutate: (newItemInfo: ISuspectProfile) => {
                this.queryClient.setQueryData([tableName], (prevItems: ISuspectProfile[] | undefined) => {
                    const items = prevItems != undefined ? prevItems : [];
                    return [...items, { ...newItemInfo }] as ISuspectProfile[];
                });
            },
            onSettled: (data, error) => {
                if (data) {
                    popupSuccess("Profile Submitted!");
                } else if (error) {
                    if (error instanceof Error) popupError(`Error: ${error.message}`);
                    else popupError(DEFAULT_ERROR_MESSAGE);
                }

                this.queryClient.invalidateQueries();
            },
        });
    }

    // Get all items (fetch from supabase)
    public getAllItems() {
        return useQuery<TSuspectProfile[]>({
            queryKey: [tableName],
            queryFn: async () => {
                const { data } = await supabase
                    .from(tableName)
                    .select('*');
                return data as TSuspectProfile[];
            },
            refetchOnWindowFocus: false,
        });
    }

    // Get all items with PSGC data (filtered)
    public getAllItemsFiltered() {
        return useQuery({
            queryKey: [tableName],
            queryFn: async () => {
                const { data } = await supabase
                    .from(tableName)
                    .select('*')
                    .order('createdAt', { ascending: true });

                return data;  // Filter will happen later in the component
            },
            refetchOnWindowFocus: false,
        });
    }
}
