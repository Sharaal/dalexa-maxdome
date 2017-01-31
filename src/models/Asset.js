class Asset {
  constructor(data) {
    this.data = data;
  }

  render(response) {
    const asset = this.data;

    let say;
    if (asset.type === 'movie') {
      say = 'Der Film ';
    } else {
      say = 'Die Serie ';
    }
    say += asset.title;
    if (asset.seasonNumber) {
      say += ` - Staffel ${asset.seasonNumber}`;
    }
    if (asset.episodeTitle) {
      say += ` - Folge ${asset.episodeTitle}`;
    }
    say += `, Genre: ${asset.genres.join(', ')}`;

    response.say(say);

    let title = asset.title;
    if (asset.seasonNumber) {
      title += ` - Staffel ${asset.seasonNumber}`;
    }
    if (asset.episodeTitle) {
      title += ` - Folge ${asset.episodeTitle}`;
    }

    response.display({
      title: title,
      text: [
        `${asset.productionYear}, ${asset.duration} Minuten`,
        `Genres: ${asset.genres.join(', ')}`,
        '',
        asset.description,
      ].join('\n'),
    });
  }
}

module.exports = Asset;
