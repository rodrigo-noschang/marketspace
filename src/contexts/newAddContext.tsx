import { ReactNode, createContext, useContext, useState } from "react";

import { NewProductAddDTO } from "@dtos/AddsDTO";
import { NewProductImage } from "@dtos/AddsDTO";

type AddContextDatProps = {
    newAdd: NewProductAddDTO,
    newAddImages: NewProductImage[],
    setNewAdd: (newAddData: NewProductAddDTO) => void,
    setNewAddImages: (newProductImages: NewProductImage[]) => void,
    deleteAddImage: (imageUri: string) => void
}

type AddContextProviderProps = {
    children: ReactNode
}

const NewAddContext = createContext({} as AddContextDatProps);

export const NewAddContextProvider = ({ children }: AddContextProviderProps) => {
    const [newAdd, setNewAdd] = useState<NewProductAddDTO>({} as NewProductAddDTO);
    const [newAddImages, setNewAddImages] = useState<NewProductImage[]>([]);
    
    const deleteAddImage = (imageUri: string) => {
        const updatedPhotos = newAddImages.filter(photos => photos.uri !== imageUri);
        setNewAddImages(updatedPhotos);
    }

    return (
        <NewAddContext.Provider value = {{
            newAdd,
            newAddImages,
            setNewAdd,
            setNewAddImages,
            deleteAddImage
        }}>
            {children}
        </NewAddContext.Provider>
    )
}

export const useNewAdd = () => useContext(NewAddContext);