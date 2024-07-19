import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Header from '@/components/header';

import './globals.css';

const rokkitt = localFont({
    src: [
        {
            path: '../../public/fonts/Rokkitt-Thin.ttf',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Rokkitt-ExtraLight.ttf',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Rokkitt-Light.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Rokkitt-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Rokkitt-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Rokkitt-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Rokkitt-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Rokkitt-ExtraBold.ttf',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Rokkitt-Black.ttf',
            weight: '900',
            style: 'normal',
        },
    ],
});

export const metadata: Metadata = {
    title: 'Locator App',
    description: 'App to localize drinking fountains.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' data-theme='dark'>
            <body className={rokkitt.className}>
                <Header />
                {children}
            </body>
        </html>
    );
}
