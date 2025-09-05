"use client";
import * as React from 'react';
import { cn } from '@/lib/utils';

type TabItem = { value: string; label: string };

export function Tabs({ items, value, onValueChange, className }: { items: TabItem[]; value: string; onValueChange: (v: string) => void; className?: string }) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800">
        {items.map((it) => {
          const active = value === it.value;
          return (
            <button
              key={it.value}
              onClick={() => onValueChange(it.value)}
              className={cn('px-3 py-2 text-sm rounded-t-lg', active ? 'bg-zinc-100 dark:bg-zinc-900 font-medium' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200')}
            >
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}


