function isNil (x: any): boolean {
  return x == null
}

function crawl([p, ...keys]: string[], obj: any): any | undefined {
  if (isNil(obj) || isNil(obj[p])) {
    return undefined
  }

  if (!keys.length) {
    return obj[p]
  }

  return crawl(keys, obj[p])
}

export default function path (keys: string[]) {
  return (obj: any): any | undefined => crawl(keys, obj)
}
