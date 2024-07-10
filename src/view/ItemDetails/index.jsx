import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaRegThumbsUp, FaXmark } from 'react-icons/fa6';
import { menuItems } from '../../constants/menuItem';
import { useStateContext } from '../../context/StateContext';
import { Checkbox, ItemTag, NavigationBar, RadioCard, QuantityCounter, QuantitySelector, Button } from '../../components';
import useLocalStorage from '../../hooks/useLocalStorage';

const ItemDetails = () => {
    const { name, id, itemId } = useParams();
    const [selected, setSelected] = useState();
    const navigate = useNavigate();
    const [orderStorage, setOrderStorage] = useLocalStorage('order');
    const [storeStorage, setStoreStorage] = useLocalStorage('store');
    const [storeIDstorage, setStoreIDstorage] = useLocalStorage('storeID');
    const [quantitiesStorage, setQuantitiesStorage] = useLocalStorage('quantities');
    const [priceStorage, setPriceStorage] = useLocalStorage('price');
    const {
        cartItems,
        totalPrice,
        totalQuantities,
        toggleCartItemQuantity,
        onAdditionalAdd,
        onEmpty,
    } = useStateContext();
    const filterItems = menuItems.filter(({ uuid }) => uuid === itemId);
    const { 
        title,
        imageUrl,
        price,
        itemDescription,
        endorsementTags,
        customizationsList
    } = filterItems[0] || '';
    
    const preselected = filterItems[0]?.productDetailsItems?.filter(({ type }) => type === 'PRESELECTED_CUSTOMIZATIONS');
    const filterCartItems = cartItems.filter(({ uuid }) => uuid === itemId);
    
    const handleOrder = () => {
        const order = JSON.parse(orderStorage);
        let updatedOrder = cartItems;
        if (order) {
            console.log('test', order)
            updatedOrder = [...order, cartItems[0]]
        }
        setStoreStorage(name);
        setStoreIDstorage(id);
        setQuantitiesStorage(parseInt(quantitiesStorage || 0) + parseInt(totalQuantities));
        setPriceStorage(parseInt(priceStorage || 0) + parseInt(totalPrice));
        setOrderStorage(JSON.stringify(updatedOrder));
        onEmpty();
        navigate(`/store/${name}/${id}`);
    }
    
    return (
        <div className="absolute top-0 w-full">
            <Link to={`/store/${name}/${id}`} className="absolute top-2 left-2 p-4 bg-[#f3f3f3] rounded-full">
                <FaXmark />
            </Link>
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
                                                                <QuantityCounter
                                                                    value={ defaultQuantity }
                                                                    max={ maxItem }
                                                                    onChange={ (qty) => onAdditionalAdd(itemId, options[index], qty) }
                                                                />
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
                <QuantitySelector value={ filterCartItems?.[0]?.quantity } max={ 10 } onChange={ (value) => { toggleCartItemQuantity(itemId, value) } }/>
            </div>
            <div className="w-full border-t-[1px] fixed bottom-0 h-[88px] p-4 bg-white">
                <Button onClick={ handleOrder } extendClass="w-full" title={`新增 ${totalQuantities} 項商品至訂單 • $${totalPrice / 100}`}/>
            </div>
        </div>
    )
}

export default ItemDetails;