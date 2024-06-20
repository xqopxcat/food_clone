import React from 'react';
import { b64EncodeUnicode } from '../helpers';
import { Link } from "react-router-dom";

const ListRestaurant = ({ store }) => {
    const { title, image, meta, actionUrl } = store;
    const { text: titleText } = title;
    const { items: imageItem } = image;
    const imageSet = [...imageItem].reverse().map(({ url, width }) => {
        return (`${url} ${width}w`)
    }).join();
    
    return (
        <Link to={ actionUrl } >
            <div className="h-[148px] bg-[#F3F3F3]">
                <picture>
                    <source type="image/webp" srcSet={`https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=${b64EncodeUnicode(imageItem.filter(({ width }) => width === 550 )[0].url)}`} />
                    <img alt="" role="presentation" 
                        src="" 
                        srcSet={ imageSet }
                        sizes="100vw"
                        loading="lazy"
                        decoding="async"
                        className="object-cover w-full h-full rounded-xl"
                    />
                </picture>
            </div>
            <div className="mt-2">
                <div className="flex justify-between items-center gap-1">
                    <h3>{ titleText }</h3>
                    {
                        store.rating && (
                            <div className="flex justify-center items-center h-7 w-7 text-[12px] rounded-[50%] bg-[#E8E8E8]">
                                { store.rating.text }
                            </div>
                        )
                    }
                </div>
                <div className="flex justify-start items-center text-[14px] font-normal">
                    <span>
                        <img src="https://dkl8of78aprwd.cloudfront.net/uber_one@3x.png" alt width="14" height="1" />
                    </span>
                    <span>&nbsp;•&nbsp;</span>
                    <span>{ meta[1].text }</span>
                    <span>&nbsp;•&nbsp;</span>
                    <span className="text-[#5e5e5e]">{ meta[2].text }</span>
                </div>
            </div>
        </Link>
    );
};

export default ListRestaurant;