"use client"

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-pink-100 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href={"/"}>
                    <a className="text-2xl font-bold text-pink-600">Lila Baking Studio</a>
                </Link>
                <nav className="hidden md:flex space-x-4">
                    <NavLink href={"/"}>Sobre</NavLink>
                    <NavLink href={"/"}>Produtos</NavLink>
                    <NavLink href={"/"}>Depoimentos</NavLink>
                    <NavLink href={"/"}>Contato</NavLink>
                </nav>
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Alternar menu">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            {isOpen && (
                <motion.nav
                    className="md:hidden bg-pink-50 py-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <NavLink href={"/"} onClick={() => setIsOpen(false)}>Sobre</NavLink>
                    <NavLink href={"/"} onClick={() => setIsOpen(false)}>Produtos</NavLink>
                    <NavLink href={"/"} onClick={() => setIsOpen(false)}>Depoimentos</NavLink>
                    <NavLink href={"/"} onClick={() => setIsOpen(false)}>Contato</NavLink>
                </motion.nav>
            )}
        </header>
    )
}

function NavLink({ href, children, onClick }: { href: string, children: React.ReactNode, onClick?: () => void }) {
    return (
        <Link href={href}>
            <a className="text-pink-600 hover:text-pink-800 transition-colors" onClick={onClick}>{children}</a>
        </Link>
    )
}