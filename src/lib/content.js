// Ruta del archivo: src/lib/content.js

import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import matter from 'gray-matter'

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

export function getSortedCollectionData(collection, locale) {
    const directory = getCollectionDirectory(collection)
    const excludedIds = getExcludedIds(collection)
    
    const fileNames = fs.readdirSync(directory)
    const allData = fileNames
        .filter(id => !excludedIds.includes(id))
        .map(id => {
            const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`
            const fullPath = path.join(directory, id, filename)
            
            // Skip if file doesn't exist
            if (!fs.existsSync(fullPath)) {
                return null
            }
            
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const matterResult = matter(fileContents)

            return {
                id,
                ...matterResult.data
            }
        })
        .filter((item) => item)
    
    return allData.sort((a, b) => {
        return a.number > b.number ? 1 : -1
    })
}

export function getCollectionIndexed(collection, locale) {
    const items = getSortedCollectionData(collection, locale)
    
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

    const fileContents = fs.readFileSync(fullPath, 'utf8')
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

export function getAllCollectionIds(collection, locales) {
    const directory = getCollectionDirectory(collection)
    const excludedIds = getExcludedIds(collection)
    let paths = []
    
    const ids = fs.readdirSync(directory)
        .filter(id => !excludedIds.includes(id))

    for(let id of ids) {
        for(let locale of locales) {
            let fullpath = path.join(
                directory,
                id,
                locale === defaultLocale ? 'index.md' : `index.${locale}.md`
            )
            if(!fs.existsSync(fullpath)) {
                continue
            }
            paths.push({ params: {id}, locale })
        }
    }

    return paths
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