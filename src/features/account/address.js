import { useMutation } from "@tanstack/react-query";
import { addAddress, updateAddress } from "../../services/apiAddress";
export function useAddAddress(onSuccessCallback) {

    const { mutate: addingAddress, isPending, isSuccess } = useMutation({
        mutationFn: ({
            addressLine, country, postalCode,
            state, city, phone
        }) => addAddress({
            addressLine, country, postalCode,
            state, city, phone
        }),

        onSuccess: (address) => {
            console.log('Address added successfully:', address);
            if (onSuccessCallback) {
                onSuccessCallback(); // Call the callback to refetch addresses
            }
        },
        onError: (err) => {
            console.log(err);
        }
    });

    return { addingAddress, isPending, isSuccess };
}
export function useUpdateAddress(onSuccessCallback) {

    const { mutate: updatingAddress, isLoading, isSuccess: isUpdated } = useMutation({
        mutationFn: ({
            addressLine, country, postalCode,
            state, city, phone, id
        }) => updateAddress({
            addressLine, country, postalCode,
            state, city, phone, id
        }),

        onSuccess: (address) => {
            console.log('Address updated successfully:', address);

            if (onSuccessCallback) {
                onSuccessCallback(); // Call the callback to refetch addresses
            }
        },
        onError: (err) => {
            console.log(err);
        }
    });

    return { updatingAddress, isLoading, isUpdated };
}