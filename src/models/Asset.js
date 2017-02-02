class Asset {
  constructor(data) {
    this.id = data.id;
    this.data = data;
  }

  getSay(opts = {}) {
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
    say += `, Genre: ${asset.genres.join(', ')}.`;
    if (opts.description) {
      say += ` ${asset.description}`;
    }

    return say;
  }

  getDisplay() {
    const asset = this.data;

    let title = asset.title;
    if (asset.seasonNumber) {
      title += ` - Staffel ${asset.seasonNumber}`;
    }
    if (asset.episodeTitle) {
      title += ` - Folge ${asset.episodeTitle}`;
    }

    const text = [
      `${asset.productionYear}, ${asset.duration} Minuten`,
      `Genres: ${asset.genres.join(', ')}`,
      '',
      asset.description,
    ].join('\n');

    return { title, text };
  }
}

module.exports = Asset;
