import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { useState } from 'react';
import { Package, Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function Product({products}){
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Product',
            href: '/product',
        },
    ];

    const [showAddForm, setshowAddForm] = useState(false);
    const { data, setData, reset, post } = useForm({
        name: '',
        sku: '',
        purchase_price: '',
        sell_price: '',
        opening_stock: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleAddProduct = () => {
        post(route('product.store'), {
            onSuccess: () => {
                alert('Product Added Successfully')
                reset();
                setshowAddForm(false);
            }
        });
    }

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            post(route('product.delete', id), {
                onSuccess: () => alert("Product Deleted Successfully"),
            });
        }
    };


    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs} >
                <Head title="Product" />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Package className="h-8 w-8 text-blue-600" />
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Management</h1>
                                </div>
                                <button
                                    onClick={() => setshowAddForm(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Plus className="h-5 w-5" />
                                    Add Product
                                </button>
                            </div>
                        </div>

                        {/* Add/Edit Form Modal */}
                        {showAddForm && (
                            <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-6xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Add New Product
                                        </h2>
                                        <button
                                            onClick={() => setshowAddForm(false)}
                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                placeholder="Enter product name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
                                            <input
                                                type="text"
                                                name="sku"
                                                value={data.sku}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                placeholder="Enter SKU"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Purchase Price</label>
                                                <input
                                                    type="number"
                                                    name="purchase_price"
                                                    value={data.purchase_price}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                    placeholder="0"
                                                    min="0"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sell Price</label>
                                                <input
                                                    type="number"
                                                    name="sell_price"
                                                    value={data.sell_price}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                    placeholder="0"
                                                    min="0"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                                                <input
                                                    type="number"
                                                    name="opening_stock"
                                                    value={data.opening_stock}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                    placeholder="0"
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={handleAddProduct}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Save className="h-4 w-4" />
                                            Add Product
                                        </button>
                                        <button
                                            onClick={() => setshowAddForm(false)}
                                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Product Table */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Purchase Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sell Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Opening Stock</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Available Stock</th>

                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {products.data.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{product.purchase_price.toLocaleString()} TK</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">{product.sell_price.toLocaleString()} TK</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.opening_stock}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                                                    {product.available}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-end p-4">
                            <nav className="inline-flex -space-x-px">
                                {products.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url || "#"}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 border text-sm ${
                                    link.active
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                                />
                                ))}
                            </nav>
                            </div>

                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}
