import { ISuspectProfile } from "../schema/suspectProfileSchema";
import supabase from "../supabase";
import { popupError, popupSuccess } from "../components/Popups";
import { DEFAULT_ERROR_MESSAGE } from "../values/defaultValues";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const tableName = "SuspectProfile"

export default class SuspectProfileService {
    private queryClient = useQueryClient();

    public createItem = () => {
        return useMutation({
            mutationFn: async (item: ISuspectProfile) => {
                const { data, error } = await supabase
                    .from(tableName)
                    .insert([item])
                    .select()

                if (error !== null) popupError(error.message)
                return data;
            },
            onMutate: (newItemInfo: ISuspectProfile) => {
                this.queryClient.setQueryData([tableName], (prevItems: ISuspectProfile[] | undefined) => {
                    const items = prevItems != undefined ? prevItems : []
                    return [...items, { ...newItemInfo },] as ISuspectProfile[]
                }
                );
            },
            onSettled: (data, error) => {
                if (data) {
                    popupSuccess("Profile Submitted!");
                } else if (error) {
                    if (error instanceof Error) popupError(`Error: ${error.message}`);
                    else popupError(DEFAULT_ERROR_MESSAGE)
                }

                this.queryClient.invalidateQueries();
            },
        });
    }

    public getAllItems() {
        return useQuery<ISuspectProfile[]>({
            queryKey: [tableName],
            queryFn: async () => {
                const { data } = await supabase
                    .from(tableName)
                    .select('*')

                return data as ISuspectProfile[]
            },
            refetchOnWindowFocus: false,
        });
    }
}