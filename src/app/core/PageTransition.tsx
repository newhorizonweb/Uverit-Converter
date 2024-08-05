


import { motion } from 'framer-motion';



const PageTransition =
<P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => (

        <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            
            transition={{
                duration:0.25,
                ease: "easeInOut"
            }}
        >

            <Component {...props} />
            
        </motion.div>

    );
}
 
export default PageTransition;
