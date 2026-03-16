import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const accionesPredefinidas = [
  // Faltas leves (Negativas)
  { codigo: '48-1', titulo: 'Falta leve', descripcion: 'Atrasarse a las formaciones o actividades establecidas dentro del Centro de Formación Policial, hasta cinco minutos después del horario dispuesto o establecido.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-2', titulo: 'Falta leve', descripcion: 'Atrasarse a su presentación al Centro de Formación Policial o a las actividades que se realicen fuera del mismo, hasta quince minutos después del horario dispuesto o establecido.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-3', titulo: 'Falta leve', descripcion: 'Mantener una postura o comportamiento incorrecto al interior del comedor, bar o áreas destinadas para la alimentación dentro o fuera del centro de formación policial.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-4', titulo: 'Falta leve', descripcion: 'No pedir permiso para ingresar, continuar o salir de una dependencia o formación.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-5', titulo: 'Falta leve', descripcion: 'No emitir la voz de aviso sobre la presencia de un superior jerárquico.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-6', titulo: 'Falta leve', descripcion: 'No dar parte al superior jerárquico, encontrándose como aspirante más antiguo.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-7', titulo: 'Falta leve', descripcion: 'Inobservar las normas de respeto a los símbolos patrios e institucionales al interior o fuera del Centro de Formación Policial.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-8', titulo: 'Falta leve', descripcion: 'No rendir los honores reglamentarios al superior jerárquico.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-9', titulo: 'Falta leve', descripcion: 'Inobservar lo establecido en el reglamento de instrucción policial, cuando el hecho no constituya una falta disciplinaria más grave.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-10', titulo: 'Falta leve', descripcion: 'No trasladarse en binomios, escuadra, sección, pelotón, compañía o grupo.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-11', titulo: 'Falta leve', descripcion: 'No portar, presentar en mal estado o sin la higiene debida, cubiertos, el pañuelo, papel higiénico, servilleta, corta uñas, peinilla, llavero, libreta, esfero u otros implementos de aseo o accesorios que se deben mantener en el uniforme.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-12', titulo: 'Falta leve', descripcion: 'Presentar el calzado sucio.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-13', titulo: 'Falta leve', descripcion: 'No mantener el orden de los pupitres, escritorios o pizarrones en el aula de clase.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-14', titulo: 'Falta leve', descripcion: 'No conservar en buen estado o hacer uso inadecuado de los recursos, bienes, medios educativos o tecnológicos del Centro de Formación Policial; o no comunicar oportunamente cualquier desperfecto a la persona encargada.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-15', titulo: 'Falta leve', descripcion: 'Inobservar el aseo o mantenimiento de los equipos o instrumentos a su cargo, dentro y fuera del Centro de Formación Policia.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-16', titulo: 'Falta leve', descripcion: 'Dejar sucias las áreas destinadas para reproducción y consumo de alimentos.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-17', titulo: 'Falta leve', descripcion: 'Dirigirse de manera descortés a personas civiles al interior de los Centros de Formación Policia.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-18', titulo: 'Falta leve', descripcion: 'No realizar el aseo de las instalaciones cuya limpieza haya sido dispuesta en el Centro de Formación Policial.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-19', titulo: 'Falta leve', descripcion: 'No colocar la placa de identificación en habitaciones, literas, armarios, casilleros u otros enseres asignados.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-20', titulo: 'Falta leve', descripcion: 'No aplicar las reglas de urbanidad, etiqueta o protocolo al momento de servirse los alimentos.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-21', titulo: 'Falta leve', descripcion: 'Obtener comida fuera de la porción que le corresponde al momento de servirse los alimentos.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-22', titulo: 'Falta leve', descripcion: 'Consumir alimentos o bebidas en horarios o lugares no autorizados.', tipo: 'Negativa', puntaje: 0.08 },
  { codigo: '48-23', titulo: 'Falta leve', descripcion: 'Desobedecer órdenes verbales o inobservar el procedimiento establecido.', tipo: 'Negativa', puntaje: 0.08 },
  // Acciones positivas leves
  { codigo: 'N1-L1', titulo: 'Accion leve', descripcion: 'Cumplimiento inmediato de órdenes con eficiencia.', tipo: 'Positiva', puntaje: 0.05 },
  { codigo: 'N1-L2', titulo: 'Accion leve', descripcion: 'Presentación personal reglamentaria destacable.', tipo: 'Positiva', puntaje: 0.06 },
  { codigo: 'N1-L3', titulo: 'Accion leve', descripcion: 'Puntualidad disciplinaria sin atrasos durante 6 días.', tipo: 'Positiva', puntaje: 0.07 },
  { codigo: 'N1-L4', titulo: 'Accion leve', descripcion: 'Observancia disciplinaria sin llamados de atención (sin sanciones leves y medias) por 5 dias consecutivos.', tipo: 'Positiva', puntaje: 0.09 },
  // Acciones positivas destacadas
  { codigo: 'N1-D1', titulo: 'Accion destacada', descripcion: '30 días continuos sin faltas disciplinarias.', tipo: 'Positiva', puntaje: 0.10 },
  { codigo: 'N1-D2', titulo: 'Accion destacada', descripcion: 'Mejora conductual sobresliente certificada.', tipo: 'Positiva', puntaje: 0.12 },
  { codigo: 'N1-D3', titulo: 'Accion destacada', descripcion: 'Rendimiento académico y físico superior al promedio.', tipo: 'Positiva', puntaje: 0.20 },
  { codigo: 'N1-D4', titulo: 'Accion destacada', descripcion: '45 días sin observaciones disciplinarias.', tipo: 'Positiva', puntaje: 0.20 },
];

async function main() {
  console.log('🌱 Iniciando seeding...');

  // 1. Eliminar datos de prueba de tablas (si existen)
  console.log('🗑️ Limpiando datos de prueba...');
  await prisma.accion.deleteMany({});
  await prisma.cadete.deleteMany({});
  await prisma.usuario.deleteMany({});
  console.log('✅ Datos de prueba eliminados');

  // 2. Crear solo acciones predefinidas
  console.log('📋 Creando acciones predefinidas...');
  for (const accion of accionesPredefinidas) {
    await prisma.accionDefinida.upsert({
      where: { codigo: accion.codigo },
      update: accion,
      create: accion,
    });
  }
  console.log(`✅ ${accionesPredefinidas.length} acciones predefinidas creadas`);

  // 3. Crear usuario de prueba
  console.log('👤 Creando usuario de prueba...');
  const passwordHash = await bcrypt.hash('admin123', 10);
  
  await prisma.usuario.create({
    data: {
      nombreU: 'Administrador',
      correoU: 'admin@test.com',
      cedula: '1234567890',
      gradoU: 'Coronel',
      passwordU: passwordHash,
      rol: 'Administrador',
      activo: true,
      confirmarCorreo: true,
      cambioPassword: false
    }
  });
  console.log('✅ Usuario de prueba creado: admin@test.com / admin123');

  console.log('🎉 Seeding completado!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

