import React from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { animationOpacity } from '@/shared/lib/animations';

interface ModalWindowProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  classes?: {
    container?: string;
    inner?: string;
  };
}

export const ModalWindowDropDown = ({
  children,
  open,
  setOpen,
  classes = {
    container: '',
    inner: '',
  },
}: ModalWindowProps) => {
  const { asPath } = useRouter();

  // close the modal window when changing the page
  React.useEffect(() => {
    setOpen(false);
  }, [asPath, setOpen]);

  React.useEffect(() => {
    const body = document?.querySelector('body');
    if (open && body) body.style.overflowY = 'hidden';
    else if (body) body.style.overflowY = 'unset';
  }, [open]);

  const handleClickAwayClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open ? (
        <div>
          <motion.div
            variants={animationOpacity}
            animate="visible"
            initial="hidden"
            exit="hidden"
            className="fixed inset-0 z-[49] transition-opacity"
            aria-hidden="true"
          >
            <div
              role="presentation"
              onClick={handleClickAwayClose}
              className="absolute inset-0 bg-blue opacity-50"
            />
          </motion.div>

          <motion.div
            variants={animationOpacity}
            animate="visible"
            initial="hidden"
            exit="hidden"
            className={`absolute z-50 inline-block max-w-[80vw] transform overflow-auto rounded-lg bg-white p-5 text-left align-bottom shadow-xl ${classes?.container}`}
          >
            <div
              className={`modal-window-inner max-h-screen overflow-x-auto ${classes?.inner}`}
            >
              {children}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};
