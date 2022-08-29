import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import './basket.css';
import addProduct from '../../components/store/actions/cart';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'react-bootstrap';


const Basket = () => {

    const dispatch = useDispatch()
    const productList = useSelector((state) => state.cart.cartProducts);
    // console.log(productList);
    const [cartMenu, setcartMenu] = useState(productList);

    const remove = (data) => {
        setcartMenu(cartMenu.filter(ele => ele.id != data))
    }

    dispatch(addProduct(cartMenu));


    const Qprice = useRef();
    let q = 1;

    const increase = (evt) => {
        /* q++; */
        var price = evt.target
        console.log(evt.children);

    }


    const EmptyMessage = () => {
        if (productList.length > 0) {
            return;
        }
        return (
            <div class="col-sm-12 empty-cart-cls text-center" >
                <h3><strong>Your Cart is Empty</strong></h3>
                <h4>Add something to make me happy </h4>
                <a href="/home" class="btn btn-primary cart-btn-transform m-3" data-abc="true">Continue Shopping</a>
            </div>
        );
    }

    const ProductsL = () => (
        productList.map((prd) => {
            return (
                <>
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table table-borderless table-shopping-cart">
                                <thead class="text-muted">
                                    <tr class="small text-uppercase">
                                        <th scope="col">Product</th>
                                        <th scope="col" width="120">Quantity</th>
                                        <th scope="col" width="120">Price</th>
                                        <th scope="col" class="text-right d-none d-md-block" width="200"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr onClick={(evt) => increase(evt)}>
                                        <td>
                                            <figure class="itemside align-items-center" key={prd.id}>
                                                <div class="aside"><img src={prd.img} class="img-sm" /></div>
                                                <figcaption class="info"> <a class="title text-dark" data-abc="true" ref={Qprice}>{prd.name}</a>
                                                    <p class="small text-muted">SIZE:M <br /> Brand: Cantabil</p>
                                                </figcaption>
                                            </figure>
                                        </td>
                                        <td >
                                            {/* <button onClick={() => setCount(count + 1)}>+</button>
                                            {(prd.qty = count)}
                                            <button
                                                onClick={() => { prd.qty > 1 ? setCount(count - 1) : setCount(1); }}>
                                            </button> */}
                                            <Button className="ms-2" >-</Button>
                                            <Button className="ms-2" >+</Button>                                    </td>
                                        <td>
                                            <div class="price-wrap">EGP <span >{prd.price}</span> </div>
                                        </td>
                                        <td class="text-right d-none d-md-block">
                                            {/* <a href="" class="btn btn-light" data-abc="true"> <BsSuitHeart style={{ width: "20px", height: "20px" }} /></a> */}
                                            <a class="card-action" >
                                                <button className=
                                                    {`btn btn-light${(prd.id) ? 'btn btn-danger' : 'btn btn-warning'}`} onClick={() => remove(prd.id)}><AiOutlineClose style={{ width: "20px", height: "30px" }} /></button></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            );
        })
    )

    return (

        <div className="row g-5 py-4 mt-5 container-fluid mx-auto ">



            <div class="card">
                <div class="card-header">
                    <h1>Your shopping bag</h1>
                </div>
                <div class="row py-3">

                    <div class="row g-1 py-1 mt-1 container-fluid mx-auto" >
                        <aside class="col-lg-9">
                            {EmptyMessage()}

                            {ProductsL()}
                        </aside>
                        <aside class="col-lg-3">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <form>
                                        <div class="form-group"> <label>Have coupon?</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control coupon " name="" placeholder="Coupon code" />
                                                <span class="input-group-append p-1">
                                                    <button class="btn btn-primary btn-apply coupon ">Apply</button>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <dl class="dlist-align">
                                        <dt>Total price:</dt>
                                        <dd class="text-right ml-3"></dd>
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt>Discount:</dt>
                                        <dd class="text-right text-danger ml-3">- $10.00</dd>
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt>Total:</dt>
                                        <dd class="text-right text-dark b ml-3"><strong>$59.97</strong></dd>
                                    </dl>
                                    <hr /> <a href="#" class="btn btn-out btn-primary btn-square btn-main" data-abc="true"> Make Purchase </a>
                                    <a href="#" class="btn btn-out btn-success btn-square btn-main mt-2" data-abc="true">Continue Shopping</a>
                                </div>
                            </div>
                        </aside>
                    </div>

                </div>
            </div>
        </div>


    );
}

export default Basket;
