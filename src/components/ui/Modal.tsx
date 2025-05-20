import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, title, message, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4">
              {title && (
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              )}
              <p className="text-sm text-gray-600">{message}</p>
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                >
                  OK
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
