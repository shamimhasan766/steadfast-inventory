import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Filter } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({total_sale, total_expenses}) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const getData = () => {
        router.get(route('dashboard'), { start_date: startDate, end_date: endDate }, {
            preserveState: true,
            replace: true,
        });
    };

    useEffect(() => {
        if (startDate || endDate) {
            getData();
        }
    }, [startDate, endDate]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col rounded-xl p-4 overflow-x-auto">
                <div className='flex justify-end gap-4 mb-2'>
                    <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                        <input type="date" name="start_date" className='bg-transparent border-none outline-none cursor-pointer text-sm' id="" onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                        <input type="date" name="end_date" className='bg-transparent border-none outline-none cursor-pointer text-sm' onChange={(e) => setEndDate(e.target.value)} id="" />
                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="p-10">
                            <h1>Total Sale</h1>
                            <p>{ total_sale }</p>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="p-10">
                            <h1>Total Expenses</h1>
                            <p>{total_expenses}</p>
                        </div>
                    </div>
                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="p-10">
                            <h1>Profit</h1>
                            <p className='text-green-600 font-bold'>50,000</p>
                        </div>
                    </div> */}
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">

                </div>
            </div>
        </AppLayout>
    );
}
