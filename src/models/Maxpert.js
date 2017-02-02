class Maxpert {
  constructor(data) {
    this.data = data;
  }

  getSay() {
    const maxpert = this.data;
    return `${maxpert.firstname} ${maxpert.surname}`;
  }
}

module.exports = Maxpert;
