// src/pages/api/footer-data.js
import { getServicesIndexed, getIndustriesIndexed, getSolutionsIndexed, getSubServices } from '@/lib/content';

export default async function handler(req, res) {
  const { locale = 'es' } = req.query;

  try {
    // 1. Obtener servicios principales
    const mainServices = await getServicesIndexed(locale, true);
    
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
        // Obtener subservicios
        const serviceId = service.route.split('/').pop();
        const subServices = await getSubServices(serviceId, locale);
        
        // Agregar el servicio principal con identificador
        servicesWithSubs.push({
          title: service.title,
          route: service.route,
          isMainService: true  // Identificador para servicios padre
        });

        // Agregar los subservicios
        const formattedSubServices = subServices
          .filter(sub => sub && sub.title)
          .map(sub => ({
            title: sub.title,
            route: `/services/${serviceId}/${sub.id}`,
            isMainService: false  // Los subservicios no son servicios principales
          }));

        servicesWithSubs = [...servicesWithSubs, ...formattedSubServices];
      }
    }

    // 4. Obtener y ordenar industrias y soluciones
    const [industries, solutions] = await Promise.all([
      getIndustriesIndexed(locale),
      getSolutionsIndexed(locale)
    ]);

    // 5. Preparar los arrays finales
    const processedIndustries = industries
      .filter(item => item && item.title)
      .map(item => ({
        title: Array.isArray(item.title) ? item.title[0] : item.title,
        route: item.route
      }))
      .sort((a, b) => a.title.localeCompare(b.title, locale));

    const processedSolutions = solutions
      .filter(item => item && item.title)
      .map(item => ({
        title: Array.isArray(item.title) ? item.title[0] : item.title,
        route: item.route
      }))
      .sort((a, b) => a.title.localeCompare(b.title, locale));

    // 6. Enviar respuesta
    res.status(200).json({
      services: servicesWithSubs,
      industries: processedIndustries,
      solutions: processedSolutions
    });

  } catch (error) {
    console.error('Error completo en footer-data:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to fetch data',
      details: error.message 
    });
  }
}