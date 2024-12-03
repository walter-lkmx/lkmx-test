export default function getProjectsIndexed(locale) {
    const projectsEs = [
      {
        title: ["Secret Network"],
        services: ["Web3 Project Digital Brand"],
        route: "/work/secret-network",
        thumbnail: "scrt-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Frazer"],
        services: ["Document Manager, ERP integrations"],
        route: "/work/frazer",
        thumbnail: "frazer-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Primera Fila"],
        services: ["Booking System"],
        route: "/work/primera-fila",
        thumbnail: "pfila-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Spectrum Wine"],
        services: ["Mobile App"],
        route: "/work/spectrum-wine",
        thumbnail: "spectrum-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Only Golfers"],
        services: [, "Continuous Support"],
        route: "/work/only-golfers",
        thumbnail: "og-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Las Cañadas"],
        services: ["HR System, Engineering Team, Booking System"],
        route: "/work/water-park",
        thumbnail: "cañadas-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Bel-Air Athletics"],
        services: ["E-commerce"],
        route: "/work/e-commerce-ws",
        thumbnail: "belair-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Emprops-AI"],
        services: ["Art Marketplace, Web3 Project"],
        route: "/work/emprops",
        thumbnail: "emprops-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Vitromex"],
        services: ["ERP"],
        route: "/work/vitromex",
        thumbnail: "vitromex-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Suspiros"],
        services: ["E-commerce"],
        route: "/work/suspiros",
        thumbnail: "suspiros-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Solar Fortún"],
        services: ["E-commerce"],
        route: "/work/solarfortun",
        thumbnail: "solarfortun-thumbnail",
        catchphrase: "",
      },
      {
        title: ["ACIR Radio"],
        services: ["Mobile App"],
        route: "/work/acir",
        thumbnail: "acir-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Casa Hogar del Anciano"],
        services: ["Digital Brand"],
        route: "/work/casa-hogar-del-anciano",
        thumbnail: "casa-anciano-thumbnail",
        catchphrase: "",
      },
      {
        title: ["FOS"],
        services: ["E-commerce, Digital Brand"],
        route: "/work/fos",
        thumbnail: "fos-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Earth Bar"],
        services: ["E-commerce"],
        route: "/work/earth-bar",
        thumbnail: "earthbar-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Drive Beehive"],
        services: ["Mobile App"],
        route: "/work/drive-beehive",
        thumbnail: "drive-beehive-thumbnail",
        catchphrase: "",
      },

      // {
      //   title: ["Administrador de", "casos legales"],
      //   services: [],
      //   route: "/work/legal-case-manager",
      //   thumbnail: "legal-thumbnail",
      //   catchphrase:
      //     "Unificando operaciones legales y de salud a través de una mejor conectividad.",
      // },
      // {
      //   title: ["CRM de bienes Raíces"],
      //   services: [],
      //   route: "/work/real-state-crm",
      //   thumbnail: "avittat-thumbnail",
      //   catchphrase:
      //     "Mejorando operaciones de venta de bienes raíces con un CRM a medida.",
      // },
      // {
      //   title: [
      //     "Plataforma innovadora para",
      //     "la producción de prendas únicas",
      //   ],
      //   services: [],
      //   route: "/work/skyou",
      //   thumbnail: "skyou-thumbnail",
      //   catchphrase:
      //     "La libertad de elegir, la facilidad de imprimir, moda personalizada al alcance de tus manos.",
      // },

      //,
      // {
      //     title: ["Sistema nacional de hospitales"],
      //     services: [],
      //     route: "/work/national-hospital-system",
      //     thumbnail: "hospitals-thumbnail"

      // },
      // {
      //     title: ["Sistema de análisis de", "datos para farmacéuticas"],
      //     services: [],
      //     route: "/work/pharma-analytics",
      //     thumbnail: "pharma-thumbnail"

      // }
    ];
    const projectsEn = [
      {
        title: ["Secret Network"],
        services: ["Web3 Project Digital Brand"],
        route: "/work/secret-network",
        thumbnail: "scrt-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Frazer"],
        services: ["Document Manager, ERP integrations"],
        route: "/work/frazer",
        thumbnail: "frazer-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Primera Fila"],
        services: ["Booking System"],
        route: "/work/primera-fila",
        thumbnail: "pfila-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Spectrum Wine"],
        services: ["Mobile App"],
        route: "/work/spectrum-wine",
        thumbnail: "spectrum-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Only Golfers"],
        services: [, "Continuous Support"],
        route: "/work/only-golfers",
        thumbnail: "og-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Las Cañadas"],
        services: ["HR System, Engineering Team, Booking System"],
        route: "/work/water-park",
        thumbnail: "cañadas-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Bel-Air Athletics"],
        services: ["E-commerce"],
        route: "/work/e-commerce-ws",
        thumbnail: "belair-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Emprops-AI"],
        services: ["Art Marketplace, Web3 Project"],
        route: "/work/emprops",
        thumbnail: "emprops-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Vitromex"],
        services: ["ERP"],
        route: "/work/vitromex",
        thumbnail: "vitromex-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Suspiros"],
        services: ["E-commerce"],
        route: "/work/suspiros",
        thumbnail: "suspiros-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Solar Fortún"],
        services: ["E-commerce"],
        route: "/work/solarfortun",
        thumbnail: "solarfortun-thumbnail",
        catchphrase: "",
      },
      {
        title: ["ACIR Radio"],
        services: ["Mobile App"],
        route: "/work/acir",
        thumbnail: "acir-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Casa Hogar del Anciano"],
        services: ["Digital Brand"],
        route: "/work/casa-hogar-del-anciano",
        thumbnail: "casa-anciano-thumbnail",
        catchphrase: "",
      },
      {
        title: ["FOS"],
        services: ["E-commerce, Digital Brand"],
        route: "/work/fos",
        thumbnail: "fos-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Earth Bar"],
        services: ["E-commerce"],
        route: "/work/earth-bar",
        thumbnail: "earthbar-thumbnail",
        catchphrase: "",
      },
      {
        title: ["Drive Beehive"],
        services: ["Mobile App"],
        route: "/work/drive-beehive",
        thumbnail: "drive-beehive-thumbnail",
        catchphrase: "",
      },

      // {
      //   title: ["Real state CRM"],
      //   services: [],
      //   route: "/work/real-state-crm",
      //   thumbnail: "avittat-thumbnail",
      //   catchphrase:
      //     "Enhancing real estate sales operations with a tailored CRM",
      // },

      // {
      //   title: ["innovative platform for", "the production of unique garments"],
      //   services: [],
      //   route: "/work/skyou",
      //   thumbnail: "skyou-thumbnail",
      //   catchphrase:
      //     "The freedom to choose, the ease of printing, personalized fashion at your fingertips.",
      // },
      //,
      // {
      //     title: ["National hospital system"],
      //     services: [],
      //     route: "/work/national-hospital-system",
      //     thumbnail: "hospitals-thumbnail"

      // },
      // {
      //     title: ["Data Analysis System for", "Pharmaceuticals"],
      //     services: [],
      //     route: "/work/pharma-analytics",
      //     thumbnail: "pharma-thumbnail"

      // }
    ];
    if(locale == "es")
        return projectsEs;
    else
        return projectsEn;
}