const catchy = require('catchy-image');

module.exports = async (item, pluginOptions) => {
  const titleElement = item.markdownAST.children;
  const title = titleElement[titleElement.length - 1].value
    .replace('<h2 style="display:none">', '')
    .replace('</h2>', '');

  console.log('🐳', title);

  // gatsby-config.jsの設定情報とマークダウンのメタデータを画像生成ライブラリの引数に渡す
  const result = await catchy.generate({
    ...pluginOptions,
    output: {
      ...pluginOptions.output,
      directory: `./public/blog/${item.markdownNode.id}`,
      fileName: pluginOptions.output.fileName
    },
    meta: {
      ...pluginOptions.meta,
      title
    }
  });

  console.info(`gatsby-remark-og-image: Successful generated: ${result}`);
};
