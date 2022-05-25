import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import Layout from '../../components/layout'
import { getAllPostsIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import { Date } from '../../components/date'

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <p>Title: {postData.title}</p>
            <p>ID: {postData.id}</p>
            <p>Date: <div className={`${utilStyles.lightText} ${utilStyles.inLine}`} >
                <Date dateString={postData.date} />
            </div>
            </p>
            <p>Description: </p>
            <div className={utilStyles.paddingLeft8px} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostsIds()
    return {
        paths, fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}