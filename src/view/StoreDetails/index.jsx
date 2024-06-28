import React from 'react';
import { useParams } from 'react-router-dom';
import { FaRegStar } from 'react-icons/fa6';
import { BsPersonPlusFill } from "react-icons/bs";
import { details } from '../../constants/details';
import { NavigationBar, HorizontalGridItem, VerticalGridItem, TabSwitch, TagButton } from "../../components";
import { DELIVERY_TYPE } from "../Home";


const StoreDetails = () => {
    const { name, id } = useParams();
    const filterDetails = details.filter(({ slug }) => slug === name)[0] || details[0];
    console.log(filterDetails);
    const { 
        heroImageUrls,
        catalogSectionsMap,
        sections,
        rating,
        title,
        fareBadge,
        eatsPassExclusionBadge,
        distanceBadge,
        etaRange,
    } = filterDetails;
    const imageSet = [...heroImageUrls].map(({ url, width }) => {
        return (`${url} ${width}w`)
    }).join();
    const sectionsMap = catalogSectionsMap[sections[0].uuid]
    const horizontalGrid = sectionsMap.filter(({ type }) => type === 'HORIZONTAL_GRID');
    const verticalGrid = sectionsMap.filter(({ type }) => type === 'VERTICAL_GRID');

    return (
        <div>
            <img 
                srcSet={ imageSet } 
                alt={ name }
                className="w-full h-[15vh] min-h-[115px] object-cover"
            />
            <h1 className="flex items-center justify-center pt-4 px-4 text-[24px] font-bold">
                { title }
            </h1>
            <div className="flex items-center justify-center text-[14px]">
                <span className="leading-4">{ rating.ratingValue }</span>
                <FaRegStar className="w-3 h-3 mx-1"/>
                <div className="flex items-center justify-center leading-5 text-[#5E5E5E]">
                    <span>{` (${rating.reviewCount}) `}</span>
                    <span>&nbsp;•&nbsp;</span>
                    <span>{ fareBadge.text }</span>
                    <span>&nbsp;•&nbsp;</span>
                    <div
                        dangerouslySetInnerHTML={{__html: eatsPassExclusionBadge.textFormat }}
                    ></div>
                    <span>Uber One</span>
                    <span>&nbsp;•&nbsp;</span>
                    <span>{ distanceBadge.text }</span>
                </div>
            </div>
            <div className=" px-4">
                <div className="flex mt-4 justify-between items-center">
                    <TabSwitch items={ DELIVERY_TYPE } />
                    <TagButton
                        icon={<BsPersonPlusFill />}
                        value="團購訂單"
                    />
                </div>
                <div className="w-full flex items-center justify-evenly text-center border border-[#F3F3F3] rounded-lg py-3 mt-3">
                    <div className="text-[12px]">
                        <p className="font-medium leading-4">
                            { fareBadge.text }
                        </p>
                        <p className="font-normal leading-5 text-[#5E5E5E]">
                            價格與費用
                        </p>
                    </div>
                    <div className="h-6 border"></div>
                    <div className="text-[12px]">
                        <p className="font-medium leading-4">
                            { etaRange.text }
                        </p>
                        <p className="font-normal leading-5 text-[#5E5E5E]">
                            外送時間
                        </p>
                    </div>
                </div>
            </div>
            {
                horizontalGrid.map(({ payload }) => {
                    const { standardItemsPayload } = payload;
                    return (
                        <div className="pl-2">
                            <h3 className="mt-4 mb-3 pl-2 leading-7 text-[20px] font-bold">{ standardItemsPayload.title.text }</h3>
                            <NavigationBar>
                                {
                                    standardItemsPayload.catalogItems.map(({ title, price, imageUrl, labelPrimary }) => {
                                        const rating = labelPrimary.accessibilityText.split(', ')[1];
                                        return (
                                            <HorizontalGridItem
                                                title={ title }
                                                price={ price }
                                                rating={ rating }
                                                imageUrl={ imageUrl }
                                            />
                                        );
                                    })
                                }
                                
                            </NavigationBar>
                            <div className="w-full border mt-4" />
                        </div>
                    )
                })
            }
            {
                verticalGrid.map(({ payload }) => {
                    const { standardItemsPayload } = payload;
                    return (
                        <div className="pl-2">
                            <h3 className="mt-4 mb-3 pl-2 leading-7 text-[20px] font-bold">{ standardItemsPayload.title.text }</h3>
                            {
                                standardItemsPayload.catalogItems.map(({ uuid, title, price, imageUrl, labelPrimary, itemDescription }) => {
                                    const rating = labelPrimary.accessibilityText.split(', ')[1];
                                    return (
                                        <>
                                            <VerticalGridItem
                                                title={ title }
                                                price={ price }
                                                rating={ rating }
                                                imageUrl={ imageUrl }
                                                description={ itemDescription }
                                                url={ `${uuid}` }
                                            />
                                            <div className="w-full border px-2 mb-3" />
                                        </>
                                    );
                                })
                            }
                        </div>
                    )
                })
            }
            
        </div>
    );
};

export default StoreDetails;