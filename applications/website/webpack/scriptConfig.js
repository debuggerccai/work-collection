const config = require('../src/config')

//基本script
const baseScripts = {
    gaode: {
        url: '//webapi.amap.com/maps?v=1.4.15&key=c07a79996eae4e1024d9622e41c45a41&plugin=AMap.MouseTool,AMap.PolyEditor,AMap.Autocomplete,AMap.Geocoder,AMap.PlaceSearch,AMap.DistrictLayer',
        ext: 'ignore'
    },
    icon: {
        url: config.iconJS,
        // ext: 'ignore'
    }
}
//基本link
const baseLink = {
    icon: {
        url: config.iconCss
    },
}

function getScriptsTemplate(scripts = baseScripts) {
    const keys = Object.keys(scripts)
    return keys.map(key => `<script src="${scripts[key].url}" ${scripts[key].ext ? scripts[key].ext : ''}></script>`).join('')
}

function getCssTemplate(links = baseLink) {
    const keys = Object.keys(links)
    return keys.map(key => ` <link  type="text/css"  href="${links[key].url}" rel="stylesheet">`).join('')
}

module.exports = {
    baseScripts,
    baseLink,
    getScriptsTemplate,
    getCssTemplate
}
