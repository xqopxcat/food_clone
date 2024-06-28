import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegThumbsUp } from 'react-icons/fa6';
import { menuItems } from '../../constants/menuItem';
import { Checkbox, ItemTag, NavigationBar, RadioCard, QuantityCounter, QuantitySelector, Button } from '../../components';

const ItemDetails = () => {
    const { itemId } = useParams();
    const [selected, setSelected] = useState();
    const filterItems = menuItems.filter(({ uuid }) => uuid === itemId);
    console.log(filterItems);
    const { 
        title,
        imageUrl,
        price,
        itemDescription,
        endorsementTags,
        customizationsList
    } = filterItems[0] || '';
    
    const preselected = filterItems[0]?.productDetailsItems?.filter(({ type }) => type === 'PRESELECTED_CUSTOMIZATIONS');
    console.log(preselected);
    
    return (
        <div className="absolute top-0 w-full">
            <img 
                src={ imageUrl } 
                alt={ itemId }
                className="w-full h-[15vh] min-h-[233px] object-cover"
            />
            <div className="pt-4 px-4">
                <h1 className="font-bold text-[24px] leading-8">{ title }</h1>
                <div>
                    <span className="leading-6 text-[20px] text-[#5e5e5e] whitespace-pre-wrap">
                        { `$${price / 100}` }
                    </span>
                </div>
                <div className="mt-2 mb-[10px]">
                    <div className="leading-5 text-[14px] whitespace-pre-line ">
                        { itemDescription }
                    </div>
                </div>
                <div className="flex gap-2">
                    {
                        endorsementTags?.map(({ text, leadingIcon }) => {
                            return (
                                <ItemTag icon={ leadingIcon && <FaRegThumbsUp />} text={ text } />
                            )
                        })
                    }
                </div>
            </div>
            <div className="ml-2">
                {
                    preselected.map(({ payload }) => {
                        const { preselectedCustomizationsPayload } = payload;
                        return (
                            <div>
                                <h3 className="mt-4 ml-2 mb-3 leading-5 text-[16px] font-medium">{ preselectedCustomizationsPayload.title.richTextElements[0].text.text.text }</h3>
                                <NavigationBar>
                                    {
                                        preselectedCustomizationsPayload.preselectedCustomizationSelection.map(({ item, title, description }) => {
                                            const { richTextElements } = title;
                                            const { customizationV2s } = item;
                                            const { richTextElements: desriptionElements } = description;
                                            return (
                                                <RadioCard
                                                    id={ customizationV2s[0].uuid }
                                                    name={ richTextElements[0].text.text.text }
                                                    value={ customizationV2s[0].uuid }
                                                    description={ desriptionElements[0].text.text.text }
                                                    checked={ selected === customizationV2s[0].uuid }
                                                    onChange={ setSelected }
                                                />
                                            )
                                        })
                                    }
                                </NavigationBar>
                                <hr className="h-2 mt-4 ml-[-8px] bg-[#f3f3f3]" />
                            </div>
                        )
                    })
                }
            </div>
            <div className="mx-4">
                {
                    customizationsList.map(({ title, maxPermitted, options }, index) => {
                        return (
                            <div>
                                <div>
                                    <div className="mt-4 leading-7 text-[20px] font-bold">{ title }</div>
                                    <span className="text-[14px] leading-5 text-[#4b4b4b]">{`最多可選擇 ${ maxPermitted } 個項目`}</span>
                                </div>
                                <div className="my-4">
                                    {
                                        options.map(({ title, price, maxPermitted: maxItem, defaultQuantity, subtitleV2 }, index) => {
                                            return (
                                                <div>
                                                    <div className="flex justify-between">
                                                        <div className="flex flex-col">
                                                            <span className="text-[14px] font-medium leading-4">{ title }</span>
                                                            <span className="text-[14px] font-normal leading-5 whitespace-nowrap">{ `+$${ price / 100 }` }</span>
                                                            { subtitleV2 && <span className="text-[14px] font-normal leading-5 text-[#0E8345]">{ subtitleV2.richTextElements[0].text.text.text }</span>}
                                                        </div>
                                                        {
                                                            maxPermitted === 1 ? (
                                                                <Checkbox name={ title } />
                                                            ) : (
                                                                <QuantityCounter value={ defaultQuantity } max={ maxItem } />
                                                            )
                                                        }
                                                    </div>
                                                    {
                                                        index !== options.length - 1 && (
                                                            <hr className="h-[1px] my-4 bg-[#f3f3f3]" />
                                                        )
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    index !== customizationsList.length - 1 && (
                                        <hr className="w-screen h-2 mt-4 ml-[-16px] bg-[#f3f3f3]" />
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="mx-3 mt-6 mb-[112px]">
                <QuantitySelector value={ 1 } max={ 10 } />
            </div>
            <div className="w-full border-t-[1px] fixed bottom-0 h-[88px] p-4">
                <Button extendClass="w-full" title="新增 1 項商品至訂單 • $155"/>
            </div>
        </div>
    )
}

export default ItemDetails;