import React from "react";

const PDFLayout = ({
    title,
    subtitle,
    logo,
    data,
    layout = "grid"
}) => {

    const isPyramid = layout === "pyramid";

    return (
        <div
            style={{
                width: "794px",
                minHeight: "1123px",
                background: "linear-gradient(180deg, #0f2d5c 0%, #f3f4f6 45%)",
                padding: "60px",
                fontFamily: "Arial",
                position: "relative"
            }}
        >
            {/* Logo */}
            {logo && (
                <div style={{ position: "absolute", top: 40, left: 60 }}>
                    <img src={logo} alt="logo" width="120" />
                </div>
            )}

            {/* Encabezado */}
            <div style={{ textAlign: "right", color: "white" }}>
                <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
                    {title}
                </h1>
                {subtitle && (
                    <p style={{ fontSize: "16px" }}>{subtitle}</p>
                )}
            </div>

            {/* Contenedor personas */}
            <div
                style={{
                    marginTop: "100px",
                    display: "grid",
                    gridTemplateColumns: isPyramid
                        ? "repeat(3, 1fr)"
                        : "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "50px",
                    justifyItems: "center"
                }}
            >
                {data.map((person, index) => (
                    <div key={index} style={{ textAlign: "center" }}>
                        {/* Imagen circular */}
                        <div
                            style={{
                                width: "140px",
                                height: "140px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                border: "5px solid #1e3a8a",
                                margin: "0 auto"
                            }}
                        >
                            <img
                                src={person.image}
                                alt={person.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </div>

                        {/* Nombre */}
                        <div
                            style={{
                                marginTop: "12px",
                                backgroundColor: "#1e3a8a",
                                color: "white",
                                padding: "6px",
                                fontWeight: "bold",
                                fontSize: "14px"
                            }}
                        >
                            {person.name}
                        </div>

                        {/* Cargo */}
                        <div
                            style={{
                                backgroundColor: "#6b7280",
                                color: "white",
                                padding: "5px",
                                fontSize: "12px"
                            }}
                        >
                            {person.phrase}
                        </div>
                    </div>
                ))}
            </div>

            {/* Fecha */}
            <div
                style={{
                    position: "absolute",
                    bottom: 40,
                    right: 60,
                    color: "#999",
                    fontSize: "12px"
                }}
            >
                {new Date().toLocaleDateString()}
            </div>
        </div>
    );
};

export default PDFLayout;