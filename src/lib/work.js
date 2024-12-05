// Ruta del archivo: src/lib/stories.js (o la ruta actual donde se encuentre este archivo)

import fs from 'fs'
import path from 'path'
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

const storiesDirectory = path.join(process.cwd(), 'src/work');
const defaultLocale = 'es';

// Constante para controlar los IDs de proyectos a excluir
const EXCLUDED_STORY_IDS = []; // Aquí agregas los IDs que deseas excluir

export function getSortedStoriesData(locale) {
    const fileNames = fs.readdirSync(storiesDirectory);
    const allStoriesData = fileNames
        .filter(id => !EXCLUDED_STORY_IDS.includes(id)) // Filtrar los proyectos excluidos
        .map(id => {
            const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`;
            
            const fullPath = path.join(storiesDirectory, id, filename)
            
            // Skip if file doesn't exist
            if (!fs.existsSync(fullPath)) {
                return null;
            }
            
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            return {
                id,
                ...matterResult.data
            }
        })
        .filter((post) => post);
    
    return allStoriesData.sort((a, b) => {
        return a.number > b.number ? 1 : -1;
    })
}

export function getProjectsIndexed(locale) {
    const stories = getSortedStoriesData(locale);
    
    return stories.map(story => ({
        title: story.title || [""],
        services: story.solutions?.length ? [story.solutions.join(", ")] : [""],
        route: `/work/${story.id}`,
        thumbnail: story.portrait || "",
        catchphrase: ""
    }));
}

export async function getStoryData(id, locale) {
    const fullPath = path.join(
        storiesDirectory,
        id,
        locale === defaultLocale ? 'index.md' : `index.${locale}.md`,
    );

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark().use(html, { sanitize: false}).process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}

export function getAllStoriesIds(locales) {
    let paths = [];
    const storiesIds = fs.readdirSync(storiesDirectory)
        .filter(id => !EXCLUDED_STORY_IDS.includes(id)); // Filtrar los proyectos excluidos

    for(let id of storiesIds) {
        for(let locale of locales) {
            let fullpath = path.join(
                storiesDirectory,
                id,
                locale === defaultLocale ? 'index.md' : `index.${locale}.md`,
            );
            if(!fs.existsSync(fullpath)) {
                continue;
            }
            paths.push({ params: {id}, locale });
        }
    }

    return paths;
}