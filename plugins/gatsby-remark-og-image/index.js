const catchy = require('catchy-image');

module.exports = async (item, pluginOptions) => {
  const element = item.markdownAST.children;
  const elementArray =
    item.markdownAST.children[element.length - 1].value.split('\n');

  console.log('🐳', elementArray);

  const title = elementArray[1]
    .replace('<h2 style="display:none">', '')
    .replace('</h2>', '');
  const slug = elementArray[0]
    .replace('<h2 style="display:none">', '')
    .replace('</h2>', '');

  // gatsby-config.jsの設定情報とマークダウンのメタデータを画像生成ライブラリの引数に渡す
  const result = await catchy.generate({
    ...pluginOptions,
    output: {
      ...pluginOptions.output,
      directory: `./public/ogp${slug}`,
      fileName: pluginOptions.output.fileName
    },
    meta: {
      ...pluginOptions.meta,
      title
    }
  });

  console.info(`gatsby-remark-og-image: Successful generated: ${result}`);
};
