"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: "О компании" },
    { href: "/services", label: "Услуги" },
    { href: "/projects", label: "Проекты" },
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Логотип */}
        <Link href="/">
          <img src="https://alkupe.ru/images/logo.gif" alt="ИГАН ГРУПП" className="h-8 w-auto" />
        </Link>

        {/* Навигация для десктопа */}
        <nav className="hidden md:flex space-x-8 text-[#002147] font-semibold">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-[#f0a500] transition">
              {label}
            </Link>
          ))}
        </nav>

        {/* Социальные иконки (десктоп) */}
        <div className="hidden md:flex space-x-4 text-[#002147]">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[#f0a500] transition">
            <FaLinkedin size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#f0a500] transition">
            <FaInstagram size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-[#f0a500] transition">
            <FaTwitter size={20} />
          </a>
        </div>

        {/* Бургер меню (мобильный) */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden p-2" aria-label="Открыть меню">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64 p-6">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" onClick={() => setOpen(false)}>
                <img src="https://alkupe.ru/images/logo.gif" alt="ИГАН ГРУПП" className="h-6 w-auto" />
              </Link>
              <SheetClose asChild>
                <Button variant="ghost" className="p-2" aria-label="Закрыть меню">
                  <X />
                </Button>
              </SheetClose>
            </div>

            <nav className="flex flex-col space-y-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-lg font-medium text-[#002147] hover:text-[#f0a500] transition"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 flex space-x-6 text-[#002147]">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[#f0a500] transition">
                <FaLinkedin size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#f0a500] transition">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-[#f0a500] transition">
                <FaTwitter size={24} />
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
