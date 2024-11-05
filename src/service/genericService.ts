import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DEFAULT_ERROR_MESSAGE } from "../values/defaultValues";
import supabase from "../supabase";
import { popupError, popupSuccess } from "../components/Popups";

export type Identifiable = {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
};

export default class GenericService<T extends Identifiable> {
    private queryClient = useQueryClient();
    private tableName: string;
    private queryKey: string;

    constructor(tableName: string, queryKey: string) {
        this.tableName = tableName;
        this.queryKey = queryKey;
    }

    public createItem = () => {
        return useMutation({
            mutationFn: async (item: T) => {
                const { id, ...itemWithoutId } = item;
                const { data } = await supabase
                    .from(this.tableName)
                    .insert([{ ...itemWithoutId, itemStatus: "ACTIVE" }])
                    .select()

                return data as T[]
            },
            onMutate: (newItemInfo: T) => {
                this.queryClient.setQueryData([this.queryKey], (prevItems: T[] | undefined) => {
                    const items = prevItems != undefined ? prevItems : []
                    return [...items, { ...newItemInfo },] as T[]
                }
                );
            },
            onSettled: (data, error) => {
                if (data) {
                    popupSuccess("Item added successfully!");
                } else if (error) {
                    if (error instanceof Error) popupError(`Error: ${error.message}`);
                    else popupError(DEFAULT_ERROR_MESSAGE)
                }

                this.queryClient.invalidateQueries([this.queryKey]);
            },
        });
    }

    public getAllItems(defaultItems?: T[]) {
        return useQuery<T[]>({
            queryKey: [this.queryKey],
            queryFn: async () => {
                const { data } = await supabase
                    .from(this.tableName)
                    .select('*')
                    .order('createdAt', { ascending: true });

                const finalData = defaultItems == undefined ? data : [...defaultItems, ...data as any[] | T[]];
                return finalData as T[];
            },
            refetchOnWindowFocus: false,
        });
    }

    public updateItem() {
        return useMutation({
            mutationFn: async (item: T) => {
                const { data, error } = await supabase
                    .from(this.tableName)
                    .update(item)
                    .eq('id', item.id || -1)
                    .select();

                if (error) console.log(error);
                return data as T[];
            },
            onMutate: (newItemInfo: T) => {
                this.queryClient.setQueryData([this.queryKey], (prevItems: T[] | undefined) => {
                    if (!prevItems) return [newItemInfo];
                    const newItems = prevItems.map((item) => item.id === newItemInfo.id ? { ...item, ...newItemInfo } : item);
                    return newItems
                }
                );
            },
            onSettled: (data, error) => {
                if (data) {
                    popupSuccess(`Item updated successfully!`);
                } else if (error) {
                    if (error instanceof Error) popupError(`Error: ${error.message}`);
                    else popupError(DEFAULT_ERROR_MESSAGE)
                }
                this.queryClient.invalidateQueries([this.queryKey]);
            },
        });
    }

    public deleteItem() {
        return useMutation({
            mutationFn: async (itemId: number) => {
                const { data, error } = await supabase
                    .from(this.tableName)
                    .delete()
                    .eq('id', itemId)
                    .select();

                if (error) console.log(error);
                return data as T[];
            },
            onMutate: async (itemId: number) => {
                const previousItems = this.queryClient.getQueryData<T[]>([this.queryKey]);
                this.queryClient.setQueryData<T[]>([this.queryKey], (prevItems) =>
                    prevItems?.filter(item => item.id !== itemId) || []
                );

                return { previousItems };
            },
            onSettled: (data, error) => {
                if (data) {
                    popupSuccess("Item deleted successfully!");
                } else if (error) {
                    if (error instanceof Error) popupError(`Error: ${error.message}`);
                    else popupError(DEFAULT_ERROR_MESSAGE)
                }

                this.queryClient.invalidateQueries([this.queryKey]);
            },
        });
    }
}