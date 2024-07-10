import React from 'react'
import { FaXmark, FaPlus } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import cart from '../../assets/cart.svg';
import { Button, CartQuantity, TagButton } from '../../components';
import useLocalStorage from "../../hooks/useLocalStorage";
import { useStateContext } from "../../context/StateContext";

const Cart = () => {
    const navigate = useNavigate();
    const [orderStorage, setOrderStorage] = useLocalStorage('order');
    const [storeStorage, setStoreStorage] = useLocalStorage('store');
    const [storeIDstorage, setStoreIDstorage] = useLocalStorage('storeID');
    const [quantitiesStorage, setQuantitiesStorage] = useLocalStorage('quantities');
    const [priceStorage, setPriceStorage] = useLocalStorage('price');
    const order = JSON.parse(orderStorage);
    
    if (order?.length === 0 || !order) return (
        <>
            <div className="absolute top-0 w-full h-[calc(-124px+100vh)] bg-white py-3 px-4">
                <Link to="/" className="fixed z-50 top-2 left-2 p-4 bg-[#f3f3f3] rounded-full">
                    <FaXmark className="w-5 h-5" />
                </Link>
                <div className="h-full flex flex-col justify-center items-center">
                    <img src={ cart } alt="cart" />
                    <span className="text-[20px] leading-7 font-bold mb-3">加入選購商品即可開啟購物車</span>
                    <span className="text-[16px] text-center text-[#4B4B4B] leading-6 mb-9 max-w-[80%]">選購餐廳或商店中的商品後，您的購物車即會顯示在此</span>
                    <Button
                    title="開始選購"
                    onClick={ () => navigate('/') }
                    extendClass="h-[36px]"
                    style={{ fontSize: '14px', lineHeight: '16px', padding: '0 12px', borderRadius: '500px' }}/>
                </div>
            </div>
        </>
    )
    
    const handleOrder = (id, value, additionalSum = 0) => {
        const selectOrder = order.filter(({ uuid }) => uuid === id);
        if (value === 'inc') {
            selectOrder[0].quantity += 1
            const item = order.map((el) => {
                if (el.uuid === id) {
                    return selectOrder[0];
                }
                return el;
            });
            setOrderStorage(JSON.stringify(item))
            const updatedPrice = parseInt(priceStorage) + parseInt(selectOrder[0].price) + additionalSum;
            setPriceStorage(updatedPrice);
        }
        else if (value === 'dec') {
            console.log(selectOrder);
            if (selectOrder[0].quantity > 1) {
                selectOrder[0].quantity -= 1
                const item = order.map((el) => {
                    if (el.uuid === id) {
                        return selectOrder[0];
                    }
                    return el;
                });
                setOrderStorage(JSON.stringify(item));
                const updatedPrice = parseInt(priceStorage) - parseInt(selectOrder[0].price) - additionalSum;
                setPriceStorage(updatedPrice);
            }
            else {
                const item = order.filter(({ uuid }) => uuid !== id);
                setOrderStorage(JSON.stringify(item));
                const updatedPrice = item.map(({ price, quantity }) => price * quantity)[0] || 0;
                setPriceStorage(updatedPrice);
                setQuantitiesStorage(item.length);
            }
        }
    }
    
    return (
        <>
            <div className="absolute top-0 w-full h-full bg-white py-3 px-4">
                <Link to="/" className="fixed z-50 top-2 left-2 p-4 bg-[#f3f3f3] rounded-full">
                    <FaXmark className="w-5 h-5" />
                </Link>
                <div className="flex flex-col w-full gap-4 mt-14">
                    <Link className="text-[24px] font-bold leading-8" to={`/store/${storeStorage}/${storeIDstorage}`} >
                        { storeStorage }
                    </Link>
                    {
                         order.map(({uuid, title, imageUrl, price, quantity, additionalItem }) => {
                            const additionalPrice = additionalItem ? additionalItem.map(({ price }) => price) : [];
                            const additionalSum = additionalPrice.reduce((partialSum, a) => partialSum + a, 0);
                            return (
                                <div onClick={ () => {} } className="flex items-center justify-between gap-4 whitespace-nowrap">
                                    <div className="flex items-center my-5">
                                        <img
                                            alt={ title }
                                            src={ imageUrl }
                                            aria-hidden="true"
                                            loading="lazy"
                                            decoding="async"
                                            className="h-full min-w-[72px] max-w-[72px] max-h-[72px] min-h-[72px] object-cover rounded-[8px]"
                                        />
                                        <div className="pt-1 ml-[16px]">
                                            <div className="text-[16px] leading-5">
                                                <span>{ title }</span>
                                            </div>
                                            <p className="pt-[2px] leading-5 text-[14px] text-[#757575] mb-2 font-normal">
                                                {
                                                    additionalItem && additionalItem?.map(({ title, price                                                }) => {
                                                        return (
                                                            <span className="whitespace-pre-wrap">{`${title} ($${price / 100}) `}</span>
                                                        )
                                                    })
                                                }
                                            </p>
                                            <div className="pt-[2px] flex items-center justify-start leading-5 text-[14px] text-[#757575] font-normal">
                                                <span>{`$${(additionalSum + price) / 100}`}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <CartQuantity value={ quantity } onChange={ (value) => handleOrder(uuid, value, additionalSum) } />
                                </div>
                            )
                         })
                    }
                </div>
                <div className="w-full flex justify-end">
                    <TagButton
                        icon={<FaPlus />}
                        value="新增商品"
                        onClick={ () => navigate(`/store/${storeStorage}/${storeIDstorage}`) }
                    />
                </div>
                <hr className="h-1 mt-4 mx-[-16px] bg-[#f3f3f3]" />
                <div className="flex my-4 justify-between text-[18px] font-medium leading-6">
                    <span>小計</span>
                    <span>{`$${ priceStorage / 100 }`}</span>
                </div>
            </div>
            <div className="w-full border-t-[1px] fixed bottom-0 h-[88px] p-4 bg-white">
                <Button onClick={ () => {} } extendClass="w-full" title="結帳"/>
            </div>
        </>
    )
}

export default Cart;