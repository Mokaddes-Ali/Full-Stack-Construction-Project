import { Component, Fragment } from 'react';
import { motion } from 'framer-motion';

class PageTitle extends Component {
    render() {
        
        return (
            <Fragment>
                <div className="relative w-full min-h-[300px] bg-fixed bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://themewagon.github.io/restoran/img/bg-hero.jpg')" }}>
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center">
                        <motion.h1
                            className="text-white text-4xl font-bold tracking-wide"
                            initial={{ opacity: 0, y: -100 }}   
                            animate={{ opacity: 1, y: 0 }}   
                            transition={{ duration: 1.25 }}     
                        >
                            {this.props.PageTitle}
                        </motion.h1>
                        <motion.h1
                            className="text-white text-4xl font-bold tracking-wide"
                            initial={{ opacity: 0, y: -100 }}   
                            animate={{ opacity: 1, y: 0 }}   
                            transition={{ duration: 1.25 }}     
                        >
                            Home/About{this.props.PageTitle1}
                        </motion.h1>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default PageTitle;