import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Sheet } from "react-modal-sheet";

const BottomSheet = ({ isVisible, onClose, title, children }) => {

    return (
        <Sheet isOpen={isVisible} onClose={onClose} snapPoints={[.75]} initialSnap={0}>
            <Sheet.Container>
                <Sheet.Header >
                    <div className="flex justify-between border-b border-black py-2">
                        <button className="flex flex-1 justify-start items-center" onClick={onClose}>
                            <svg className="ml-2" width="32px" height="32px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </button>

                        <div className="flex-1 flex justify-center items-center">
                            <h1 className="text-xl">{title}</h1>
                        </div>
                        <div className="flex-1"></div>
                    </div>
                </Sheet.Header>
                <Sheet.Content>
                    <Sheet.Scroller className="no-scrollbar">{children}</Sheet.Scroller>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop onTap={onClose} className="cursor-default" />
        </Sheet>
    )
}

export default BottomSheet;