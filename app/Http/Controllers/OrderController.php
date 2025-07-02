<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function point_of_sale(){
        $products = Product::select('id','name', 'purchase_price', 'sell_price', 'opening_stock', 'available')->get();

        return Inertia::render('point_of_sale', ['products' => $products]);
    }

    public function store_order(Request $request){
        // return $request->all();
        $request->validate([
            'cart' => 'required|array',
            'cart.*.id' => 'required|exists:products,id',
            'cart.*.quantity' => 'required|integer|min:1',
            'discount' => 'nullable|numeric|min:0',
            'customer_paid' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();
        try {
            $newOrder = new Order();
            $newOrder->order_id = 'IMA' . Str::uuid();
            $newOrder->discount = $request->discount;
            $newOrder->paid = $request->customer_paid;
            $newOrder->payment_type = $request->payment_type;
            $newOrder->vat = 500;
            $newOrder->total = $request->total;
            $newOrder->subtotal = $request->subtotal;
            $newOrder->due = $request->total;
            $newOrder->save();

            foreach ($request->cart as $cart) {
                $newOrderItem = new OrderItem();
                $newOrderItem->order_id = $newOrder->id;
                $newOrderItem->product_id = $cart['id'];
                $newOrderItem->quantity = $cart['quantity'];
                $newOrderItem->unit_price = $cart['sell_price'];
                $newOrderItem->total = $cart['sell_price'] * $cart['quantity'];
                $newOrderItem->save();

                $product = Product::find($cart['id']);
                $product->available = $product->available - $cart['quantity'];
                $product->save();
            }

            DB::commit();
            return back();

        } catch (\Exception $e) {
            DB::rollBack();
        }
        toastify()->error('Something went wrong');
    }
}
