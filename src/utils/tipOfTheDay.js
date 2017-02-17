const AssetsQueryOptions = require('drequest-maxdome').AssetsQueryOptions;

module.exports = ({ maxdome }) => async () => {
  const page =
    await maxdome.request()
      .get('v1/pages/%2F', {
        headers: {
          client: 'mxd_package',
          clienttype: 'samsung_tv',
          platform: 'ott',
        },
      });
  const componentId = page.components.container
    .filter(component => component.layout === 'tip-of-the-day')[0].container[0].meta_id;

  const component =
    await maxdome.request()
      .get(`v1/components/${componentId}`);
  const tipOfTheDay = component.list[0];

  const published = new Date(tipOfTheDay.published);
  const assetId = tipOfTheDay.review[0].mam_asset_id[0].id;
  const assets =
    await maxdome.request('assets')
      .send(new AssetsQueryOptions(assetId));
  const asset = assets[0];
  const maxpert = new Maxpert(tipOfTheDay.review[0].maxpert[0]);

  return { published, asset, maxpert };
};
