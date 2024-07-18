import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./BottomSheet.css"; // Ensure this path matches where your CSS is saved

const BottomSheet = ({ isVisible, onClose }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.dialog
                    className="bottomSheet"
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
                        <h2>Menu</h2>
                        <button onClick={onClose}>X</button>
                    </div>
                    <div className="bottomSheetContent">
                        {/* Add your content here */}
                    </div>
                </motion.dialog>
            )}
        </AnimatePresence>
    );
};

export default BottomSheet;
