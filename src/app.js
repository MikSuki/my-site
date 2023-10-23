import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { Navbar } from './navbar';
import { ContextContainer } from './context';

const DATA_PATH = './data/';
const MAIN_FILE = 'mySite.json';

const useFetch = url => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async() => {
        const response = await fetch(url);
        const portfolioData = await response.json();
        for (let key in portfolioData) {
            const response = await fetch(DATA_PATH + portfolioData[key]['fileName']);
            const eachData = await response.text();
            portfolioData[key]['introData'] = eachData;
        }
        setPortfolioData(portfolioData);
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);
    
    return { portfolioData, loading };
};

const App = () => {
    const [imgGroupPage, setImgGroupPage] = useState(0);
    const [totalImgGroupPage, setTotalImgGroupPage] = useState(0);
    const [contextPage, setContextPage] = useState(0);
    const ref_navbar = useRef(null);
    const ref_totalImgGroupPage = useRef(totalImgGroupPage);
    const { portfolioData, } = useFetch(DATA_PATH + MAIN_FILE);

    useEffect(() => {
        console.log('portfolio data change')
        console.log(portfolioData)
        console.log(DATA_PATH + MAIN_FILE)
        console.log(MAIN_FILE)
        if (portfolioData !== null) {
            const period = 10000;
            const totalPage = Object.keys(portfolioData).length;
            setTotalImgGroupPage(totalPage);

            const timerID = setInterval(() => {
                chgImgGroupPage();
            }, period);
            return () => {
                clearInterval(timerID);
                console.log('clear Interval')
            }
        }
    }, [portfolioData]);

    useEffect(() => {
        ref_totalImgGroupPage.current = totalImgGroupPage
    }, [totalImgGroupPage])

    const handleNavbarClose = () => {
    const element = ref_navbar.current;
        element.closeNavbar();
    }

    const handleNavBtnClick = val => {
        if (contextPage !== val)
            setContextPage(val);
    }

    const chgImgGroupPage = (page = -1) => {
        if (page === -1) {
            setImgGroupPage(imgGroupPage => {
                if (imgGroupPage + 1 >= ref_totalImgGroupPage.current)
                    return 0;
                return imgGroupPage + 1;
            });
        } else {
            setImgGroupPage(page);
        }
    };

    // 0-> home
    // other-> detail
    const chgContextPage = contextPage => {
        if (contextPage === 0) {
            handleNavbarClose();
            chgImgGroupPage(0);
        }
        setContextPage(contextPage);
    }

    return ( <>
        <Navbar 
            ref = { ref_navbar }
            data = { portfolioData }
            handleNavBtnClick = { handleNavBtnClick }
            chgContextPage = { chgContextPage }
        /> 
        <ContextContainer 
            imgGroupPage = { imgGroupPage }
            contextPage = { contextPage }
            data = { portfolioData }
            chgContextPage = { chgContextPage }
            handleNavbarClose = { handleNavbarClose }
            chgImgGroupPage = { chgImgGroupPage }/> 
        </>
    );
}

export { App };