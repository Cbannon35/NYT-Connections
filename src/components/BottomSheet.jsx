import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BottomSheet = ({ isVisible, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <motion.div
                        className="w-screen h-screen bg-black bg-opacity-10 fixed top-0 left-0 z-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onTap={onClose}
                    />
                    <motion.dialog
                        className="fixed flex flex-col bottom-0 left-0 w-full bg-white p-4 z-2 rounded-t-xl max-h-[80vh]"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 600, damping: 35 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0.5}
                        onDragEnd={(event, info) => {
                            if (info.offset.y > 200) {
                                onClose();
                            }
                        }}
                    >
                        <div className="flex justify-between border-b border-black">
                            <div></div>
                            <h1 className="text-xl">{title}</h1>
                            <button onClick={onClose}>
                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </button>
                        </div>
                        <div className="overflow-y-auto pt-2">
                            {children}
                        </div>
                    </motion.dialog>
                </>
            )}
        </AnimatePresence>
    );
};

export default BottomSheet;
