import React, { useEffect, useState } from "react";
import { useDeleteCartByUserIdMutation, useGetCartQuery } from "../../../features/api/cartApi";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetAddressQuery } from "../../../features/api/addressApi";
import { useCreateOrderMutation } from "../../../features/api/orderApi";
import { useResendOtpMutation, useVerifyOtpMutation } from "../../../features/api/authApi";

const CheckoutOut = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [changeAddress, setChangeAddress] = useState(false);
  const [index, setIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(false);

  const { data: getCart, isLoading, error, refetch } = useGetCartQuery(userId);
  console.log("cart", getCart)
  const { data: addresses, isLoading: addressLoading, error: addressError } = useGetAddressQuery(userId);
  if (!addressLoading) console.log(addresses);
  const [createOrder, {isLoading: createOrderIsLoading}] = useCreateOrderMutation();
  // const [sendOtp, {isLoading: sendOtpLoading}] = useResendOtpMutation();
  // const [verifyOtp, {isLoading: verifyOtpLoading}] = useVerifyOtpMutation();
  const [deleteCart] = useDeleteCartByUserIdMutation();

  const orderTotal = getCart?.reduce((sum, item) => sum + (item.product_id?.price || 0), 0);

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
  const [productId, setProductId] = useState([]);

  useEffect(() => {
    if (!isLoading && getCart) {
      setProductId(getCart.map((product) => product._id));
    }
  }, [getCart, isLoading]);

  useEffect(() => {
    if (userId && addresses?.[index]?._id) {
      setOrderData({
        user_id: userId,
        product_id: productId,
        address_id: addresses[index]._id,
        paymentMode: paymentMode,
        total: orderTotal,
      });
    }
  }, [userId, productId, index, paymentMode, orderTotal, addresses]);

  useEffect(() => {
    console.log("Payment Mode:", paymentMode);
    console.log("Order Data:", orderData);
  }, [paymentMode, orderData]);
  
  // Handel Order
  const handleOrder = async () => {
    try {
      const response = await createOrder(orderData).unwrap();
      console.log(response);
      await deleteCart(userId).unwrap();
      navigate("/order")
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  // OTP


  if (isLoading || addressLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading product</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg flex gap-6">
      {/* Left Section - Delivery & Payment Methods */}
      <div className="flex-1">
        {/* Delivery Details */}
        {changeAddress ? (
          <div>
            {addresses.map((address, index) => (
            <div className="mb-6 border-b pb-4" key={address._id}>
              <h2 className="text-lg font-semibold">Delivering to {address?.user_id?.username}</h2>
              <p className="text-sm text-gray-600">{address?.city}, {address?.street}, {address?.state}, {address?.pinCode}, {address?.country}</p>
              <h1 className="text-sm text-gray-800">{address?.user_id?.phone}</h1>
              <Link onClick={() => handelChangeAddress(index)} className="text-blue-600 hover:underline">Continue with this address</Link>
            </div>
            
          ))}
          </div>
        ) : (
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold">Delivering to {addresses[index]?.user_id?.username}</h2>
            <p className="text-sm text-gray-600">{addresses[index]?.city}, {addresses[index]?.street}, {addresses[index]?.state}, {addresses[index]?.pinCode}, {addresses[index]?.country}</p>
            <h1 className="text-sm text-gray-800">{addresses[index]?.user_id?.phone}</h1>
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
      </div >

      {/* Right Section - Order Summary */}
      < div className="w-1/3 p-4 border rounded-lg bg-gray-100" >
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <p className="mt-2 text-gray-700">Order Total: ₹{orderTotal.toFixed(2)}</p>
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
