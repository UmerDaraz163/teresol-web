'use client';

import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">
                    Transforming needs into innovative solutions
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Let’s collaborate to turn your vision into reality with cutting-edge technology and creative solutions.        </p>
                <Link
                    href="/"
                    className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer inline-block"
                >
                    Bring Your Vision to Life
                </Link>
            </div>
        </section>
    );
}
