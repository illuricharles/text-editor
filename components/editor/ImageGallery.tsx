"use client"
import { IoCheckmark, IoClose } from "react-icons/io5";
import TestUpload from "./TestUpload";
import { BiTrash } from "react-icons/bi";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

// Dynamically import FileUploader with SSR disabled

interface ImageGalleryProps {
    visible: boolean;
    onClickClose: (visible: boolean) => void;
    onClickSelect?: (item: UploadedImagesProps) => void
}

interface UploadedImagesProps {
    url: string,
    appUrl: string,
    key: string
}


export default function ImageGallery({ visible, onClickClose, onClickSelect }: ImageGalleryProps) {

    const [uploadedImages, setUploadedImages] = useState<UploadedImagesProps[]>([])

    if (!visible) return null;

    function handleShowImageGallery() {
        onClickClose(false);
    }

    function handleOnSelectImage(item: UploadedImagesProps) {
        if(onClickSelect) {
            onClickSelect(item)
            handleShowImageGallery()
        }
        
    }

    function onSuccessUploadImage(res: UploadedImagesProps) {
        console.log(res)
        setUploadedImages(function(prevState) {
            return [...prevState, {key: res.key, url: res.url, appUrl: res.appUrl}]
        })
        console.log(uploadedImages)
    }

    async function onClickDeleteImage(key:string) {
        console.log(key, process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
        
        const options = {
            method: 'POST',
            url: 'https://api.uploadthing.com/v6/deleteFiles',
            headers: {'Content-Type': 'application/json', 'X-Uploadthing-Api-Key': process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY},
            data: {fileKeys: [key]}
        };
        
        try {
            const { data } = await axios.request(options);
            console.log(data);
            const filteredImages = uploadedImages.filter(eachUploadedImage => eachUploadedImage.key !== key)
            setUploadedImages(filteredImages)
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <div className=" fixed inset-0 flex flex-col justify-center items-center bg-black h-screen z-50 bg-opacity-50 backdrop-blur-sm">
            <div className="relative w-4/6 h-5/6 bg-white rounded-lg">
                <div className="absolute right-4 top-2 z-50">
                    <button onClick={handleShowImageGallery}>
                        <IoClose size={25} />
                    </button>
                </div>
                <div className="mb-5">
                    <TestUpload onSuccessUploadImage ={onSuccessUploadImage}/>
                </div>
                <div className="grid md:grid-cols-7 grid-cols-4 gap-4 p-3">

                    {uploadedImages.map(eachImage => {
                        return (
                            <div key={eachImage.key} className="group relative w-full h-full">
                                <Image src={eachImage.appUrl} alt="" width={1000} height={1000} className="w-full aspect-square object-cover" />
                                <div className="absolute bottom-0 hidden group-hover:flex justify-center w-full">
                                    <button onClick={() => onClickDeleteImage(eachImage.key)} className="bg-red-900 text-white w-full flex justify-center">
                                        <BiTrash size={25}/>
                                    </button>
                                    <button  onClick={() =>handleOnSelectImage(eachImage)} className="bg-blue-600 text-white w-full flex justify-center">
                                        <IoCheckmark  size={25}/>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                    <div className="relative w-full h-full">
                        <Image src="/test.jpeg" alt="" width={1000} height={1000} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0  flex justify-center w-full">
                            <button className="bg-red-600 text-white w-full flex justify-center">
                                <BiTrash size={25}/>
                            </button>
                            <button  className="bg-blue-600 text-white w-full flex justify-center">
                                <IoCheckmark  size={25}/>
                            </button>
                        </div>
                    </div>

                    <div className="relative w-full h-full">
                        <Image src="/test.jpeg" alt="" width={1000} height={1000} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0  flex justify-center w-full">
                            <button className="bg-red-900 text-white w-full flex justify-center">
                                <BiTrash size={25}/>
                            </button>
                        </div>
                    </div>

                    <div className="relative w-full h-full">
                        <Image src="/test.jpeg" alt="" width={1000} height={1000} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0  flex justify-center w-full">
                            <button className="bg-red-900 text-white w-full flex justify-center">
                                <BiTrash size={25}/>
                            </button>
                        </div>
                    </div>

                </div>
                    

            </div>
        </div>
    );
}
