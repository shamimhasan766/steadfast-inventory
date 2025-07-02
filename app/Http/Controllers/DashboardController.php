<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function Index(Request $request){
        $total_sale = Order::query()
            ->when($request->start_date || $request->end_date, function ($query) use ($request) {
                $start = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::minValue();
                $end = $request->end_date ? Carbon::parse($request->end_date)->endOfDay() : Carbon::now()->endOfDay();

                $query->whereBetween('created_at', [$start, $end]);
            }, function ($query) {
                $query->whereDate('created_at', Carbon::today());
            })
            ->sum('total');
        $total_expenses = Product::query()
                    ->when($request->start_date || $request->end_date, function ($query) use ($request) {
                        $start = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::minValue();
                        $end = $request->end_date ? Carbon::parse($request->end_date)->endOfDay() : Carbon::now()->endOfDay();

                        $query->whereBetween('created_at', [$start, $end]);
                    }, function ($query) {
                        $query->whereDate('created_at', Carbon::today());
                    })
                    ->selectRaw('SUM(purchase_price * opening_stock) as total')
                    ->value('total');

        return Inertia::render('dashboard', [
                        'total_sale' => number_format($total_sale, 2),
                        'total_expenses' => number_format($total_expenses, 2)
                    ]);
    }
}
