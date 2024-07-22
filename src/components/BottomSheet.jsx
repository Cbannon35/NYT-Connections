import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./BottomSheet.css"; // Ensure this path matches where your CSS is saved

const BottomSheet = ({ isVisible, onClose }) => {
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
                        className="bottomSheet z-2"
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
                        <div className="bottomSheetHeader">
                            <button onClick={onClose}>X</button>
                        </div>
                        <div className="bottomSheetContent">
                            {/* Add your content here */}
                        </div>
                    </motion.dialog>
                </>
            )}
        </AnimatePresence>
    );
};

export default BottomSheet;
