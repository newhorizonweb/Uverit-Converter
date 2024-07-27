


import { motion } from 'framer-motion';

const PageTransition = (Component: React.ComponentType) => {
    return () => (
        <>
            <motion.div
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                
                transition={{
                    duration:0.25,
                    ease: "easeInOut"
                }}
            >

                <Component />

            </motion.div>
        </>
    );
}
 
export default PageTransition;
