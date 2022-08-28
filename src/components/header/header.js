import React, { useState, useEffect } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { BsSuitHeart, BsSearch } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useUserContext } from "../../context/userContext";
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import i18next from 'i18next'
import cookies from 'js-cookie'

const languages = [

    {
        code: 'en',
        name: 'English',

    },
    {
        code: 'ar',
        name: 'العربية',
        dir: 'lrt',
    },

]
const Header = () => {
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    const { logoutUser, users, userInfo } = useUserContext();
    const [lang, setLang] = useState(false);

    const changelanguage = () => {
        setLang(!lang)
        if (lang) {
            i18next.changeLanguage('ar')
        }
        else {
            i18next.changeLanguage('en')
        }
    }
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'rtl'

    }, [currentLanguage]);
    const counter = useSelector((state) => { return state.fav.favProducts })
    const counterproduct = useSelector((state) => { return state.cart.cartProducts })

    return (
        <>
            {/* Topnav */}
            <div className='container-fluid navTop'>
                <div className='row'>
                    <ul style={{ fontSize: "1em" }}>
                        {users ? <li className='mx-3'>{t('welcome_message')} {users.displayName}</li> : <li><Link to="/createaccount" className="">Create An Account</Link></li>}
                        {users && <li><Link to="/myaccount/account" >{t('My_account')}</Link></li>}
                        {users && <li><Link to="/myaccount/changepassword" >{t('Change_Password')}</Link></li>}
                        {users ? <li onClick={() => logoutUser()} ><Link to="/signin">{t('SignOut')}</Link></li> : <li><Link to="/signin">Sign In</Link></li>}
                        <li><a href="https://eg.hm.com/en/store-finder">{t('Find_store')}</a></li>
                        <li onClick={() => changelanguage()} className='mx-3'>{t('language')}</li>

                        {/* {languages.map(({ code, name }) => (

                            <li onClick={() => { i18next.changeLanguage(code) }} className='mx-3'>{t('language')}</li>

                        ))} */}

                    </ul>
                </div>
            </div>
            {/*Search - Logo - Icons*/}
            <div className='container-fluid mt-4'>
                <div className='row d-flex justify-content-start search '>
                    <div className='col-5 d-flex justify-content-start mr-5'>
                        <div className=" mb-4 ">
                            <input type="text" placeholder="What are you looking for?" className="form-control search-underlined" />
                        </div>
                        <BsSearch style={{ width: "30px", height: "30px", marginLeft: "10px", color: "gray" }} />
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        <Link to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/640px-H%26M-Logo.svg.png" title='h&m egypt' height="50px;" /></Link>
                    </div>
                    <div className="col-5 d-flex justify-content-end">
                        <Link to="/fav" className='text-dark'><BsSuitHeart style={{ width: "40px", height: "40px", marginRight: "20px" }} />{counter.length ? <span class="count"> {counter.length}</span> : ""}</Link>
                        <Link to="/basket" className='text-dark'> <HiOutlineShoppingBag style={{ width: "40px", height: "40px" }} />{counterproduct.length ? <span class="countcart"> {counterproduct.length}</span> : ""}</Link>
                    </div>
                </div>
            </div>
            {/*List Ctegory*/}
            <div className='container d-flex justify-content-center '>
                <div className="btn-group m-2  ">
                    <Link to="/men">
                        <button className="rounded-pill bg-transparent text-center border border-white" >
                            Men
                        </button>
                    </Link>
                </div>

                <div className="btn-group m-2  ">
                    <Link to="/women">
                        <button className="rounded-pill bg-transparent text-center border border-white" >
                            Women
                        </button>
                    </Link>

                </div>

                <div className="btn-group m-2  ">
                    <Link to="/kids">
                        <button className="rounded-pill bg-transparent text-center border border-white" >
                            Kids
                        </button>
                    </Link>

                </div>

            </div>
            {/*Company Services*/}
            <div className='container d-flex justify-content-around mt-3 gx-5'>
                <div className="row services  d-flex justify-content-center">
                    <div className='col-sm-12'>
                        <ul>
                            <li><a href="">Free delivery on all orders above EGP 399</a></li>
                            <li><a href="">Shop online 24/7</a></li>
                            <li><a href="">Click & collect available on all items</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
