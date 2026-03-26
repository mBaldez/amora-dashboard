import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface ContextMenuItemProps {
  icon?: ReactNode;
  label: string;
  onClick: (e: React.MouseEvent) => void;
  destructive?: boolean;
}

interface ContextMenuProps {
  trigger: ReactNode;
  items: ContextMenuItemProps[];
}

export function ContextMenu({ trigger, items }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <div onClick={toggleOpen} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-[#1A1A2E]/95 backdrop-blur-md rounded-xl border border-border shadow-2xl z-50 overflow-hidden"
          >
            <div className="py-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              {items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIsOpen(false);
                    item.onClick(e);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 relative z-10 transition-colors duration-200",
                    item.destructive 
                      ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                      : "text-foreground/80 hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  {item.icon && <span className="opacity-80">{item.icon}</span>}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
