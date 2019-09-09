// TypeScript Version: 3.4

type UUID = string

type Color = {
  _class: 'color'
  alpha: number
  blue: number
  green: number
  red: number
}

type ShareStyle = {
  _class: 'sharedStyle'
  do_objectID: UUID
  name: string
  value: {
    _class: 'style'
    endMarkerType: number
    miterLimit: number
    startMarkerType: number
    textStyle: {
      _class: 'textStyle'
      encodedAttributes: {
        MSAttributedStringColorAttribute: Color
        textStyleVerticalAlignmentKey: number
        MSAttributedStringFontAttribute: {
          _class: 'UIFontDescriptor'
          attributes: { name: string; size: number }
        }
        paragraphStyle: {
          _class: 'paragraphStyle'
          alignment: number
          paragraphSpacing: number
          allowsDefaultTighteningForTruncation: number
          maximumLineHeight?: number
          minimumLineHeight?: number
        }
        kerning?: number
      }
      verticalAlignment: number
    }
    windingRule: number
  }
}

type SketchFile = {
  document: {
    _class: 'document'
    do_objectID: UUID
    assets: {
      _class: 'assetCollection'
      colorAssets?: {
        _class: 'MSImmutableColorAsset'
        name: string
        color: Color
      }[]
      gradientAssets?: Array<any>
      colors: Color[]
      gradients: Array<any>
      imageCollection: {
        _class: 'imageCollection'
        images: {}
      }
      images: Array<any>
    }
    colorSpace: number
    currentPageIndex: number
    foreignLayerStyles: Array<any>
    foreignSymbols: Array<any>
    foreignTextStyles: Array<any>
    layerStyles: {
      _class: 'sharedStyleContainer'
      objects: ShareStyle[]
    }
    layerSymbols: {
      _class: 'symbolContainer'
      objects: Array<any>
    }
    layerTextStyles: {
      _class: 'sharedTextStyleContainer'
      objects: ShareStyle[]
    }
    pages: {
      _class: 'MSJSONFileReference'
      _ref_class: 'MSImmutablePage'
      _ref: string
    }[]
  }
  meta: {
    commit: string
    pagesAndArtboards: {
      [pageId: string]: {
        name: string
        artboard: { [artboardId: string]: { name: string } }
      }
    }
    version: number
    fonts: string[]
    compatibilityVersion: number
    app: 'com.bohemiancoding.sketch3'
    autosaved: 0 | 1
    variant: 'NONAPPSTORE'
    // the following don't really matter
    created: {
      commit: string
      appVersion: string
      build: number
      app: 'com.bohemiancoding.sketch3'
      compatibilityVersion: number
      version: number
      variant: 'NONAPPSTORE'
    }
    saveHistory: string[]
    appVersion: string
    build: number
  }
  user: {
    document: {
      pageListHeight: number
    }
  } & {
    [pageId: string]: {
      scrollOrigin: string
      zoomValue: number
    }
  }
  pages: Object[]
  images: {
    [imageId: string]: Buffer
  }
}

export declare function readSketchFile(filePath: string): Promise<SketchFile>
export declare function createNewSketchFile(
  documentId?: string,
  pages?: { id: UUID; name?: string; layers?: Object[] }[],
  version?: number,
): SketchFile
export declare function writeSketchFile(sketchFile: SketchFile, filePath: string): Promise<void>
export declare function generateId(seed?: string): UUID
