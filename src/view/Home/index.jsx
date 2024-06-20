import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import { AiOutlineTag } from 'react-icons/ai';
import { FaBagShopping, FaPersonWalkingLuggage, FaMedal, FaRegStar, FaCheck } from 'react-icons/fa6';
import {
    Dropdown,
    SearchInput,
    ListRestaurant,
    NavigationBar,
    SelectPanel,
    TagButton,
    Slider,
    Checkbox
} from '../../components/';
import { FOOD_TYPE } from '../../constants';
import { FEED } from '../../constants/feed';
import { DELIVERY_FEE_ITEM, FOOD_PROHIBITIONS_ITEMS, PRICE_ITEMS, RANKING_ITEM } from '../../constants/filter';

export const DELIVERY_TYPE = [
    {
        icon: <FaBagShopping className="w-6 h-6"/>,
        title: '外送',
        value: 'DELIVERY'
    },
    {
        icon: <FaPersonWalkingLuggage className="w-6 h-6"/>,
        title: '外帶',
        value: 'PICKUP'
    }
];

const DELIVERY_FEE_TYPE = {
    [0]: {
        title: '低於 NT$20 外送費',
        value: 20,
    },
    [1]: {
        title: '低於 NT$30 外送費',
        value: 30,
    },
    [2]: {
        title: '低於 NT$60 外送費',
        value: 60,
    },
    [3]: {
        title: '任何金額',
        value: 999,
    },
};

const RANKING = {
    [0]: {
        title: '超過 3',
        value: 3,
    },
    [1]: {
        title: '超過 3.5',
        value: 3.5,
    },
    [2]: {
        title: '超過 4',
        value: 4,
    },
    [3]: {
        title: '超過 4.5',
        value: 4.5,
    },
    [4]: {
        title: '僅限 5',
        value: 5,
    },
};

const defaultPayload = {
    discountMethod: false,
    deliveryFee: 2,
    ranking: 4,
    near30mins: false,
    highestRanking: false,
    price: [],
    prohibitions: [],
    category: {
        title: '分類',
        value: 0,
    }
};

const Home = () => {
    const [delivery, setDelivery] = useState(FEED.diningModes.filter(({ isSelected }) => isSelected)[0].title);
    const [type, setType] = useState(FEED.diningModes.filter(({ isSelected }) => isSelected)[0].title);
    const [delieveryFeeType, setDelieveryFeeType] = useState('外送費');
    const [rankType, setRankType] = useState('評分');
    const [priceType, setPriceType] = useState('價格');
    const [queryPayload, setQueryPayload] = useState(defaultPayload);
    const feedItems = FEED.feedItems.filter(({ type }) => type === 'REGULAR_STORE');
    console.log(feedItems);
    // useEffect(() => {
    //     console.log(feed);
    // }, []);
    
    const handleTypeClick = () => {
        setType(delivery);
    };

    const handleQueryPayload = type => value => {
        switch (type) {
            case 'DISCOUNT_METHOD':
                setQueryPayload(prevPayload => ({
                    ...prevPayload,
                    discountMethod: !prevPayload.discountMethod
                }));
            break;
            case 'FEE':
                setQueryPayload(prevPayload => ({
                    ...prevPayload,
                    deliveryFee: value
                }));
            break;
            case 'NEAR_30_MINS':
                setQueryPayload(prevPayload => ({
                    ...prevPayload,
                    near30mins: !prevPayload.near30mins
                }));
            break;
            case 'HIGHEST_RANKING':
                setQueryPayload(prevPayload => ({
                    ...prevPayload,
                    highestRanking: !prevPayload.highestRanking
                }));
            break;
            case 'RANKING':
                setQueryPayload(prevPayload => ({
                    ...prevPayload,
                    ranking: value
                }));
            break;
            case 'PRICE':
                const { price } = queryPayload;
                const checkPriceItem = price.find(item => item === value);
                if (!checkPriceItem) {
                    const addPriceItem = [...price, value];
                    setQueryPayload(prevPayload => ({
                        ...prevPayload,
                        price: addPriceItem.sort()
                    }));
                }
                else {
                    const newPriceItem = price.filter((item) => item !== value);
                    setQueryPayload(prevPayload => ({
                        ...prevPayload,
                        price: newPriceItem
                    }));
                }
            break;
            default: 
        }
    }
    
    const handleButtonClick = type => {
        const { deliveryFee, ranking, price } = queryPayload;
        switch (type) {
            case 'FEE':
                setDelieveryFeeType(DELIVERY_FEE_TYPE[deliveryFee].title);
                break;
            case 'RANKING':
                setRankType(RANKING[ranking].title);
                break;
            case 'PRICE':
                setPriceType(price.join(','))
                break;
            default: 
        }
    }
    
    const handleReset = () => {
        setQueryPayload(defaultPayload);
        setDelieveryFeeType('外送費');
        setRankType('評分');
        setPriceType('價格');
    }
    
    return (
        <>
            <div>
                <div className="flex justify-between pt-[6px] pb-2">
                    <div className="px-4">
                        <div className="text-[#5e5e5e] text-[12px] leading-4">立即外送</div>
                        <div className="flex items-center">
                            <span className="font-medium text-[14px]">中山路x號</span>
                            <FiChevronDown className="ml-2 mr-4" />
                        </div>
                    </div>
                    <Dropdown 
                        title="餐點選項"
                        onClick={ handleTypeClick }
                        selectValue={ delivery }
                        selectType={ type }
                        extendClass="mx-4"
                    >
                        <div className="text-sm text-black" aria-labelledby="dropdownDefaultButton">
                        {
                            FEED.diningModes.map(({ mode, title }, index) => {
                                return (
                                    <div key={ mode } className="flex items-center h-[72px]" onClick={ () => setDelivery(title) }>
                                        <div className="flex justify-center items-center w-16 h-16">
                                            { mode === "DELIVERY" ? <FaBagShopping className="w-6 h-6"/> : <FaPersonWalkingLuggage className="w-6 h-6"/> }
                                        </div>
                                        <div className={`flex items-center flex-grow justify-between h-full border-b-2 border-[#f3f3f3] ${index === DELIVERY_TYPE.length - 1 ? 'border-none' : ''}`}>
                                            <div className="leading-5 text-[16px] font-medium">{ title }</div>
                                            { delivery === title && <FaCheck className=" w-6 h-6 text-[#0d8345] mr-4"/>}
                                        </div>
                                    </div>
                                )
                            })
                        }   
                        </div>
                    </Dropdown>
                </div>
                <div className="py-1 mx-4">
                    <button className="w-full rounded-[500px] bg-[#F3F3F3] h-12">
                        <div className="flex items-center">
                            <FiSearch className="mx-4"/>
                            <span>搜尋 Uber Eats</span>
                        </div>
                    </button>
                </div>
                <NavigationBar items={ FOOD_TYPE } />
                <div className="pt-2 pl-1 pr-2">
                    <NavigationBar>
                        <TagButton
                            active={ queryPayload.discountMethod }
                            value="優惠方案" icon={<AiOutlineTag />}
                            onClick={ handleQueryPayload('DISCOUNT_METHOD') }
                            extendClass="ml-1 mr-2"
                        />
                        <SelectPanel
                            title="外送費"
                            selectType={delieveryFeeType}
                            onClick={ () => handleButtonClick('FEE') }
                            onReset={ handleReset }
                            extendClass={ `ml-1 mr-2 ${delieveryFeeType !== '外送費' ? 'bg-black text-white' : ''}` }
                        >
                            <div className="px-4 pt-4 pb-6">
                                { DELIVERY_FEE_TYPE[queryPayload.deliveryFee].title }
                            </div>
                            <div className="p-4">
                                <Slider 
                                    items={ DELIVERY_FEE_ITEM } 
                                    value={queryPayload.deliveryFee}
                                    onChange={ handleQueryPayload('FEE') }
                                />
                            </div>
                        </SelectPanel>
                        <TagButton
                            active={ queryPayload.near30mins }
                            value="不到三十分鐘"
                            onClick={ handleQueryPayload('NEAR_30_MINS') }
                            extendClass="ml-1 mr-2"
                        />
                        <TagButton
                            active={ queryPayload.highestRanking }
                            value="評分最高"
                            icon={<FaMedal />}
                            onClick={ handleQueryPayload('HIGHEST_RANKING') }
                            extendClass="ml-1 mr-2"
                        />
                        <SelectPanel
                            icon={<FaRegStar />}
                            title="評分"
                            selectType={rankType}
                            onClick={ () => handleButtonClick('RANKING') }
                            onReset={ handleReset }
                            extendClass={`ml-1 mr-2 ${rankType !== '評分' ? 'bg-black text-white' : ''} `}
                        >
                            <div className="px-4 pt-4 pb-6">
                                { RANKING[queryPayload.ranking].title }
                            </div>
                            <div className="p-4">
                                <Slider
                                    direction="left"
                                    items={ RANKING_ITEM } 
                                    value={queryPayload.ranking}
                                    onChange={ handleQueryPayload('RANKING') }
                                />
                            </div>
                        </SelectPanel>
                        <SelectPanel
                            title="價格"
                            selectType={priceType}
                            onClick={ () => handleButtonClick('PRICE') }
                            onReset={ handleReset }
                            extendClass={ `ml-1 mr-2 ${priceType !== '價格' ? 'bg-black text-white' : ''}` }
                        >
                            <div className="flex w-full gap-3 p-4">
                                {
                                    PRICE_ITEMS.map((item) => {
                                        return (
                                            <TagButton 
                                                active={ queryPayload.price.includes(item) }
                                                value={ item }
                                                onClick={ () => handleQueryPayload('PRICE')(item) }
                                                extendClass="grow px-3 py-[10px] justify-center h-9"
                                            />
                                        );
                                    })
                                }
                            </div>
                        </SelectPanel>
                        {/* <SelectPanel
                            title="飲食限制"
                            selectType={priceType}
                            onClick={ () => handleButtonClick('PRICE') }
                            onReset={ handleReset }
                            // extendClass={ priceType !== '價格' ? 'bg-black text-white' : ''}
                        >
                            <div className="w-full px-5">
                                {
                                    FOOD_PROHIBITIONS_ITEMS.map(({ title, value }, index) => {
                                        return (
                                            <div className={`flex items-center flex-grow justify-between h-16 border-b-2 border-[#f3f3f3] ${index === FOOD_PROHIBITIONS_ITEMS.length - 1 ? 'border-none' : ''}`}>
                                                <Checkbox name={ title } value={ value } />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </SelectPanel> */}
                    </NavigationBar>
                </div>
            </div>
            <div className="flex flex-col gap-6 p-4">
                {
                    feedItems.map(({ store }, index) => {
                        console.log(store.rating, index);
                        return (
                            <ListRestaurant
                                store={ store }
                            />
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home;