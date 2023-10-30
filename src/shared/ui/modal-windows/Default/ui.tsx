import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { animationOpacity } from '@/shared/lib/animations';

interface ModalWindowProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  classes?: {
    parent?: string;
    container?: string;
    inner?: string;
  };
  closeRoute?: boolean;
  onClose?: () => void;
}

export const DefaultModalWindow = ({
  children,
  open,
  setOpen,
  classes,
  onClose,
  closeRoute = true,
}: ModalWindowProps) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { asPath } = useRouter();

  const closeWindow = useCallback(() => {
    setOpen(false);
    onClose && onClose();
  }, [onClose, setOpen]);

  // close the modal window when changing the page
  React.useEffect(() => {
    closeRoute && closeWindow();
  }, [asPath, closeRoute, closeWindow]);

  React.useEffect(() => {
    const body = document?.querySelector('body');
    if (open && body) body.style.overflowY = 'hidden';
    else if (body && !open) body.style.overflowY = 'unset';
    open && containerRef.current?.focus();
  }, [open]);

  const handleClickAwayClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    closeWindow();
  };

  const onEscHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeWindow();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={containerRef}
          onKeyDown={onEscHandler}
          tabIndex={0}
          variants={animationOpacity}
          animate="visible"
          initial="hidden"
          exit="hidden"
          className="fixed inset-0 z-20 overflow-y-auto"
        >
          <div
            className={`flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center md:block md:p-0 ${classes?.parent}`}
          >
            <div
              onClick={handleClickAwayClose}
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-blue opacity-50"></div>
            </div>

            <motion.div
              variants={animationOpacity}
              animate="visible"
              initial="hidden"
              exit="hidden"
              className={`inline-block transform overflow-hidden rounded-lg bg-white p-5 text-left align-bottom shadow-xl transition-all ${classes?.container}`}
            >
              <div
                className={`modal-window-inner overflow-y-auto overflow-x-hidden ${classes?.inner}`}
              >
                {children}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
