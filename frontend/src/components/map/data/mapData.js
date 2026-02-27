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
    { id: 1, nombre: "Tte. de Carabineros Héctor Guillermo Cordovez Olmedo", x: 48.2, y: 84, grado: "Teniente", descripcion: "Héroe policial caído en cumplimiento del deber", imagenes: ["/images/image5.jpeg"] },
    { id: 2, nombre: "Gral. Washington Gerardo Martínez Torres", x: 51.2, y: 68, grado: "General", descripcion: "Ex Comandante General de la Policía Nacional", imagenes: ["/images/image6.jpeg"] },
    { id: 3, nombre: "Mayr. Eduardo Zea López", x: 52.3, y: 63, grado: "Mayor", descripcion: "Héroe policial caído en cumplimiento del deber", imagenes: ["/images/image5.jpeg"] },
    { id: 4, nombre: "Myr. Galo Miño Jarrín", x: 53, y: 59.7, grado: "Myor", descripcion: "Héroe policial caído en cumplimiento del deber", imagenes: ["/images/image6.jpeg"] },
    { id: 5, nombre: "Cptn. Tuesman Garcés - Héroes del Putumayo", x: 53.7, y: 56, grado: "Capitán", descripcion: "Héroe de la Guerra del Putumayo", imagenes: ["/images/image7.jpeg"] },
    { id: 6, nombre: "Coronel Sr. Hernán Sergio Barriga Guzmán", x: 54.7, y: 51.7, grado: "Coronel", descripcion: "Ex autoridad policial", imagenes: ["/images/image5.jpeg"] },
    { id: 7, nombre: "Cmdte. General Galo René Flor Pinto", x: 55.2, y: 41.7, grado: "Comandante General", descripcion: "Ex Comandante General de la Policía Nacional", imagenes: ["/images/image6.jpeg"] },
    { id: 8, nombre: "Tcrnl. de Carabineros Ludgardo Proaño Guerrero", x: 55.3, y: 38.2, grado: "Teniente Coronel", descripcion: "Héroe policial caído en cumplimiento del deber", imagenes: ["/images/image7.jpeg"] },
    { id: 9, nombre: "CBOP. Víctor Jiménez - CBOP. Luis Ruales", x: 55.3, y: 34, grado: "CBOP", descripcion: "En honor a los señores héroes caídos", imagenes: ["/images/image8.jpeg"] }
];

export const ubicaciones = {
    1: [
        { id: 1, nombre: "Patera", x: 59, y: 33, descripcion: "Aulas para clases teóricas de 2.º año. Cuenta con capacidad para 80 personas y está equipado con modernas instalaciones educativas.", capacidad: "80 personas", horario: "07:00 - 18:00", imagenes: ["/images/image5.jpeg", "/images/image6.jpeg"] },
        { id: 2, nombre: "Bloque de Aula N.º 2", x: 30, y: 50, descripcion: "Dormitorios del segundo año de formación. Instalaciones adecuadas para 45 cadetes.", capacidad: "45 camas", horario: "24 horas", imagenes: ["/images/image5.jpeg"] },
        { id: 3, nombre: "Laboratorio policial", x: 37.5, y: 49, descripcion: "Alojamiento exclusivo para personal femenino de la institución.", capacidad: "30 camas", horario: "24 horas", imagenes: ["/images/image6.jpeg"] },
        { id: 4, nombre: "Lavandería", x: 43, y: 45, descripcion: "Dormitorios del primer año de formación policial.", capacidad: "50 camas", horario: "24 horas", imagenes: ["/images/image5.jpeg"] },
        { id: 5, nombre: "Dormitorios de 1.º año", x: 54, y: 49, descripcion: "Aulas principales y laboratorio de informática. Centro de formación académica.", capacidad: "100 personas", horario: "07:00 - 20:00", imagenes: ["/images/image5.jpeg", "/images/image6.jpeg"] },
        { id: 6, nombre: "Peluquería", x: 76, y: 51, descripcion: "Espacio ceremonial y formación. Sede de actos importantes.", capacidad: "500 personas", horario: "06:00 - 22:00", imagenes: ["/images/image9.jpeg"] },
        { id: 7, nombre: "Dormitorios de 4.º año", x: 65, y: 55, descripcion: "Museo al aire libre y ceremonias tradicionales de la institución.", capacidad: "300 personas", horario: "07:00 - 18:00", imagenes: ["/images/image9.jpeg"] },
        { id: 8, nombre: "Pelotón femenino", x: 70, y: 54, descripcion: "Dormitorios de cadetes superiores en su etapa final de formación.", capacidad: "60 camas", horario: "24 horas", imagenes: ["/images/image5.jpeg"] },
        { id: 9, nombre: "Bloque de Aulas N.º 1", x: 76, y: 56.4, descripcion: "Museo al aire libre y ceremonias tradicionales de la institución.", capacidad: "300 personas", horario: "07:00 - 18:00", imagenes: ["/images/image9.jpeg"] },
        { id: 10, nombre: "Patio de la Lealtad", x: 34, y: 62, descripcion: "Museo al aire libre y ceremonias tradicionales de la institución.", capacidad: "300 personas", horario: "07:00 - 18:00", imagenes: ["/images/image9.jpeg"] },
        { id: 11, nombre: "Dormitorios de 3.º año", x: 47, y: 65, descripcion: "Museo al aire libre y ceremonias tradicionales de la institución.", capacidad: "300 personas", horario: "07:00 - 18:00", imagenes: ["/images/image9.jpeg"] },
        { id: 12, nombre: "Dormitorios de 2.º año", x: 55.6, y: 63, descripcion: "Comedor principal de la institución con capacidad para 200 comensales.", capacidad: "200 personas", horario: "06:00 - 21:00", imagenes: ["/images/image7.jpeg"] },
        { id: 13, nombre: "Comedor", x: 40, y: 82, descripcion: "Museo al aire libre y ceremonias tradicionales de la institución.", capacidad: "300 personas", horario: "07:00 - 18:00", imagenes: ["/images/image9.jpeg"] },
        { id: 14, nombre: "Patio de la Tradición", x: 54.4, y: 78, descripcion: "Museo al aire libre y ceremonias tradicionales de la institución.", capacidad: "300 personas", horario: "07:00 - 18:00", imagenes: ["/images/image9.jpeg"] }
    ],
    2: [
        { id: 1, nombre: "Dispensario Médico", x: 20, y: 15, descripcion: "Atención médica y primeros auxilios disponible las 24 horas.", capacidad: "10 personas", horario: "24 horas", imagenes: ["/images/image8.jpeg"] },
        { id: 2, nombre: "Villa de las Sras. y Sres. Coroneles", x: 35, y: 25, descripcion: "Alojamiento de oficiales de alto rango.", capacidad: "8 familias", horario: "24 horas", imagenes: ["/images/image7.jpeg"] },
        { id: 3, nombre: "Cancha sintética", x: 50, y: 35, descripcion: "Canchas de fútbol y vóley para práctica deportiva.", capacidad: "22 jugadores", horario: "06:00 - 21:00", imagenes: ["/images/image7.jpeg", "/images/image8.jpeg"] },
        { id: 4, nombre: "Bloque 3 – Dormitorios de los Sres. Oficiales", x: 30, y: 50, descripcion: "Alojamiento para oficiales en formación.", capacidad: "40 personas", horario: "24 horas", imagenes: ["/images/image5.jpeg"] },
        { id: 5, nombre: "Pista de pentatlón", x: 60, y: 45, descripcion: "Pista especializada para pruebas de pentatlón militar.", capacidad: "15 atletas", horario: "05:00 - 21:00", imagenes: ["/images/image8.jpeg"] },
        { id: 6, nombre: "Chozón", x: 85, y: 55, descripcion: "Residencia oficial del Director y eventos especiales.", capacidad: "50 personas", horario: "08:00 - 20:00", imagenes: ["/images/image7.jpeg"] },
        { id: 7, nombre: "Villas de las Sras. y Sres. Oficiales", x: 75, y: 30, descripcion: "Complejo residencial para oficiales y sus familias.", capacidad: "20 familias", horario: "24 horas", imagenes: ["/images/image7.jpeg"] },
        { id: 8, nombre: "Casa Blanca", x: 85, y: 55, descripcion: "Residencia oficial del Director y eventos especiales.", capacidad: "50 personas", horario: "08:00 - 20:00", imagenes: ["/images/image7.jpeg"] }
    ],
    3: [
        { id: 8, nombre: "Bar", x: 80, y: 70, descripcion: "Homenaje a héroes institucionales caídos en cumplimiento del deber.", capacidad: "100 personas", horario: "07:00 - 19:00", imagenes: ["/images/image9.jpeg"] },
        { id: 1, nombre: "Patio de la Disciplina", x: 15, y: 20, descripcion: "Espacio de formación militar y desfiles ceremoniales.", capacidad: "400 personas", horario: "05:30 - 07:00", imagenes: ["/images/image9.jpeg"] },
        { id: 2, nombre: "Piscina", x: 30, y: 30, descripcion: "Piscina semiolímpica cubierta para entrenamiento de nadadores.", capacidad: "50 nadadores", horario: "06:00 - 20:00", imagenes: ["/images/image8.jpeg"] },
        { id: 3, nombre: "Dirección", x: 50, y: 25, descripcion: "Oficinas administrativas y rectorado de la institución.", capacidad: "30 personas", horario: "08:00 - 17:00", imagenes: ["/images/image10.jpeg"] },
        { id: 4, nombre: "Pista atlética y estadio", x: 25, y: 50, descripcion: "Estadio y pista de atletismo profesional con graderíos.", capacidad: "2000 espectadores", horario: "05:00 - 21:00", imagenes: ["/images/image8.jpeg", "/images/image9.jpeg"] },
        { id: 5, nombre: "Parqueadero ESP", x: 60, y: 45, descripcion: "Estacionamiento para personal y visitantes de la institución.", capacidad: "150 vehículos", horario: "24 horas", imagenes: ["/images/image10.jpeg"] },
        { id: 5, nombre: "Parqueadero ESP", x: 60, y: 45, descripcion: "Estacionamiento para personal y visitantes de la institución.", capacidad: "150 vehículos", horario: "24 horas", imagenes: ["/images/image10.jpeg"] },
        { id: 8, nombre: "Mausoleo y Patio de Relevos", x: 80, y: 70, descripcion: "Homenaje a héroes institucionales caídos en cumplimiento del deber.", capacidad: "100 personas", horario: "07:00 - 19:00", imagenes: ["/images/image9.jpeg"] },
        { id: 6, nombre: "Dormitorios de las Sras. y Sres. Técnicos Operativos", x: 75, y: 35, descripcion: "Alojamiento para personal técnico de la institución.", capacidad: "35 personas", horario: "24 horas", imagenes: ["/images/image5.jpeg"] },
        { id: 7, nombre: "Sala VIP", x: 55, y: 60, descripcion: "Salón de eventos y recepciones oficiales.", capacidad: "80 personas", horario: "08:00 - 22:00", imagenes: ["/images/image10.jpeg"] },
        { id: 8, nombre: "Mausoleo y Patio de Relevos", x: 80, y: 70, descripcion: "Homenaje a héroes institucionales caídos en cumplimiento del deber.", capacidad: "100 personas", horario: "07:00 - 19:00", imagenes: ["/images/image9.jpeg"] }
    ],
    4: [
        { id: 1, nombre: "Campo de ceremonias", x: 20, y: 15, descripcion: "Ceremonias oficiales y desfiles masivos de la institución.", capacidad: "3000 personas", horario: "06:00 - 20:00", imagenes: ["/images/image9.jpeg"] },
        { id: 2, nombre: "Picadero", x: 35, y: 25, descripcion: "Pista de equitación cubierta para entrenamiento hípico.", capacidad: "12 jinetes", horario: "06:00 - 18:00", imagenes: ["/images/image8.jpeg"] },
        { id: 3, nombre: "Canchas de tenis", x: 25, y: 40, descripcion: "4 canchas de tenis profesionales con iluminación.", capacidad: "8 jugadores", horario: "06:00 - 21:00", imagenes: ["/images/image7.jpeg"] },
        { id: 4, nombre: "Gimnasio", x: 45, y: 35, descripcion: "Gimnasio completamente equipado para entrenamiento físico.", capacidad: "50 personas", horario: "05:00 - 22:00", imagenes: ["/images/image8.jpeg"] },
        { id: 5, nombre: "Auditorio", x: 60, y: 25, descripcion: "Auditorio principal para eventos y conferencias.", capacidad: "500 personas", horario: "08:00 - 22:00", imagenes: ["/images/image10.jpeg"] },
        { id: 6, nombre: "Departamento de EE. FF.", x: 50, y: 50, descripcion: "Departamento de educación física y deportes.", capacidad: "30 personas", horario: "07:00 - 19:00", imagenes: ["/images/image8.jpeg"] },
        { id: 7, nombre: "Prevención ESP", x: 70, y: 40, descripcion: "Oficinas de seguridad y prevención institucional.", capacidad: "20 personas", horario: "24 horas", imagenes: ["/images/image10.jpeg"] },
        { id: 8, nombre: "Coliseo", x: 80, y: 55, descripcion: "Coliseo cubierto para eventos deportivos y culturales.", capacidad: "1500 espectadores", horario: "06:00 - 22:00", imagenes: ["/images/image8.jpeg"] },
        { id: 9, nombre: "Tatami", x: 75, y: 70, descripcion: "Sala de artes marciales y judo para entrenamiento.", capacidad: "30 personas", horario: "06:00 - 21:00", imagenes: ["/images/image8.jpeg"] },
        { id: 10, nombre: "Caballerizas", x: 90, y: 75, descripcion: "Establo para caballos oficiales de la institución.", capacidad: "20 caballos", horario: "05:00 - 20:00", imagenes: ["/images/image7.jpeg"] }
    ]
};
