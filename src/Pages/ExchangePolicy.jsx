function ExchangePolicy() {
  return (
    <div className="text-center flex flex-col items-center ">
      <p className="md:text-5xl text-4xl mt-16 mb-5 font-light">
        EXCHANGE & REFUND POLICY
      </p>

      <p className=" w-[70%] font-medium">
        Thanks for shopping at thebasiclook.comIf you are not entirely satisfied
        with your purchase, we are here to help.
      </p>
      <p className="hover:text-cyan-700 my-5 cursor-pointer" href="/contact">
        Please Contact us here →
      </p>
      <div
        className="flex justify-center underline cursor-pointer w-[70%] md:w-[50%]
       hover:text-cyan-700  text-xl text-left"
      >
        ONCE YOUR REQUEST IS APPROVED, IT WILL ARRIVE IN 5 DAYS, PLEASE NOTE{" "}
        THAT THE SHIPPING FEES ARE NON REFUNDABLE, AND ANOTHER 45 EGP WILL BE
        DEDUCTED AS HANDLING FEES. You can return your product for store credit
        or a different product.
      </div>
    </div>
  );
}

export default ExchangePolicy;
