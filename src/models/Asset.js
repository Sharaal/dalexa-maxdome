class Asset {
  constructor(asset) {
    this.description = asset.description;
    this.duration = asset.duration;
    this.episodeTitle = asset.episodeTitle;
    this.genres = asset.genres;
    this.id = asset.id;
    this.link = asset.link;
    this.productionYear = asset.productionYear;
    this.seasonNumber = asset.seasonNumber;
    this.title = asset.title;
    this.type = asset.type;
  }

  getSay(opts = {}) {
    let say;
    if (this.type === 'movie') {
      say = 'Der Film ';
    } else {
      say = 'Die Serie ';
    }
    say += this.title;
    if (this.seasonNumber) {
      say += ` - Staffel ${this.seasonNumber}`;
    }
    if (this.episodeTitle) {
      say += ` - Folge ${this.episodeTitle}`;
    }
    say += `, Genre: ${this.genres.join(', ')}.`;
    if (opts.description) {
      say += ` ${this.description}`;
    }

    return say;
  }

  getDisplay() {
    let title = this.title;
    if (this.seasonNumber) {
      title += ` - Staffel ${this.seasonNumber}`;
    }
    if (this.episodeTitle) {
      title += ` - Folge ${this.episodeTitle}`;
    }

    const text = [
      `${this.productionYear}, ${this.duration} Minuten`,
      `Genres: ${this.genres.join(', ')}`,
      '',
      this.description,
      '',
      this.link,
    ].join('\n');

    return { title, text };
  }
}

module.exports = Asset;
