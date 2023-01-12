// @ts-nocheck

import Image from "next/image"

export interface ConceptProps {
    /**
     * src of image to load
     */
    imageSRC: string 
    /**
     * string of description to load
     */
    description?: string
    /**
     * y + x-axis positioning of image in concept map
     */
    imagePosition?: number  
}


export default function Concept({
    imageSRC,
    description,
    imagePosition
}: ConceptProps){

    return (
        <div>
            {(() => {
                if (imagePosition == 0) {
                    return (
                        <div className=" flex flex-row flex-wrap justify-center h-fit">                   
                            <div className="w-[90vw] sm:w-[400px] relative">
                                <Image
                                    src={imageSRC}
                                    fill
                                    objectFit={"contain"}                     

                                />  
                            </div>                                                        
                            <div className="h-full pb-4 sm:pb-8 pt-4 w-[90vw] sm:w-[400px]">
                                {description}
                            </div>                                                 
                        </div>                           
                    )
                } else if (imagePosition == 1) {
                    return (
                        <div className=" flex flex-row flex-wrap justify-center h-fit">                   
                            <div className="w-[90vw] sm:w-[400px] relative">
                                <Image
                                    src={imageSRC}
                                    fill
                                    objectFit={"contain"}                     

                                />  
                            </div>                                                        
                            <div className="h-full pb-4 sm:pb-8 pt-4 w-[90vw] sm:w-[400px]">
                                {description}
                            </div>                                                 
                        </div>                               
                    )                    
                } else if (imagePosition == 2) {
                    return (
                        <div className=" flex flex-row flex-wrap justify-center h-fit">                   
                            <div className="w-[90vw] sm:w-[400px] relative">
                                <Image
                                    src={imageSRC}
                                    fill
                                    objectFit={"contain"}                     

                                />  
                            </div>                                                        
                            <div className="h-full pb-4 sm:pb-8 pt-4 w-[90vw] sm:w-[400px]">
                                {description}
                            </div>                                                 
                        </div>                               
                    )                    
                } else {
                    return (
                        <div className=" flex flex-row flex-wrap justify-center h-fit">                   
                            <div className="w-[90vw] sm:w-[400px] relative">
                                <Image
                                    src={imageSRC}
                                    fill
                                    objectFit={"contain"}                     

                                />  
                            </div>                                                        
                            <div className="h-full pb-4 sm:pb-8 pt-4 w-[90vw] sm:w-[400px]">
                                {description}
                            </div>                                                 
                        </div>                               
                    )                             
                }
        })()}
    </div>
    )
}