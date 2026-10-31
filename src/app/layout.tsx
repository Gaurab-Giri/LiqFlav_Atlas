import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Flavor Atlas | Understand every sip', description:'Explore beverage history, flavor science, and traditions through an interactive educational atlas.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
