import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Receipt, Package } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Point Of Sale',
        href: '/point-of-sale',
    },
];

export default function POSSystem({products}) {
    const [cart, setCart] = useState([]);
    const [discount, setDiscount] = useState<number>(0);
    const [customerPaid, setCustomerPaid] = useState<number>(0);
    const [paymentType, setPaymentType] = useState<string>('cash');
    const [vatRate] = useState(5);


    const addToCart = (product) => {
        console.log(product)
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            if (existingItem.quantity < product.available) {
                setCart(cart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ));
            }
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };


    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(id);
        } else {
            setCart(cart.map(item =>
                item.id === id
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
        }
    };


    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };


    const subtotal = cart.reduce((sum, item) => sum + (item.sell_price * item.quantity), 0);
    const discountAmount = discount;
    const afterDiscount = subtotal - discountAmount;
    const vatAmount = (afterDiscount * vatRate) / 100;
    const finalTotal = afterDiscount + vatAmount;
    const remainingDue = Math.max(0, finalTotal - customerPaid);
    const changeAmount = Math.max(0, customerPaid - finalTotal);

    const clearCart = () => {
        setCart([]);
        setDiscount(0);
        setCustomerPaid(0);
    };


    const processSale = () => {
        if (cart.length === 0) {
            alert('Please add items to cart first!');
            return;
        }
            router.post(route('store.order'), {
                cart,
                discount,
                customer_paid: customerPaid,
                vat_rate: vatRate,
                subtotal: subtotal,
                total: finalTotal,
                payment_type: paymentType
            }, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success("Order added successfully!");
                },
                onError: (errors) => {
                    console.error(errors);
                }
            });
        clearCart();
    };

    return (
         <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingCart className="h-8 w-8 text-blue-600" />
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Point of Sale</h1>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Items in Cart</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{cart.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Products & Search */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Products
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                                    {products.map(product => (
                                        <div key={product.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">{product.name}</h3>
                                                <span className={`text-xs px-2 py-1 rounded ${product.available > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                                    {product.available}
                                                </span>
                                            </div>
                                            <div className="space-y-1 mb-3">
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Cost: {product.purchase_price.toLocaleString()}</p>
                                                <p className="text-sm font-semibold text-green-600 dark:text-green-400">{product.sell_price.toLocaleString()} TK</p>
                                            </div>
                                            <button
                                                onClick={() => addToCart(product)}
                                                disabled={product.available === 0}
                                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Plus className="h-4 w-4" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Cart & Checkout */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cart Items</h2>
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                    {cart.length === 0 ? (
                                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No items in cart</p>
                                    ) : (
                                        cart.map(item => (
                                            <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.sell_price} TK × {item.quantity}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 bg-red-500 hover:bg-red-600 text-white rounded"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 bg-green-500 hover:bg-green-600 text-white rounded"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-1 bg-gray-500 hover:bg-gray-600 text-white rounded ml-1"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Discount & Payment */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Details</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount (TK)</label>
                                        <input
                                            type="number"
                                            onChange={(e) => setDiscount(Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer Paid (TK)</label>
                                        <input
                                            type="number"
                                            onChange={(e) => setCustomerPaid(Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Type (TK)</label>
                                        <select  onChange={(e) => setPaymentType(e.target.value)} name="payment_type" id="" className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm'>
                                            <option selected value="cash">Cash</option>
                                            <option value="online">Online</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Bill */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bill Summary</h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                        <span className="text-gray-900 dark:text-white">{subtotal.toFixed(2)} TK</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Discount</span>
                                        <span className="text-red-600">-{discountAmount.toFixed(2)} TK</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">VAT ({vatRate}%)</span>
                                        <span className="text-gray-900 dark:text-white">+{vatAmount.toFixed(2)} TK</span>
                                    </div>
                                    <hr className="border-gray-200 dark:border-gray-700" />
                                    <div className="flex justify-between font-semibold">
                                        <span className="text-gray-900 dark:text-white">Total</span>
                                        <span className="text-green-600 dark:text-green-400">{finalTotal.toFixed(2)} TK</span>
                                    </div>
                                    <hr className="border-gray-200 dark:border-gray-700" />
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Paid</span>
                                        <span className="text-gray-900 dark:text-white">{customerPaid.toFixed(2)} TK</span>
                                    </div>
                                    {remainingDue > 0 ? (
                                        <div className="flex justify-between font-semibold">
                                            <span className="text-red-600">Due</span>
                                            <span className="text-red-600">{remainingDue.toFixed(2)} TK</span>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between font-semibold">
                                            <span className="text-green-600">Change</span>
                                            <span className="text-green-600">{changeAmount.toFixed(2)} TK</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <button
                                    onClick={processSale}
                                    disabled={cart.length === 0}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <Receipt className="h-5 w-5" />
                                    Process Sale
                                </button>
                                <button
                                    onClick={clearCart}
                                    className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="h-5 w-5" />
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </AppLayout>
    );
}
