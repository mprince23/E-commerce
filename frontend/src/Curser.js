import React, { useEffect, useState } from 'react';
import './index.css'; // Assuming you keep the CSS part separate


const CustomCursor = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    // Update cursor position when mouse moves
    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({
                x: e.clientX - 20,  // Adjust for center alignment
                y: e.clientY - 20,  // Adjust for center alignment
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);


    return (
        <>
            <div id="cursor" className="cursor">
                <div
                    className="ring"
                    style={{
                        transform: `translateX(${cursorPosition.x}px) translateY(${cursorPosition.y}px)`,
                    }}
                >
                    <div></div>
                </div>
                <div
                    className="ring"
                    style={{
                        transform: `translateX(${cursorPosition.x}px) translateY(${cursorPosition.y}px)`,
                    }}
                >
                    <div></div>
                </div>
            </div>
        </>
    );
};

export default CustomCursor;
