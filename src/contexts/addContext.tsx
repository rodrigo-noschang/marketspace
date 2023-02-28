import { ReactNode, createContext, useContext, useState } from "react";

import { NewProductAddDTO } from "@dtos/AddsDTO";
import { ProductImage } from "@dtos/AddsDTO";

type AddContextDatProps = {
    add: NewProductAddDTO,
    addImages: ProductImage[],
    setAdd: (newAddData: NewProductAddDTO) => void,
    setAddImages: (newProductImages: ProductImage[]) => void
}

type AddContextProviderProps = {
    children: ReactNode
}

const AddContext = createContext({} as AddContextDatProps);

export const NewAddContextProvider = ({ children }: AddContextProviderProps) => {
    const [add, setAdd] = useState<NewProductAddDTO>({} as NewProductAddDTO);
    const [addImages, setAddImages] = useState<ProductImage[]>([]);

    return (
        <AddContext.Provider value = {{
            add,
            addImages,
            setAdd,
            setAddImages
        }}>
            {children}
        </AddContext.Provider>
    )
}

export const useAdd = () => useContext(AddContext);