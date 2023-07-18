import type { Element } from 'hast'
import { getPlaiceholder } from 'plaiceholder'
import type { Plugin, Transformer } from 'unified'
import type { Node } from 'unist'
import { visit } from 'unist-util-visit'
import type { VFileCompatible } from 'vfile'

// thanks to
// https://github.com/haxibami/haxibami.net/blob/2db87a4118c63b211ec10f6f7e0ec3b093513468/haxibami.net/src/articles/blog/blog-renewal.md#%E7%94%BB%E5%83%8F%E5%87%A6%E7%90%86
const rehypeImageOpt: Plugin<[void]> = function imageOpt(): Transformer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (tree: Node, _file: VFileCompatible) => {
    const promises: (() => Promise<void>)[] = []
    visit(tree, 'element', (node: Element) => {
      if (
        node.tagName === 'img' &&
        node.properties &&
        node.properties.src &&
        typeof node.properties.src === 'string'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const src = node.properties.src

        promises.push(async () => {
          if (node.properties) {
            const blur = await getPlaiceholder(src)
            node.properties.src = blur.img.src
            node.properties.width = blur.img.width
            node.properties.height = blur.img.height
            node.properties.aspectRatio = `${blur.img.width} / ${blur.img.height}`
            node.properties.blurDataURL = blur.base64
          }
        })
      }
    })
    await Promise.all(promises.map((t) => t()))
  }
}

export default rehypeImageOpt
