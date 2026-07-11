#!/usr/bin/env node
/**
 * IndexNow submitter. Reads the live sitemap and pings IndexNow (Bing + Yandex,
 * which feeds ChatGPT Search and Copilot) with every URL so new/changed content
 * is crawled in minutes instead of waiting for a natural crawl.
 *
 * Run AFTER a deploy is live (the key file must be reachable for verification):
 *   npm run indexnow
 *
 * Key file lives at public/<key>.txt (and public/indexnow.txt), both containing KEY.
 */
const HOST = 'strykora.com'
const KEY = 'ac6fa33ca261e3792252cb9a08ba9da6'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const SITEMAP = `https://${HOST}/sitemap.xml`

const res = await fetch(SITEMAP)
if (!res.ok) {
  console.error(`Could not fetch sitemap (${res.status})`)
  process.exit(1)
}
const xml = await res.text()
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (urlList.length === 0) {
  console.error('No URLs found in sitemap')
  process.exit(1)
}

const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }
const submit = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})
// IndexNow returns 200 or 202 on success.
console.log(`Submitted ${urlList.length} URLs to IndexNow → HTTP ${submit.status}`)
process.exit(submit.ok ? 0 : 1)
