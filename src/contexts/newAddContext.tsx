import { ReactNode, createContext, useContext, useState } from "react";

import { NewProductAddDTO } from "@dtos/AddsDTO";
import { ProductImage } from "@dtos/AddsDTO";

type NewAddContextDatProps = {
    newAdd: NewProductAddDTO,
    newAddImages: ProductImage[],
    setNewAdd: (newAddData: NewProductAddDTO) => void,
    setNewAddImages: (newProductImages: ProductImage[]) => void
}

type NewAddContextProviderProps = {
    children: ReactNode
}

const NewAddContext = createContext({} as NewAddContextDatProps);

export const NewAddContextProvider = ({ children }: NewAddContextProviderProps) => {
    const [newAdd, setNewAdd] = useState<NewProductAddDTO>({} as NewProductAddDTO);
    const [newAddImages, setNewAddImages] = useState<ProductImage[]>([]);

    return (
        <NewAddContext.Provider value = {{
            newAdd,
            newAddImages,
            setNewAdd,
            setNewAddImages
        }}>
            {children}
        </NewAddContext.Provider>
    )
}

export const useNewAdd = () => useContext(NewAddContext);