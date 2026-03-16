// Datos de los cuadrantes de la Escuela Superior de Policía
export const cuadrantes = {
    1: { 
        nombre: "Cuadrante 1", 
        descripcion: "Área Académica y Dormitorios", 
        color: "from-blue-500 to-blue-700",
        borderColor: "border-blue-400",
        imagen: "/images/mapImages/cuadrante1.png",
        imagenes: ["/images/image1.jpeg", "/images/image5.jpeg", "/images/image6.jpeg"]
    },
    2: { 
        nombre: "Cuadrante 2", 
        descripcion: "Zona Deportiva y Oficial", 
        color: "from-green-500 to-green-700",
        borderColor: "border-green-400",
        imagen: "/images/mapImages/cuadrante2.png",
        imagenes: ["/images/image2.jpeg", "/images/image7.jpeg", "/images/image8.jpeg"]
    },
    3: { 
        nombre: "Cuadrante 3", 
        descripcion: "Dirección y Servicios", 
        color: "from-purple-500 to-purple-700",
        borderColor: "border-purple-400",
        imagen: "/images/mapImages/cuadrante3.png",
        imagenes: ["/images/image3.jpeg", "/images/image9.jpeg", "/images/image10.jpeg"]
    },
    4: { 
        nombre: "Cuadrante 4", 
        descripcion: "Área de Eventos y Recreación", 
        color: "from-orange-400 to-orange-600",
        borderColor: "border-orange-400",
        imagen: "/images/mapImages/cuadrante4.png",
        imagenes: ["/images/image4.jpg", "/images/image1.jpeg", "/images/image2.jpeg"]
    }
};

// Héroes policiales para la vista general
export const heroes = [
    { id: 1, nombre: "Tnte. de Carabineros Héctor Guillermo Cordovez Olmedo", x: 48.2, y: 84, grado: "Teniente", 
        imagenes: [
        "/images/history/Bustos/TNTE. HÉCTOR CORDOVEZ/Captura de pantalla 2026-02-28 110741.png",
        "/images/history/Bustos/TNTE. HÉCTOR CORDOVEZ/Captura de pantalla 2026-02-28 110759.png",
        "/images/history/Bustos/TNTE. HÉCTOR CORDOVEZ/WhatsApp Image 2026-02-28 at 12.10.13 (1).jpeg"
    ] },
    { id: 2, nombre: "Gral. Washington Gerardo Martínez Torres", x: 51.2, y: 68, grado: "General", imagenes: ["/images/image6.jpeg"] },
    { id: 3, nombre: "Myr. Eduardo Zea López", x: 52.3, y: 63, grado: "Mayor", imagenes: ["/images/image5.jpeg"] },
    { id: 4, nombre: "Myr. Galo Miño Jarrín", x: 53, y: 59.7, grado: "Mayor", imagenes: ["/images/image6.jpeg"] },
    { id: 5, nombre: "Cptn. Tuesman Garcés - Héroes del Putumayo", x: 53.7, y: 56, grado: "Capitán", imagenes: ["/images/image7.jpeg"] },
    { id: 6, nombre: "Crnl. Hernán Sergio Barriga Guzmán", x: 54.7, y: 51.7, grado: "Coronel", imagenes: ["/images/image5.jpeg"] },
    { id: 7, nombre: "Comandante General Galo René Flor Pinto", x: 55.2, y: 41.7, grado: "General", imagenes: ["/images/image6.jpeg"] },
    { id: 8, nombre: "Tcnl. de Carabineros Ludgardo Proaño Guerrero", x: 55.3, y: 38.2, grado: "Teniente Coronel", imagenes: ["/images/image7.jpeg"] },
    { id: 9, nombre: "CboP. Víctor Jiménez y CboP. Luis Ruales", x: 55.3, y: 34, grado: "Cabo Primero", imagenes: ["/images/image8.jpeg"] }
];

export const ubicaciones = {
    1: [
        { id: 1, nombre: "Patera", x: 59, y: 33, cuadranteId: 1, imagenes: ["/images/image5.jpeg", "/images/image6.jpeg"] },
        { id: 2, nombre: "Bloque de Aula N.º 2", x: 30, y: 50, cuadranteId: 1, imagenes: ["/images/image5.jpeg"] },
        { id: 3, nombre: "Laboratorio policial", x: 37.5, y: 49, cuadranteId: 1, imagenes: ["/images/image6.jpeg"] },
        { id: 4, nombre: "Lavandería", x: 43, y: 45, cuadranteId: 1, imagenes: ["/images/image5.jpeg"] },
        { id: 5, nombre: "Dormitorios de 1.º año", x: 54, y: 49, cuadranteId: 1, imagenes: ["/images/image5.jpeg", "/images/image6.jpeg"] },
        { id: 6, nombre: "Peluquería", x: 76, y: 51, cuadranteId: 1, imagenes: ["/images/image9.jpeg"] },
        { id: 7, nombre: "Dormitorios de 4.º año", x: 64, y: 55, cuadranteId: 1, imagenes: ["/images/image9.jpeg"] },
        { id: 8, nombre: "Pelotón femenino", x: 70, y: 54, cuadranteId: 1, imagenes: ["/images/image5.jpeg"] },
        { id: 9, nombre: "Bloque de Aulas N.º 1", x: 76, y: 56.4, cuadranteId: 1, imagenes: ["/images/image9.jpeg"] },
        { id: 10, nombre: "Patio de la Lealtad", x: 34, y: 62, cuadranteId: 1, imagenes: ["/images/image9.jpeg"] },
        { id: 11, nombre: "Dormitorios de 3.º año", x: 47, y: 65, cuadranteId: 1, imagenes: ["/images/image9.jpeg"] },
        { id: 12, nombre: "Dormitorios de 2.º año", x: 55.6, y: 63, cuadranteId: 1, imagenes: ["/images/image7.jpeg"] },
        { id: 13, nombre: "Comedor", x: 42, y: 82, cuadranteId: 1, imagenes: ["/images/image9.jpeg"] },
        { id: 14, nombre: "Patio de la Tradición", x: 54.4, y: 78, cuadranteId: 1, imagenes: ["/images/image9.jpeg"] },
        { id: 15, nombre: "Salón Líderes de Paz", x: 32.7, y:83.8, cuadranteId: 1, imagenes: ["/images/image9.jpeg"] }
    ],
    2: [
        { id: 1, nombre: "Dispensario Médico", x: 52, y: 18, cuadranteId: 2, imagenes: ["/images/image8.jpeg"] },
        { id: 2, nombre: "Villa de las Sras. y Sres. Coroneles", x: 61, y: 17, cuadranteId: 2, imagenes: ["/images/image7.jpeg"] },
        { id: 3, nombre: "Cancha sintética", x: 52, y: 29, cuadranteId: 2, imagenes: ["/images/image7.jpeg", "/images/image8.jpeg"] },
        { id: 4, nombre: "Bloque 3 – Dormitorios de los Sres. Oficiales", x: 64.6, y: 30, cuadranteId: 2, imagenes: ["/images/image5.jpeg"] },
        { id: 5, nombre: "Pista de pentatlón", x: 45, y: 68, cuadranteId: 2, imagenes: ["/images/image8.jpeg"] },
        { id: 6, nombre: "Chozón", x: 62, y: 55, cuadranteId: 2, imagenes: ["/images/image7.jpeg"] },
        { id: 7, nombre: "Villas de las Sras. y Sres. Oficiales", x: 63, y: 70, cuadranteId: 2, imagenes: ["/images/image7.jpeg"] },
        { id: 8, nombre: "Casa Blanca", x: 59, y: 81, cuadranteId: 2, imagenes: ["/images/image7.jpeg"] }
    ],
    3: [
        { id: 1, nombre: "Bar", x: 67, y: 7, cuadranteId: 3, capacidad: "100 personas", horario: "07:00 - 19:00", imagenes: ["/images/image9.jpeg"] },
        { id: 2, nombre: "Patio de la Disciplina", x: 55, y: 14, cuadranteId: 3, imagenes: ["/images/image9.jpeg"] },
        { id: 3, nombre: "Piscina", x: 65, y: 15, cuadranteId: 3, imagenes: ["/images/image8.jpeg"] },
        { id: 4, nombre: "Dirección", x: 63.5, y: 25, cuadranteId: 3,imagenes: ["/images/image10.jpeg"] },
        { id: 5, nombre: "Pista atlética y estadio", x: 47.6, y: 47, cuadranteId: 3, imagenes: ["/images/image8.jpeg", "/images/image9.jpeg"] },
        { id: 6, nombre: "Parqueadero ESP", x: 57.6, y: 65, cuadranteId: 3, imagenes: ["/images/image10.jpeg"] },
        { id: 7, nombre: "Mausoleo y Patio de Relevos", x: 55, y: 88, cuadranteId: 3, imagenes: ["/images/image9.jpeg"] },
        { id: 8, nombre: "Dormitorios de las Sras. y Sres. Técnicos Operativos", x: 34, y: 86, cuadranteId: 3, imagenes: ["/images/image5.jpeg"] },
        { id: 9, nombre: "Sala VIP", x: 47, y: 85, cuadranteId: 3, imagenes: ["/images/image10.jpeg"] },
        { id: 10, nombre: "Container", x: 28, y: 68, cuadranteId: 3, imagenes: ["/images/image9.jpeg"] }
    ],
    4: [
        { id: 1, nombre: "Campo de ceremonias", x: 40, y: 35, cuadranteId: 4, imagenes: ["/images/image9.jpeg"] },
        { id: 2, nombre: "Picadero", x: 72, y: 35, cuadranteId: 4, imagenes: ["/images/image8.jpeg"] },
        { id: 3, nombre: "Canchas de tenis", x: 37, y: 83.6, cuadranteId: 4, imagenes: ["/images/image7.jpeg"] },
        { id: 4, nombre: "CrossFit", x: 75, y: 92, cuadranteId: 4, imagenes: ["/images/image8.jpeg"] },
        { id: 5, nombre: "Auditorio", x: 68.7, y: 87, cuadranteId: 4, imagenes: ["/images/image10.jpeg"] },
        { id: 6, nombre: "Departamento de EE. FF.", x: 76.5, y: 82, cuadranteId: 4, imagenes: ["/images/image8.jpeg"] },
        { id: 7, nombre: "Prevención ESP", x: 21, y: 88, cuadranteId: 4, imagenes: ["/images/image10.jpeg"] },
        { id: 8, nombre: "Coliseo", x: 57, y: 88, cuadranteId: 4, imagenes: ["/images/image8.jpeg"] },
        { id: 9, nombre: "Tatami", x: 60, y: 78, cuadranteId: 4, imagenes: ["/images/image8.jpeg"] },
        { id: 10, nombre: "Gimnasio", x: 53.5, y: 77, cuadranteId: 4, imagenes: ["/images/image8.jpeg"] },
        { id: 11, nombre: "Caballerizas", x: 80.4, y: 93, cuadranteId: 4, imagenes: ["/images/image7.jpeg"] }
    ]
};
