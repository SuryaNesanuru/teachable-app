"use client";
import { motion } from 'framer-motion';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { SearchBar } from './search';

export function Hero() {
  return (
    <div>
      <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-black">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5 }} 
              className="text-4xl/tight sm:text-5xl/tight font-bold tracking-tight"
            >
              Learn, Build, and Ship with Premium Courses and Tools
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="mt-4 text-zinc-600 dark:text-zinc-400 text-lg"
            >
              Explore expert-led courses and downloadable resources for developers and creators.
            </motion.p>
            <div className="mt-8 flex gap-3">
              <Link href="/courses">
                <Button size="lg">Browse Courses</Button>
              </Link>
              <Link href="/instructor">
                <Button variant="outline" size="lg">Become an Instructor</Button>
              </Link>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.1 }} 
            className="aspect-video rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-fuchsia-500/20 border border-zinc-200 dark:border-zinc-800" 
          />
        </div>
      </section>
      <SearchBar />
    </div>
  );
}


