import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen relative overflow-hidden">
                {/* Top navigation */}
                <nav className="container mx-auto max-w-6xl relative z-20 flex justify-end items-center p-6">
                    <div className="flex gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-6 py-2 text-gray-700 font-medium hover:text-purple-600 transition-colors duration-300 rounded-full hover:bg-gray-100"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Main content */}
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="text-center">
                    {/* Main heading */}
                    <h1 className="text-6xl md:text-8xl font-bold text-black mb-8 tracking-tight">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Inventory Management
                        </span>
                        <br />
                        <span className="text-black">App</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-black mb-12 max-w-2xl mx-auto leading-relaxed">
                        Your ultimate shopping destination with seamless experience and endless possibilities
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Get Started
                        </button>
                        <button className="px-8 py-4 border-2 border-white text-black font-semibold rounded-full hover:bg-white hover:text-purple-900 transition-all duration-300">
                        Learn More
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}
