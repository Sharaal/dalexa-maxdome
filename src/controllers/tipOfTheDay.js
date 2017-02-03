const Asset = require('../models/Asset');
const Maxpert = require('../models/Maxpert');

module.exports = ({ heimdall }) => ['get', ['/', async (req, res) => {
  const tipOfTheDay = await heimdall.getTipOfTheDay();
  const asset = new Asset(tipOfTheDay.asset);
  const maxpert = new Maxpert(tipOfTheDay.maxpert);
  res.send({
    uid: asset.link,
    updateDate: tipOfTheDay.published.toISOString(),
    titleText: `Der Tipp des Tages von ${maxpert.getSay()}: ${asset.getSay()}`,
    mainText: asset.description,
    redirectionUrl: asset.link,
  });
}]];
