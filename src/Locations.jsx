class Location {
    constructor(highGround, lowGround, basement, openArea) {
      this.highGround = highGround;
      this.lowGround = lowGround;
      this.basement = basement;
      this.openArea = openArea;
    }
  
    isHighGround() {
      return this.highGround;
    }
  
    isLowGround() {
      return this.lowGround;
    }
  
    hasBasement() {
      return this.basement;
    }
  
    isOpenArea() {
      return this.openArea;
    }
  }
  
  const tallBuilding = new Location(true, false, true, false);
  const hospital = new Location(true, false, true, false);
  const house = new Location(false, false, true, false);
  const park = new Location(false, false, false, true);
  const store = new Location(false, false, true, false);
  const lake = new Location(false, true, false, true);
  const forest = new Location(false, false, false, true);
  const office = new Location(true, false, true, false);
  const townHall = new Location(true, false, true, false);
  
  export { hospital, house, park, store, lake, forest, office, townHall, tallBuilding, Location };
  