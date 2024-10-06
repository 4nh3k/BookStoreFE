import { Button, TextInput } from "flowbite-react";
import CartProduct from "../../components/Product/CartProduct";

export function Cart() {
  return (
    <>
      <div className="heading-4">Shopping Cart</div>
      {/* <p className="text-gray-500">Your cart is empty</p> */}
      <div className="flex w-full space-x-12 mt-4">
        <div className="w-full space-y-4">
          <CartProduct />
          <CartProduct />
          <CartProduct />
          <CartProduct />
          <CartProduct />
        </div>
        <div>
          <div className="w-[25rem] px-5 pt-5 pb-2.5 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex">
            <div className="text-black text-xl font-bold">Order Summary</div>
            <div className="w-full space-y-2 mt-2">
              <div className="flex w-full justify-between">
                <span className="text-black text-base font-normal">
                  Original price
                </span>
                <span className="text-black text-base font-medium">
                  $1200.00
                </span>
              </div>
              <div className="flex w-full justify-between">
                <span className="text-black text-base font-normal">
                  Savings
                </span>
                <span className="text-emerald-600 text-base font-medium">
                  -$200.99
                </span>
              </div>
              <div className="flex w-full justify-between">
                <span className="text-black text-base font-normal">
                  Store pickup
                </span>
                <span className="text-black text-base font-medium">-$99</span>
              </div>
              <div className="flex w-full justify-between">
                <span className="text-black text-base font-normal">Tax</span>
                <span className="text-black text-base font-medium">-$799 </span>
              </div>
              <div className="py-2.5 border-t border-gray-200 flex w-full justify-between">
                <span className="text-black text-base font-bold">Total</span>
                <span className="text-black text-base font-bold">$2003</span>
              </div>
              <Button className="w-full" size="sm">
                Proceed to checkout
              </Button>
              <div className="text-center">
                <span className="text-black text-xs font-medium">or </span>
                <span className="text-blue-700 text-xs font-medium underline">
                  Continue Shopping
                </span>
                <span className="text-blue-700 text-xs font-medium">
                  &rarr;
                </span>
              </div>
            </div>
          </div>
          <div className="w-[25rem] px-5 pt-5 pb-6 mt-8 space-y-4 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex">
            <span className="w-80 text-black text-sm">
              Do you have a voucher or gift card ?
            </span>
            <TextInput className="w-full" />
            <Button className="w-full" size="sm">
              Apply Code
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
