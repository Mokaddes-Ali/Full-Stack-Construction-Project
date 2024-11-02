import { useEffect, useRef } from 'react'
import gsap from 'gsap';
export default function MouseCursor() {

   const mouse = useRef({x: 0, y: 0});
    const circle = useRef();
    const size = 30;
    const manageMouseMove = (e) => {
        const { clientX, clientY } = e;
        mouse.current = {
            x: clientX,
            y: clientY
        }
        moveCircle(mouse.current.x, mouse.current.y);
    }
    const moveCircle = (x, y) => {
        gsap.set(circle.current, {x, y, xPercent: -50, yPercent: -50})

    }
    useEffect( () => {

        window.addEventListener("mousemove", manageMouseMove);
        return () => {
            window.removeEventListener("mousemove", manageMouseMove);

        }
    }, [])

    return (

        <div className='relative h-screen'>
            <div 
                ref={circle}
                style={{
                    backgroundColor: "#BCE4F2",
                    width: size,
                    height: size,
                }}
                className='top-0 left-0 fixed rounded-full'/>
        </div>
    )

}
