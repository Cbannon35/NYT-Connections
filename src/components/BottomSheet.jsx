import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Sheet } from "react-modal-sheet";

// const BottomSheet = ({ isVisible, onClose, title, children }) => {
//     const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
//     const bgRef = useRef(null);
//     const sheetRef = useRef(null);

//     useEffect(() => {
//         const handleResize = () => setViewportHeight(window.innerHeight);
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     useEffect(() => {
//         console.log("yooooooo")
//         const preventScroll = (event) => {
//             console.log("prevent scroll")
//             event.preventDefault();
//         };
//         const preventProp = (event) => {
//             console.log("prevent prop")
//             event.stopPropagation();
//         };
//         if (bgRef.current) {
//             // ref.current.addEventListener('touchmove', preventScroll, { passive: false });
//             bgRef.current.addEventListener('scroll', preventScroll, { passive: false });
//             bgRef.current.addEventListener('mousewheel', preventScroll, { passive: false });
//         }
//         if (sheetRef.current) {
//             sheetRef.current.addEventListener('scroll', preventProp, { passive: false });
//             sheetRef.current.addEventListener('mousewheel', preventProp, { passive: false });
//         }
//         return () => {
//             if (bgRef.current) {
//                 console.log("removing event listener bs");
//                 // ref.current.removeEventListener('touchmove', preventScroll, { passive: false });
//                 bgRef.current.removeEventListener('scroll', preventScroll, { passive: false });
//                 bgRef.current.removeEventListener('mousewheel', preventScroll, { passive: false });
//             };
//             if (sheetRef.current) {
//                 console.log("removing event listener bs");
//                 sheetRef.current.removeEventListener('scroll', preventProp, { passive: false });
//                 sheetRef.current.removeEventListener('mousewheel', preventProp, { passive: false });
//             }
//         }
//     }, []);

//     const initialY = viewportHeight * 0.00; // 35% from the top

//     return (
//         <AnimatePresence>
//             {isVisible && (
//                 <>
//                     <motion.div
//                         ref={bgRef}
//                         className="w-screen h-screen bg-black bg-opacity-10 fixed top-0 left-0 z-1"
//                         id={"backdrop"}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         onTap={onClose}
//                     />
//                     <motion.dialog
//                         ref={sheetRef}
//                         className="fixed flex flex-col bottom-0 left-0 w-full bg-white p-4 z-3 rounded-t-xl min-h-[60vh]"
//                         initial={{ y: "100%" }}
//                         animate={{ y: initialY }}
//                         exit={{ y: "100%" }}
//                         transition={{ type: "spring", stiffness: 600, damping: 35 }}
//                         drag="y"
//                         dragConstraints={{ top: initialY, bottom: initialY }}
//                         dragElastic={0.1}
//                         onDragEnd={(event, info) => {
//                             if (info.offset.y > 200) {
//                                 onClose();
//                             }
//                         }}
//                     >
//                         <div className="flex justify-between border-b border-black">
//                             <div></div>
//                             <h1 className="text-xl">{title}</h1>
//                             <button onClick={onClose}>
//                                 <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
//                             </button>
//                         </div>
//                         <div className="absolute pt-2">
//                             {children}
//                         </div>
//                     </motion.dialog>
//                 </>
//             )}
//         </AnimatePresence>
//     );
// };

// export default BottomSheet;


const BottomSheet = ({ isVisible, onClose, title, children }) => {

    return (
        <Sheet isOpen={isVisible} onClose={onClose} snapPoints={[.75]} initialSnap={0}>
            <Sheet.Container>
                <Sheet.Header />
                <div className="flex justify-between border-b border-black">
                    <div className="flex-1"></div>
                    <div className="flex-1 flex justify-center">
                        <h1 className="text-xl">{title}</h1>
                    </div>
                    <button className="flex flex-1 justify-end" onClick={onClose}>
                        <svg className="mr-2" width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </button>
                </div>
                <Sheet.Content>
                    <Sheet.Scroller className="no-scrollbar">{children}</Sheet.Scroller>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop onTap={onClose} className="cursor-default" />
        </Sheet>
    )
}

export default BottomSheet;