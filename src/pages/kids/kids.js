import React from 'react';
import { useState, useEffect } from "react";
import './kids.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import addFavourit from '../../components/store/actions/fav';
import { AiOutlineHeart } from 'react-icons/ai';
import { getProducts } from '../../firebase/products';
import addProduct from '../../components/store/actions/cart';
import { useUserContext } from './../../context/userContext';
import { db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";



const Kids = () => {
    const { userInfo, users } = useUserContext();

    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function prdlist() {
            setProducts(await getProducts("Kids"));
        }
        prdlist();
    }, [])
    console.log(products)


    // add favorite product


    const dispatch = useDispatch();
    const f = useSelector((state) => { return state.fav.favProducts })
    const [favMenu, setfavMenu] = useState(f);

    const addFavorite = async (productid, productimage, productname, productprice) => {
        let favProduct = { id: productid, img: productimage, name: productname, price: productprice };
        if (users) {
            if (favMenu.some(fav => fav.id == favProduct.id)) {
                setfavMenu(favMenu.filter(f => f.name != favProduct.name))
            }
            else {
                setfavMenu(favMenu.concat(favProduct))
            }
            await setDoc(doc(db, "Users", userInfo.uid), {
                Favs: favMenu,
            }, { merge: true });
        }
        else {
            setfavMenu(f)
            alert("please log in first")
        }
    }
    dispatch(addFavourit(favMenu));

    // add product to cart

    const p = useSelector((state) => { return state.cart.cartProducts })
    const [cartMenu, setcartMenu] = useState(p);

    const addProducts = async (productid, productimage, productname, productprice) => {
        let cartProduct = { id: productid, img: productimage, name: productname, price: productprice };
        if (users) {
            if (cartMenu.some(cart => cart.id == cartProduct.id)) {
                setcartMenu(cartMenu.filter(p => p.name != cartProduct.name))
            }
            else {
                setcartMenu(cartMenu.concat(cartProduct))
            }
            await setDoc(doc(db, "Users", userInfo.uid), {
                Orders: cartMenu,
            }, { merge: true });
        }
        else {
            setcartMenu(p)
            alert("please log in first")
        }
    }

    dispatch(addProduct(cartMenu));
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='column'>
                            <h5>New Arrivals</h5>
                            <p>T-Shirts</p>
                            <p>Shoes & Accessories</p>
                            <p>Sportswear</p>
                            <h5 className='mt-5'>Shop By Product</h5>
                            <p>All</p>
                            <p>T-Shirts</p>
                            <p>Shoes & Accessories</p>
                            <p>Sportwear</p>
                        </div>
                    </div>
                    <div className='col-9'>
                        <img className='img-fluid mb-3' src="https://eg.hm.com/sites/g/files/bndsjb1566/files/2019-12/dp-b1-MENA-w52-hm-SLUG-en-d_38.jpg" />
                        <h1>Kids</h1>
                        <div className="row">
                            {products.map((prd) => {
                                return (
                                    <>
                                        <div class="col-md-3 py-2">
                                            <div class="card-sl">
                                                <div class="card-image">
                                                    <Link to={`/${prd.cat}/${prd.id}`} key={prd.id}><img src={prd.imageURL} /></Link>
                                                </div>
                                                <a class="card-action" >
                                                    <button className=
                                                        {`btn btn-warning${favMenu.some(i => i.id == prd.id) ? 'btn btn-danger' : 'btn btn-warning'}`}
                                                        onClick={() => addFavorite(prd.id, prd.imageURL, prd.name, prd.price)}><AiOutlineHeart style={{ width: "25px", height: "30px" }} /></button></a>
                                                <div class="card-heading">
                                                    {prd.name}
                                                </div>
                                                <div class="card-text">
                                                    {prd.price}
                                                </div>
                                                <a className={`card-button${cartMenu.some(i => i.id == prd.id) ? 'card-button' : 'card-button'}`}
                                                    onClick={() => addProducts(prd.id, prd.imageURL, prd.name, prd.price)} class="card-button">Add To Cart</a>

                                                {/* <Link to={`/details/${prd.id}`} key={prd.id}><a href="/" class="card-button">Add To Cart</a></Link> */}
                                            </div>
                                        </div>

                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>


        </>
    );
}

export default Kids;


