import Head from 'next/head'
import Link from 'next/link'
import { Date } from '../components/date'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ dataPosts }) {
  return (
    <Layout home>
      <Head>
        <title>Next.js Tutorial</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello my friends. I'm José and I'm learning React.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {dataPosts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

// export async function getServerSideProps(context) {
//   // Get external data from the file system, API, DB, etc.
//   const dataPosts = getSortedPostsData();

//   // The value of the `props` key will be
//   //  passed to the `Home` component
//   return {
//     props: { dataPosts }
//   }
// }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const dataPosts = getSortedPostsData();

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: { dataPosts }
  }
}