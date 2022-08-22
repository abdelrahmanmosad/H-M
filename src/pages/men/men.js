import React from 'react';
import { useState, useEffect } from "react";
import './cat.css';
import { Link } from 'react-router-dom';
import addFavourit from '../../components/store/actions/fav';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { AiOutlineHeart } from 'react-icons/ai';
import { getProducts } from '../../firebase/products';
import { Card } from '../../components/card/card';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useUserContext } from './../../context/userContext';
import { db } from '../../firebase';



const Men = () => {
    const { userInfo, users } = useUserContext();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function prdlist() {
            setProducts(await getProducts("Men"));
        }
        prdlist();
    }, [])
    console.log(products)

    // add favorite product


    const dispatch = useDispatch();
    const f = useSelector((state) => { return state.fav.favProducts })
    const [favMenu, setfavMenu] = useState(f);

    const addFavorite = async (productid, productname, productprice) => {
        let favProduct = { id: productid, name: productname, price: productprice };
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
            setfavMenu("")
            alert("please log in first")
        }

    }
    dispatch(addFavourit(favMenu));


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
                        <h1>Men</h1>
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
                                                        onClick={() => addFavorite(prd.id, prd.name, prd.price)}><AiOutlineHeart style={{ width: "25px", height: "30px" }} />
                                                    </button></a>
                                                <div class="card-heading">
                                                    {prd.name}
                                                </div>
                                                <div class="card-text">
                                                    {prd.price}
                                                </div>
                                                <a href="#" class="card-button">Add To Cart</a>
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

export default Men;


{/* </Link> */ }