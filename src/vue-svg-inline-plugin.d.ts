// ~/src/@types/vue-svg-inline-plugin.d.ts

declare module 'vue-svg-inline-plugin' {
  import { App } from 'vue'

  interface VueSvgInlinePluginOptions {
    directive?: {
      name?: string
      spriteModifierName?: string
    }
    attributes?: {
      merge?: string[]
      add?: { name: string; value: string | number }[]
      data?: string[]
      remove?: string[]
    }
    cache?: {
      version?: string
      persistent?: boolean
      removeRevisions?: boolean
    }
    intersectionObserverOptions?: any
    axios?: any
    xhtml?: boolean
  }

  type InstallFunction = (app: App, options?: VueSvgInlinePluginOptions) => any
  type VueSvgInlinePlugin =
    | (InstallFunction & { install?: InstallFunction })
    | { install: InstallFunction }

  const _default: VueSvgInlinePlugin

  export { VueSvgInlinePluginOptions }
  export default _default
}
