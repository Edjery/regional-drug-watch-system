import { ISuspectProfileSchema } from "../schema/suspectProfileSchema";
import supabase from "../supabase";
import { popupError, popupSuccess } from "../components/Popups";
import { DEFAULT_ERROR_MESSAGE } from "../values/defaultValues";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const tableName = "SuspectProfile"

export default class SuspectProfileService {
    private queryClient = useQueryClient();

    public createItem = () => {
        return useMutation({
            mutationFn: async (item: ISuspectProfileSchema) => {
                const { data } = await supabase
                    .from(tableName)
                    .insert([item])
                    .select()

                return data;
            },
            onMutate: (newItemInfo: ISuspectProfileSchema) => {
                this.queryClient.setQueryData([tableName], (prevItems: ISuspectProfileSchema[] | undefined) => {
                    const items = prevItems != undefined ? prevItems : []
                    return [...items, { ...newItemInfo },] as ISuspectProfileSchema[]
                }
                );
            },
            onSettled: (data, error) => {
                if (data) {
                    popupSuccess("Crop added successfully!");
                } else if (error) {
                    if (error instanceof Error) popupError(`Error: ${error.message}`);
                    else popupError(DEFAULT_ERROR_MESSAGE)
                }

                this.queryClient.invalidateQueries();
            },
        });
    }

    public getAllItems() {
        return useQuery<ISuspectProfileSchema[]>({
            queryKey: [tableName],
            queryFn: async () => {
                const { data } = await supabase
                    .from(tableName)
                    .select('*')

                return data as ISuspectProfileSchema[]
            },
            refetchOnWindowFocus: false,
        });
    }
}