// Ruta del archivo: src/lib/solutions.js

import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import matter from 'gray-matter'

const solutionsDirectory = path.join(process.cwd(), 'src/content/solutions')
const defaultLocale = 'es'

// Constante para controlar los IDs de soluciones a excluir
const EXCLUDED_SOLUTION_IDS = [] // Aquí puedes agregar los IDs que deseas excluir

export function getSortedSolutionsData(locale) {
    const fileNames = fs.readdirSync(solutionsDirectory)
    const allSolutionsData = fileNames
        .filter(id => !EXCLUDED_SOLUTION_IDS.includes(id))
        .map(id => {
            const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`
            const fullPath = path.join(solutionsDirectory, id, filename)
            
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
        .filter((solution) => solution)
    
    return allSolutionsData.sort((a, b) => {
        return a.number > b.number ? 1 : -1
    })
}

export function getSolutionsIndexed(locale) {
    const solutions = getSortedSolutionsData(locale)
    
    return solutions.map(solution => ({
        title: solution.title || [""],
        route: `/solutions/${solution.id}`,
        thumbnail: solution.thumbnail || "",
        cover: solution.cover || "",
        storyType: solution.storyType || "solution"
    }))
}

export async function getSolutionData(id, locale) {
    const fullPath = path.join(
        solutionsDirectory,
        id,
        locale === defaultLocale ? 'index.md' : `index.${locale}.md`
    )

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(html, { sanitize: false})
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        ...matterResult.data,
    }
}

export function getAllSolutionsIds(locales) {
    let paths = []
    const solutionsIds = fs.readdirSync(solutionsDirectory)
        .filter(id => !EXCLUDED_SOLUTION_IDS.includes(id))

    for(let id of solutionsIds) {
        for(let locale of locales) {
            let fullpath = path.join(
                solutionsDirectory,
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