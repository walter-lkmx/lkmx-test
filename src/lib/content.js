import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import matter from 'gray-matter'
import { promises as fs } from 'fs'

const defaultLocale = 'es'

// Configuración de las colecciones
const COLLECTIONS = {
    solutions: {
        path: 'src/content/solutions',
        excludedIds: []
    },
    industries: {
        path: 'src/content/industries',
        excludedIds: []
    },
    services: {
        path: 'src/content/services',
        excludedIds: []
    }
}

function getCollectionDirectory(collection) {
    if (!COLLECTIONS[collection]) {
        throw new Error(`Collection ${collection} not found`)
    }
    return path.join(process.cwd(), COLLECTIONS[collection].path)
}

function getExcludedIds(collection) {
    return COLLECTIONS[collection]?.excludedIds || []
}

async function isDirectory(path) {
    try {
        const stat = await fs.stat(path)
        return stat.isDirectory()
    } catch (error) {
        return false
    }
}

export async function getSortedCollectionData(collection, locale, parentPath = '') {
    const directory = parentPath || getCollectionDirectory(collection)
    const excludedIds = getExcludedIds(collection)
    
    const fileNames = await fs.readdir(directory)
    const allData = await Promise.all(fileNames
        .filter(id => !excludedIds.includes(id))
        .map(async id => {
            const fullPath = path.join(directory, id)
            
            // Solo procesar directorios
            if (!(await isDirectory(fullPath))) {
                return null
            }

            const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`
            const markdownPath = path.join(fullPath, filename)
            
            try {
                // Verificar si el archivo existe
                await fs.stat(markdownPath)
                
                const fileContents = await fs.readFile(markdownPath, 'utf8')
                const matterResult = matter(fileContents)

                // Obtener la ruta relativa desde la raíz de la colección
                const relativePath = path.relative(getCollectionDirectory(collection), fullPath)
                const route = relativePath.split(path.sep).join('/')
                
                const baseData = {
                    id,
                    route,
                    ...matterResult.data
                }

                // Agregar campos específicos para services
                if (collection === 'services') {
                    const isMainCategory = relativePath.split(path.sep).length === 1
                    return {
                        ...baseData,
                        isMainCategory: isMainCategory || matterResult.data.isMainCategory || false,
                        parentService: matterResult.data.parentService || null,
                        order: matterResult.data.order || 0,
                    }
                }

                return baseData
            } catch (error) {
                // Si el archivo no existe o hay error, retornamos null
                return null
            }
        }))
    
    // Filtrar los resultados nulos y ordenar
    const validData = allData.filter(item => item !== null)

    // Ordenamiento específico para services
    if (collection === 'services') {
        return validData.sort((a, b) => {
            if (a.order !== b.order) {
                return a.order - b.order
            }
            return (a.title || '').localeCompare(b.title || '')
        })
    }

    // Ordenamiento original para otras colecciones
    return validData.sort((a, b) => {
        return a.number > b.number ? 1 : -1
    })
}

export async function getCollectionIndexed(collection, locale, onlyMainCategories = false) {
    const items = await getSortedCollectionData(collection, locale)
    
    // Filtrar solo categorías principales para services si es necesario
    const filteredItems = (collection === 'services' && onlyMainCategories)
        ? items.filter(item => item.isMainCategory)
        : items

    const baseMapping = (item) => ({
        title: item.title || [""],
        description: item.description || [""],
        route: `/${collection}/${item.route}`,
        iconName: item.iconName || "",
        cover: item.cover || "",
        storyType: item.storyType || collection.slice(0, -1)
    })

    // Agregar campos adicionales solo para services
    if (collection === 'services') {
        return filteredItems.map(item => ({
            ...baseMapping(item),
            title: item.title || "", // Override para services: title es string
            description: item.description || "", // Override para services: description es string
            isMainCategory: item.isMainCategory || false,
            order: item.order || 0
        }))
    }

    return filteredItems.map(baseMapping)
}

export async function getCollectionItemData(collection, id, locale, parentId = '') {
    const directory = getCollectionDirectory(collection)
    const fullPath = path.join(
        directory,
        parentId,
        id,
        locale === defaultLocale ? 'index.md' : `index.${locale}.md`
    )

    const fileContents = await fs.readFile(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(html, { sanitize: false })
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    const baseData = {
        id,
        contentHtml,
        ...matterResult.data,
    }

    // Agregar campos adicionales solo para services
    if (collection === 'services') {
        return {
            ...baseData,
            parentId,
            isMainCategory: matterResult.data.isMainCategory || false,
            parentService: matterResult.data.parentService || null,
            order: matterResult.data.order || 0,
        }
    }

    return baseData
}

export async function getAllCollectionIds(collection, locales) {
    const directory = getCollectionDirectory(collection)
    const excludedIds = getExcludedIds(collection)
    
    async function getNestedIds(dir) {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        console.log('Processing directory:', dir)
        let paths = []
        
        for (const entry of entries) {
            if (entry.isDirectory() && !excludedIds.includes(entry.name)) {
                const fullPath = path.join(dir, entry.name)
                const relativePath = path.relative(directory, fullPath)
                const pathParts = relativePath.split(path.sep)
                
                // Procesar archivo markdown actual
                const validLocales = await Promise.all(
                    locales.map(async locale => {
                        const indexPath = path.join(
                            fullPath,
                            locale === defaultLocale ? 'index.md' : `index.${locale}.md`
                        )
                        try {
                            await fs.stat(indexPath)
                            // Para services, incluir información del padre si es un subservicio
                            if (collection === 'services' && pathParts.length > 1) {
                                return { 
                                    params: { 
                                        id: entry.name,
                                        parentId: pathParts[0] 
                                    }, 
                                    locale 
                                }
                            }
                            return { params: { id: entry.name }, locale }
                        } catch {
                            return null
                        }
                    })
                )
                paths = paths.concat(validLocales.filter(Boolean))
                
                // Recursivamente obtener subservicios solo para services
                if (collection === 'services') {
                    const subPaths = await getNestedIds(fullPath)
                    paths = paths.concat(subPaths)
                }
            }
        }
        
        return paths
    }
    
    return getNestedIds(directory)
}

// Funciones de conveniencia
export const getSortedSolutionsData = (locale) => getSortedCollectionData('solutions', locale)
export const getSolutionsIndexed = (locale) => getCollectionIndexed('solutions', locale)
export const getSolutionData = (id, locale) => getCollectionItemData('solutions', id, locale)
export const getAllSolutionsIds = (locales) => getAllCollectionIds('solutions', locales)

// Funciones específicas para industries
export const getSortedIndustriesData = (locale) => getSortedCollectionData('industries', locale)
export const getIndustriesIndexed = (locale) => getCollectionIndexed('industries', locale)
export const getIndustryData = (id, locale) => getCollectionItemData('industries', id, locale)
export const getAllIndustriesIds = (locales) => getAllCollectionIds('industries', locales)

// Funciones específicas para services
export const getSortedServicesData = (locale) => getSortedCollectionData('services', locale)
export const getServicesIndexed = (locale) => getCollectionIndexed('services', locale, true) // Solo categorías principales
export const getServiceData = (id, locale, parentId) => getCollectionItemData('services', id, locale, parentId)
export const getAllServicesIds = (locales) => getAllCollectionIds('services', locales)
export const getSubServices = (serviceId, locale) => {
    const directory = path.join(getCollectionDirectory('services'), serviceId)
    return getSortedCollectionData('services', locale, directory)
}