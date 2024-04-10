import { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native';
import MainScreen from "../components/DisplayNews/MainScreen";
import NoRecord from "../components/NoRecord/NoRecord";
import Loader from "../components/Loader/Loader";

// import { newsData } from "../components/DisplayNews/news";
// const cards = newsData


export default function DisplayNews() {

    const route = useRoute();
    const { category } = route.params; 
    const [displayData, setDisplayData] = useState(null);

    function formatCategoryData(news, category) {
        const categoryArray = ['business', 'politics', 'sports', 'technology', 'world', 'market']
        if(category && categoryArray.includes(category)) {
            const filterData = news.filter((eachNews) => eachNews.category.toLowerCase() === category);
            setDisplayData(filterData)
        } else{
            setDisplayData(news)
        }
    }

    async function fetchNewsData() {
        try{
            // fetch from database
            // const response = await fetch( `https://www.instantupdates.in/api/fetchAll`);

            // fetch from trending topics
            const response = await fetch( `https://www.instantupdates.in/api/fetchTrending`);

            if(response.ok) {
                const res = await response.json();
                formatCategoryData(res, category.toLowerCase())
            }else{
                setDisplayData(null)
            }
        }catch(error) {
            setDisplayData(null)
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNewsData();
    },[category])

    return (
        displayData && displayData.length>0 ? <MainScreen cards={displayData}/>
        : displayData ? <NoRecord />
        : <Loader />
    )
}