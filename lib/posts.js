import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// import someDatabaseSDK from 'someDatabaseSDK'

// const databaseClient = someDatabaseSDK.createClient(...)

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {

    // Instead of the file system,
    // fetch post data from an external API endpoint
    //const res = await fetch('..');
    //return res.json();

    // Instead of the file system,
    // fetch post data from a database
    //return databaseClient.query('SELECT posts...')

    //Get file names under /posts folder
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
        //remove .md from fileName
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        return {
            id, ...matterResult.data
        }
    })

    // Sort posts by date
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b)
            return 1
        else if (a > b)
            return -1
        else
            return 0
    })
}

export function getAllPostsIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id, contentHtml, ...matterResult.data
    }
}