class Maxpert {
  constructor(maxpert) {
    this.firstname = maxpert.firstname;
    this.surname = maxpert.surname;
  }

  getSay() {
    return `${this.firstname} ${this.surname}`;
  }
}

module.exports = Maxpert;
