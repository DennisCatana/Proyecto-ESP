const BackgroundCarousel = ({ images }) => {

    return (
        <>
            {/* Animación */}
            <style>{`
                @keyframes fadeSlide {
                    0% { opacity: 0; }
                    10% { opacity: 1; }
                    40% { opacity: 1; }
                    50% { opacity: 0; }
                    100% { opacity: 0; }
                }

                .animate-fade-slide {
                    animation: fadeSlide 10s infinite;
                }
            `}</style>

            {/* Fondo */}
            <div className="fixed inset-0 z-0">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 animate-fade-slide"
                        style={{
                            backgroundImage: `url(${img})`,
                            animationDelay: `${index * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Overlay oscuro */}
            <div className="fixed inset-0 bg-black/40 z-10"></div>
        </>
    );
};

export default BackgroundCarousel;