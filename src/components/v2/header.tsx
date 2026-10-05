"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { bookCall, clientLogin, navLinks, navServices } from "@/components/v2/content";
import { easeOut, MagneticLink } from "@/components/v2/motion";
import { cn } from "@/lib/utils";

export function Header() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [raised, setRaised] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastY.current;
    lastY.current = latest;
    setRaised(latest > 24);
    if (Math.abs(delta) < 6) {
      return;
    }
    setHidden(latest > 220 && delta > 0);
  });

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? "-140%" : "0%" }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
        initial={reduce ? false : { y: "-140%" }}
        transition={{ duration: reduce ? 0 : 0.7, ease: easeOut, delay: 0 }}
      >
        <div
          className={cn(
            "mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 rounded-full pl-5 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-500",
            raised && !menuOpen
              ? "bg-neutral-50/82 shadow-[0_18px_50px_-30px_rgb(1_25_54/0.35)] ring-1 ring-primary-500/8 backdrop-blur-xl"
              : "bg-transparent",
          )}
        >
          <Link aria-label="KRS home" className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-secondary-400" href="/v2">
            <Image
              alt="KRS"
              className="h-7 w-auto"
              height={208}
              priority
              src={menuOpen ? "/logos/Full%20logo.svg" : "/logos/Full%20logo%20Dark.svg"}
              unoptimized
              width={504}
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <ServicesMenu />
            {navLinks.map((link) => (
              <Link
                className="rounded-full px-4 py-2 text-[15px] text-primary-500/80 outline-none transition-colors hover:bg-primary-500/5 hover:text-primary-500 focus-visible:bg-primary-500/5"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              className={cn(
                "hidden rounded-full px-4 py-2 text-[15px] text-primary-500/80 transition-colors hover:text-primary-500 md:inline-flex",
                menuOpen && "md:hidden",
              )}
              href={clientLogin}
            >
              Client login
            </Link>
            <span className={cn("hidden sm:inline-flex", menuOpen && "sm:hidden")}>
              <MagneticLink href={bookCall.href}>{bookCall.label}</MagneticLink>
            </span>
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={cn(
                "flex size-12 items-center justify-center rounded-full transition-colors duration-300 lg:hidden",
                menuOpen ? "bg-neutral-50 text-primary-500" : "bg-primary-500 text-neutral-50",
              )}
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              {menuOpen ? <X className="size-5" strokeWidth={1.75} /> : <Menu className="size-5" strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu onClose={() => setMenuOpen(false)} open={menuOpen} />
    </>
  );
}

function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeTimer = useRef<number | null>(null);

  function show() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }
    setOpen(true);
  }

  function hide() {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      }}
      onPointerEnter={show}
      onPointerLeave={hide}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] text-primary-500/80 outline-none transition-colors hover:bg-primary-500/5 hover:text-primary-500 focus-visible:bg-primary-500/5"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        Services
        <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} strokeWidth={2} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute left-1/2 top-full w-[540px] -translate-x-1/2 pt-4"
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            id={panelId}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            <div className="grid grid-cols-2 gap-1 rounded-[28px] bg-neutral-50 p-2 shadow-[0_40px_90px_-40px_rgb(1_25_54/0.45)] ring-1 ring-primary-500/8">
              {navServices.map((service, index) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(index === 0 && "col-span-2")}
                  initial={{ opacity: 0, y: 6 }}
                  key={service.href}
                  transition={{ duration: 0.4, delay: 0.03 * index, ease: easeOut }}
                >
                  <Link
                    className={cn(
                      "group block rounded-[20px] p-4 outline-none transition-colors hover:bg-neutral-400 focus-visible:bg-neutral-400",
                      index === 0 && "bg-primary-500 text-neutral-50 hover:bg-tertiary-500 focus-visible:bg-tertiary-500",
                    )}
                    href={service.href}
                  >
                    <span className="block text-[15px] font-medium">{service.label}</span>
                    <span
                      className={cn("mt-1 block text-sm", index === 0 ? "text-neutral-50/65" : "text-primary-400")}
                    >
                      {service.text}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = [...navServices.map(({ label, href }) => ({ label, href })), ...navLinks];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-primary-500 px-6 pb-10 pt-28 text-neutral-50 lg:hidden"
          data-lenis-prevent
          exit={{ clipPath: "inset(0% 0% 100% 0% round 0px)" }}
          initial={{ clipPath: "inset(0% 0% 100% 0% round 0px)" }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {items.map((item, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 24 }}
                key={item.href}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.04, ease: easeOut }}
              >
                <Link
                  className="block border-b border-neutral-50/10 py-4 text-3xl font-light tracking-[-0.03em]"
                  href={item.href}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <MagneticLink className="w-full justify-between" href={bookCall.href} size="lg" tone="light">
              {bookCall.label}
            </MagneticLink>
            <Link className="py-3 text-center text-neutral-50/70" href={clientLogin}>
              Client login
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
