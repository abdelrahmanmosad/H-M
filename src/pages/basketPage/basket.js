import React, { useState , useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './basket.css';
import addProduct from '../../components/store/actions/cart';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'react-bootstrap';
import { useUserContext } from "../../context/userContext";
import { doc, getDoc,updateDoc, arrayRemove} from "firebase/firestore";
import { db } from "../../firebase";
import Paypal from '../../components/paypal';
import { t } from 'i18next'; 


const Basket = () => {
    
    const { users, userInfo } = useUserContext();

    const dispatch = useDispatch()
    const productList = useSelector((state) => state.cart.cartProducts);
    // console.log(productList);
    const [cartMenu, setcartMenu] = useState(productList);

    const remove = (data) => {
        setcartMenu(cartMenu.filter(ele => ele.id != data))
    }

    dispatch(addProduct(cartMenu));


//    const Qprice = useRef();
//    let q = 1 ;
    
//    const increase = (price) => {
//    q++;
//    console.log(price * q)
//    }

const[Order,setOrder]=useState([])

// const [checkout, setCheckOut ] = useState(false);

// var itemsPrice = Order.reduce((a, c) => a + c.Quantity * c.price, 0);
// var taxPrice = itemsPrice * 0.1;
// var shippingPrice = itemsPrice > 1000 ? 0 : 20;
// var totalPrice = itemsPrice + taxPrice ;

const [price, setPrice]=useState (0)

useEffect(() => {


    const getOrder =async ()=>{
      await getDoc(doc(db, "Users", userInfo.uid)).then
      
      ((res)=>{
        var x = 0;
        for(var i = 0 ; i < res.data().Orders.length ; i++ )
        {
          x += res.data().Orders[i].price;
        }
        setPrice (x)
        setOrder(res.data().Orders)
        })
  }

  getOrder();
    
},)



const ProductOrder = doc(db, "Users", userInfo.uid);



// function onRemove(prd){
// updateDoc(ProductOrder, {
// Orders: arrayRemove(prd)
// },[]);
// }


function onAdd(prd){

const exist = Order.find((x) => x.name === prd.name);
exist.Quantity=1;
    setOrder(
      Order.map((x) =>
        x.name === prd.name ? { ...exist, Quantity: exist.Quantity+1 } : x
      )
    );

// console.log(Order)
updateDoc(ProductOrder,
  { Orders: Order },
  { merge: true }
  )
  }

function onMinis(prd){

const exist = Order.find((x) => x.name === prd.name);

setOrder(
  Order.map((x) =>
    x.name === prd.name ? { ...exist, Quantity: exist.Quantity=exist.Quantity-1 } : x
  )
);


if( exist.Quantity===0)
{

const x = Order.indexOf(prd);
Order.splice(x,1)

}


// console.log(Order)
updateDoc(ProductOrder,
{ Orders: Order },
{ merge: true }
)

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
        productList.map((prd,i) => {
            return (

                <>

                    <div class="card" key={i}>
                        <div class="table-responsive">
                            <table class="table table-borderless table-shopping-cart">
                                <thead class="text-muted">
                                    <tr class="small text-uppercase">
                                        <th scope="col">Product</th>
                                        <th scope="col" width="120">Quantity</th>
                                        <th scope="col" width="200">Price</th>
                                        <th scope="col" class="text-right d-none d-md-block" width="200"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <figure class="itemside align-items-center" key={prd.id}>
                                                <div class="aside"><img src={prd.img} class="img-sm" /></div>
                                                <figcaption class="info"> <a href="#" class="title text-dark" data-abc="true">{prd.name}</a>
                                                    <p class="small text-muted">SIZE:M <br /> Brand: Cantabil</p>
                                                </figcaption>
                                            </figure>
                                        </td>
                                        <td >
 
                                             <Button className="ms-2"onClick={() =>onMinis(prd)} >-</Button>
                                            {prd.Quantity}
                                            <Button className="ms-2" onClick={() =>onAdd(prd,i)}>+</Button>   

                                         </td>
                                                                            
                                        <td>
                                            <div class="price-wrap m-3">{prd.price} EGP</div>
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
                                        <dt>Total price : </dt>
                                        <dd class="text-right ml-3"><strong>{price.toFixed(2)} EGP</strong></dd>
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt>Discount:</dt>
                                        <dd class="text-right text-danger ml-3">- 10.00 EGP</dd>
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt>Total : </dt>
                                        <dd class="text-right text-dark b ml-3"><strong>{price-10.00.toFixed(2)} EGP</strong></dd>
                                    </dl>
                                    <hr />
                                     <a href="#" class="btn btn-out btn-primary btn-square btn-main" data-abc="true">Make Purchase</a>
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
