<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(){
        $products = Product::where('available', '>', 0)->paginate(10);
        return Inertia::render('product', ['products' => $products]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string',
            'purchase_price' => 'required|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
            'opening_stock' => 'required|integer|min:0'
        ]);

        $newProduct = new Product();
        $newProduct->name = $request->name;
        $newProduct->sku	 = $request->sku;
        $newProduct->purchase_price	 = $request->purchase_price;
        $newProduct->sell_price	 = $request->sell_price;
        $newProduct->opening_stock	 = $request->opening_stock;
        $newProduct->available	 = $request->opening_stock;
        $newProduct->created_at	 = now();
        $newProduct->save();

        return redirect()->back()->with('success', 'Product added');
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string',
            'purchase_price' => 'required|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
            'opening_stock' => 'required|integer|min:0'
        ]);

        $product->update([
            'name' => $request->name,
            'sku' => $request->sku,
            'purchase_price' => $request->purchase_price,
            'sell_price' => $request->sell_price,
            'opening_stock' => $request->opening_stock,
        ]);

        return redirect()->back()->with('success', 'Product updated');
    }

    public function delete($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->back()->with('success', 'Product Deleted Successfully');
    }


}
