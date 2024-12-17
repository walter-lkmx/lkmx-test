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

export async function getSortedCollectionData(collection, locale) {
    const directory = getCollectionDirectory(collection)
    const excludedIds = getExcludedIds(collection)
    
    const fileNames = await fs.readdir(directory)
    const allData = await Promise.all(fileNames
        .filter(id => !excludedIds.includes(id))
        .map(async id => {
            const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`
            const fullPath = path.join(directory, id, filename)
            
            try {
                // Verificar si el archivo existe
                await fs.stat(fullPath)
                
                const fileContents = await fs.readFile(fullPath, 'utf8')
                const matterResult = matter(fileContents)

                return {
                    id,
                    ...matterResult.data
                }
            } catch (error) {
                // Si el archivo no existe o hay error, retornamos null
                return null
            }
        }))
    
    // Filtrar los resultados nulos y ordenar
    const validData = allData.filter(item => item !== null)
    return validData.sort((a, b) => {
        return a.number > b.number ? 1 : -1
    })
}

export async function getCollectionIndexed(collection, locale) {
    const items = await getSortedCollectionData(collection, locale)
    
    return items.map(item => ({
        title: item.title || [""],
        description: item.description || [""],
        route: `/${collection}/${item.id}`,
        iconName: item.iconName || "",
        cover: item.cover || "",
        storyType: item.storyType || collection.slice(0, -1) // removes 's' from end
    }))
}

export async function getCollectionItemData(collection, id, locale) {
    const directory = getCollectionDirectory(collection)
    const fullPath = path.join(
        directory,
        id,
        locale === defaultLocale ? 'index.md' : `index.${locale}.md`
    )

    const fileContents = await fs.readFile(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(html, { sanitize: false })
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        ...matterResult.data,
    }
}

export async function getAllCollectionIds(collection, locales) {
    const directory = getCollectionDirectory(collection)
    const excludedIds = getExcludedIds(collection)
    let paths = []
    
    const ids = await fs.readdir(directory)
    
    const validPaths = await Promise.all(
        ids.filter(id => !excludedIds.includes(id))
            .map(async id => {
                const validLocales = await Promise.all(
                    locales.map(async locale => {
                        const fullpath = path.join(
                            directory,
                            id,
                            locale === defaultLocale ? 'index.md' : `index.${locale}.md`
                        )
                        try {
                            await fs.stat(fullpath)
                            return { params: { id }, locale }
                        } catch {
                            return null
                        }
                    })
                )
                return validLocales.filter(Boolean)
            })
    )
    
    return validPaths.flat()
}

// Funciones de conveniencia para mantener compatibilidad con el código existente
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
export const getServicesIndexed = (locale) => getCollectionIndexed('services', locale)
export const getServiceData = (id, locale) => getCollectionItemData('services', id, locale)
export const getAllServicesIds = (locales) => getAllCollectionIds('services', locales)