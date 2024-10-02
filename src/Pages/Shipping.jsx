function Shipping() {
  return (
    <div className="text-center  ">
      <p className="text-5xl my-16 font-light">Shipping & Delivery</p>
      <ul className="list-disc list-inside inline-block text-left">
        <li className="font-extralight text-black">
          🚚 Shipping fees: Calculated during checkout based on the area
        </li>
        <li className="font-extralight text-black">
          Orders will ship within 4-5 business days
        </li>
        <li className="font-extralight text-black">
          For problems with your orders, please contact us at
          gassermohamed648@gmail.com
        </li>
      </ul>
      <p className="font-semibold mt-5">
        Shipping Fees are non-refundable nor eligible for store credit
      </p>
    </div>
  );
}

export default Shipping;
