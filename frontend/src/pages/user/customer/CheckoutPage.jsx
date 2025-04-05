import React, { useEffect, useState } from "react";
import { useDeleteCartByUserIdMutation, useGetCartQuery } from "../../../features/api/cartApi";
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import { useGetAddressQuery } from "../../../features/api/addressApi";
import { useCreateOrderMutation } from "../../../features/api/orderApi";
import { useGetProductByIdQuery } from "../../../features/api/productApi";
import LoadingPage from "../../../components/LoadingPage";
import ErrorPage from "../../../components/ErrorPage";
// import { useResendOtpMutation, useVerifyOtpMutation } from "../../../features/api/authApi";

const CheckoutOut = () => {
  const { userId } = useParams();
  console.log("Product ID:", userId);
  const navigate = useNavigate();
  const [changeAddress, setChangeAddress] = useState(false);
  const [index, setIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [searchParams] = useSearchParams();

  // Get the query 
  const productId = searchParams.get("productId") || "";  // this user_id is for buy now

  const { data: getCart, isLoading, error, refetch } = useGetCartQuery(userId);
  console.log("cart", getCart)
  const { data: addresses, isLoading: addressLoading, error: addressError } = useGetAddressQuery(userId);
  const { data: product, isLoading: productIsLoading, error: productError } = useGetProductByIdQuery(productId, {
    skip: !productId, // Skip API call if productId is undefined [condition]
  });
  if (!addressLoading) console.log(addresses);
  const [createOrder, { isLoading: createOrderIsLoading, error: orderError}] = useCreateOrderMutation();
  // const [sendOtp, {isLoading: sendOtpLoading}] = useResendOtpMutation();
  // const [verifyOtp, {isLoading: verifyOtpLoading}] = useVerifyOtpMutation();
  const [deleteCart] = useDeleteCartByUserIdMutation();

  const [discountPrice, setDiscountPrice] = useState();
  const orderTotal = getCart?.reduce((sum, item) => sum + (item.discountPrice || 0), 0);

  // get address
  const handelChangeAddress = (index) => {
    setIndex(index);
    setChangeAddress(false)
  }

  // get payment
  const [paymentMode, setPaymentMode] = useState("");
  const handlePaymentChange = (e) => {
    setPaymentMode(e.target.value);
    console.log(e.target.value);
    setPaymentMethod(true);
  }


  // Setup Order Data
  const [orderData, setOrderData] = useState({
    user_id: "",
    product_id: [],
    address_id: "",
    paymentMode: "",
    total: ""
  });
  const [product_id, setProduct_id] = useState([]);

  useEffect(() => {
    if (!isLoading && getCart) {
      setProduct_id(getCart.map((product) => product._id));
    }
  }, [getCart, isLoading]);

  useEffect(() => {
    if (productId) {
      const discountAmount = Math.floor(product.price * product.discountPercentage / 100);
      const discountPrice = product.price - discountAmount;
      setDiscountPrice(discountPrice);
    }
    if (userId && addresses?.[index]?._id) {
      setOrderData({
        user_id: userId,
        product_id: productId ? productId : product_id,
        address_id: addresses[index]._id,
        paymentMode: paymentMode,
        total: productId ? discountPrice : orderTotal,
      });
    }
  }, [userId, product_id, index, paymentMode, orderTotal, addresses]);

  useEffect(() => {
    console.log("Payment Mode:", paymentMode);
    console.log("Order Data:", orderData);
  }, [paymentMode, orderData]);

  // Handel Order
  const handleOrder = async () => {
    try {
      const response = await createOrder(orderData).unwrap();
      console.log(response);
      if (!productId) await deleteCart(userId).unwrap();

      // remove the productDiscount array
      localStorage.removeItem("productDiscount");

      navigate("/order")
      refetch();
    } catch (error) {
      console.log(error);
    }
  }


  if (isLoading || addressLoading || productIsLoading || createOrderIsLoading) return <LoadingPage />;
  if (error || productError || addressError || orderError) return <ErrorPage />;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg flex gap-6 pt-30">
      {/* Left Section - Delivery & Payment Methods */}
      <div className="flex-1">
        {/* Delivery Details */}
        {changeAddress ? (
          <div>
            {addresses.map((address, index) => (
              <div className="mb-6 border-b pb-4" key={address._id}>
                <h2 className="text-lg font-semibold">Delivering to {address?.user_id?.username}</h2>
                <p className="text-sm text-gray-600">{address?.city}, {address?.street}, {address?.state}, {address?.pinCode}, {address?.country}</p>
                <h1 className="text-sm text-gray-800">{address?.phoneNumber}</h1>
                <Link onClick={() => handelChangeAddress(index)} className="text-blue-600 hover:underline">Continue with this address</Link>
              </div>

            ))}
          </div>
        ) : (
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold">Delivering to {addresses[index]?.user_id?.username}</h2>
            <p className="text-sm text-gray-600">{addresses[index]?.city}, {addresses[index]?.street}, {addresses[index]?.state}, {addresses[index]?.pinCode}, {addresses[index]?.country}</p>
            <h1 className="text-sm text-gray-800">{addresses[index]?.phoneNumber}</h1>
            <button onClick={() => setChangeAddress(true)} className="text-blue-500 text-sm mt-2">Change</button>
          </div>
        )
        }

        {/* Payment Methods */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

          {/* Credit / Debit Card */}
          <div className="mb-4 p-4 border rounded-lg">
            <input
              type="radio"
              id="CARD"
              name="method"
              value="CARD"
              checked={paymentMode === "CARD"}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            <label htmlFor="CARD" className="text-gray-700">Credit or Debit Card</label>
          </div>

          {/* Net Banking */}
          <div className="mb-4 p-4 border rounded-lg">
            <input
              type="radio"
              id="NET-BANKING"
              name="method"
              value="NET-BANKING"
              checked={paymentMode === "NET-BANKING"}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            <label htmlFor="NET-BANKING" className="text-gray-700">Net Banking</label>

            {/* {paymentData.method === "netBanking" && ( */}
            <select
              name="netBankingBank"
              // value={paymentData.netBankingBank}
              onChange={handlePaymentChange}
              className="block w-full mt-2 p-2 border rounded-lg"
            >
              <option value="">Choose a Bank</option>
              <option value="SBI">State Bank of India</option>
              <option value="HDFC">HDFC Bank</option>
              <option value="ICICI">ICICI Bank</option>
            </select>
            {/* )} */}
          </div>

          {/* UPI */}
          <div className="mb-4 p-4 border rounded-lg">
            <input
              type="radio"
              id="UPI"
              name="method"
              value="UPI"
              checked={paymentMode === "UPI"}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            <label htmlFor="UPI" className="text-gray-700">Other UPI Apps</label>

            {/* {paymentData.method === "upi" && ( */}
            <input
              type="text"
              name="upiId"
              placeholder="Enter UPI ID"
              // value={paymentData.upiId}
              onChange={handlePaymentChange}
              className="block w-full mt-2 p-2 border rounded-lg"
            />
            {/* )} */}
          </div>

          {/* Cash on Delivery */}
          <div className="mb-4 p-4 border rounded-lg">
            <input
              type="radio"
              id="COD"
              name="method"
              value="COD"
              checked={paymentMode === "COD"}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            <label htmlFor="COD" className="text-gray-700">Cash on Delivery</label>
          </div>
          {/* <button onClick={changeContinue} className="mt-4 w-full bg-yellow-400 py-2 rounded-lg font-semibold">Continue</button> */}
        </div>

        {productId && userId ? (
          <div>
            {!product ? (
              <p className="text-center text-gray-500">Please Chose a Product</p>
            ) : (

              <div key={product._id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={product?.images?.[0] || "/placeholder.jpg"}
                    alt={product?.title || "Product"}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product?.title}</h3>
                    <p className="text-gray-900">{product?.description
                    }</p>
                    <p className="text-gray-950">₹{product?.price}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {!getCart || getCart.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              getCart.map((item) => (
                <div key={item._id} className="flex items-center justify-between border-b py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product_id?.images?.[0] || "/placeholder.jpg"}
                      alt={item.product_id?.title || "Product"}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.product_id?.title}</h3>
                      <p className="text-gray-900">{item.product_id?.description
                      }</p>
                      <p className="text-gray-950">₹{item.product_id?.price}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div >

      {/* Right Section - Order Summary */}
      < div className="w-1/3 p-4 border rounded-lg bg-gray-100" >
        <h2 className="text-lg font-semibold">Order Summary</h2>
        {productId ? (
          <p className="mt-2 text-gray-700">Total Price: ₹{discountPrice}</p>
        ) : (
          <p className="mt-2 text-gray-700">Total Price: ₹{orderTotal.toFixed(2)}</p>
        )}
        {paymentMethod ? (
          <button onClick={handleOrder} className="mt-4 w-full bg-yellow-400 py-2 rounded-lg font-semibold">Place Order</button>
        ) : (
          <button className="mt-4 w-full bg-gray-400 py-2 rounded-lg font-semibold">Place Order</button>
        )}
      </div >
    </div >
  );
};

export default CheckoutOut;
