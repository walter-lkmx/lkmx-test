// src/pages/api/footer-data.js
import path from 'path';
import { promises as fs } from 'fs';
import { getServicesIndexed, getIndustriesIndexed, getSolutionsIndexed, getSubServices } from '@/lib/content';

export default async function handler(req, res) {
  const { locale = 'es' } = req.query;

  // Agregar log para debugging en producción
  console.log('Current working directory:', process.cwd());
  console.log('Requested locale:', locale);

  try {
    // Verificar que las rutas existan antes de procesar
    const contentRoot = path.join(process.cwd(), 'src', 'content');
    
    try {
      await fs.access(contentRoot);
      console.log('Content directory exists:', contentRoot);
    } catch (error) {
      console.error('Content directory not accessible:', error);
      throw new Error(`Content directory not accessible: ${contentRoot}`);
    }

    // 1. Obtener servicios principales con manejo de errores
    let mainServices;
    try {
      mainServices = await getServicesIndexed(locale, true);
      console.log('Main services fetched successfully');
    } catch (error) {
      console.error('Error fetching main services:', error);
      throw new Error(`Failed to fetch main services: ${error.message}`);
    }
    
    // 2. Definir el orden específico de los servicios principales
    const serviceOrder = [
      { id: 'consulting', title: locale === 'es' ? 'Consultoría' : 'Consulting' },
      { id: 'engineering', title: locale === 'es' ? 'Ingeniería' : 'Engineering' },
      { id: 'teams', title: locale === 'es' ? 'Equipos' : 'Teams' }
    ];

    // 3. Mapear y ordenar los servicios principales según el orden definido
    let servicesWithSubs = [];

    for (const orderItem of serviceOrder) {
      const service = mainServices.find(s => {
        const serviceId = s.route.split('/').pop();
        return serviceId === orderItem.id;
      });

      if (service) {
        try {
          // Obtener subservicios con manejo de errores específico
          const serviceId = service.route.split('/').pop();
          const subServices = await getSubServices(serviceId, locale);
          console.log(`Subservices fetched for ${serviceId}`);
          
          // Agregar el servicio principal con identificador
          servicesWithSubs.push({
            title: service.title,
            route: service.route,
            isMainService: true
          });

          // Agregar los subservicios
          if (Array.isArray(subServices)) {
            const formattedSubServices = subServices
              .filter(sub => sub && sub.title)
              .map(sub => ({
                title: sub.title,
                route: `/services/${serviceId}/${sub.id}`,
                isMainService: false
              }));

            servicesWithSubs = [...servicesWithSubs, ...formattedSubServices];
          }
        } catch (error) {
          console.error(`Error processing service ${orderItem.id}:`, error);
          // Continuar con el siguiente servicio en caso de error
          continue;
        }
      }
    }

    // 4. Obtener y ordenar industrias y soluciones con manejo de errores
    let industries, solutions;
    try {
      [industries, solutions] = await Promise.all([
        getIndustriesIndexed(locale),
        getSolutionsIndexed(locale)
      ]);
      console.log('Industries and solutions fetched successfully');
    } catch (error) {
      console.error('Error fetching industries or solutions:', error);
      throw new Error(`Failed to fetch industries or solutions: ${error.message}`);
    }

    // 5. Preparar los arrays finales con validaciones adicionales
    const processedIndustries = (industries || [])
      .filter(item => item && item.title)
      .map(item => ({
        title: Array.isArray(item.title) ? item.title[0] : item.title,
        route: item.route
      }))
      .sort((a, b) => a.title.localeCompare(b.title, locale));

    const processedSolutions = (solutions || [])
      .filter(item => item && item.title)
      .map(item => ({
        title: Array.isArray(item.title) ? item.title[0] : item.title,
        route: item.route
      }))
      .sort((a, b) => a.title.localeCompare(b.title, locale));

    // 6. Enviar respuesta
    const response = {
      services: servicesWithSubs,
      industries: processedIndustries,
      solutions: processedSolutions
    };

    console.log('Successfully processed all data');
    res.status(200).json(response);

  } catch (error) {
    console.error('Error completo en footer-data:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to fetch data',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}